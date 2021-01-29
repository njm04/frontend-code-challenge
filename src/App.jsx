import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonList from "./pokemonList";
import NotFound from "./notFound";

const URL_PATH =
  "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [toggleSort, setToggleSort] = useState("desc");
  const [loading, setLoading] = useState(false);

  useEffect(() => getData(), []);

  useEffect(() => {
    console.log("Search message inside useEffect: ", searchQuery);
    let filtered = [];
    if (searchQuery) {
      filtered = jsonData.filter(
        (pokemon) =>
          pokemon.Name.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
            -1 || pokemon.Types.includes(searchQuery)
      );
    } else {
      filtered = jsonData;
    }

    const sorted = filtered
      .sort((a, b) => {
        if (toggleSort === "asc") return a.MaxCP - b.MaxCP;
        else if (toggleSort === "desc") return b.MaxCP - a.MaxCP;
        return b.MaxCP - a.MaxCP;
      })
      .slice(0, 4);
    setFilteredPokemon(sorted);
  }, [searchQuery, jsonData, toggleSort]);

  const handleSearch = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  const getData = () => {
    fetch(URL_PATH)
      .then((response) => {
        setLoading(true);
        return response.json();
      })
      .then((data) => {
        setJsonData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleToggle = () => {
    const order = toggleSort === "desc" ? "asc" : "desc";
    let filteredByMaxCP = [];
    setToggleSort(order);
    if (filteredPokemon.length > 0) {
      filteredByMaxCP = filteredPokemon
        .sort((a, b) => {
          if (toggleSort === "asc") return a.MaxCP - b.MaxCP;
          else if (toggleSort === "desc") return b.MaxCP - a.MaxCP;
          return b.MaxCP - a.MaxCP;
        })
        .slice(0, 4);
    } else {
      filteredByMaxCP = jsonData
        .sort((a, b) => {
          if (toggleSort === "asc") return a.MaxCP - b.MaxCP;
          else if (toggleSort === "desc") return b.MaxCP - a.MaxCP;
          return b.MaxCP - a.MaxCP;
        })
        .slice(0, 4);
    }
    setFilteredPokemon(filteredByMaxCP);
  };

  const highlightClass = (name) => {
    if (name.toLowerCase() === searchQuery.toLowerCase()) return "hl";
    return "";
  };

  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" onChange={handleToggle} />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        onChange={handleSearch}
      />
      {loading && <div className="loader"></div>}
      {searchQuery && (
        <ul className="suggestions">
          <PokemonList
            filteredPokemon={filteredPokemon}
            highlightClass={highlightClass}
          />
          {filteredPokemon.length === 0 && <NotFound />}
        </ul>
      )}
    </>
  );
};

export default App;
