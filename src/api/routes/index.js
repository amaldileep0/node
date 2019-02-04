var express = require('express')
var app = express()
var router = express.Router()

router.get('/', (req, res, next) => {res.send('Not implemented')})
module.exports = router;