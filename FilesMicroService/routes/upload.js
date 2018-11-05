const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Uuid = require('cassandra-driver').types.Uuid;
const fs = require('fs');

const {fileModel, cassandra} = require('../models/FilesModel');
const { ALLOW_EXTS } = require('../config');

const MB = 1024 * 1024;
const COUNT_MB = 20;
const MAX_FILE_SIZE = COUNT_MB * MB;

let fileName = '';
let fileSize = 0;

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
      fileName = file.originalname;
      callback(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, callback) => {

        const ext = path.extname(file.originalname);

        if (!ALLOW_EXTS.includes(ext)) {
            const err = new Error ('Forbidden extension!');
            err.code = "FORBIDDEN_EXTENSION";

            return callback(err);
        }

        callback(null, true);
    }
}).single('file');

router.post('/files', (req, res) => {

    upload(req, res, (err) => {
        let errors = [];

        if (err) {
           if (err.code === 'FORBIDDEN_EXTENSION') errors.push("The extension is unavailable");
           if (err.code === 'LIMIT_FILE_SIZE') errors.push(`Max size of file is ${COUNT_MB} mb`);
        } else {
            fileSize = parseFloat(((fs.statSync(`./uploads/${fileName}`).size) / MB).toPrecision(3));

            let file = new fileModel({
                name: fileName,
                size: fileSize
            });

            let query_object = {name: fileName};
            let options = {if_not_exists: true};

            file.save(query_object, options, (err) => {
                if (err) throw err;
                
                console.log('Saved');
            });
        }

        res.json({
            success: !errors.length > 0,
            errors: errors
        });
    });
});

module.exports = router;
