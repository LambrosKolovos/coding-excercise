import React from "react";
import "./Filters.css";
import Gender from "./Gender/Gender";
import Brands from "./Brands/Brands";
import Price from "./Price/Price";
import Categories from "./Categories/Categories";

function Filters({ resetFilterState }) {
  return (
    <div className="filters_wrapper">
      <div className="filter_header">
        <div>Filters</div>
        <button className="filter_clear" onClick={resetFilterState}>
          Clear All
        </button>
      </div>
      <Gender />
      <Brands />
      <Price />
      <Categories />
    </div>
  );
}

export default Filters;
