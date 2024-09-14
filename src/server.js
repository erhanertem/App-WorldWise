import path from 'path';
import jsonServer from 'json-server';

const server = jsonServer.create();

const router = jsonServer.router(path.resolve('data/cities.json')); // Your database file
const middlewares = jsonServer.defaults();

// Add custom middleware for CORS
server.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://app-worldwise-erhan-ertem.onrender.com',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// Use default router
server.use(router);

server.listen(8000, () => {
  console.log('JSON Server is running');
});
