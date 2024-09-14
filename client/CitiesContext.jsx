/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';

const BASE_URL = 'http://localhost:8000';

// INSTANTIATE A CONTEXT API
const CitiesContext = createContext();

// REDUCER SETUP FOR THIS CONTEXT API
// USEREDUCER INITIALSTATE
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};
// USEREDUCER REDUCER FUNCTION
function reducer(currState, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...currState,
        isLoading: true,
      };
    case 'cities/loaded':
      return {
        ...currState,
        isLoading: false,
        cities: action.payload,
      };
    case 'city/loaded':
      return {
        ...currState,
        isLoading: false,
        currentCity: action.payload,
      };
    case 'city/created':
      return {
        ...currState,
        isLoading: false,
        cities: [...currState.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...currState,
        isLoading: false,
        cities: currState.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return {
        ...currState,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error('Invalid action type ' + action.type);
  }
}

// CREATE A CUSTOM CONTEXT PROVIDER TO WRAP AROUND CHILD COMPONENTS AND SERVE PERTINENT STATE/EVENTHANDLERS
function CitiesProvider({ children }) {
  // CONSUME USEREDUCER
  const [currState, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = currState;

  // NOTE: REPLACED BY USEREDUCER STATE MANAGEMENT
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    (async function fetchCities() {
      try {
        dispatch({ type: 'loading' });
        // setIsLoading(true);

        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();

        dispatch({ type: 'cities/loaded', payload: data });
        // setCities(data);
      } catch {
        // alert('There was an error loading data...');
        dispatch({ type: 'rejected', payload: 'There was an error loading cities...' });
      }
      // finally {
      //   setIsLoading(false);
      // }
    })();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      // GUARD CLAUSE - if already the city clicked already the current city do not proceed with fetch req
      if (Number(id) === currentCity.id) return;

      try {
        dispatch({ type: 'loading' });
        // setIsLoading(true);

        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();

        dispatch({ type: 'city/loaded', payload: data });
        // setCurrentCity(data);
      } catch {
        // alert('There was an error loading data...');
        dispatch({ type: 'rejected', payload: 'There was an error loading the city...' });
      }
      // finally {
      //   setIsLoading(false);
      // }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      // setIsLoading(true);

      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      // console.log(data);

      // SYNC UI STATE WITH THE DB(REMOTE STATE)
      dispatch({ type: 'city/created', payload: data });
      // setCities((cities) => [...cities, data]);
    } catch {
      // alert('There was an error creating data...');
      dispatch({ type: 'rejected', payload: 'There was an error creating the city...' });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      // setIsLoading(true);

      // REMOVE THE ITEM FROM THE DB(REMOTE STATE)
      await fetch(`${BASE_URL}/cities/${id}`, { method: 'DELETE' });

      // SYNC UI STATE WITH THE DB(REMOTE STATE)
      dispatch({ type: 'city/deleted', payload: id });
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      // alert('There was an error deleting data...');
      dispatch({ type: 'rejected', payload: 'There was an error deleting the city...' });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        createCity,
        deleteCity,
        currentCity,
        error,
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
