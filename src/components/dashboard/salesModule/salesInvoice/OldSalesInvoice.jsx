import { useEffect, useState, useCallback } from "react";
import salesInvoice from "./SalesInvoice.module.scss";
import SalesInvoicTable from "./SalesInvoiceTable";
import { useDispatch } from "react-redux";
import {
  addSalesListForSalesInvoice,
  customerInfoForSalesInvoice,
  openModal,
} from "../../../modal/imgmodal/imgModalSlice";
import { toast } from "react-toastify";
import useUpdateSaleData from "../../../../data/saleData/useUpdateSaleData";
import CommonLoading from "../../../commonLoagin/CommonLoading";
import useOneMonthSaleData from "../../../../data/saleData/useOneMonthSalesData";

const SalesInvoice = () => {
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [query, setQuery] = useState("");
  const [barcodeId, setBarcodeId] = useState("");
  const [date, setDate] = useState({ from: "", to: "" });

  const { saleData, refetch, isLoading } = useOneMonthSaleData(
    "",
    date.from,
    date.to
  );

  const dispatch = useDispatch();

  const findSalesByInvoiceNumber = saleData?.result?.find(
    (f) => f?.invoiceBarcode === query
  );

  // 🔄 Refetch on date change
  useEffect(() => {
    refetch();
  }, [refetch, date]);

  // 🏷️ Handle Barcode Scanning (Debounced)
  useEffect(() => {
    let barcode = "";
    let timeout

    const handleKeyDown = (e) => {
      if (timeout) clearTimeout(timeout);

      if (e.code === "Enter" && barcode) {
        setBarcodeId(barcode);
        barcode = "";
        return;
      }

      if (e.key !== "Shift") {
        barcode += e.key;
        timeout = setTimeout(() => (barcode = ""), 50);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update query when barcode changes
  useEffect(() => {
    setQuery(barcodeId);
  }, [barcodeId]);

  // Sync delivery status with found sale
  useEffect(() => {
    if (findSalesByInvoiceNumber) {
      setDeliveryStatus(findSalesByInvoiceNumber.delivered);
    }
  }, [findSalesByInvoiceNumber]);

  const { products, ...getCustomerInfo } = findSalesByInvoiceNumber || {};
  const { mutate: updateDeliveryStatus } = useUpdateSaleData(refetch);

  // 🛠 Update Delivery Status
  const updateDelivery = useCallback(
    (status) => {
      if (!findSalesByInvoiceNumber?._id) return;
      updateDeliveryStatus({
        id: findSalesByInvoiceNumber._id,
        data: { delivered: status },
      });
    },
    [findSalesByInvoiceNumber, updateDeliveryStatus]
  );

  // ⏳ Loading State
  if (isLoading) {
    return (
      <div className="flex_center" style={{ width: "100%", height: "500px" }}>
        <CommonLoading />
      </div>
    );
  }

  return (
    <div className={salesInvoice.main}>
      {/* Top Bar */}
      <div className={`${salesInvoice.titleBar} flex_left`}>
        <div className={salesInvoice.titleBarContainer}>
          {/* Print Button */}
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
          />

          {/* Search Inputs */}
          <input
            value={query}
            placeholder="Search by invoice number"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: "0 2px" }}
          />

          <label>From:</label>
          <input
            type="date"
            value={date.from}
            onChange={(e) => setDate({ ...date, from: e.target.value })}
          />

          <label>To:</label>
          <input
            type="date"
            value={date.to}
            onChange={(e) => setDate({ ...date, to: e.target.value })}
          />

          {/* Clear Filters */}
          <i
            className="uil uil-times"
            onClick={() => {
              setQuery("");
              setBarcodeId("");
              setDate({ from: "", to: "" });
            }}
          />

          {/* Data Loading Info */}
          {saleData?.result?.length > 0 ? (
            <span
              style={{
                fontSize: "14px",
                marginLeft: "10px",
                color: "#6B7280",
              }}
            >
              Data Loaded...
            </span>
          ) : (
            <span
              style={{
                fontSize: "14px",
                marginLeft: "10px",
                color: "#6B7280",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            >
              Loading...
            </span>
          )}

          {/* Inline Keyframes for Pulse Animation */}
          <style>
            {`
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
              }
            `}
          </style>
        </div>
      </div>

      {/* Table Section */}
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

      {/* Adjustments Section */}
      <div className={`${salesInvoice.adjust} flex_right`}>
        {findSalesByInvoiceNumber && (
          <div>
            <button
              className={salesInvoice.adjustBtn}
              style={{ marginRight: "10px" }}
              onClick={() => {
                dispatch(addSalesListForSalesInvoice(products));
                dispatch(customerInfoForSalesInvoice(getCustomerInfo));
                dispatch(openModal("updateCustomer"));
              }}
            >
              Update Customer Info
            </button>

            <button
              className={salesInvoice.adjustBtn}
              style={{ marginRight: "10px" }}
              onClick={() => {
                dispatch(addSalesListForSalesInvoice(products));
                dispatch(customerInfoForSalesInvoice(getCustomerInfo));
                dispatch(openModal("salesAdjust"));
              }}
            >
              Adjust Payment
            </button>

            <select
              style={{ marginRight: "10px" }}
              value={deliveryStatus}
              onChange={(e) => setDeliveryStatus(e.target.value)}
            >
              <option value="Delivered">Delivered</option>
              <option value="Not-Delivered">Not-Delivered</option>
            </select>

            <button
              className={salesInvoice.adjustBtn}
              style={{ marginRight: "10px" }}
              onClick={() => updateDelivery(deliveryStatus)}
            >
              Adjust Delivery Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesInvoice;
