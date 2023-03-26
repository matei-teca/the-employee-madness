import React, { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import state from "../../AtomStates";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

export default function SearchBy({ handleTenEmployees }) {
  const [employees, setEmployees] = useAtom(state.employees);
  const inputRef = useRef(null);
  const [page, setPage] = useAtom(state.pagination);

  const handleByPosition = () => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((employees) => {
        setEmployees(employees);

        setEmployees((employees) => {
          return employees.filter((employee) =>
            employee.position
              .toUpperCase()
              .includes(inputRef.current.value.toUpperCase())
          );
        });
        handleTenEmployees(page);
      });
  };

  const handleByLevel = () => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((employees) => {
        setEmployees(employees);
        setEmployees((employees) => {
          return employees.filter((employee) =>
            employee.level
              .toUpperCase()
              .includes(inputRef.current.value.toUpperCase())
          );
        });
        handleTenEmployees(page);
      });
  };

  return (
    <Form className="d-flex">
      <div>
        <div style={{ width: "700px", display: "flex", marginLeft: "7vw" }}>
          <Form.Control
            id="search-bar--input"
            type="search"
            style={{ width: "13vw", marginLeft: "5vw" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleByLevel();
                // searchByName(
                //   inputValue.current.value,
                //   setSearchNames,
                //   setProduct
                // );
              }
            }}
            ref={inputRef}
            //   type="text"
            placeholder="Level / Position"
            //   className='input'
          />
          <div style={{ display: "flex", flexDirection: "column" }}></div>
          <NavDropdown
            title="Filter by"
            id="basic-nav-dropdown"
            style={{ width: "17vw", marginLeft: "1vw" }}
          >
            <NavDropdown.Item style={{ backgroundColor: "rgba(0,0,0,0)" }}>
              <Button
                onClick={handleByLevel}
                variant="secondary"
                style={{ width: "100%", fontSize: "0.8rem" }}
              >
                by Level
              </Button>
            </NavDropdown.Item>
            <NavDropdown.Item style={{ backgroundColor: "rgba(0,0,0,0)" }}>
              <Button
                onClick={handleByPosition}
                variant="secondary"
                style={{ width: "100%", fontSize: "0.8rem" }}
              >
                by Position
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </Form>
  );
}
