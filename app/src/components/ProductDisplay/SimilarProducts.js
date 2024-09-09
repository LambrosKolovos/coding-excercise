import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductList/ProductCard";

function SimilarProducts({ category, id }) {
  const [similarProd, setSimilarProd] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/products/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSimilarProd(data);
      })
      .catch((error) => console.error("Error fetching product", error));
  }, [category]);
  return (
    <div>
      <div className="similar_title">SimilarProducts</div>
      <div className="similar_wrapper">
        {similarProd &&
          similarProd.map((prod) => {
            return (
              <Link to={`/product/${prod.product_id}`}>
                <ProductCard product={prod} />;
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default SimilarProducts;
