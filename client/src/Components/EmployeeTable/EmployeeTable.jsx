import { Link } from "react-router-dom";
import "./EmployeeTable.css";

import * as React from "react";

import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import state from "../../AtomStates";

import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";

const EmployeeTable = ({ onDelete, handleCheckBox, handleTenEmployees }) => {

  const [employees, setEmployees] = useAtom(state.employees);
  const [page, setPage] = useAtom(state.pagination);
  const [rowsPerPage, setRowsPerPage] = useAtom(state.paginationRows);

  const [togglePagination, setTogglePagination] = useState(true);
  const [currTenEmployees, setCurrTenEmployees] = useAtom(
    state.currTenEmployees
  );
  const [nameSortDirection, setNameSortDirection] = useState(false);
  const [showEquipment, setShowEquipment] = useState(true);

  // const [rerender, setRerender] = useState(currTenEmployees);

  const [equipment, setEquipment] = useState(null);
  const [brands, setBrands] = useState(null);

  const fetchEquipment = async () => {
    const getResponse = await fetch("http://localhost:8080/api/equipments");
    const getData = await getResponse.json();
    setEquipment(await getData);
  };

  const fetchBrands = async () => {
    const getResponse = await fetch("http://localhost:8080/api/brands");
    const getData = await getResponse.json();
    setBrands(await getData);
  };

  useEffect(() => {
    (async () => {
      try {
        fetchEquipment();
        fetchBrands();
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handleTenEmployees(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    handleTenEmployees(page);
    setPage(0);
  };

  const handleTogglePagination = () => {
    setTogglePagination((prev) => !prev);
  };

  const handleNameSort = () => {
    setNameSortDirection((prev) => !prev);

    setEmployees((employees) => {
      const newArr = [...employees].sort((a, b) => {
        if (a.name < b.name) {
          return nameSortDirection ? -1 : 1;
        }
        if (a.name > b.name) {
          return nameSortDirection ? 1 : -1;
        }

        // names must be equal
        return 0;
      });
      return newArr;
    });

    handleTenEmployees(page);

    console.log(equipment);
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleNameSort()}>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Present</th>
            <th onClick={() => setShowEquipment((prev) => !prev)}>
              {showEquipment ? "Equipment" : "Show"}
            </th>
            <th>Fav Brand</th>
          </tr>
        </thead>
        <tbody>
          {togglePagination
            ? currTenEmployees.map((employee) => {
                return (
                  <tr key={employee._id} id={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.level}</td>
                    <td>{employee.position}</td>
                    <td>
                      <div
                        className={
                          employee.present
                            ? "custom-checkbox--true"
                            : employee.present === false
                            ? "custom-checkbox--false"
                            : "custom-checkbox--default"
                        }
                        onClick={handleCheckBox}
                        checked={employee.present ? true : false}
                      ></div>
                    </td>
                    {showEquipment ? (
                      <td>
                        {equipment?.map((item) => {
                          return employee.equipment?.map((id) => {
                            if (item._id === id) {
                              return <div key={employee._id}>{item.name}</div>;
                            }
                          });
                        })}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    <td>
                      {brands?.map((item) => {
                        if (item._id === employee.favBrand) {
                          return <div key={employee._id}>{item.name}</div>;
                        }
                      })}
                    </td>
                    <td>
                      <Link to={`/update/${employee._id}`}>
                        <button type="button">Update</button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : employees?.map((employee) => {
                return (
                  <tr key={employee._id} id={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.level}</td>
                    <td>{employee.position}</td>
                    <td>
                      <div
                        className={
                          employee.present
                            ? "custom-checkbox--true"
                            : employee.present === false
                            ? "custom-checkbox--false"
                            : "custom-checkbox--default"
                        }
                        onClick={handleCheckBox}
                        checked={employee.present ? true : false}
                      ></div>
                    </td>
                    {showEquipment ? (
                      <td>
                        {equipment?.map((item) => {
                          return employee.equipment?.map((id) => {
                            if (item._id === id) {
                              return <div key={employee._id}>{item.name}</div>;
                            }
                          });
                        })}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    <td>
                      {brands?.map((item) => {
                        if (item._id === employee.favBrand) {
                          return <div key={employee._id}>{item.name}</div>;
                        }
                      })}
                    </td>
                    <td>
                      <Link to={`/update/${employee._id}`}>
                        <button type="button">Update</button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {togglePagination && (
        <Stack spacing={2}>
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      )}
      <button onClick={handleTogglePagination}>
        {togglePagination ? "Show without Pagination" : "Show with Pagination"}
      </button>
    </div>
  );
};

export default EmployeeTable;
