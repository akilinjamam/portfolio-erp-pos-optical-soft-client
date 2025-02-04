import CustomerList from "../components/dashboard/administration_module/customer_list/CustomerList"
import EmployeeListReport from "../components/dashboard/report_module/employee_list/EmployeeListReport"
import SupplierListReport from "../components/dashboard/report_module/supplier_list/SupplierListReport"
import SalesRecord from "../components/dashboard/salesModule/salesRecord/SalesRecord"
import Stock from "../components/dashboard/salesModule/stock/Stock"
import TodayDueCollection from "../components/dashboard/salesModule/TodayDueCollection/TodayDueCollection"
import TodaySales from "../components/dashboard/salesModule/todaySales/TodaySales"

const reportModuleRoute = [
    {
        path:'customer_list',
        element: <CustomerList/>
      },
      {
        path:'sales_record',
        element: <SalesRecord/>
      },
      {
        path:'employee_list',
        element: <EmployeeListReport/>
      },
      {
        path:'supplier_list',
        element: <SupplierListReport/>
      },
      {
        path:'stock',
        element: <Stock/>
      },
      {
        path:'today_due_collection',
        element: <TodayDueCollection/>
      },
      {
        path:'today_sales',
        element: <TodaySales/>
      },
]

export default reportModuleRoute