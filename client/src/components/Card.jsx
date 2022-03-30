import React from "react";
import styles from './Card.module.css';

export default function Card({ name, image, types}) {
    return( //va a ser lo que quiero que se vea en el home
        <div className={styles.card}>
            <div className={styles.blue}>
            <img src={image} alt='imagen del pokemon' className={styles.img} />
            <h3 className={styles.name}>{name}</h3>
            <h5 className={styles.types}>{types}</h5>
            </div>
        </div>
    );
}