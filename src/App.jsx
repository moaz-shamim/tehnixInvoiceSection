import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import InvoiceSection from "./InvoiceSection";
import CreateInvoice from "./CreateInvoiceSection";
import AddItemInBulk from "./components/AddItemInBulk";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvoiceSection />}></Route>
        <Route path="createInvoice" element={<CreateInvoice />}></Route>
        <Route path="createInvoice/:billId" element={<CreateInvoice />}></Route>
        <Route path="addInbulk" element={<AddItemInBulk />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
