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
import { Button, Card } from 'react-bootstrap';
import '../App.css';
import Checkbox from './filterToolComponents/CheckBox';
import { forwardRef, useImperativeHandle } from 'react';

function FilterTools(props, ref) {
  //

  //reset form value hooks
  const resetFormValues = () => {
    setCityName('');
    setzipcodeName('');
    setstreetName('');
    setMinPrice('');
    setMaxPrice('');
    setMinSQFT('');
    setMaxSQFT('');
    setMinBuildingSQFT('');
    setMaxBuildingSQFT('');
    setPropertyTypes({
      residential: false,
      commercial: false,
      institutional: false,
      government: false,
      industrial: false,
      agricultural: false,
      utility: false,
    });
    setRatingWeights({
      price: false,
      income: false,
      diversity: false,
      crime: false,
      school: false,
    });
  };

  const handleResetFilters = () => {
    resetFormValues();
    props.setResetData(true);
    const data = [];
    props.onDataUpdate(data);
  };

  //load more pages hooks
  useImperativeHandle(ref, () => ({
    handleLoadMoreClick,
  }));

  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMoreClick = () => {
    setCurrentPage(currentPage + 1);
    handleSubmit(currentPage + 1);
  };
  //City Search Hooks
  const [cityName, setCityName] = useState('');

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
    props.setResetData(true);
  };

  //Zipcode search hooks
  const [zipcodeName, setzipcodeName] = useState('');

  const handlezipcodeNameChange = (e) => {
    setzipcodeName(e.target.value);
    props.setResetData(true);
  };
  //Street search hooks
  const [streetName, setstreetName] = useState('');

  const handlestreetNameChange = (e) => {
    setstreetName(e.target.value);
    props.setResetData(true);
  };

  //Land dropdown hooks
  const [minSQFT, setMinSQFT] = useState('');
  const [maxSQFT, setMaxSQFT] = useState('');

  const handleMinSQFTChange = (event) => {
    setMinSQFT(event.target.value);
    props.setResetData(true);
  };

  const handleMaxSQFTChange = (event) => {
    setMaxSQFT(event.target.value);
    props.setResetData(true);
  };

  const handleApplyClick = () => {
    console.log(`Selected land square footage range: ${minSQFT} - ${maxSQFT}`);
  };
  //Building dropdown hooks
  const [minBuildingSQFT, setMinBuildingSQFT] = useState('');
  const [maxBuildingSQFT, setMaxBuildingSQFT] = useState('');

  const handleMinBuildingSQFTChange = (event) => {
    setMinBuildingSQFT(event.target.value);
    props.setResetData(true);
  };

  const handleMaxBuildingSQFTChange = (event) => {
    setMaxBuildingSQFT(event.target.value);
    props.setResetData(true);
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
    props.setResetData(true);
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
    props.setResetData(true);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    props.setResetData(true);
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

  const [ratingWeightsValue, setRatingWeightsValue] = useState({
    price: 1,
    income: 1,
    diversity: 1,
    crime: 1,
    school: 1,
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

  const handleRatingWeightInputChange = (e) => {
    const { name, value } = e.target;
    const propName = name.replace("_weight", "");
    setRatingWeightsValue((prev) => ({ ...prev, [propName]: Number(value) }));
    props.onRatingWeightsValueUpdate(ratingWeightsValue);
  };


  //Post to Server
  const handleSubmit = async (page = 1) => {

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
      page: page,
    };

    try {
      const response = await fetch("http://localhost:3001/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      props.onDataUpdate(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container className="filters-container p-3 rounded">
      <h2 className="my-4 text-center">Search Properties</h2>
      <Button className='my-2' style={{ maxWidth: '200px' }} onClick={handleResetFilters}> Reset Filters</Button>
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
        <ConfirmSearchButton onSearchClick={() => { setCurrentPage(1); handleSubmit(1); }} />
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
              <Checkbox
                label="Price"
                name="price"
                checked={ratingWeights.price}
                onChange={handleRatingWeightCheckboxChange}
                weight={ratingWeightsValue.price}
                onWeightChange={handleRatingWeightInputChange}
              />
              <Checkbox
                label="Income"
                name="income"
                checked={ratingWeights.income}
                onChange={handleRatingWeightCheckboxChange}
                weight={ratingWeightsValue.income}
                onWeightChange={handleRatingWeightInputChange}
              />
              <Checkbox
                label="Diversity"
                name="diversity"
                checked={ratingWeights.diversity}
                onChange={handleRatingWeightCheckboxChange}
                weight={ratingWeightsValue.diversity}
                onWeightChange={handleRatingWeightInputChange}
              />
              <Checkbox
                label="Crime"
                name="crime"
                checked={ratingWeights.crime}
                onChange={handleRatingWeightCheckboxChange}
                weight={ratingWeightsValue.crime}
                onWeightChange={handleRatingWeightInputChange}
              />
              <Checkbox
                label="School"
                name="school"
                checked={ratingWeights.school}
                onChange={handleRatingWeightCheckboxChange}
                weight={ratingWeightsValue.school}
                onWeightChange={handleRatingWeightInputChange}
              />
              <Button
                className="mt-2"
                variant="primary"
                onClick={() => {
                  props.onSortClick();
                }}
              >
                Sort
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default forwardRef(FilterTools);
