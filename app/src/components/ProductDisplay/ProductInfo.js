import React from "react";

function ProductInfo({ product }) {
  const currentPrice = (
    product.price -
    product.price * parseFloat(product.discount)
  ).toFixed(2);

  const startingPrice = product.price;
  return (
    <div className="product_right_wrapper">
      <div>
        <div className="product_display_title">{product.product_title}</div>
        <div className="product_display_code">
          Κωδικός: {product.product_id}
        </div>
        <div>{product.product_description}</div>
      </div>
      <div className="product_stock">
        <div>
          Stock: {product.stock} Discount: -
          {(product.discount * 100).toFixed(1)}%
        </div>
        <div>
          Τρέχουσα τιμή:
          <span style={{ color: "darkred", fontSize: "20px" }}>
            {" "}
            {currentPrice} €
          </span>
        </div>
        <div style={{ fontSize: "12px" }}>Αρχική τιμή: {startingPrice} €</div>
      </div>
    </div>
  );
}

export default ProductInfo;
