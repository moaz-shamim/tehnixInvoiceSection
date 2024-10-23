import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

const AddItemInBulk = ({ closeModal, data, setRows, calculateAmount }) => {
  const [selectedItems, setSelectedItems] = useState([]); // State for multiple selected items
  const [quantity, setQuantity] = useState(1); // Default quantity for new item selection
  const [filteredItems, setFilteredItems] = useState(data); // State for filtered items
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const [focusedIndex, setFocusedIndex] = useState(-1); // Track focused item index
  const [checkedItems, setCheckedItems] = useState({}); // Track checked items
  const inputRef = useRef(null); // Ref to focus back on the search input
  const itemRefs = useRef([]); // Ref to track each item in the list

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Filter the items based on the search input (product name or barcode)
    const filtered = data.filter(
      (item) =>
        item?.productName
          ?.replace(/\s+/g, "") // Remove spaces
          .replace(/[^a-zA-Z0-9]/g, "") // Remove special characters (only keep letters and numbers)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        item?.barcode?.toLowerCase().startsWith(value)
    );

    setFilteredItems(filtered);

    // Reset focus index on search query change
    setFocusedIndex(-1);
  };

  // Handle key events for navigation and item selection
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault(); // Prevent default tab behavior
      if (filteredItems.length > 0) {
        if (focusedIndex === -1) {
          // If no item is focused, focus on the first item
          setFocusedIndex(0);
          scrollToItem(0); // Scroll to the first item
        } else {
          // If an item is focused, toggle its checkbox
          const focusedItem = filteredItems[focusedIndex];
          if (e.key === "Enter") {
            handleCheckboxChange(focusedItem);
          }
        }
      }
    } else if (e.key === "ArrowDown") {
      setFocusedIndex((prevIndex) => {
        const newIndex = Math.min(prevIndex + 1, filteredItems.length - 1);
        scrollToItem(newIndex); // Scroll to the new index
        return newIndex;
      });
      // console.log(focusedIndex);
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prevIndex) => {
        const newIndex = Math.max(prevIndex - 1, 0);
        scrollToItem(newIndex); // Scroll to the new index
        return newIndex;
      });
    } else if (e.key === " ") {
      // Spacebar key
      e.preventDefault(); // Prevent the default scroll behavior
      if (focusedIndex >= 0 && focusedIndex < filteredItems.length) {
        const focusedItem = filteredItems[focusedIndex];
        handleCheckboxChange(focusedItem); // Toggle checkbox for focused item
      }
    }
  };

  // Function to handle the checkbox state
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find(
        (selected) => selected.productId === item.productId
      );
      if (existingItem) {
        // If item already exists, remove it from selectedItems
        return prevItems.filter(
          (selected) => selected.productId !== item.productId
        );
      } else {
        // If item does not exist, add it to selectedItems with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const addAllToRows = () => {
    setRows((prevRows) => {
      const newRows = [...prevRows];

      selectedItems?.forEach((selectedItem) => {
        // Check if the product name is non-empty (this will avoid adding empty rows)
        if (selectedItem.productName) {
          const existingRow = newRows.find(
            (row) => row.product === selectedItem.productName
          );

          // Prepare a new row object
          const newRow = {
            row_id: selectedItem.productId,
            product: selectedItem.productName,
            description: selectedItem.description,
            qty: selectedItem.quantity,
            uom: selectedItem.unit,
            price: selectedItem.mrp,
            discount: selectedItem.discountPer,
            tax: selectedItem.taxPer,
            taxRates: selectedItem.taxRates,
            hsnCode: selectedItem.hsnCode,
            taxType: selectedItem.taxType,
            taxationType: selectedItem.taxationType,
            billedQty: selectedItem.quantity,
            discountAmount: "",
            taxableValue: "",
            freeQty: 0,
            alternateUnit: "box",
            convFactor: 1,
            branchId: 1,
            isDefault: true,
          };

          if (existingRow) {
            // If the item already exists in rows, update its quantity
            existingRow.qty =
              Number(existingRow.qty) + Number(selectedItem.quantity); // Ensure qty is treated as a number
            // Calculate the new amount using the calculateAmount function
            existingRow.amount = calculateAmount(existingRow);
          } else {
            // If the item is new to rows, calculate the amount and add it
            newRow.amount = calculateAmount(newRow);
            newRows.push(newRow);
          }
        }
      });

      return newRows.filter((row) => row.product); // Filter out any rows without a valid product name
    });

    // Clear selectedItems after adding them to rows
    setSelectedItems([]);

    // Close the modal
    closeModal();
  };

  const increaseQuantity = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    // Update the selectedItems array
    setSelectedItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.productId === itemId && item.quantity >= 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );

    // Update the rows array with the decreased quantity
    setRows((prevRows) =>
      prevRows
        .map((row) =>
          row.product ===
          selectedItems.find((item) => item.productId === itemId)?.name
            ? {
                ...row,
                qty: row.qty - 1,
                amount: (row.qty - 1) * row.price, // Adjust amount based on new quantity
              }
            : row
        )
        .filter(
          (row) => (row.qty > 0 && row.product) || row.isDefault // Don't delete if it's a default row
        )
    );
  };

  // Scroll the focused item into view
  const scrollToItem = (index) => {
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  // Handle mouse click event on an item in the list
  const handleItemClick = (index) => {
    // console.log(index);

    setFocusedIndex(index); // Set the focused item index
    // console.log(focusedIndex);

    scrollToItem(index); // Scroll to the clicked item

    const focusedItem = filteredItems[index];

    handleCheckboxChange(focusedItem);
    inputRef.current.focus(); // Refocus the input to allow arrow key navigation again
  };

  return (
    <div className="fixed inset-0 flex w-full justify-center items-center bg-black bg-opacity-50  h-screen  z-1 top-0 left-0">
      {/* Modal content */}
      <div className="border bg-white w-[65%] rounded-[5px] z-10 overflow-auto text-gray-900">
        <div className="flex justify-between items-center border px-[10px] py-[10px]">
          <h2 className="font-semibold text-[14px]">Add Items in Bulk</h2>
          <button onClick={closeModal}>
            <IoClose className="w-[30px] h-[30px] hover:text-[#ff4444b3]" />
          </button>
        </div>

        <div className="flex justify-between h-[420px]">
          {/* Left Side - Item List and Search */}
          <div className="w-1/2 p-4 border">
            {/* Search Box */}
            <div className="flex items-center border rounded-md p-2 mb-[10px]">
              <input
                type="text"
                ref={inputRef} // Use ref to focus back on input
                placeholder="Type to search or scan the barcode of the item"
                className="w-full focus:outline-none text-[12px]"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown} // Add keydown handler
                // onFocus={() => setFocusedIndex(-1)}
              />
            </div>

            {/* Item List */}
            <div className="overflow-y-auto max-h-[342px]">
              <div className="border rounded-md text-[12px]">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.productId}
                    ref={(el) => (itemRefs.current[index] = el)} // Assign ref to each item
                    onClick={() => handleItemClick(index)}
                    className={`flex justify-between items-center p-3 border-b cursor-pointer hover:bg-[#3b82f633] ${
                      focusedIndex === index ? "bg-[#3b82f633]" : ""
                    }`} // Highlight the focused item
                  >
                    <div className="flex flex-col">
                      <span>{item.productName}</span>
                      <span className="text-gray-600  text-[10px]">
                        Rate: ₹{item.mrp}.00
                      </span>
                    </div>
                    <div className="flex gap-[5px]">
                      <input
                        type="checkbox"
                        checked={selectedItems.some(
                          (selected) => selected.productId === item.productId
                        )} // Check if item is in selectedItems
                        onClick={(e) => e.stopPropagation()} // Prevent triggering handleItemClick on checkbox click
                        onChange={() => handleCheckboxChange(item)} // Toggle item in selectedItems
                        className="ml-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Selected Items */}
          <div className="w-1/2 p-4 border flex flex-col justify-between">
            <div>
              <h3 className="font-semibold mb-4 text-[14px]">
                Selected Items: {selectedItems.length}
              </h3>
              <div className="overflow-y-auto max-h-[306px]">
                {selectedItems.length > 0 ? (
                  selectedItems.map((item) => (
                    <div
                      key={item.productId}
                      className="border rounded-md pl-4 pr-[10px] py-[6px] mb-2 group"
                    >
                      {/* Selected Item Details */}
                      <div className="flex justify-between items-center text-[12px] ">
                        <div className="flex flex-col w-[200px] ">
                          <span>{item.productName}</span>
                          <span className="text-gray-600 text-[10px]">
                            Rate: ₹{item.mrp}.00
                          </span>
                        </div>
                        <div className="flex justify-center items-center gap-[12px]">
                          <div>
                            <button
                              onClick={() => decreaseQuantity(item.productId)}
                            >
                              <FiMinusCircle />
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                              onClick={() => increaseQuantity(item.productId)}
                            >
                              <FiPlusCircle />
                            </button>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* This button will be shown only on hover */}
                            <button
                              onClick={() =>
                                setSelectedItems((prevItems) =>
                                  prevItems.filter(
                                    (product) =>
                                      product.productId !== item.productId
                                  )
                                )
                              }
                            >
                              <IoCloseSharp className="w-[18px] h-[18px] text-[#ff4444b3]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-[12px]">No items selected</p>
                )}
              </div>
            </div>

            {/* Add Items Button */}
            <div className="mt-4 flex gap-[10px]">
              <button
                type="button"
                className="w-[102px] h-[35px] p-[10px] gap-[10px] border border-opacity-[0.8] bg-[#006AFF] rounded-[5px] border-[#999999]"
                onClick={addAllToRows}
              >
                <div className="text-[12px] leading-[14.52px] font-normal no-underline text-[#FFFFFF]">
                  Add Items
                </div>
              </button>
              <button
                type="button"
                className="w-[102px] h-[35px] p-[10px] gap-[10px] border border-opacity-[0.8] bg-gray-200 rounded-[5px] border-[#999999]"
                onClick={() => {
                  setSelectedItems([]);
                  // Close the modal
                  closeModal();
                }}
              >
                <div className="text-[12px] leading-[14.52px] font-normal no-underline text-gray-950">
                  Cancel
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemInBulk;
