const router = require("express").Router();
const Cart = require("../models/Cart.model.js");
//let Student = require("../models/Cart.js");
 
//create
 
router.route("/cadd").post((req,res)=>{
 
    const itemDesc = req.body.itemDesc;
    const itemname = req.body.itemname;
    const quantity = Number(req.body.quantity);
    const itemprice = Number(req.body.itemprice);
    const qPrice = Number(req.body.qPrice);
 
    const newCart = new Cart({
 
        itemDesc,
        itemname,
        quantity,
        itemprice,
        qPrice
 
    })
 
    newCart.save().then(()=>{
        res.json("Cart Added")
    }).catch((err)=>{
        console.log(err);
    })
 
})
 
//read(all data)
 
router.route("/c").get((req,res)=>{
 
    Cart.find().then((carts)=>{
        res.json(carts)
    }).catch((err)=>{
        console.log(err)
    })
})
 
//update
 
router.route("/cupdate/:id").put(async(req,res)=>{
    let cartID = req.params.id;
    const {itemDesc, itemname, quantity, itemprice,qPrice} = req.body;
 
    const updateCart = {
        itemDesc,
        itemname,
        quantity,
        itemprice,
        qPrice
    }
    const update = await Cart.findByIdAndUpdate(cartID, updateCart).then(()=>{
        res.status(200).send({status: "Cart Updated!"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data!", error: err.message});
    })
 
})
 
//delete
 
router.route("/cdelete/:id").delete(async(req,res)=>{
    let cartID = req.params.id;
 
    await Cart.findByIdAndDelete(cartID).then(()=>{
        res.status(200).send({status: "Cart deleted!"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete cart!", error: err.message});
    })
})
 
//read(one data)
 
router.route("/cget/").get(async(req,res)=>{
    let cartID = req.params.id;
 
    const cart = await Cart.findOne({qPrice:1}).then((cart)=>{
        res.status(200).send({status: "Cart fetched!", cart});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting cart!", error: err.message});
    })
})
 
module.exports = router;