import { Outlet, Link } from "react-router-dom";
import {useState} from "react";
import "./Layout.css";

const Layout = () => {

const [bool, setBool] = useState(false);
const handleImgDbClick = (e) => {
  setBool(prev => !prev)
  e.target.style.width = bool ? "200px" : "25px"
  e.target.style.height = bool ? "200px" : "25px"
  e.target.style.marginTop = bool ? "90px" : "0px"
}

return(
  <div className="Layout" style ={{height:"auto", minHeight:"100vh", position:"relative"}}>
    <nav>
        <ul style ={{height:"40px", backgroundColor:"navy"}}>
          <li className="grow">
            <Link to="/">The Employee Madness</Link>
{/*             <img src="https://media.tenor.com/images/a1d1ba09fbd871e0bc44990bab058d8d/tenor.png" 
            width={25} height={25} 
            style ={{marginLeft: "10px", borderRadius: "450%"}}
            onDoubleClick = {(e) => handleImgDbClick(e)}
            /> */}
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
        }

export default Layout;
