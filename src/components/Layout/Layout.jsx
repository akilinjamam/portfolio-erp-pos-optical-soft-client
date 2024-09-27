/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import decodeJwt from "../../jwtDecoder/jwtDecoder";
import useUserData from "../../data/userData/useUserData";
import { toast } from "react-toastify";

const Layout = ({ children }) => {
    const location = useLocation().pathname;
    const { users } = useUserData();
    const navigate = useNavigate();
    
    const token = localStorage.getItem('user');
    const splitToken = token?.split(' ')[1]; // Handle potential null value
    const getUser = decodeJwt(splitToken);

    
    const findUser = users?.result?.find(f => f?.email === getUser?.email);
    
   
    const { pos, stock, sales_invoice, sales_record, product_entry, product_list, customer_list, controll_user_access, employee_list, payroll, user_list } = findUser || {};

    useEffect(() => {
        const accessMap = {
            '/dashboard/sales_module/pos': pos,
            '/dashboard/sales_module/sales_record': sales_record,
            '/dashboard/sales_module/stock': stock,
            '/dashboard/sales_module/sales_invoice': sales_invoice,
            '/dashboard/administration_module/product_entry': product_entry,
            '/dashboard/administration_module/product_list': product_list,
            '/dashboard/administration_module/customer_list': customer_list,
            '/dashboard/administration_module/sales_invoice': sales_invoice,
            '/dashboard/hr_and_payroll_module/controll_user_access': controll_user_access,
            '/dashboard/hr_and_payroll_module/employee_list': employee_list,
            '/dashboard/hr_and_payroll_module/payroll': payroll,
            '/dashboard/hr_and_payroll_module/user_list': user_list,
        };
       

        const splitLocation = location.split('/');
        if (location in accessMap && !accessMap[location]) {
            if(findUser){
                toast.error('Sorry, you have no access');
                navigate(splitLocation[2]);

            }
        }
    }, [location,navigate, customer_list, pos, product_entry, product_list,sales_invoice,sales_record,stock, controll_user_access, employee_list, user_list, payroll, findUser]);

    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;
