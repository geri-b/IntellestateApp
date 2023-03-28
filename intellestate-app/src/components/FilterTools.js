import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PriceRangeDropdown from './filterToolComponents/PriceRangeDropdown';
import PropertyTypeDropdown from './filterToolComponents/PropertyTypesDropdown';
import BuildingSQFT from './filterToolComponents/BuildingSQFT';
import CitySearchBox from './filterToolComponents/CitySearchBox';
import LandSQFTDropdown from './filterToolComponents/LandSQFTDropdown';
import ZipcodeSearchBox from './filterToolComponents/ZipcodeSearchBox';
import StreetNameSearchBox from './filterToolComponents/StreetNameSearchBox';
import ConfirmSearchButton from './filterToolComponents/ConfirmSearchButton';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import '../App.css';

function FilterTools() {
  //City Search Hooks
  const [cityName, setCityName] = useState("");

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
  };

  //Zipcode search hooks
  const [zipcodeName, setzipcodeName] = useState("");

  const handlezipcodeNameChange = (e) => {
      setzipcodeName(e.target.value);
  };
  //Street search hooks
  const [streetName, setstreetName] = useState("");

  const handlestreetNameChange = (e) => {
      setstreetName(e.target.value);
  };

  //Land dropdown hooks

  //Building dropdown hooks

  //Propert dropdown hooks

  //Price range dropdown hooks


  //Post to Server
  const handleSubmit = async () => {

    const requestBody = { city: cityName };

    try {
      const response = await fetch("http://localhost:3001/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container className="filters-container p-3 rounded">
      <h2 className="my-4 text-center">Search Properties</h2>
      <Card className="mb-3">
        <Card.Header>Location Filters</Card.Header>
        <Card.Body>
          <Row className="my-2">
            <Col xs={12} sm={6} md={4} className="my-2">
              <CitySearchBox cityName={cityName} onCityNameChange={handleCityNameChange} />
            </Col>
            <Col xs={12} sm={6} md={4} className="my-2">
              <ZipcodeSearchBox zipcodeName={zipcodeName} onzipcodeNameChange={handlezipcodeNameChange}/>
            </Col>
            <Col xs={12} sm={12} md={4} className="my-2">
              <StreetNameSearchBox streetName={streetName} onstreetNameChange={handlestreetNameChange}/>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Header>Property Filters</Card.Header>
        <Card.Body>
          <Row className="my-2">
            <Col xs={12} sm={6} md={4} xlg={3} className="my-2">
              <PropertyTypeDropdown />
            </Col>
            <Col xs={12} sm={6} md={4} xlg={3} className="my-2">
              <PriceRangeDropdown />
            </Col>
            <Col xs={12} sm={6} md={4} xlg={3} className="my-2">
              <BuildingSQFT />
            </Col>
            <Col xs={12} sm={6} md={12} xlg={3} className="my-2">
              <LandSQFTDropdown />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="my-2">
        <Col xs={12} className="text-center my-2">
          <ConfirmSearchButton onSearchClick={handleSubmit}/>
        </Col>
      </Row>
    </Container>
  );
}

export default FilterTools;
