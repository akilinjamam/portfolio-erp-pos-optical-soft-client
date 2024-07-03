import ProductEntry from "../components/dashboard/administration_module/product_entry/ProductEntry";
import ProductList from "../components/dashboard/administration_module/product_list/ProductList";

const administrationRoute = [
    {
        path:'product_entry',
        element: <ProductEntry/>
      },
      {
        path:'product_list',
        element: <ProductList/>
      },
]

export default administrationRoute