import path from 'path';
import jsonServer from 'json-server';
import { fileURLToPath } from 'url';

const server = jsonServer.create();

// Get the directory name of the current module (since __dirname is not available in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = jsonServer.router(path.join(__dirname, '../data/cities.json')); // Your database file
const middlewares = jsonServer.defaults();

// Add custom middleware for CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow any origin
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
