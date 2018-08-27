var express = require('express');
var router = express.Router();

var Order = require('../models/order');


/* GET all Orders */
router.get('/', function (req, res, next) {
    console.log("get all order here");
    Order.find({}, function(err, orders) {
        
        if(err)
            res.status(500).json({message: "Erro ao retornar os pedidos"});
        else {                      
            res.status(200).json(orders);
        }        
    });
});

/* GET single Order by id */
router.get('/:referenceId', function (req, res, next) {
    console.log("get Order by id");
    var query = { Reference: req.params.referenceId };
    console.log(query);
    Order.find(query, function (err, order) {
        if (err) {
            res.json(err);
        }
        console.log(order);
        res.json(order);
    });
});

router.post('/register',  function (req, res) {
    console.log("1:", req.body);

    let order = new Order({
        ClientName: req.body.ClientName,
        References: req.body.References,
        Sizes: req.body.Sizes
    })

    console.log("order:", order);

    Order.create(order, function (err, post) {

        if (err) {
            console.log("something");
            // Check if error is an error indicating duplicate account
            if (err.code === 11000) {
                res.status(400).json({ message: 'Pedido ja existe' }); // Return error
            } else {
                console.log(err);
                res.status(500).json({ message: 'Não foi possivel salvar o Pedido. Error: ', err }); // Return error if not related to validation
            }
        } else {
            console.log("cadastrou");
            res.status(200).json({  message: 'Pedido registrado!' }); // Return success
        }
    });
});


module.exports = router;