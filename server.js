const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000;
require('dotenv').config()

const sequelize = require('./backend/database/database_connection')
const routes = require('./backend/routes/index')

const session = require('express-session')
const cookieParser = require('cookie-parser')

const flash = require('connect-flash')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserRepository = require('./backend/repository/UserRepository')
const bcrypty = require('bcrypt')

passport.use(new LocalStrategy(
	async (username, password, done) => {
		let repository = new UserRepository()
		let user = await repository.findByUsername(username)

		if(user.length == 0){
			return done(null, false, { message: 'User not found' })
		}

		bcrypty.compare(password, user[0].password).then(function(result) {
			// result == true
			if(!result){
				return done(null, false, { message: 'Invalid password' })
			}
			return done(null, user[0])
		});
	}
)
)

passport.serializeUser((user, done) => {
    done(null, { id: user.id })
})
passport.deserializeUser(async (obj, done) => {
    let repository = new UserRepository()
    let user = await repository.findById(obj.id)

    return done(null, user)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser())
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes)

app.listen(port, async () => {
	await sequelize.sync({ force: true })
	console.log("Hello World!!");
})