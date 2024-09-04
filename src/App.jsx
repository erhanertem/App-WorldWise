import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';

function App() {
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
          <Route
            index
            element={<p>LIST</p>}
          />
          <Route
            path="cities"
            element={<p>List of Cities</p>}
          />
          <Route
            path="countries"
            element={<p>Countries</p>}
          />
          <Route
            path="form"
            element={<p>Form</p>}
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
