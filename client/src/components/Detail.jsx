import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

// [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
// [ ] Número de Pokemon (id)
// [ ] Estadísticas (vida, fuerza, defensa, velocidad)
// [ ] Altura y peso
export default function Detail(props){
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(props);

    useEffect(() => {
        dispatch(getDetail(id)); 
    },[dispatch]);

    const myPokemon = useSelector((state) => state.detail);

    return (
        <div>
            {
                myPokemon.length ?
                <div>
                    <h4>Pokemon number {myPokemon[0].id}</h4>
                    <h1>{myPokemon[0].name}</h1>
                    <img src={myPokemon[0].image} alt="Imagen" />
                    <h4>HP: {myPokemon[0].hp}</h4>
                    <h4>Speed: {myPokemon[0].speed}</h4>
                    <h4>Attack: {myPokemon[0].attack}</h4>
                    <h4>Defense: {myPokemon[0].defense}</h4>
                    <h4>Height: {myPokemon[0].height}</h4>
                    <h4>Weight: {myPokemon[0].weight}</h4>
                    <h4>Type: {myPokemon[0].types.map(el => el.name + (' '))}</h4>
                </div>
                : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}