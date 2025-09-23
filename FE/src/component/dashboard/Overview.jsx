import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Pagination } from "./Pagination";
import { FilterSorting } from "./FilterSorting";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Overview = () => {
  const {
    sortConfig,
    setSortConfig,
    currentPage,
    filteredAndSortedTransactions,
  } = useAuth();
  
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

  const { pages } = useSelector((state) => state.transactions);
  const transactions = pages[currentPage];

  const dispatch = useDispatch();

  console.log(transactions);

  useEffect(() => {
    if (!transactions) {
      console.log("Fetching from API...");
      dispatch(fetchTransactions(currentPage));
    } else {
      console.log("Already cached, skipping API call.");
    }
  }, [dispatch, currentPage, transactions]);

  const handleSort = (key) => {
    console.log(key);

    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "dec";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <main className="min-h-screen bg-white overflow-auto">
        {/* hero section */}
        <div className="relative overflow-hidden">
          {/* main content */}
          <div className="px-6 py-6 lg:py-6 ">
            <div className="max-w-7xl mx-auto">
              {/*   Filters Section */}
              <FilterSorting />

              {/* Enhanced Dashboard Data Section */}

              <div className="bg-white border-2 border-green-300 rounded-lg overflow-hidden">
                <div className="h-[365px] ">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        {[
                          { key: "collect_id", label: "Collect ID" },
                          { key: "school_id", label: "School ID" },
                          { key: "gateway", label: "Gateway" },
                          { key: "order_amount", label: "₹ Order " },
                          {
                            key: "transaction_amount",
                            label: "₹ Transaction ",
                          },
                          { key: "status", label: "Status" },
                          {
                            key: "custom_order_id",
                            label: "Order ID",
                          },
                        ].map((column) => (
                          <th
                            key={column.key}
                            onClick={() => handleSort(column.key)}
                            className="text-left p-1 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors select-none"
                          >
                            <div className="flex items-center justify-between">
                              {column.label}
                              <span className="text-xs ml-1">
                                {sortConfig.key === column.key
                                  ? sortConfig.direction === "asc"
                                    ? "↑"
                                    : "↓"
                                  : "↕"}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {status === "loading" ? (
                        <tr>
                          <td colSpan="8" className="text-center p-8">
                            Loading page {currentPage}...
                          </td>
                        </tr>
                      ) : filteredAndSortedTransactions.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center p-8">
                            No transactions found
                          </td>
                        </tr>
                      ) : (
                        filteredAndSortedTransactions.map(
                          (transaction, index) => (
                            <tr
                              key={transaction.collect_id}
                              className={`border-b border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200 ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }`}
                            >
                              <td className="p-1 font-mono text-sm text-blue-600">
                                {transaction.collect_id}
                              </td>
                              <td className="p-1 font-mono text-sm text-purple-600">
                                {transaction.school_id}
                              </td>
                              <td className="p-1">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                  {transaction.gateway}
                                </span>
                              </td>
                              <td className="p-1 font-semibold text-gray-900">
                                ₹{transaction.order_amount.toLocaleString()}
                              </td>
                              <td className="p-1 font-semibold text-green-600">
                                ₹
                                {transaction.transaction_amount.toLocaleString()}
                              </td>
                              <td className="p-1">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    {
                                      success: "bg-green-100 text-green-800",
                                      pending: "bg-yellow-100 text-yellow-800",
                                      failed: "bg-red-100 text-red-800",
                                    }[transaction.status] ||
                                    "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {transaction.status.toUpperCase()}
                                </span>
                              </td>
                              <td className="p-1 font-mono text-sm text-gray-600">
                                {transaction.custom_order_id}
                              </td>
                            </tr>
                          )
                        )
                      )}
                    </tbody>
                  </table>

                  {/* Enhanced Pagination */}
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
