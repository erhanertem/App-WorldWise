/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiesContext';

function CityItem({ city }) {
  // READ FROM CONTEXT API
  const { currentCity, deleteCity } = useCities();
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  const formatDate = (date) =>
    new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    // Wrap by Link RRC to provide hyperlink to Dynamic Nested param route @ app/cities/{id} - beause when we click this list item, it should kick in City.jsx via cities/:id Route @ App.jsx
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={handleClick}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
