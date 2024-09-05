import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
polyfillCountryFlagEmojis();

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

const BASE_URL = 'http://localhost:8000';
function App() {
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
    <BrowserRouter>
      <Routes>
        <Route
          // path="/"
          index
          element={<Homepage />}
        />
        <Route
          path="pricing"
          element={<Pricing />}
        />
        <Route
          path="product"
          element={<Product />}
        />
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="app"
          element={<AppLayout />}
        >
          {/* 3 nested routes */}
          {/* Default loaded route */}
          <Route
            index
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          {/* Nested route @ app/cities */}
          <Route
            path="cities"
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          {/* Dynamic Nested param route @ app/cities/{id} */}
          <Route
            path="cities/:id"
            element={<City />}
          />
          {/* Nested route @ app/countries */}
          <Route
            path="countries"
            element={
              <CountryList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />
          {/* Nested route @ app/form */}
          <Route
            path="form"
            element={<Form />}
          />
        </Route>
        <Route
          // All other routes yields pagenotfound
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
