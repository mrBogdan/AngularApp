const incomingForm = require("formidable").IncomingForm;

module.exports = function(req, res) {
    let form = new incomingForm();

    form.on('file', () => {

    });

    form.on('end', () => {
        res.json();
    });

    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = '/upload/' + files.filetoupload.name;

        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });
};