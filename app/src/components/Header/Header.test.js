import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

const mockProducts = [
  { name: "Παντελόνι Φόρμας AEROPOSTALE" },
  { name: "Σκουφί 'Arch' BILLABONG" },
  { name: "Αθλητικό T-shirt ANTONY MORATO" },
  { name: "Backpack ANTONY MORATO" },
];

describe("Header Component", () => {
  it("should display products matching the search query", () => {
    const filteredProducts = mockProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    render(
      <div>
        <Header />
        <div>
          {filteredProducts.map((product, index) => (
            <div key={index}>{product.name}</div>
          ))}
        </div>
      </div>
    ); // const searchInput = screen.getByTestId("search-bar");
    // fireEvent.change(searchInput, { target: { value: "ANTONY" } });

    screen.debug();
    // expect(mockSearchFunction).toHaveBeenCalled();

    // expect(
    //   screen.getByText("Αθλητικό T-shirt ANTONY MORATO")
    // ).toBeInTheDocument();
  });

  it("should display all products when search input is cleared", () => {
    // Render the Header component with the mock search function
    renderHeader();

    // Simulate clearing the search input
    const searchInput = screen.getByPlaceholderText("Search for products...");
    fireEvent.change(searchInput, { target: { value: "" } });
    screen.debug();

    // Verify that all products are displayed when search input is cleared
    mockProducts.forEach((product) => {
      expect(
        screen.getByText((content, element) => content.includes(product.name))
      ).toBeInTheDocument();
    });
  });
});
