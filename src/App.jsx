import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />
        <Route
          path="product"
          element={<Product />}
        />
        <Route
          path="pricing"
          element={<Pricing />}
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
