var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
let bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for reading JSON

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "business",
    multipleStatements: true
});

con.connect(function(err){
    if(err) throw err;
    console.log('Connected to MySQL!');
});

//SELECT COMPANY
app.get('/', function (req, res) {
        var sql = "SELECT companies.name, companies.street, companies.postcode, companies.city, companies.business_id, companies.email, companies.phone"
        + " FROM companies"
        + " WHERE companies.city = 'Helsinki'";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result); // näkyykö selaimessa?
            console.log(result);
        });
    });

//GET ALL COMPANIES
app.get('/companies', function (req, res) {
    var alteredResult;
    var string;
    getResult(function(err, result) {
        if (err) {console.log("Database error!"); throw err;
        } else {
            console.log("JSON.stringify: " + JSON.stringify(req.headers));
            console.log("Result: " + result);
            string = JSON.stringify(result);
            alteredResult = '{"numOfRows":' +result.length+', "rows": '+string+'}';
            console.log("Altered result: " + alteredResult);
            res.send(alteredResult);
        }
    });
});

var getResult = function(callback) {
        var sql = "SELECT * from companies";
        con.query(sql, function (err, result) {
            if (err) return callback(err);
            console.log(result); // näkyykö selaimessa?
            return callback(null, result);
        });
};


//CREATE NEW COMPANY
app.post('/company', function (req, res) {
        var sql = "INSERT INTO companies(id, name, street, postcode, city, business_id, email, phone)"
            + " values(?,?,?,?,?,?,?,?)";
        con.query(sql, [req.body.id, req.body.name, req.body.street, req.body.postcode, req.body.city, req.body.business_id, req.body.email, req.body.phone],function (err, result, fields) {
            if (err) throw err;
            res.send(result); // näkyykö selaimessa?
            console.log(result);
        });
    });

//GET COMPANY ID
app.get('/companies/:id', function (req, res){
        var sql = "SELECT * from companies WHERE id = ?";
        con.query(sql, [req.params.id], function (err, result, fields) {
            if (err) throw err;
            res.send(result); // näkyykö selaimessa?
            console.log(result);
        });
});

//UPDATE COMPANY
app.put('/companies/:id', function (req, res){
        var sql = "UPDATE companies SET phone = ? WHERE id = ?";
        con.query(sql, [req.body.phone, req.params.id], function (err, result, fields) {
            if (err) throw err;
            res.send(req.body.phone); // näkyykö selaimessa?
            console.log(result);
        });
});

//DELETE COMPANY
app.delete('/companies/:id', function (req, res){
        var sql = "DELETE FROM companies WHERE id = ?";
        con.query(sql, [req.params.id], function (err, result, fields) {
            if (err) throw err;
            res.send("Record has been deleted successfully!"); // näkyykö selaimessa?
            console.log(result);
        });
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});



