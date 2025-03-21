import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import ProductCards from "../shop/ProductCards";

const CategoriesPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (categoryName) {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === categoryName.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section>
        <div className="section__container12">
          <h2 className="section__header capitalize">{categoryName}</h2>
          <p className="section__subheader">
            Browse a diverse range of categories, from chic dresses to versatile accessories.
            Elevate your style today!
          </p>
        </div>
      </section>

      {/* Products Card */}
      <div className="section__container1">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoriesPage;
