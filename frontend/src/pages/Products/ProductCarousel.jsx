import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full">
      <div className="bg-[#1A1A1A] rounded-xl p-4 shadow-lg h-full">
        {isLoading ? null : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Slider {...settings}>
            {products.map(
              ({
                image,
                _id,
                name,
                price,
                description,
                brand,
                createdAt,
                numReviews,
                rating,
                quantity,
                countInStock,
              }) => (
                <div key={_id} className="space-y-4">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-contain rounded-lg"
                  />

                  <h2 className="text-white text-lg font-semibold truncate">
                    {name}
                  </h2>

                  <p className="text-pink-500 font-bold text-base">
                    ₹{price}
                  </p>

                  <p className="text-gray-300 text-sm">
                    {description?.substring(0, 100)}...
                  </p>

                  <div className="text-white text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <FaStore /> <span>Brand: {brand}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar /> <span>Ratings: {Math.round(rating)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock /> <span>Added: {moment(createdAt).fromNow()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaShoppingCart /> <span>Quantity: {quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar /> <span>Reviews: {numReviews}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBox /> <span>In Stock: {countInStock}</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
