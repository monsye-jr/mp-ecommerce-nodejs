const mercadopago = require("mercadopago");

mercadopago.configure({
  integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
  access_token:
    "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
});

module.exports = {
  ckeckout: function (items, req, res) {
    let base_url;

    // Use localhost for testing and Heroku for prod
    if (process.env.NODE_ENV === "dev") {
      base_url = "localhost:3000";
    } else {
      base_url = "https://monsye-jr-mp-ecommerce-nodejs.herokuapp.com";
    }

    console.log("base_url", base_url);
    console.log("req.body.img", req.body.img);

    // Modify item picture URL to correctly display it in mercadopago UI.

    // Preferencia de compra !!
    const preference = {
      payer: {
        name: "Lalo",
        email: "test_user_63274575@testuser.com",
        surname: "Landa",
        address: {
          street_name: "Falsa",
          street_number: 123,
          zip_code: "1111",
        },
        phone: {
          area_code: "11",
          number: 22223333,
        },
      },
      payment_methods: {
        excluded_payment_types: [
          {
            id: "atm",
          },
        ],
        excluded_payment_methods: [
          {
            id: "amex",
          },
        ],
        installments: 6,
      },
      items: [
        {
          id: "1234",
          picture_url: req.body.img,
          title: req.body.title,
          quantity: 1,
          unit_price: parseFloat(req.body.price),
          description: "Checkout PRO mercadopago",
        },
      ],
      external_reference: "nicolas.cabrera.lettiere@gmail.com",
      back_urls: {
        success: base_url + "/detail/ckeckout/success",
        pending: base_url + "/detail/ckeckout/pending",
        failure: base_url + "/detail/ckeckout/failure",
      },
      auto_return: "approved",
      notification_url: base_url + "/notifications",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        global.init_point = response.body.init_point;
        console.info("RESPONSE: .create(preference)", response);
        res.redirect(global.init_point);
      })
      .catch(function (error) {
        console.error("ERROR: .create(preference)", error);
      });
  },
};
