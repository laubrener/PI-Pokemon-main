import React from "react";
import styles from './Home.module.css';


export default function Pagination ({pokemonsPerPage, allPokemon, pagination}){
    let pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allPokemon/pokemonsPerPage -1); i++) {
        pageNumbers.push(i+1);
    }
    return(
        <div className={styles.pagination}>
                { pageNumbers && 
                pageNumbers.map(number => (
                        <button onClick={() => pagination(number)} className={styles.number} key={number}>{number}</button>
                ))}
        </div>
    );
}