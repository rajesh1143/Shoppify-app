import React, { useState } from "react";

interface ISearchType {
  onChange: (searchVal: string) => void;
}

const Search: React.FC<ISearchType> = ({ onChange }) => {
  const [searchVal, setSearchVal] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchVal(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onChange(searchVal);
  };
  return (
    <div>
      <div className="border rounded-md py-2 px-2 w-72 ml-auto my-4">
        <input
          value={searchVal}
          onChange={handleSearch}
          onKeyUp={handleKeyPress}
          placeholder="Search Products"
          className="focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Search;
