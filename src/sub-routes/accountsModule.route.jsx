import AddVendor from "../components/dashboard/accounts_module/AddVendor/AddVendor"
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
      
]

export default accountsRoute