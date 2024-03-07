/* eslint-disable react/prop-types */
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
    const { cities, isLoading } = useCities();

    if (isLoading) return <Spinner />;
    if (!cities.length)
        return <Message message="Add your first city by clicking on a city on the map" />;
    // console.log(cities);
    // // > Solution #1 w/Set - direct input
    // const countriesUnique = new Set(
    //     cities.map((city) => JSON.stringify({ country: city.country, emoji: city.emoji })),
    // );
    // const countries = [...countriesUnique].map((each) => JSON.parse(each));
    // // > Solution #2 w/Reduce via map.include
    // const countries = [];
    // cities.forEach((city) => {
    //     if (!countries.map((country) => country.country).includes(city.country))
    //         countries.push(city);
    // });
    // // > Solution #3 w/Map
    // function getCountries(arr) {
    //     let unique = new Map();

    //     arr.forEach((obj) => {
    //         unique.set(obj.country, { country: obj.country, emoji: obj.emoji });
    //     });
    //     return Array.from(unique.values());
    // }
    // const countries = getCountries(cities);
    // // > Solution #4 w/Set - indirect input
    // const uniqueCountries = new Set();
    // const countries = cities.flatMap(({ country, emoji }) => {
    //     if (!uniqueCountries.has(country)) {
    //         uniqueCountries.add(country);
    //         return { country, emoji };
    //     } else return [];
    // });
    // > Solution #5
    const countries = cities.reduce((array, city) => {
        if (!array.map((el) => el.country).includes(city.country)) {
            return [...array, { country: city.country, emoji: city.emoji }];
        } else {
            return array;
        }
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem
                    country={country}
                    key={country.country}
                />
            ))}
        </ul>
    );
}

export default CountryList;
