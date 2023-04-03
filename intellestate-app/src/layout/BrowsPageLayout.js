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

  // Flag to check if search is in progress still.
  const [searchInProgress, setSearchInProgress] = useState(false);

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
  const [mapPopupOpen, setMapPopupOpen] = useState('');

  const handleDataUpdate = (newData) => {
    let currentPropertiesData = propertiesData;
    console.log(resetData);
    if (resetData) {
      currentPropertiesData = [];
      setOpenedProperties([]);
      setSelectedProperty({});
      setResetData(false); // Reset the flag after handling the data
    }

    let combinedData = [...currentPropertiesData];

    newData.forEach((property) => {
      if (!currentPropertiesData.find((existingProperty) => existingProperty.PARCELPIN === property.PARCELPIN)) {
        combinedData.push(property);
      }
    });
    setPropertiesData(combinedData);
    setSearchInProgress(false); // Set the searchInProgress flag back to false
  };

  const handleShowDetails = (property) => {
    setSelectedProperty(property);
    setMapPopupOpen('');
  };

  const handleSetSelectedMarker = (property) => {
    setMapPopupOpen(property.PARCELPIN)
    setSelectedProperty(property);
    document.getElementsByClassName(property.PARCELPIN)[0].scrollIntoView({behavior: 'smooth', block: 'center'});
  }


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
            onDataUpdate={handleDataUpdate} // On search click
            onRatingWeightsUpdate={setRatingWeights} // On change to checkbox
            onRatingWeightsValueUpdate={setRatingWeightsValue} // On Change to weight value
            setResetData={setResetData} // On reset filter click
            initialRatingWeights={ratingWeights} // Settting dafaults on checkbox and weight value change
            initialRatingWeightsValue={ratingWeightsValue}
            searchInProgress={searchInProgress} // Setting seachInProgress
            setSearchInProgress={setSearchInProgress} //handle search in progress change
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
            selectedProperty={selectedProperty}
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
          <PropertyDetails
            properties={propertiesData}
            property={selectedProperty}
            showDetails={handleSetSelectedMarker}
            popupOpen={mapPopupOpen}
            setPopupOpen={setMapPopupOpen}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default BrowsePageLayout;
