const router = require("express").Router();
let Report = require("../models/Report.model");

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const yusername = req.body.yusername;
    const ousername = req.body.ousername;
    const issue = req.body.issue;

    const newReport = new Report({

        name,
        yusername,
        ousername,
        issue
    })

    newReport.save().then(()=>{
        res.json("Report Added")
    }).catch(()=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Report.find().then((reports)=>{
        res.json(reports)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let reportId = req.params.id;
    const {name, yusername, ousername, issue} = req.body;

    const updateReport = {
        name,
        yusername,
        ousername,
        issue
    }

    const update = await Report.findByIdAndUpdate(reportId, updateReport)
    .then(()=>{
        res.status(200).send({status: "Report Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

router.route("/delete/:id").delete(async (req,res) =>{
    let reportId = req.params.id;

    await Report.findByIdAndDelete(reportId)
        .then(() => {
            res.status(200).send({status: "Report Deleted"});
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with deleting report", error: err.message});
        })
})


router.route("/get/:id").get(async (req,res) => {
    let reportId = req.params.id;
    const report = await Report.findById(reportId)
        .then((reports) => {
            res.status(200).send({status : "Report Fetched", reports})
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({status: "Error with fetching report", error: err.message});
        })
})
module.exports = router;