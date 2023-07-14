import React, { useState } from 'react';
import CategoryFilter from './category';
import ColorFilter from './color';
import SeasonFilter from './seacon';

const MyComponent = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'apple', category: 'fruit', color: 'red', season:"winter" },
    { id: 2, name: 'banana', category: 'fruit', color: 'yellow' , season:"winter"},
    { id: 3, name: 'carrot', category: 'vegetable', color: 'orange', season:"summer" },
    { id: 4, name: 'pear', category: 'fruit', color: 'green', season:"rainy" },
    { id: 5, name: 'broccoli', category: 'vegetable', color: 'green', season:"rainy" },
    { id: 6, name: 'Cabbage', category: 'vegetable', color: 'green', season:"summer" }
  ]);

  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
  const [selectedColorFilters, setSelectedColorFilters] = useState([]);
  const [selectedSeasonFilters, setSelectedSeasonFilters] = useState([]);

  const handleFilterToggle = (type, value) => {
    if (type === 'category') {
      const index = selectedCategoryFilters.indexOf(value);
      if (index !== -1) {
        setSelectedCategoryFilters(selectedCategoryFilters.filter(filter => filter !== value));
      } else {
        setSelectedCategoryFilters([...selectedCategoryFilters, value]);
      }
    } else if (type === 'color') {
      const index = selectedColorFilters.indexOf(value);
      if (index !== -1) {
        setSelectedColorFilters(selectedColorFilters.filter(filter => filter !== value));
      } else {
        setSelectedColorFilters([...selectedColorFilters, value]);
      }
    } else if (type === 'season'){
      const index = selectedSeasonFilters.indexOf(value);
      if(index !== -1){
        setSelectedSeasonFilters(selectedSeasonFilters.filter(filter => filter !== value));
      }else{
        setSelectedSeasonFilters([...selectedSeasonFilters, value]);
      }
    }
  }

  const filteredItems = items.filter(item => {
    const categoryFilter = selectedCategoryFilters.length === 0 || selectedCategoryFilters.includes('all') || selectedCategoryFilters.includes(item.category);
    const colorFilter = selectedColorFilters.length === 0 || selectedColorFilters.includes('all') || selectedColorFilters.includes(item.color);
    const seasonFilter = selectedSeasonFilters.length === 0 || selectedSeasonFilters.includes('all') || selectedSeasonFilters.includes(item.season);
    return categoryFilter && colorFilter && seasonFilter;
  });

  return (
    <div>
      <h2>Filter items by category and color</h2>
      <div>
        <div>
       <CategoryFilter
       selectedCategoryFilters={selectedCategoryFilters}
       handleFilterToggle={handleFilterToggle}/>
        </div>
        <div>
        <ColorFilter
          selectedColorFilters={selectedColorFilters}
          handleFilterToggle={handleFilterToggle}
        />
        </div>
        <div>
          <SeasonFilter
          selectedSeasonFilters={selectedSeasonFilters}
          handleFilterToggle={handleFilterToggle}
          />
        </div>
      </div>
      <ul>
        {filteredItems.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
      );
    };
    
    export default MyComponent;
