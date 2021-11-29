const express = require('express')
const router = express.Router();
const api = express.Router();
const user_routes = require('./user_routes')

api.use('/api', user_routes)

router.use('/', api)

module.exports = router