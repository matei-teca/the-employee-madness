import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import EmployeesNavBar from "../Components/EmployeesNavBar";


const fetchEmployee = (fullName) => {
    return fetch(`/api/employee/${fullName}`)
    .then((res) => res.json())
  };

export default function EmployeeFullByName() {
    const { fullName } = useParams();

    const [employee, setEmployee] = useState(null);
    const [employeeLoading, setEmployeeLoading] = useState(true);
  
    useEffect(() => {
      setEmployeeLoading(true);
      fetchEmployee(fullName)
        .then((employee) => {
          setEmployee(employee);
          setEmployeeLoading(false);
          console.log(employee);
        });
    }, [fullName]);

    if (employeeLoading) {
        return <Loading />;
      }
    
      return (
      <>
        <EmployeesNavBar headerName={`Employee with the name ${fullName}:`}/>
        {employee && <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"500px"}}>{employee[0].name}</div>}
        </>
      );
}
