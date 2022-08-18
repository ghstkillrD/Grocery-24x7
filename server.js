const express = require('express');
const  mongoose  = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
var fs = require('fs');
var path = require('path');


require("dotenv").config();

app.get('/',(req,res)=> res.send('API Running'));
const PORT = process.env.PORT || 8070;


app.use(cors());
app.use(express.json());

const URL = process.env.MONGODB_URL;

 mongoose.connect(URL,{


//useCreateIndex : true,
useNewUrlParser : true,
useUnifiedTopology : true,
//useFindAndModify: false,
 }).then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

 
 const connection = mongoose.connection;
connection.once('open',()=>{

console.log("MongoDB connection success !");

})

const productRouter = require("./routes/products.route.js"); 
app.use("/product",productRouter);

// set up EJS
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set EJS as templating engine
app.set("view engine", "ejs");


app.use('./Products/uploads', express.static('uploads'));


app.listen(PORT, ()=>{ 
    console.log('Server sstarted on port: ${PORT}')
})


