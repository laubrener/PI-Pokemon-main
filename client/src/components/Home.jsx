import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { getPokemon } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card'

export default function Home(){
    const dispatch = useDispatch(); //igual a mapDispatchToProps
    const allPokemon = useSelector((state) => state.pokemon); // igual a mapStateToProps
    //const pokemonType = useSelector((state) => state.type);

    useEffect (() => { //traigo los pokemon cuando el componente se monta
        dispatch(getPokemon());
    }, [dispatch]) //siempre y cuando suceda esto

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemon()); //resetea
    }

    return(
        <div>
            <Link to = '/pokemon'>Crear personaje</Link>
            <h1>aguante pokemon</h1>
            <button onClick={e => {handleClick(e)}}>
                volver a cargar los pokemon
            </button>
            <div>
                <select name="" id="">
                    <option value='asc'>Ascendente</option> 
                    <option value='desc'>Descendente</option>
                </select>
                {/* <select name="" id="">
                    {pokemonType?.map(t => {
                    return(
                        <div>
                            <option value={t.id}>{t.type}</option>
                        </div>
                    );   
                })}    
                </select> */}
                <select name="" id="">
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
                {allPokemon?.map(p => {
                    return(
                        <div>
                            <Link to={'/pokemon/'+ p.id}>
                                <Card name={p.name} image={p.image} type={p.type} key={p.id}/>
                            </Link>
                        </div>
                    );  
                })}
            </div>
        </div>
    );
}