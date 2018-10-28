const express    = require("express");
const bodyParser = require("body-parser");
const fs         = require("fs");
const cors       = require("cors");
const config     = require("./config");

const app  = express();
const upload = require('./upload');

let corsOption = {
    origin: "*",
    optionsSuccessStatus: 200
};

const mockFiles = [
    { id: "dsfdsfdssdfdsfd8s7df9ds8f", name: '1.jpg', date: '28.10.2018', size: 1 },
    { id: 2, name: '2.bmp', date: '28.10.2018', size: 2 },
    { id: 3, name: '3.png', date: '28.10.2018', size: 0.2 },
    { id: 4, name: '4.gif', date: '28.10.2018', size: 5 },
    { id: 5, name: '5.svg', date: '28.10.2018', size: 0.77 },
    { id: 6, name: '6.txt', date: '28.10.2018', size: 0.76 },
    { id: 7, name: '7.zip', date: '28.10.2018', size: 0.22 },
    { id: 8, name: '8.jpg', date: '28.10.2018', size: 0.66 },
    { id: 9, name: '9.jpg', date: '28.10.2018', size: 7 },
    { id: 10, name: '10.jpg', date: '28.10.2018', size: 1 },
    { id: 11, name: '11.jpg', date: '28.10.2018', size: 1.66 },
    { id: 12, name: '12.jpg', date: '28.10.2018', size: 1.8 },
];

let data = mockFiles;

app.use(cors(corsOption));
app.use(bodyParser.json());

app.route("/api/v1/files").get((req, res) => {
    res.send(data);
});

app.route("/api/v1/files/:id").get((req, res) => {
    const id = req.params["id"];
    res.send(data.find(obj => obj.id == id));
});

app.route("/api/v1/files").post(upload);

app.route("/api/v1/files/:id").put((req, res) => {
    res.send(200, req.body);
});

app.route("/api/v1/files/:id").delete((req, res) => {
    res.send(204);
});

app.route("/api/v1/log").post((req, res) => {
    fs.appendFile('logs/log.log', req.body, (err, file) => {
        if ( err ) throw err;
        console.log('Saved!');
    });
    res.send(200);
});

module.exports = app;