import { createContext, useState, useEffect, useContext } from 'react'

const BASE_URL = 'http://localhost:9000'

// Create Context API
const CitiesContext = createContext()

//Create Context Provider
function CitiesProvider({ children }) {
	const [cities, setCities] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [currentCity, setCurrentCity] = useState({}) //Its a global state as its being used both by the city and cityitem

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true)
				const res = await fetch(`${BASE_URL}/cities`)
				const data = await res.json()
				setCities(data)
			} catch {
				alert('There was an error loading data...')
			} finally {
				setIsLoading(false)
			}
		}
		fetchCities()
	}, [])

	async function getCity(id) {
		try {
			setIsLoading(true)
			const res = await fetch(`${BASE_URL}/cities/${id}`)
			const data = await res.json()
			setCurrentCity(data)
		} catch {
			alert('There was an error loading data...')
		} finally {
			setIsLoading(false)
		}
	}

	async function createCity(newCity) {
		try {
			setIsLoading(true)
			const response = await fetch(`${BASE_URL}/cities/`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: { 'Content-type': 'application/json' },
			})
			const data = await response.json()
			// console.log(data)
			setCities(cities => [...cities, data])
		} catch (err) {
			alert('There was an error creating the city')
		} finally {
			setIsLoading(false)
		}
	}

	async function deleteCity(id) {
		try {
			setIsLoading(true)
			const response = await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			})
			setCities(cities => cities.filter(city => city.id !== id)) //UPDATE STATE AFTER DELETION VIA FILTER OPERATION
		} catch {
			alert('There was an error deleting the city')
		} finally {
			setIsLoading(false)
		}
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
