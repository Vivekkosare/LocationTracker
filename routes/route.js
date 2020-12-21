const express = require('express');
const router = express.Router();
const tracker = require('../controllers/trackercontroller');

router.get('/getGeoCoordinates', tracker.getGeoCoordinates);

module.exports = router;