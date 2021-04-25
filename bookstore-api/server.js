const express = require('express');
const { json } = require("body-parser");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000'
};

require('dotenv').config();

const app = express();
const { PORT, swaggerOptions } = require('./config/config');

app.use(json());
app.use(cors(corsOptions));

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, {explorer: true}));

app.use(require('./routes'));

app.listen(PORT, ( )=>{
    console.log(`Listen PORT: ${PORT}`);    
});

module.exports = app;