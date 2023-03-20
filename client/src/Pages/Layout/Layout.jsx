import { Outlet, Link } from "react-router-dom";
import SearchBy from "../../Components/SearchBy";
import SortBy from "../../Components/SortBy";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li className="searchBy"><SearchBy/></li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
      </ul>
    </nav>
    <SortBy/>
    <Outlet />
  </div>
);

export default Layout;
