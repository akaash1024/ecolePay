import { useAuth } from "../../context/AuthProvider";

export const FilterSorting = () => {
  const {
    transactionSet,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    schoolFilter,
    setSchoolFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    setCurrentPage,
    uniqueStatuses,
    uniqueSchools,
    paginatedTransactions,
    filteredAndSortedTransactions,
  } = useAuth();

  const toggleStatusFilter = (status) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setCurrentPage(1);
  };

  return (
    <>
      <div className="bg-white border-2 border-green-300 rounded-lg p-6 mb-6">
        {/* Search and Date Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  ">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Transactions
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by ID, gateway, amount..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <div className="flex flex-wrap gap-2">
              {uniqueStatuses.map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() => toggleStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors 
                    ${
                      statusFilter.includes(status)
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-green-500"
                    }`}
                >
                  {status} (
                  {transactionSet.filter((t) => t.status === status).length})
                </button>
              ))}
            </div>
          </div>
          <div className=" flex flex-col justify-center items-start ">
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter([]);
                setSchoolFilter([]);
                setDateFrom("");
                setDateTo("");
                setCurrentPage(1);
              }}
              className="w- px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        
      </div>
    </>
  );
};
