import React from "react";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="modal-image"
        />

        <h2>{product.title}</h2>
        <p className="modal-price">₹ {product.price}</p>
        <p className="modal-desc">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductModal;
