import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => (
  <div className="Layout" style ={{height:"auto", minHeight:"100vh", position:"relative"}}>
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
    <div style ={{height:"120px", backgroundColor:"navy", display:"flex", justifyContent:"center", alignItems:"center", color: "white", position:"absolute", bottom:"-112px", width: "100%"}}>
          by Matei with Codecool
    </div>
  </div>
);

export default Layout;
