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

//app.post("/notifications", function (req, res) {
//    console.log("************* [ WebHook ]  ***************");
//    console.log("************* [ req.body ] ***************");
//    console.log(req.body);
//    console.log("************* [ res.body ] ***************");
//    console.log(res.body);
//    console.log("************* [ req.query ] ***************");
//    console.log(req.query);
//    console.log("************* [ res.query ] ***************");
//    console.log(res.query);
//    console.log("*************  [  -END-  ]  ***************");
//    res.status(200).send("OK");
//});

app.post('/notifications', bodyParser.raw({type: 'application/json'}), (request, response) => {
    const event = request.body;

    console.log("*************  [  -EVENT-  ]  ***************");
    console.log(event);
    console.log("*************  [  -END-  ]  ***************");
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a response to acknowledge receipt of the event
    //response.json({received: true});
    response.status(200).send("OK");
  });

app.listen(port);