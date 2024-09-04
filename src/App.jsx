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
          path="/"
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
        />
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
