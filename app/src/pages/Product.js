import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductImage from "../components/ProductDisplay/ProductImage";
import ProductInfo from "../components/ProductDisplay/ProductInfo";
import Header from "../components/Header/Header";
import "./ProductPage.css";
import { Breadcrumb } from "antd";
import SimilarProducts from "../components/ProductDisplay/SimilarProducts";
import { API_URL } from "./Home";

function Product() {
  const { id } = useParams();
  const [productData, setProductData] = useState([]);
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
        setNavigation(data.product_categories[0].split(">"));
      })
      .catch((error) => console.error("Error fetching product", error));
  }, [id]);

  return (
    <div>
      <Header />
      <div className="display_wrapper">
        <Breadcrumb
          items={[
            {
              title: (
                <Link
                  to="/"
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  Αρχική
                </Link>
              ),
            },
            {
              title: navigation[0],
            },
            {
              title: navigation[1],
            },
            {
              title: navigation[2],
            },
          ]}
        />
        <div className="product_content_wrapper">
          <ProductImage images={productData.images} />
          <ProductInfo product={productData} />
        </div>
        {productData.product_categories && (
          <SimilarProducts category={productData.product_categories} id={id} />
        )}{" "}
      </div>
    </div>
  );
}

export default Product;
