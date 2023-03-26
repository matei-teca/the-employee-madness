import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
        <ul style ={{height:"40px", backgroundColor:"navy"}}>
          <li className="grow">
            <Link to="/">The Employee Madness</Link>
          </li>
          {/* <li>
            <Link to="/create">
              <button type="button">Create Employee</button>
            </Link>
          </li> */}
        </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
