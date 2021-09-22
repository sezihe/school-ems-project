const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const mongoose = require('mongoose');

const swaggerDocument = yaml.load('./swagger.yaml');

require('dotenv').config();

// connect MongoDb database
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
).then(() => console.log("DB connected!"));

// check for MongoDb connection error
mongoose.connection.on("error", err => console.log(`DB connection error: ${err.message}`));

const app = express();

// bringing in the routes
const timetableRoutes = require('./routes/timetable');

// using middlewares
app.use(morgan('tiny'));
app.use(helmet());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// using routes
app.use('/timetable', timetableRoutes);

// starting server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`Listening now at http://localhost:${PORT}`));