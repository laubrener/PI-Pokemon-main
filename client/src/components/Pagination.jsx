import React from "react";


export default function Pagination ({pokemonsPerPage, allPokemon, pagination}){
    let pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allPokemon/pokemonsPerPage); i++) {
        pageNumbers.push(i+1);
    }
    return(
        <div className="pagination">
                { pageNumbers && 
                pageNumbers.map(number => (
                        <button onClick={() => pagination(number)} className='number' key={number}>{number}</button>
                ))}
        </div>
    );
}