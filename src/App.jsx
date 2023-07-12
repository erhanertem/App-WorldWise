import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import CityList from './components/CityList'
import City from './components/City'
import CountryList from './components/CountryList'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
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
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	)
}

export default App
