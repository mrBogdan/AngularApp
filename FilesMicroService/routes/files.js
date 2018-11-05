const express = require('express');
const Uuid = require('cassandra-driver').types.Uuid;
const fs = require('fs');
const path = require('path');

const {fileModel, cassandra} = require('../models/FilesModel');
const { UPLOAD_FOLDER } = require('../config');

const router = express.Router();

router.get("/files/exts", (req, res) => {


    cassandra.instance.files.find({}, {raw: true}, (err, files) => {
        if (err) throw err;

        var exts = { };
        for (var i = 0; i < files.length; i++) {
            let ext = path.extname(files[i].name);
            if (!exts[ext]) {
                exts[ext] = 1;
            } else {
                exts[ext]++;
            }
        }

        res.json(exts);
    });
});

router.get("/files/:id", (req, res) => {
    const id = Uuid.fromString(req.params["id"]);

    cassandra.instance.files.find({id: id}, {raw: true},(err, file) => {
        if (err) throw err;

        res.json(file);
    });
});

router.get("/files", (req, res) => {

    cassandra.instance.files.find({}, (err, files) => {
        if (err) throw err;
        res.json(files);
    });
});

router.put("/files/:id", (req, res) => {
    const FILE = req.body;
    const id = Uuid.fromString(FILE.id);

    let queryObject = {id: id};
    let updateValueObject = {name: FILE.name};

    cassandra.instance.files.findOne(queryObject, function (err, file) {
        if (err) throw err;

        if (fs.existsSync(`${UPLOAD_FOLDER}${file.name}`)) {
            fs.rename(`./uploads/${file.name}`, `./uploads/${FILE.name}`);
        }
    });

    cassandra.instance.files.update(queryObject, updateValueObject, (err) => {
        if (err) throw err;
    });
    res.json({success: true});
});

router.delete("/files/:id", (req, res) => {
    const id = Uuid.fromString(req.params["id"]);
    let isDeleted = false;

    cassandra.instance.files.findOneAsync({id: id}, (err, file) => {
        if (err) throw err;

    }).then((file) => {
        let filePath = `${UPLOAD_FOLDER}${file.name}`;
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) throw err;

                console.log('Deleted');
            });
        }

        file.delete((err) => {
            if (err) throw err;

            console.log('Done');
        });

        isDeleted = true;
    });

    res.json({success: isDeleted});
});

module.exports = router;



