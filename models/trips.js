var mongoose = require('mongoose');

var tripSchema = mongoose.Schema({
    img: String,
    name: String,
    desc: String,
    depart: String,
    arrivee: String,
    date: String,
});

var tripModel = mongoose.model('trips', tripSchema);

module.exports = tripModel;


