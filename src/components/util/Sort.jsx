import React from 'react';
import './Sort.css';

function Sort({ onSortChange }) {
  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
      <div className="sort">
        <select onChange={handleSortChange}>
          <option value="createdAt,desc">최신순</option>
          <option value="price,asc">낮은 가격순</option>
          <option value="price,desc">높은 가격순</option>
        </select>
      </div>
  );
}

export default Sort;
