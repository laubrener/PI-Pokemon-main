import React from "react";
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div>
            <img className="background-image" src="https://media.vandal.net/i/1200x630/10-2021/2021105724573_1.jpg" alt="imagen"/>
            <Link to ='/home'>
                <button className={styles.btn}>Catch 'em all</button>
            </Link>
        </div>
    );
};