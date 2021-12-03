import axios from 'axios';

export const GET_POKEMON = 'GET_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const POST_POKEMON = 'POST_POKEMON';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';

//aca esta la conexion del front con el back
export function getPokemon(){
    return async function(dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/api/pokemon/');
            return dispatch({
                type: GET_POKEMON,
                payload: json.data
            });
            
        } catch(error) {
            console.log(error);
        }
    }
};

export function getTypes(){
    return async function(dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/api/type/');
            return dispatch({
                type: GET_TYPES,
                payload: json.data
            });
            
        } catch(error) {
            console.log(error);
        }
    }
};

export function postPokemon(payload){
    return async function(dispatch) {
        try {
            const json = await axios.post('http://localhost:3001/api/pokemon', payload);
            return json;
            
        } catch(error) {
            console.log(error);
        }
    }
};

export function getPokemonByName(name){
    return async function(dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/api/pokemon?name=' + name);
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: json.data
            });
            
        } catch(error) {
            console.log(error);
        }
    }
};

export function filterPokemonByType(payload){
    console.log(payload)
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}

export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}
