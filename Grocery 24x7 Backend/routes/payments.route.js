const router = require("express").Router();
const Payment = require("../models/Payment.model.js");
//let Payment = require("../models/Payment.js");
 
//create
 
router.route("/payadd").post((req,res)=>{
 
    const name = req.body.name;
    const address = req.body.address;
    const contact = req.body.contact;
    const date = req.body.date;
    //const item = req.body.item;
    const method = req.body.method;
    //const quantity = Number(req.body.quantity);
    const total = Number(req.body.total);
    const shipping = Number(req.body.shipping);
    const subtotal = Number(req.body.subtotal);
 
    const newPayment = new Payment({
 
        name,
        address,
        contact,
        date,
        method,
        total,
        shipping,
        subtotal
 
    })
 
    newPayment.save().then(()=>{
        res.json("Payment Added!")
    }).catch((err)=>{
        console.log(err);
    })
 
})
 
//read(all data)
 
router.route("/pay").get((req,res)=>{
 
    Payment.find().then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err)
    })
})
 
//update
 
router.route("/payupdate/:id").put(async(req,res)=>{
    let paymentID = req.params.id;
    const {name, address, contact, method, total, shipping, subtotal} = req.body;
 
    const updatePayment = {
        name,
        address,
        contact,
        method,
        total,
        shipping,
        subtotal,
        
        
    }
    const update = await Payment.findByIdAndUpdate(paymentID, updatePayment).then(()=>{
        res.status(200).send({status: "Payment Updated!"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data!", error: err.message});
    })
 
})
 
//delete
 
router.route("/paydelete/:id").delete(async(req,res)=>{
    let paymentID = req.params.id;
 
    await Payment.findByIdAndDelete(paymentID).then(()=>{
        res.status(200).send({status: "Payment deleted!"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete payment!", error: err.message});
    })
})
 
//read(one data)
 
router.route("/payget/:id").get(async(req,res)=>{
    let paymentID = req.params.id;
 
    const payment = await Payment.findById(paymentID).then((payment)=>{
        res.status(200).send({status: "Payment fetched!", payment});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting payment!", error: err.message});
    })
})
//const request = await Request.findOne({ requestID: { $eq: ID } },{requestID : 1}).then((request) => {
    router.route("/payget/:pname").get(async(req,res)=>{
        let payName = req.params.pname;
         //const payment = await Payment.findById(paymentID).then((payment)=>{

        const payment = await Payment.findOne({name: {$eq:payName} },{name : 1}).then((payment) => {
            res.status(200).send({status: "Payment fetched!", payment});
        }).catch(()=>{
            console.log(err.message);
            res.status(500).send({status: "Error with getting payment!", error: err.message});
        })
    })
module.exports = router;