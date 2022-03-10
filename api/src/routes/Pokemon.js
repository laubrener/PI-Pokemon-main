const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db');


const router = Router();

//funciones controladores que traen la info:

const getApiInfo = async () => { //va a llamar al endpoint de la api y trae toda la info
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon'); //traigo los primeros 20
    const apiUrlNext = await axios.get(apiUrl.data.next); // traigo otros 20
    const allPokemons = apiUrl.data.results.concat(apiUrlNext.data.results); //concateno para que me muestre los 40

    try {
        const infoUrl = allPokemons.map(e => axios.get(e.url)); // Accedo a la url con la info de cada pokemon.
        let infoPokemons = Promise.all(infoUrl) // Le paso un arreglo de promesas con la respuesta de cada url(info).
            .then(e => {
                let pokemon = e.map(p => p.data); // Accedo a la info de cada url de cada pokemon.
                let info = []; // Genero un arreglo de objetos con la info que necesito de cada pokemon.
                pokemon.map(p => {
                    info.push({
                        id: p.id,
                        name: p.name,
                        hp: p.stats[0].base_stat,
                        attack: p.stats[1].base_stat,
                        defense: p.stats[2].base_stat,
                        speed: p.stats[5].base_stat,
                        height: p.height,
                        weight: p.weight,
                        image: p.sprites.other.dream_world.front_default,
                        types: p.types.length < 2 ? [{name: p.types[0].type.name}] : [{name: p.types[0].type.name}, {name: p.types[1].type.name}],
                    })
                });
                return info;
            })
            return infoPokemons;
    } catch (error) {
        next(error);
    }
};

const getDbInfo = async () => { //trae la info de la base de datos
    return await Pokemon.findAll({
        include:{
            model: Type, //incluime el modelo type
            attributes: ['name'], //traeme de type el atributo name
            through: { //mediante los atributos
                attributes: [],
            },
        }
    });
}

const getAllPokemon = async () => {
    const apiInfo = await getApiInfo(); //llama a la funcion para traer la info de la api
    const dbInfo = await getDbInfo(); // llama a la funcion para traer la info de la bd
    const infoTotal = apiInfo.concat(dbInfo); //concateno
    return infoTotal;
}

router.get('/', async (req, res, next) => {
    try {
        const name = req.query.name;
        let pokemonTotal = await getAllPokemon();
        if (name){
            let pokemonName = await pokemonTotal.filter(p => //fijate si el nombre incluye el nombre q me pasaron por query
                p.name.toLowerCase().includes(name.toLocaleLowerCase())); //paso a minuscula todo lo q escriban
            if (pokemonName.length) {
                res.status(200).send(pokemonName);
            } else {
                res.status(404).send('no esta el pokemon');
            }
        } else {
            res.status(200).send(pokemonTotal);
        }
    } catch(error){
        next(error);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const allPokemon = await getAllPokemon();
    try {
        if (id) {
            let pokeId = await allPokemon.filter(p => p.id.toString() === id.toString());
            if (pokeId.length) {
                return res.status(200).json(pokeId);
            } else {
                return res.status(404).send('No existe ese pokemon');
            }
        }
    } catch(error){
        next(error);
    }
});

router.post('/', async (req, res, next) => { 
    try {
        let {name, 
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
            createdInDb,
            types
        } = req.body;
        let newPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
            createdInDb
        });
        let typeDb = await Type.findAll({
            where: {name: types}
        });
        newPokemon.addType(typeDb);
        res.status(201).send('Personaje creado con exito');
    } catch(error) {
        next(error);
    }
    
});


module.exports = router;
