import React from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  return (
    <div style={styles.filterContainer}>
      <h3 style={styles.filterTitle}>Filter By</h3>

      {/* Category Filtering */}
      <div style={styles.filterSection}>
        <h4 style={styles.filterHeading}>Category</h4>
        <ul style={styles.filterList}>
          {filters.categories.map((category) => (
            <li
              key={category}
              onClick={() => setFiltersState({ ...filtersState, category })}
              style={{
                ...styles.filterItem,
                backgroundColor: filtersState.category === category ? '#ff5722' : '#f1f1f1',
                color: filtersState.category === category ? 'white' : 'black',
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Color Filtering */}
      <div style={styles.filterSection}>
        <h4 style={styles.filterHeading}>Color</h4>
        <select
          style={styles.filterDropdown}
          value={filtersState.color}
          onChange={(e) => setFiltersState({ ...filtersState, color: e.target.value })}
        >
          {filters.colors.map((color) => (
            <option key={color} value={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filtering */}
      <div style={styles.filterSection}>
        <h4 style={styles.filterHeading}>Price Range</h4>
        <select
          style={styles.filterDropdown}
          value={filtersState.priceRange}
          onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
        >
          <option value="">All Prices</option>
          {filters.priceRange.map((range, index) => (
            <option key={index} value={`${range.min}-${range.max}`}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      <button style={styles.clearButton} onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  filterContainer: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  filterTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
    color: '#333',
  },
  filterSection: {
    marginBottom: '15px',
  },
  filterHeading: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#555',
  },
  filterList: {
    listStyleType: 'none',
    padding: 0,
  },
  filterItem: {
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: '0.3s',
    fontSize: '16px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  filterDropdown: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  clearButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#d9534f',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: '0.3s',
  },
};

export default ShopFiltering;
