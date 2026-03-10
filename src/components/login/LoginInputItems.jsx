import { useEffect, useState } from "react";
import { fetchGetBranchData } from "../../data/fetchedData/fetchGetBranchData";

const InputItems = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const getBranches = async () => {
      const result = await fetchGetBranchData();
      setBranches(result?.result || []);
    };

    getBranches();
  }, []);

  const allInputLoginData = [
   {
        element: "input",
        type: "text",
        value: "username",
        name: "username",
        id: "username",
        value_alt: "Username"
    },

    {
        element: "select",
        name: "branchId",
        id: "branchId",
        value: "branchId",
        value_alt: "Select Branch",
        options: branches?.map((branch) => ({
        label: branch.name,
        value: branch._id
      }))
    },

    {
        element: "input",
        type: "password",
        value: "password",
        name: "password",
        id: "password",
        value_alt: "Password",
        icon: "uil uil-eye-slash"
    },
  ];

  return allInputLoginData;
};

export default InputItems;