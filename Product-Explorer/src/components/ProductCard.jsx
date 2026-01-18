import React from "react";

const ProductCard = (props) => {
  return (
    <div
      className="product-card"
      onClick={() => props.onClick()}
      style={{ cursor: "pointer" }}
    >
      <div className="product-title">{props.title}</div>
      <div className="product-price">₹ {props.price}</div>
    </div>
  );
};

export default ProductCard;
