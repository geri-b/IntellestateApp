import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navibar from "../components/Navibar";

function HomepageLayout() {
  return (
    <Container fluid="true">
      <Row>
        <Col>
          <Navibar />
        </Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
}

export default HomepageLayout;
