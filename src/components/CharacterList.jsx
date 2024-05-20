import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCharacters(data.results))
      .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div>
      <header>
        <h1>Lista de Personajes de Rick y Morty</h1>
      </header>
      <div className="container">
        <ul>
          {characters.map(character => (
            <li key={character.id}>
              <Link to={`/character/${character.id}`}>
                <h2>{character.name}</h2>
                <img src={character.image} alt={character.name} />
                <p>{character.species}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterList;
