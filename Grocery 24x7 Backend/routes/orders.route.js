const router = require("express").Router();
const Order = require("../models/Order.model");
let order = require("../models/Order.model");

//add orders
router.route("/oadd").post((req,res) => {
    //const orderID = req.body.orderID;
    const date = req.body.date;
    const status = req.body.status;
    const name = req.body.name;
    const address = req.body.address;
    const contact = req.body.contact;
    const method = req.body.method;
    const subtotal = req.body.subtotal;
    const shipping = req.body.shipping;
    const total = req.body.total;

    const newOrder = new Order({
        //orderID,
        date,
        status,
        name,
        address,
        contact,
        method,
        subtotal,
        shipping,
        total
    })

    newOrder.save().then(() => {
        res.json("Order Added")
    }).catch((err) => {
        console.log(err);
    })
})

//get order list
router.route("/o").get((req,res) => {
    Order.find().then((orders) => {
        res.json(orders)
    }).catch((err) => {
        console.log(err);
    })
})

/*
//update order
router.route("/update/:oid").put(async(req,res) => {
    let OID = req.params.oid;
    //const name = req.body.name;
    const {orderID,date,status} = req.body;

    const updadteOrder = {
        orderID,
        date,
        status
    }

    const update = await Order.findByIdAndUpdate(OID,updadteOrder).then(() => {
        res.status(200).send({status: "Order updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })
})*/

//delete order
router.route("/odelete/:oid").delete(async(req,res) => {
    let OID = req.params.oid;

    await Order.findOneAndDelete(OID).then(() => {
        res.status(200).send({status: "Order deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete order", error: err.message});
    })
})

//search by id
router.route("/oget/:id").get(async(req,res) => {
    let ID = req.params.id;

    const order = await Order.findOne({ orderID: { $eq: ID } },{ orderID: 1 }).then((order) => {
        res.status(200).send({status: "Order fetched",order})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get order", error: err.message});
    })
})

module.exports = router;
