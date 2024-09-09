import React, { useContext } from "react";
import { FilterContext } from "../../pages/Home";
import { CloseCircleOutlined } from "@ant-design/icons";

function ProductFilterInfo() {
  const { totalProducts, filterState, removeFilter } =
    useContext(FilterContext);

  const filterTags = () => {
    return Object.keys(filterState).map((key) => {
      if (Array.isArray(filterState[key]) && filterState[key].length > 0) {
        if (key === "priceRange")
          return (
            <div className="filter_tag">
              {`${filterState[key][0]}€ - ${filterState[key][1]}€`}
              <CloseCircleOutlined onClick={() => removeFilter("price")} />
            </div>
          );
        return filterState[key].map((item, index) => (
          <div className="filter_tag" key={`${key}-${index}`}>
            {item}
            <CloseCircleOutlined onClick={() => removeFilter(key, item)} />
          </div>
        ));
      }
      return null;
    });
  };
  return (
    <div className="filter_info_wrapper">
      <div>Βρέθηκαν {totalProducts} προιόντα</div>
      {filterTags()}
    </div>
  );
}

export default ProductFilterInfo;
