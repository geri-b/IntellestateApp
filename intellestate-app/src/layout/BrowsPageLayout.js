import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropertyCardGrid from '../components/PropertyCardGrid';
import { useState, useRef } from 'react';
import FilterTools from '../components/FilterTools';
import PropertyDetails from '../components/PropertyDetails';
import { Button } from 'react-bootstrap';

function BrowsePageLayout() {
  // Ref to use handleLoadMoreClick function from parent component
  const filterToolsRef = useRef(null);

  // Flag To handle reset if the user adds information to one of the hard filters
  const [resetData, setResetData] = useState(false);

  const [propertiesData, setPropertiesData] = useState([]);

  const [ratingWeights, setRatingWeights] = useState({
    price: false,
    income: false,
    diversity: false,
    crime: false,
    school: false,
  });

  const [ratingWeightsValue, setRatingWeightsValue] = useState({
    price: 1,
    income: 1,
    diversity: 1,
    crime: 1,
    school: 1,
  });

  const [openedProperties, setOpenedProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState({});

  const sortProperties = (properties, ratingWeights, ratingWeightsValue) => {
    // Find the number of selected checkboxes
    const selectedWeights = Object.keys(ratingWeights).filter((key) => ratingWeights[key]);

    // Calculate the overall rating for each property based on the selected checkboxes
    properties.forEach((property) => {
        let overallRating = 0;

        selectedWeights.forEach((weight) => {
            const ratingKey = weight[0] + "_rating"; // e.g., p_rating, i_rating, etc.
            if (property[ratingKey]) {
                overallRating += property[ratingKey] * ratingWeightsValue[weight];
            }
        });
        property.overallRating = overallRating;
        console.log(property.overallRating);
    });

    // Sort the properties based on the calculated overall rating
    return properties.sort((a, b) => b.overallRating - a.overallRating);
  };


  const handleDataUpdate = (newData) => {
    let currentPropertiesData = propertiesData;

    if (resetData) {
      currentPropertiesData = [];
      setOpenedProperties([]);
      setSelectedProperty({});
      setResetData(false); // Reset the flag after handling the data
    }

    let combinedData = [...currentPropertiesData, ...newData];
    setPropertiesData(combinedData);
  };

  const handleSortClick = () => {
    const sortedProperties = sortProperties([...propertiesData], ratingWeights, ratingWeightsValue);
    console.log(sortedProperties);
    setPropertiesData(sortedProperties);
  };

  const handleShowDetails = (property) => {
    setSelectedProperty(property)
  };


  return (
    <Container fluid style={{ height: "calc(100% - 57.8px)" }}>
      <Row style={{ height: "100%", overflowY: "auto" }}>
        <Col
          className="left-col"
          md={3}
          style={{ height: "100%", overflowY: "auto" }}
        >
          <FilterTools
            ref={filterToolsRef}
            onDataUpdate={handleDataUpdate}
            onRatingWeightsUpdate={setRatingWeights}
            onRatingWeightsValueUpdate={setRatingWeightsValue}
            setResetData={setResetData}
            onSortClick={handleSortClick}
            initialRatingWeights={ratingWeights}
            initialRatingWeightsValue={ratingWeightsValue}
          />
        </Col>
        <Col md={6} style={{ height: "100%", overflowY: "auto" }}>
          <div
            className={propertiesData.length === 0 ? '' : 'hide'}
            style={{display: 'flex', height: '20%', justifyContent: 'center', alignItems: 'center', opacity: '50%'}}
          >
            Perform a search to see property recommendations.
          </div>
          <PropertyCardGrid
            properties={propertiesData}
            openedProperties={openedProperties}
            setOpenedProperties={setOpenedProperties}
            showDetails={handleShowDetails}
          />
          <Button
            className={propertiesData.length === 0 ? 'hide' : ''}
            onClick={() => { filterToolsRef.current.handleLoadMoreClick(); }}
            >Load More
          </Button>
        </Col>
        <Col
          className="right-col"
          md={3}
          style={{
            height: "100%",
            overflowY: "auto",
            background: "#f8f9fa",
          }}
        >
          <PropertyDetails properties={propertiesData} property={selectedProperty} />
        </Col>
      </Row>
    </Container>
  );
}

export default BrowsePageLayout;
