import React from "react";


export default function Pagination ({pokemonsPerPage, allPokemon, pagination}){
    let pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemon/pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }
    return(
        <div className="pagination">
                { pageNumbers && 
                pageNumbers.map(number => (
                        <button onClick={() => pagination(number)} className='number'>{number}</button>
                ))}
        </div>
    );
}