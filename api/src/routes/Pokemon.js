const { Router } = require('express');
const {Op} = require('sequelize');
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { response } = require('../app');
const router = Router();

// router.get('/', (req, res, next) => { //buscar un pokemon
//     const {name} = req.params;
//     let pokeApi;
//     let pokeDb;
//     if (name) {
//         pokeApi = axios.get('https://pokeapi.co/api/v2/pokemon?name=' + name); //promesa
//         pokeDb = Pokemon.findAll({
//             include: Type,
//             where: {
//                 name: {
//                     [Op.iLike]: '%' + name + '%' //encuentra el nombre dentro de algo
//                 }
//             }
//         });
//     } else {
//         pokeApi = axios.get('https://pokeapi.co/api/v2/pokemon/'); //promesa
//         pokeDb = Pokemon.findAll({
//             include: Type
//         });
//     }
//     Promise.all([
//         pokeApi,
//         pokeDb
//     ])
//     .then((respuesta) => {
//         const [pokeApi, pokeDb] = respuesta;
//         let filteredPokeApi = pokeApi.data.results.map((p) => {
//             return { //filtro la info q quiero q me muestre
//                 id: p.id,
//                 name: p.name,
//                 Image: p.image,
//                 type: p.Type,
//             }
//         });
//         let allPokemon = [...filteredPokeApi, ...pokeDb]; //concateno
//         res.send(allPokemon);
//     })
// });

router.get('/', (req, res, next) => { //buscar todos los pokemon
    try {
        let pokeApi;
        let pokeDb;
        pokeApi = axios.get('https://pokeapi.co/api/v2/pokemon/'); //promesa
        pokeDb = Pokemon.findAll({
            include: Type,
            limit: 12
        });
        Promise.all([
            pokeApi,
            pokeDb
        ])
        .then((respuesta) => {
            const [pokeApi, pokeDb] = respuesta;
            let filteredPokeApi = pokeApi.data.results.map((p) => {
                return { //filtro la info q quiero q me muestre
                    id: p.id,
                    name: p.name,
                    Image: p.image,
                    type: p.Type,
                }
            });
            let allPokemon = [...filteredPokeApi, ...pokeDb]; //concateno
            res.send(allPokemon);
        })  
    } catch(error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => { // buscar por id un pokemon
    try {
        const id = req.params.id;
        let pokemon;
        if (typeof id === 'string' && id.length > 5) {
            // es mio
            pokemon = await Pokemon.findByPk(id);
        } else {
            // es de la api
            let response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id);
            pokemon = response.data;
        }
        return res.send(pokemon);
    } catch(error) {
        next(error);
    }
});

router.get('/?name=', (req, res, next) => { //buscar por nombre un pokemon
    try {
        const { name } = req.query;
    
        let pokeApi = axios.get('https://pokeapi.co/api/v2/pokemon?name=' + name); //promesa
        let pokeDb = Pokemon.findAll({
                include: Type,
                where: {
                    name: {
                        [Op.iLike]: '%' + name + '%' //encuentra el nombre dentro de algo
                    }
                }
            });
            Promise.all([
                pokeApi,
                pokeDb
            ])
            .then((respuesta) => {
                const [pokeApi, pokeDb] = respuesta;
                let filteredPokeApi = pokeApi.data.results.map((p) => {
                    return { //filtro la info q quiero q me muestre
                        id: p.id,
                        name: p.name,
                        Image: p.image,
                        type: p.Type,
                    }
                });
                let allPokemon = [...filteredPokeApi, ...pokeDb]; //concateno
                res.send(allPokemon);
            });
    } catch(error) {
        next(error);
    }
});

// router.get('/', (req, res, next) => { //buscar un pokemon
//     return Pokemon.findAll({
//         include: Type
//     })
//     .then((Pokemon) => {
//         res.send(Pokemon);
//     })
//     .catch((error) => {
//         next(error); //next va a ir al siguiente middleware, en este caso es el control de errores
//     });
// });

router.post('/', async (req, res, next) => { //agregar un pokemon
    try {
        const {name} = req.body;
        const newPokemon = await Pokemon.create({
            name,
            HP,
            attack,
            defense,
            speed,
            height,
            weight
        });
        res.status(201).send(newPokemon);
    } catch(error) {
        next(error);
    }
    
});

router.post('/:pokemonId/type/:typeId', async (req, res, next) => { //prueba ejemplo
    try {
        const { PokemonId, TypeId } = req.params;
        const pokemon = await Pokemon.findByPk(PokemonId);
        res.status(200).json(await pokemon.addType(TypeId)); // no reconoce el addType no se porq
    } catch(error) {
        next(error);
    }
});



module.exports = router;
