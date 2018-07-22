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
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})

var upload = multer({ storage: storage });

/* GET all products */
router.get('/', function (req, res, next) {
    console.log("get all here");
    Product.find({})
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

/* GET single Product by id */
router.get('/:userId', function (req, res, next) {
    console.log("get Product by id");
    var query = { OwnerId: req.query.userId };
    console.log(query);
    Product.find(query, function (err, properties) {
        if (err) {
            res.json(err);
        }
        console.log(properties);
        res.json(properties);
    });
});

router.post('/register', upload.single("fileToUpload"), function (req, res) {
    console.log("1:", req.body);
    let prod = new Product({
        Reference: req.body.Reference,
        Price: req.body.Price,
        Img: req.body.Img
    })

    console.log("produto:", prod);

    Product.create(prod, function (err, post) {
        console.log("yuke");

        if (err) {
            console.log("something");
            // Check if error is an error indicating duplicate account
            if (err.code === 11000) {
                res.json({ success: false, message: 'Produto ja existe' }); // Return error
            } else {
                console.log(err);
                res.json({ success: false, message: 'Não foi possivel salvar o produto. Error: ', err }); // Return error if not related to validation
            }
        } else {
            console.log("cadastrou");
            res.json({ success: true, message: 'Produto registrado!' }); // Return success
        }
    });
});


router.get('/estampas', function(req, res){
    res.sendFile(req.user.avatarName, {
        root: path.join(__dirname+'/../img/estampas/1531977405098.jpg'),
        headers: {'Content-Type': 'image/jpg'}
    }, function (err) {
        if (err) {
            console.log(err);
        }
    });
});

module.exports = router;