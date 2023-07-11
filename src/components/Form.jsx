/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from 'react'
import Button from './Button'

import styles from './Form.module.css'
import BackButton from './BackButton'
import { useUrlPosition } from '../hooks/useUrlPosition'
import flagEmojiToPNG from './flagEmojiToPNG'
import Message from './Message'
import Spinner from './Spinner'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCities } from '../contexts/CitiesContext'
import { useNavigate } from 'react-router-dom'

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map(char => 127397 + char.charCodeAt())
	return String.fromCodePoint(...codePoints)
}

function Form() {
	const [lat, lng] = useUrlPosition()
	const { createCity, isLoading } = useCities()
	const navigate = useNavigate()

	const [cityName, setCityName] = useState('')
	const [country, setCountry] = useState('')
	const [date, setDate] = useState(new Date())
	const [notes, setNotes] = useState('')
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
	const [emoji, setEmoji] = useState('')
	const [geoCodingError, setGeoCodingError] = useState('')

	const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

	useEffect(
		function () {
			async function fetchCityData() {
				if (!lat && !lng) return //IF THERE IS NO LAT LNG INFO @ URL ESCAPE THIS FUNCTION

				try {
					setIsLoadingGeocoding(true) //start loading
					setGeoCodingError('') //reset error
					const res = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`,
					)
					const data = await res.json()
					// console.log(data)

					if (!data.countryCode)
						throw new Error(
							"That doesn't seem to be a city. Click somewhere else 😒",
						)

					setCityName(data.city || data.locality || '')
					setCountry(data.countryName)
					// console.log('⛔', emoji)
					setEmoji(convertToEmoji(data.countryCode))
				} catch (err) {
					setGeoCodingError(err.message)
				} finally {
					setIsLoadingGeocoding(false) //stop loading
				}
			}
			fetchCityData()
		},
		[lat, lng],
	)

	async function handleSubmit(event) {
		event.preventDefault()

		if (!cityName || !date) return

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		} //BASED ON DB STRUCTURE

		// console.log(newCity)
		await createCity(newCity) //we have to await this async function first to navigate away
		navigate('/app/cities')
	}

	if (!lat && !lng)
		return <Message message="Start by clicking somewhere on the map" />
	if (isLoadingGeocoding) return <Spinner />
	if (geoCodingError) return <Message message={geoCodingError} />

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ''}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={e => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{flagEmojiToPNG(emoji)}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				{/* <input id="date" onChange={e => setDate(e.target.value)} value={date} /> */}
				<ReactDatePicker
					onChange={date => setDate(date)}
					selected={date}
					dateFormat="dd/mm/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={e => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	)
}

export default Form
