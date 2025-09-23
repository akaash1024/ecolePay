import { createContext, useMemo, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { pages } = useSelector((state) => state.transactions);

  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [schoolFilter, setSchoolFilter] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  // Get unique values for filters

  const transactionSet = pages[currentPage] || [];
  const uniqueStatuses = [...new Set(transactionSet.map((t) => t.status))];

  // console.log(uniqueSchools);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search") || "";
    const status = urlParams.get("status")?.split(",") || [];
    const schools = urlParams.get("schools")?.split(",") || [];
    const dateFromParam = urlParams.get("dateFrom") || "";
    const dateToParam = urlParams.get("dateTo") || "";
    const page = parseInt(urlParams.get("page")) || 1;

    setSearchTerm(search);
    setStatusFilter(status);
    setSchoolFilter(schools);
    setDateFrom(dateFromParam);
    setDateTo(dateToParam);
    setCurrentPage(page);
  }, []);

  // Update URL when filters change
  const updateURL = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (statusFilter.length) params.set("status", statusFilter.join(","));
    if (schoolFilter.length) params.set("schools", schoolFilter.join(","));
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    if (currentPage) params.set("page", currentPage.toString());

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    updateURL();
  }, [searchTerm, statusFilter, schoolFilter, dateFrom, dateTo, currentPage]);

  // Filtering and sorting logic
  const filteredAndSortedTransactions = useMemo(() => {
    let transactionSet = pages[currentPage] || [];

    let filtered = transactionSet.filter((transaction) => {
      const searchMatch =
        searchTerm == "" ||
        Object.values(transaction).some(
          (value) =>
            value
              .toString()
              .toLowerCase()
              .startsWith(searchTerm.toLowerCase()) ||
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Status filter
      const statusMatch =
        statusFilter.length === 0 || statusFilter.includes(transaction.status);

      return searchMatch && statusMatch;
    });

    // console.log(`le/t me check here what is sorted data`, filtered);

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;

        return 0;
      });
    }

    return filtered;
  }, [
    transactionSet,
    searchTerm,
    statusFilter,
    schoolFilter,
    dateFrom,
    dateTo,
    sortConfig,
    currentPage,
  ]);

  let value = {
    user,
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
    currentPage,
    setCurrentPage,
    itemsPerPage,
    sortConfig,
    setSortConfig,
    uniqueStatuses,
    transactionSet,

    filteredAndSortedTransactions,
  };

  console.log(filteredAndSortedTransactions);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
