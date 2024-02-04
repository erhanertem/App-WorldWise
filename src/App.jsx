import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

const BASE_URL = 'http://localhost:8000';

function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch {
				alert('There was an erro loading data...');
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	return (
		// <div>
		// 	<p>Hello Router</p>
		<BrowserRouter>
			<Routes>
				{/* <Route path="/" element={<HomePage />} /> */}
				<Route index element={<HomePage />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="product" element={<Product />} />
				<Route path="login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					{/* Index Route is the default nested route if none provided */}
					{/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} /> */}
					{/* REDIRICTING INDEX ROUTE */}
					<Route index element={<Navigate replace to="cities" />} />
					{/* Define 3 child routes */}
					<Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
					<Route path="cities/:id" element={<City />} />
					<Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
					<Route path="form" element={<Form />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
		// </div>
	);
}

export default App;
