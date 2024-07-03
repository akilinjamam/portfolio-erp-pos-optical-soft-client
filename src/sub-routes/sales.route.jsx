import Pos from "../components/dashboard/salesModule/pos/Pos"
import SalesInvoice from "../components/dashboard/salesModule/salesInvoice/SalesInvoice"
import SalesRecord from "../components/dashboard/salesModule/salesRecord/SalesRecord"
import Stock from "../components/dashboard/salesModule/stock/Stock"

const salesRoute = [
    {
      path: 'pos',
      element: <Pos/>
    },
    {
      path: 'sales_record',
      element: <SalesRecord/>
    },
    {
      path: 'sales_invoice',
      element: <SalesInvoice/>
    },
    {
      path: 'stock',
      element: <Stock/>
    },
  ]

  export default salesRoute