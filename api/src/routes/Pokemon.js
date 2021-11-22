const { Router } = require('express');
const { Pokemon } = require('../db');
const router = Router();


router.get('/', (req, res, next) => { //buscar un pokemon
    return Pokemon.findAll()
    .then((Pokemon) => {
        res.send(Pokemon);
    })
    .catch((error) => {
        next(error); //next va a ir al siguiente middleware, en este caso es el control de errores
    });
});

router.post('/', async (req, res, next) => { //agregar un pokemon
    try {
        const {name} = req.body;
        const newPokemon = await Pokemon.create({
            name,
        });
        res.status(201).send(newPokemon);
    } catch(error) {
        next(error);
    }
});

router.put('/', (req, res, next) => {
    res.send('soy put de pokemon');
});

router.delete('/', (req, res, next) => {
    res.send('soy delete de pokemon');
});

module.exports = router;
