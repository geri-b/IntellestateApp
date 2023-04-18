import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomepageCarousel from "../components/HompageCarousel";
import HPCard1 from "../components/HPCard1";
import HPCard2 from "../components/HPCard2";
import HPCard3 from "../components/HPCard3";
import SearchBar from "../components/Searchbar";

function HomepageLayout({changePage}) {

  return (
    <Container fluid='true' style={{overflowY: 'auto', height: '100%'}}>
      <Row style={{margin: 0, padding: 0}}>
        <Col style={{padding: 0}}>
          <HomepageCarousel />
        </Col>
      </Row>
      <Row style={{display: 'flex', justifyContent: 'center', margin: 0, padding: 0}}>
      <SearchBar/>
      </Row>
      <Row style={{paddingTop: '150px', paddingBottom: '20px', margin: 0, paddingLeft: 0, paddingRight: 0}}>
        <Col className="d-flex justify-content-center align-items-center">
          <HPCard1 changePage={changePage} />
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <HPCard2 changePage={changePage} />
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <HPCard3 changePage={changePage} />
        </Col>
      </Row>
    </Container>
  );
}


export default HomepageLayout;