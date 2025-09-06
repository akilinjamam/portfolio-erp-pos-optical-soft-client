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
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";

const SalesInvoice = () => {
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [barcodeId, setBarcodeId] = useState("");
  const [date, setDate] = useState({ from: "", to: "" });

  const { saleData, refetch, isLoading, isFetching, isError } =
    useOneMonthSaleData("", date.from, date.to);

  const dispatch = useDispatch();

  // 🔹 Debounce the query so we don't search on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // 🔹 Find invoice by query (debounced)
  const findSalesByInvoiceNumber = saleData?.result?.find(
    (f) => f?.invoiceBarcode === debouncedQuery
  );

  // 🔹 Refetch when date changes
  useEffect(() => {
    refetch();
  }, [refetch, date.from, date.to]);

  // 🔹 Barcode scanner listener (with cleanup)
  useEffect(() => {
    let barcode = "";
    let interval

    const handleKeyDown = (e) => {
      if (interval) clearInterval(interval);

      if (e.code === "Enter") {
        if (barcode) {
          setBarcodeId(barcode);
          barcode = "";
          return;
        }
      }
      if (e.key !== "Shift") {
        barcode += e.key;
        interval = setInterval(() => (barcode = ""), 20);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
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

  if (isLoading) {
    return (
      <div className="flex_center" style={{ width: "100%", height: "500px" }}>
        <CommonLoading />
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load sales data. Please try again.");
  }

  return (
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

          {/* Date Filters */}
          <label>From:</label>
          <input
            value={date.from}
            type="date"
            onChange={(e) => setDate({ ...date, from: e.target.value })}
          />
          <label>To:</label>
          <input
            value={date.to}
            type="date"
            onChange={(e) => setDate({ ...date, to: e.target.value })}
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

          {/* Loading / Data Info */}
          {isFetching ? (
            <span style={{color:'gray', marginLeft:'10px', animation: "pulse 1.5s ease-in-out infinite", fontSize:'14px'}} >
              Refreshing...
            </span>
          ) : saleData?.result?.length > 0 ? (
            <span style={{color:'green', marginLeft:'10px', fontSize:'14px'}} className="text-green-600 ml-2">
              Data Loaded ({saleData.result.length})
            </span>
          ) : (
            <span style={{color:'gray', marginLeft:'10px', fontSize:'14px'}} className="text-gray-500 ml-2">No data found</span>
          )}
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
        <SalesInvoicTable data={findSalesByInvoiceNumber} />
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
  );
};

export default SalesInvoice;
