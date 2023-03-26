import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable";
import { useAtom } from "jotai";
import state from "../AtomStates";


const EquipmentList = () => {
  // const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <Loading />;
  // }

  return ( <> 
    <div style={{display: "flex", marginLeft: "10px"}}>
      <h3>This is the Equipment:</h3>
    </div>
    <EquipmentTable/>
  </>)
};

export default EquipmentList;
