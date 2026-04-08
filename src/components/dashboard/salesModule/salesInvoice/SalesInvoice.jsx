import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import salesInvoice from "./SalesInvoice.module.scss";
import SalesInvoicTable from "./SalesInvoiceTable";
import CommonLoading from "../../../commonLoagin/CommonLoading";

import {
  addSalesListForSalesInvoice,
  customerInfoForSalesInvoice,
  openModal,
} from "../../../modal/imgmodal/imgModalSlice";

import useUpdateSaleData from "../../../../data/saleData/useUpdateSaleData";
import useGetSalesByInvoice from "../../../../data/saleData/useGetSalesByInvoice";

const SalesInvoice = () => {
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [barcodeId, setBarcodeId] = useState("");
  const [date, setDate] = useState({ from: "", to: "" });

  const { getSalesByInvoice, refetch, isLoading,  isError } = useGetSalesByInvoice(debouncedQuery);
  console.log(getSalesByInvoice)
  const dispatch = useDispatch();

  // 🔹 Debounce the query so we don't search on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // 🔹 Find invoice by query (debounced)
  const findSalesByInvoiceNumber = getSalesByInvoice?.result

  // 🔹 Refetch when date changes
  useEffect(() => {
    refetch();
  }, [refetch, date.from, date.to]);

  
  useEffect(() => {
  let barcode = "";
  let timeout;

  const handleKeyDown = (e) => {
    if (timeout) clearTimeout(timeout);

    if (e.code === "Enter") {
      if (barcode) {
        setBarcodeId(barcode);
        barcode = "";
      }
      return;
    }

    if (e.key !== "Shift") {
      barcode += e.key;

      // Reset barcode if no key is pressed for 80ms
      timeout = setTimeout(() => {
        barcode = "";
      }, 80);
    }
  };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
    document.removeEventListener("keydown", handleKeyDown);
    clearTimeout(timeout);
  };
}, []);

  useEffect(() => {
    setQuery(barcodeId);
  }, [barcodeId]);

  
  useEffect(() => {
    setDeliveryStatus(findSalesByInvoiceNumber?.delivered || "");
  }, [findSalesByInvoiceNumber]);

  const { products, ...getCustomerInfo } = findSalesByInvoiceNumber || {};
  const { mutate: updateDeliveryStatus } = useUpdateSaleData(refetch);

  const updateDelivery = (status) => {
    if (!findSalesByInvoiceNumber?._id) return;
    updateDeliveryStatus({
      id: findSalesByInvoiceNumber._id,
      data: { delivered: status },
    });
  };

  

  if (isError) {
    toast.error("Failed to load sales data. Please try again.");
  }

  return (
   <div className={salesInvoice.superMain}>
     <div className={salesInvoice.main}>
    
      <div className={`${salesInvoice.titleBar} flex_left`}>
        <div className={salesInvoice.titleBarContainer}>
        
          <i
            title="Print Preview"
            className="uil uil-print"
            onClick={() => {
              if (findSalesByInvoiceNumber) {
                dispatch(addSalesListForSalesInvoice(products));
                dispatch(customerInfoForSalesInvoice(getCustomerInfo));
                dispatch(openModal("salesInvoice"));
              } else {
                toast.error("Please scan or type invoice number first");
              }
            }}
          ></i>

          {/* Search by Invoice */}
          <input
            value={query}
            style={{ padding: "0 2px" }}
            placeholder="Search by invoice number"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
          />

         
          {/* Reset Button */}
          <i
            className="uil uil-times"
            onClick={() => {
              setQuery("");
              setBarcodeId("");
              setDate({ from: "", to: "" });
            }}
          ></i>

        </div>
      </div>

      {/* 🔹 Table Section */}
      <div
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          scrollbarWidth: "none",
          width: "99.5%",
          maxHeight: "70vh",
        }}
      >
        {
          !isLoading ? <SalesInvoicTable data={findSalesByInvoiceNumber} /> : 
          <div className="flex_center" style={{ width: "100%", height: "500px" }}>
        <CommonLoading />
      </div>
        }
      </div>

      {/* 🔹 Action Buttons */}
      {findSalesByInvoiceNumber && (
        <div className={`${salesInvoice.adjust} flex_right`}>
          <button
            style={{ marginRight: "10px" }}
            onClick={() => {
              dispatch(addSalesListForSalesInvoice(products));
              dispatch(customerInfoForSalesInvoice(getCustomerInfo));
              dispatch(openModal("updateCustomer"));
            }}
            className={salesInvoice.adjustBtn}
          >
            Update Customer Info
          </button>

          <button
            style={{ marginRight: "10px" }}
            onClick={() => {
              dispatch(addSalesListForSalesInvoice(products));
              dispatch(customerInfoForSalesInvoice(getCustomerInfo));
              dispatch(openModal("salesAdjust"));
            }}
            className={salesInvoice.adjustBtn}
          >
            Adjust Payment
          </button>

          <select
            style={{ marginRight: "10px" }}
            value={deliveryStatus}
            onChange={(e) => {
              setDeliveryStatus(e.target.value);
              updateDelivery(e.target.value);
            }}
          >
            <option value="Delivered">Delivered</option>
            <option value="Not-Delivered">Not-Delivered</option>
          </select>

          <button
            style={{ marginRight: "10px" }}
            onClick={() => updateDelivery(deliveryStatus)}
            className={salesInvoice.adjustBtn}
          >
            Adjust Delivery Status
          </button>
        </div>
      )}
      </div>
     <div className={salesInvoice.mobileMain}>
          Only Available for Desktop Version
      </div>
   </div>
  );
};

export default SalesInvoice;
