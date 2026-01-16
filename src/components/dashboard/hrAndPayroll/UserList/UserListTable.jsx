/* eslint-disable react/prop-types */
import userlist from "./UserList.module.scss";

const UserListTable = ({paginatedDataContainer, handleUpdateRemove, handleUpdateRequest}) => {


    return (
        <div className={userlist.table_responsive}>
            <table style={{borderCollapse:'collapse', fontSize:'13.5px', margin:'auto', paddingBottom:'10px'}}>
            <thead>
                <tr>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>SL</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>User Name</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Email</th>
                    <th style={{border:'1px solid #dddddd',textAlign:'left'}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {  
                    paginatedDataContainer?.map((userList, index) => {
                        return (
                            <tr key={userList?.indexId}>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left',}}>{userList?.indexId ? userList?.indexId : (index+1) }</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left', width:'150px'}}>{userList?.username}</td>
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>{userList?.email}</td>
                                
                                <td  style={{border:'1px solid #dddddd',textAlign:'left'}}>
                                    
                                    {
                                        !userList?.accept_by_admin
                                        ?
                                        <button style={{marginRight:'10px'}} className="commonButton btnColor_green"
                                        onClick={() => handleUpdateRequest(userList?._id, userList?.accept_by_admin)}
                                        >
                                        Accept Request
                                        </button>
                                        :
                                        <button
                                        style={{marginRight:'10px'}}
                                        onClick={() => handleUpdateRequest(userList?._id, userList?.accept_by_admin)}
                                         className="commonButton btnColor_orange">Reject</button>

                                    }
                                    <button style={{marginRight:'10px'}} className="commonButton btnColor_red"
                                    onClick={() => handleUpdateRemove(userList?._id)}
                                    >Remove</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
    );
};

export default UserListTable;