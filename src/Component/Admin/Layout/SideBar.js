import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const SideBar = () => {
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="flex-column">
        <Navbar.Brand as={Link} to="/">My React App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/about">Profile</Nav.Link>
                <Nav.Link as={Link} to="/contact">Pjp</Nav.Link>
                <Nav.Link as={Link} to="/">Dealer</Nav.Link>
                <Nav.Link as={Link} to="/about">SubDealer</Nav.Link>
                <Nav.Link>
                    
                    <Nav className="ml-2"> {/* Add margin for better spacing */}
                        <Nav.Link as={Link} to="/clients/payments">Payments</Nav.Link>
                        {/* Add more submenu items here */}
                    </Nav>
                </Nav.Link>
                <Nav.Link as={Link} to="/">Payments</Nav.Link>
                <Nav.Link as={Link} to="/about">HelpDesk</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}
export default SideBar;