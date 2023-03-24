import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useAtom } from "jotai";
import state from "../AtomStates";
import SearchBy from "../Components/SearchBy";
import SortBy from "../Components/SortBy";
import Layout from "./Layout";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

// const addAttendance = () => {
//   fetch(`/api/attendance`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({isPresent: false}),
//   })
//   .then(res => res.json())
//   .then(data => console.log(data))
// }

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useAtom(state.employees);
  const [currEmployeeEquipment, setCurrEmployeeEquipment] = useState([]);
  const [currTenEmployees, setCurrTenEmployees] = useAtom(state.currTenEmployees); 

  const handleTenEmployees = (currPage) => {
    if(employees.length > 9){
      setCurrTenEmployees(employees.slice((currPage-1)*10, (currPage-1)*10+10))
    }
  }

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleCheckBox = (e) => {
    e.target.checked = !e.target.checked;

    e.target.style.backgroundColor = e.target.checked ? "green" : "red";
    e.target.innerText = e.target.checked ? ":)" : "X";
    
      const employeeId = e.target.parentElement.parentElement.id;

      fetch(`/api/attendance/${employeeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({isPresent: e.target.checked ? true : false}),
      })
      .then(res => res.json())
      .then(data => console.log(data))
    
  }

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        setCurrTenEmployees(employees.slice(0, 10));
      });

      // addAttendance();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <>
    <SearchBy handleTenEmployees={handleTenEmployees}/>
    <SortBy handleTenEmployees={handleTenEmployees}/>
    <EmployeeTable employees={employees} onDelete={handleDelete} handleCheckBox={handleCheckBox} handleTenEmployees={handleTenEmployees} currTenEmployees={currTenEmployees}/>
  </>
};

export default EmployeeList;
