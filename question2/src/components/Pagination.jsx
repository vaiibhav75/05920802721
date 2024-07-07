

function Pagination({ currentPage, setCurrentPage }) {
    return (
      <div className="flex items-center justify-center space-x-4 p-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-blue-500 border border-blue-500 rounded disabled:text-gray-400 disabled:border-gray-400"
        >
          {"<"}
        </button>
        <span className="px-4 py-2 bg-blue-500 text-white rounded">
          {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 text-blue-500 border border-blue-500 rounded"
        >
          {">"}
        </button>
      </div>
    );
  }



export default Pagination;
