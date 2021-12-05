import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { postPokemon, getTypes} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";

function validate(input){
    let errors = {};
    if (!input.name) {
        errors.name = 'Se requiere nombre';
    } else if (input.hp.length < 0 || input.hp.length > 100) {
        errors.hp = 'el valor es inválido'
    } else if (input.attack.length < 0 || input.hp.length > 100) {
        errors.attack = 'el valor es inválido'
    } else if (input.defense.length < 0 || input.hp.length > 100) {
        errors.defense = 'el valor es inválido'
    } else if (input.speed.length < 0 || input.hp.length > 100) {
        errors.speed = 'el valor es inválido'
    } else if (input.height.length < 0 ) {
        errors.height = 'el valor es inválido'
    } else if (input.weight.length < 0 ) {
        errors.weight = 'el valor es inválido'
    }
    return errors;
};

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector((state) => state.allTypes);
    const [errors, setErrors] = useState({});
    
    const [input, setInput] = useState({ //estado local
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

    function handleChange(e){
        setInput({ //cada vez q se modifica el input tomar lo que ya tiene + lo agregado
            ...input, 
            [e.target.name]: e.target.value //cada prop que estoy va a valer el valor de lo que escriben
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    // function handleCheck(e){
    //     if (e.target.checked) {
    //         setInput({
    //             ...input,
    //             status: e.target.value
    //         })
    //     }
    // };

    function handleSelect(e){ //todo lo que vaya seleccionando guardamelo en un arreglo
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postPokemon(input));
        alert('Pokemon creado con éxito');
        setInput({ //para que se vuelva a vaciar
            name:'',
            image:'',
            hp:'',
            attack:'',
            defense:'',
            speed:'',
            height:'',
            weight:'',
            types:[]
        })
        navigate('/home');
    };

    function handleDelete(el){
        setInput({
            ...input,
            types: input.types.filter(t => t !== el)
        })
    };

    return (
        <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <h1>Creá tu pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text"
                        value={input.name}
                        name='name'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                        type="text"
                        value={input.image}
                        name='image'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>vida:</label>
                    <input 
                        type="number"
                        value={input.hp}
                        name='hp'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Fuerza:</label>
                    <input 
                        type="number"
                        value={input.attack}
                        name='attack'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Defensa:</label>
                    <input 
                        type="number"
                        value={input.defense}
                        name='defense'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Velocidad:</label>
                    <input 
                        type="number"
                        value={input.speed}
                        name='speed'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Altura:</label>
                    <input 
                        type="number"
                        value={input.height}
                        name='height'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Peso:</label>
                    <input 
                        type="number"
                        value={input.weight}
                        name='weight'
                        onChange={handleChange}
                    />
                </div>
                {/* <div>
                    <label>Tipo:</label>
                    <label>
                        <input 
                            type="checkbox"
                            value='normal'
                            name='normal'
                        />
                        Normal
                    </label>
                </div> */}
                <select onChange={(e) => handleSelect(e)}>
                    {types.map((t) => (
                        <option value={t.name}>{t.name}</option>
                    ))}
                </select >
                <ul><li>{input.types.map(el => el + ' ,')}</li></ul>
                <button type='submit'>Crear personaje</button>
            </form>
            {input.types.map(el => 
                <div className='divType'>
                    <p>{el}</p>
                    <button className='xButton' onClick={() => handleDelete(el)}>x</button>
                </div>
                )}
        </div>
    )
}