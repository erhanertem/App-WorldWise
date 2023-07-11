import {
	createContext,
	useState,
	useEffect,
	useContext,
	useReducer,
} from 'react'

const BASE_URL = 'http://localhost:9000'

// Create Context API
const CitiesContext = createContext()

//--->REDUCER INITIAL STATE VALUES
const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
}
//--->REDUCER FUNCTION
function reducer(state, action) {
	switch (action.type) {
		case 'loading':
			return { ...state, isLoading: true }
		case 'cities/loaded':
			return { ...state, isLoading: false, cities: action.payload }
		case 'city/loaded':
			return { ...state, isLoading: false, currentCity: action.payload }
		case 'city/created':
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
			}
		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(city => city.id !== action.payload),
			}
		case 'rejected':
			return { ...state, isLoading: false, error: action.payload }
		default:
			throw new Error('Unknown action type')
	}
}

//Create Context Provider
function CitiesProvider({ children }) {
	//--->USEREDUCER UNIFIED STATE MANAGEMENT DECLARATION
	// const [state,dispatch] = useReducer(reducer, initialState)
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
		reducer,
		initialState,
	)

	// const [cities, setCities] = useState([])
	// const [isLoading, setIsLoading] = useState(false)
	// const [currentCity, setCurrentCity] = useState({}) //Its a global state as its being used both by the city and cityitem

	useEffect(function () {
		async function fetchCities() {
			try {
				// setIsLoading(true)
				dispatch({ type: 'loading' })
				const res = await fetch(`${BASE_URL}/cities`)
				const data = await res.json()
				// setCities(data)
				dispatch({ type: 'cities/loaded', payload: data })
			} catch {
				// alert('There was an error loading data...')
				dispatch({
					type: 'rejected',
					payload: 'There was an error loading the cities...',
				})
			}
			// finally {
			// setIsLoading(false)
			// }
		}
		fetchCities()
	}, [])

	async function getCity(id) {
		try {
			// setIsLoading(true)
			dispatch({ type: 'loading' })
			const res = await fetch(`${BASE_URL}/cities/${id}`)
			const data = await res.json()
			// setCurrentCity(data)
			dispatch({ type: 'city/loaded', payload: data })
		} catch {
			// alert('There was an error loading data...')
			dispatch({
				type: 'rejected',
				payload: 'There was an error loading the city...',
			})
		}
		// finally {
		// 	setIsLoading(false)
		// }
	}

	async function createCity(newCity) {
		try {
			// setIsLoading(true)
			dispatch({ type: 'loading' })
			const response = await fetch(`${BASE_URL}/cities/`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: { 'Content-type': 'application/json' },
			})
			const data = await response.json()
			// console.log(data)
			// setCities(cities => [...cities, data])
			dispatch({ type: 'city/created', payload: data })
		} catch (err) {
			// alert('There was an error creating the city')
			dispatch({
				type: 'rejected',
				payload: 'There was an error creating the city...',
			})
		}
		// finally {
		// 	setIsLoading(false)
		// }
	}

	async function deleteCity(id) {
		try {
			// setIsLoading(true)
			dispatch({ type: 'loading' })
			const response = await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			})
			// setCities(cities => cities.filter(city => city.id !== id)) //UPDATE STATE AFTER DELETION VIA FILTER OPERATION
			dispatch({ type: 'city/deleted', payload: id })
		} catch {
			// alert('There was an error deleting the city')
			dispatch({
				type: 'rejected',
				payload: 'There was an error deleting the city...',
			})
		}
		// finally {
		// 	setIsLoading(false)
		// }
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	)
}

function useCities() {
	const context = useContext(CitiesContext)
	if (context === undefined) {
		throw new Error('CitiesContext was used outside the CitiesProvider')
	}
	return context
}

export { CitiesProvider, useCities }
