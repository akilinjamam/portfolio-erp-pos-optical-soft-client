import ProfitCategoryAnalysis from "../components/dashboard/business_monitor/profitCategoryAnalysis/ProfitCategoryAnalysis"
import ProfitExpenseEnalysis from "../components/dashboard/business_monitor/profitExpenseEnalysis/ProfitExpenseEnalysis"
import SalesAnalysis from "../components/dashboard/business_monitor/sales_analysis/SalesAnalysis"
import StockAnalysis from "../components/dashboard/business_monitor/stockAnalysis/StockAnalysis"

const businessMonitorRoute = [
    {
        path:'profit_expense_enalysis',
        element: <ProfitExpenseEnalysis/>
    },  
    {
        path:'profit_category_analysis',
        element: <ProfitCategoryAnalysis/>
    },  
    {
        path:'stock_analysis',
        element: <StockAnalysis/>
    },  
    {
        path:'sales_analysis',
        element: <SalesAnalysis/>
    },  
]


export default businessMonitorRoute