const express = require('express')
const router = express.Router();
const UserRepository = require('../repository/UserRepository')
const repository = new UserRepository()
const bcrypt = require('bcrypt')
const passport = require('passport')

router.get('/', (_, res) => {
    res.render('pages/signin', { user: null, error: null, values: null })
})

router.get('/signup', (_, res) => {
    res.render('pages/signup', { user: null, error: null, values: null })
})

router.get('/home', (req, res) => {
    res.render('pages/home', { user: req.user })
})

router.post('/signup', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation
    
    if(password == passwordConfirmation){
        let usr = await repository.findByUsername(username)
        if(usr.length == 0){
            bcrypt.hash(password, 12, (err, hash) => {
                let account = {
                    username: username,
                    password: hash
                }
                repository.insert(account)
                res.render('pages/signin', { user: req.user, error: null, values: null })

            })
        } else {
            let error = {
                message: "Username already exists"
            }
            let values = {
                username: username,
                password: password,
                passwordConfirmation: passwordConfirmation
            }
            res.render('pages/signup', { user: req.user, error: error, values: values })
        }
    } else {
        let error = {
            message: "Passwords doesn't match"
        }
        let values = {
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation
        }
        res.render('pages/signup', { user: req.user, error: error, values: values })
    }
    
})

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/signin',
    failureFlash: true
})
)

module.exports = router