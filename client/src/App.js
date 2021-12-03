import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes> 
          <Route exact path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/pokemon' element={<PokemonCreate/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
