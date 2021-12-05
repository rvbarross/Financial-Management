const express = require('express')
const router = express.Router();
const IncomeRepository = require('../repository/IncomeRepository')
const repository = new IncomeRepository()


router.get('/', async (_, res) => {

    let incomes = await repository.findAll()
    
    resp = {
        status: 'OK',
        data: incomes
    }
    res.status(200).json(resp)
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
    let income = await repository.findById(id)

    if(income == undefined){
        resp = {
            status: 'ERROR',
            data: 'Receita não encontrada!'
        }
        res.status(404).json(resp)
    }

    resp = {
        status: 'OK',
        data: income
    }
    res.status(200).json(resp)
})

router.post('/', async (req, res) => {

    if(req.body.value == undefined || req.body.description == undefined  || req.body.UserId == undefined){
        resp = {
            status: 'ERROR',
            data: 'Campos value, description e UserId devem ser preenchidos'
        }
        res.status(400).json(resp)
    }

    let new_income = await repository.insert(req.body)
    
    resp = {
        status: 'OK',
        data: new_income
    }
    res.status(200).json(resp)
})

router.delete('/:id', async (req, res) => {

    let id = req.params.id
    let income = await repository.findById(id)

    if(income == undefined){
        resp = {
            status: 'ERROR',
            data: 'Receita não encontrada!'
        }
        res.status(404).json(resp)
    }
    let delete_income = await repository.delete(id)
    resp = {
        status: 'OK',
        data: delete_income
    }
    res.status(200).json(resp)

})

router.put('/', async (req, res) => {

    let id = req.body.id
    let income = await repository.findById(id)

    if(income == undefined){
        resp = {
            status: 'ERROR',
            data: 'Receita não encontrado!'
        }
        res.status(404).json(resp)
    }

    let update_income = await repository.update(req.body)
    resp = {
        status: 'OK',
        data: update_income
    }
    res.status(200).json(resp)

})


module.exports = router