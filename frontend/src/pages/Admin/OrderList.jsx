import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="flex flex-col md:flex-row ml-[10rem]">
      <AdminMenu />
      <div className="w-full p-4">
        <h2 className="text-xl font-bold mb-4">Orders</h2>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm text-left">
              <thead className="bg-gray-200 text-gray-800 font-semibold">
                <tr>
                  <th className="py-2 px-3">Items</th>
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">User</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Total</th>
                  <th className="py-2 px-3">Paid</th>
                  <th className="py-2 px-3">Delivered</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="py-2 px-3">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-3">{order._id}</td>
                    <td className="py-2 px-3">
                      {order.user ? order.user.username : "N/A"}
                    </td>
                    <td className="py-2 px-3">
                      {order.createdAt?.substring(0, 10) || "N/A"}
                    </td>
                    <td className="py-2 px-3">$ {order.totalPrice}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          order.isPaid ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {order.isPaid ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          order.isDelivered ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {order.isDelivered ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <Link to={`/order/${order._id}`}>
                        <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
