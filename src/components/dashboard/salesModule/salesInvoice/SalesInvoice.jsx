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
        
        {/* 🔹 Top Search & Tool Bar */}
        <div className={salesInvoice.titleBar}>
          <div className={salesInvoice.searchGroup}>
            <i 
              className={`uil uil-search ${salesInvoice.searchIcon}`}
            ></i>
            <input
              className={salesInvoice.invoiceInput}
              value={query}
              placeholder="Search by invoice number..."
              type="text"
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <i
                className={`uil uil-times ${salesInvoice.clearBtn}`}
                onClick={() => {
                  setQuery("");
                  setBarcodeId("");
                  setDate({ from: "", to: "" });
                }}
              ></i>
            )}
          </div>

          <div className={salesInvoice.actionIcons}>
            <button 
              className={salesInvoice.printBtn}
              onClick={() => {
                if (findSalesByInvoiceNumber) {
                  dispatch(addSalesListForSalesInvoice(products));
                  dispatch(customerInfoForSalesInvoice(getCustomerInfo));
                  dispatch(openModal("salesInvoice"));
                } else {
                  toast.error("Please scan or type invoice number first");
                }
              }}
            >
              <i className="uil uil-print"></i> Print Preview
            </button>
          </div>
        </div>

        {/* 🔹 Table Section */}
        <div className={salesInvoice.tableContainer}>
          {!isLoading ? (
            <SalesInvoicTable data={findSalesByInvoiceNumber} />
          ) : (
            <div className={salesInvoice.loaderContainer}>
              <CommonLoading />
            </div>
          )}
        </div>

        {/* 🔹 Action Footer */}
        {findSalesByInvoiceNumber && (
          <div className={salesInvoice.footerActions}>
            <div className={salesInvoice.adjustBtn}>
              <button
                onClick={() => {
                  dispatch(addSalesListForSalesInvoice(products));
                  dispatch(customerInfoForSalesInvoice(getCustomerInfo));
                  dispatch(openModal("updateCustomer"));
                }}
                className={salesInvoice.secondaryBtn}
              >
                Update Customer
              </button>

              <button
                onClick={() => {
                  dispatch(addSalesListForSalesInvoice(products));
                  dispatch(customerInfoForSalesInvoice(getCustomerInfo));
                  dispatch(openModal("salesAdjust"));
                }}
                className={salesInvoice.secondaryBtn}
              >
                Adjust Payment
              </button>
            </div>

            <div className={salesInvoice.deliveryGroup}>
              <select
                className={salesInvoice.statusSelect}
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
                onClick={() => updateDelivery(deliveryStatus)}
                className={salesInvoice.primaryBtn}
              >
                Update Status
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={salesInvoice.mobileMain}>
         <i className="uil uil-desktop"></i>
         <p>Desktop View Required</p>
      </div>
    </div>
  );
};

export default SalesInvoice;
