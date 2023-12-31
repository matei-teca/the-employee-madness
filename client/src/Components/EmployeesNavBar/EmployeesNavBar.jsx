import { Outlet, Link } from "react-router-dom";
import "./EmployeesNavBar.css";

const EmployeesNavBar = ({headerName}) => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <div style={{}}>{headerName}</div>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default EmployeesNavBar;
