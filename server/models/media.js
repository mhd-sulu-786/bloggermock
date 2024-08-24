const  mongoose = require('mongoose');

const mediaschema = mongoose.Schema({

    username:String,
    userid:String,
    text:String,
    commants:Array,
    image:String
});

exports = mongoose.model("Media",mediaschema);