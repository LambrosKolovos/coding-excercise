import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Categories from "./Categories";
import { FilterContext } from "../../../pages/Home";

const mockCategoriesData = [
  { _id: "BEACHWEAR" },
  { _id: "ΕΣΩΡΟΥΧΟ" },
  { _id: "ΠΑΝΤΕΛΟΝΙ" },
  { _id: "ΚΟΣΤΟΥΜΙ" },
];

const mockFilterState = {
  category: ["BEACHWEAR", "ΠΑΝΤΕΛΟΝΙ"],
};
const mockHandleFilterChange = jest.fn();

describe("Categories Component", () => {
  const renderBrandsComponent = (filterState, categoriesData) => {
    render(
      <FilterContext.Provider
        value={{
          filterState,
          handleFilterChange: mockHandleFilterChange,
          categoriesData,
        }}
      >
        <Categories />
      </FilterContext.Provider>
    );
  };

  it("should render all categories by default", () => {
    renderBrandsComponent(mockFilterState, mockCategoriesData);

    for (let i = 0; i < mockCategoriesData.length; i++) {
      expect(screen.getByText(mockCategoriesData[i]._id)).toBeInTheDocument();
    }
  });

  it("should call handleFilterChange when brand checkbox is clicked", () => {
    renderBrandsComponent(mockFilterState, mockCategoriesData);

    const brandCheckbox = screen.getByLabelText("ΚΟΣΤΟΥΜΙ");

    fireEvent.click(brandCheckbox);
    expect(mockHandleFilterChange).toHaveBeenCalledWith(
      expect.anything(),
      "category"
    );
  });
});
