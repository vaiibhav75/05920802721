import { useEffect, useState } from "react";
import UserData from "./components/TableUser";
import SortingOrder from "./components/SortingOrder";
import CategoryOptions from "./components/CategoryOptions";
import Pagination from "./components/Pagination";
import axios from "axios";

import './App.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [sortKey, setSortKey] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("Laptop");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortIcon = (key) => {
    if (sortKey === key) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/categories/${category}/products`,
          {
            params: {
              n: currentPage*10,
              page: currentPage,
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
    fetchProducts();
  }, [category, currentPage, sortKey, sortOrder]);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Comparison</h1>
      <CategoryOptions category={category} setCategory={setCategory}></CategoryOptions>
      <SortingOrder handleSort={handleSort} sortIcon={sortIcon}></SortingOrder>
      <UserData
        products={products}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
    </div>
  );
};

export default App;
