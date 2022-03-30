import { GET_POKEMON, GET_TYPES, GET_POKEMON_BY_NAME, GET_DETAIL, FILTER_BY_TYPE, POST_POKEMON, FILTER_CREATED, ORDER_BY_NAME } from "../actions";

const initialState = {
    pokemon: [],
    allTypes: [],
    allPokemon: [],
    detail: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMON:
            return{
                ...state,
                pokemon: action.payload, //todo lo q mande la accion get pokemon mandalo al arreglo pokemon
                allPokemon: action.payload
            }
        case GET_TYPES:
            return{
                ...state,
                allTypes: action.payload, //todo lo q mande la accion get pokemon mandalo al arreglo pokemon
            }
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemon: action.payload
            }
        case FILTER_BY_TYPE:
            const allPokemon = state.allPokemon;
            const typeFiltered = allPokemon.filter(el => {
                let thisTypes = el.types.map(el => el.name);
                return thisTypes.includes(action.payload);
            });
            console.log(action.payload)
            return{
                ...state,
                pokemon: action.payload === 'all'? state.allPokemon : typeFiltered
            }
        case POST_POKEMON:
            return {
                ...state
            }
        case FILTER_CREATED:
            const allPokemon2 = state.allPokemon;
            const filterCreated = action.payload === 'created'
                ? allPokemon2.filter(el => el.createdInDb)
                : allPokemon2.filter(el => !el.createdInDb)
            return{
                ...state,
                pokemon: action.payload === 'all' ? state.allPokemon : filterCreated
            }
        case ORDER_BY_NAME:
            const sortedArr = action.payload === 'asc'
                ? state.pokemon.sort(function (a, b) {
                    if (a.name > b.name){
                        return 1;
                    }
                    if (b.name > a.name){
                        return -1;
                    }
                    return 0
                })
                : state.pokemon.sort(function (a, b) {
                    if (a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                pokemon: sortedArr
            }
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;