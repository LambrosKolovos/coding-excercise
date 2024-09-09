import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Header({ searchFunction }) {
  return (
    <div className="header_wrapper">
      <Link to="/">
        <h2>A brand store</h2>
      </Link>
      <div className="search-container">
        <SearchOutlined />
        <input
          data-testid="search-bar"
          placeholder="Search for products..."
          onChange={searchFunction}
        />
      </div>
    </div>
  );
}

export default Header;
