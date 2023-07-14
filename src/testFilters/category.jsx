import React from 'react';

const CategoryFilter = ({ selectedCategoryFilters, handleFilterToggle }) => {
  const categories = ['all', 'fruit', 'vegetable'];

  return (
    <div>
      <h3>Category:</h3>
      {categories.map(category => (
        <div
          key={category}
          onClick={() => handleFilterToggle('category', category)}
          style={{
            backgroundColor: selectedCategoryFilters.includes(category) ? 'blue' : 'gray',
            color: 'white',
            display: 'inline-block',
            margin: '5px',
            padding: '5px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
