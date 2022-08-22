const mongoose = require ("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, "Please Enter Your Name"],
        trim : true
    },

    email: {
        type: String,
        required : [true, "Please Enter Your Email"],
        trim : true,
        unique: true

    },

    address : {
        type: String,
        required : [true, "Please Enter Your Address"],
        trim : true
    },

    phone : {
        type: Number,
        required : [true, "Please Enter Your Phone Number"],
    },

    username: {
        type: String,
        required : [true, "Please Enter Your userName"],
        trim : true,
    },

    password : {
        type: String,
        required : [true, "Please Enter Your Password"],
    },

    role : {
        type: Number,
        default : 0 //0=customer, 1=admin, 2=shopowner
    },

    avatar : {
        type: String,
        default : "https://res.cloudinary.com/dilobwouw/image/upload/v1631248130/avatar/avatar_blzmnv.jpg"
    }
}, {
    timestamps:  true
});

module.exports = mongoose.model("Users", userSchema)