const shortid = require('shortid');
const { Url } = require('../model/urlModel.js')



async function handleShortIdGeneration(req, res){
    const body = req.body;
    if(!body.url) return res.json({msg: "URL is required.."});
    const shortID = shortid();

    await Url.create({
        shortId: shortID,
        redirectUrl: body.url,
        analyticData: []
    })

    return res.json({
        id: shortID
    });

}

async function handleRedirect(req, res){
    const shortId = req.params.id;
    const entry = await Url.findOneAndUpdate({
        shortId,
    },{
        $push: {
            analyticData: {timestamp: Date.now()}
        }
    })

    return res.redirect(entry.redirectUrl);
}

async function handleAnalyticReq(req, res){
    const shortId = req.params.shortId;

    const result = await Url.findOne({shortId: shortId});

    if(!result) return res.status(404).json({msg: "shortID not found"});
    return res.json({totalVisits: result.analyticData.length, details: result.analyticData});


}

module.exports = {
    handleShortIdGeneration,
    handleRedirect,
    handleAnalyticReq
}