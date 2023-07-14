import React from 'react';

const SeasonFilter = ({ selectedSeasonFilters, handleFilterToggle }) => {
  const seasons = ['all', 'winter', 'summer', 'rainy'];

  return (
    <div>
      <h3>Season:</h3>
      {seasons.map(season => (
        <div
          key={season}
          onClick={() => handleFilterToggle('season', season)}
          style={{
            backgroundColor: selectedSeasonFilters.includes(season) ? 'blue' : 'gray',
            color: 'white',
            display: 'inline-block',
            margin: '5px',
            padding: '5px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {season}
        </div>
      ))}
    </div>
  );
};

export default SeasonFilter;
