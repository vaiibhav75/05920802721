
function TableUser ({ products}) {
  if (!products) {products = [];} 

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Product Name
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Price
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Rating
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Discount
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const { id, productName, price, rating, discount } = product;

          return (
            <tr key={id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {productName}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                ${price}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {rating}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {discount}%
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableUser;
