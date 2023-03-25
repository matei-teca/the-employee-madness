import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SmallEmployeeTable from '../Components/SmallEmployeeTable/SmallEmployeeTable';
import EmployeesNavBar from "../Components/EmployeesNavBar";


const fetchEmployees = () => {
    return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
      res.json()
    );
  };

export default function MissingEmployees() {
    const [employees, setEmployees] = useState(null);

    const handleDelete = (id) => {
        deleteEmployee(id);
    
        setEmployees((employees) => {
          return employees.filter((employee) => employee._id !== id);
        });
      };    

    const filterByAttendance = () => {
        // console.log(employees);
        setEmployees(employees => employees.filter(employee => employee.present === false))
    }

    useEffect(() => {
        fetchEmployees()
        .then((employees) => {
          setEmployees(employees);
          filterByAttendance();
          console.log(employees);
        })
    }, [])
    
      return (
      <>
        <EmployeesNavBar headerName={"Missing Employees"}/>
         {employees && <SmallEmployeeTable employees={employees} onDelete={handleDelete}/>}
        </>
      );
}
