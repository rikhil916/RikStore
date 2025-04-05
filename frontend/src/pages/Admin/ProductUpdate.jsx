import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productDetails = {
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
        image,
      };

      const data = await updateProduct({ productId: params._id, ...productDetails });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 font-bold text-lg mb-4">Update / Delete Product</div>

          {image && (
            <div className="text-center mb-4">
              <img
                src={image}
                alt="product"
                className="mx-auto rounded-md w-[250px] h-[250px] object-contain shadow-md"
              />
            </div>
          )}

          <div className="mb-5 flex justify-center">
            <label className="border-2 border-gray-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition w-fit">
              {image ? "Choose File" : "Upload Image"}
              <input type="file" className="hidden" onChange={uploadFileHandler} />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col w-full md:w-[48%]">
                <label className="mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  className="p-4 border rounded-lg bg-[#101011] text-white shadow-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-full md:w-[48%]">
                <label className="mb-1 font-semibold">Price</label>
                <input
                  type="number"
                  className="p-4 border rounded-lg bg-[#101011] text-white shadow-md"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col w-full md:w-[48%]">
                <label className="mb-1 font-semibold">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="p-4 border rounded-lg bg-[#101011] text-white shadow-md"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-full md:w-[48%]">
                <label className="mb-1 font-semibold">Brand</label>
                <input
                  type="text"
                  className="p-4 border rounded-lg bg-[#101011] text-white shadow-md"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col w-full md:w-[48%]">
                <label className="mb-1 font-semibold">Count In Stock</label>
                <input
                  type="text"
                  className="p-4 border rounded-lg bg-[#101011] text-white shadow-md"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-full md:w-[48%]">
                <label className="mb-1 font-semibold">Category</label>
                <select
                  className="p-4 border rounded-lg bg-[#101011] text-white shadow-md"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Description</label>
              <textarea
                className="p-4 border rounded-lg bg-[#101011] text-white shadow-md w-full min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="py-3 px-8 rounded-lg text-lg font-bold bg-green-600 hover:bg-green-700 transition"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-3 px-8 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
