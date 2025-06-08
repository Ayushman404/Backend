const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        require: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        require: true
    },
    analyticData: [
        {timestamp: {type: Number}}
    ]
}, {timestamps: true});

const Url = mongoose.model("Url", urlSchema);

module.exports = {
    Url
}