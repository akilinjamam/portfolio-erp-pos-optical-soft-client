/* eslint-disable react/prop-types */
import { useEffect} from 'react';
import '../../../../global_style/global_style.css'


const ControllUserAccessTable = ({paginatedDataContainer,  handleUpdate, access, setAccess}) => {
   
    useEffect(() => {
        setAccess({
            pos: paginatedDataContainer?.pos,
            sales_record: paginatedDataContainer?.sales_record,
            stock: paginatedDataContainer?.stock,
            product_entry: paginatedDataContainer?.product_entry,
            product_list: paginatedDataContainer?.product_list,
            customer_list: paginatedDataContainer?.customer_list,
            sales_invoice: paginatedDataContainer?.sales_invoice,
            controll_user_access: paginatedDataContainer?.controll_user_access,
            employee_list: paginatedDataContainer?.employee_list,
            payroll: paginatedDataContainer?.payroll,
            user_list: paginatedDataContainer?.user_list,
            add_employee: paginatedDataContainer?.add_employee,
            add_supplier: paginatedDataContainer?.add_supplier,
            supplier_list: paginatedDataContainer?.supplier_list,

        })
    },[paginatedDataContainer, setAccess])


    return (
        <div style={{marginTop:'10px'}} >
           <table style={{borderCollapse:'collapse' ,fontSize:'13.5px', margin:'auto', paddingBottom:'10px', width:'99%'}}>
                <thead>
                    <tr>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', width:"200px"}}>User Name</th>
                    
                         
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>User Email</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Sales Module</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Administration Module</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Hr & Payroll</th>
                        <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'400px'}}>Action</th>
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
                            <input checked={access?.sales_invoice} type="checkbox" name="" id="" onClick={() => setAccess({...access, sales_invoice: access?.sales_invoice ? false : true })} />
                            <span style={{marginLeft:'5px'}}>Sales Invoice <i className={`uil uil-${access?.sales_invoice ? 'unlock' : 'lock'}`}></i></span>
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
                            <input checked={access?.customer_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, customer_list: access?.customer_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Customer List <i className={`uil uil-${access?.customer_list ? 'unlock' : 'lock'}`}></i></span>
                        </div>  
                        <div className='only_flex'>
                            <input checked={access?.add_supplier} type="checkbox" name="" id="" onClick={() => setAccess({...access, add_supplier: access?.add_supplier ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Add Supplier <i className={`uil uil-${access?.add_supplier ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                        <div className='only_flex'>
                            <input checked={access?.supplier_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, supplier_list: access?.supplier_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>Supplier List<i className={`uil uil-${access?.add_supplier ? 'unlock' : 'lock'}`}></i></span>
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
                            <input checked={access?.user_list} type="checkbox" name="" id="" onClick={() => setAccess({...access, user_list: access?.user_list ? false : true })}/>
                            <span style={{marginLeft:'5px'}}>User List <i className={`uil uil-${access?.user_list ? 'unlock' : 'lock'}`}></i></span>
                        </div> 
                    </td>
                   <td style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', }}> <button onClick={handleUpdate} style={{outline:'none', border:'none', padding:'5px 10px', color:'white', fontWeight:'bold', cursor:'pointer'}} className='btnColor_green'>UPDATE</button> </td>
                                 
                    </tr>
                }
                </tbody>
           </table>
        </div>
    );
};

export default ControllUserAccessTable;