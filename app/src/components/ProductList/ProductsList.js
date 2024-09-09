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

        {totalProducts === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              height: "80%",
            }}
          >
            <img src="./no-products.png" width={400}></img>
            <div>No products matched your search! Please try again.</div>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
}

export default ProductsList;
