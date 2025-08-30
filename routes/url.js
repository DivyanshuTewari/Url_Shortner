const express = require("express");
const router = express.Router();
const {handleGenerateNewShortUrl , handleGoToUrl , handleGetAnalytics} = require("../controllers/url");

router.post('/' , handleGenerateNewShortUrl);
router.get('/:shortId' , handleGoToUrl );
router.get('/analytics/:shortId' , handleGetAnalytics )

module.exports = router ; 