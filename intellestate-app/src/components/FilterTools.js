import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function FilterTools() {
  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
                <Button variant="outline-primary">
                    Filter 1
                </Button>
            </Nav.Link>
            <Nav.Link>
                <Button variant="outline-primary">
                    Filter 2
                </Button>
            </Nav.Link>
            <Nav.Link>
                <Button variant="outline-primary">
                    Filter 3
                </Button>
            </Nav.Link>
            <Nav.Link>
                <Button variant="outline-primary">
                    Filter 4
                </Button>
            </Nav.Link>
            <Nav.Link>
                <Button variant="outline-primary">
                    Filter 5
                </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FilterTools;
