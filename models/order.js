var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var OrderSchema = new mongoose.Schema({
    References: [{type: String, required: true}],
    ClientName: {type: String, required: true},
    Sizes: [{type: String, required: true}],
    Confirmed: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

OrderSchema.pre('save', function(next){
    console.log("pre save");
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('order', OrderSchema);