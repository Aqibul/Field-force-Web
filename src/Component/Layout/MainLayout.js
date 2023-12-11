import { useState } from 'react';
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const MainLayout = ({ children }) => {
    const [menuVisible, setMenuVisible] = useState(true);
    const hideMenu = () => {
        setMenuVisible(!menuVisible);
    }
    return (
        <div className="d flex">
            <NavBar />

            <Row>
                {menuVisible ? (
                    <Col md={2} >
                        <div style={{ background: '#212529', color: 'white', padding: '10px', height: '600px' }}>
                            <ul className="navbar-nav flex-column">
                                <span onClick={hideMenu}><FontAwesomeIcon icon={faBars} /></span>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        <FontAwesomeIcon icon={faHome} /> <span>   </span>
                                        Dashbord</Link>
                                </li>
                                <li className="nav-item">

                                    <Link className="nav-link" to="/profile">
                                        <FontAwesomeIcon icon={faUser} /> <span>   </span>
                                        Profile</Link>
                                </li>
                                <li className="nav-item">

                                    <Link className="nav-link" to="/pjb">
                                        <FontAwesomeIcon icon={faUser} /> <span>   </span>
                                        Bjp</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">
                                        <FontAwesomeIcon icon={faUser} /> <span>    </span>
                                        Dealer</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">
                                        <FontAwesomeIcon icon={faUser} /> <span>    </span>
                                        Sub Dealer</Link>
                                </li>
                                <li class="nav-item">

                                    <a class="nav-link" href="#" data-toggle="collapse" data-target="#submenu2">
                                        <FontAwesomeIcon icon={faUser} /> <span>    </span>
                                        Clients
                                    </a>
                                    <ul class="submenu" id="submenu2">
                                        <li class="nav-item">
                                            <a class="nav-link" href="architect">
                                                Architect</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">Builder</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">Contractor</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">Competitor</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">Other</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">
                                        <FontAwesomeIcon icon={faUser} /> <span>    </span>
                                        Payments</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">
                                        <FontAwesomeIcon icon={faUser} /> <span>    </span>
                                        HelpDesk</Link>
                                </li>
                               
                            </ul>
                        </div>
                    </Col>
                ) : ""
                }
                <Col className={`side-menu ${menuVisible ? 'col-md-10' : ' p-3'}`}>
                    <div className="main mt-2">
                        {children}
                    </div>
                </Col>
            </Row>

        </div>

    )
}
export default MainLayout;