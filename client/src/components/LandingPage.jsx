import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return(
        <div>
            <img className="background-image" src="https://wallpapercave.com/wp/XSbCZ4F.jpg" alt="imagen"/>
            <h1>Bienvenidos a mi pagina</h1>
            <Link to ='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    );
};