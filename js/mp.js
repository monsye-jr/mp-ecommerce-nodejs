const mercadopago = require("mercadopago");

mercadopago.configure({
  integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
  access_token:
    "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
});

module.exports = {
  procesar_pago: function (items, req, res) {
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
      back_urls: {
        success: "localhost:3000/detail/procesar-pago/success",
        pending: "localhost:3000/detail/procesar-pago/pending",
        failure: "localhost:3000/detail/procesar-pago/failure",
      },
      auto_return: "approved",
      notification_url: "localhost:3000/web-hooks",
      external_reference: "nicolas.cabrera.lettiere@gmail.com",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        global.init_point = response.body.init_point;
        res.redirect(global.init_point);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
