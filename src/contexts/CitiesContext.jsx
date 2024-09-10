/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8000';

// Create a Context
const CitiesContext = createContext();

// Create a Custom Context Provider with pertinent state/eventhandlers in order to wrap child components and serve them
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    (async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch {
      alert('There was an error loading data...');
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      // console.log(data);
      // SYNC UI STATE WITH THE DB(REMOTE STATE)
      setCities((cities) => [...cities, data]);
    } catch {
      alert('There was an error loading data...');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        createCity,
        currentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  //GUARD CLAUSE
  if (context === undefined) throw new Error('CitiesContext was used outside the scope of CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
