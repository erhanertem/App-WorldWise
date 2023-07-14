import { lazy } from 'react'
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

import CityList from './components/CityList'
import City from './components/City'
import CountryList from './components/CountryList'
import Form from './components/Form'
import SpinnerFullPage from './components/SpinnerFullPage'

// import Product from './pages/Product'
// import Pricing from './pages/Pricing'
// import Homepage from './pages/Homepage'
// import Login from './pages/Login'
// import AppLayout from './pages/AppLayout'
// import PageNotFound from './pages/PageNotFound'

const Homepage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

/* 
VERY IMPORTANT! LAZY LOAD REACT FEATURE REQUIRES WRAPPING ROUTES W/ REACT SUSPENSE COMPONENT, SO THAT IF A ROUTE W/LAZY LOADING IS HIT, SUSPENSE A TEMPORARY FALLBACK COMPONENT TILL THE ACTUAL COMPONENT IS LOADED.

-> DIST FILE STATS PRIOR TO LAZY LOADING

dist/index.html                   0.64 kB │ gzip:   0.44 kB
dist/assets/index-5b9c22e4.css   30.23 kB │ gzip:   5.06 kB
dist/assets/index-f902d23e.js   524.90 kB │ gzip: 148.67 kB

-> DIST FILE STATS AFTER LAZY LOADING

dist/index.html                           0.64 kB │ gzip:   0.44 kB
dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
dist/assets/Homepage-8290e747.css         0.51 kB │ gzip:   0.30 kB
dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
dist/assets/AppLayout-870a6180.css        1.91 kB │ gzip:   0.70 kB
dist/assets/index-5e54d885.css           26.56 kB │ gzip:   4.36 kB
dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
dist/assets/PageNotFound-25395357.js      0.15 kB │ gzip:   0.15 kB
dist/assets/Logo-7e2cb9f7.js              0.21 kB │ gzip:   0.19 kB
dist/assets/PageNav-57f30efd.js           0.48 kB │ gzip:   0.27 kB
dist/assets/Pricing-8e7541ff.js           0.65 kB │ gzip:   0.41 kB
dist/assets/Homepage-5561df2a.js          0.67 kB │ gzip:   0.41 kB
dist/assets/Product-4eac3988.js           0.86 kB │ gzip:   0.48 kB
dist/assets/Login-68549b78.js             1.01 kB │ gzip:   0.53 kB
dist/assets/AppLayout-066d66fc.js       156.95 kB │ gzip:  46.14 kB
dist/assets/index-57bd64a0.js           366.21 kB │ gzip: 102.11 kB
*/

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							{/* Declare an index/default route */}
							<Route index element={<Homepage />} />
							{/* <Route path="/" element={<Homepage />} /> */}
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
								{/* Declare an index/default route - redirects by default using navigate hook*/}
								<Route index element={<Navigate replace to="cities" />} />
								{/* replace makes it a loose navigate meaning it will let you back off in the browser history */}
								{/* Create nested routes */}
								<Route path="cities" element={<CityList />} />
								{/* Nested Route with id params */}
								<Route path="cities/:id" element={<City />} />
								{/* Create nested routes */}
								<Route path="countries" element={<CountryList />} />
								<Route path="form" element={<Form />} />
							</Route>
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	)
}

export default App
