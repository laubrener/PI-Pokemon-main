const { Router } = require('express');
const axios  = require('axios');
const { Type } = require('../db');
const router = Router();



router.get('/', async (req, res, next) => {//trae la info de la api a la bd y luego cada vez la busca ahi
    try {
        const typeApi = await axios.get('https://pokeapi.co/api/v2/type');
        const types = typeApi.data.results.map(t => t.name);
        types.forEach(elem => {
            Type.findOrCreate({ //busca en la bd a ver si esta, si no esta lo crea y si esta lo devuelve
                where: {name: elem}
            })
        });    
        const allTypes = await Type.findAll(); //busco la info directo en la bd
        res.send(allTypes);
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
