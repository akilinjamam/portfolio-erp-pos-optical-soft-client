/* eslint-disable react/prop-types */
import { useEffect} from 'react';
import '../../../../global_style/global_style.css'


const ControllUserAccessTable = ({paginatedDataContainer,  handleUpdate, access, setAccess}) => {
   
    useEffect(() => {
        setAccess({
            pos: paginatedDataContainer?.pos,
            sales_record: paginatedDataContainer?.sales_record,
            stock: paginatedDataContainer?.stock,
            glass_stock: paginatedDataContainer?.glass_stock,
            product_entry: paginatedDataContainer?.product_entry,
            product_list: paginatedDataContainer?.product_list,
            glass_list: paginatedDataContainer?.glass_list,
            customer_list: paginatedDataContainer?.customer_list,
            add_supplier: paginatedDataContainer?.add_supplier,
            supplier_list: paginatedDataContainer?.supplier_list,
            sales_invoice: paginatedDataContainer?.sales_invoice,
            controll_user_access: paginatedDataContainer?.controll_user_access,
            add_employee: paginatedDataContainer?.add_employee,
            employee_list: paginatedDataContainer?.employee_list,
            payroll: paginatedDataContainer?.payroll,
            payroll_list: paginatedDataContainer?.payroll_list,
            user_list: paginatedDataContainer?.user_list,
            add_vendor: paginatedDataContainer?.add_vendor,
            vendor_list: paginatedDataContainer?.vendor_list,
            add_expenses: paginatedDataContainer?.add_expenses,
            expenses_list: paginatedDataContainer?.expenses_list,
            due_collection_list: paginatedDataContainer?.due_collection_list,
            add_fixed_expenses: paginatedDataContainer?.add_fixed_expenses,
            expenses_profit_list: paginatedDataContainer?.expenses_profit_list,
            manual_sales: paginatedDataContainer?.manual_sales,
            today_sales: paginatedDataContainer?.today_sales,
            today_due_collection: paginatedDataContainer?.today_due_collection,
            profit_expense_enalysis:paginatedDataContainer?.profit_expense_enalysis,
            profit_category_analysis:paginatedDataContainer?.profit_category_analysis

        })
    },[paginatedDataContainer, setAccess])


    return (
        <div style={{marginTop:'10px'}} >
           <table style={{borderCollapse:'collapse' ,fontSize:'11.5px', margin:'auto', paddingBottom:'10px', width:'99%'}}>
                <thead>
                    <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', width:"150px"}}>User Name</th>
                    
                         
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'200px'}}>User Email</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'600px'}}>Sales Module</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'250px'}}>Administration Module</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'550px'}}>Hr & Payroll</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'550px'}}>Accounts Module</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'300px'}}>Business Monitor</th>
                       
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedDataContainer
                    &&
                    <tr>
                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', }}>{paginatedDataContainer?.username}</td> 

                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>{paginatedDataContainer?.email}</td>


                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>
                    <div className='only_flex'>
                            <input checked={access?.pos} type="checkbox" name="" id="" onClick={() => setAccess({...access, pos: access?.pos ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Pos <i className={`uil uil-${access?.pos ? 'unlock' : 'lock'}`}></i></span>
                    </div> 
                        <div className='only_flex'>
                            <input checked={access?.sales_record} type="checkbox" name="" id="" onClick={() => setAccess({...access, sales_record: access?.sales_record ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Sales Record <i className={`uil uil-${access?.sales_record ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.stock} type="checkbox" name="" id="" onClick={() => setAccess({...access, stock: access?.stock ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Stock <i className={`uil uil-${access?.stock ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.glass_stock} type="checkbox" name="" id="" onClick={() => setAccess({...access, glass_stock : access?.glass_stock ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Glass Stock <i className={`uil uil-${access?.glass_stock ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.sales_invoice} type="checkbox" name="" id="" onClick={() => setAccess({...access, sales_invoice: access?.sales_invoice ? false : true })} />
                            <span style={{marginLeft:'5px'}}>Sales Invoice <i className={`uil uil-${access?.sales_invoice ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.manual_sales} type="checkbox" name="" id="" onClick={() => setAccess({...access, manual_sales: access?.manual_sales ? false : true })} />
                            <span style={{marginLeft:'5px'}}>Manual Sales <i className={`uil uil-${access?.manual_sales ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.today_sales} type="checkbox" name="" id="" onClick={() => setAccess({...access, today_sales: access?.today_sales ? false : true })} />
                            <span style={{marginLeft:'5px'}}>Today Sales <i className={`uil uil-${access?.today_sales ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.today_due_collection} type="checkbox" name="" id="" onClick={() => setAccess({...access, today_due_collection: access?.today_due_collection ? false : true })} />
                            <span style={{marginLeft:'5px'}}>Today Due Collection <i className={`uil uil-${access?.today_due_collection ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                    </td>
                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>
                    <div className='only_flex'>
                            <input checked={access?.product_entry} type="checkbox" name="" id="" onClick={() => setAccess({...access, product_entry: access?.product_entry ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Product_entry <i className={`uil uil-${access?.product_entry ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.product_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, product_list: access?.product_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Product List <i className={`uil uil-${access?.product_entry ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.glass_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, glass_list: access?.glass_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Glass List <i className={`uil uil-${access?.glass_list ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.customer_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, customer_list: access?.customer_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Customer List <i className={`uil uil-${access?.customer_list ? 'unlock' : 'lock'}`}></i></span>
                        </div>  
                        <div className='only_flex'>
                            <input checked={access?.add_supplier} type="checkbox" name="" id="" onClick={() => setAccess({...access, add_supplier: access?.add_supplier ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Add Supplier <i className={`uil uil-${access?.add_supplier ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.supplier_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, supplier_list: access?.supplier_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Supplier List<i className={`uil uil-${access?.supplier_list ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                    </td>



                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>
                    <div className='only_flex'>
                            <input checked={access?.controll_user_access} type="checkbox" name="" id="" onClick={() => setAccess({...access, controll_user_access: access?.controll_user_access ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Controll User Access <i className={`uil uil-${access?.controll_user_access ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.add_employee} type="checkbox" name="" id="" onClick={() => setAccess({...access, add_employee: access?.add_employee ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Add Employee <i className={`uil uil-${access?.add_employee ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.employee_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, employee_list: access?.employee_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Employee List <i className={`uil uil-${access?.employee_list ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.payroll} type="checkbox" name="" id="" onClick={() => setAccess({...access, payroll: access?.payroll ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Payroll <i className={`uil uil-${access?.payroll ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.payroll_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, payroll_list: access?.payroll_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Payroll List <i className={`uil uil-${access?.payroll_list ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.user_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, user_list: access?.user_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>User List <i className={`uil uil-${access?.user_list ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                    </td>



                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>
                    <div className='only_flex'>
                            <input checked={access?.add_vendor} type="checkbox" name="" id="" onClick={() => setAccess({...access, add_vendor: access?.add_vendor ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Add Vendor <i className={`uil uil-${access?.add_vendor ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.vendor_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, vendor_list: access?.vendor_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Vendor List <i className={`uil uil-${access?.vendor_list ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.add_expenses} type="checkbox" name="" id="" onClick={() => setAccess({...access, add_expenses: access?.add_expenses ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Add Daily Cash Expenses <i className={`uil uil-${access?.add_expenses ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.expenses_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, expenses_list: access?.expenses_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Daily Cash Expenses List <i className={`uil uil-${access?.expenses_list ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.due_collection_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, due_collection_list: access?.due_collection_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>User List <i className={`uil uil-${access?.due_collection_list ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.add_fixed_expenses} type="checkbox" name="" id="" onClick={() => setAccess({...access, add_fixed_expenses: access?.add_fixed_expenses ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Add Fixed Expenses <i className={`uil uil-${access?.add_fixed_expenses ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.expenses_profit_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, expenses_profit_list: access?.expenses_profit_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Expenses Profit List <i className={`uil uil-${access?.expenses_profit_list ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                    </td>


                    <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px'}}>
                        <div className='only_flex'>
                            <input checked={access?.profit_expense_enalysis} type="checkbox" name="" id="" onClick={() => setAccess({...access, profit_expense_enalysis: access?.profit_expense_enalysis ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Profit Expenses <i className={`uil uil-${access?.profit_expense_enalysis ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.profit_category_analysis} type="checkbox" name="" id="" onClick={() => setAccess({...access, profit_category_analysis: access?.profit_category_analysis ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Profit Category <i className={`uil uil-${access?.profit_category_analysis ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                    </td>
                  
                                 
                    </tr>
                }
                </tbody>
           </table>
           <div style={{padding:"10px 5px"}} className='flex_right'>
                <div > 
                    <button onClick={handleUpdate} style={{outline:'none', border:'none', padding:'5px 10px', color:'white', fontWeight:'bold', cursor:'pointer'}} className='btnColor_green'>UPDATE
                    </button> 
                </div>
           </div>
        </div>
    );
};

export default ControllUserAccessTable;