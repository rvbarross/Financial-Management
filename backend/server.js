const express = require('express')
const app = express()
const port = 3000;
require('dotenv').config()

const sequelize = require('./database/database_connection')
const routes = require('./routes/index')

app.use('/', routes)

app.listen(port, async () => {
	await sequelize.authenticate()
	console.log("Hello Fucking World!!");
})