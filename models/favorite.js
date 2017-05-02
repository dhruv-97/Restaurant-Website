// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var favSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }]
}, {
    timestamps: true
});

var Favorites = mongoose.model('favorite', favSchema);

// make this available to our Node applications
module.exports = Favorites;