import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { postPokemon, getTypes} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";
import styles from './PokemonCreate.module.css';

function validate(input){
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required';
    } 
    if (input.hp < 0 || input.hp > 100) {
        errors.hp = 'Invalid value'
    }
    if (input.attack < 0 || input.hp > 100) {
        errors.attack = 'Invalid value'
    }
    if (input.defense < 0 || input.hp > 100) {
        errors.defense = 'Invalid value'
    }
    if (input.speed < 0 || input.hp > 100) {
        errors.speed = 'Invalid value'
    }
    if (input.height < 0 ) {
        errors.height = 'Invalid value'
    }
    if (input.weight.length < 0 ) {
        errors.weight = 'Invalid value'
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
        alert('Pokemon created');
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
        <div className={styles.page}>
        <div className={styles.card}>
            <div className={styles.title}>
                <h1 className={styles.nP}>New Pokemon</h1>
                <Link to='/home'>
                    <button className={styles.close}>X</button>
                </Link>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.lI}>
                    <label className={styles.label}>Name:</label>
                    <input 
                        type="text"
                        value={input.name}
                        name='name'
                        onChange={(e) => handleChange(e)}
                        className={styles.inputL}
                    />
                </div>
                    {errors.name && (
                        <p className={styles.error}>{errors.name}</p>
                    )}
                <div className={styles.lI}>
                <label className={styles.label}>Image:</label>
                <input 
                    type="text"
                    value={input.image}
                    name='image'
                    onChange={(e) => handleChange(e)}
                    className={styles.inputL}
                />
                </div>
                <div className={styles.tree}>
                <div className={styles.lI}>
                    <label className={styles.label}>Speed:</label>
                    <input 
                        type="number"
                        value={input.speed}
                        name='speed'
                        onChange={(e) => handleChange(e)}
                        className={styles.inputS}
                    />
                </div>
                {errors.speed && (
                        <p className={styles.error}>{errors.speed}</p>
                    )}
                <div className={styles.lI}>
                    <label className={styles.label2}>Attack:</label>
                    <input 
                        type="number"
                        value={input.attack}
                        name='attack'
                        onChange={(e) => handleChange(e)}
                        className={styles.inputA}
                    />
                </div>
                </div>
                {errors.attack && (
                        <p className={styles.error}>{errors.attack}</p>
                    )}
                <div className={styles.two}>
                <div className={styles.lI}>
                    <label className={styles.label}>Defense:</label>
                    <input 
                        type="number"
                        value={input.defense}
                        name='defense'
                        onChange={(e) => handleChange(e)}
                        className={styles.inputD}
                    />
                </div>
                {errors.defense && (
                        <p className={styles.error}>{errors.defense}</p>
                    )}
                <div className={styles.lI}>
                    <label className={styles.labelH}>Height:</label>
                    <input 
                        type="number"
                        value={input.height}
                        name='height'
                        onChange={(e) => handleChange(e)}
                        className={styles.inputH}
                    />
                </div>
                {errors.height && (
                    <p className={styles.error}>{errors.height}</p>
                    )}
                </div>
                <div className={styles.tree}>
                <div className={styles.lI}>
                    <label className={styles.label}>Weight:</label>
                    <input 
                        type="number"
                        value={input.weight}
                        name='weight'
                        onChange={(e) => handleChange(e)}
                        className={styles.inputW}
                    />
                </div>
                {errors.weight && (
                        <p className={styles.error}>{errors.weight}</p>
                    )}
                <div className={styles.lI}>
                    <label className={styles.labelHP}>HP:</label>
                    <input 
                        type="number"
                        value={input.hp}
                        name='hp'
                        onChange={(e) => handleChange(e)}
                        className={styles.inputHP}
                    />
                </div>
                {errors.hp && (
                        <p className={styles.error}>{errors.hp}</p>
                    )}
                </div>
                <div className={styles.typeCreate}>
                    <h4 className={styles.label}>TYPE:</h4>
                    <select className={styles.select} onChange={(e) => handleSelect(e)}>
                        {types.map((t) => (
                            <option value={t.name}>{t.name}</option>
                        ))}
                    </select >
                    <button className={styles.create} type='submit'>Create</button>
                </div>
            </form>
            {input.types.map(el => 
                <div className={styles.div}>
                <div className={styles.divType}>
                    <p className={styles.type}>{el}</p>
                    <button className={styles.xButton} onClick={() => handleDelete(el)}>X</button>
                </div>
                </div>
                )}
        </div>
        </div>
    )
}