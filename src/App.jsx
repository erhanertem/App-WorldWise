import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
polyfillCountryFlagEmojis();

import Product from './pages/Product.jsx';
import AppLayout from './pages/AppLayout';
import Pricing from './pages/Pricing.jsx';
import HomePage from './pages/HomePage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Login from './pages/Login.jsx';
import CityList from './components/CityList.jsx';
import City from './components/City.jsx';
import Form from './components/Form.jsx';
import CountryList from './components/CountryList.jsx';
import { CitiesProvider } from './contexts/CitiesContext.jsx';
import { AuthProvider } from './contexts/FakeAuthContext.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Routes>
						{/* <Route path="/" element={<HomePage />} /> */}
						<Route index element={<HomePage />} />
						<Route path="pricing" element={<Pricing />} />
						<Route path="product" element={<Product />} />
						<Route path="login" element={<Login />} />
						<Route
							path="app"
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							{/* Index Route is the default nested route if none provided */}
							{/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} /> */}
							{/* REDIRICTING INDEX ROUTE */}
							<Route index element={<Navigate replace to="cities" />} />
							{/* Define 3 child routes */}
							{/* <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} /> */}
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							{/* <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} /> */}
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<Form />} />
						</Route>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
