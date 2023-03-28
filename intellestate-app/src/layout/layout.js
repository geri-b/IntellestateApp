import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomepageCarousel from "../components/HompageCarousel";
import FilterTools from "../components/FilterTools";
import { useState } from "react";

function HomepageLayout() {
  const [propertiesData, setPropertiesData] = useState([]);

  const handleDataUpdate = (data) => {
    setPropertiesData(data);
  };
  return (
    <Container fluid='true'>
      <Row>
        <Col className="mx-auto d-flex justify-content-center" style={{ width: "100%" }}>
          <HomepageCarousel />
          
        </Col>
      </Row>
      <Row >
        <hr className="my-4" />
        <FilterTools onDataUpdate={handleDataUpdate}/>
        <hr className="my-4" />
      </Row>
      <Row>
        <Col>
          
        </Col>
      </Row>
    </Container>
  );
}


export default HomepageLayout;




