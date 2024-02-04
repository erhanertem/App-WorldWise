/* eslint-disable react/prop-types */
import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';

function CountryList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return <Message message="Add your first city by clicking on a city on the map" />;
	console.log(cities);
	const countries = cities.reduce((array, city) => {
		if (!array.map((el) => el.country).includes(city.country)) {
			return [...array, { country: city.country, emoji: city.emoji }];
		} else {
			return array;
		}
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.country} />
			))}
		</ul>
	);
}

export default CountryList;
