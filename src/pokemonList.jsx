import React from "react";

const PokemonList = ({ filteredPokemon, highlightClass }) => {
  return filteredPokemon.map((pokemon) => (
    <li>
      <img src={pokemon.img} alt={pokemon.Name} />
      <div className="info">
        <h1>
          <span className={highlightClass(pokemon.Name)}>{pokemon.Name}</span>
        </h1>
        {pokemon.Types.map((type) => (
          <span className={`type ${type.toLowerCase()}`}>{type}</span>
        ))}
      </div>
    </li>
  ));
};

export default PokemonList;
