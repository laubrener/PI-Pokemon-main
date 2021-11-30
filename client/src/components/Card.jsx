import React from "react";

export default function charCard({ name, image, type, hp, attack, defense, speed, height, weight}) {
    return(
        <div>
            <h3>{name}</h3>
            <h5>{type}</h5>
            <img src={image} alt='imagen del pokemon' width='200px' height='250px' />
            <h6>{hp}</h6>
            <h6>{attack}</h6>
            <h6>{defense}</h6>
            <h6>{speed}</h6>
            <h6>{height}</h6>
            <h6>{weight}</h6>
        </div>
    );
}