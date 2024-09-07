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

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
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
