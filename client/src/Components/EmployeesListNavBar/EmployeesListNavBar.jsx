import { Outlet, Link } from "react-router-dom";
import "./EmployeesListNavBar.css";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

const EmployeesListNavBar = ({headerName}) => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">{headerName}</Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Navbar
        className="navbar"
        variant="dark"
        expand="lg"
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Container fluid>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>Diary</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <div className="search-bar--container">
              <div className="test">
                <Form.Control
                  // ref={inputValue}
                  // list="search-bar--datalist"
                  id="search-bar--input"
                  type="search"
                  placeholder="products search"
                  style={{ width: "13vw", marginLeft: "5vw" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      // searchByName(
                      //   inputValue.current.value,
                      //   setSearchNames,
                      //   setProduct
                      // );
                    }
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}></div>
                <NavDropdown
                  title="Search by"
                  id="basic-nav-dropdown"
                  style={{ width: "17vw", marginLeft: "1vw" }}
                >
                  <NavDropdown.Item
                    style={{ backgroundColor: "rgba(0,0,0,0)" }}
                  >
                    <Button
                      onClick={() =>
                        // searchByName(
                        //   inputValue.current.value,
                        //   setSearchNames,
                        //   setProduct
                        // )
                        console.log("button1")
                      }
                      variant="secondary"
                      style={{ width: "100%", fontSize: "0.8rem" }}
                    >
                      by name
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    style={{ backgroundColor: "rgba(0,0,0,0)" }}
                  >
                    <Button
                      onClick={() =>
                        // searchByBarcode(
                        //   inputValue.current.value,
                        //   setSearchNames,
                        //   setProduct
                        // )
                        console.log("button2")
                      }
                      variant="secondary"
                      style={{ width: "100%", fontSize: "0.8rem" }}
                    >
                      by barcode
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          </Form>
        </Container>
      </Navbar>
    <Outlet />
  </div>
);

export default EmployeesListNavBar;
