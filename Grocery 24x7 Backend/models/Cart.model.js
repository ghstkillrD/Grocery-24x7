const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const cartSchema = new Schema({
 
    itemDesc : {
        type : String,
        
    },
 
    itemname : {
        type : String,
        
    },
 
    quantity : {
        type : Number,
        
    },
 
    itemprice : {
        type : Number,
        
    },
    qPrice : {
        type : Number
    }
 
})
 
const Cart = mongoose.model("Cart", cartSchema);
 
module.exports = Cart;