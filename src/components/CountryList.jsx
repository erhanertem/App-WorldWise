/* eslint-disable react/prop-types */
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'
import styles from './CountryList.module.css'

function CountryList({ cities, isLoading }) {
	if (isLoading) return <Spinner />

	if (!cities.length)
		return (
			<Message message="Add your first city by clicking on a city on the map" />
		)

	// UNIQUE COUNTRY LIST
	// -> Finding unique cities - Method #1
	// const countries = cities.reduce((array, city) => {
	// 	if (!array.map(el => el.country).includes(city.country)) {
	// 		return [...array, { country: city.country, emoji: city.emoji }]
	// 	} else {
	// 		return array
	// 	}
	// }, [])

	// return (
	// 	<ul className={styles.countryList}>
	// 		{countries.map(country => (
	// 			<CountryItem country={country} key={country.id} />
	// 		))}
	// 	</ul>
	// )

	// -> Finding unique cities - Method #2
	const countriesUnique = new Set(
		cities.map(city =>
			JSON.stringify({ country: city.country, emoji: city.emoji }),
		),
	)
	const countries = [...countriesUnique].map(each => JSON.parse(each))

	return (
		<ul className={styles.countryList}>
			{countries.map(country => {
				return <CountryItem country={country} key={country.country} />
			})}
		</ul>
	)
}

export default CountryList
