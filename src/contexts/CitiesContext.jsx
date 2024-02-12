/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
};

function reducer(state, action) {
	switch (action.type) {
		case 'loading':
			return { ...state, isLoading: true };
		case 'cities/loaded':
			return { ...state, isLoading: false, cities: action.payload };
		case 'city/loaded':
			return { ...state, isLoading: false, currentCity: action.payload };
		case 'city/created':
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case 'rejected':
			return { ...state, isLoading: false, error: action.payload };
		default:
			throw new Error('Undefined action type');
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);
	// REPLACE W/USEREDUCER
	// const [cities, setCities] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [currentCity, setCurrentCity] = useState({});

	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: 'loading' });
			try {
				// setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				// setCities(data);
				dispatch({ type: 'cities/loaded', payload: data });
			} catch {
				// alert('There was an erro loading data...');
				dispatch({ type: 'rejected', payload: 'There was an error loading cities...' });
			}
			// finally {
			// 	setIsLoading(false);
			// }
		}
		fetchCities();
	}, []);

	// NOTE: USECALLBACK TO TELL USEEFFECT @ CITY.JSX TO MEMOIZE THIS FUNCTION AND TREAT AS NOT DIFFERENT EACH TIME CALLED TO BREAK INFINITE CALL LOOP
	const getCity = useCallback(
		async function getCity(id) {
			//GUARD CLAUSE
			// IF SAME ITEM CLICKED REPEATEDLY API IS NOT CALLED AGAIN
			// console.log(id, currentCity.id);
			if (id === currentCity.id) return;

			dispatch({ type: 'loading' });
			try {
				// setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities/${id}`);
				const data = await res.json();
				dispatch({ type: 'city/loaded', payload: data });
				// setCurrentCity(data);
			} catch {
				// alert('There was an error loading data...');
				dispatch({ type: 'rejected', payload: 'There was an error loading city...' });
			}
			// finally {
			// 	setIsLoading(false);
			// }
		},
		[currentCity],
	);

	async function createCity(newCity) {
		dispatch({ type: 'loading' });
		try {
			// setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();

			// console.log(data);
			// setCities((cities) => [...cities, data]);
			dispatch({ type: 'city/created', payload: data });
		} catch {
			// alert('There was an error creating city.');
			dispatch({ type: 'rejected', payload: 'There was an error creating city.' });
		}
		// finally {
		// 	setIsLoading(false);
		// }
	}
	async function deleteCity(id) {
		dispatch({ type: 'loading' });
		try {
			// setIsLoading(true);
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});

			// setCities((cities) => cities.filter((city) => city.id !== id));
			dispatch({ type: 'city/deleted', payload: id });
		} catch {
			// alert('There was an error deleting city.');
			dispatch({ type: 'rejected', payload: 'There was an error deleting city.' });
		}
		// finally {
		// 	setIsLoading(false);
		// }
	}

	const flagemojiToPNG = (flag) => {
		const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
			.map((char) => String.fromCharCode(char - 127397).toLowerCase())
			.join('');
		return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />;
	};

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
				deleteCity,
				flagemojiToPNG,
				error,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);

	if (context === undefined)
		throw new Error('⛔ CitiesContext was used outside the CitiesProvider!');

	return context;
}

export { CitiesProvider, useCities };
