import React, { useContext, useState } from "react";
import { Checkbox } from "antd";
import { FilterContext } from "../../../pages/Home";

function Categories() {
  const { filterState, handleFilterChange, categoriesData } =
    useContext(FilterContext);

  return (
    <div>
      <b>Categories</b>
      <div className="filter_contents">
        {categoriesData.map((category) => {
          return (
            <Checkbox
              key={category._id}
              name={category._id}
              onChange={(e) => handleFilterChange(e, "category")}
              value={filterState.category.includes(category._id)}
              checked={filterState.category.includes(category._id)}
            >
              {category._id}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
