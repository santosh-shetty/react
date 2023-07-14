import React from 'react';

const ColorFilter = ({ selectedColorFilters, handleFilterToggle }) => {
  const colors = ['all', 'red', 'yellow', 'orange', 'green'];

  return (
    <div>
      <h3>Color:</h3>
      {colors.map(color => (
        <div
          key={color}
          onClick={() => handleFilterToggle('color', color)}
          style={{
            backgroundColor: selectedColorFilters.includes(color) ? 'blue' : 'gray',
            color: 'white',
            display: 'inline-block',
            margin: '5px',
            padding: '5px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {color}
        </div>
      ))}
    </div>
  );
};

export default ColorFilter;
