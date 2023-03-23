import { Link } from "react-router-dom";
import "./EmployeeTable.css";




const EmployeeTable = ({ employees, onDelete, handleCheckBox }) => {

  // const getEachEquipment = async (employee) => {

  //     const getCurrEquipment = await fetch(`/api/employee/${employee._id}/equipment`);
  //     const currEquipmentData = await getCurrEquipment.json();
  
  //     return(
  //       <div>
  //       {currEquipmentData.currEquipmentResponse?.map(item => {
  //         return(<div key={item.name}>{item.name}</div>)
  //       })}
  //       </div>
  //     )
  // }

return (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Present</th>
          <th onClick={() => console.log("nthing")}>Equipment</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees?.map((employee) => {
          return(
          <tr key={employee._id} id={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <div 
              className={employee.present ? "custom-checkbox--true" : employee.present === false ?  "custom-checkbox--false" : "custom-checkbox--default"}
              onClick={handleCheckBox} 
              checked={employee.present ? true : false}>
              </div>
            </td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
            {/* <td>
              {(()=>{  
                return getEachEquipment(employee);
              })()}
            </td> */}
          </tr>
        )})}
      </tbody>
    </table>
  </div>
);
}

export default EmployeeTable;
