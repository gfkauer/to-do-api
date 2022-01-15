const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const database = require('./database');

const app = express();

var cosrOption = {
    origin: "http://localhost:8081"
};

const configureExpress = () => {
    app.use(bodyParser.json());
    app.use(cors(cosrOption));

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use(express.urlencoded({ extended: true }));

    app.use('/api', routes);
    app.database = database;

    return app;
};

module.exports = async () => {
    const app = configureExpress();
    await app.database.connect();

    return app;
};