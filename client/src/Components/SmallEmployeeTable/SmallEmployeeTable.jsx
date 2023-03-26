import { Link } from "react-router-dom";
import "./SmallEmployeeTable.css";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useState, useEffect, useRef} from "react";
import { useAtom } from "jotai";
import state from "../../AtomStates";


const SmallEmployeeTable = ({onDelete, employees}) => {

return (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Present</th>
          {/* <th onClick={() => console.log("nthing")}>Equipment</th> */}
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
  </div>
);
}

            {/* <td>
              {(()=>{  
                return getEachEquipment(employee);
              })()}
            </td> */}

export default SmallEmployeeTable;
