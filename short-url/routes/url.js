const express = require('express');
const { handleShortIdGeneration, handleAnalyticReq } = require('../controllers/urlHandlers.js');

const router = express.Router();

router.post('/', handleShortIdGeneration);
router.get('/analytics/:shortId', handleAnalyticReq);

module.exports = router;