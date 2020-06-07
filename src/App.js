import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/hero';


function App() {

  const [heroesList, setHeroes] = useState([]);
  const [newHero, setNewHero] = useState("");
  const [showAll, setShowAll] = useState(true);

  const toggleImportantOf = hero => {

    let idHero = hero.id;
    let impHero = hero.important;

    fetch(`http://localhost:8888/api/setHeroes.php?id=${idHero}&imp=${impHero}`)
      .then(res => res.json())
      .then(response => {
        setHeroes(response);
        console.log(response);
      })
      .catch(err => console.log(err))
  }

  async function getHeroes(hero) {
    let fetchHero = await fetch('http://localhost:8888/api/getHeroes.php',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(hero)
      }
    )
    let respJson = await fetchHero.json();
    return respJson;
  }

  useEffect(() => {
    getHeroes()
      .then(response => {
        setHeroes(response);
      })
      .catch(err => console.log(err))
  }, []);

  const heroesToShow = showAll ? heroesList : heroesList.filter(hero => hero.important == true);

  const addHero = e => {
    e.preventDefault();
    let heroObject = {
      name: newHero,
      date: new Date().toISOString().slice(0, 10),
      important: Math.round(Math.random() * 2)
    }

    getHeroes(heroObject)
      .then(response => {
        setHeroes(response);
      })
      .catch(err => console.log(err))

    setNewHero("");
  }

  const removeHero = (hero, e) => {

    let idHero = hero.id;
    let ok = window.confirm("Sei sicuro di voler rimuovere l'eroe " + hero.name + " dal database?");

    if (ok === true) {

      fetch(`http://localhost:8888/api/deleteHero.php?id=${idHero}`)
        .then(res => res.json())
        .then(response => {
          e.target.remove();
        })
        .catch(err => console.log(err))
    }

  }

  const handleHeroChange = e => {
    setNewHero(e.target.value);
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Heroes</h1>
        <button className="waves-effect waves-light btn-small" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
        <ul className="collection">
          {
            heroesToShow.map((hero, index) => <Hero toggleImportant={() => { toggleImportantOf(hero) }} key={index} hero={hero} deleteHero={e => { removeHero(hero, e) }} />)
          }
        </ul>
        <form onSubmit={addHero} className="col s12">
          <div className="input-field col s6">
            <input type="text" value={newHero} onChange={handleHeroChange} required />
            <label >Inserisci il nome ...</label>
          </div>
          <button className="btn-floating waves-effect waves-light green" type="submit"><i className="material-icons">add</i></button>
        </form>
      </div>
    </div>
  );
}

export default App;
