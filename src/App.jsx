import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
polyfillCountryFlagEmojis();

// SPA ROUTES
// import Homepage from './pages/Homepage';
// import AppLayout from './pages/AppLayout';
// import Login from './pages/Login';
// import PageNotFound from './pages/PageNotFound';
// import Pricing from './pages/Pricing';
// import Product from './pages/Product';
// LAZY LOADED SPA ROUTES
const Homepage = lazy(() => import('./pages/Homepage'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Product = lazy(() => import('./pages/Product'));

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { AuthProvider } from './contexts/AuthContext';
import { CitiesProvider } from './contexts/CitiesContext';
import ProtectedRoute from './pages/ProtectedRoute';
import SpinnerFullPage from './components/SpinnerFullPage';

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* 3 nested routes */}
                {/* Default loaded route */}
                <Route
                  index
                  element={
                    <Navigate
                      replace
                      to="cities"
                    />
                  }
                />
                {/* Nested route @ app/cities */}
                <Route
                  path="cities"
                  element={<CityList />}
                />
                {/* Dynamic Nested param route @ app/cities/{id} */}
                <Route
                  path="cities/:id"
                  element={<City />}
                />
                {/* Nested route @ app/countries */}
                <Route
                  path="countries"
                  element={<CountryList />}
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
