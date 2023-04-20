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
    price: true,
    income: true,
    diversity: true,
    crime: true,
    school: true,
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
<<<<<<< Updated upstream
    setSelectedProperty(property);
    setMapPopupOpen('');
=======
    if (property.ind_farm < 0.02) {
      property.ind_other += property.ind_farm;
      property.ind_farm = null;
    }

    if (property.ind_mining < 0.02) {
      property.ind_other += property.ind_mining;
      property.ind_mining = null;
    }

    if (property.ind_utility < 0.02) {
      property.ind_other += property.ind_utility;
      property.ind_utility = null;
    }
    if (property.ind_retail < 0.02) {
      property.ind_other += property.ind_retail;
      property.ind_retail = null;
    }
    if (property.ind_construction < 0.02) {
      property.ind_other += property.ind_construction;
      property.ind_construction = null;
    }
    if (property.ind_manufacture < 0.02) {
      property.ind_other += property.ind_manufacture;
      property.ind_manufacture = null;
    }
    if (property.ind_wholesale < 0.02) {
      property.ind_other += property.ind_wholesale
      property.ind_wholesale = null;
    }
    if (property.ind_transport < 0.02) {
      property.ind_other += property.ind_transport;
      property.ind_transport = null;
    }
    if (property.ind_real_estate < 0.02) {
      property.ind_other += property.ind_real_estate;
      property.ind_real_estate = null;
    }
    if (property.ind_science < 0.02) {
      property.ind_other += property.ind_science;
      property.ind_science = null;
    }
    if (property.ind_management < 0.02) {
      property.ind_other += property.ind_management;
      property.ind_management = null;
    }
    if (property.ind_waste < 0.02) {
      property.ind_other += property.ind_waste;
      property.ind_waste = null;
    }
    if (property.ind_finance < 0.02) {
      property.ind_other += property.ind_finance;
      property.ind_finance = null;
    }
    if (property.ind_it < 0.02) {
      property.ind_other += property.ind_it;
      property.ind_it = null;
    }
    if (property.ind_education < 0.02) {
      property.ind_other += property.ind_education;
      property.ind_education = null;
    }
    if (property.ind_health_care < 0.02) {
      property.ind_other += property.ind_health_care;
      property.ind_health_care = null;
    }
    if (property.ind_entertain < 0.02) {
      property.ind_other += property.ind_entertain;
      property.ind_entertain = null;
    }
    if (property.ind_food_service < 0.02) {
      property.ind_other += property.ind_food_service;
      property.ind_food_service = null;
    }

    if (property.ind_public_admin < 0.02) {
      property.ind_other += property.ind_public_admin;
      property.ind_public_admin = null;
    }
    if (property.d_indigenous < 0.005){
      property.d_indigenous = null;
    }
    if (property.d_pacific < 0.005){
      property.d_pacific = null;
    }
    if (property.d_asian < 0.005){
      property.d_asian = null;
    }

    if (property.PARCELPIN !== selectedProperty.PARCELPIN) {
      setSelectedProperty(property);
      setMapPopupOpen('');
      mapRef.current.flyTo({
        center: [property.AVG_LONG, property.AVG_LAT],
        zoom: 13,
        essential: true,
      });
    }
>>>>>>> Stashed changes
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
