import axios from "axios";
import { URL, token } from "./Config";

export async function getAllProduct() {
  try {
    const response = await axios.get(`${URL}/api/v1/products/limitedData/253`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function createInvoces(formdata) {
  try {
    const response = await axios.post(`${URL}/api/v1/bill/create`, formdata, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllSuctomer() {
  try {
    const response = await axios.post(
      `${URL}/api/v1/contacts/getContactsByContactType?page=1&size=100&sortBy=contactId&direction=DESCENDING`,
      {
        companyId: 253,
        contactType: "Customer",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.data.content;
  } catch (error) {
    console.error("Error fetching Customers:", error);
  }
}

export async function getAllInvoices() {
  try {
    const response = await axios.get(`${URL}/api/v1/bill/byCompany/253`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error Fetching Data:", error);
  }
}

export async function getInvoiceById(billId) {
  try {
    const response = await axios.get(`${URL}/api/v1/bill/${billId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error Fetching Data:", error);
  }
}
