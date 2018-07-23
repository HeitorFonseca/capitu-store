var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var OrderSchema = new mongoose.Schema({
    Reference: { type: String, required: true},
    ClientName: {type: String, required: true},
    Sizes: {type: String, required: true},
});

// OrderSchema.pre('save', function(next){
//     console.log("pre save");
//     now = new Date();
//     if (!this.createdAt) {
//         this.createdAt = now;
//     }
//     next();
// });

module.exports = mongoose.model('order', OrderSchema);