import React from "react";

const SearchInput = ({ handleSearch, setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.currentTarget.value);
  };
  return (
    <input
      type="text"
      className="input"
      placeholder="Pokemon or type"
      onChange={handleChange}
    />
  );
};

export default SearchInput;
