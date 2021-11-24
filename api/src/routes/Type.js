const { Router } = require('express');
const { Type } = require('../db');
const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const type = await Type.findAll()
        res.send(type);
    } catch(error) {
        next(error);
    }
});

router.post('/', (req, res, next) => { //no pide esto el pi
    const { name } = req.body;
    return Type.create({name})
    .then((newType) => {
        res.status(201).send(newType);
    })
    .catch(error => next(error));
});


module.exports = router;
