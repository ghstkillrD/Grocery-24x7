const mongoose = require('mongoose');



const Schema =mongoose.Schema;


const productSchema  = new Schema(
    {
        pname : { type : String,
            required : true
        },

        pPrice:{
                type : Number,
                required: true
        },

        pDesc :{
            type:String,
            required : true
        },

        stockUnits :{
            type: Number,
            required: true
        },

        pImage:
        {
            
          type: String,
           required:true
        }

        
    })

const Product = mongoose.model("Product",productSchema);

module.exports = Product ;