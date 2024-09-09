import React, { useContext } from "react";
import { Checkbox } from "antd";
import { FilterContext } from "../../../pages/Home";

function Gender() {
  const { filterState, handleFilterChange } = useContext(FilterContext);

  return (
    <div>
      <b>Gender</b>
      {console.log(filterState)}
      <div className="filter_contents">
        <Checkbox
          name="men"
          value={filterState.gender.includes("men")}
          checked={filterState.gender.includes("men")}
          onChange={(e) => handleFilterChange(e, "gender")}
        >
          MEN
        </Checkbox>
        <Checkbox
          name="women"
          value={filterState.gender.includes("women")}
          checked={filterState.gender.includes("women")}
          onChange={(e) => handleFilterChange(e, "gender")}
        >
          WOMEN
        </Checkbox>
      </div>
    </div>
  );
}

export default Gender;
