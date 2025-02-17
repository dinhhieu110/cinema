import React from 'react';

const Search = (props) => {
  const { searchTerm, setSearchTerm } = props;
  return (
    <div className="search">
      <div>
        <img src="../../public/search.svg" alt="search icon" />
        <input
          type="text"
          name=""
          id=""
          placeholder="Search through thousands of movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
