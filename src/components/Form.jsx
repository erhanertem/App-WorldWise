/* eslint-disable react-refresh/only-export-components */
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../hooks/useUrlPosition';
import { useCities } from '../contexts/CitiesContext';

import styles from './Form.module.css';
import Button from './Button';
import Message from './Message';
import Spinner from './Spinner';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [lat, lng] = useUrlPosition();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');

  const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

  useEffect(
    function () {
      // GUARD CLAUSE - Avoid initial fetching
      if (!lat && !lng) return;

      (async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError(''); //Reset Error
          const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();
          // console.log(data);

          // GUARD CLAUSE - when clicked to sea/no data zone
          if (!data.countryCode) throw new Error("Doesn't seem to be a proper location. Click somewhere else");

          setCityName(data.cityName || data.locality || ''); // Setcityname based on received data with gracefull fallbacks
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          // console.log(err);
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      })();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    // Avoid hard reload (refresh)
    e.preventDefault();
    // Check data
    if (!cityName || !date) return;
    // Create a new city object from the form data
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    // Register the newCity to the database - createCity is async function so we can await it before we navigate back to cities tab
    await createCity(newCity);
    navigate('/app/cities');
  }

  // GUARD CLAUSE - ERRORNOUS LOCATION MESSAGE RENDERING
  if (geocodingError) return <Message message={geocodingError} />;
  if (isLoadingGeocoding) return <Spinner />;

  // GUARD CLAUSE - DISALLOW MANUALLY SWITCHING TO FORM VIA URL MANUPLATION
  if (!lat && !lng) return <Message message="Start by clicking on the map" />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            // NOTE: We are in the form so e.preventDefault() helps us avoid the form submission by default when we navigate away.
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
