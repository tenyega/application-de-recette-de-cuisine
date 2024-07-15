import { ChangeEvent, useState } from "react";

export default function SearchBar() {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
      };
    return (
        <div className="search">
        <input
          type="text"
          id="textInput"
                value={inputValue}
                onChange={handleInputChange}
                className="searchBar"
            />
            <img src="https://api.iconify.design/pepicons-pencil:loop.svg?color=%23888888" alt="loop" className="loop"/>
                    <label htmlFor="textInput" >Search</label>

        {/* <p>Current value: {inputValue}</p> */}
      </div>)
}