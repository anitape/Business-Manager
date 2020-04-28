var express = require('express');
var cors = require('cors');
var path = require('path'); // for sending html file
var fs = require('fs');
let ejs = require('ejs')
var app = express();
app.use(cors());
let bodyParser = require('body-parser');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

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
app.get('/company', function (req, res) {
        var sql = "SELECT companies.name, companies.street, companies.postcode, companies.city, companies.business_id, companies.email, companies.phone"
        + " FROM companies"
        + " WHERE companies.city = 'Helsinki'";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result); // näkyykö selaimessa?
            console.log(result);
        });
    });


app.get('/index.html', function (req, res) {
  //  res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/update.html', function (req, res) {
    //  res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/' + 'update.html');
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
app.post('/create', function (req, res)  {
        var sql = "INSERT INTO companies(id, name, street, postcode, city, business_id, email, phone)"
            + " values(?,?,?,?,?,?,?,?)";
        con.query(sql, [req.body.id, req.body.name, req.body.street, req.body.postcode, req.body.city, req.body.business_id, req.body.email, req.body.phone],function (err, result) {
            if (err) throw err;
           // res.send(result); // näkyykö selaimessa?
            console.log(result);
        });
   // res.sendFile(__dirname + '/public/index.html');
    return res.redirect('/index.html');
    });

//GET COMPANY BY ID
app.get('/select/:id/:name/:street/:postcode/:city/:business_id/:email/:phone', function (req, res){
    var companyId = req.params.id;
    var companyName = req.params.name;
    var companyStreet = req.params.street;
    var companyCity = req.params.city;
    var companyPostcode = req.params.postcode;
    var companyBusinessid = req.params.business_id;
    var companyEmail = req.params.email;
    var companyPhone = req.params.phone;
    var alteredResult;
    var string;
    getUpdate(companyId, companyName, companyStreet, companyPostcode, companyCity, companyBusinessid, companyEmail, companyPhone,function(err, result) {
        if (err) {console.log("Database error!"); throw err;
        } else {
            console.log("JSON.stringify: " + JSON.stringify(req.headers));
            console.log("Result: " + result);
            string = JSON.stringify(result);
            console.log("String: " + string);
            alteredResult = '{"numOfRows":' +result.length+', "rows": '+string+'}';
            console.log("Altered result: " + alteredResult);
            console.log("Name: " + companyName);
            //res.send(alteredResult);
            res.render(__dirname + '/public/update.ejs', {id: companyId, name: companyName, street: companyStreet, postcode: companyPostcode, city: companyCity,  business_id: companyBusinessid, email: companyEmail, phone: companyPhone,});

    }});
});

var getUpdate = function(companyId, companyName, companyStreet, companyPostcode, companyCity,  companyBusinessid, companyEmail, companyPhone, callback) {
    var sql = "SELECT * from companies WHERE id = ? AND name = ? AND street = ? AND postcode = ? AND city = ? AND business_id = ? AND email = ? AND phone = ?";
    con.query(sql, [companyId, companyName, companyStreet, companyPostcode, companyCity, companyBusinessid, companyEmail, companyPhone], function (err, result) {
        if (err) return callback(err);
        console.log(result); // näkyykö selaimessa?
        return callback(null, result);
    });
};

//UPDATE COMPANY
app.post('/update', function (req, res) {
        var sql = "UPDATE companies SET name = '"+req.body.name+"', street = '"+req.body.street+"', postcode = '"+req.body.postcode+"', city = '"+req.body.city+"', business_id = '"+req.body.business_id+"', email = '"+req.body.email+"', phone = '"+req.body.phone+"' WHERE id = '"+req.body.id+"'";
        con.query(sql, [req.body.id, req.body.name, req.body.street, req.body.postcode, req.body.city, req.body.business_id, req.body.email, req.body.phone], function (err, result) {
            if (err) throw err;
            console.log("sql: "+sql);
           // res.send(req.body.phone); // näkyykö selaimessa?
            console.log("result:" + req.body.id, req.body.name, req.body.street, req.body.postcode, req.body.city, req.body.business_id, req.body.email, req.body.phone);
            //res.send(res);
            res.redirect('/index.html');
        });
});


//DELETE COMPANY
app.get('/delete/:id', function (req, res){
    console.log("I'm in delete");
        var sql = "DELETE FROM companies WHERE id = ?";
        con.query(sql, [req.params.id], function (err, result, fields) {
            if (err) throw err;
            //res.send("Record has been deleted successfully!"); // näkyykö selaimessa?
            console.log("Record has been deleted successfully!");
            console.log(result);
        });
    res.redirect('/index.html');
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});



