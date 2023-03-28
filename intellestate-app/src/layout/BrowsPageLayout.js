import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropertyCardGrid from '../components/PropertyCardGrid';
import { useState } from 'react';
import FilterTools from '../components/FilterTools';
import PropertyDetails from '../components/PropertyDetails';

function BrowsePageLayout() {
  const [propertiesData, setPropertiesData] = useState([]);

  const handleDataUpdate = (data) => {
    setPropertiesData(data);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="left-col" md={3} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <FilterTools onDataUpdate={handleDataUpdate} />
        </Col>
        <Col md={6} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <PropertyCardGrid properties={propertiesData} />
        </Col>
        <Col className="right-col" md={3} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <PropertyDetails/>
        </Col>
      </Row>
    </Container>
  );
}

export default BrowsePageLayout;
