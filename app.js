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

app.post('/detail/procesar-pago', function (req, res) {
    mp.procesar_pago(req.body, req, res);
});

app.get('/detail/procesar-pago/success', function (req, res) {
    res.render('success', req.query);
});

app.get('/detail/procesar-pago/pending', function (req, res) {
    res.render('pending', req.query);
});

app.get('/detail/procesar-pago/failure', function (req, res) {
    res.render('failure', req.query);
});

app.get("/web-hooks", function (req, res) {
    console.log(req.body);
    res.status(200).send("OK");
});

app.listen(port);