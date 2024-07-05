import React, { useEffect, useState } from "react";
import UserData from "./components/UserData";
import axios from "axios";
import "./style.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [category, setCategory] = useState("Laptop"); // Default category

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/categories/${category}/products`,
        {
          params: {
            n: productsPerPage * currentPage,
            sort: sortKey,
            order: sortOrder,
            minPrice: 1,
            maxPrice: 10000,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setShowSortOptions(false);
    fetchProducts();
  };

  const sortIcon = (key) => {
    if (sortKey === key) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchProducts();
  }, [category, currentPage, sortKey, sortOrder]);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <ul className="flex justify-center mt-4">
        {currentPage > 1 && (
          <li className="mx-1">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-3 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
              Previous
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className={`mx-1 ${number === currentPage ? "bg-blue-500 text-white" : ""}`}>
            <button
              onClick={() => paginate(number)}
              className="px-3 py-2 rounded-md hover:bg-gray-400">
              {number}
            </button>
          </li>
        ))}
        {currentPage < Math.ceil(products.length / productsPerPage) && (
          <li className="mx-1">
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-3 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
              Next
            </button>
          </li>
        )}
      </ul>
    );
  };

  const categoryOptions = [
    "Phone",
    "Computer",
    "TV",
    "Earphone",
    "Tablet",
    "Charger",
    "Mouse",
    "Keypad",
    "Bluetooth",
    "Pendrive",
    "Remote",
    "Speaker",
    "Headset",
    "Laptop",
    "PC",
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Comparison</h1>
      <div className="mb-4">
        <label className="block mb-2">Select Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded-md w-full">
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setShowSortOptions(!showSortOptions)}>
          Sort By
        </button>
        {showSortOptions && (
          <div className="mt-2">
            <button
              onClick={() => handleSort("price")}
              className="px-3 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2">
              Price {sortIcon("price")}
            </button>
            <button
              onClick={() => handleSort("rating")}
              className="px-3 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2">
              Rating {sortIcon("rating")}
            </button>
            <button
              onClick={() => handleSort("discount")}
              className="px-3 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
              Discount {sortIcon("discount")}
            </button>
          </div>
        )}
      </div>
      <table className="min-w-full leading-normal">
        <tbody>
          <UserData
            products={currentProducts}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default App;
