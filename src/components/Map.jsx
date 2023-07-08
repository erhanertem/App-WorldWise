/* eslint-disable no-unused-vars */
import styles from './Map.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'

function Map() {
	const navigate = useNavigate()
	const [mapPosition, setMapPosiiton] = useState([40, 0])

	const [searchParams, setSearchParams] = useSearchParams()

	const lat = searchParams.get('lat')
	const lng = searchParams.get('lng')

	return (
		<div
			className={styles.mapContainer}
			onClick={() => {
				navigate('form')
			}}
		>
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
				<Marker position={mapPosition}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}

export default Map
