import DailyCashExpensesList from "../components/dashboard/accounts_module/DailyCashExpensesList/DailyCashExpensesList"
import ProfitExpenseList from "../components/dashboard/accounts_module/ProfitExpenseList/ProfitExpenseList"
import VendorList from "../components/dashboard/accounts_module/VendorList/VendorList"
import CustomerList from "../components/dashboard/administration_module/customer_list/CustomerList"
import PayrollList from "../components/dashboard/hrAndPayroll/PayrollList/PayrollList"
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
      {
        path:'payroll_list',
        element: <PayrollList hideField={true} hideSection={true}/>
      },
      {
        path:'expenses_list',
        element: <DailyCashExpensesList hideField={true} hideSection={true}/>
      },
      {
        path:'expenses_list',
        element: <DailyCashExpensesList hideField={true} hideSection={true}/>
      },
      {
        path:'vendor_list',
        element: <VendorList hideField={true} hideSection={true}/>
      },
      {
        path:'expenses_profit_list',
        element: <ProfitExpenseList hideField={true} hideSection={true}/>
      },
]

export default reportModuleRoute