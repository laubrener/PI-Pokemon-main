import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../actions";
import styles from './SearchBar.module.css';
import {FaSearch} from 'react-icons/fa';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getPokemonByName(name));
        //setName(''); buscar como hacer para que borre el nombre despues de buscar
    };
    
    return (
        <div className={styles.searchBar}>
            <input 
            className={styles.input}
            type="text"
            placeholder='Search by name...' 
            onChange={(e) => {handleInputChange(e)}}
            />
            <button className={styles.btn} type='submit' onClick={(e) => {handleSubmit(e)}}>
                <FaSearch/></button>
        </div>
    )
}