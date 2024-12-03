

export const homeNavigator = [
    {
        route: '/dashboard',
        value: 'Dashboard',
        icon: 'uil uil-dashboard',
        routes: {
            one: '/dashboard',
            two: '',
            three: '',
            four: '',
            five: ''
        }
    },
    {
        route: '/dashboard/sales_module',
        value: 'Sales Module',
        icon: 'uil uil-shopping-cart',
        routes: {
            one: '/dashboard/sales_module',
            two: '/dashboard/sales_module/pos',
            three: '/dashboard/sales_module/sales_record',
            four: '/dashboard/sales_module/stock',
            five: '/dashboard/sales_module/sales_invoice',
            six: '/dashboard/sales_module/glass_stock',
            seven: '/dashboard/sales_module/today_sales',
            eight: '/dashboard/sales_module/today_due_collection',
            nine: '/dashboard/sales_module/manual_sale',
        }
    },
    {
        route: '/dashboard/accounts_module',
        value: 'Account Module',
        icon: 'uil uil-file-info-alt',
        routes: {
            one: '/dashboard/accounts_module',
            two: '/dashboard/accounts_module/add_vendor',
            three: '/dashboard/accounts_module/vendor_list',
            four: '/dashboard/accounts_module/add_expenses',
            five: '/dashboard/accounts_module/expenses_list',
            six: '/dashboard/accounts_module/due_collection_list',
            seven: '/dashboard/accounts_module/add_fixed_expenses',
            eight: '/dashboard/accounts_module/expenses_profit_list',
        }
    },
    {
        route: '/dashboard/hr_and_payroll_module',
        value: 'HR & Payroll',
        icon: 'uil uil-users-alt',
        routes: {
            one: '/dashboard/hr_and_payroll_module',
            two: '/dashboard/hr_and_payroll_module/controll_user_access',
            three: '/dashboard/hr_and_payroll_module/employee_list',
            four: '/dashboard/hr_and_payroll_module/payroll',
            five: '/dashboard/hr_and_payroll_module/payroll_list',
            six: '/dashboard/hr_and_payroll_module/user_list',
            seven: '/dashboard/hr_and_payroll_module/add_employee',
        }
    },
    {
        route: '/dashboard/report_module',
        value: 'Reports Module',
        icon: 'uil uil-calender',
        routes: {
            one: '/dashboard/report_module',
            two: '/dashboard/report_module/customer_list',
            three: '/dashboard/report_module/sales_record',
            four: '/dashboard/report_module/employee_list',
            five: '/dashboard/report_module/supplier_list',
            six: '/dashboard/report_module/stock',
        }
    },
    {
        route: '/dashboard/administration_module',
        value: 'Administration',
        icon: 'uil uil-cog',
        routes: {
            one: '/dashboard/administration_module',
            two: '/dashboard/administration_module/product_entry',
            three: '/dashboard/administration_module/product_list',
            four: '/dashboard/administration_module/customer_list',
            five: '/dashboard/administration_module/add_supplier',
            six: '/dashboard/administration_module/supplier_list',
            seven: '/dashboard/administration_module/glass_list',
        }
    },
    {
        route: '/dashboard/business_monitor',
        value: 'Business Monitor',
        icon: 'uil uil-signal-alt-3',
        routes: {
            one: '/dashboard/business_monitor',
            two: '/dashboard/business_monitor/profit_expense_enalysis',
            three: '/dashboard/business_monitor/profit_category_analysis',
            four: '',
            five: ''
        }
    }
]


