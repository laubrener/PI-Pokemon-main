import axios from 'axios';

export const GET_POKEMON = 'GET_POKEMON';

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
