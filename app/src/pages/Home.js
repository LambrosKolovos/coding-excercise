import React, { useEffect, useState, useCallback, createContext } from "react";
import "./Home.css";
import Filters from "../components/Filters/Filters";
import ProductsList from "../components/ProductList/ProductsList";
import debounce from "lodash.debounce";
import Header from "../components/Header/Header";

const emptyFilterState = {
  keyword: "",
  gender: [],
  brand: [],
  category: [],
  priceRange: [],
  discount: [],
};

export const FilterContext = createContext(null);

function Home() {
  // Filter options state
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  // Filter, products, and pagination state
  const [filterState, setFilterState] = useState(emptyFilterState);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [isLoading, setIsLoading] = useState(false);

  const fetchFilterOptions = useCallback(() => {
    fetch("http://localhost:3000/stockinfo")
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.brands);
        setCategories(data.categories);
        setDiscounts(data.discounts);
      })
      .catch((error) => console.error("Error fetching filter options:", error));
  }, []);

  const fetchProducts = useCallback(() => {
    const requestData = {
      filterState,
      activePage,
      pageSize,
    };

    setIsLoading(true);
    fetch("http://localhost:3000/products/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.totalCount);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setIsLoading(false));
  }, [filterState, activePage, pageSize]);

  useEffect(() => {
    console.log("Getting opts");

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Updates state when filter is clicked resulting in new API call with update data
  const handleFilterChange = (e, category, price) => {
    setFilterState((prevState) => {
      if (category === "price") {
        return { ...prevState, priceRange: price };
      }

      const { name, type, checked } = e.target;
      let updatedValue = prevState[category];

      if (type === "checkbox") {
        updatedValue = checked
          ? [...updatedValue, name]
          : updatedValue.filter((item) => item !== name);
      }

      return { ...prevState, [category]: updatedValue };
    });
  };

  // Called users clicks the filter tag element above the product grid
  const removeFilter = (category, item) => {
    if (category === "price")
      setFilterState((prevFilterState) => ({
        ...prevFilterState,
        priceRange: [],
      }));
    else
      setFilterState((prevFilterState) => ({
        ...prevFilterState,
        [category]: prevFilterState[category].filter(
          (filterItem) => filterItem !== item
        ),
      }));
  };

  // This is to avoid calling the API on every keystroke
  const debouncedSearch = useCallback(
    debounce((e) => {
      setFilterState((prevState) => {
        return {
          ...prevState,
          keyword: e.target.value,
        };
      });
    }, 500),
    []
  );

  return (
    <div className="main_wrapper">
      <Header searchFunction={debouncedSearch} />
      <div className="home_wrapper">
        <FilterContext.Provider
          value={{
            filterState,
            brandsData: brands,
            categoriesData: categories,
            discountData: discounts,
            handleFilterChange,
            removeFilter,
            totalProducts,
          }}
        >
          <Filters resetFilterState={() => setFilterState(emptyFilterState)} />
          <ProductsList
            data={products}
            totalCount={totalProducts}
            activePage={activePage}
            onChangePage={setActivePage}
            onChangePageSize={setPageSize}
            isLoading={isLoading}
          />
        </FilterContext.Provider>
      </div>
    </div>
  );
}

export default Home;
