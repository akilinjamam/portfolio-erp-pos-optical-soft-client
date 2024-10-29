

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
            five: '/dashboard/sales_module/sales_invoice'
        }
    },
    {
        route: '',
        value: 'Account Module',
        icon: 'uil uil-file-info-alt',
        routes: {
            one: '',
            two: '',
            three: '',
            four: '',
            five: ''
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
            five: '/dashboard/hr_and_payroll_module/user_list',
            six: '/dashboard/hr_and_payroll_module/add_employee',
        }
    },
    {
        route: '',
        value: 'Reports Module',
        icon: 'uil uil-calender',
        routes: {
            one: '',
            two: '',
            three: '',
            four: '',
            five: ''
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
            five: ''
        }
    },
    {
        route: '',
        value: 'Business Monitor',
        icon: 'uil uil-signal-alt-3',
        routes: {
            one: '',
            two: '',
            three: '',
            four: '',
            five: ''
        }
    }
]


