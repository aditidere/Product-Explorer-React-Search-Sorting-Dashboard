import React from "react";
import ProductCard from "./ProductCard";

const ProductList = (props) => {
  return (
    <div className="products-grid">
      {props.products.map(product => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          onClick={() => props.onProductClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;
