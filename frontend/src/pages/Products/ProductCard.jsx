import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="flex flex-wrap max-w-sm relative bg-[#1A1A1A] rounded-lg shadow-md transition duration-200 hover:shadow-lg ">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full rounded-t-lg"
            src={p.image}
            alt={p.name}
            style={{ height: "200px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-4">
        <div className="flex  justify-between items-center">
          <h5 className="text-base font-semibold text-white">{p?.name.substring(0,100)}...</h5>
          <p className="text-sm font-bold bg-amber-50 rounded-xl p-1 text-pink-500">
            {p?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>

        <p className="mt-2 mb-4 text-sm text-[#CFCFCF]">
          {p?.description?.substring(0, 60)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-xs font-medium text-white bg-pink-600 rounded hover:bg-pink-700 focus:ring-2 focus:ring-pink-300"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full hover:bg-pink-100 transition"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={24} className="text-white" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
