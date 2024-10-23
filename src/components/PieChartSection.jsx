import React from "react";
import { FaArrowUp } from "react-icons/fa";

const PieChartSection = () => {
  const data = [
    // January
    {
      invoiceNo: "INV-001",
      date: "2024-01-05",
      customerName: "John Doe",
      dueDate: "2024-02-05",
      place: "New York",
      amount: 1500.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-002",
      date: "2024-01-12",
      customerName: "Jane Smith",
      dueDate: "2024-02-12",
      place: "Los Angeles",
      amount: 2000.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-003",
      date: "2024-01-18",
      customerName: "Acme Corp",
      dueDate: "2024-02-18",
      place: "San Francisco",
      amount: 1200.5,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-004",
      date: "2024-01-22",
      customerName: "Beta LLC",
      dueDate: "2024-02-22",
      place: "Chicago",
      amount: 1750.75,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-005",
      date: "2024-01-29",
      customerName: "Gamma LLC",
      dueDate: "2024-02-29",
      place: "Houston",
      amount: 2500.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // February
    {
      invoiceNo: "INV-006",
      date: "2024-02-02",
      customerName: "Delta Enterprises",
      dueDate: "2024-03-02",
      place: "San Diego",
      amount: 1800.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-007",
      date: "2024-02-11",
      customerName: "Epsilon Solutions",
      dueDate: "2024-03-11",
      place: "Seattle",
      amount: 2200.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-008",
      date: "2024-02-15",
      customerName: "Zeta Tech",
      dueDate: "2024-03-15",
      place: "Boston",
      amount: 2700.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-009",
      date: "2024-02-20",
      customerName: "Eta Industries",
      dueDate: "2024-03-20",
      place: "Phoenix",
      amount: 3500.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "Other",
    },
    {
      invoiceNo: "INV-010",
      date: "2024-02-28",
      customerName: "Theta Ltd.",
      dueDate: "2024-03-28",
      place: "Dallas",
      amount: 1450.25,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // March
    {
      invoiceNo: "INV-011",
      date: "2024-03-03",
      customerName: "Iota Services",
      dueDate: "2024-04-03",
      place: "Philadelphia",
      amount: 990.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-012",
      date: "2024-03-10",
      customerName: "Kappa Systems",
      dueDate: "2024-04-10",
      place: "Denver",
      amount: 2300.5,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-013",
      date: "2024-03-15",
      customerName: "Lambda Goods",
      dueDate: "2024-04-15",
      place: "Miami",
      amount: 2750.75,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-014",
      date: "2024-03-22",
      customerName: "Mu Ventures",
      dueDate: "2024-04-22",
      place: "Seattle",
      amount: 3000.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-015",
      date: "2024-03-28",
      customerName: "Nu Co.",
      dueDate: "2024-04-28",
      place: "San Francisco",
      amount: 1300.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // April
    {
      invoiceNo: "INV-016",
      date: "2024-04-01",
      customerName: "Xi Enterprises",
      dueDate: "2024-05-01",
      place: "Los Angeles",
      amount: 1450.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-017",
      date: "2024-04-08",
      customerName: "Omicron Solutions",
      dueDate: "2024-05-08",
      place: "Chicago",
      amount: 2900.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-018",
      date: "2024-04-15",
      customerName: "Pi Holdings",
      dueDate: "2024-05-15",
      place: "Houston",
      amount: 3400.5,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-019",
      date: "2024-04-22",
      customerName: "Rho Technologies",
      dueDate: "2024-05-22",
      place: "San Diego",
      amount: 4050.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "Other",
    },
    {
      invoiceNo: "INV-020",
      date: "2024-04-30",
      customerName: "Sigma Ltd.",
      dueDate: "2024-05-30",
      place: "New York",
      amount: 1700.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // May
    {
      invoiceNo: "INV-021",
      date: "2024-05-02",
      customerName: "Tau Enterprises",
      dueDate: "2024-06-02",
      place: "Austin",
      amount: 2050.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-022",
      date: "2024-05-06",
      customerName: "Upsilon Goods",
      dueDate: "2024-06-06",
      place: "Seattle",
      amount: 3100.5,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-023",
      date: "2024-05-10",
      customerName: "Chi Solutions",
      dueDate: "2024-06-10",
      place: "Chicago",
      amount: 1800.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-024",
      date: "2024-05-15",
      customerName: "Kappa Holdings",
      dueDate: "2024-06-15",
      place: "Los Angeles",
      amount: 2500.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-025",
      date: "2024-05-22",
      customerName: "Lambda Ventures",
      dueDate: "2024-06-22",
      place: "Houston",
      amount: 3400.25,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // June
    {
      invoiceNo: "INV-026",
      date: "2024-06-01",
      customerName: "Zeta Holdings",
      dueDate: "2024-07-01",
      place: "Boston",
      amount: 2150.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-027",
      date: "2024-06-05",
      customerName: "Mu Ventures",
      dueDate: "2024-07-05",
      place: "San Diego",
      amount: 2300.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-028",
      date: "2024-06-10",
      customerName: "Nu Enterprises",
      dueDate: "2024-07-10",
      place: "Philadelphia",
      amount: 2900.75,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-029",
      date: "2024-06-15",
      customerName: "Xi Technologies",
      dueDate: "2024-07-15",
      place: "Chicago",
      amount: 3700.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "Other",
    },
    {
      invoiceNo: "INV-030",
      date: "2024-06-22",
      customerName: "Omega Corp",
      dueDate: "2024-07-22",
      place: "Houston",
      amount: 1500.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // July
    {
      invoiceNo: "INV-031",
      date: "2024-07-01",
      customerName: "Delta LLC",
      dueDate: "2024-08-01",
      place: "New York",
      amount: 2400.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-032",
      date: "2024-07-05",
      customerName: "Epsilon Services",
      dueDate: "2024-08-05",
      place: "Austin",
      amount: 2700.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-033",
      date: "2024-07-10",
      customerName: "Zeta Solutions",
      dueDate: "2024-08-10",
      place: "Boston",
      amount: 3200.5,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-034",
      date: "2024-07-15",
      customerName: "Theta Enterprises",
      dueDate: "2024-08-15",
      place: "Chicago",
      amount: 4000.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-035",
      date: "2024-07-20",
      customerName: "Kappa Goods",
      dueDate: "2024-08-20",
      place: "Denver",
      amount: 1500.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // August
    {
      invoiceNo: "INV-036",
      date: "2024-08-01",
      customerName: "Lambda Inc.",
      dueDate: "2024-09-01",
      place: "San Francisco",
      amount: 1800.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-037",
      date: "2024-08-05",
      customerName: "Mu Ventures",
      dueDate: "2024-09-05",
      place: "Los Angeles",
      amount: 2200.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-038",
      date: "2024-08-10",
      customerName: "Nu Solutions",
      dueDate: "2024-09-10",
      place: "Seattle",
      amount: 2600.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-039",
      date: "2024-08-15",
      customerName: "Xi Technologies",
      dueDate: "2024-09-15",
      place: "Chicago",
      amount: 3100.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "Other",
    },
    {
      invoiceNo: "INV-040",
      date: "2024-08-20",
      customerName: "Omicron Goods",
      dueDate: "2024-09-20",
      place: "Phoenix",
      amount: 3500.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // September
    {
      invoiceNo: "INV-041",
      date: "2024-09-01",
      customerName: "Pi Enterprises",
      dueDate: "2024-10-01",
      place: "San Diego",
      amount: 4000.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-042",
      date: "2024-09-05",
      customerName: "Rho Holdings",
      dueDate: "2024-10-05",
      place: "Austin",
      amount: 4500.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-043",
      date: "2024-09-10",
      customerName: "Sigma Corp.",
      dueDate: "2024-10-10",
      place: "New York",
      amount: 5000.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-044",
      date: "2024-09-15",
      customerName: "Tau Ltd.",
      dueDate: "2024-10-15",
      place: "Los Angeles",
      amount: 5500.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-045",
      date: "2024-09-20",
      customerName: "Upsilon Services",
      dueDate: "2024-10-20",
      place: "San Francisco",
      amount: 6000.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // October
    {
      invoiceNo: "INV-046",
      date: "2024-10-01",
      customerName: "Chi Inc.",
      dueDate: "2024-11-01",
      place: "Seattle",
      amount: 6700.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-047",
      date: "2024-10-05",
      customerName: "Kappa Holdings",
      dueDate: "2024-11-05",
      place: "Austin",
      amount: 7200.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-048",
      date: "2024-10-10",
      customerName: "Lambda Goods",
      dueDate: "2024-11-10",
      place: "Chicago",
      amount: 7800.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-049",
      date: "2024-10-15",
      customerName: "Omicron Ltd.",
      dueDate: "2024-11-15",
      place: "Los Angeles",
      amount: 8300.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-050",
      date: "2024-10-20",
      customerName: "Pi Ventures",
      dueDate: "2024-11-20",
      place: "San Francisco",
      amount: 9000.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // November
    {
      invoiceNo: "INV-051",
      date: "2024-11-01",
      customerName: "Rho Tech",
      dueDate: "2024-12-01",
      place: "Denver",
      amount: 9600.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-052",
      date: "2024-11-05",
      customerName: "Sigma Solutions",
      dueDate: "2024-12-05",
      place: "Austin",
      amount: 10200.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-053",
      date: "2024-11-10",
      customerName: "Tau Enterprises",
      dueDate: "2024-12-10",
      place: "Chicago",
      amount: 11000.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-054",
      date: "2024-11-15",
      customerName: "Upsilon Goods",
      dueDate: "2024-12-15",
      place: "Seattle",
      amount: 11700.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "Other",
    },
    {
      invoiceNo: "INV-055",
      date: "2024-11-20",
      customerName: "Chi Services",
      dueDate: "2024-12-20",
      place: "Phoenix",
      amount: 12500.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // December
    {
      invoiceNo: "INV-056",
      date: "2024-12-01",
      customerName: "Kappa Tech",
      dueDate: "2025-01-01",
      place: "Los Angeles",
      amount: 13200.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-057",
      date: "2024-12-05",
      customerName: "Lambda Ventures",
      dueDate: "2025-01-05",
      place: "San Francisco",
      amount: 14000.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-058",
      date: "2024-12-10",
      customerName: "Mu Industries",
      dueDate: "2025-01-10",
      place: "Houston",
      amount: 14800.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-059",
      date: "2024-12-15",
      customerName: "Nu Solutions",
      dueDate: "2025-01-15",
      place: "Dallas",
      amount: 15600.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-060",
      date: "2024-12-20",
      customerName: "Omicron Holdings",
      dueDate: "2025-01-20",
      place: "San Diego",
      amount: 16400.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },

    // Additional invoices
    {
      invoiceNo: "INV-061",
      date: "2024-12-25",
      customerName: "Pi Enterprises",
      dueDate: "2025-01-25",
      place: "Boston",
      amount: 17200.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
    {
      invoiceNo: "INV-062",
      date: "2024-12-30",
      customerName: "Rho Tech",
      dueDate: "2025-01-30",
      place: "Phoenix",
      amount: 18000.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "UPI",
    },
    {
      invoiceNo: "INV-063",
      date: "2024-12-31",
      customerName: "Sigma Goods",
      dueDate: "2025-01-31",
      place: "Dallas",
      amount: 18800.0,
      deliveredStatus: "Delivered",
      payment: "Paid",
      paymentMode: "Bank",
    },
    {
      invoiceNo: "INV-064",
      date: "2024-12-15",
      customerName: "Upsilon Holdings",
      dueDate: "2025-01-15",
      place: "Miami",
      amount: 19600.0,
      deliveredStatus: "Pending",
      payment: "Unpaid",
      paymentMode: "Other",
    },
    {
      invoiceNo: "INV-065",
      date: "2024-12-20",
      customerName: "Chi Services",
      dueDate: "2025-01-20",
      place: "Los Angeles",
      amount: 20400.0,
      deliveredStatus: "Pending",
      payment: "Paid",
      paymentMode: "Cash",
    },
  ];


  // Total invoice 
  const numberOftotalInvoice = data.length;

  // Calculate the number of paid invoice 
  const numberOfpaidInvoice = data.filter((invoice) => invoice.payment === "Paid").length;
  
  // Calculate the number of  unPaid invoice
  const numberOfunpaidInvoice = data.filter((invoice)=> invoice.payment ==="Unpaid").length; 

  // Calculate total amounts
  const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);

  // Calculate Paid amounts
  const paidAmount = data
    .filter((item) => item.payment === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Calculate Unpaid amounts
  const unpaidAmount = data
    .filter((item) => item.payment === "Unpaid")
    .reduce((acc, curr) => acc + curr.amount, 0);



  const stats = [
    {
      title: "Total Amount",
      value: `$${totalAmount}`,
      change: "+147,923 previous month",
      isPositive: true,
      numberofInvoice:numberOftotalInvoice,
    },
    {
      title: "Paid Amount",
      value: `$${paidAmount}`,
      change: "+49,934 previous month",
      isPositive: true,
      numberofInvoice:numberOfpaidInvoice,
    },
    {
      title: "Unpaid Amount",
      value: `$${unpaidAmount}`,
      change: "+9,840 previous month",
      isPositive: false,
      numberofInvoice:numberOfunpaidInvoice,
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center w-[70%]  h-[213px] rounded-[5px] bg-[#FFFFFF] border border-[#999999] border-opacity-[0.3]">

        <div id="chart" className="flex flex-col justify-center  w-full">
          
          <div className="flex justify-between items-center w-full h-[40px] rounded-t-[5px]  border-[#999999] p-[10px] gap-[10px]">
            <span className="flex w-[127px] h-[14px] font-bold text-[14px] leading-[18px] text-[#000000]">
              Chart Overview
            </span>

            <div className="flex w-[295px] h-[30px]"></div>

            <div className="flex">
              <div className="flex justify-center items-center w-[30px] h-[30px] ">
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7969 0.152344C13.1797 0.152344 13.5625 0.425781 13.5625 0.890625V4.88281C13.5625 5.15625 13.3164 5.40234 13.0156 5.40234H9.05078C8.58594 5.40234 8.3125 5.01953 8.3125 4.66406C8.3125 4.47266 8.36719 4.28125 8.53125 4.14453L9.76172 2.88672C8.99609 2.25781 8.01172 1.90234 6.97266 1.90234C4.56641 1.90234 2.625 3.87109 2.625 6.27734C2.625 8.68359 4.56641 10.625 6.97266 10.625C8.99609 10.625 9.43359 9.58594 10.1445 9.58594C10.6367 9.58594 10.9922 9.99609 10.9922 10.4609C10.9922 11.418 8.77734 12.375 6.97266 12.375C3.60938 12.375 0.875 9.64062 0.875 6.27734C0.875 2.88672 3.60938 0.152344 7 0.152344C8.47656 0.152344 9.89844 0.699219 10.9922 1.65625L12.3047 0.371094C12.4414 0.207031 12.6328 0.152344 12.7969 0.152344Z"
                    fill="#0D0D0D"
                  />
                </svg>
              </div>

              <div className="flex justify-center items-center w-[30px] h-[30px]">
                <svg
                  width="4"
                  height="13"
                  viewBox="0 0 4 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.75 9.09375C2.57031 9.09375 3.28125 9.80469 3.28125 10.625C3.28125 11.4727 2.57031 12.1562 1.75 12.1562C0.902344 12.1562 0.21875 11.4727 0.21875 10.625C0.21875 9.80469 0.902344 9.09375 1.75 9.09375ZM1.75 4.71875C2.57031 4.71875 3.28125 5.42969 3.28125 6.25C3.28125 7.09766 2.57031 7.78125 1.75 7.78125C0.902344 7.78125 0.21875 7.09766 0.21875 6.25C0.21875 5.42969 0.902344 4.71875 1.75 4.71875ZM1.75 3.40625C0.902344 3.40625 0.21875 2.72266 0.21875 1.875C0.21875 1.05469 0.902344 0.34375 1.75 0.34375C2.57031 0.34375 3.28125 1.05469 3.28125 1.875C3.28125 2.72266 2.57031 3.40625 1.75 3.40625Z"
                    fill="#0D0D0D"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg  flex-1 w-[170px] "
              >
                <div className=" flex flex-col justify-center items-center">
                  <h3 className="text-gray-500 text-sm mb-[5px]">
                    {stat.title}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    {stat.isPositive ? (
                      <FaArrowUp className="text-green-500 ml-2" />
                    ) : (
                      <FaArrowUp className="text-red-500 ml-2" />
                    )}
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      stat.isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </p>
                  <h2 className="text-gray-500 text-sm font-bold mt-[10px]  bg-gray-100 py-[2px] px-[8px] rounded-full">
                  Amount of {stat.numberofInvoice} Invoices
                  </h2>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default PieChartSection;
