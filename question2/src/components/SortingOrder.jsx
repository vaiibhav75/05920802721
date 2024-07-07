function SortingOrder({ handleSort, sortIcon}) {
  return (
    <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Sort By
        </button>
        
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
        
      </div>
  );
}

export default SortingOrder;