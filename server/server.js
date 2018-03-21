require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const expressStaticGzip = require('express-static-gzip');

// MongodDB
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 8080;

// Dev Server
const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const webpack = require('webpack'); // eslint-disable-line global-require
  const config = require('../webpack.config.dev.js'); // eslint-disable-line global-require
  const compiler = webpack(config);

  const webpackDevMiddleware = require('webpack-dev-middleware')( // eslint-disable-line global-require
    compiler,
    config.devServer,
  );

  const webpackHotMiddlware = require('webpack-hot-middleware')( // eslint-disable-line global-require
    compiler,
    config.devServer,
  );

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  console.log('Middleware enabled');
}

// Middleware
app.use(bodyParser.json());
app.use(history());
app.use(expressStaticGzip('dist', {
  enableBrotli: true,
}));

// Routes
require('./routes/authRoutes')(app);
require('./routes/demoRoutes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Start
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} in ${process.env.NODE_ENV}`);
});
