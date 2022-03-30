import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon, filterPokemonByType, filterCreated, orderByName } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card'
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import styles from './Home.module.css';



export default function Home(){
    const dispatch = useDispatch(); //igual a mapDispatchToProps
    const allPokemon = useSelector((state) => state.pokemon); // igual a mapStateToProps
    const allTypes = useSelector((state) => state.allTypes);

    const [order, setOrder] = useState(''); //genero un estado local vacio para guardar ahi el ordenamiento
    const [currentPage, setCurrentPage] = useState(1); //guarde en un estado local la pagina actual que es 1
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); //guarde cuantos pokemon quiero por pagina
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //0
    const currentPokemons = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon); //los pokemon que van a estar en la pagina actual

    const pagination = (pageNumber) => { //me va a ayudar al renderizado
        setCurrentPage(pageNumber);
    }
    
    useEffect (() => { //traigo los pokemon cuando el componente se monta
        dispatch(getPokemon());
    }, [dispatch]) //siempre y cuando suceda esto

    
    
    console.log(allPokemon);
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemon()); //resetea
    };

    function handleFilterType(e){
        dispatch(filterPokemonByType(e.target.value)); //le digo que tome los valores de cada type
    };

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
    };

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); //cuando seteo la pagina
        setOrder(`Ordenado ${e.target.value}`); // modifica el estado local y se renderice
    };

    return(
        <div className={styles.page}>
            <div className={styles.one}>
                <img className={styles.title} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="pokemon" />
                <SearchBar/>
                <div className={styles.pagination}>
                    <Pagination
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemon={allPokemon.length}
                        pagination={pagination}
                    />
                </div>
            
            <div className={styles.filters}>
                <Link to = '/pokemon' className={styles.create}>Create Pokemon</Link>
                <h3 className={styles.text}>Filters</h3>
                <select className={styles.select} onChange={e => {handleSort(e)}}>
                    <option value='asc'>A to Z</option> 
                    <option value='desc'>Z to A</option>
                </select>
                <select className={styles.select} onChange={e => {handleFilterType(e)}}>
                    <option value = 'all'>All types</option>
                    <option value = 'normal'>Normal</option>
                    <option value = 'fighting'>Fighting</option>
                    <option value = 'flying'>Flying</option>
                    <option value = 'poison'>Poison</option>
                    <option value = 'ground'>Ground</option>
                    <option value = 'rock'>Rock</option>
                    <option value = 'bug'>Bug</option>
                    <option value = 'ghost'>Ghost</option>
                    <option value = 'steel'>Steel</option>
                    <option value = 'fire'>Fire</option>
                    <option value = 'water'>Water</option>
                    <option value = 'grass'>Grass</option>
                    <option value = 'electric'>Electric</option>
                    <option value = 'psychic'>Psychic</option>
                    <option value = 'ice'>Ice</option>
                    <option value = 'dragon'>Dragon</option>
                    <option value = 'dark'>Dark</option>
                    <option value = 'fairy'>Fairy</option>
                    <option value = 'unknown'>Unknown</option>
                    <option value = 'shadow'>Shadow</option>
                </select>
                <select className={styles.select} onChange={e => {handleFilterCreated(e)}}>
                    <option value='all'>All</option>
                    <option value='created'>Created</option>
                    <option value='api'>Existant</option>
                </select>
                <button className={styles.load} onClick={e => {handleClick(e)}}>
                Load all Pokemon
                </button>
                </div>
                </div>
                <div className={styles.two}>
                    {currentPokemons ? currentPokemons.map((p, i) => {
                        return(
                            <div className={styles.cards} key={i}>
                                <Link to={'/home/'+ p.id}>
                                    <Card 
                                        name={p.name} 
                                        image={p.image} 
                                        types={p.types.map(e => e.name + ' ')} 
                                        >
                                    </Card>
                                </Link>
                            </div>
                        );  
                    }) :
                    <div>
                        <Link to={'/home/' + allPokemon.id}>
                            <Card 
                                name={allPokemon.name} 
                                types={allPokemon.types.map(el => el.name + (' '))}
                                image={allPokemon.image} 
                                key={allPokemon.id}>
                            </Card>
                        </Link>
                    </div>
                    }
                </div>
        </div>
    );
}