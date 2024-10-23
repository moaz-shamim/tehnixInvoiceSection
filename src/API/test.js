  
  [
    {
        "contactId": 841,
        "companyId": 253,
        "contactType": "Customer",
        "contactCode": "",
        "contactName": "zabolo",
        "businessType": "Partnership",
        "businessName": "zabolo",
        "workPhone": "",
        "workEmail": "",
        "fax": "",
        "website": "",
        "title": "Mr",
        "contactPerson": "kunal",
        "designation": "",
        "mobileNo": "8425636363",
        "isWhatsapp": 0,
        "emailId": "",
        "address": "patna",
        "city": "patna",
        "pinCode": "800001",
        "state": "bihar",
        "country": "india",
        "shippingAddress": "patna",
        "shippingCity": "patna",
        "shippingPinCode": "800001",
        "shippingState": "bihar",
        "shippingCountry": "india",
        "panNo": "",
        "taxRegNo": "",
        "aadhaarNo": null,
        "taxationType": "",
        "gstin": "N/A",
        "gstinType": "N/A",
        "stateCode": "04",
        "tdsApplicable": 0,
        "ledgerId": 41,
        "accountId": 3,
        "useAs": "Supplier",
        "openingBalance": 0,
        "openingType": "Credit",
        "status": "Active",
        "created_by": 72,
        "creationDate": "2024-10-16T17:14:41",
        "defaultPayment": "",
        "paymentTerms": "Due on Receipt",
        "notifications": "None",
        "currency": "INR",
        "creditLimit": 0,
        "partyDiscPer": 0,
        "customerType": "Distributor",
        "remarks": null,
        "portalAccess": 0,
        "loginEmail": null,
        "loginPassword": null,
        "profilePicture": null
    },
   
  ]


  [
    {
      "productId": 7028,
      "productName": "FOGG SPRAY",
      "barcode": "112311",
      "categoryName": "importTest1",
      "unit": "Box",
      "hsnCode": "-1",
      "mrp": 1,
      "taxPer": 0,
      "taxType": null,
      "discountPer": 0,
      "taxationType": "Exclusive",
      "sellingRate": 3,
      "openingStock": 0,
      "description": "http://192.168.0.113:8081/uploads/products/82/82.svg",
      "taxRates": null
    }
    ]


    [
        {
            "taxType": "CGST",
            "rate": 2.5,
            "amount": 1.74375
        },
        {
            "taxType": "SGST",
            "rate": 2.5,
            "amount": 1.74375
        }
    ]


  


    const calculateTaxes = () => {
      // const isIntraState = selectedCustomer.state === "Bihar";
      // setIntraState(isIntraState);
      // setInterState(!isIntraState);
  
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
  
          // Iterate over each selected tax
          selectedTaxes.forEach((tax) => {
            // Check if a group for the same taxType and rate already exists
            const existingGroup = taxGroups.find(
              (group) => group.taxType === tax.taxType && group.rate === tax.rate
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
              // If it doesn't exist, create a new group and push it to taxGroups
              taxGroups.push({
                taxType: tax.taxType,
                rate: tax.rate,
                amount:
                  ((row.price * row.qty -
                    (row.qty * row.price * row.discount) / 100) *
                    tax.rate) /
                  100, // Adjust the calculation logic if necessary
              });
              // ((product.qty * product.price - (product.qty * product.price * product.discount) / 100) * product.tax) /100);
            }
          });
        }
      });
  
      // Set selectedsTaxes directly if you want to render it separately
      setSelectedsTaxes(taxGroups);
    };
  
  

    const calculateTaxess = () => {
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
          const taxableValue = row.price * row.qty - (row.qty * row.price * row.discount) / 100;
    
          selectedTaxes.forEach((tax) => {
            const taxName = `${tax.taxType} ${tax.rate}%`; // Generate tax name
    
            // Check if a group for the same taxType and rate already exists
            const existingGroup = taxGroups.find(
              (group) => group.taxType === tax.taxType && group.rate === tax.rate
            );
    
            if (existingGroup) {
              // If the tax group exists, update the amount for that group
              existingGroup.amount =
                existingGroup.amount + (taxableValue * tax.rate) / 100;
            } else {
              // If it doesn't exist, create a new group and push it to taxGroups
              taxGroups.push({
                taxType: tax.taxType,
                rate: tax.rate,
                amount: (taxableValue * tax.rate) / 100,
                taxableValue: taxableValue, // Add taxable value to the object
                taxName: taxName, // Add tax name to the object
              });
            }
          });
        }
      });
    
      // Set selectedsTaxes with the new keys
      setSelectedsTaxes(taxGroups);
    };
    







    // const data = [
  //   {
  //     productId: 217,
  //     productName: "ROYEL ZAHIDI KHAJUR 500 GM",
  //     barcode: "8901908708659",
  //     categoryName: "FMCG",
  //     unit: "Pcs",
  //     hsnCode: "",
  //     mrp: 230.0,
  //     taxPer: 12,
  //     taxType: "GST",
  //     discountPer: 0.0,
  //     taxationType: "Inclusive",
  //     sellingRate: 160.0,
  //     openingStock: 11.0,
  //     description: "“refreshing”, “crisp”, “luxurious” or “hearty”",
  //     taxRates: [
  //       {
  //         id: 36,
  //         taxName: "CGST - 6%",
  //         taxType: "CGST",
  //         rate: 6.0,
  //       },
  //       {
  //         id: 37,
  //         taxName: "SGST - 6%",
  //         taxType: "SGST",
  //         rate: 6.0,
  //       },
  //       {
  //         id: 38,
  //         taxName: "IGST - 12%",
  //         taxType: "IGST",
  //         rate: 12.0,
  //       },
  //     ],
  //   },
  //   {
  //     productId: 218,
  //     productName: "KESH KING SHAMPOO 80ML",
  //     barcode: "8901248240260",
  //     categoryName: "FMCG",
  //     unit: "Pcs",
  //     hsnCode: "",
  //     mrp: 65.0,
  //     taxPer: 12,
  //     taxType: "GST",
  //     discountPer: 2.0,
  //     taxationType: "Inclusive",
  //     sellingRate: 65.0,
  //     openingStock: 1.0,
  //     description: "“refreshing”, “crisp”, “luxurious” or “hearty”",
  //     taxRates: [
  //       {
  //         id: 36,
  //         taxName: "CGST - 6%",
  //         taxType: "CGST",
  //         rate: 6.0,
  //       },
  //       {
  //         id: 37,
  //         taxName: "SGST - 6%",
  //         taxType: "SGST",
  //         rate: 6.0,
  //       },
  //       {
  //         id: 38,
  //         taxName: "IGST - 12%",
  //         taxType: "IGST",
  //         rate: 12.0,
  //       },
  //     ],
  //   },
  //   {
  //     productId: 219,
  //     productName: "TRESEMME SHAMPOO 185 ML",
  //     barcode: "8901030705915",
  //     categoryName: "FMCG",
  //     unit: "Pcs",
  //     hsnCode: "",
  //     mrp: 190.0,
  //     taxPer: 18,
  //     taxType: null,
  //     discountPer: 2.5,
  //     taxationType: "Inclusive",
  //     sellingRate: 190.0,
  //     openingStock: 3.0,
  //     description: "“refreshing”, “crisp”, “luxurious” or “hearty”",
  //     taxRates: [
  //       {
  //         id: 41,
  //         taxName: "CGST - 9%",
  //         taxType: "CGST",
  //         rate: 9.0,
  //       },
  //       {
  //         id: 43,
  //         taxName: "IGST - 18",
  //         taxType: "IGST",
  //         rate: 18.0,
  //       },
  //       {
  //         id: 44,
  //         taxName: "SGST - 9%",
  //         taxType: "SGST",
  //         rate: 9.0,
  //       },
  //     ],
  //   },
  //   {
  //     productId: 220,
  //     productName: "INDULEKHA BRINGHA HAIR CLEANSER SHAMPOO 100ML",
  //     barcode: "8901030677106",
  //     categoryName: "FMCG",
  //     unit: "Pcs",
  //     hsnCode: "",
  //     mrp: 135.0,
  //     taxPer: 5,
  //     taxType: null,
  //     discountPer: 2.5,
  //     taxationType: "Inclusive",
  //     sellingRate: 135.0,
  //     openingStock: 2.0,
  //     description: "“refreshing”, “crisp”, “luxurious” or “hearty”",
  //     taxRates: [
  //       {
  //         id: 45,
  //         taxName: "CGST - 2.5%",
  //         taxType: "CGST",
  //         rate: 2.5,
  //       },
  //       {
  //         id: 46,
  //         taxName: "SGST - 2.5%",
  //         taxType: "SGST",
  //         rate: 2.5,
  //       },
  //       {
  //         id: 47,
  //         taxName: "IGST - 5%",
  //         taxType: "IGST",
  //         rate: 5.0,
  //       },
  //     ],
  //   },
  //   {
  //     productId: 221,
  //     productName: "INDULEKHA BRINGHA HAIR CLEANSER SHAMPOO 200ML",
  //     barcode: "8901030670688",
  //     categoryName: "FMCG",
  //     unit: "Pcs",
  //     hsnCode: "",
  //     mrp: 234.0,
  //     taxPer: 5,
  //     taxType: null,
  //     discountPer: 0.0,
  //     taxationType: "Inclusive",
  //     sellingRate: 224.0,
  //     openingStock: 3.0,
  //     description: "“refreshing”, “crisp”, “luxurious” or “hearty”",
  //     taxRates: [
  //       {
  //         id: 45,
  //         taxName: "CGST - 2.5%",
  //         taxType: "CGST",
  //         rate: 2.5,
  //       },
  //       {
  //         id: 46,
  //         taxName: "SGST - 2.5%",
  //         taxType: "SGST",
  //         rate: 2.5,
  //       },
  //       {
  //         id: 47,
  //         taxName: "IGST - 5%",
  //         taxType: "IGST",
  //         rate: 5.0,
  //       },
  //     ],
  //   },
  //   {
  //     productId: 222,
  //     productName: "HEAD&SHOULDER CONDITIONER 80ML",
  //     barcode: "4902430716871",
  //     categoryName: "FMCG",
  //     unit: "Pcs",
  //     hsnCode: "",
  //     mrp: 75.0,
  //     taxPer: 5,
  //     taxType: null,
  //     discountPer: 7.0,
  //     taxationType: "Inclusive",
  //     sellingRate: 75.0,
  //     openingStock: 0.0,
  //     description: "“refreshing”, “crisp”, “luxurious” or “hearty”",
  //     taxRates: [
  //       {
  //         id: 45,
  //         taxName: "CGST - 2.5%",
  //         taxType: "CGST",
  //         rate: 2.5,
  //       },
  //       {
  //         id: 46,
  //         taxName: "SGST - 2.5%",
  //         taxType: "SGST",
  //         rate: 2.5,
  //       },
  //       {
  //         id: 47,
  //         taxName: "IGST - 5%",
  //         taxType: "IGST",
  //         rate: 5.0,
  //       },
  //     ],
  //   },
  // ];





  
  // const customerData = [
  //   {
  //     stateCode: "10",
  //     contactId: 832,
  //     companyId: 254,
  //     businessName: "Riya Kapoor",
  //     address: "456 Oak Rd, Patna, Bihar 800002",
  //     shippingAddress: "Patna, Bihar",
  //     shippingCity: "Patna",
  //     shippingPinCode: "800002",
  //     shippingState: "Bihar",
  //     shippingCountry: "India",
  //     workEmail: "riya.kapoor@example.com",
  //     workPhone: "555-0456",
  //     state: "Bihar",
  //   },
  //   {
  //     stateCode: "19",
  //     contactId: 833,
  //     companyId: 255,
  //     businessName: "Anil Kumar",
  //     address: "789 Pine Ave, Patna, Bihar 800003",
  //     shippingAddress: "Patna, Bihar",
  //     shippingCity: "Patna",
  //     shippingPinCode: "800003",
  //     shippingState: "Bihar",
  //     shippingCountry: "India",
  //     workEmail: "anil.kumar@example.com",
  //     workPhone: "555-0789",
  //     state: "Bihar",
  //   },
  //   {
  //     stateCode: "10",
  //     contactId: 834,
  //     companyId: 256,
  //     businessName: "Sneha Patel",
  //     address: "321 Birch St, Patna, Bihar 800004",
  //     shippingAddress: "Patna, Bihar",
  //     shippingCity: "Patna",
  //     shippingPinCode: "800004",
  //     shippingState: "Bihar",
  //     shippingCountry: "India",
  //     workEmail: "sneha.patel@example.com",
  //     workPhone: "555-0912",
  //     state: "Bihar",
  //   },
  //   {
  //     stateCode: "10",
  //     contactId: 835,
  //     companyId: 257,
  //     businessName: "Vikram Singh",
  //     address: "654 Cedar Pl, Patna, Bihar 800005",
  //     shippingAddress: "Patna, Bihar",
  //     shippingCity: "Patna",
  //     shippingPinCode: "800005",
  //     shippingState: "Bihar",
  //     shippingCountry: "India",
  //     workEmail: "vikram.singh@example.com",
  //     workPhone: "555-0345",
  //     state: "Bihar",
  //   },
  //   {
  //     stateCode: "15",
  //     contactId: 836,
  //     companyId: 258,
  //     businessName: "Pooja Verma",
  //     address: "987 Elm St, Patna, Bihar 800006",
  //     shippingAddress: "Patna, Bihar",
  //     shippingCity: "Patna",
  //     shippingPinCode: "800006",
  //     shippingState: "Bihar",
  //     shippingCountry: "India",
  //     workEmail: "pooja.verma@example.com",
  //     workPhone: "555-0678",
  //     state: "Bihar",
  //   },
  //   {
  //     stateCode: "10",
  //     contactId: 837,
  //     companyId: 259,
  //     businessName: "Rahul Yadav",
  //     address: "135 Willow Dr, Patna, Bihar 800007",
  //     shippingAddress: "Lucknow, Uttar Pradesh",
  //     shippingCity: "Lucknow",
  //     shippingPinCode: "226001",
  //     shippingState: "Uttar Pradesh",
  //     shippingCountry: "India",
  //     workEmail: "rahul.yadav@example.com",
  //     workPhone: "555-0123",
  //     state: "Uttar Pradesh",
  //   },
  //   {
  //     stateCode: "09",
  //     contactId: 838,
  //     companyId: 260,
  //     businessName: "Nisha Sharma",
  //     address: "246 Spruce Ct, Patna, Bihar 800008",
  //     shippingAddress: "Mumbai, Maharashtra",
  //     shippingCity: "Mumbai",
  //     shippingPinCode: "400001",
  //     shippingState: "Maharashtra",
  //     shippingCountry: "India",
  //     workEmail: "nisha.sharma@example.com",
  //     workPhone: "555-0543",
  //     state: "Maharashtra",
  //   },
  //   {
  //     stateCode: "1",

  //     contactId: 839,
  //     companyId: 261,
  //     businessName: "Manoj Mishra",
  //     address: "369 Maple Ave, Patna, Bihar 800009",
  //     shippingAddress: "Bangalore, Karnataka",
  //     shippingCity: "Bangalore",
  //     shippingPinCode: "560001",
  //     shippingState: "Karnataka",
  //     shippingCountry: "India",
  //     workEmail: "manoj.mishra@example.com",
  //     workPhone: "555-0987",
  //     state: "Karnataka",
  //   },
  //   {
  //     stateCode: "11",

  //     contactId: 840,
  //     companyId: 262,
  //     businessName: "Deepika Singh",
  //     address: "147 Ash St, Patna, Bihar 800010",
  //     shippingAddress: "Ahmedabad, Gujarat",
  //     shippingCity: "Ahmedabad",
  //     shippingPinCode: "380001",
  //     shippingState: "Gujarat",
  //     shippingCountry: "India",
  //     workEmail: "deepika.singh@example.com",
  //     workPhone: "555-1234",
  //     state: "Gujarat",
  //   },
  //   {
  //     stateCode: "10",
  //     contactId: 841,
  //     companyId: 263,
  //     businessName: "Kunal Joshi",
  //     address: "258 Fir Rd, Patna, Bihar 800011",
  //     shippingAddress: "Kolkata, West Bengal",
  //     shippingCity: "Kolkata",
  //     shippingPinCode: "700001",
  //     shippingState: "West Bengal",
  //     shippingCountry: "India",
  //     workEmail: "kunal.joshi@example.com",
  //     workPhone: "555-5678",
  //     state: "West Bengal",
  //   },
  // ];