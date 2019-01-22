var express = require('express');
var router = express.Router();

var backendRoutes = require('../../backend/routes');
var apiRoutes = require('../../api/routes');
var frontendRoutes = require('../../frontend/routes');

router.use('/backend', backendRoutes);
router.use('/api', apiRoutes);
router.use('/frontend', frontendRoutes);

module.exports = router;