import { Outlet, Link } from "react-router-dom";
import "./EmployeesListNavBar.css";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import SortBy from "../SortBy/SortBy";
import FilterBy from "../FilterBy/FilterBy";

const EmployeesListNavBar = ({ headerName, handleTenEmployees }) => {

return (
  <div className="Layout">
    <nav>
      <ul className="employees-list--nav">
        <Navbar
          variant="dark"
          expand="lg"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Container fluid style={{ display: "flex" }}>

              
            <div style = {{width:"98vw", display: "flex", justifyContent:"space-between", alignItems:"center"}}>

            <div>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <li className="grow" style={{width: "15vw"}}>
                <div>{headerName}</div>
              </li>
            </Nav>
            <Nav>
              <div style = {{}}>
              <FilterBy handleTenEmployees ={handleTenEmployees}/>
              <SortBy handleTenEmployees ={handleTenEmployees}/>
              </div>
            </Nav>
            </div>
            <div>   
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px"}}
              navbarScroll
            >
              <li>
                <Link to="/create">
                  <button type="button" className="create--button">Create Employee</button>
                </Link>
              </li>
            </Nav>
            </div>
            </div>
          </Container>
        </Navbar>
      </ul>
    </nav>
    <Outlet />
  </div>
);
}

export default EmployeesListNavBar;
