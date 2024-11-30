import AddSupplier from "../components/dashboard/administration_module/add_supplier/AddSupplier";
import CustomerList from "../components/dashboard/administration_module/customer_list/CustomerList";
import GlassList from "../components/dashboard/administration_module/glass_list/GlassList";
import ProductEntry from "../components/dashboard/administration_module/product_entry/ProductEntry";
import ProductList from "../components/dashboard/administration_module/product_list/ProductList";
import SupplierList from "../components/dashboard/administration_module/supplier_list/SupplierList";

const administrationRoute = [
    {
        path:'product_entry',
        element: <ProductEntry/>
      },
      {
        path:'product_list',
        element: <ProductList/>
      },
      {
        path:'glass_list',
        element: <GlassList/>
      },
      {
        path:'customer_list',
        element: <CustomerList/>
      },
      {
        path:'add_supplier',
        element: <AddSupplier/>
      },
      {
        path:'supplier_list',
        element: <SupplierList/>
      },
]

export default administrationRoute