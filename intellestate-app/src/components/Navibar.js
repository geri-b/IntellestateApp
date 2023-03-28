import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navibar({ handlePageChange }) {
  return (
    <Navbar bg="light" expand="lg" 
    style={{
      paddingTop: '20px',
      paddingBottom: '15px'
    }}>
      <Container >
        <Navbar.Brand href="#home">Intellestate</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handlePageChange('home')}>Home</Nav.Link>
            <Nav.Link onClick={() => handlePageChange('browse')}>Browse Properties</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;