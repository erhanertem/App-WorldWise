import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Homepage from './pages/Homepage'
import Login from './pages/Login'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Declare an index/default route */}
				<Route index element={<Homepage />} />
				{/* <Route path="/" element={<Homepage />} /> */}
				<Route path="pricing" element={<Pricing />} />
				<Route path="product" element={<Product />} />
				<Route path="login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					{/* Declare an index/default route */}
					<Route index element={<p>List of Cities</p>} />
					{/* Create nested routes */}
					<Route path="cities" element={<p>List of Cities</p>} />
					<Route path="countries" element={<p>Countries</p>} />
					<Route path="form" element={<p>Form</p>} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
