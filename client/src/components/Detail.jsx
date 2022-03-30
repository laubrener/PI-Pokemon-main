import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import styles from './Detail.module.css';

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
        <div className={styles.page}>
            {
                myPokemon.length ?
                <div className={styles.card}>
                    <div className={styles.title}>
                        <h1 className={styles.name}>{myPokemon[0].name}</h1>
                        <Link to='/home'>
                            <button className={styles.close}>X</button>
                        </Link>
                    </div>
                    <div className={styles.imgCar}>
                        <img className={styles.img} src={myPokemon[0].image} alt="Imagen" />
                        <div className={styles.boxCs}>
                            <div className={styles.miniBox}>
                                <h4 className={styles.car}>HP: </h4>
                                <div className={styles.div}>{myPokemon[0].hp}</div>
                            </div>
                            <div className={styles.miniBox}>
                                <h4 className={styles.car}>Speed: </h4>
                                <div className={styles.div}>{myPokemon[0].speed}</div>
                            </div>
                            <div className={styles.miniBox}>
                                <h4 className={styles.car}>Attack: </h4>
                                <div className={styles.div}>{myPokemon[0].attack}</div>
                            </div>
                            <div className={styles.miniBox}>
                                <h4 className={styles.car}>Defense: </h4>
                                <div className={styles.div}>{myPokemon[0].defense}</div>
                            </div>
                            <div className={styles.miniBox}>
                                <h4 className={styles.car}>Height: </h4>
                                <div className={styles.div}>{myPokemon[0].height}</div>
                            </div>
                            <div className={styles.miniBox}>
                                <h4 className={styles.car}>Weight: </h4>
                                <div className={styles.div}>{myPokemon[0].weight}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.numType}>
                        <h4 className={styles.number}>{myPokemon[0].createdInDb ? '' : myPokemon[0].id}</h4>
                        <h4 className={styles.type}>Type: {myPokemon[0].types.map(el => el.name + (' '))}</h4>
                    </div>
                </div>
                : <p className={styles.loading}>Loading...</p>
            }
            </div>
    );
}