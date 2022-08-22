const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    
    contact: {
        type: String,
        required: true
    },
    method: {
        type: String,
       
    },
    total: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    date : {
        type : String,
        required: true
    },
})
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;