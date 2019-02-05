var express = require('express');
var router = express.Router();

var fs = require('fs');
var xml2js = require('xml2js');

const xmlFolder = __dirname + '/../xml/';


/* GET home page. */
router.get('/', function (req, res, next) { //renvoie la liste des fichiers présents dans le répertoire xml
    fs.readdir(xmlFolder, (err, files) => {
        let filesArr = [];
        files.forEach(file => {
            file = file.substr(0, file.length - 4);
            filesArr.push(file);
        });
        res.send(JSON.stringify({"status": 500, "response": filesArr}));
    });
});

router.get('/:id', function (req, res, next) { //renvoie tous les éléments du fichier XML spécifié
    var id = req.params.id;
    var parser = new xml2js.Parser();
    fs.readFile(xmlFolder + id + '.xml', function (err, data) {
        parser.parseString(data, function (err, result) {
            if (err) {
                res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
            } else {
                res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
            }
        });
    });
});

module.exports = router;
