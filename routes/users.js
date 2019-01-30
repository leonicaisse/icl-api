var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    global.connection.query('SELECT * from users', function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    global.connection.query('SELECT * from users WHERE id="' + id + '"', function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    global.connection.query('INSERT INTO users (name, email, password) VALUES ("' + name + '", "' + email + '", "' + password + '")', function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": "ok"
            }));
        }
    });
});

router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    global.connection.query('UPDATE users SET name = "' + name + '", email="' + email + '", password="' + password + '" WHERE id=' + id, function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": "ok"
            }));
        }
    });
});

module.exports = router;
