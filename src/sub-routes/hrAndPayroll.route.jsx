import ControllUserAccess from "../components/dashboard/hrAndPayroll/ControllUserAccess/ControllUserAccess"
import EmployeeList from "../components/dashboard/hrAndPayroll/EmployeeList/EmployeeList"
import Payroll from "../components/dashboard/hrAndPayroll/Payroll/Payroll"
import UserList from "../components/dashboard/hrAndPayroll/UserList/UserList"

const hrAndPayrollRoute = [
    {
        path:'controll_user_access',
        element: <ControllUserAccess/>
      },
      {
        path:'employee_list',
        element: <EmployeeList/>
      },
      {
        path:'payroll',
        element: <Payroll/>
      },
      {
        path:'user_list',
        element: <UserList/>
      },
]

export default hrAndPayrollRoute