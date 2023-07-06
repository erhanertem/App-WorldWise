/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'

const formatDate = date =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date))

const flagEmojiToPNG = flag => {
	const countryCode = Array.from(flag, codeUnit => codeUnit.codePointAt())
		.map(char => String.fromCharCode(char - 127397).toLowerCase())
		.join('')
	// console.log('⛔', countryCode)
	// G = ASCII 71 + 127397 = UNICODE 127468 (0x1F1EC) = 🇬
	// B = ASCII 66 + 127397 = UNICODE 127463 (0x1F1E7) = 🇧

	return (
		<img
			src={`https://flagcdn.com/24x18/${countryCode}.png`}
			alt="country flag"
		/>
	)
}

function CityItem({ city }) {
	// console.log(city)
	const { cityName, emoji, date, id, position } = city

	return (
		<li>
			<Link
				className={styles.cityItem}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button className={styles.deleteBtn}>&times;</button>
			</Link>
		</li>
	)
}

export default CityItem
