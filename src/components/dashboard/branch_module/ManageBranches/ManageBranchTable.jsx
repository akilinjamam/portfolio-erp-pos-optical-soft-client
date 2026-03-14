/* eslint-disable react/prop-types */
import { useEffect} from 'react';
import '../../../../global_style/global_style.css';
import cua from './ManageBranch.module.scss';
import useGetbranchData from '../../../../data/branchData/useGetBranchData';


const ManageBranchTable = ({paginatedDataContainer,  handleUpdate, manageBranches, setManageBranches}) => {

    const {branchData} = useGetbranchData()
    

const manageBranchIds = (branches, myBranches) => {
    console.log(branches)
    console.log(myBranches)
    let result = [];
    for (let i = 0; branches?.length > i; i++) {

        if (myBranches?.map(myIds => myIds)?.includes(branches?.[i]?._id)) {
            result.push({
                id: branches?.[i]?._id,
                name: branches?.[i]?.name,
                exist: true
            })
        } else {
            result.push({
                id: branches?.[i]?._id,
                name: branches?.[i]?.name,
                exist: false
            })
        }

    }
    return result;
}


   useEffect(() => {
    if (branchData?.result && paginatedDataContainer?.branchIds) {
        const branches = manageBranchIds(
            branchData.result,
            paginatedDataContainer.branchIds
        );
        setManageBranches(branches);
    }
}, [branchData, paginatedDataContainer, setManageBranches]);




    return (
        <div>
            <div className={cua.table_responsive} style={{marginTop:'10px'}} >
                <table style={{borderCollapse:'collapse' ,fontSize:'11.5px', margin:'auto', paddingBottom:'10px', width:'99%'}}>
                        <thead>
                            <tr>
                                <th style={{border:'1px solid #dddddd',textAlign:'left', width:"150px"}}>User Name</th>
                            

                                <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'200px'}}>User Email</th>
                               
                                <th style={{border:'1px solid #dddddd',textAlign:'left', paddingLeft:'5px', width:'250px'}}>All Branches</th>
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
                                <div className=''>
                                       {
                                        manageBranches?.map((branch, index) => {
                                            return (
                                                <div className='only_flex' key={index}>
                                                    <input style={{marginRight: "5px"}} checked={branch?.exist} type="checkbox" onClick={() => {
                                                        const updated = manageBranches.map((item) =>
                                                            item.id === branch.id
                                                                ? { ...item, exist: item.exist ? false : true }
                                                                : item
                                                        )
                                                        setManageBranches(updated)}}/>
                                                        
                                                    <p>{branch?.name}</p>
                                                    <i style={{marginLeft: "3px"}} className={`uil uil-${branch?.exist ? 'unlock' : 'lock'}`}></i>
                                                </div>
                                            )
                                        })
                                       }
                                </div> 
                              
                            </td>
                                        
                            </tr>
                        }
                        </tbody>
                </table>
            </div>
            <div style={{padding:"10px 5px"}} className='flex_right'>
                    <div > 
                        <button onClick={handleUpdate} style={{outline:'none', border:'none', padding:'5px 10px', color:'white', fontWeight:'bold', cursor:'pointer'}} className='btnColor_green'>UPDATE
                        </button> 
                    </div>
            </div>
            </div>
    );
};

export default ManageBranchTable;