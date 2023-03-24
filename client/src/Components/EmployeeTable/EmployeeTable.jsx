import { Link } from "react-router-dom";
import "./EmployeeTable.css";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useState, useEffect, useRef} from "react";
import { useAtom } from "jotai";
import state from "../../AtomStates";


const EmployeeTable = ({onDelete, handleCheckBox, handleTenEmployees}) => {

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
  // }`
  
  const [employees, setEmployees] = useAtom(state.employees);
  const [page, setPage] = useAtom(state.pagination); 
  const [togglePagination, setTogglePagination] = useState(true);
  const [currTenEmployees, setCurrTenEmployees] = useAtom(state.currTenEmployees); 
  const [nameSortDirection, setNameSortDirection] = useState(false);

  // const [rerender, setRerender] = useState(currTenEmployees);

  const handleChange = (event, value) => {
    setPage(value);
    handleTenEmployees(value);
  };

  const handleTogglePagination = () => {
    setTogglePagination(prev => !prev)
  }

  const handleNameSort = () => {
    setNameSortDirection(prev => !prev)

    setEmployees(employees => {const newArr = [...employees].sort((a,b) => {
      if (a.name < b.name) {
          return nameSortDirection ? -1 : 1;
      }
      if (a.name > b.name) {
        return nameSortDirection ? 1 : -1;
      }

      // names must be equal
      return 0; 
    }); 
    return newArr
    });

    handleTenEmployees(page);

    console.log(employees);
  }

return (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th onClick={()=> handleNameSort()}>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Present</th>
          <th onClick={() => console.log("nthing")}>Equipment</th>
          <th />
        </tr>
      </thead>
      <tbody>
       
        { togglePagination 
        
        ? 

        (currTenEmployees.map(employee =>{
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
  
            </tr>
            )

          })) 

          : 

          employees?.map((employee) => {
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

                  </tr>
                )})
        }

        
      </tbody>

    </table>
    {togglePagination &&
      (<Stack spacing={2}>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>)}
      <button onClick={handleTogglePagination}>{togglePagination ? "Show without Pagination" : "Show with Pagination"}</button>
  </div>
);
}

            {/* <td>
              {(()=>{  
                return getEachEquipment(employee);
              })()}
            </td> */}

export default EmployeeTable;
