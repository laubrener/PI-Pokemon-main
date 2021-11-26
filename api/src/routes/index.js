const axios = require('axios');
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoute = require('./pokemon');
const typeRoute = require('./type');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/Pokemon', pokemonRoute);
router.use('/Type', typeRoute);


module.exports = router;
