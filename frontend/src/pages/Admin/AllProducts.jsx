import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 mt-10">Error loading products</div>;
  }

  return (
    <div className="container xl:mx-[9rem] sm:mx-[1rem] mt-6">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-1/4 p-3">
          <AdminMenu />
        </div>

        {/* Product List */}
        <div className="md:w-3/4 p-3">
          <div className="text-2xl font-bold text-white mb-6">
            All Products ({products?.length})
          </div>

          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="border rounded-lg overflow-hidden hover:shadow-lg bg-[#181818] transition duration-300"
              >
                <div className="flex flex-col sm:flex-row">
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="w-full sm:w-[10rem] h-auto object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <h5 className="text-xl font-semibold text-white">{product?.name.substring(0,100)}...</h5>
                      <p className="text-gray-400 text-sm mt-1 sm:mt-0">
                        {moment(product.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>

                    <p className="text-gray-400 text-sm mt-2 mb-4 line-clamp-3">
                      {product?.description?.substring(0, 160)}...
                    </p>

                    <div className="flex justify-between items-center">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                      >
                        Update Product
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 14 10"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                      <p className="text-pink-400 font-semibold text-lg">₹ {product?.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
