const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({

    orderID : {
        type : String,
        required: true,
    },
    reason : {
        type : String,
        required: true
    },
    desc : {
        type : String,
        required: true
    },
    
    date : {
        type : String,
        required: true
    }
})

const Request = mongoose.model("request",requestSchema);

module.exports = Request;