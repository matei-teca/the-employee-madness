import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeTable from "../Components/EmployeeTable";


// import { useAtom } from "jotai";
// import state from '../AtomStates';
// const [employees, setEmployees] = useAtom(state.employees);

// I thnik useAtom doesn't work the same way with react router

const fetchEmployees = () => {
    return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
      res.json()
    );
  };

export default function EmployeeByName() {
    const { search } = useParams();
    const [employees, setEmployees] = useState(null);

    const handleDelete = (id) => {
        deleteEmployee(id);
    
        setEmployees((employees) => {
          return employees.filter((employee) => employee._id !== id);
        });
      };    

    const filterByRoute = () => {
        // console.log(employees);
        setEmployees(employees => employees.filter(employee => employee.name.toUpperCase().includes(search.toUpperCase())))
    }

    useEffect(() => {
        fetchEmployees()
        .then((employees) => {
          setEmployees(employees);
          filterByRoute();
          console.log(employees);
        })
    }, [])
    
      return (
      <>
        <div style={{fontWeight: "bold", marginLeft:"10px"}}>Employees with the name "{search}":</div>
        {employees && <EmployeeTable employees={employees} onDelete={handleDelete}/>}
        </>
      );
}
