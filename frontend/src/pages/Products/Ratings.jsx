import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars >= 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className={`text-${color} ml-1`} />
      ))}

      {halfStars === 1 && (
        <FaStarHalfAlt key="half" className={`text-${color} ml-1`} />
      )}

      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className={`text-${color} ml-1`} />
      ))}

      {text && <span className={`ml-2 text-${color}`}>{text}</span>}
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-500",
};

export default Ratings;
