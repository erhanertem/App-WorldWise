/* eslint-disable react/prop-types */
import styles from './CountryList.module.css';

import CountryItem from './CountryItem';
import Message from './Message';
import Spinner from './Spinner';

function CountryList({ cities, isLoading }) {
  // GUARD CLAUSE- check spinner status
  if (isLoading) {
    return <Spinner />;
  }
  // GUARD CLAUSE - If the database is empty
  if (!cities.length) {
    return <Message message="Add your first city from the map" />;
  }

  // // > Approach #1
  // const uniqueCountriesData = [];
  // const uniqueCountries = [...new Set(cities.map((city) => city.country.toLowerCase()))];
  // let i = 0;
  // while (i < uniqueCountries.length) {
  //   for (let city of cities) {
  //     if (city.country.toLowerCase() === uniqueCountries[i]) {
  //       uniqueCountriesData.push({ country: city.country, emoji: city.emoji });
  //       break;
  //     }
  //   }
  //   i++;
  // }
  // > Approach #2
  const uniqueCountriesData = cities.reduce((refinedArr, city) => {
    if (!refinedArr.map((el) => el.country.toLowerCase()).includes(city.country.toLowerCase())) {
      return [...refinedArr, { country: city.country, emoji: city.emoji }];
    } else {
      return refinedArr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {uniqueCountriesData.map((country) => (
        <CountryItem
          country={country}
          key={country.country}
        />
      ))}
    </ul>
  );
}

export default CountryList;
