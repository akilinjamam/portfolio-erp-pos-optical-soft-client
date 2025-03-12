import AddEmployee from "../components/dashboard/hrAndPayroll/AddEmployee/AddEmployee"
import BestSalePerformer from "../components/dashboard/hrAndPayroll/BestSalePerformer/BestSalePerformer"
import ControllUserAccess from "../components/dashboard/hrAndPayroll/ControllUserAccess/ControllUserAccess"
import EmployeeList from "../components/dashboard/hrAndPayroll/EmployeeList/EmployeeList"
import Payroll from "../components/dashboard/hrAndPayroll/Payroll/Payroll"
import PayrollList from "../components/dashboard/hrAndPayroll/PayrollList/PayrollList"
import UserList from "../components/dashboard/hrAndPayroll/UserList/UserList"

const hrAndPayrollRoute = [
    {
        path:'controll_user_access',
        element: <ControllUserAccess/>
      },
      {
        path:'employee_list',
        element: <EmployeeList hideField={false} hideSection={false}/>
      },
      {
        path:'payroll',
        element: <Payroll/>
      },
      {
        path:'payroll_list',
        element: <PayrollList/>
      },
      {
        path:'user_list',
        element: <UserList/>
      },
      {
        path:'add_employee',
        element: <AddEmployee/>
      },
      {
        path:'best_sale_performer',
        element: <BestSalePerformer/>
      },
]

export default hrAndPayrollRoute