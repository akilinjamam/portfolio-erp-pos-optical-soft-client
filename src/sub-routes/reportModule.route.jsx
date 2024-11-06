import CustomerList from "../components/dashboard/administration_module/customer_list/CustomerList"
import EmployeeListReport from "../components/dashboard/report_module/employee_list/EmployeeListReport"
import SalesRecord from "../components/dashboard/salesModule/salesRecord/SalesRecord"
import Stock from "../components/dashboard/salesModule/stock/Stock"

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
        element: <SalesRecord/>
      },
      {
        path:'stock',
        element: <Stock/>
      },
]

export default reportModuleRoute