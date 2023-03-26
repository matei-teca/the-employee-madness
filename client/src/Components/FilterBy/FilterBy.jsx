import React, { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import state from "../../AtomStates";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

export default function FilterBy({ handleTenEmployees }) {
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
          <NavDropdown
            title="Filter by"
            id="basic-nav-dropdown"
            style = {{fontSize: "1.2rem"}}
          >
            <div style ={{paddingInline: "20px"}}>
            <Form.Control
                id="search-bar--input"
                type="search"
                style={{ width: "100%" }}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    handleByLevel();
                }
                }}
                ref={inputRef}
                placeholder="Level / Position"
            />
            <div>
            <NavDropdown.Item style={{ backgroundColor: "rgba(0,0,0,0)", marginLeft:"-15%"  }}>
              <button
                onClick={handleByLevel}
                variant="secondary"
                style={{ width: "135%", fontSize: "0.8rem", marginTop: "10px" }}
              >
                by Level
              </button>
            </NavDropdown.Item>
            <NavDropdown.Item style={{ backgroundColor: "rgba(0,0,0,0)", marginLeft:"-15%"  }}>
              <button
                onClick={handleByPosition}
                variant="secondary"
                style={{ width: "135%", fontSize: "0.8rem", marginTop: "-5px" }}
              >
                by Position
              </button>
            </NavDropdown.Item>
            </div>
            </div>
          </NavDropdown>
  );
}
