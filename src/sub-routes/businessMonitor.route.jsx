import ProfitCategoryAnalysis from "../components/dashboard/business_monitor/profitCategoryAnalysis/ProfitCategoryAnalysis"
import ProfitExpenseEnalysis from "../components/dashboard/business_monitor/profitExpenseEnalysis/ProfitExpenseEnalysis"

const businessMonitorRoute = [
    {
        path:'profit_expense_enalysis',
        element: <ProfitExpenseEnalysis/>
    },  
    {
        path:'profit_category_analysis',
        element: <ProfitCategoryAnalysis/>
    },  
]


export default businessMonitorRoute