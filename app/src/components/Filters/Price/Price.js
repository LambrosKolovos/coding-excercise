import React, { useContext, useEffect, useState } from "react";
import { Slider } from "antd";
import { FilterContext } from "../../../pages/Home";

function Price() {
  const { filterState, handleFilterChange } = useContext(FilterContext);

  const [priceVal, setPriceVal] = useState([]);

  useEffect(() => {
    if (filterState.priceRange.length) setPriceVal(filterState.priceRange);
    else setPriceVal([0, 100]);
  }, [filterState]);

  return (
    <div>
      <b>Price</b>
      <div style={{ marginTop: "10px" }}>
        <Slider
          data-testid={"price-slider"}
          range
          value={priceVal}
          onChange={(value) => {
            setPriceVal(value);
          }}
          onChangeComplete={(value) => handleFilterChange(null, "price", value)}
        />
        <div>
          Από {priceVal[0]}€ έως {priceVal[1]}€
        </div>
      </div>
    </div>
  );
}

export default Price;
