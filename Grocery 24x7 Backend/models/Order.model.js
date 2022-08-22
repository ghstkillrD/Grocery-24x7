const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    /*orderID : {
        type : String,
        required: true,
    },*/
    date : {
        type : String,
        required: true
    },
    status : {
        type : String,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    contact : {
        type : String,
        required: true
    },
    method : {
        type : String,
        required: true
    },
    subtotal : {
        type : String,
        required: true
    },
    shipping : {
        type : String,
        required: true
    },
    total : {
        type : String,
        required: true
    },
})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;