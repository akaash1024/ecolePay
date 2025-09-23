import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionStatus } from "../../features/transactions/transactionSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const OrderStatus = () => {
  const [ordId, setOrdId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  useEffect(() => {
    if (!currentUser) {
      setTimeout(() => {
        toast.error("Please log in first!");
      }, 1000);
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  async function handleOrderStatusFetch() {
    try {
      setLoading(true);
      setError(null);
      setOrderStatus(null);
      setStudentData(null);

      const res = await dispatch(fetchTransactionStatus(ordId)).unwrap();

      setOrderStatus(res.orderStaus);
      setStudentData(res.studentData?.[0]);
    } catch (err) {
      setError("Failed to fetch transaction status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full">
      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Input + Button */}
        <div className="col-span-1 flex flex-col gap-2">
          <input
            type="search"
            placeholder="Enter Order ID"
            className="w-full border-green-500 px-3 py-2 rounded-xl text-sm border outline-none focus:ring-2 focus:ring-green-400"
            value={ordId}
            onChange={(e) => setOrdId(e.target.value)}
          />
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600 transition"
            onClick={handleOrderStatusFetch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Track"}
          </button>
        </div>

        {/* Results */}
        {orderStatus && studentData && (
          <div className="col-span-2 flex items-center gap-6">
            {/* Student Avatar */}
            <div className="flex flex-col items-center">
              <img
                src={
                  studentData.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    studentData.name || "User"
                  )}&background=34d399&color=fff`
                }
                alt="student profile"
                className="w-20 h-20 object-cover rounded-2xl border"
              />
              <p className="text-gray-800 text-sm font-medium mt-2">
                {studentData.name}
              </p>
              <p className="text-gray-500 text-xs">{studentData.email}</p>
            </div>

            {/* Transaction Info */}
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-semibold text-gray-700">Amount:</span> ₹
                {orderStatus.amount}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Transaction Amount:
                </span>{" "}
                ₹{orderStatus.transaction_amount}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Mode:</span>{" "}
                {orderStatus.details?.payment_mode}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Bank Ref:</span>{" "}
                {orderStatus.details?.bank_ref}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Status:</span>{" "}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    orderStatus.status === "SUCCESS"
                      ? "bg-green-100 text-green-700"
                      : OrderStatus === "FAILED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {orderStatus.status}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="col-span-2 text-red-500 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
