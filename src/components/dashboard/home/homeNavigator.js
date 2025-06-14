export const homeNavigator = [
    {
        route: '/dashboard',
        value: 'Dashboard',
        icon: 'uil uil-dashboard',
        routes: ['/dashboard'],
    },
    {
        route: '/dashboard/sales_module',
        value: 'Sales Module',
        icon: 'uil uil-shopping-cart',
        routes: [
            '/dashboard/sales_module',
            '/dashboard/sales_module/pos',
            '/dashboard/sales_module/sales_record',
            '/dashboard/sales_module/stock',
            '/dashboard/sales_module/sales_invoice',
            '/dashboard/sales_module/glass_stock',
            '/dashboard/sales_module/today_sales',
            '/dashboard/sales_module/today_due_collection',
            '/dashboard/sales_module/manual_sale',
        ],
    },
    {
        route: '/dashboard/accounts_module',
        value: 'Account Module',
        icon: 'uil uil-file-info-alt',
        routes: [
            '/dashboard/accounts_module',
            '/dashboard/accounts_module/add_vendor',
            '/dashboard/accounts_module/vendor_list',
            '/dashboard/accounts_module/add_expenses',
            '/dashboard/accounts_module/expenses_list',
            '/dashboard/accounts_module/due_collection_list',
            '/dashboard/accounts_module/add_fixed_expenses',
            '/dashboard/accounts_module/expenses_profit_list',
            '/dashboard/accounts_module/cash_flow_summery',
            '/dashboard/accounts_module/add_vendor_bill',
        ],
    },
    {
        route: '/dashboard/hr_and_payroll_module',
        value: 'HR & Payroll',
        icon: 'uil uil-users-alt',
        routes: [
            '/dashboard/hr_and_payroll_module',
            '/dashboard/hr_and_payroll_module/controll_user_access',
            '/dashboard/hr_and_payroll_module/employee_list',
            '/dashboard/hr_and_payroll_module/payroll',
            '/dashboard/hr_and_payroll_module/payroll_list',
            '/dashboard/hr_and_payroll_module/user_list',
            '/dashboard/hr_and_payroll_module/add_employee',
            '/dashboard/hr_and_payroll_module/best_sale_performer',
            '/dashboard/hr_and_payroll_module/payroll_bonus',
        ],
    },
    {
        route: '/dashboard/report_module',
        value: 'Reports Module',
        icon: 'uil uil-calender',
        routes: [
            '/dashboard/report_module',
            '/dashboard/report_module/customer_list',
            '/dashboard/report_module/sales_record',
            '/dashboard/report_module/employee_list',
            '/dashboard/report_module/supplier_list',
            '/dashboard/report_module/stock',
            '/dashboard/report_module/today_due_collection',
            '/dashboard/report_module/today_sales',
            '/dashboard/report_module/payroll_list',
            '/dashboard/report_module/vendor_list',
            '/dashboard/report_module/expenses_list',
            '/dashboard/report_module/expenses_profit_list',
        ],

    },
    {
        route: '/dashboard/administration_module',
        value: 'Administration',
        icon: 'uil uil-cog',
        routes: [
            '/dashboard/administration_module',
            '/dashboard/administration_module/product_entry',
            '/dashboard/administration_module/product_list',
            '/dashboard/administration_module/customer_list',
            '/dashboard/administration_module/add_supplier',
            '/dashboard/administration_module/supplier_list',
            '/dashboard/administration_module/glass_list',
            '/dashboard/administration_module/manage_sales',
            '/dashboard/administration_module/sold_product',
        ],

    },
    {
        route: '/dashboard/business_monitor',
        value: 'Business Monitor',
        icon: 'uil uil-signal-alt-3',
        routes: [
            '/dashboard/business_monitor',
            '/dashboard/business_monitor/profit_expense_enalysis',
            '/dashboard/business_monitor/profit_category_analysis',
            '/dashboard/business_monitor/stock_analysis',
            '/dashboard/business_monitor/sales_analysis'
        ],

    }
]


