import React, { useContext, useState } from "react";
import { Checkbox } from "antd";
import { FilterContext } from "../../../pages/Home";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

function Brands() {
  const { filterState, handleFilterChange, brandsData } =
    useContext(FilterContext);

  const [viewAll, setViewAll] = useState(false);

  const renderMoreBrands = () => {
    return (
      <>
        <div className="view_more" onClick={() => setViewAll(!viewAll)}>
          {viewAll ? (
            <>
              <div>View less</div> <UpOutlined />
            </>
          ) : (
            <>
              <div>View more</div> <DownOutlined />
            </>
          )}
        </div>
        {viewAll &&
          brandsData.slice(6, brandsData.length).map((brand) => {
            return (
              <Checkbox
                key={brand._id}
                name={brand._id}
                onChange={(e) => handleFilterChange(e, "brand")}
                value={filterState.brand.includes(brand._id)}
                checked={filterState.brand.includes(brand._id)}
              >
                {brand._id}
              </Checkbox>
            );
          })}
      </>
    );
  };

  return (
    <div>
      <b>Brands</b>
      <div className="filter_contents">
        {brandsData.slice(0, 6).map((brand) => {
          return (
            <Checkbox
              key={brand._id}
              name={brand._id}
              onChange={(e) => handleFilterChange(e, "brand")}
              value={filterState.brand.includes(brand._id)}
              checked={filterState.brand.includes(brand._id)}
            >
              {brand._id}
            </Checkbox>
          );
        })}
        {brandsData.length > 6 && renderMoreBrands()}
      </div>
    </div>
  );
}

export default Brands;
