import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropertyCardGrid from '../components/PropertyCardGrid';
import { useState } from 'react';
import FilterTools from '../components/FilterTools';
import PropertyDetails from '../components/PropertyDetails';

function BrowsePageLayout() {
  const [propertiesData, setPropertiesData] = useState([]);

  const [ratingWeights, setRatingWeights] = useState({
    price: false,
    income: false,
    diversity: false,
    crime: false,
    school: false,
  });

  const sortProperties = (properties, ratingWeights) => {
    // Find the number of selected checkboxes
    const selectedWeights = Object.keys(ratingWeights).filter((key) => ratingWeights[key]);
    const numSelected = selectedWeights.length;

    // Calculate the overall rating for each property based on the selected checkboxes
    properties.forEach((property) => {
      let overallRating = 0;

      selectedWeights.forEach((weight) => {
        const ratingKey = weight[0] + "_rating"; // e.g., p_rating, i_rating, etc.
        if (property[ratingKey]) {
          overallRating += property[ratingKey];
        }
      });

      // Normalize the overall rating by the number of selected checkboxes
      if (numSelected > 0) {
        overallRating /= numSelected;
      }
      property.overallRating = overallRating;
      console.log(property.overallRating);
    });
    
    // Sort the properties based on the calculated overall rating
    return properties.sort((a, b) => b.overallRating - a.overallRating);
  };


  const handleDataUpdate = (data) => {
    const sortedProperties = sortProperties(data, ratingWeights);
    setPropertiesData(sortedProperties);
  };


  return (
    <Container fluid>
      <Row>
        <Col className="left-col" md={3} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <FilterTools onDataUpdate={handleDataUpdate} onRatingWeightsUpdate={setRatingWeights} />
        </Col>
        <Col md={6} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <PropertyCardGrid properties={propertiesData} />
        </Col>
        <Col className="right-col" md={3} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <PropertyDetails />
        </Col>
      </Row>
    </Container>
  );
}

export default BrowsePageLayout;
