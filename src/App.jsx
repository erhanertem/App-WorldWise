import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      {/* Static header across all endpoints */}
      <h1>HELLO ROUTER!</h1>

      {/* Routed pages */}
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
            // All other routes yields pagenotfound
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
