/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

import { useCities } from '../contexts/citiesContext';

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  // THIS STATE IS CREATED SO THAT THE LAST POSITION IS KEPOT ON THE MAP EVENTHOUGH WE PRESS BACK BUTTON ON THE CITY DETAILS.
  const [mapPosition, setMapPosition] = useState([40, 0]);

  // Read uRL for lat lng coordinates when clicked on one of the cities in the cities tab
  const [searchParams, setSearchParams] = useSearchParams();
  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  // SYNC PARAMS LAT/LNG DATA WITH MAPPOSITION DATA SO THE POPUP IS CENTERED CORRECTLY
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form');
      }}
    >
      <MapContainer
        center={[mapLat || 40, mapLng || 0]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

// CREATE A CUSTOM REACT HOOK FOR THE REACT-LEAFLET LIBRARY TO DYNAMICALLY CHANGE MAPCONTAINER 'center' PROP
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null; //Every JSX should return either null or something...
}

export default Map;
