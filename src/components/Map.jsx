/* eslint-disable no-unused-vars */
import styles from './Map.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from 'react-leaflet'
import { useState, useEffect } from 'react'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeoLocation'
import Button from './Button'

import flagEmojiToPNG from './flagEmojiToPNG'

function Map() {
	const { cities } = useCities()
	const [mapPosition, setMapPosition] = useState([40, 0])
	const [searchParams, setSearchParams] = useSearchParams()
	const {
		isLoading: isLoadingPosition,
		position: geoLocationPosition,
		getPosition,
	} = useGeolocation()

	const mapLat = searchParams.get('lat')
	const mapLng = searchParams.get('lng')

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
		},
		[mapLat, mapLng],
	)

	useEffect(
		function () {
			if (geoLocationPosition)
				setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
		},
		[geoLocationPosition],
	)

	return (
		<div className={styles.mapContainer}>
			{!geoLocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'Use your position'}
				</Button>
			)}
			<MapContainer
				className={styles.map}
				center={mapPosition}
				zoom={13}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map(city => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{flagEmojiToPNG(city.emoji)}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	)
}

function ChangeCenter({ position }) {
	const map = useMap()
	map.setView(position)
	return null
}

function DetectClick() {
	const navigate = useNavigate()

	useMapEvents({
		click: event => {
			// console.log(event)
			navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`)
		},
	})
}

export default Map
