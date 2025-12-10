import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import logo from "../Images/logo-t.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const Header = () => {
  const dispatch= useDispatch();
  const navigate= useNavigate();

  
  const handleLogout = async () => {
    
    dispatch(logout());   // call the thunk
    navigate("/login");              // redirect after logout
  };
    return (
    <>
      <Navbar className="header">
        <Nav>
          <NavItem>
              <Link><img src={logo} className="logo"/></Link>
          </NavItem>          
          <NavItem>
              <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
              <Link to="/profile">Profile</Link>
          </NavItem>
          <NavItem>
          <button className="btn btn-link" onClick={handleLogout}>
            Logout
          </button>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
