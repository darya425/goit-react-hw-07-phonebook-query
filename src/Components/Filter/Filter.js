import React from 'react';

import './Filter.scss';

const Filter = ({ filter }) => {
  const handleSubmit = e => {
    filter(e.currentTarget.value);
  };

  return (
    <div className="filter-form">
      <label className="filter-title">Find contact by name :</label>
      <input
        className="filter-input"
        type="text"
        placeholder="Find a lost soul..."
        onChange={handleSubmit}
      />
    </div>
  );
};

export default Filter;
