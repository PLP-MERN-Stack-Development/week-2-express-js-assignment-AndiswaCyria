const express = require('express');
const logger = require('./middleware/logger');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(logger);

// Hello World Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Routes
app.use('/api/products', productRoutes);

const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

app.use(notFound);
app.use(errorHandler);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error Handler (should be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

