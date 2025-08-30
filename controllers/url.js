const URL = require("../models/url");
const {nanoid} = require("nanoid");
async function handleGenerateNewShortUrl (req,res){
    const body = req.body;
    if(!body.url)
    {
        return res.status(400).json({error: "Url is required"});
    }
    const shortID = nanoid(8);
    await URL.create({
        shortId : shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.json({ id : shortID });
}

async function handleGoToUrl(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId}, {$push: {visitHistory: {timestamp : Date.now() , }}});
    res.redirect(entry.redirectURL);
}

async function handleGetAnalytics (req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitHistory.length ,
        analytics: result.visitHistory,
     });
}

module.exports = {handleGenerateNewShortUrl , handleGoToUrl , handleGetAnalytics};