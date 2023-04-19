import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropertyCardGrid from '../components/PropertyCardGrid';
import { useState, useRef } from 'react';
import FilterTools from '../components/FilterTools';
import PropertyDetails from '../components/PropertyDetails';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';

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
  const mapRef = useRef();

  const handleDataUpdate = (newData) => {
    let currentPropertiesData = propertiesData;
    console.log(resetData);
    if (resetData) {
      currentPropertiesData = [];
      setOpenedProperties([]);
      setSelectedProperty({});
      setMapPopupOpen('');
      setPropertyTypesData([]);
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

    if (property.PARCELPIN !== selectedProperty.PARCELPIN) {
      setSelectedProperty(property);
      setMapPopupOpen('');
      mapRef.current.flyTo({
        center: [property.AVG_LONG, property.AVG_LAT],
        zoom: 13,
        essential: true,
      });
    }
  };

  const handleSetSelectedMarker = (property) => {
    setMapPopupOpen(property.PARCELPIN)
    setSelectedProperty(property);
    document.getElementsByClassName(property.PARCELPIN)[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const [shapeValues, setShapeValues] = useState(null);
  const [geographicShapes, setGeographicShapes] = useState(null);

  const loadGeographicShapes = async () => {
    let initialGeoShapes = {};
    const tractResponse = await fetch('/TractShapes.geojson');
    const tractJson = await tractResponse.json();
    initialGeoShapes['tract'] = tractJson;
    const cityResponse = await fetch('/CityShapes.geojson');
    const cityJson = await cityResponse.json();
    initialGeoShapes['city'] = cityJson;
    setGeographicShapes(initialGeoShapes);
  };
  
  useEffect(() => {
    loadGeographicShapes();
  }, []);
  
  const setHotspots = async (aType, hType, hSubType) => {
    const requestBody = {
      areaType: aType,
      hotspotType: hType,
      hotspotSubType: hSubType,
    };

    try {
      const response = await fetch("http://localhost:3001/hotspots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (geographicShapes[aType]) {
        let newShapeValues = {...geographicShapes[aType]};
        let newFeatures = [];
        for (const feature of newShapeValues.features) {
          let newFeature = {...feature};
          newFeature.properties.hotspotValue = -1;
          if (aType === 'tract') {
            for (const tractData of data) {
              if (Number(tractData.tract) === newFeature.id) {
                newFeature.properties.hotspotValue = Math.round(Number(tractData.pei) * 100) / 10;
              }
            }
          } else if (aType === 'city') {
            for (const cityData of data) {
              if (cityData.city.toLowerCase() === newFeature.properties.name.toLowerCase()) {
                newFeature.properties.hotspotValue = Math.round(Number(cityData.pei) * 100) / 10;
              }
            }
          }
          newFeatures.push(newFeature);
        }
        newShapeValues.features = newFeatures;
        setShapeValues(newShapeValues);
      }
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const [propertyTypesData, setPropertyTypesData] = useState([]);

  const setPropertyTypes = async (pType, pSubType) => {
    if (isNaN(selectedProperty.AVG_LAT) || isNaN(selectedProperty.AVG_LONG)) {
      console.log('No property currently selected.');
    } else {
      const requestBody = {
        propertyType: pType,
        propertySubType: pSubType,
        currentPropLong: selectedProperty.AVG_LONG,
        currentPropLat: selectedProperty.AVG_LAT,
      };

      try {
        const response = await fetch("http://localhost:3001/propertyTypes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        setPropertyTypesData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  return (
    <Container fluid style={{ height: "100%", overflow: 'hidden' }}>
      <Row style={{ height: "100%", overflowY: "auto" }}>
        <Col
          className="left-col"
          md={3}
          style={{ height: "100%", overflowY: "auto", background: "linear-gradient(90deg, #123 0%, #203a60 100%)", minWidth: 'min-content' }} // bg #f8f9fa or linear-gradient(180deg, #059 0%, #509 100%)
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
        <Col
          className="right-col"
          style={{
            height: "100%",
            overflowY: "hidden",
            padding: '.75rem 0',
            background: 'linear-gradient(90deg, #203a60  0%, #203a60 100%)'
            // background: 'linear-gradient(90deg, #203a60 0%, white 10%, white 90%, #203a60 100%)'
          }}
        >
          <Col style={{height: "100%", overflowY: "auto", background: 'white', padding: '5px', borderRadius: '6px'}}>
            <PropertyDetails
              properties={propertiesData}
              property={selectedProperty}
              showDetails={handleSetSelectedMarker}
              popupOpen={mapPopupOpen}
              setPopupOpen={setMapPopupOpen}
              mapRef={mapRef}
              shapes={shapeValues}
              setHotspots={setHotspots}
              geographicShapes={geographicShapes}
              setPropertyTypes={setPropertyTypes}
              propertyTypesData={propertyTypesData}
            />
          </Col>
        </Col>
        <Col md={3} style={{ minWidth: 'min-content', height: "100%", overflowY: "hidden", background: "linear-gradient(270deg, #123 0%, #203a60 100%)", padding: '10px 0 .75rem .75rem' }}> {/*linear-gradient(0deg, #059 0%, #0d8 100%) */}
          <div style={{height: '100%', overflow: 'auto', paddingRight: '.75rem', borderRadius: '6px'}}>
          <h3 style={{margin: '0', color: 'white'}}>Recommended Matches</h3><div style={{color: 'white'}}>(Based on 5 rating categories)</div>
          <div
            className={propertiesData.length === 0 ? '' : 'hide'}
            style={{ display: 'flex', height: '20%', justifyContent: 'center', alignItems: 'center', opacity: '75%', color: 'white' }}
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BrowsePageLayout;
