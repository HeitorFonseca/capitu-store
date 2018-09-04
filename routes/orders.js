var express = require('express');
var router = express.Router();

var Order = require('../models/order');


/* GET all Orders */
router.get('/', function (req, res, next) {
    console.log("get all order here");
    Order.find({}, function (err, orders) {

        if (err)
            res.status(500).json({ message: "Erro ao retornar os pedidos" });
        else {
            res.status(200).json(orders);
        }
    });
});

/* GET single Order by id */
router.get('/:id', function (req, res, next) {
    console.log("get Order by id");
    var query = { _id: req.params.id };
    console.log(query);
    Order.findById(query, function (err, order) {
        if (err) {
            res.json(err);
        }
        console.log(order);
        res.json(order);
    });
});

router.post('/register', function (req, res) {
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
            res.status(200).json({ message: 'Pedido registrado!' }); // Return success
        }
    });
});

/* GET single Product by id */
router.delete('/:id', function (req, res, next) {

    var query = { _id: req.params.id };
    console.log("remove Product by id"); console.log(query);
    Order.findOneAndRemove(query, function (err, order) {
        if (err) {
            res.status(500).json({ message: "Não foi possivel remover o Pedido" });
        }
        if (!order) {
            res.status(404).json({ message: "Pedido não encontrado" });
        }
        else {
            res.status(200).json({ message: "Pedido removido" });
        }
    });
});


/* PUT client user */
router.put('/:id', function (req, res, next) {

    var query = { _id: req.params.id };
    console.log("put client user:", query);

    Order.findOneAndUpdate(query, req.body, function (err, order) {
        if (err) {
            res.status(500).json({ message: 'Não foi possivel editar o cliente.' }); // Return error if not related to validation              
        } else {
            res.status(200).json(order); // Return success
        }
    });
});

router.patch('/:id/confirm', function (req, res) {

    let id = req.params.id;
    Order.findById(id, function (err, order) {

        order.Confirmed = true;

        order.save((err) => {
            if (err)
                res.status(500).json({ success: false, message: 'Pedido não pode ser confirmado' });
            else {
                res.status(204).send();
            }
        })
    });
});

module.exports = router;