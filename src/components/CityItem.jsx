/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import styles from './CityItem.module.css';

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));

function CityItem({ city }) {
	const { currentCity, deleteCity } = useCities();
	const { cityName, emoji, date, id, position } = city;

	function handleClick(event) {
		//NOTE: THE BUTTON IS ENCLOSED BY THE LINK. IF CLICKED ON, THE LINK GETS CLICKED AS WELL. IN ORDER TO AVOID EVENT BUBBLING, AND ONLY LIMIT TO BUTTON WE GOT TO UTILIZE E.PREVENTDEFAULT().
		event.preventDefault();
		deleteCity(id);
	}

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>{formatDate(date)}</time>
				<button className={styles.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
