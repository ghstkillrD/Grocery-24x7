const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    
    name : {
        type: String,
        required: true
    },
    yusername : {
        type: String,
        required: true
    }, 
    ousername : {
        type: String,
        required: true
    },
    issue : {
        type: String,
        required: true
    }
})

const Report = mongoose.model("Report",reportSchema);

module.exports = Report;