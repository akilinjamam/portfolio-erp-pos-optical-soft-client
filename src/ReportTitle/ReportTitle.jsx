import { jwtDecode } from "jwt-decode";
import useGetbranchData from "../data/branchData/useGetBranchData";

const ReportTitle = () => {
  const {branchData} = useGetbranchData()
  const token = localStorage.getItem("user");
  const splitToken = token?.split(' ')?.[1];
 
  const branchId = jwtDecode(splitToken)?.branchId;
  const findBranch = branchData?.result?.find(f => f?._id === branchId);
  console.log(findBranch)

    return (
      <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px', fontFamily: "'DM Sans', sans-serif" }}>
      <div>
          <h2> {findBranch?.name} </h2>
      </div>
      <p style={{ fontSize: '10px' }}>
      
        {findBranch?.address}<br />
        Cell: {findBranch?.phone}
      </p>
    </div>
    );
};

export default ReportTitle;