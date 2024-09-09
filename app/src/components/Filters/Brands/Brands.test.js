import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Brands from "./Brands";
import { FilterContext } from "../../../pages/Home";

// Mock data for the test
const mockBrandsData = [
  { _id: "SUPERDRY" },
  { _id: "ELLESSE" },
  { _id: "VOLCOM" },
  { _id: "US POLO" },
  { _id: "ANTONY MORATO" },
  { _id: "BROOKS" },
  { _id: "ICE PEAK" },
  { _id: "TOP GUN" },
];

const mockFilterState = {
  brand: ["SUPERDRY", "ELLESSE"],
};
const mockHandleFilterChange = jest.fn();

describe("Brands Component", () => {
  const renderBrandsComponent = (filterState, brandsData) => {
    render(
      <FilterContext.Provider
        value={{
          filterState,
          handleFilterChange: mockHandleFilterChange,
          brandsData,
        }}
      >
        <Brands />
      </FilterContext.Provider>
    );
  };

  it("should render the first 6 brands by default", () => {
    renderBrandsComponent(mockFilterState, mockBrandsData);

    // Check if the first 6 brands are rendered
    for (let i = 0; i < 6; i++) {
      expect(screen.getByText(mockBrandsData[i]._id)).toBeInTheDocument();
    }
  });

  it('should show "View more" if brands are more than 6', () => {
    renderBrandsComponent(mockFilterState, mockBrandsData);

    if (mockBrandsData.length > 6)
      expect(screen.getByText("View more")).toBeInTheDocument();
  });

  it("should call handleFilterChange when brand checkbox is clicked", () => {
    renderBrandsComponent(mockFilterState, mockBrandsData);

    const brandCheckbox = screen.getByLabelText("ELLESSE");

    // Simulate checking the checkbox
    fireEvent.click(brandCheckbox);
    expect(mockHandleFilterChange).toHaveBeenCalledWith(
      expect.anything(),
      "brand"
    );
  });
});
