const express = require('express')
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("requisitado!!");
})


module.exports = router