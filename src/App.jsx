import React, { useState, useEffect } from 'react'
import './index.css'

function PokemonApp() {
  const [pokemonName, setPokemonName] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    setPokemon(data)
    setLoading(false)
  }

  useEffect(() => {
    if (!pokemon) {
      setPokemon(null)
    }
  }, [pokemonName])

  return (
    <div className="App">
      <form className="pokemon-form" onSubmit={handleSubmit}>
        <input 
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button type="submit">Get Pokemon</button>
      </form>

      {loading ? (
        <div>Loading...</div>  
      ) : pokemon ? (
        <div className="pokemon-info">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />

          <p>Height: {pokemon.height}</p> 
          <p>Weight: {pokemon.weight}</p>
          
          <h3>Abilities</h3>
          {pokemon.abilities.map(ability => (
          <p key={ability.ability.name}>{ability.ability.name}</p>   
          ))}
          
          <h3>Moves</h3>
          <div className="moves">
            {pokemon.moves.map(move => (
              <p key={move.move.name}>{move.move.name}</p> 
            ))}
          </div>
      
        </div>  
      ) : (
        <div>No pokemon yet, please submit a pokemon!</div>
      )}
    </div>
  )
}

export default PokemonApp;