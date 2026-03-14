import AddBranch from "../components/dashboard/branch_module/AddBranches/AddBranch"
import BranchList from "../components/dashboard/branch_module/BranchList/BranchList"
import ManageBranch from "../components/dashboard/branch_module/ManageBranches/ManageBranch"


const branchModuleRoute = [
    {
        path:'add_branch',
        element: <AddBranch/>
    },  
    {
        path:'branch_list',
        element: <BranchList/>
    },  
    {
        path:'manage_branch',
        element: <ManageBranch/>
    },  
    
]


export default branchModuleRoute