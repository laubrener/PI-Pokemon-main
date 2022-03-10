import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";


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
                    <h1>Soy {myPokemon[0].name}</h1>
                    <img src={myPokemon[0].image} alt="Imagen" />
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