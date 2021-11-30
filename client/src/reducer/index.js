import { GET_POKEMON } from "../actions";

const initialState = {
    pokemon: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMON:
            return{
                ...state,
                pokemon: action.payload //todo lo q mande la accion get pokemon mandalo al arreglo pokemon
            }
            default:
                return state;
    }
}

export default rootReducer;