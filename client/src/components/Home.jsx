import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card'

// export default function Home(){
//     const allPokemon = useSelector((state) => state.pokemon); // igual a mapStateToProps
//     const dispatch = useDispatch(); //igual a mapDispatchToProps

//     useEffect (() => { //traigo los pokemon cuando el componente se monta
//         dispatch(getPokemon());
//     }, []) //siempre y cuando suceda esto
//     console.log(allPokemon);
//     return(
//         <div></div>
//     )
// }

export default function Home(){
    const dispatch = useDispatch(); //igual a mapDispatchToProps
    const allPokemon = useSelector((state) => state.pokemon); // igual a mapStateToProps
    
    //const pokemonType = useSelector((state) => state.type);
    
    useEffect (() => { //traigo los pokemon cuando el componente se monta
        dispatch(getPokemon());
    }, [dispatch]) //siempre y cuando suceda esto
    console.log(allPokemon);
    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemon()); //resetea
    }

    return(
        <div>
            <Link to = '/home'>Crear personaje</Link>
            <h1>Pokemon</h1>
            <button onClick={e => {handleClick(e)}}>
                volver a cargar los pokemon
            </button>
            <div>
                <select >
                    <option value='asc'>Ascendente</option> 
                    <option value='desc'>Descendente</option>
                </select>
                {/* <select >
                    {pokemonType?.map(t => {
                    return(
                        <div>
                            <option value={t.id}>{t.type}</option>
                        </div>
                    );   
                })}    
                </select> */}
                <select >
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
                {allPokemon?.map(p => {
                    return(
                        <div>
                            <Link to={'/home/'+ p.id}>
                                <Card 
                                    name={p.name} 
                                    image={p.sprite} 
                                    type={p.type.map(e => e.name + ' ')} 
                                    key={p.id}>
                                </Card>
                            </Link>
                        </div>
                    );  
                })}
            </div>
        </div>
    );
}