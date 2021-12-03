import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate} from "react-router-dom";
import { postPokemon, getTypes} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const types = useSelector((state) => state.allTypes);
    const [input, setInput] = useState({
        name:'',
        image:'',
        hp:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        types:[]
    });

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    return (
        <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <h1>Creá tu pokemon</h1>
            <form action="">
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text"
                        value={input.name}
                        name='name'
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                        type="text"
                        value={input.image}
                        name='image'
                    />
                </div>
                <div>
                    <label>vida:</label>
                    <input 
                        type="number"
                        value={input.hp}
                        name='hp'
                    />
                </div>
                <div>
                    <label>Fuerza:</label>
                    <input 
                        type="number"
                        value={input.attack}
                        name='attack'
                    />
                </div>
                <div>
                    <label>Defensa:</label>
                    <input 
                        type="number"
                        value={input.defense}
                        name='defense'
                    />
                </div>
                <div>
                    <label>Velocidad:</label>
                    <input 
                        type="number"
                        value={input.speed}
                        name='speed'
                    />
                </div>
                <div>
                    <label>Altura:</label>
                    <input 
                        type="number"
                        value={input.height}
                        name='height'
                    />
                </div>
                <div>
                    <label>Peso:</label>
                    <input 
                        type="number"
                        value={input.weight}
                        name='weight'
                    />
                </div>
                <div>
                    <label>Tipo:</label>
                    <label>
                        <input 
                            type="checkbox"
                            value='normal'
                            name='normal'
                        />
                        Normal
                    </label>
                    
                </div>
                <select name="" id="">
                    {types.map((t) => (
                        <option value={t.name}>{t.name}</option>
                    ))}
                </select>
            </form>
        </div>
    )
}