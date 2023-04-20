import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo/logo.png';


function Navibar({ handlePageChange }) {
    return (
        <Navbar bg="white" expand="lg" style={{borderBottom: '1px solid lightgrey'}}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick={() => handlePageChange("home")}  style = {{ color: "#007BFF" }}>
                        Home
                    </Nav.Link>
                    <Nav.Link onClick={() => handlePageChange("browse")} style = {{ color: "#007BFF" }}>
                        Browse Properties
                    </Nav.Link>
                </Nav>
                <Navbar.Brand href="#home">
                        <img
                        src= {logo}
                        width="200"
                        height="30"
                        className="d-inline-block align-top mx-auto"
                        alt="Intellestate Logo"
                        />
                    </Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navibar;
