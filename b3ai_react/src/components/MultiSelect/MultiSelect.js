import React, { useState, useEffect } from 'react';
// import './ChatGPTPage.css'; // Importing CSS for styles



function MultiSelectManager(dest_arr) {
    const [selections, setSelections] = useState(['New York, USA', 'Paris, France', 'Tokyo, Japan']);
    const [inputSelection, setInputSelection] = useState('');

    const handleRemoveSelection = (selectionToRemove) => {
        setSelections(selections.filter(selection => selection !== selectionToRemove));
    };

    const handleAddSelection = (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page
        if (inputSelection && !selections.includes(inputSelection)) { // Prevent adding empty or duplicate selections
            setSelections([...selections, inputSelection]);
            setInputSelection(''); // Clear input field after adding
        }
    };

    return (
        <div>
            {selections.map(selection => (
                <button key={selection} onClick={() => handleRemoveSelection(selection)}>
                    {selection} <span style={{color: 'red', cursor: 'pointer'}}>x</span>
                </button>
            ))}
            <form onSubmit={handleAddSelection}>
                <input
                    type="text"
                    placeholder="Add a city"
                    value={inputSelection}
                    onChange={e => setInputSelection(e.target.value)}
                />
                <button type="submit">Add Selection</button>
            </form>
        </div>
    );

}

// export default MultiSelectManager;


