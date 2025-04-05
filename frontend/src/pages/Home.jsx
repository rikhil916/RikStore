import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword && <Header />}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          {/* Top Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center mt-20 px-6 lg:px-32">
            <h1 className="text-4xl font-semibold text-white mb-6 lg:mb-0">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 text-white font-bold rounded-full py-2 px-8 hover:bg-pink-700 transition duration-300"
            >
              Shop
            </Link>
          </div>

          {/* Product Grid */}
          <div className="flex flex-wrap justify-center mt-10 px-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
