import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomepageCarousel from "../components/HompageCarousel";
import SearchBar from "../components/Searchbar";
import Cards from "../components/Cards";
function HomepageLayout() {
  return (
    <Container fluid='true'>
      <Row style={{
        background: 'conic-gradient(at 50% 50%, #FFFFFF, #F5F5DC 50%, #FFFFFF 90%)',
      }}>
        <Col className="mx-auto d-flex justify-content-center" style={{ width: "100%" }}>
          <HomepageCarousel />
        </Col>

      </Row>
      <Row >
        <Col className="mx-auto d-flex justify-content-center" style={{ height: '300px' }}>
          <SearchBar />
        </Col>
      </Row>
      <Row>
        <Col md>
          <Cards />
        </Col>
        <Col md>
          <Cards />
        </Col>
        <Col md>
          <Cards />
        </Col>
      </Row>
      <Row>
        <Col>
          Footer
        </Col>
      </Row>
    </Container>
  );
}


export default HomepageLayout;




