import { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const AdminLayout = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(true);
  const hideMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <div className="d flex">
      <NavBar />

      <Row>
        {menuVisible ? (
          <Col md={2}>
            <div
              style={{
                background: "#212529",
                color: "white",
                padding: "10px",
                height: "600px",
              }}
            >
              <ul className="navbar-nav flex-column">
                <span onClick={hideMenu}>
                  <FontAwesomeIcon icon={faBars} />
                </span>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/home">
                    <FontAwesomeIcon icon={faHome} /> <span> </span>
                    Dashbord
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/addcategory">
                    <FontAwesomeIcon icon={faUser} /> <span> </span>
                    Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/add-roles">
                    <FontAwesomeIcon icon={faUser} /> <span> </span>
                    Role
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/add-dealer">
                    <FontAwesomeIcon icon={faUser} /> <span> </span>
                    Add Dealer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/sub-dealer">
                    <FontAwesomeIcon icon={faUser} /> <span> </span>
                    Sub Dealer
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        ) : (
          ""
        )}
        <Col className={`side-menu ${menuVisible ? "col-md-10" : " p-3"}`}>
          <div className="main mt-2">{children}</div>
        </Col>
      </Row>
    </div>
  );
};
export default AdminLayout;
