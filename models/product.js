var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var ProductSchema = new mongoose.Schema({
    Reference: { type: String, required: true, unique: true },
    Price: { type: String },
    Img: {type: String, required: true},
    Category: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},    
});

ProductSchema.pre('save', function(next){
    console.log("pre save");
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('product', ProductSchema);