import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
polyfillCountryFlagEmojis();

import { CitiesProvider } from './contexts/CitiesContext.jsx';
import { AuthProvider } from './contexts/FakeAuthContext.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

// /*
// dist/index.html                   0.47 kB │ gzip:   0.31 kB
// dist/assets/index-R2enLw2h.css   29.92 kB │ gzip:   5.06 kB
// dist/assets/index-ildmXDot.js   511.99 kB │ gzip: 148.00 kB
// */
// import Product from './pages/Product.jsx';
// import Pricing from './pages/Pricing.jsx';
// import HomePage from './pages/HomePage.jsx';
// import Login from './pages/Login.jsx';
// import AppLayout from './pages/AppLayout';
// import PageNotFound from './pages/PageNotFound.jsx';

/*
dist/index.html                           0.47 kB │ gzip:   0.32 kB
dist/assets/Logo-rXzzFTzh.css             0.03 kB │ gzip:   0.05 kB
dist/assets/Login-Hz-oqbuF.css            0.35 kB │ gzip:   0.22 kB
dist/assets/Product-l96e_Z8K.css          0.47 kB │ gzip:   0.27 kB
dist/assets/Homepage-lvi6cBgQ.css         0.49 kB │ gzip:   0.30 kB
dist/assets/PageNav-tpSF5DwP.css          0.51 kB │ gzip:   0.28 kB
dist/assets/AppLayout-r9Wc3pKD.css        1.91 kB │ gzip:   0.70 kB
dist/assets/index-dux0IzI9.css           26.27 kB │ gzip:   4.39 kB
dist/assets/Product.module-OBpXS8Vy.js    0.06 kB │ gzip:   0.07 kB
dist/assets/PageNotFound-UczsfLU_.js      0.15 kB │ gzip:   0.15 kB
dist/assets/Logo-cDAGFz3w.js              0.21 kB │ gzip:   0.19 kB
dist/assets/PageNav-ume1biDQ.js           0.49 kB │ gzip:   0.28 kB
dist/assets/Pricing-wf7btgYB.js           0.65 kB │ gzip:   0.42 kB
dist/assets/Homepage-Ck2Hd_Lt.js          0.67 kB │ gzip:   0.42 kB
dist/assets/Product-TBCYFnfW.js           0.86 kB │ gzip:   0.49 kB
dist/assets/Login-PrKBvl_W.js             1.01 kB │ gzip:   0.54 kB
dist/assets/AppLayout-DFbQVRWT.js       156.93 kB │ gzip:  46.22 kB
dist/assets/index-1M5hCsAa.js           353.44 kB │ gzip: 101.45 kB
 */
const Product = lazy(() => import('./pages/Product.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const HomePage = lazy(() => import('./pages/Homepage.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const AppLayout = lazy(() => import('./pages/AppLayout.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'));

import CityList from './components/CityList.jsx';
import City from './components/City.jsx';
import Form from './components/Form.jsx';
import CountryList from './components/CountryList.jsx';
import SpinnerFullPage from './components/SpinnerFullPage.jsx';

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
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
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
