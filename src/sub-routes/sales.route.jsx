import GlassStock from "../components/dashboard/salesModule/glassStock/GlassStock"
import ManualSales from "../components/dashboard/salesModule/manualSales/ManualSales"
import Pos from "../components/dashboard/salesModule/pos/Pos"
import SalesInvoice from "../components/dashboard/salesModule/salesInvoice/SalesInvoice"
import SalesRecord from "../components/dashboard/salesModule/salesRecord/SalesRecord"
import Stock from "../components/dashboard/salesModule/stock/Stock"
import TodayDueCollection from "../components/dashboard/salesModule/TodayDueCollection/TodayDueCollection"
import TodaySales from "../components/dashboard/salesModule/todaySales/TodaySales"

const salesRoute = [
    {
      path: 'pos',
      element: <Pos/>
    },
    {
      path: 'manual_sales',
      element: <ManualSales/>
    },
    {
      path: 'sales_record',
      element: <SalesRecord/>
    },
    {
      path: 'today_sales',
      element: <TodaySales/>
    },
    {
      path: 'today_due_collection',
      element: <TodayDueCollection/>
    },
    {
      path: 'sales_invoice',
      element: <SalesInvoice/>
    },
    {
      path: 'stock',
      element: <Stock/>
    },
    {
      path: 'glass_stock',
      element: <GlassStock/>
    },
  ]

  export default salesRoute