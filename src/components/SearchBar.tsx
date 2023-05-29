import { FC } from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;

/*
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;
*/
