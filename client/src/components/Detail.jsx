import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function Detail(props){
    console.log(props);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(props.id)); // todavia no funciona, me trae loading
    },[dispatch]);

    const myPokemon = useSelector((state) => state.detail);

    return (
        <div>
            {
                myPokemon.length > 0 ?
                <div>
                    <h1>Soy {myPokemon[0].name}</h1>
                    <img src={myPokemon[0].image} alt="Imagen" />
                    <h4>Type: {myPokemon[0].types}</h4>
                </div>
                : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}