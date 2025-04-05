import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const { userInfo } = useSelector((state) => state.auth);

    const [createReview, { isLoading: loadingProductReview }] =
        useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success("Review created successfully");
        } catch (error) {
            toast.error(error?.data || error.message);
        }
    };

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    return (
        <>
            <div className="px-4 md:px-16 py-6">
                <Link to="/" className="text-white font-semibold hover:underline mb-6 inline-block">
                    ← Go Back
                </Link>

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">
                        {error?.data?.message || error.message}
                    </Message>
                ) : (
                    <>
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Product Image */}
                            <div className="flex-1 relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-[30rem] object-contain rounded-lg"
                                />
                                <HeartIcon product={product} />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 text-white">
                                <h2 className="text-2xl font-semibold">{product.name}</h2>
                                <p className="my-4 text-[#B0B0B0]">
                                    {product.description}
                                </p>

                                <p className="text-4xl font-bold text-pink-500 mb-6">
                                    ₹{product.price}
                                </p>

                                <div className="grid grid-cols-2 gap-6 text-sm">
                                    <h1 className="flex items-center">
                                        <FaStore className="mr-2" /> Brand: {product.brand}
                                    </h1>
                                    <h1 className="flex items-center">
                                        <FaStar className="mr-2" /> Ratings: {product.rating}
                                    </h1>
                                    <h1 className="flex items-center">
                                        <FaClock className="mr-2" /> Added:{" "}
                                        {moment(product.createdAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center">
                                        <FaShoppingCart className="mr-2" /> Quantity: {product.quantity}
                                    </h1>
                                    <h1 className="flex items-center">
                                        <FaStar className="mr-2" /> Reviews: {product.numReviews}
                                    </h1>
                                    <h1 className="flex items-center">
                                        <FaBox className="mr-2" /> In Stock: {product.countInStock}
                                    </h1>
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    <Ratings
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />

                                    {product.countInStock > 0 && (
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            className="p-2 rounded text-black"
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-6"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="mt-10">
                            <ProductTabs
                                loadingProductReview={loadingProductReview}
                                userInfo={userInfo}
                                submitHandler={submitHandler}
                                rating={rating}
                                setRating={setRating}
                                comment={comment}
                                setComment={setComment}
                                product={product}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ProductDetails;
