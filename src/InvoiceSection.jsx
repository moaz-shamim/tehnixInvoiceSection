import { useEffect, useState } from "react";

import "flowbite";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import PieChartSection from "./components/PieChartSection";
import LineGraphSection from "./components/LineGraphSection";
import { getAllInvoices } from "./API/InvoiceAPI";

export default function InvoiceSection() {
  //************************************* For  Header Section *****************************//
  const [data, setdata] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [isSearchOpen, setIsisSearchOpen] = useState(false);
  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(false);

  const toggleDropdown = (index) => {
    setActiveDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  console.log(data);

  //************************************* For  Table Section *****************************//
  // const data = [
  //   // January
  //   // {
  //   //   invoiceNo: "INV-001",
  //   //   date: "2024-01-05",
  //   //   customerName: "John Doe",
  //     // dueDate: "2024-02-05",
  //   //   place: "New York",
  //   //   amount: 1500.0,
  //   //   deliveredStatus: "Delivered",
  //   //   payment: "Paid",
  //   //   paymentMode: "Cash",
  //   // },
  //   {
  //     invoiceNo: "INV-002",
  //     date: "2024-01-12",
  //     customerName: "Jane Smith",
  //     dueDate: "2024-02-12",
  //     place: "Los Angeles",
  //     amount: 2000.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-003",
  //     date: "2024-01-18",
  //     customerName: "Acme Corp",
  //     dueDate: "2024-02-18",
  //     place: "San Francisco",
  //     amount: 1200.5,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-004",
  //     date: "2024-01-22",
  //     customerName: "Beta LLC",
  //     dueDate: "2024-02-22",
  //     place: "Chicago",
  //     amount: 1750.75,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-005",
  //     date: "2024-01-29",
  //     customerName: "Gamma LLC",
  //     dueDate: "2024-02-29",
  //     place: "Houston",
  //     amount: 2500.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // February
  //   {
  //     invoiceNo: "INV-006",
  //     date: "2024-02-02",
  //     customerName: "Delta Enterprises",
  //     dueDate: "2024-03-02",
  //     place: "San Diego",
  //     amount: 1800.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-007",
  //     date: "2024-02-11",
  //     customerName: "Epsilon Solutions",
  //     dueDate: "2024-03-11",
  //     place: "Seattle",
  //     amount: 2200.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-008",
  //     date: "2024-02-15",
  //     customerName: "Zeta Tech",
  //     dueDate: "2024-03-15",
  //     place: "Boston",
  //     amount: 2700.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-009",
  //     date: "2024-02-20",
  //     customerName: "Eta Industries",
  //     dueDate: "2024-03-20",
  //     place: "Phoenix",
  //     amount: 3500.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "Other",
  //   },
  //   {
  //     invoiceNo: "INV-010",
  //     date: "2024-02-28",
  //     customerName: "Theta Ltd.",
  //     dueDate: "2024-03-28",
  //     place: "Dallas",
  //     amount: 1450.25,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // March
  //   {
  //     invoiceNo: "INV-011",
  //     date: "2024-03-03",
  //     customerName: "Iota Services",
  //     dueDate: "2024-04-03",
  //     place: "Philadelphia",
  //     amount: 990.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-012",
  //     date: "2024-03-10",
  //     customerName: "Kappa Systems",
  //     dueDate: "2024-04-10",
  //     place: "Denver",
  //     amount: 2300.5,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-013",
  //     date: "2024-03-15",
  //     customerName: "Lambda Goods",
  //     dueDate: "2024-04-15",
  //     place: "Miami",
  //     amount: 2750.75,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-014",
  //     date: "2024-03-22",
  //     customerName: "Mu Ventures",
  //     dueDate: "2024-04-22",
  //     place: "Seattle",
  //     amount: 3000.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-015",
  //     date: "2024-03-28",
  //     customerName: "Nu Co.",
  //     dueDate: "2024-04-28",
  //     place: "San Francisco",
  //     amount: 1300.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // April
  //   {
  //     invoiceNo: "INV-016",
  //     date: "2024-04-01",
  //     customerName: "Xi Enterprises",
  //     dueDate: "2024-05-01",
  //     place: "Los Angeles",
  //     amount: 1450.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-017",
  //     date: "2024-04-08",
  //     customerName: "Omicron Solutions",
  //     dueDate: "2024-05-08",
  //     place: "Chicago",
  //     amount: 2900.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-018",
  //     date: "2024-04-15",
  //     customerName: "Pi Holdings",
  //     dueDate: "2024-05-15",
  //     place: "Houston",
  //     amount: 3400.5,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-019",
  //     date: "2024-04-22",
  //     customerName: "Rho Technologies",
  //     dueDate: "2024-05-22",
  //     place: "San Diego",
  //     amount: 4050.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "Other",
  //   },
  //   {
  //     invoiceNo: "INV-020",
  //     date: "2024-04-30",
  //     customerName: "Sigma Ltd.",
  //     dueDate: "2024-05-30",
  //     place: "New York",
  //     amount: 1700.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // May
  //   {
  //     invoiceNo: "INV-021",
  //     date: "2024-05-02",
  //     customerName: "Tau Enterprises",
  //     dueDate: "2024-06-02",
  //     place: "Austin",
  //     amount: 2050.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-022",
  //     date: "2024-05-06",
  //     customerName: "Upsilon Goods",
  //     dueDate: "2024-06-06",
  //     place: "Seattle",
  //     amount: 3100.5,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-023",
  //     date: "2024-05-10",
  //     customerName: "Chi Solutions",
  //     dueDate: "2024-06-10",
  //     place: "Chicago",
  //     amount: 1800.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-024",
  //     date: "2024-05-15",
  //     customerName: "Kappa Holdings",
  //     dueDate: "2024-06-15",
  //     place: "Los Angeles",
  //     amount: 2500.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-025",
  //     date: "2024-05-22",
  //     customerName: "Lambda Ventures",
  //     dueDate: "2024-06-22",
  //     place: "Houston",
  //     amount: 3400.25,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // June
  //   {
  //     invoiceNo: "INV-026",
  //     date: "2024-06-01",
  //     customerName: "Zeta Holdings",
  //     dueDate: "2024-07-01",
  //     place: "Boston",
  //     amount: 2150.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-027",
  //     date: "2024-06-05",
  //     customerName: "Mu Ventures",
  //     dueDate: "2024-07-05",
  //     place: "San Diego",
  //     amount: 2300.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-028",
  //     date: "2024-06-10",
  //     customerName: "Nu Enterprises",
  //     dueDate: "2024-07-10",
  //     place: "Philadelphia",
  //     amount: 2900.75,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-029",
  //     date: "2024-06-15",
  //     customerName: "Xi Technologies",
  //     dueDate: "2024-07-15",
  //     place: "Chicago",
  //     amount: 3700.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "Other",
  //   },
  //   {
  //     invoiceNo: "INV-030",
  //     date: "2024-06-22",
  //     customerName: "Omega Corp",
  //     dueDate: "2024-07-22",
  //     place: "Houston",
  //     amount: 1500.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // July
  //   {
  //     invoiceNo: "INV-031",
  //     date: "2024-07-01",
  //     customerName: "Delta LLC",
  //     dueDate: "2024-08-01",
  //     place: "New York",
  //     amount: 2400.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-032",
  //     date: "2024-07-05",
  //     customerName: "Epsilon Services",
  //     dueDate: "2024-08-05",
  //     place: "Austin",
  //     amount: 2700.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-033",
  //     date: "2024-07-10",
  //     customerName: "Zeta Solutions",
  //     dueDate: "2024-08-10",
  //     place: "Boston",
  //     amount: 3200.5,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-034",
  //     date: "2024-07-15",
  //     customerName: "Theta Enterprises",
  //     dueDate: "2024-08-15",
  //     place: "Chicago",
  //     amount: 4000.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-035",
  //     date: "2024-07-20",
  //     customerName: "Kappa Goods",
  //     dueDate: "2024-08-20",
  //     place: "Denver",
  //     amount: 1500.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // August
  //   {
  //     invoiceNo: "INV-036",
  //     date: "2024-08-01",
  //     customerName: "Lambda Inc.",
  //     dueDate: "2024-09-01",
  //     place: "San Francisco",
  //     amount: 1800.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-037",
  //     date: "2024-08-05",
  //     customerName: "Mu Ventures",
  //     dueDate: "2024-09-05",
  //     place: "Los Angeles",
  //     amount: 2200.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-038",
  //     date: "2024-08-10",
  //     customerName: "Nu Solutions",
  //     dueDate: "2024-09-10",
  //     place: "Seattle",
  //     amount: 2600.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-039",
  //     date: "2024-08-15",
  //     customerName: "Xi Technologies",
  //     dueDate: "2024-09-15",
  //     place: "Chicago",
  //     amount: 3100.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "Other",
  //   },
  //   {
  //     invoiceNo: "INV-040",
  //     date: "2024-08-20",
  //     customerName: "Omicron Goods",
  //     dueDate: "2024-09-20",
  //     place: "Phoenix",
  //     amount: 3500.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // September
  //   {
  //     invoiceNo: "INV-041",
  //     date: "2024-09-01",
  //     customerName: "Pi Enterprises",
  //     dueDate: "2024-10-01",
  //     place: "San Diego",
  //     amount: 4000.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-042",
  //     date: "2024-09-05",
  //     customerName: "Rho Holdings",
  //     dueDate: "2024-10-05",
  //     place: "Austin",
  //     amount: 4500.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-043",
  //     date: "2024-09-10",
  //     customerName: "Sigma Corp.",
  //     dueDate: "2024-10-10",
  //     place: "New York",
  //     amount: 5000.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-044",
  //     date: "2024-09-15",
  //     customerName: "Tau Ltd.",
  //     dueDate: "2024-10-15",
  //     place: "Los Angeles",
  //     amount: 5500.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-045",
  //     date: "2024-09-20",
  //     customerName: "Upsilon Services",
  //     dueDate: "2024-10-20",
  //     place: "San Francisco",
  //     amount: 6000.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // October
  //   {
  //     invoiceNo: "INV-046",
  //     date: "2024-10-01",
  //     customerName: "Chi Inc.",
  //     dueDate: "2024-11-01",
  //     place: "Seattle",
  //     amount: 6700.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-047",
  //     date: "2024-10-05",
  //     customerName: "Kappa Holdings",
  //     dueDate: "2024-11-05",
  //     place: "Austin",
  //     amount: 7200.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-048",
  //     date: "2024-10-10",
  //     customerName: "Lambda Goods",
  //     dueDate: "2024-11-10",
  //     place: "Chicago",
  //     amount: 7800.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-049",
  //     date: "2024-10-15",
  //     customerName: "Omicron Ltd.",
  //     dueDate: "2024-11-15",
  //     place: "Los Angeles",
  //     amount: 8300.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-050",
  //     date: "2024-10-20",
  //     customerName: "Pi Ventures",
  //     dueDate: "2024-11-20",
  //     place: "San Francisco",
  //     amount: 9000.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // November
  //   {
  //     invoiceNo: "INV-051",
  //     date: "2024-11-01",
  //     customerName: "Rho Tech",
  //     dueDate: "2024-12-01",
  //     place: "Denver",
  //     amount: 9600.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-052",
  //     date: "2024-11-05",
  //     customerName: "Sigma Solutions",
  //     dueDate: "2024-12-05",
  //     place: "Austin",
  //     amount: 10200.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-053",
  //     date: "2024-11-10",
  //     customerName: "Tau Enterprises",
  //     dueDate: "2024-12-10",
  //     place: "Chicago",
  //     amount: 11000.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-054",
  //     date: "2024-11-15",
  //     customerName: "Upsilon Goods",
  //     dueDate: "2024-12-15",
  //     place: "Seattle",
  //     amount: 11700.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "Other",
  //   },
  //   {
  //     invoiceNo: "INV-055",
  //     date: "2024-11-20",
  //     customerName: "Chi Services",
  //     dueDate: "2024-12-20",
  //     place: "Phoenix",
  //     amount: 12500.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // December
  //   {
  //     invoiceNo: "INV-056",
  //     date: "2024-12-01",
  //     customerName: "Kappa Tech",
  //     dueDate: "2025-01-01",
  //     place: "Los Angeles",
  //     amount: 13200.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-057",
  //     date: "2024-12-05",
  //     customerName: "Lambda Ventures",
  //     dueDate: "2025-01-05",
  //     place: "San Francisco",
  //     amount: 14000.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-058",
  //     date: "2024-12-10",
  //     customerName: "Mu Industries",
  //     dueDate: "2025-01-10",
  //     place: "Houston",
  //     amount: 14800.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-059",
  //     date: "2024-12-15",
  //     customerName: "Nu Solutions",
  //     dueDate: "2025-01-15",
  //     place: "Dallas",
  //     amount: 15600.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-060",
  //     date: "2024-12-20",
  //     customerName: "Omicron Holdings",
  //     dueDate: "2025-01-20",
  //     place: "San Diego",
  //     amount: 16400.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },

  //   // Additional invoices
  //   {
  //     invoiceNo: "INV-061",
  //     date: "2024-12-25",
  //     customerName: "Pi Enterprises",
  //     dueDate: "2025-01-25",
  //     place: "Boston",
  //     amount: 17200.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  //   {
  //     invoiceNo: "INV-062",
  //     date: "2024-12-30",
  //     customerName: "Rho Tech",
  //     dueDate: "2025-01-30",
  //     place: "Phoenix",
  //     amount: 18000.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "UPI",
  //   },
  //   {
  //     invoiceNo: "INV-063",
  //     date: "2024-12-31",
  //     customerName: "Sigma Goods",
  //     dueDate: "2025-01-31",
  //     place: "Dallas",
  //     amount: 18800.0,
  //     deliveredStatus: "Delivered",
  //     payment: "Paid",
  //     paymentMode: "Bank",
  //   },
  //   {
  //     invoiceNo: "INV-064",
  //     date: "2024-12-15",
  //     customerName: "Upsilon Holdings",
  //     dueDate: "2025-01-15",
  //     place: "Miami",
  //     amount: 19600.0,
  //     deliveredStatus: "Pending",
  //     payment: "Unpaid",
  //     paymentMode: "Other",
  //   },
  //   {
  //     invoiceNo: "INV-065",
  //     date: "2024-12-20",
  //     customerName: "Chi Services",
  //     dueDate: "2025-01-20",
  //     place: "Los Angeles",
  //     amount: 20400.0,
  //     deliveredStatus: "Pending",
  //     payment: "Paid",
  //     paymentMode: "Cash",
  //   },
  // ];

  const fetchData = async () => {
    let invoice = await getAllInvoices();
    setdata(invoice.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden w-full h-[1024] font-Manrope">
      <div className="mx-auto w-[1115px] h-full bg-[#F1F1F1] pr-[10px] pb-[10px]">
        {/* HeaderSection */}
        <div className="flex justify-between relative w-[1114px]  h-[90px] pt-[10px] pr-[16px] pb-[10px] pl-[11px] gap-[15px] leading-[40.98px]  items-center bg-[#F1F1F1]">
          <div className="w-[130px] h-[41px]">
            <h1 className="font-bold text-[30px] leading-[40.98px] text-[#1C1C1C]">
              Invoices
            </h1>
          </div>

          {isSearchOpen ? (
            <div className="w-[570.25px] h-[35px] flex justify-end">
              <div className="w-[300px] h-[35px] p-[10px]  bg-[#FFFFFF] border  border-[#999999] border-opacity-[0.8] rounded-[5px] flex  items-center">
                <input
                  className="h-[17px] font-normal leading-[16.94px] text-[14px] outline-none	w-full "
                  type="text"
                  placeholder="Search"
                />
                <button onClick={() => setIsisSearchOpen((prev) => !prev)}>
                  <IoClose />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-[520px] h-[35px] gap-[10px]"></div>
              <button
                type="button"
                className="border w-[35px] h-[35px] rounded-[5px] border-[#999999] border-opacity-[0.3]  text-[14px] bg-[#FFFFFF]"
                onClick={() => setIsisSearchOpen((prev) => !prev)}
              >
                <div className="flex justify-center items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.76 10.525L17.49 16.255L16 17.745L10.27 12.015C9.2 12.785 7.91 13.255 6.5 13.255C2.91 13.255 0 10.345 0 6.75501C0 3.16501 2.91 0.255005 6.5 0.255005C10.09 0.255005 13 3.16501 13 6.75501C13 8.16501 12.53 9.45501 11.76 10.525ZM6.5 2.25501C4.01 2.25501 2 4.26501 2 6.75501C2 9.24501 4.01 11.255 6.5 11.255C8.99 11.255 11 9.24501 11 6.75501C11 4.26501 8.99 2.25501 6.5 2.25501Z"
                      fill="#49454F"
                    />
                  </svg>
                </div>
              </button>
            </>
          )}

          <button
            type="button"
            className="border p-[10px] gap-[5px] w-[90px] h-[35px] rounded-[5px] border-[#999999] border-opacity-[0.3] flex items-center bg-[#FFFFFF]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5L10 15M15 2.5L15 17.5M5 7.5L5 12.5"
                stroke="black"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="w-[38px] h-[15px] text-[12px] leading-[14.52px] font-normal no-underline">
              Columns
            </span>
          </button>

          <button
            type="button"
            className="border p-[10px] gap-[5px] w-[84px] h-[35px] rounded-[5px] border-[#999999] border-opacity-[0.3] flex items-center bg-[#FFFFFF]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.1986 2.64055H14.8928C14.7159 1.9611 14.3239 1.36034 13.7777 0.931769C13.2316 0.503193 12.5619 0.270828 11.873 0.270828C11.184 0.270828 10.5143 0.503193 9.96819 0.931769C9.42205 1.36034 9.03004 1.9611 8.85316 2.64055H0.801433C0.58888 2.64055 0.385032 2.72671 0.234734 2.88007C0.0844359 3.03344 0 3.24144 0 3.45833C0 3.67522 0.0844359 3.88322 0.234734 4.03658C0.385032 4.18994 0.58888 4.2761 0.801433 4.2761H8.85316C9.03004 4.95556 9.42205 5.55631 9.96819 5.98489C10.5143 6.41346 11.184 6.64583 11.873 6.64583C12.5619 6.64583 13.2316 6.41346 13.7777 5.98489C14.3239 5.55631 14.7159 4.95556 14.8928 4.2761H16.1986C16.4111 4.2761 16.615 4.18994 16.7653 4.03658C16.9156 3.88322 17 3.67522 17 3.45833C17 3.24144 16.9156 3.03344 16.7653 2.88007C16.615 2.72671 16.4111 2.64055 16.1986 2.64055ZM11.873 5.01101C11.572 5.01101 11.2778 4.91994 11.0276 4.74933C10.7773 4.57872 10.5823 4.33623 10.4671 4.05251C10.352 3.7688 10.3218 3.45661 10.3805 3.15542C10.4393 2.85422 10.5842 2.57756 10.797 2.36042C11.0098 2.14327 11.2809 1.99539 11.5761 1.93548C11.8713 1.87557 12.1772 1.90632 12.4553 2.02384C12.7333 2.14136 12.971 2.34037 13.1382 2.59571C13.3054 2.85104 13.3946 3.15124 13.3946 3.45833C13.3941 3.86995 13.2336 4.26454 12.9483 4.5556C12.6631 4.84666 12.2764 5.01043 11.873 5.01101Z"
                fill="black"
              />
              <path
                d="M16.1986 9.65408H8.13187C7.94351 8.99086 7.54914 8.408 7.00809 7.99321C6.46704 7.57843 5.80859 7.35416 5.13184 7.35416C4.45509 7.35416 3.79665 7.57843 3.2556 7.99321C2.71455 8.408 2.32017 8.99086 2.13181 9.65408H0.801433C0.58888 9.65408 0.385032 9.74024 0.234734 9.89359C0.0844359 10.0469 0 10.2549 0 10.4718C0 10.6887 0.0844359 10.8967 0.234734 11.05C0.385032 11.2034 0.58888 11.2895 0.801433 11.2895H2.09548C2.25986 11.9848 2.64871 12.6035 3.19946 13.046C3.7502 13.4885 4.43083 13.7292 5.13184 13.7292C5.83285 13.7292 6.51348 13.4885 7.06423 13.046C7.61498 12.6035 8.00383 11.9848 8.16821 11.2895H16.1986C16.4111 11.2895 16.615 11.2034 16.7653 11.05C16.9156 10.8967 17 10.6887 17 10.4718C17 10.2549 16.9156 10.0469 16.7653 9.89359C16.615 9.74024 16.4111 9.65408 16.1986 9.65408ZM5.13131 12.0953C4.83035 12.0953 4.53616 12.0042 4.28592 11.8336C4.03569 11.663 3.84065 11.4205 3.72548 11.1368C3.61031 10.8531 3.58018 10.541 3.63889 10.2398C3.69761 9.93861 3.84253 9.66196 4.05534 9.44483C4.26814 9.2277 4.53928 9.07983 4.83445 9.01992C5.12962 8.96002 5.43557 8.99076 5.71362 9.10827C5.99167 9.22579 6.22932 9.42478 6.39652 9.68011C6.56372 9.93543 6.65296 10.2356 6.65296 10.5427C6.65268 10.9544 6.49227 11.3491 6.20697 11.6402C5.92166 11.9313 5.53479 12.095 5.13131 12.0953Z"
                fill="black"
              />
            </svg>

            <span className="w-[38px] h-[15px] text-[12px] leading-[14.52px] font-normal no-underline ">
              Filter
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="border p-[10px] gap-[10px] w-[35px] h-[35px] rounded-[5px] border-[#999999] border-opacity-[0.3]  text-[14px] bg-[#FFFFFF]"
          >
            <div className="flex justify-center">
              <svg
                width="4"
                height="14"
                viewBox="0 0 4 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=""
              >
                <path
                  d="M2.25 9.59375C3.07031 9.59375 3.78125 10.3047 3.78125 11.125C3.78125 11.9727 3.07031 12.6562 2.25 12.6562C1.40234 12.6562 0.71875 11.9727 0.71875 11.125C0.71875 10.3047 1.40234 9.59375 2.25 9.59375ZM2.25 5.21875C3.07031 5.21875 3.78125 5.92969 3.78125 6.75C3.78125 7.59766 3.07031 8.28125 2.25 8.28125C1.40234 8.28125 0.71875 7.59766 0.71875 6.75C0.71875 5.92969 1.40234 5.21875 2.25 5.21875ZM2.25 3.90625C1.40234 3.90625 0.71875 3.22266 0.71875 2.375C0.71875 1.55469 1.40234 0.84375 2.25 0.84375C3.07031 0.84375 3.78125 1.55469 3.78125 2.375C3.78125 3.22266 3.07031 3.90625 2.25 3.90625Z"
                  fill="black"
                />
              </svg>
            </div>
          </button>
          {isDropdownOpen && (
            <>
              <div
                id="actionsDropdown"
                className="absolute z-50 w-[150px] bg-white rounded-[5px] border border-[#999999] border-opacity-[0.3] shadow"
                style={{ top: "65px", right: "133px" }}
              >
                <ul className="text-sm text-gray-700">
                  <li>
                    <button
                      href="#"
                      className=" py-2 px-4 hover:bg-gray-100 w-full  text-center text-[14px] border-b hover:rounded-t-[5px]"
                      onClick={() => {
                        setShowSummary((prev) => !prev);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {showSummary ? `Hide Summary` : `Show Summary`}
                    </button>
                  </li>
                  <li>
                    <button
                      href="#"
                      className=" py-2 px-4 hover:bg-gray-100   w-full   text-center text-[14px]  flex justify-center items-center gap-1 border-b"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.99999 9.33334C2.36818 9.33334 2.66666 9.63182 2.66666 10V12.6667C2.66666 12.8435 2.7369 13.0131 2.86192 13.1381C2.98695 13.2631 3.15652 13.3333 3.33333 13.3333H12.6667C12.8435 13.3333 13.013 13.2631 13.1381 13.1381C13.2631 13.0131 13.3333 12.8435 13.3333 12.6667V10C13.3333 9.63182 13.6318 9.33334 14 9.33334C14.3682 9.33334 14.6667 9.63182 14.6667 10V12.6667C14.6667 13.1971 14.4559 13.7058 14.0809 14.0809C13.7058 14.456 13.1971 14.6667 12.6667 14.6667H3.33333C2.8029 14.6667 2.29419 14.456 1.91911 14.0809C1.54404 13.7058 1.33333 13.1971 1.33333 12.6667V10C1.33333 9.63182 1.63181 9.33334 1.99999 9.33334Z"
                          fill="black"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.19526 6.19526C4.45561 5.93491 4.87772 5.93491 5.13807 6.19526L8 9.05719L10.8619 6.19526C11.1223 5.93491 11.5444 5.93491 11.8047 6.19526C12.0651 6.45561 12.0651 6.87772 11.8047 7.13807L8.4714 10.4714C8.21106 10.7318 7.78894 10.7318 7.5286 10.4714L4.19526 7.13807C3.93491 6.87772 3.93491 6.45561 4.19526 6.19526Z"
                          fill="black"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99999 1.33334C8.36818 1.33334 8.66666 1.63182 8.66666 2.00001V10C8.66666 10.3682 8.36818 10.6667 7.99999 10.6667C7.63181 10.6667 7.33333 10.3682 7.33333 10V2.00001C7.33333 1.63182 7.63181 1.33334 7.99999 1.33334Z"
                          fill="black"
                        />
                      </svg>
                      <span>Import</span>
                    </button>
                  </li>
                  <li>
                    <button
                      href="#"
                      className=" py-2 px-4 hover:bg-gray-100 hover:rounded-b-[5px]  w-full   text-center text-[14px]  flex justify-center items-center gap-1 "
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.00001 9.33334C2.3682 9.33334 2.66668 9.63182 2.66668 10V12.6667C2.66668 12.8435 2.73691 13.0131 2.86194 13.1381C2.98696 13.2631 3.15653 13.3333 3.33334 13.3333H12.6667C12.8435 13.3333 13.0131 13.2631 13.1381 13.1381C13.2631 13.0131 13.3333 12.8435 13.3333 12.6667V10C13.3333 9.63182 13.6318 9.33334 14 9.33334C14.3682 9.33334 14.6667 9.63182 14.6667 10V12.6667C14.6667 13.1971 14.456 13.7058 14.0809 14.0809C13.7058 14.456 13.1971 14.6667 12.6667 14.6667H3.33334C2.80291 14.6667 2.2942 14.456 1.91913 14.0809C1.54406 13.7058 1.33334 13.1971 1.33334 12.6667V10C1.33334 9.63182 1.63182 9.33334 2.00001 9.33334Z"
                          fill="black"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.5286 1.52861C7.78894 1.26826 8.21106 1.26826 8.4714 1.52861L11.8047 4.86194C12.0651 5.12229 12.0651 5.5444 11.8047 5.80475C11.5444 6.0651 11.1223 6.0651 10.8619 5.80475L8 2.94282L5.13807 5.80475C4.87772 6.0651 4.45561 6.0651 4.19526 5.80475C3.93491 5.5444 3.93491 5.12229 4.19526 4.86194L7.5286 1.52861Z"
                          fill="black"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.00001 1.33334C8.3682 1.33334 8.66668 1.63182 8.66668 2.00001V10C8.66668 10.3682 8.3682 10.6667 8.00001 10.6667C7.63182 10.6667 7.33334 10.3682 7.33334 10V2.00001C7.33334 1.63182 7.63182 1.33334 8.00001 1.33334Z"
                          fill="black"
                        />
                      </svg>
                      <span>Export</span>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}

          <button
            type="button"
            className="w-[102px] h-[35px] p-[10px] gap-[10px]  border border-opacity-[0.8] bg-[#006AFF] rounded-[5px] border-[#999999]"
            onClick={() => navigate("createInvoice")}
          >
            <div className="text-[12px] leading-[14.52px]  font-normal no-underline text-[#FFFFFF]">
              Create Invoice
            </div>
          </button>
        </div>

        <div className="pl-[10px]">
          {showSummary && (
            //************************************* For  SummarySection Section *****************************//
            <div className="flex w-[1087px] h-[218px] rounded-[5px] gap-[10px] mb-[12px]">
              <PieChartSection />
              <LineGraphSection />
            </div>
          )}

          {/* TableSection  */}
          <div className="flex flex-col border  border-[#999999] border-opacity-[0.3]  w-[1087px] h-full rounded-tr-[5px] rounded-tl-[5px]">
            {/* <div className="flex flex-col border  border-[#999999] border-opacity-[0.3]  w-[1087px] h-[456.5px] rounded-tr-[5px] rounded-tl-[5px]"> */}
            <table>
              <thead>
                <tr className="flex = items-center w-[1086px] h-[40px] border-b-2 border-opacity-[0.3] border-[#999999] gap-[0px]  py-[10px] pr-[10px] pl-[15px] rounded-tr-[5px] rounded-tl-[5px] bg-[#F8FAFC]">
                  <th className="w-[104px] h-[30px] py-[3px] pr-[4px] ">
                    <span className="w-[80px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                      Invoice No
                    </span>
                  </th>

                  <th className="w-[119px] h-[30px] py-[3px]  ">
                    <span className="w-[32px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C] ">
                      Invoice Date
                    </span>
                  </th>

                  <th className="w-[138px] h-[30px] py-[3px]  ">
                    <span className="w-[110px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                      Customer Name
                    </span>
                  </th>

                  <th className="w-[109px] h-[30px] py-[3px] px-[4px] ">
                    <span className="w-[71px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                      Place{"\u00A0".repeat(17)}
                    </span>
                  </th>

                  <th className="w-[109px] h-[30px] py-[3px] px-[4px] ">
                    <span className="w-[71px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                      Amount{"\u00A0".repeat(10)}
                    </span>
                  </th>

                  <th className="w-[125px] h-[30px] py-[3px]  ">
                    <span className="w-[90px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                      Payment Status
                    </span>
                  </th>

                  <th className="w-[127px] h-[30px] py-[3px] px-[4px] ">
                    <span className="w-[62px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                      Due Date{"\u00A0".repeat(13)}
                    </span>
                  </th>

                  <th className="w-[147px] h-[30px] py-[3px] px-[4px] ">
                    <span className="w-[113px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                      Delivered Status
                    </span>
                  </th>

                  <th className="w-[94px] h-[30px] py-[3px] px-[4px] ">
                    <span className="w-[71px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                      Action
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.map((invoice, index) => (
                  <tr
                    className="flex  items-center w-[1086px] h-[30px] border-b border-opacity-[0.3] border-[#999999] bg-[#FFFFFF] py-[10px] pr-[10px] pl-[15px] cursor-pointer hover:bg-gray-100"
                    onClick={() => navigate(`createInvoice/${invoice.billId}`)}
                  >
                    <td className="w-[104px] h-[30px] py-[3px] gap-[10px] px-[18px] ">
                      <span className="w-[38px] h-[16px] text-[12px] font-medium leading-[16.39px] text-[#1C1C1C] ">
                        {invoice.invoiceNo}
                      </span>
                    </td>
                    <td className="w-[119px] h-[30px] py-[3px] gap-[10px] ">
                      <span className="w-[38px] h-[16px] text-[12px] font-medium leading-[16.39px] text-[#1C1C1C]  px-[18px]">
                        {invoice.billingDate}
                      </span>
                    </td>
                    <td className="w-[138px] h-[30px] py-[3px] gap-[10px] px-[18px] ">
                      <span className="w-[38px] h-[16px] text-[12px] font-medium leading-[16.39px] text-[#1C1C1C]">
                        {invoice.customerName}
                      </span>
                    </td>

                    <td className="w-[109px] h-[30px] py-[3px] gap-[10px] px-[8px] ">
                      <span className="w-[98px] h-[16px] text-[12px] font-medium leading-[16.39px] text-[#1C1C1C]">
                        {invoice.customerAddress?.slice(0, 10)}
                      </span>
                    </td>

                    <td className="w-[109px] h-[30px] py-[3px] gap-[10px] px-[18px] text-right">
                      <span className="w-[38px] h-[16px] text-[12px] font-medium leading-[16.39px] text-[#1C1C1C]">
                        {invoice.grandTotal.toFixed(2)}
                      </span>
                    </td>

                    <td className="w-[125px] h-[30px] py-[3px] gap-[10px] px-[18px] ">
                      <span
                        className={`w-[38px] h-[16px] text-[12px] font-medium leading-[16.39px] 
                          ${
                            invoice.status === "Active"
                              ? "text-[#FF0000]"
                              : "text-[#00783E]"
                          }
                      `}
                      >
                        {invoice.status === "Active" ? "Unpaid" : "Paid"}
                      </span>
                    </td>

                    <td className="w-[127px] h-[30px] py-[3px] gap-[10px] px-[18px] ">
                      <span className="w-[38px] h-[16px] text-[12px] font-medium leading-[16.39px] text-[#1C1C1C]">
                        {invoice.dueDate}
                      </span>
                    </td>

                    <td className="w-[150px] h-[30px] py-[3px] gap-[10px] pl-[38px] ">
                      <span className="w-[38px] h-[16px] text-[12px] font-medium leading-[16.39px] text-[#1C1C1C]">
                        {/* {invoice.deliveredStatus} */}
                        Pending
                      </span>
                    </td>

                    <td className="w-[94px] h-[35px] py-[3px] gap-[10px] px-[18px] ">
                      <span className="flex justify-center relative">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-800 hover:text-gray-400 rounded-lg focus:outline-none "
                          type="button"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <div
                          className={`${
                            activeDropdownIndex === index ? "block" : "hidden"
                          } z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow absolute top-[23px] right-[10px]`}
                        >
                          <ul className="text-sm text-gray-700">
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100"
                              >
                                Edit
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100"
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* PaginationSection */}
          <div className="w-[1085px] h-[41px]   mt-[15px] flex items-center gap-[10px] pt-[0] pr-[20px] pb-[0] pl-[12px]">
            <div className="flex  items-center w-[51px] h-[25px] gap-[10px] px-[10px] bg-[#999999] bg-opacity-[.16] rounded-[5px]">
              <div className="w-[13px] h-[16px] text-[12px] font-medium leading-[16.39px] ">
                10
              </div>
              <button className="w-[8px] h-[18px] flex justify-center items-center">
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.28906 1.875L5.19531 5.0625C5.07812 5.20312 4.91406 5.25 4.75 5.25C4.5625 5.25 4.39844 5.20312 4.28125 5.0625L1.1875 1.875C0.765625 1.45312 1.07031 0.75 1.63281 0.75H7.84375C8.40625 0.75 8.71094 1.45312 8.28906 1.875Z"
                    fill="#3E3E3E"
                  />
                </svg>
              </button>
            </div>
            <span className="w-[94px] h-[16px] text-[12px] font-medium text-[#3E3E3E] leading-[16.39px]">
              Items per page
            </span>
            <div className="w-[350px] h-[30px] "></div>
            <span className="w-[105px] h-[16px] text-[12px] font-medium text-[#3E3E3E] leading-[16.39px]">
              1-10 of 626 items
            </span>
            <div className="w-[297px] h-[30px] "></div>
            <span className="w-[95px] h-[16px] text-[12px] font-medium text-[#3E3E3E] leading-[16.39px]">
              1 of 21 pages
            </span>
            <button className="w-[25px] h-[25px]  flex justify-center items-center">
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.75 11.25C5.53906 11.25 5.35156 11.1797 5.21094 11.0391L0.710938 6.53906C0.40625 6.25781 0.40625 5.76562 0.710938 5.48438L5.21094 0.984375C5.49219 0.679688 5.98438 0.679688 6.26562 0.984375C6.57031 1.26562 6.57031 1.75781 6.26562 2.03906L2.30469 6L6.26562 9.98438C6.57031 10.2656 6.57031 10.7578 6.26562 11.0391C6.125 11.1797 5.9375 11.25 5.75 11.25Z"
                  fill="#3E3E3E"
                />
              </svg>
            </button>
            <div className="flex  items-center w-[25px] h-[25px] gap-[10px] px-[10px] bg-[#999999] bg-opacity-[.16] rounded-[5px]">
              <div className="w-[13px] h-[16px] text-[12px] font-medium leading-[16.39px] ">
                1
              </div>
            </div>
            <button className="w-[25px] h-[25px]  flex justify-center items-center">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.75 11.25C1.53906 11.25 1.35156 11.1797 1.21094 11.0391C0.90625 10.7578 0.90625 10.2656 1.21094 9.98438L5.17188 6L1.21094 2.03906C0.90625 1.75781 0.90625 1.26562 1.21094 0.984375C1.49219 0.679688 1.98438 0.679688 2.26562 0.984375L6.76562 5.48438C7.07031 5.76562 7.07031 6.25781 6.76562 6.53906L2.26562 11.0391C2.125 11.1797 1.9375 11.25 1.75 11.25Z"
                  fill="#3E3E3E"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
