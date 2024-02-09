/* eslint-disable react-refresh/only-export-components */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';

import { useUrlPosition } from '../hooks/useUrlPosition';
import { convertCountryCodeToEmoji } from '../hooks/convertCountryCodeToEmoji';

import { useCities } from '../contexts/CitiesContext';

import Button from './Button';
import BackButton from './BackButton';
import Message from './Message';
import Spinner from './Spinner';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
	const navigate = useNavigate();
	const [lat, lng] = useUrlPosition();
	const { createCity, isLoading } = useCities();
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');
	const [isLoadingGeoCoding, setIsLoadingGeocoding] = useState(false);
	const [emoji, setEmoji] = useState('');
	const [geoCodingError, setGeoCodingError] = useState('');

	useEffect(
		function () {
			//GUARD CLAUSE
			if (!lat && !lng) return;

			async function fetchCityData() {
				try {
					setIsLoadingGeocoding(true);
					setGeoCodingError(''); //Reset error
					const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
					const data = await res.json();
					// console.log(data);

					//GUARD CLAUSE
					if (!data.countryCode)
						throw new Error('That doesnt seem to be city. Click somewhere else 😔');

					setCityName(data.city || data.locality || '');
					setCountry(data.countryName);
					setEmoji(convertCountryCodeToEmoji(data.countryCode));
				} catch (err) {
					setGeoCodingError(err.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fetchCityData();
		},
		[lat, lng],
	);

	async function handleSubmit(event) {
		event.preventDefault();

		// GUARD CLAUSE -PREVENT SUBMISSION W/NO DATA
		if (!cityName || !date) return;

		//COMPOSE DATA TO BE SUBMITTED FROM THE FORM
		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
			// NOTE: No need to provide ID, JSON fake server assigns ids
		};

		await createCity(newCity); // We have to wait this async function to keep syncronous activity

		// PROGRAMMATIC NAVIGATION UPON NEW CITY SUBMISSION
		navigate('/app/cities');
	}

	//GUARD CLAUSE
	if (!lat && !lng) return <Message message="Start by clicking on the map" />;
	//JSX BLOCK
	//TEMP JSX WHILE LOADING
	if (isLoadingGeoCoding) return <Spinner />;
	//GUARD CLAUSE JSX
	if (geoCodingError) return <Message message={geoCodingError} />;
	//ACTUAL JSX
	return (
		<form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				{/* <input id="date" onChange={(e) => setDate(e.target.value)} value={date} /> */}
				<DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
