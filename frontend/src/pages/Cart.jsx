import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      {cartItems.length === 0 ? (
        <div className="text-white text-xl">
          Your cart is empty.{" "}
          <Link to="/shop" className="text-pink-500 underline">
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-6 text-white">
              Shopping Cart
            </h1>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-6 border-b pb-4 border-gray-600"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>
                    <Link
                      to={`/product/${item._id}`}
                      className="text-pink-500 font-semibold"
                    >
                      {item.name}
                    </Link>
                    <div className="text-white text-sm">{item.brand}</div>
                    <div className="text-white font-bold text-lg">
                    ₹{item.price}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    className="p-2 border rounded text-black"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-1/3 bg-[#1A1A1A] p-6 rounded-lg text-white">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            <div className="text-lg mb-2">
              Items:{" "}
              <span className="font-bold">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            </div>

            <div className="text-lg mb-4">
              Total:{" "}
              <span className="font-bold">
              ₹
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>

            <button
              className="bg-pink-500 py-2 px-4 w-full rounded-full text-lg font-semibold hover:bg-pink-600 transition"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
