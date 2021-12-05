const express = require('express')
const router = express.Router();
const api = express.Router();

const user_routes = require('./user_routes')
const income_routes = require('./income_routes')
const expense_routes = require('./expense_routes')
const home_routes = require('./home_routes')
const management_routes = require('./management_routes')

api.use('/user', user_routes)
api.use('/income', income_routes)
api.use('/expense', expense_routes)

router.use('/api', api)
router.use('/', home_routes)
router.use('/management', management_routes)

module.exports = router