import AddExpenses from "../components/dashboard/accounts_module/AddDailyCashExpenses/AddExpenses"
import AddVendor from "../components/dashboard/accounts_module/AddVendor/AddVendor"
import DailyCashExpensesList from "../components/dashboard/accounts_module/DailyCashExpensesList/DailyCashExpensesList"
import DailyDueCollection from "../components/dashboard/accounts_module/DueCollection/DailyDueCollection"
import VendorList from "../components/dashboard/accounts_module/VendorList/VendorList"



const accountsRoute = [
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
        path:'expenses_list',
        element: <DailyCashExpensesList/>
    },
    {
        path:'due_collection_list',
        element: <DailyDueCollection/>
    },
      
]

export default accountsRoute