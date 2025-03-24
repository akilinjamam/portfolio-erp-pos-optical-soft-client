import AddExpenses from "../components/dashboard/accounts_module/AddDailyCashExpenses/AddExpenses"
import AddFixedExpenses from "../components/dashboard/accounts_module/AddFixedExpenses/AddFixedExpenses"
import AddVendor from "../components/dashboard/accounts_module/AddVendor/AddVendor"
import AddVendorBill from "../components/dashboard/accounts_module/AddVendorBill/AddVendorBill"
import CashFlowSummery from "../components/dashboard/accounts_module/CashFlowSummery/CashFlowSummery"
import DailyCashExpensesList from "../components/dashboard/accounts_module/DailyCashExpensesList/DailyCashExpensesList"
import DailyDueCollection from "../components/dashboard/accounts_module/DueCollection/DailyDueCollection"
import ProfitExpenseList from "../components/dashboard/accounts_module/ProfitExpenseList/ProfitExpenseList"
import VendorList from "../components/dashboard/accounts_module/VendorList/VendorList"



const accountsRoute = [
    {
        path:'add_vendor_bill',
        element: <AddVendorBill/>
    },
    {
        path:'add_vendor',
        element: <AddVendor/>
    },
    {
        path:'vendor_list',
        element: <VendorList/>
    },
    {
        path:'add_expenses',
        element: <AddExpenses/>
    },
    {
        path:'add_fixed_expenses',
        element: <AddFixedExpenses/>
    },
    {
        path:'expenses_profit_list',
        element: <ProfitExpenseList/>
    },
    {
        path:'expenses_list',
        element: <DailyCashExpensesList/>
    },
    {
        path:'due_collection_list',
        element: <DailyDueCollection/>
    },
    {
        path:'cash_flow_summery',
        element: <CashFlowSummery/>
    },
      
]


export default accountsRoute