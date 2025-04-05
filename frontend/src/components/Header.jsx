import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <h1 className="text-red-500 text-center">ERROR</h1>;

  return (
    <div className="flex px-10 py-6 gap-6 h-[calc(100vh-100px)]">
      {/* Left - Product Grid */}
      <div className="flex-1 grid grid-cols-2 gap-6 overflow-y-auto pr-4">
        {data.map((product) => (
          <SmallProduct key={product._id} product={product} />
        ))}
      </div>

      {/* Right - Carousel */}
      <div className="w-[350px] h-full overflow-y-auto bg-zinc-900 rounded-xl shadow-lg p-4">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
