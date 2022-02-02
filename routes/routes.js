const express = require('express')
const { calculateResTime, stopInterval, readDetailes } = require('./service')
var router = express.Router()

router.get('/calculateResTime', calculateResTime)
router.get('/stopInterval', stopInterval)
router.get('/readDetailes', readDetailes)
module.exports = router
