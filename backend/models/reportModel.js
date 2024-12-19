const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ReportSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    location: {
        type: {},
        required: true,
    },
    reporturl: {
        type: String,
        required: true,
    },
    responseurl: {
        type: String,
        default : null
    },
    cat: {
        type: String,
        required: true,
    },
    desc : {
        type: String,
        required: true,
    },
    status:{
        type : String,
        default : "Pending",
        required: true,
    },
},
    {timestamps : true}
)


module.exports = mongoose.model('Reports',ReportSchema);


