import React from "react";
import { Skeleton } from "antd";

function ProductCard({ product, loading }) {
  const currentPrice = (
    product.price -
    product.price * parseFloat(product.discount)
  ).toFixed(2);

  const startingPrice = product.price;

  const discount = "-" + product.discount.toFixed(1) * 100 + "%";

  return (
    <>
      {loading ? (
        <>
          <Skeleton.Image style={{ width: 200, height: 300 }} />
          <div className="product_info">
            <Skeleton
              title={false}
              paragraph={{ rows: 1, width: "80%" }}
              active
            />
            <Skeleton
              title={false}
              paragraph={{ rows: 1, width: "50%" }}
              active
            />
          </div>
        </>
      ) : (
        <div className="product_container">
          <img
            src={product.images[0].s3_url}
            alt="product-logo"
            width={200}
            height={300}
          />
          <div className="product_info">
            <div className="product_title">{product.product_title}</div>
            <div className="product_price">
              <div>
                Τρέχουσα τιμή:
                <span style={{ color: "darkred" }}> {currentPrice} €</span>
              </div>
              <div className="product_discount">{discount}</div>
            </div>
            <div style={{ fontSize: "12px" }}>
              Αρχική τιμή: {startingPrice} €
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
