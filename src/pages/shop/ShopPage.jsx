import React, { useEffect, useState } from 'react';
import productsData from '../../data/products.json';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';


const filters = {
  categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
  colors: ['all', 'black', 'red', 'gold', 'green', 'yellow', 'blue', 'silver', 'beige', 'orange'],
  priceRange: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50-$100', min: 50, max: 100 },
    { label: '$100-$200', min: 100, max: 200 },
    { label: '$200 and above', min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [products, setProducts] = useState(productsData);
  const [filtersState, setFiltersState] = useState({
    category: 'all',
    color: 'all',
    priceRange: '',
  });

  const applyFilters = () => {
    let filteredProducts = [...productsData];

    // Filter by category
    if (filtersState.category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === filtersState.category);
    }

    // Filter by color
    if (filtersState.color !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.color === filtersState.color);
    }

    // Filter by price range
    if (filtersState.priceRange) {
      const [minPrice, maxPrice] = filtersState.priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    setProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [filtersState]);

  const clearFilters = () => {
    setFiltersState({
      category: 'all',
      color: 'all',
      priceRange: '',
    });
  };

  return (
    <>
      {/* Header Section */}
      <section>
        <div className='section__container12'>
          <h2 className='section__header capitalize'>Shop Page</h2>
          <p className='section__subheader'>
            Discover the Hottest Picks: Elevate your style with Our Curated Collection of Trending Women's Fashion Products.
          </p>
        </div>
      </section>

      {/* Filters & Products Section */}
      <section style={styles.container}>
        {/* Left Side - Filtering */}
        <div style={styles.filterSection}>
          <ShopFiltering filters={filters} filtersState={filtersState} setFiltersState={setFiltersState} clearFilters={clearFilters} />
        </div>

        {/* Middle Section - Product Display */}
        <div style={styles.productsSection}>
          <h3 style={styles.productCount}>Products Available: {products.length}</h3>
          <ProductCards products={products} />
        </div>
      </section>
    </>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    padding: '20px',
  },
  filterSection: {
    width: '250px',  // Sidebar width
    flexShrink: 0,    // Prevents shrinking
    backgroundColor: '#f8f8f8',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  productsSection: {
    flex: 1, // Takes remaining space
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
  },
  productCount: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
};

export default ShopPage;
