const router = require("express").Router();
let Product = require("../models/Product.model");
//const { Mongoose } = require('mongoose');




//set up multer for storing uploaded files
/*
const storage = multer.diskStorage({
    destination: (req, file, cb) => { // cb - A javascript callback function - a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action
        cb(null,'./uploads/'); //
    },
    filename: (req, file, cb) => {

        cb(null, new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname);  }
});
 

const fileFilter = (req, file, cb) => {
    // reject a file
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };


const  upload = multer({ 
    storage: storage,

   /* limits: {
        fileSize: 1024 * 1024 * 5
      }, 
      fileFilter: fileFilter

});


*/



/*router.route("/add").post(upload.single("image"),(req,res)=>{ */

    router.route("/add").post((req,res)=>{
    //console.log(req.file);

    const pname = req.body.pname;
    const pPrice = Number(req.body.pPrice);
    const pDesc = req.body.pDesc;
    const  stockUnits = Number(req.body.stockUnits);
    const pImage =req.body.pImage;
    //const image = req.file.path


    const newProduct = new Product(
        {
            pname,
            pPrice,
            pDesc,
            stockUnits,
            pImage
            //itemCode
        }
    )

    newProduct.save().then(()=>{

        res.json("Product Added")
    }).catch((err)=>{

        console.log(err);
   
       
       
       
        /* console.log(result);
        res.status(201).json({
            message: "Product Added",
        createdProduct: {
            name: result.pname,
            price: result.pPrice,
            
            request: {
                type: 'GET',
                url: "http://localhost:8070/product/" + result._id
            }
        }})*/
        
    }).catch((err)=>{

        console.log(err.message);
    })


})

router.route("/").get((req,res)=>{

   Product.find().then((Products)=>{
       res.json(Products) 
    }).catch((err)=>{
        console.log(err)

    })
})

router.route("/update/:id").put(async (req,res) => {

    let userId = req.params.id;
    const {pname,
        pPrice,
        pDesc,
        stockUnits,pImage} = req.body;


    const updateProduct = {

        pname,
        pPrice,
        pDesc,
        stockUnits,
        pImage
    }

    const update = await Product.findByIdAndUpdate(userId, updateProduct).then(()=>
    {
        res.status(200).send({status: "Product Details Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"})

    })


}) 


router.route("/delete/:id").delete(async (req,res) =>{

        let userId = req.params.id;

        await Product.findByIdAndDelete(userId).then(
            ()=>{
                res.status(200).send({status: "Product Deleted"});
            
            }).catch((err)=>{

                console.log(err.message);
                res.status(500).send({status : "Error with delete user", error: err.message});
            })
 
})

router.route("/get/:id").get(async (req,res)=>
{
let userId = req.params.id;

await Product.findById(userId).then(()=>
{
    res.status(200).send({status: "User Fetched",user: user})
}).catch(()=>{

console.log(err.message);
res.status(500).send({
     status:"User Fetched", user:user
})
}).catch(()=>
{
    console.log(err.message);
    res.status(500).send({
        status: "Error with get user", error: err.message
    });
})
})


module.exports = router;
