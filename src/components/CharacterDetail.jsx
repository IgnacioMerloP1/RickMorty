import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCharacter(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  if (!character) {
    return <div className="container">Cargando...</div>;
  }

  return (
    <div className="container">
      <div className="detail">
        <h1>{character.name}</h1>
        <img src={character.image} alt={character.name} />
        <p>Especie: {character.species}</p>
        <p>Estado: {character.status}</p>
        <p>Género: {character.gender}</p>
        <p>Origen: {character.origin.name}</p>
        <p>Ubicación actual: {character.location.name}</p>
      </div>
    </div>
  );
}

export default CharacterDetail;
