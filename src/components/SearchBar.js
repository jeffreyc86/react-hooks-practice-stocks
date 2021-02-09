import React from "react";

function SearchBar({setSortBy, filter, setFilter}) {

  function onChecked (e) {
    setSortBy(e.target.value)
  }

  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          name="sort"
          onChange={onChecked}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          name="sort"
          onChange={onChecked}
        />
        Price
      </label>
      <br />
      <label>
        <strong>Filter:</strong>
        <select value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
          <option value="">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
