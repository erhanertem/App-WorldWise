/* eslint-disable react/prop-types */
import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

import { useCities } from '../contexts/CitiesContext';

import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../hooks/useUrlPosition';

import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]); // THIS STATE IS CREATED SO THAT THE LAST POSITION IS KEPT ON THE MAP EVENTHOUGH WE PRESS BACK BUTTON ON THE CITY DETAILS.
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  // SYNC PARAMS LAT/LNG DATA WITH MAPPOSITION DATA SO THE POPUP IS CENTERED CORRECTLY
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  // SYNC GEOLOCATION COORDINATES WITH MAPPOSITION DATA SO THE POPUP IS CENTERED
  useEffect(
    function () {
      if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button
          type="position"
          onClick={getPosition}
        >
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        // CENTER TO EITHER CLICKED COORDINATES OR USE DEFAULT MAP POS IF NOTHING IS CLICKED
        center={[mapLat || mapPosition[0], mapLng || mapPosition[1]]}
        zoom={10}
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
        <DetectClickEvent />
      </MapContainer>
    </div>
  );
}

// CREATE A CUSTOM REACT HOOK FOR THE REACT-LEAFLET LIBRARY TO DYNAMICALLY CHANGE MAPCONTAINER 'center' PROP
function ChangeCenter({ position }) {
  const map = useMap(); //Get a hold of the map instance
  map.setView(position); // Change centering coords based on the position state
  return null; //Every JSX should return either null or something...
}
// CREATE A CUSTOM REACT HOOK FOR THE REACT-LEAFLET LIBRARY TO LISTEN FOR CLICK EVENTS
function DetectClickEvent() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); //Change url state everytime clicked on the map
    },
  });
}

export default Map;
