import React, { useState } from "react";

const AutocompleteInput = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    // Filter options based on input value
    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleSelectOption = (option) => {
    setInputValue(option);
    setFilteredOptions([]);
    onSelect(option); // Notify parent component about the selected option
  };

  const handleInputClick = () => {
    setShowOptions(true);
    setFilteredOptions(options); // Show all options when input is clicked
  };

  const handleInputBlur = () => {
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onClick={handleInputClick}
        onBlur={handleInputBlur}
        placeholder="Type here to search..."
        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
      />
      {showOptions && (
        <ul className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelectOption(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
