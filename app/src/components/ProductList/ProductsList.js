import React, { useContext } from "react";
import "./ProductsList.css";
import { Pagination } from "antd";
import ProductCard from "./ProductCard";
import ProductFilterInfo from "./ProductFilterInfo";
import { FilterContext } from "../../pages/Home";
import { Link } from "react-router-dom";

function ProductsList({ data, onChangePage, onChangePageSize, isLoading }) {
  const { totalProducts } = useContext(FilterContext);

  return (
    <>
      <div className="products_wrapper">
        <ProductFilterInfo />
        <>
          <div className="products_grid">
            {data.map((prod) => {
              return (
                <Link to={`/product/${prod.product_id}`}>
                  <ProductCard product={prod} loading={isLoading} />;
                </Link>
              );
            })}
          </div>
          <Pagination
            showSizeChanger
            defaultPageSize={20}
            defaultCurrent={1}
            total={totalProducts}
            className="pagination_wrapper"
            align="end"
            onChange={(page) => onChangePage(page)}
            onShowSizeChange={(_, size) => onChangePageSize(size)}
          />
        </>

        {totalProducts === 0 && !isLoading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              height: "80%",
            }}
          >
            <img src="./no-products.png" width={300}></img>
            <div>No products matched your search! Please try again.</div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductsList;
