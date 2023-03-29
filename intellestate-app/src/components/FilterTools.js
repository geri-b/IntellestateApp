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
import Checkbox from './filterToolComponents/SortingCheckBox';

function FilterTools(props) {
  //City Search Hooks
  const [cityName, setCityName] = useState('');

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
  };

  //Zipcode search hooks
  const [zipcodeName, setzipcodeName] = useState('');

  const handlezipcodeNameChange = (e) => {
    setzipcodeName(e.target.value);
  };
  //Street search hooks
  const [streetName, setstreetName] = useState('');

  const handlestreetNameChange = (e) => {
    setstreetName(e.target.value);
  };

  //Land dropdown hooks
  const [minSQFT, setMinSQFT] = useState('');
  const [maxSQFT, setMaxSQFT] = useState('');

  const handleMinSQFTChange = (event) => {
    setMinSQFT(event.target.value);
  };

  const handleMaxSQFTChange = (event) => {
    setMaxSQFT(event.target.value);
  };

  const handleApplyClick = () => {
    console.log(`Selected land square footage range: ${minSQFT} - ${maxSQFT}`);
  };
  //Building dropdown hooks
  const [minBuildingSQFT, setMinBuildingSQFT] = useState('');
  const [maxBuildingSQFT, setMaxBuildingSQFT] = useState('');

  const handleMinBuildingSQFTChange = (event) => {
    setMinBuildingSQFT(event.target.value);
  };

  const handleMaxBuildingSQFTChange = (event) => {
    setMaxBuildingSQFT(event.target.value);
  };

  const handleBuildingApplyClick = () => {
    console.log(`Selected building square footage range: ${minBuildingSQFT} - ${maxBuildingSQFT}`);
  };
  //Propert dropdown hooks
  // Property Type Hooks
  const [propertyTypes, setPropertyTypes] = useState({
    residential: false,
    commercial: false,
    institutional: false,
    government: false,
    industrial: false,
    agricultural: false,
    utility: false,
  });

  const handlePropertyTypeCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPropertyTypes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  //Price range dropdown hooks
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handlePriceApplyClick = () => {
    // Do something with the min and max price values
    console.log(`Selected price range: ${minPrice} - ${maxPrice}`);
  };

  //Sorting Hooks
  const [ratingWeights, setRatingWeights] = useState({
    price: false,
    income: false,
    diversity: false,
    crime: false,
    school: false,
  });


  const handleRatingWeightCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRatingWeights((prevState) => {
      const newState = {
        ...prevState,
        [name]: checked,
      };
      props.onRatingWeightsUpdate(newState);
      return newState;
    });
  };


  //Post to Server
  const handleSubmit = async () => {

    const requestBody = {
      city: cityName,
      ZIPCODE: zipcodeName,
      STREET: streetName,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minSQFT: minSQFT,
      maxSQFT: maxSQFT,
      minBuildingSQFT: minBuildingSQFT,
      maxBuildingSQFT: maxBuildingSQFT,
      propertyTypes: propertyTypes,
    };

    try {
      const response = await fetch("http://localhost:3001/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);
      props.onDataUpdate(data);
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
            <Col xs={12} className="my-2">
              <CitySearchBox cityName={cityName} onCityNameChange={handleCityNameChange} />
            </Col>
            <Col xs={12} className="my-2">
              <ZipcodeSearchBox zipcodeName={zipcodeName} onzipcodeNameChange={handlezipcodeNameChange} />
            </Col>
            <Col xs={12} className="my-2">
              <StreetNameSearchBox streetName={streetName} onstreetNameChange={handlestreetNameChange} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row className='justify-content-center my-3'>
        <ConfirmSearchButton onSearchClick={handleSubmit} />
      </Row>
      <Card className="mb-3">
        <Card.Header>Property Filters</Card.Header>
        <Card.Body>
          <Row className="my-2">
            <Col xs={12} className="my-2">
              <PropertyTypeDropdown
                propertyTypes={propertyTypes}
                onCheckboxChange={handlePropertyTypeCheckboxChange}
              />

            </Col>
            <Col xs={12} className="my-2">
              <PriceRangeDropdown
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={handleMinPriceChange}
                onMaxPriceChange={handleMaxPriceChange}
                onApplyClick={handlePriceApplyClick}
              />
            </Col>
            <Col xs={12} className="my-2">
              <BuildingSQFT
                minSQFT={minBuildingSQFT}
                maxSQFT={maxBuildingSQFT}
                onMinSQFTChange={handleMinBuildingSQFTChange}
                onMaxSQFTChange={handleMaxBuildingSQFTChange}
                onApplyClick={handleBuildingApplyClick}
              />
            </Col>
            <Col xs={12} className="my-2">
              <LandSQFTDropdown
                minSQFT={minSQFT}
                maxSQFT={maxSQFT}
                onMinSQFTChange={handleMinSQFTChange}
                onMaxSQFTChange={handleMaxSQFTChange}
                onApplyClick={handleApplyClick}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="my-2">
        <Col xs={12} className="my-2">
          <Card className="mb-3">
            <Card.Header>
              <h5>Sort by</h5>
            </Card.Header>
            <Card.Body>
              <p>
                <em>
                  Select a checkbox to sort a property based on what you are looking for. Don't worry, if you select multiple boxes we will sort the properties accordingly!
                </em>
              </p>
              <Checkbox label="Price" name="price" checked={ratingWeights.price} onChange={handleRatingWeightCheckboxChange} />
              <Checkbox label="Income" name="income" checked={ratingWeights.income} onChange={handleRatingWeightCheckboxChange} />
              <Checkbox label="Diversity" name="diversity" checked={ratingWeights.diversity} onChange={handleRatingWeightCheckboxChange} />
              <Checkbox label="Crime" name="crime" checked={ratingWeights.crime} onChange={handleRatingWeightCheckboxChange} />
              <Checkbox label="School" name="school" checked={ratingWeights.school} onChange={handleRatingWeightCheckboxChange} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FilterTools;
