import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomepageCarousel from "../components/HompageCarousel";
import HPCard1 from "../components/HPCard1";
import HPCard2 from "../components/HPCard2";
import HPCard3 from "../components/HPCard3";
import SearchBar from "../components/Searchbar";

function HomepageLayout() {

  return (
    <Container fluid='true' style={{overflowY: 'auto', height: 'calc(100% - 57.8px)'}}>
      <Row>
        <Col>
          <HomepageCarousel />
        </Col>
      </Row>
      <Row style={{display: 'flex', justifyContent: 'center'}}>
      <SearchBar/>
      </Row>
      <Row style={{paddingTop: '150px', paddingBottom: '20px'}}>
        <Col className="d-flex justify-content-center align-items-center">
          <HPCard1 />
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <HPCard2 />
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <HPCard3 />
        </Col>
      </Row>
    </Container>
  );
}


export default HomepageLayout;