const router = require("express").Router();
const Request = require("../models/Request.model");
let request = require("../models/Request.model");

//add Requests
router.route("/radd").post((req,res) => {
    const orderID = req.body.orderID;
    const reason = req.body.reason;
    const desc = req.body.desc;
    const date = req.body.date;

    const newRequest = new Request({
        orderID,
        reason,
        desc,
        date 
    })

    newRequest.save().then(() => {
        res.json("Request Added")
    }).catch((err) => {
        console.log(err);
    })
})

//get Request list
router.route("/r").get((req,res) => {
    Request.find().then((requests) => {
        res.json(requests)
    }).catch((err) => {
        console.log(err);
    })
})


//update request
router.route("/rupdate/:rid").put(async(req,res) => {
    let RID = req.params.rid;
    //const name = req.body.name;
    const {orderID,reason,desc,date} = req.body;

    const updadteRequest = {
        orderID,
        reason,
        desc,
        date 
    }

    //const update = await Request.findOneAndUpdate(RID,updadteRequest).then(() => {
    const update = await Request.findByIdAndUpdate(RID,updadteRequest).then(() => {
        res.status(200).send({status: "Request updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })
})

//delete order
router.route("/rdelete/:rid").delete(async(req,res) => {
    let RID = req.params.rid;

    await Request.findByIdAndDelete(RID).then(() => {
        res.status(200).send({status: "Request deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete Request", error: err.message});
    })
})

//search by id
router.route("/rget/:id").get(async(req,res) => {
    let ID = req.params.id;

    //const request = await Request.findOne({ requestID: { $eq: ID } },{requestID : 1}).then((request) => {
    const request = await Request.findById(ID).then((request) => {
        res.status(200).send({status: "Request fetched",request})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get Request", error: err.message});
    })
})

module.exports = router;
