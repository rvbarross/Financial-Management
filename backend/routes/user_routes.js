const express = require('express')
const router = express.Router();
const UserRepository = require('../repository/UserRepository')
const repository = new UserRepository()

router.get('/', async (_, res) => {

    let users = await repository.findAll()
    
    resp = {
        status: 'OK',
        data: users
    }
    res.status(200).json(resp)
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
    let user = await repository.findById(id)

    if(user == undefined){
        resp = {
            status: 'ERROR',
            data: 'Usuario não encontrado!'
        }
        res.status(404).json(resp)
    }

    resp = {
        status: 'OK',
        data: user
    }
    res.status(200).json(resp)
})

router.post('/', async (req, res) => {

    if(req.body.username == undefined || req.body.password == undefined){
        resp = {
            status: 'ERROR',
            data: 'Campos username e password devem ser preenchidos'
        }
        res.status(400).json(resp)
    }

    let new_user = await repository.insert(req.body)
    
    resp = {
        status: 'OK',
        data: new_user
    }
    res.status(200).json(resp)
})

router.delete('/:id', async (req, res) => {

    let id = req.params.id
    let user = await repository.findById(id)

    if(user == undefined){
        resp = {
            status: 'ERROR',
            data: 'Usuario não encontrado!'
        }
        res.status(404).json(resp)
    }
    let delete_user = await repository.delete(id)
    resp = {
        status: 'OK',
        data: delete_user
    }
    res.status(200).json(resp)

})

router.put('/', async (req, res) => {

    let id = req.body.id
    let user = await repository.findById(id)

    if(user == undefined){
        resp = {
            status: 'ERROR',
            data: 'Usuario não encontrado!'
        }
        res.status(404).json(resp)
    }

    let update_user = await repository.update(req.body)
    resp = {
        status: 'OK',
        data: update_user
    }
    res.status(200).json(resp)

})


module.exports = router