// File: /src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css'; // 👈 Create this file

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Searching for:', query);
      // You can hook into search logic here
    }
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search modules..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleSearch}
    />
  );
};

export default SearchBar;
