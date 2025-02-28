/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import decodeJwt from "../../jwtDecoder/jwtDecoder";
import useUserData from "../../data/userData/useUserData";
import { toast } from "react-toastify";
import layoutControll from './Layout.module.scss';
import '../../global_style/global_style.css';

const Layout = ({ children }) => {

    const token = localStorage.getItem('user');
    
    const splitToken = token?.split(' ')[1]; // Handle potential null value
    const getUser = decodeJwt(splitToken);

    const location = useLocation().pathname;
    const { users } = useUserData();
    const navigate = useNavigate();

    
    const findUser = users?.result?.find(f => f?.email === getUser?.email);
    
   
    const { pos, stock, sales_invoice, sales_record, product_entry, product_list, customer_list, controll_user_access, employee_list, payroll, user_list, add_employee, add_supplier, supplier_list, glass_stock, glass_list, payroll_list,add_vendor, vendor_list, add_expenses, expenses_list, due_collection_list, add_fixed_expenses, expenses_profit_list, profit_category_analysis,profit_expense_enalysis, manual_sales, today_sales, today_due_collection, manage_sales} = findUser || {};

    useEffect(() => {
        const accessMap = {
            '/dashboard/sales_module/pos': pos,
            '/dashboard/sales_module/sales_record': sales_record,
            '/dashboard/sales_module/stock': stock,
            '/dashboard/sales_module/glass_stock': glass_stock,
            '/dashboard/sales_module/sales_invoice': sales_invoice,
            '/dashboard/sales_module/manual_sales': manual_sales,
            '/dashboard/sales_module/today_sales': today_sales,
            '/dashboard/sales_module/today_due_collection': today_due_collection,

            '/dashboard/administration_module/product_entry': product_entry,
            '/dashboard/administration_module/product_list': product_list,
            '/dashboard/administration_module/glass_list': glass_list,
            '/dashboard/administration_module/customer_list': customer_list,
            '/dashboard/administration_module/add_supplier': add_supplier,
            '/dashboard/administration_module/supplier_list': supplier_list,
            '/dashboard/administration_module/manage_sales': manage_sales,

            '/dashboard/hr_and_payroll_module/controll_user_access': controll_user_access,
            '/dashboard/hr_and_payroll_module/employee_list': employee_list,
            '/dashboard/hr_and_payroll_module/payroll': payroll,
            '/dashboard/hr_and_payroll_module/payroll_list': payroll_list,
            '/dashboard/hr_and_payroll_module/user_list': user_list,
            '/dashboard/hr_and_payroll_module/add_employee': add_employee,

            '/dashboard/accounts_module/add_vendor': add_vendor,
            '/dashboard/accounts_module/vendor_list': vendor_list,
            '/dashboard/accounts_module/add_expenses': add_expenses,
            '/dashboard/accounts_module/expenses_list': expenses_list,
            '/dashboard/accounts_module/due_collection_list': due_collection_list,
            '/dashboard/accounts_module/add_fixed_expenses': add_fixed_expenses,
            '/dashboard/accounts_module/expenses_profit_list': expenses_profit_list,

            '/dashboard/business_monitor/profit_expense_enalysis': profit_expense_enalysis,
            '/dashboard/business_monitor/profit_category_analysis': profit_category_analysis,

            '/dashboard/report_module/customer_list': customer_list,
            '/dashboard/report_module/sales_record': sales_record,
            '/dashboard/report_module/employee_list': employee_list,
            '/dashboard/report_module/supplier_list': supplier_list,
            '/dashboard/report_module/stock': stock,
            '/dashboard/report_module/today_due_collection': today_due_collection,
            '/dashboard/report_module/today_sales': today_sales,
            '/dashboard/report_module/payroll_list': payroll_list,
            '/dashboard/report_module/vendor_list': vendor_list,
            '/dashboard/report_module/expenses_list': expenses_list,
            '/dashboard/report_module/expenses_profit_list': expenses_profit_list,
        };
       

        const splitLocation = location.split('/');
        if (location in accessMap && !accessMap[location]) {
            if(findUser){
                toast.error('Sorry, you have no access');
                navigate(splitLocation[2]);

            }
        }
    }, [location,navigate, customer_list, pos, product_entry, product_list,sales_invoice,sales_record,stock, controll_user_access, employee_list, user_list, payroll, findUser, add_employee,add_supplier, supplier_list, glass_stock, glass_list, payroll_list, add_vendor, vendor_list, add_expenses, expenses_list, due_collection_list, add_fixed_expenses, expenses_profit_list, profit_category_analysis,profit_expense_enalysis, manual_sales, today_sales,  today_due_collection, manage_sales]);

    return (
        <div className={`${layoutControll.main}`}>
            <div className={`${layoutControll.container}`}>
                {children}
            </div>
            <div className={`${layoutControll.displayWidthLimitControll}`}>
                <div className="flex_center">
                    <p>Screen Size must have to be more than 1242px</p>
                </div>
            </div>
        </div>
    );
};

export default Layout;
