import React, { useState } from 'react';
import productsData from '../../data/products.json';
import ProductCards from '../shop/ProductCards';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    const handleSearch = () => {
        const query = searchQuery.trim().toLowerCase();
        console.log("Search Query:", query);

        const filtered = productsData.filter(product =>
            product.name.toLowerCase().includes(query) || 
            product.description?.toLowerCase().includes(query)
        );

        console.log("Filtered Products:", filtered);
        setFilteredProducts(filtered);
    };

    return (
        <>
            <section>
                <div className='section__container12'>
                    <h2 className='section__header capitalize'>Search Products</h2>
                    <p className='section__subheader'>
                        Browse a diverse range of categories, from chic dresses to versatile accessories. 
                        Elevate your style today!
                    </p>
                </div>
            </section>

            {/* Search Section */}
            <section className='section__container'>
                <div 
                    className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                    {/* Search Input */}
                    <input 
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='search-bar w-full max-w-4xl p-2 border rounded'
                        placeholder='Search for Products...'
                        style={{
                            padding: '10px',
                            border: '2px solid #ccc',
                            borderRadius: '5px',
                            width: '60%',
                            maxWidth: '400px'
                        }}
                    />

                    {/* Search Button */}
                    <button
                        onClick={handleSearch}
                        className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Search
                    </button>
                </div>

                {/* Display Filtered Products */}
                <ProductCards products={filteredProducts} />
            </section>
        </>
    );
};

export default Search;
