import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navibar({ handlePageChange }) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Intellestate</Navbar.Brand>
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
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navibar;
