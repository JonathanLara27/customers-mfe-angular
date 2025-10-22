const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ static: path.join(__dirname, 'public') });

// Configuración: delay en ms (por defecto 1000)
const DEFAULT_DELAY = Number(process.env.MOCK_DELAY ?? 1000);

// Middlewares por defecto (logger, CORS, etc.)
server.use(middlewares);

// Middleware para simular latencia
server.use((req, res, next) => {
  setTimeout(next, DEFAULT_DELAY);
});

// Para soportar POST, PUT, PATCH
server.use(jsonServer.bodyParser);

// Opcional: añadir una ruta personalizada de ejemplo
// server.get('/echo', (req, res) => res.jsonp({ query: req.query }));

// Usar router
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port} (delay=${DEFAULT_DELAY}ms)`);
});
