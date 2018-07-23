var express = require('express');
var router = express.Router();

var Order = require('../models/order');


/* GET all Orders */
router.get('/', function (req, res, next) {
    console.log("get all order here");
    Order.find({})
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

/* GET single Order by id */
router.get('/:orderId', function (req, res, next) {
    console.log("get Order by id");
    var query = { OwnerId: req.query.userId };
    console.log(query);
    Order.find(query, function (err, properties) {
        if (err) {
            res.json(err);
        }
        console.log(properties);
        res.json(properties);
    });
});

router.post('/register',  function (req, res) {
    console.log("1:", req.body);

    let order = new Order({
        ClientName: req.body.ClientName,
        Reference: req.body.Reference,
        Sizes: req.body.Sizes
    })

    console.log("order:", order);

    Order.create(order, function (err, post) {

        if (err) {
            console.log("something");
            // Check if error is an error indicating duplicate account
            if (err.code === 11000) {
                res.json({ success: false, message: 'Pedido ja existe' }); // Return error
            } else {
                console.log(err);
                res.json({ success: false, message: 'Não foi possivel salvar o Pedido. Error: ', err }); // Return error if not related to validation
            }
        } else {
            console.log("cadastrou");
            res.json({ success: true, message: 'Pedido registrado!' }); // Return success
        }
    });
});


router.get('/estampas/:img', function(req, res){

    console.log("GET ESTAMPAS: ", __dirname + "\\..\\img\\estampas\\" + req.query.Img);
    console.log(req.query);
    
    res.sendFile(req.query.Img,{root: __dirname +  "\\..\\img\\estampas" },function (err) {
        if (err) {
            console.log('Sent:', err);
          // next(err);
        } else {
          console.log('Sent:');
        }
      });

    // res.sendFile(req.user.avatarName, {
    //     root: path.join(__dirname+'/../img/estampas/1531977405098.jpg'),
    //     headers: {'Content-Type': 'image/jpg'}
    // }, function (err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });
});


module.exports = router;