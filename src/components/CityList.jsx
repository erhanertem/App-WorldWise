/* eslint-disable react/prop-types */
import styles from './CityList.module.css';

import CityItem from './CityItem';
import Message from './Message';
import Spinner from './Spinner';

function CityList({ cities, isLoading }) {
  // GUARD CLAUSE- check spinner status
  if (isLoading) {
    return <Spinner />;
  }
  // GUARD CLAUSE - If the database is empty
  if (!cities.length) {
    return <Message message="Add your first city from the map" />;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          city={city}
          key={city.id}
        />
      ))}
    </ul>
  );
}

export default CityList;
