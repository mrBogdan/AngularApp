const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes');

const app = express();

let corsOption = {
    origin: "*",
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/v1', routes.files);
app.use('/api/v1', routes.upload);

app.listen(config.PORT, () => {
    console.log("Server is running on", config.PORT);
});
