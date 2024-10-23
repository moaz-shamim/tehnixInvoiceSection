import React, { useState, useRef, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddItemInBulk from "./components/AddItemInBulk";
import Select from "react-select";
import { components } from "react-select";
import {
  createInvoces,
  getAllProduct,
  getAllSuctomer,
  getInvoiceById,
} from "./API/InvoiceAPI";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useNavigate, useParams } from "react-router-dom";

const CreateInvoice = () => {
  const stateOptions = [
    { value: "01", label: "01-JAMMU AND KASHMIR" },
    { value: "02", label: "02-HIMACHAL PRADESH" },
    { value: "03", label: "03-PUNJAB" },
    { value: "04", label: "04-CHANDIGARH" },
    { value: "05", label: "05-UTTARAKHAND" },
    { value: "06", label: "06-HARYANA" },
    { value: "07", label: "07-DELHI" },
    { value: "08", label: "08-RAJASTHAN" },
    { value: "09", label: "09-UTTAR PRADESH" },
    { value: "10", label: "10-BIHAR" },
    { value: "11", label: "11-SIKKIM" },
    { value: "12", label: "12-ARUNACHAL PRADESH" },
    { value: "13", label: "13-NAGALAND" },
    { value: "14", label: "14-MANIPUR" },
    { value: "15", label: "15-MIZORAM" },
    { value: "16", label: "16-TRIPURA" },
    { value: "17", label: "17-MEGHALAYA" },
    { value: "18", label: "18-ASSAM" },
    { value: "19", label: "19-WEST BENGAL" },
    { value: "20", label: "20-JHARKHAND" },
    { value: "21", label: "21-ODISHA" },
    { value: "22", label: "22-CHHATTISGARH" },
    { value: "23", label: "23-MADHYA PRADESH" },
    { value: "24", label: "24-GUJARAT" },
    { value: "25", label: "25-DAMAN AND DIU" },
    { value: "26", label: "26-DADRA AND NAGAR HAVELI AND DAMAN AND DIU" },
    { value: "27", label: "27-MAHARASHTRA" },
    { value: "28", label: "28-ANDHRA PRADESH" },
    { value: "29", label: "29-KARNATAKA" },
    { value: "30", label: "30-GOA" },
    { value: "31", label: "31-LAKSHADWEEP" },
    { value: "32", label: "32-KERALA" },
    { value: "33", label: "33-TAMIL NADU" },
    { value: "34", label: "34-PUDUCHERRY" },
    { value: "35", label: "35-ANDAMAN AND NICOBAR ISLANDS" },
    { value: "36", label: "36-TELANGANA" },
    { value: "37", label: "37-LADAKH" },
  ];
  const [data, setData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [productRows, setProductRows] = useState([]);
  const navigate = useNavigate();

  //************************************* Update Bill  Details Section *****************************//
  const { billId } = useParams();
  // console.log("Bill ID:", billId);

  //************************************* For  Invoice Details Section *****************************//

  const [invoiceDate, setInvoiceDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [shipmentDate, setShipmentDate] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState("");

  const invoiceDateRef = useRef(null);
  const dueDateRef = useRef(null);
  const shipmentDateRef = useRef(null);

  const handleInputChange = (e) => {
    setReferenceNumber(e.target.value);
  };

  //************************************* For  ItemFields Section *****************************//

  const [rows, setRows] = useState([
    {
      row_id: null,
      product: "",
      description: "",
      qty: 0,
      uom: "",
      price: null,
      discount: null,
      tax: null,
      amount: null,
      taxRates: null,
      hsnCode: "",
      billedQty: 0.0,
      discountAmount: "",
      taxationType: "",
      taxableValue: "",
      taxType: "",
      freeQty: 0,
      alternateUnit: "box",
      convFactor: 1,
      branchId: 1,
      isDefault: true,
    },
  ]);

  console.log(rows);
  

  //State to track whether the user is editing a specific field in the current row
  const [isEditing, setIsEditing] = useState({
    product: false,
    description: false,
    qty: false,
    uom: false,
    price: false,
    discount: false,
    tax: false,
    amount: false,
  });

  const productRefs = useRef([]);
  const descriptionRefs = useRef([]);
  const qtyRefs = useRef([]);
  const uomRefs = useRef([]);
  const priceRefs = useRef([]);
  const discountRefs = useRef([]);
  const taxRefs = useRef([]);
  const amountRefs = useRef([]);

  const [activeRow, setActiveRow] = useState(null);
  const dropdownRef = useRef(null);

  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);

  let options = data.map((product) => product.productName);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleKeyDown = (e, index, row) => {
    if (e.key === "Enter") {
      if (activeOptionIndex >= 0 && filteredOptions.length > 0) {
        const selectedProduct = data.find(
          (product) =>
            product?.productName?.toLowerCase() ===
              filteredOptions[activeOptionIndex].productName?.toLowerCase() ||
            product?.barcode?.toString() ===
              filteredOptions[activeOptionIndex].barcode?.toString()
        );

        if (selectedProduct) {
          row.row_id = selectedProduct.productId;
          row.product = selectedProduct.productName;
          row.description = selectedProduct.description;
          row.uom = selectedProduct.unit;
          row.price = selectedProduct.mrp;
          row.discount = selectedProduct.discountPer;
          row.tax = selectedProduct.taxPer;
          row.row_id = selectedProduct.productId;
          row.taxRates = selectedProduct.taxRates;
          row.hsnCode = selectedProduct.hsnCode;
          row.taxationType = selectedProduct.taxationType;
          row.taxType = selectedProduct.taxType;

          setRows((prevRows) =>
            prevRows.map((r, i) => (i === index ? row : r))
          );
          e;

          setActiveRow(null);
          setActiveOptionIndex(-1);

          handleEnter(e, "description", index);
        }
      } else if (!row.product) {
        alert("Input field cannot be empty");
      } else {
        handleEnter(e, "description", index);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (activeOptionIndex < filteredOptions.length - 1) {
        setActiveOptionIndex((prevIndex) => prevIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (activeOptionIndex > 0) {
        setActiveOptionIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const handleEnter = (e, nextField, rowIndex) => {
    if (e.key === "Enter") {
      const currentFieldvalue = e.target.value;
      const currentFieldname = e.target.name;

      const refMap = {
        description: descriptionRefs,
        qty: qtyRefs,
        uom: uomRefs,
        price: priceRefs,
        discount: discountRefs,
        tax: taxRefs,
        amount: amountRefs,
      };
      if (currentFieldname === "description") {
        if (refMap[nextField]?.current[rowIndex]) {
          refMap[nextField].current[rowIndex].focus();
        }
        return;
      }

      // If the user reaches the last row, add a new row
      if (nextField === "addRow") {
        if (rowIndex === rows.length - 1) {
          addNewRow(); // Only add a row if you are on the last row
        } else {
          productRefs.current[rowIndex + 1]?.focus(); // Move focus to the next row if it  exists
        }
      } else if (currentFieldvalue.trim() === "") {
        if (currentFieldname !== "product") {
          // Prevent moving to the next field if the current field is empty
          alert(`${currentFieldname} cannot be empty!`); // Optional: Alert the user
        }

        return; // Stop execution
      } else if (refMap[nextField]?.current[rowIndex]) {
        refMap[nextField].current[rowIndex].focus(); // Move focus to the next field in the current row
      }
    }
  };

  const addNewRow = () => {
    // Prevent adding a new row if the last row has an invalid or empty amount

    const lastRow = rows[rows.length - 1];
    const lastRowAmount = calculateAmount(lastRow);

    if (lastRowAmount === 0 || isNaN(lastRowAmount)) {
      const refMap = {
        product: productRefs,
        description: descriptionRefs,
        qty: qtyRefs,
        uom: uomRefs,
        price: priceRefs,
        discount: discountRefs,
        tax: taxRefs,
        amount: amountRefs,
      };
      refMap["product"].current[rows.length - 1].focus();

      return;
    }

    const newRow = {
      row_id: null,
      product: "",
      description: "",
      qty: 0,
      uom: "",
      price: null,
      discount: null,
      tax: null,
      amount: null,
      taxRates: null,
      hsnCode: "",
      billedQty: 0.0,
      discountAmount: "",
      taxationType: "",
      taxableValue: "",
      taxType: "",
      freeQty: 0,
      alternateUnit: "box",
      convFactor: 1,
      branchId: 1,
      isDefault: true,
    };

    setRows((prevRows) => {
      const newRowIndex = prevRows.length;
      const updatedRows = [...prevRows, newRow]; // Add new row at the end of the table

      // After updating rows, focus on the new row's product input field
      setTimeout(() => {
        if (productRefs.current[newRowIndex]) {
          productRefs.current[newRowIndex].focus();
        }
      }, 0); // Focus on the new row's product input
      return updatedRows;
    });
  };

  const handleChange = (e, field, rowIndex) => {
    const value = e.target.value;

    const updatedRows = rows.map((row, i) => {
      if (i === rowIndex) {
        // Update the field (qty, price, etc.)
        const updatedRow = { ...row, [field]: value };

        // If the field being updated is qty, recalculate the amount
        if (field === "qty") {
          updatedRow.amount = calculateAmount(updatedRow); // Update amount in the row
        }

        return updatedRow;
      }

      return row;
    });

    setRows(updatedRows);
  };

  const calculateAmount = (row) => {
    const subtotal = parseInt(row.qty) * row.price;
    const discountAmount = (subtotal * row.discount) / 100;
    const taxAmount =
      ((subtotal - (subtotal * row.discount) / 100) * row.tax) / 100;

    return subtotal - discountAmount + taxAmount;
  };

  const deleteRow = (index) => {
    if (index === 0) {
      if (rows.length > 1) {
        // Remove the first row if rows.length > 0
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);

        // Clean up refs for the deleted row
        productRefs.current.splice(index, 1);
        descriptionRefs.current.splice(index, 1);
        qtyRefs.current.splice(index, 1);
        uomRefs.current.splice(index, 1);
        priceRefs.current.splice(index, 1);
        discountRefs.current.splice(index, 1);
        taxRefs.current.splice(index, 1);
        amountRefs.current.splice(index, 1);
      } else {
        // Reset the values of the first row if rows.length === 0
        const updatedRows = [...rows]; // This will still be an empty array
        updatedRows[0] = {
          product: "",
          description: "",
          qty: 0,
          uom: "",
          price: "",
          discount: "",
          tax: "",
          amount: 0,
          taxRates: "",
        };
        setRows(updatedRows);

        // Optionally reset the inputs for the first row
        if (productRefs.current[0]) {
          productRefs.current[0].value = ""; // Reset the input value for the first row
          // Reset other refs similarly...
        }
      }
    } else {
      // Remove row if it isn't the first row
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);

      // Clean up refs for the deleted row
      productRefs.current.splice(index, 1);
      descriptionRefs.current.splice(index, 1);
      qtyRefs.current.splice(index, 1);
      uomRefs.current.splice(index, 1);
      priceRefs.current.splice(index, 1);
      discountRefs.current.splice(index, 1);
      taxRefs.current.splice(index, 1);
      amountRefs.current.splice(index, 1);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //********************************** For header Section *************************************//

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  //********************************** For Customer Information Section *************************************//

  const [intraState, setIntraState] = useState(false);
  const [interState, setInterState] = useState(false);

  const [customerrows, setCustomerrows] = useState({
    companyId: "",
    contactId: "",
    invoiceHolderName: "",
    address: "",
    billToAddress: "",
    shipToAddress: "",
    billToEmail: "",
    billFrom: "",
    billFromPhone: "",
    supplyPlace: "",
    stateCode: "",
  });

  // console.log(customerrows);
  

  const [selectedOption, setSelectedOption] = useState(null);

  const handlemycustomerChange = (option) => {
    setSelectedOption(option);

    // Find the customer object based on the selected invoiceHolderName
    const selectedCustomer = customerData?.find(
      (customer) => customer.businessName === option.value
    );

    // Update the customerrows state with the values from the selected customer
    if (selectedCustomer) {
      // Filter the stateOptions to find the label corresponding to the selectedCustomer stateCode
      const stateOption = stateOptions.find(
        (state) => state.value === selectedCustomer.stateCode
      );

      setCustomerrows({
        invoiceHolderName: selectedCustomer.businessName,
        billToAddress: selectedCustomer.address,
        shipToAddress: selectedCustomer.shippingAddress,
        billToEmail: selectedCustomer.workEmail,
        billFrom: selectedCustomer.businessName,
        billFromPhone: selectedCustomer.workPhone,
        supplyPlace: stateOption ? stateOption.label : "",
        companyId: selectedCustomer.companyId,
        contactId: selectedCustomer.contactId,
        address: selectedCustomer.address,
        stateCode: selectedCustomer.stateCode,
      });
    }

    const isIntraState = selectedCustomer.stateCode === "10";
    setIntraState(isIntraState);
    setInterState(!isIntraState);
  };

  const customerOption = customerData?.map((customer) => ({
    id: customer.contactId,
    value: customer.businessName,
    label: customer.businessName,
  }));

  //********************************** For Price Summary Section **********************************//

  const [selectedsTaxes, setSelectedsTaxes] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [roundTotalAmounts, setRoundTotalAmount] = useState(0);
  const [truncatedTotalAmount, setTruncatedTotalAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalTaxesAmount, setTotalTaxesAmount] = useState(0);
  const [roundingoffAMount, setRoundingoffAMount] = useState(0);
  const [beforeTaxAmount, setBeforeTaxAmount] = useState(0);

  // console.log(selectedsTaxes);

  const calculateTotalAmount = (rows) => {
    return rows.reduce((acc, row) => {
      const amount = row.amount || 0; // Handle undefined or null amounts
      return acc + amount;
    }, 0);
  };

  const truncateToTwoDecimals = (value) => {
    return Math.floor(value * 100) / 100; // Multiplies by 100, truncates, then divides by 100
  };

  const calculateTaxes = () => {
    // Initialize an array to store grouped taxes
    const taxGroups = [];

    rows.map((row) => {
      if (row.product !== "" && row.taxRates) {
        let selectedTaxes;

        // Filter taxes based on IntraState or InterState
        if (intraState) {
          selectedTaxes = row.taxRates.filter(
            (tax) => tax.taxType === "CGST" || tax.taxType === "SGST"
          );
        } else {
          selectedTaxes = row.taxRates.filter((tax) => tax.taxType === "IGST");
        }

        // Calculate taxable value (price * qty - discount)
        const taxableValue =
          row.price * row.qty - (row.qty * row.price * row.discount) / 100;

        // Iterate over each selected tax
        selectedTaxes.forEach((tax) => {
          const taxName = `${tax.taxType} ${tax.rate}%`; // Generate tax name
          // Check if a group for the same taxType and rate already exists
          const existingGroup = taxGroups.find(
            (group) =>
              group.taxType === tax.taxType && group.taxPer === tax.rate
          );

          if (existingGroup) {
            // If the tax group exists, update the amount for that group
            existingGroup.amount =
              existingGroup.amount +
              ((row.price * row.qty -
                (row.qty * row.price * row.discount) / 100) *
                tax.rate) /
                100; // Adjust the calculation logic based on your requirement
          } else {
            taxGroups.push({
              taxType: tax.taxType,
              taxPer: tax.rate,
              taxAmount: (taxableValue * tax.rate) / 100,
              taxableValue: taxableValue, // New key
              taxName: taxName, // New key
            });
          }
        });
      }
    });

    // Set selectedsTaxes directly if you want to render it separately
    setSelectedsTaxes(taxGroups);
  };

  //***************************** For MemoAndAttachments Section ******************************//

  const [memo, setMemo] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array

    if (files.length === 0) return; // No files selected

    // Map the selected files to include a URL for each file
    const filesWithURLs = files.map((file) => ({
      file,
      url: URL.createObjectURL(file), // Create a URL for the file
    }));

    setSelectedFiles(filesWithURLs); // Update the state with files and their URLs
  };

  const openFile = (url) => {
    if (url) {
      window.open(url, "_blank"); // Open the file in a new tab
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProduct();
      const customerResponse = await getAllSuctomer();
      setData(response.data);
      setCustomerData(customerResponse);
    };
    fetchData();

    const fetchInvoiceDetails = async () => {
      const response = await getInvoiceById(billId);
      console.log(response.data);

      handleFetchInvoiceDetails(response);
    };
    if (billId) {
      fetchInvoiceDetails();
    }

    if (invoiceDateRef.current) {
      flatpickr(invoiceDateRef.current, {
        dateFormat: "d/m/Y",
        onChange: ([selectedDate], dateStr) => setInvoiceDate(dateStr),
      });
    }
    if (dueDateRef.current) {
      flatpickr(dueDateRef.current, {
        dateFormat: "d/m/Y",
        onChange: ([selectedDate], dateStr) => setDueDate(dateStr),
      });
    }
    if (shipmentDateRef.current) {
      flatpickr(shipmentDateRef.current, {
        dateFormat: "d/m/Y",
        onChange: ([selectedDate], dateStr) => setShipmentDate(dateStr),
      });
    }

    // Only fetch if billId is present in the URL

    //
  }, []);

  useEffect(() => {
    calculateTaxes();
  }, [intraState, interState, rows, isDropdownOpen]);

  // console.log(rows);

  useEffect(() => {
    const total = calculateTotalAmount(rows);
    setTotalAmount(total);

    const roundedTotal = Math.round(total);
    setRoundTotalAmount(roundedTotal);

    const truncatedTotal = truncateToTwoDecimals(total);
    setTruncatedTotalAmount(truncatedTotal);

    const calculatedSubTotal = rows.reduce((acc, product) => {
      return acc + product.qty * product.price;
    }, 0);
    setSubTotal(calculatedSubTotal);

    const calculateTotalDiscount = rows.reduce((acc, product) => {
      return acc + (product.qty * product.price * product.discount) / 100;
    }, 0);
    setTotalDiscount(calculateTotalDiscount);

    const calculateTotalTaxes = selectedsTaxes.reduce(
      (acc, tax) => acc + tax.taxAmount,
      0
    );

    const calculateroundingoffAMount = () => {
      setRoundingoffAMount(roundTotalAmounts - truncatedTotalAmount);
    };

    calculateroundingoffAMount();

    const calculatebeforeTaxAmount = () => {
      return rows.reduce((acc, product) => {
        return (
          acc +
          product.qty * product.price -
          (product.qty * product.price * product.discount) / 100
        );
      }, 0);
    };

    // const calculatebeforeTaxAmount = rows.reduce((acc, product) => {
    //   return (
    //     acc +
    //     product.qty * product.price -
    //     (product.qty * product.price * product.discount) / 100
    //   );
    // }, 0);

    setBeforeTaxAmount(calculatebeforeTaxAmount());

    setTotalTaxesAmount(calculateTotalTaxes);

    const mappedRows = rows.map((row) => ({
      productId: row.row_id,
      hsnCode: row.hsnCode,
      quantity: row.qty ? parseInt(row.qty) : null,
      unit: row.uom,
      billedQty: row.qty ? parseInt(row.qty) : null,
      freeQty: row.freeQty,
      alternateUnit: row.alternateUnit,
      convFactor: row.convFactor,
      rate: row.price,
      discPer: row.discount,
      discount: row.discountAmount ? row.discountAmount : 1.1,
      amount: row.amount,
      taxType: row.taxType ? row.taxType : "",
      taxationType: row.taxationType,
      taxPer: row.tax,
      taxableValue: row.taxableValue ? row.taxableValue : 0,
      branchId: row.branchId,
    }));
    setProductRows(mappedRows);
  }, [rows, isModalOpen, selectedsTaxes]);

  const invoiceCreation = async () => {
    const formData = new FormData();
    formData.append("companyId", customerrows.companyId);
    formData.append("billDate", invoiceDate);
    formData.append("invoiceNo", "");
    formData.append("referenceNo", referenceNumber);
    formData.append("duDate", dueDate);
    formData.append("contactId", customerrows.contactId);
    formData.append("customerName", customerrows.invoiceHolderName);
    formData.append("customerAddress", customerrows.address);
    formData.append("customerEmail", customerrows.billToEmail);
    formData.append("customerContactNo", customerrows.billFromPhone);
    formData.append("placeOfSupply", customerrows.supplyPlace);
    formData.append("subTotal", subTotal);
    formData.append("discount", totalDiscount);
    formData.append("otherCharges", 0);
    formData.append("totalTaxes", totalTaxesAmount);
    formData.append("roundOff", roundTotalAmounts - truncatedTotalAmount);
    formData.append("grandTotal", roundTotalAmounts);
    formData.append("notes", memo);
    formData.append("branchId", 0);
    formData.append("salesmanId", 0);
    formData.append("salesman", "");
    formData.append("status", "Active");
    formData.append("createdBy", "");
    formData.append("billId", 0);
    formData.append("billDetails", JSON.stringify(productRows));
    formData.append("taxDetails", JSON.stringify(selectedsTaxes));

    try {
      const response = await createInvoces(formData);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchInvoiceDetails = (response) => {
    console.log("Inside handleFetchInvoiceDetails");
    setReferenceNumber(response.data.referenceNo);
    setInvoiceDate(response.data.billingDate);
    setDueDate(response.data.dueDate);
    setMemo(response.data.notes);

    
    const customerData = {
      contactId: response.data.contactId,
      invoiceHolderName: response.data.customerName,
      billFrom: response.data.customerName,
      address: response.data.customerAddress,
      billToEmail: response.data.customerEmail,
      billFromPhone: response.data.customerContactNo,
      billToAddress: response.data.customerAddress,
      shipToAddress: response.data.customerAddress,
      supplyPlace:response.data.placeOfSupply
    };

    
    setCustomerrows(customerData);



    const productRows = response.data.billParticulars.map((particular) => ({
      row_id: particular.rowId,
      product: particular.productName,
      description: particular.description,
      amount: particular.amount,
      qty: particular.quantity,
      uom: particular.unit,
      price: particular.rate,
      discount: particular.discPer,
      tax: particular.taxPer,
      hsnCode: particular.hsnCode,
      billedQty: particular.billedQty,
      taxationType: particular.taxationType,
      taxType: particular.taxType,
      freeQty: particular.freeQty,
      alternateUnit: particular.alternateUnit,
      convFactor: particular.convFactor,
      branchId: particular.branchId,
      taxRates: particular?.taxRates
    }));
    setRows(productRows);

  
    const taxRows = response.data.billTaxationDetails.map((taxDetail) => ({
      taxAmount: taxDetail.taxAmount,
      taxName: taxDetail.taxName,
      taxPer: taxDetail.taxPer,
      taxType: taxDetail.taxType,
      taxableValue: taxDetail.taxableValue,
    }));
    console.log(taxRows);


    setSelectedsTaxes(taxRows);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden w-full font-Manrope bg-[#F1F1F1]">
      <div className="mx-auto w-[1115px] h-auto bg-[#F1F1F1]  pb-[10px] flex flex-col items-center">
        {/* HeaderSection */}
        <div className="flex justify-between relative w-[1113px]  h-[50px] pt-[10px] pr-[17px] pb-[10px] pl-[17px] gap-[15px] leading-[40.98px]  items-center bg-[#F1F1F1] ">
          <div className="w-[180px] h-[41px] ">
            <h1 className="font-bold text-[20px] leading-[40.98px] text-[#1C1C1C]">
              New Invoice
            </h1>
          </div>

          <div className="flex gap-[5px]">
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
                  style={{ top: "65px", right: "113px" }}
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
              className="w-[82px] h-[35px] p-[10px] gap-[10px]  border border-opacity-[0.8] bg-[#006AFF] rounded-[5px] border-[#999999] "
              onClick={invoiceCreation}
            >
              <div className="text-[12px] leading-[14.52px]   no-underline text-[#FFFFFF] flex justify-center items-center gap-[4px] font-semibold">
                <span>Save</span>
              </div>
            </button>
          </div>
        </div>

        <div className="border  bg-[#ffffff] rounded-lg p-[10px] px-[15px]">
          {/* Customer Information Section */}
          <div className="flex justify-between  gap-4 w-[1074px]  my-[15px] text-[14px] font-bold ">
            <div className="flex gap-1 justify-center">
              {/* Bill to section */}
              <div className="flex flex-col">
                <label className="font-bold block mb-3">Bill to:</label>

                <Select
                  placeholder="Business/Custoner Name"
                  className="basic-single text-[12px] font-semibold rounded-md placeholder:text-[12px]"
                  classNamePrefix="select"
                  name="Business/Custoner Name"
                  options={customerOption}
                  onChange={handlemycustomerChange}
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "33px",
                      minHeight: "33px",
                      marginBottom: "3px",
                      borderRadius: "5px",
                    }),
                    menu: (base) => ({
                      ...base,
                      padding: 0,
                      marginTop: "5px",
                      width: "100%",
                    }),
                  }}
                  components={{
                    MenuList: (props) => (
                      <div className="w-full">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            alert("Custom Button Clicked!");
                          }}
                          style={{
                            padding: "5px 10px",
                            border: "none",
                            borderTopLeftRadius: "5px",
                            borderTopRightRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                            textAlign: "left",
                            backgroundColor: "#F1F1F1",
                            color: "black",
                          }}
                        >
                          Add New Customer
                        </button>
                        <components.MenuList {...props} />
                      </div>
                    ),
                  }}
                  menuPosition="fixed"
                  menuPlacement="auto"
                />

                <input
                  placeholder="Billing address"
                  name="billToAddress"
                  type="text"
                  value={customerrows.billToAddress}
                  className="my-1 w-[262px] h-[33px] px-4 py-2  text-[12px] font-semibold border border-gray-300 rounded-md placeholder:text-[12px]"
                />
                <input
                  placeholder="Email address"
                  name="billToEmail"
                  type="email"
                  value={customerrows.billToEmail}
                  className="my-1 w-[262px] h-[33px]  text-[12px] font-semibold px-4 py-2 border border-gray-300 rounded-md placeholder:text-[12px]"
                />

                <input
                  placeholder="Place of Supply"
                  name="supplyPlace"
                  type="text"
                  value={customerrows.supplyPlace}
                  className="my-1 w-[262px] h-[33px]  text-[12px] font-semibold px-4 py-2 border border-gray-300 rounded-md placeholder:text-[12px]"
                />
              </div>

              {/* Bill from section */}
              <div className="flex flex-col">
                <label className="font-bold block mb-2">Ship to:</label>
                <input
                  placeholder="Business/Custoner Name"
                  name="billFrom"
                  type="text"
                  value={customerrows.billFrom}
                  className="my-1 w-[262px] h-[33px] px-4 py-2 text-[12px] font-semibold border border-gray-300 rounded-md placeholder:text-[12px]"
                />
                <input
                  placeholder="Shipping address"
                  name="shipToAddress"
                  type="text"
                  value={customerrows.shipToAddress}
                  className="my-1 w-[262px] h-[33px] px-4 py-2  text-[12px] font-semibold border border-gray-300 rounded-md placeholder:text-[12px]"
                />
                <input
                  placeholder="Phone Number"
                  name="billFromPhone"
                  type="text"
                  value={customerrows.billFromPhone}
                  className="my-1 w-[262px] h-[33px] px-4 py-2  text-[12px] font-semibold border border-gray-300 rounded-md placeholder:text-[12px]"
                />
              </div>
            </div>

            {/* Invoice Details Section */}
            <div className="flex flex-col justify-between w-[300px]">
              <div className="">
                <div className="flex flex-col items-end">
                  <h2 className="text-[14px] font-bold  m-0 p-0 ">
                    Balance Due
                  </h2>
                  <div className="text-gray-600 text-[24px] font-bold">
                    <span className="text-[16px] font-bold">Pay</span> ₹{" "}
                    {roundTotalAmounts.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="text-[13px]">
                {/* Bill Id */}
                {billId && (
                  <div className="flex items-center space-x-2 justify-between">
                    <span className="font-semibold">Bill Id</span>
                    <div className="w-[20px] h-[13px] "></div>

                    <span className="w-[100px] h-[20px] text-center">
                      {billId}
                    </span>
                  </div>
                )}

                {/* Invoice Date */}
                <div className="flex items-center space-x-2 justify-between">
                  <span className="font-semibold">Invoice Date</span>
                  <div className="w-[20px] h-[13px] "></div>

                  <input
                    className="w-[100px] h-[20px] text-center"
                    type="date"
                    ref={invoiceDateRef}
                    placeholder="Select Date"
                    value={invoiceDate || ""}
                  />
                </div>

                {/* Due Date */}
                <div className="flex items-center space-x-2 justify-between">
                  <span className="font-semibold">Due Date</span>
                  <div className="w-[50px] h-[13px] "></div>
                  <input
                    className="w-[100px] h-[20px] text-center"
                    type="date"
                    ref={dueDateRef}
                    value={dueDate || ""}
                    placeholder="Select Date"
                  />
                </div>

                {/* Ship By (expected) */}
                <div className="flex items-center space-x-2 justify-between">
                  <span className="font-semibold">Shipment Date</span>
                  <div className="w-[50px] h-[13px] "></div>
                  <input
                    className="w-[100px] h-[20px] text-center"
                    type="date"
                    ref={shipmentDateRef}
                    value={shipmentDate || ""}
                    placeholder="Select Date"
                  />
                </div>

                {/* Reference Number */}
                <div className="flex items-center space-x-2 justify-between">
                  <span className="font-semibold">Reference Number</span>
                  <div className="w-[20px] h-[15px] "></div>
                  <input
                    className="text-[12px] font-medium text-[#1C1C1C] w-[100px] h-[20px] mb-[3px] px-[3px] border text-center"
                    type="text"
                    placeholder="Ref Number"
                    value={referenceNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ItemFields Section */}
          <div className="flex flex-col justify-between  gap-[8px] w-[1074px] my-[30px] ">
            <div className="flex flex-col  border border-[#999999] border-opacity-[0.3]  h-full rounded-tr-[5px] rounded-tl-[5px]">
              <table>
                <thead>
                  <tr className="flex items-center  h-[40px] border-b-2 border-opacity-[0.3] border-[#999999] gap-[0px] py-[10px] pr-[10px] pl-[15px] rounded-tr-[5px] rounded-tl-[5px] bg-[#f6f5f5]">
                    <th className="w-[280px] h-[30px] py-[3px] pr-[4px] ">
                      <span className="w-[80px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                        Product
                      </span>
                    </th>
                    <th className="w-[240px] h-[30px] py-[3px] border-l">
                      <span className="w-[80px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                        Description
                      </span>
                    </th>
                    <th className="w-[80px] h-[30px] py-[3px] border-l">
                      <span className="w-[80px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                        Qty
                      </span>
                    </th>
                    <th className="w-[80px] h-[30px] py-[3px] border-l">
                      <span className="w-[80px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                        Unit
                      </span>
                    </th>
                    <th className="w-[80px] h-[30px] py-[3px] border-l">
                      <span className="w-[80px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                        Price
                      </span>
                    </th>
                    <th className="w-[80px] h-[30px] py-[3px] border-l">
                      <span className="w-[80px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                        Dis<span className="text-[11px]">(%)</span>
                      </span>
                    </th>
                    <th className="w-[80px] h-[30px] py-[3px] border-l">
                      <span className="w-[80px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                        Tax<span className="text-[11px]">(%)</span>
                      </span>
                    </th>
                    <th className="w-[100px] h-[30px] py-[3px] border-l">
                      <span className="w-[80px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]">
                        Amount
                      </span>
                    </th>
                    <th className="w-[20px] h-[30px] py-[3px] border-l">
                      <span className="w-[80px] h-[19px] text-[14px] font-bold leading-[19.12px] text-[#1C1C1C]"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr
                      key={index}
                      className="flex items-center  h-[30px] border-b border-opacity-[0.3] border-[#999999] bg-[#FFFFFF] py-[10px] pr-[0px] "
                    >
                      <td className="w-[295px] h-[30px]  flex items-center justify-center">
                        <div className="w-[295px] h-[30px] border-b  mt-[1px]">
                          <input
                            type="text"
                            name="product"
                            placeholder={
                              !isEditing.product ? "Select Product" : ""
                            }
                            value={row.product}
                            ref={(el) => (productRefs.current[index] = el)}
                            onFocus={(e) => {
                              setIsEditing((prev) => ({
                                ...prev,
                                product: true,
                              }));
                              e.target.select();

                              setFilteredOptions(
                                data?.map((product) => product)
                              );
                              setActiveRow(index);

                              setActiveOptionIndex(-1);
                            }}
                            onBlur={(e) => {
                              setIsEditing((prev) => ({
                                ...prev,
                                product: false,
                              }));
                              if (
                                !dropdownRef.current ||
                                !dropdownRef.current.contains(e.relatedTarget)
                              ) {
                                setActiveRow(null);
                                setActiveOptionIndex(-1);
                              }
                            }}
                            onChange={(e) => {
                              const value = e.target.value;

                              row.product = value;

                              const filtered = data.filter(
                                (option) =>
                                  option?.productName
                                    ?.toLowerCase()
                                    .includes(value.toLowerCase()) ||
                                  option?.barcode
                                    ?.toLowerCase()
                                    .startsWith(value.toLowerCase())
                              );

                              setFilteredOptions(filtered);

                              setRows((prevRows) =>
                                prevRows.map((r, i) =>
                                  i === index
                                    ? {
                                        ...r,
                                        ...(value === "" && {
                                          uom: "",
                                          price: "",
                                          discount: "",
                                          tax: "",
                                          amount: "",
                                          description: "",
                                        }),
                                      }
                                    : r
                                )
                              );

                              setActiveRow(index);
                              setActiveOptionIndex(-1);
                            }}
                            onKeyDown={(e) => handleKeyDown(e, index, row)}
                            className="text-[12px] font-medium text-[#1C1C1C] w-full h-full text-left mb-[3px] px-[3px]"
                          />
                          {/* Dropdown menu */}
                          {activeRow === index &&
                            filteredOptions.length > 0 && (
                              <div
                                ref={dropdownRef}
                                className="absolute shadow bg-white overflow-hidden flex flex-col w-[293px]  mt-[2px] border border-gray-200 rounded-[5px] z-10 text-[12px] font-medium text-[#1C1C1C]"
                                style={{
                                  maxHeight: "245px",
                                  overflowY: "auto",
                                }}
                              >
                                {/* Add New Product button - stays fixed at the top */}
                                <div className="sticky top-0 bg-white z-10">
                                  <button
                                    className="px-4 py-2 rounded-t-[5px] bg-gray-100 text-sm h-[33px] font-normal w-full flex justify-start"
                                    onClick={() => {
                                      alert("Button Click");
                                      setActiveRow(null);
                                      setActiveOptionIndex(-1);
                                    }}
                                  >
                                    Add New Product
                                  </button>
                                </div>
                                {/* Dropdown options */}
                                <div className="overflow-y-auto w-[295px]">
                                  {filteredOptions.map((option, index) => (
                                    <button
                                      key={index}
                                      ref={(el) => {
                                        if (index === activeOptionIndex && el) {
                                          el.scrollIntoView({
                                            block: "nearest",
                                            behavior: "smooth",
                                          });
                                        }
                                      }}
                                      className={`cursor-pointer group border-t w-full flex text-left ${
                                        index === activeOptionIndex
                                          ? "bg-[#3b82f633]"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        setActiveRow(null);
                                        row.hsnCode = option.hsnCode;
                                        row.taxType = option.taxationType;
                                        row.taxType = option.taxType;
                                        row.product = option.productName;
                                        (row.uom = option.unit),
                                          (row.price = option.mrp),
                                          (row.discount = option.discountPer),
                                          (row.tax = option.taxPer),
                                          (row.description =
                                            option.description),
                                          (row.row_id = option.productId),
                                          (row.taxRates = option.taxRates),
                                          (row.amount = calculateAmount(row));
                                        setRows((prevRows) =>
                                          prevRows.map((r, i) =>
                                            i === index ? row : r
                                          )
                                        );
                                        setActiveOptionIndex(-1);
                                      }}
                                    >
                                      <div
                                        className="w-full h-[30px] p-2 border-transparent border-l-4  group-hover:bg-[#3b82f633]"
                                        style={{
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                        }}
                                      >
                                        {option.productName}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      </td>

                      <td className="w-[240px] h-[30px]  border-l flex items-center justify-center ">
                        <input
                          className="text-[12px] font-medium text-[#1C1C1C] w-full h-full text-left px-[3px]"
                          type="text"
                          name="description"
                          placeholder={
                            !isEditing.description ? "Select Description" : ""
                          }
                          value={row.description}
                          ref={(el) => (descriptionRefs.current[index] = el)}
                          onFocus={(e) => {
                            setIsEditing((prev) => ({
                              ...prev,
                              description: true,
                            }));
                            e.target.select();
                          }}
                          onBlur={() =>
                            setIsEditing((prev) => ({
                              ...prev,
                              description: false,
                            }))
                          }
                          onKeyDown={(e) => handleEnter(e, "qty", index)}
                          onChange={(e) =>
                            handleChange(e, "description", index)
                          }
                        />
                      </td>

                      <td className="w-[80px] h-[30px]   flex items-center justify-center border-l">
                        <input
                          className="text-[12px] font-medium text-[#1C1C1C] w-full h-full text-center"
                          type="number"
                          name="qty"
                          ref={(el) => (qtyRefs.current[index] = el)}
                          value={row.qty > 0 ? row.qty : ""}
                          placeholder={!isEditing.qty ? "0" : ""}
                          onFocus={(e) => {
                            setIsEditing((prev) => ({ ...prev, qty: true }));
                            e.target.select();
                          }}
                          onBlur={() =>
                            setIsEditing((prev) => ({ ...prev, qty: false }))
                          }
                          onChange={(e) => handleChange(e, "qty", index)}
                          onKeyDown={(e) => handleEnter(e, "uom", index)}
                        />
                      </td>

                      <td className="w-[80px] h-[30px]   flex items-center justify-center border-l">
                        <input
                          className="text-[12px] font-medium text-[#1C1C1C] w-full h-full text-center"
                          type="text"
                          name="uom"
                          value={row.uom}
                          placeholder={!isEditing.uom ? "PCS" : ""}
                          onFocus={(e) => {
                            setIsEditing((prev) => ({ ...prev, uom: true }));
                            e.target.select();
                          }}
                          onBlur={() =>
                            setIsEditing((prev) => ({ ...prev, uom: false }))
                          }
                          ref={(el) => (uomRefs.current[index] = el)}
                          onChange={(e) => handleChange(e, "uom", index)}
                          onKeyDown={(e) => handleEnter(e, "price", index)}
                        />
                      </td>

                      <td className="w-[80px] h-[30px]  border-l flex items-center justify-center ">
                        <input
                          className="text-[12px] font-medium text-[#1C1C1C] w-full h-full text-right"
                          type="number"
                          name="price"
                          value={row.price}
                          ref={(el) => (priceRefs.current[index] = el)}
                          placeholder={!isEditing.price ? "0.00" : ""}
                          onFocus={(e) => {
                            setIsEditing((prev) => ({ ...prev, price: true }));
                            e.target.select();
                          }}
                          onBlur={() =>
                            setIsEditing((prev) => ({ ...prev, price: false }))
                          }
                          onChange={(e) => handleChange(e, "price", index)}
                          onKeyDown={(e) => handleEnter(e, "discount", index)}
                        />
                      </td>

                      <td className="w-[80px] h-[30px]  border-l flex items-center justify-center">
                        <input
                          className="text-[12px] font-medium text-[#1C1C1C] w-full h-full text-center"
                          ref={(el) => (discountRefs.current[index] = el)}
                          type="number"
                          name="discount"
                          placeholder={!isEditing.discount ? "0%" : ""}
                          onFocus={(e) => {
                            setIsEditing((prev) => ({
                              ...prev,
                              discount: true,
                            }));
                            e.target.select();
                          }}
                          onBlur={() =>
                            setIsEditing((prev) => ({
                              ...prev,
                              discount: false,
                            }))
                          }
                          value={row.discount}
                          onChange={(e) => handleChange(e, "discount", index)}
                          onKeyDown={(e) => handleEnter(e, "tax", index)}
                        />
                      </td>

                      <td className="w-[80px] h-[30px]  border-l flex items-center justify-center ">
                        <input
                          className="text-[12px] font-medium text-[#1C1C1C] w-full h-full text-center"
                          type="number"
                          placeholder={!isEditing.tax ? "0%" : ""}
                          name="tax"
                          value={row.tax}
                          ref={(el) => (taxRefs.current[index] = el)}
                          onFocus={(e) => {
                            setIsEditing((prev) => ({ ...prev, tax: true }));
                            e.target.select();
                          }}
                          onBlur={() =>
                            setIsEditing((prev) => ({ ...prev, tax: false }))
                          }
                          onChange={(e) => handleChange(e, "tax", index)}
                          onKeyDown={(e) => handleEnter(e, "amount", index)}
                        />
                      </td>

                      <td className="w-[100px] h-[30px] border-l flex items-center justify-center">
                        <input
                          className="text-[12px] font-bold w-full h-full text-right pr-[15px]"
                          ref={(el) => (amountRefs.current[index] = el)}
                          onChange={(e) => handleChange(e, "amount", index)}
                          onKeyDown={(e) => handleEnter(e, "addRow", index)}
                          placeholder={calculateAmount(row) ? "" : "0.00"}
                          value={
                            calculateAmount(row)
                              ? calculateAmount(row)
                                  .toString()
                                  .match(/^-?\d+(?:\.\d{0,2})?/)[0]
                              : ""
                          }
                        />
                      </td>

                      <td className="w-[39px] h-[30px]   flex items-center justify-center border">
                        <RiDeleteBin6Line
                          className="cursor-pointer "
                          onClick={() => deleteRow(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex  w-full justify-between font-semibold text-blue-600 text-[14px] mt-[px]">
              <span className="  w-[105px] flex ">
                <button onClick={addNewRow}>+ Add Row</button>
              </span>
              <span className="  w-[170px] flex justify-end">
                <button onClick={openModal}>
                  + Add&nbsp; Multiple&nbsp; Product
                </button>
              </span>

              {/* Conditionally render the modal */}
              {isModalOpen && (
                <AddItemInBulk
                  rows={rows}
                  setRows={setRows}
                  closeModal={closeModal}
                  data={data}
                  calculateAmount={calculateAmount}
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 w-[1074px">
            <div className="flex justify-between  gap-4 w-[1074px]">
              {/* Memo & Attachement Section */}
              <div className="rounded-md w-full max-w-md">
                <textarea
                  className="w-full p-2 border rounded-md h-[150px] bg-[#f1f0f061] placeholder:text-[14px]"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="Memo (Optional)"
                />
                <div className="flex items-center mt-[8px] gap-[10px]">
                  <span className="flex w-fit font-semibold text-[14px]">
                    <label className="text-blue-600 cursor-pointer">
                      <span>+ Attach files (Max 5MB)</span>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                      />
                    </label>
                  </span>
                  {/* Display the selected file names */}
                  {selectedFiles.length > 0 && (
                    <div className="">
                      <ul className="">
                        {selectedFiles.map((fileData, index) => (
                          <li
                            key={index}
                            className="text-sm text-blue-600  cursor-pointer"
                            onClick={() => openFile(fileData.url)}
                          >
                            {fileData.file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Summary Section */}
              <div className="rounded-md max-w-md  w-[300px] text-[13px] font-semibold">
                <div className="flex flex-row-reverse mb-2">
                  <label className="flex justify-between items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Unit price is tax inclusive</span>
                  </label>
                </div>

                <div className="flex justify-between text-[16px]">
                  <span>Sub-total</span>
                  <span>₹ {subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount (-)</span>
                  <span>₹ {totalDiscount?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Before-tax</span>
                  <span>₹ {beforeTaxAmount.toFixed(2)}</span>
                </div>

                {selectedsTaxes?.map((tax, taxIndex) => (
                  <div key={taxIndex} className="flex justify-between">
                    {/* <span>{`${tax.taxType}-${tax.taxPer}%`}</span> */}
                    <span>{`${tax.taxType}-${tax.taxPer}%`}</span>
                    <span>
                      ₹{" "}
                      {
                        tax.taxAmount
                          .toString()
                          .match(/^-?\d+(?:\.\d{0,2})?/)[0]
                      }
                    </span>
                  </div>
                ))}

                <div className="flex justify-between">
                  <span>Rounding Off Amount</span>
                  <span>₹{roundingoffAMount.toFixed(2)}</span>
                </div>
                <hr className="my-2 " />
                <div className="flex justify-between font-bold text-[17px]">
                  <span>Total (INR)</span>
                  <span>₹ {roundTotalAmounts.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
