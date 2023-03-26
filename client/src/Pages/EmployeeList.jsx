import "bootstrap/dist/css/bootstrap.css";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import state from "../AtomStates";

import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import SearchBy from "../Components/SearchBy";
import SortBy from "../Components/SortBy";
import EmployeesListNavBar from "../Components/EmployeesListNavBar";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = ({sortDirection}) => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useAtom(state.employees);
  const [currTenEmployees, setCurrTenEmployees] = useAtom(
    state.currTenEmployees
  );
  const [rowsPerPage, setRowsPerPage] = useAtom(state.paginationRows);

  // console.log(sortDirection);

  const handleTenEmployees = (currPage) => {
    if (employees.length > 9) {
      setCurrTenEmployees(
        employees.slice(currPage * rowsPerPage, currPage * rowsPerPage + 10)
      );
    }
  };

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
      body: JSON.stringify({ isPresent: e.target.checked ? true : false }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const assignBrands = () => {
    fetchEmployees().then((employees) => {
      setEmployees(employees);

      // if(employees[0].favBrand === )
      fetch("/api/assign/brand", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    });
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setLoading(false);
      setEmployees(employees);
      setCurrTenEmployees(employees.slice(0, 10));
    });

    // assignBrands();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <EmployeesListNavBar headerName={"Employees List"} />
      <SearchBy handleTenEmployees={handleTenEmployees} />
      <SortBy handleTenEmployees={handleTenEmployees} />
      <EmployeeTable
        onDelete={handleDelete}
        handleCheckBox={handleCheckBox}
        handleTenEmployees={handleTenEmployees}
        sortDirection={sortDirection}
      />
    </>
  );
};

export default EmployeeList;
