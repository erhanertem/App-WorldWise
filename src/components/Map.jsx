/* eslint-disable react/prop-types */
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
	const { cities, flagemojiToPNG } = useCities();
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const {
		isLoading: isLoadingPosition, //Rename in order to avoid global state naming clash
		position: geoLocationPosition, //Rename in order to avoid global state naming clash
		getPosition,
	} = useGeolocation();

	const [mapLat, mapLng] = useUrlPosition();

	//UPDATE MAP POSITION STATE BASED ON CLICK LAT/LNG COORDS ON THE LEAFLET MAP
	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng],
	);
	//UPDATE MAP POSITION STATE WHEN GET CURRENT LOCATION BTN CLICKED
	useEffect(
		function () {
			if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
		},
		[geoLocationPosition],
	);

	return (
		<div className={styles.mapContainer}>
			<Button type="position" onClick={getPosition}>
				{isLoadingPosition ? 'Loading...' : 'Use your position'}
			</Button>
			<MapContainer
				center={mapPosition}
				// center={[mapLat, mapLng]}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
						<Popup>
							<span>{flagemojiToPNG(city.emoji)}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}

				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

//CUSTOM COMPONENT TO WORK INSIDE REACT-LEAFLET_MAP API
//> SET NEW MARKER POSITION - NO JSX
function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}
//CUSTOM COMPONENT TO WORK INSIDE REACT-LEAFLET_MAP API
//> ON CLICK MAP EVENT TRIGGER IMPERRATIVE NAVIGATION W/LAT&LNG QUERY STRING INFORMATION
function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (event) => {
			// console.log(event);
			navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`);
		},
	});
}

export default Map;
