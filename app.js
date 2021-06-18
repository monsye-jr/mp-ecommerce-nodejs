var express = require('express');
var exphbs  = require('express-handlebars');

var mp = require('./js/mp'); // script para procesar pagos

var port = process.env.PORT || 3000

var app = express();

app.use(express.urlencoded({ extended: false }));
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/detail/ckeckout', function (req, res) {
    mp.ckeckout(req.body, req, res);
});

app.get('/detail/ckeckout/success', function (req, res) {
    console.log("************* [ success ]  ***************");
    console.log("************* [ req.body ] ***************");
    console.log(req.body);
    console.log("************* [ res.body ] ***************");
    console.log(res.body);
    console.log("************* [ req.query ] ***************");
    console.log(req.query);
    console.log("************* [ res.query ] ***************");
    console.log(res.query);
    console.log("*************  [  -END-  ]  ***************");
    res.render('success', req.query);
});

app.get('/detail/ckeckout/pending', function (req, res) {
    res.render('pending', req.query);
});

app.get('/detail/ckeckout/failure', function (req, res) {
    res.render('failure', req.query);
});

app.post("/notifications", function (req, res) {
    console.log("************* [ WebHook ]  ***************");
    console.log("************* [ req.body ] ***************");
    console.log(req.body);
    console.log("************* [ res.body ] ***************");
    console.log(res.body);
    console.log("************* [ req.query ] ***************");
    console.log(req.query);
    console.log("************* [ res.query ] ***************");
    console.log(res.query);
    console.log("*************  [  -END-  ]  ***************");
    res.status(201).send("OK");
});

app.listen(port);