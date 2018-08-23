var express = require('express');
var router = express.Router();

var Product = require('../models/product');

// handle file upload
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './img/estampas/')
    },
    filename: function (req, file, cb) {
        cb(null, "IMG-" + Date.now() + '.jpg') //Appending .jpg
    }
})

var upload = multer({ storage: storage });

/* GET all products */
router.get('/', function (req, res, next) {
    console.log("get all here: ", req.query);

    var pageOptions = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10
    }

    Product.find({})
        .skip((pageOptions.page-1) * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function (err, doc) {
            if (err) { res.status(500).json(err); return; };
            res.status(200).json(doc);
        });

    // Product.find({})
    //     .then(result => res.json(result))
    //     .catch(err => console.log(err))
});

/* GET all products */
router.get('/count', function (req, res, next) {
    Product.find({}, function (err, products) {
        if (err) {
            res.status(500).json({ message: "Erro ao tentar encontrar contar os produto" });
        }

        console.log(products);
        res.status(200).json({ counter: products.length });
    });
});


/* GET single Product by id */
router.get('/:id', function (req, res, next) {
    console.log("get Product by id");
    var query = { Reference: req.params.id };
    console.log(query);
    Product.findOne(query, function (err, product) {
        if (err) {
            res.status(500).json({ message: "Erro ao tentar encontrar o produto" });
        }
        if (!product) {
            res.status(404).json({ message: "Produto não cadastrado" });
        }

        console.log(product);
        res.status(200).json(product);
    });
});

/* GET single Product by id */
router.delete('/:id', function (req, res, next) {

    var query = { Reference: req.params.id };
    console.log("remove Product by id"); console.log(query);
    Product.findOneAndRemove(query, function (err, Product) {
        if (err) {
            res.status(500).json({ message: "Não foi possivel remover o produto" });
        }
        console.log(Product);
        res.status(200).json({ message: "Produto removido" });
    });
});

router.post('/register', function (req, res) {
    console.log("1:", req.body);

    Product.create(req.body, function (err, post) {

        if (err) {
            console.log("something");
            // Check if error is an error indicating duplicate account
            if (err.code === 11000) {
                res.status(400).json({ message: 'Produto ja existe' }); // Return error
            } else {
                console.log(err);
                res.status(500).json({ message: 'Não foi possivel salvar o produto. Error: ', err }); // Return error if not related to validation
            }
        } else {
            console.log("cadastrou");
            res.status(200).json({ message: 'Produto registrado!' }); // Return success
        }
    });
});


router.get('/estampas/:img', function (req, res) {

    console.log("GET ESTAMPAS: ", __dirname + "\\..\\img\\estampas\\" + req.query.Img);
    console.log(req.query);

    res.sendFile(req.query.Img, { root: __dirname + "\\..\\img\\estampas" }, function (err) {
        if (err) {
            console.log('Sent:', err);
            // next(err);
        } else {
            console.log('Sent:');
        }
    });
});



module.exports = router;