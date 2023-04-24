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
import { Button, Card, Form } from 'react-bootstrap';
import '../App.css';
import Checkbox from './filterToolComponents/CheckBox';
import { forwardRef, useImperativeHandle } from 'react';
import StreetNumBox from './filterToolComponents/StreetNumberBox';
import SuffixSearchBox from './filterToolComponents/SuffixSearchBox';

function FilterTools(props, ref) {

  //reset form value hooks
  const resetFormValues = () => {
    props.setCityName('');
    setzipcodeName('');
    setstreetName('');
    setMinPrice('');
    setMaxPrice('');
    setMinSQFT('');
    setMaxSQFT('');
    setMinBuildingSQFT('');
    setMaxBuildingSQFT('');
    setSuffixName('');
    setStreetNum('');
    setPropertyTypes({
      residential: false,
      commercial: false,
      institutional: false,
      government: false,
      industrial: false,
      agricultural: false,
      utility: false,
      mixed: false,
      other: false,
    });
    setRatingWeights({
      price: true,
      income: true,
      diversity: true,
      crime: true,
      school: true,
    });
    setRatingWeightsValue({
      price: 1,
      income: 1,
      diversity: 1,
      crime: 1,
      school: 1,
    });
    setInvertChecked({
      price: false,
      income: false,
      diversity: false,
      crime: false,
      school: false,
    });
    setAlgorithmType('dot_product');
    setIncludeVacant(false);
  };

  const handleResetFilters = () => {
    resetFormValues();
    props.setResetData(true);
    // const data = [];
    // props.onDataUpdate(data);
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

  const handleCityNameChange = (e) => {
    props.setCityName(e.target.value);
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
  // StreetNum search hooks
  const [streetNum, setStreetNum] = useState('');

  const handlestreetNumChange = (e) => {
    setStreetNum(e.target.value);
    props.setResetData(true);
  };
  // Suffux Search hooks
  const [suffixName, setSuffixName] = useState('');

  const handlesSuffixfNameChange = (e) => {
    setSuffixName(e.target.value);
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
    mixed: false,
    other: false,
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

  const handleRatingWeightCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRatingWeights((prevState) => {
      const newState = {
        ...prevState,
        [name]: checked,
      };
      props.onRatingWeightsUpdate(newState);
      console.log(newState)
      props.setResetData(true);
      return newState;
    });
  };

  const handleRatingWeightInputChange = (e) => {
    const { name, value } = e.target;
    const propName = name.replace("_weight", "");
    setRatingWeightsValue((prev) => ({ ...prev, [propName]: Number(value) }));
    props.onRatingWeightsValueUpdate(ratingWeightsValue);
    props.setResetData(true);

  };


  //Post to Server
  const handleSubmit = async (page = 1) => {
    props.setSearchInProgress(true); // Set the searchInProgress flag to true when search is initiated
    const requestBody = {
      city: props.cityName,
      ZIPCODE: zipcodeName,
      streetNum: streetNum,
      suffixName: suffixName,
      STREET: streetName,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minSQFT: minSQFT,
      maxSQFT: maxSQFT,
      minBuildingSQFT: minBuildingSQFT,
      maxBuildingSQFT: maxBuildingSQFT,
      propertyTypes: propertyTypes,
      page: page,
      ratingWeights: ratingWeights,
      ratingWeightsValue: ratingWeightsValue,
      invertChecked: invertChecked,
      algorithmType: algorithmType,
      includeVacant: includeVacant,
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

  const [invertChecked, setInvertChecked] = useState({
    price: false,
    income: false,
    diversity: false,
    crime: false,
    school: false,
  });

  const handleInvertClick = (name) => {
    setInvertChecked((prevInvertChecked) => ({
      ...prevInvertChecked,
      [name]: !prevInvertChecked[name],
    }));
    props.setResetData(true);
  };

  const [algorithmType, setAlgorithmType] = useState('dot_product');
  const [includeVacant, setIncludeVacant] = useState(false);

  const handleAlgorithmTypeChange = (event) => {
    setAlgorithmType(event.target.value);
    props.setResetData(true);
  };

  const handleIncludeVacantPropsChange = (event) => {
    setIncludeVacant(event.target.checked);
    props.setResetData(true);
  };

  return (
    <Container style={{ margin: 0, display: 'grid', gap: '10px', padding: '0 .75rem', height: '100%', overflowY: 'auto', borderRadius: '6px' }}>
      <h3 className="text-center" style={{ color: 'white', margin: 0, fontWeight: 'bold', height: '33px' }}>Search Properties</h3> {/** #d0f */}
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Header style={{fontWeight: 'bold', fontSize: '20px', color: 'black', height: '41px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              Recommendation Weights
            </Card.Header>
            <Card.Body id='rec-weights-cbody' style={{display: 'grid', gap: '5px', overflow: 'auto', padding: '5px 1rem 10px 1rem'}}>
              <div>
                <em>
                  Which categories do you prioritize most?
                  {/* Select the attributes you're looking for. If one matters more to you, increase its weight. Don't like our default scoring? Toggle inversion to look for properties with a lower score instead! */}
                </em>
              </div>
              <Checkbox
                label="Price"
                name="price"
                checked={ratingWeights.price}
                onChange={handleRatingWeightCheckboxChange}
                weight={ratingWeightsValue.price}
                onWeightChange={handleRatingWeightInputChange}
                invertChecked={invertChecked.price}
                onInvertClick={() => handleInvertClick("price")}
              />
              <Checkbox
                label="Crime"
                name="crime"
                checked={ratingWeights.crime}
                onChange={handleRatingWeightCheckboxChange}
                weight={ratingWeightsValue.crime}
                onWeightChange={handleRatingWeightInputChange}
                invertChecked={invertChecked.crime}
                onInvertClick={() => handleInvertClick("crime")}
              />
              <Checkbox
                label="School"
                name="school"
                checked={ratingWeights.school}
                onChange={handleRatingWeightCheckboxChange}
                weight={ratingWeightsValue.school}
                onWeightChange={handleRatingWeightInputChange}
                invertChecked={invertChecked.school}
                onInvertClick={() => handleInvertClick("school")}
              />
              <Checkbox
                label="Income"
                name="income"
                checked={ratingWeights.income}
                onChange={handleRatingWeightCheckboxChange}
                weight={ratingWeightsValue.income}
                onWeightChange={handleRatingWeightInputChange}
                invertChecked={invertChecked.income}
                onInvertClick={() => handleInvertClick("income")}
              />
              <Checkbox
                label="Diversity"
                name="diversity"
                checked={ratingWeights.diversity}
                onChange={handleRatingWeightCheckboxChange}
                weight={ratingWeightsValue.diversity}
                onWeightChange={handleRatingWeightInputChange}
                invertChecked={invertChecked.diversity}
                onInvertClick={() => handleInvertClick("diversity")}
              />
              <hr style={{margin: '.5rem'}}></hr>
              <Row style={{margin: 0, padding: 0, gap: '5px', justifyContent: 'center'}}>
                <div style={{display: 'flex', margin: 0, padding: 0, alignItems: 'center', width: 'fit-content'}}>Algorithm:</div>
                <Form.Select style={{width: 'min-content'}} aria-label="Algorithm Type" size="sm" defaultValue='dot_product' onChange={(e) => {handleAlgorithmTypeChange(e)}}>
                  <option value='dot_product'>Dot Product</option>
                  <option value='euclidean'>Euclidean</option>
                </Form.Select>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-center' style={{margin: 0, gap: '10px', padding: '0 5px'}}>
        <Col style={{padding: 0}}>
          <Button style={{ width: '100%' }} onClick={handleResetFilters} variant='secondary'> Reset Filters</Button>
        </Col>
        <Col style={{padding: 0}}>
          <ConfirmSearchButton
            onSearchClick={() => { setCurrentPage(1); handleSubmit(1); }}
            searchInProgress={props.searchInProgress}
          />
        </Col>
      </Row>
      <Card>
        <Card.Header style={{fontWeight: 'bold', fontSize: '20px', color: 'black', height: '41px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          Location
        </Card.Header>
        <Card.Body style={{display: 'grid', gap: '5px', overflow: 'auto', padding: '1rem 1rem'}}>
          <Row style={{margin: 0, rowGap: '10px'}}>
            <Col xs={8} style={{padding: '0 5px 0 0'}}>
              <CitySearchBox cityName={props.cityName} onCityNameChange={handleCityNameChange} />
            </Col>
            <Col xs={4} style={{padding: 0}}>
              <ZipcodeSearchBox zipcodeName={zipcodeName} onzipcodeNameChange={handlezipcodeNameChange} />
            </Col>
            <Col xs={3} style={{padding: 0}}>
              <StreetNumBox streetNum={streetNum} onStreetNumChange={handlestreetNumChange} />
            </Col>
            <Col xs={7} style={{padding: '0 5px 0 5px'}}>
              <StreetNameSearchBox streetName={streetName} onstreetNameChange={handlestreetNameChange} />
            </Col>
            <Col xs={2} style={{padding: 0}}>
              <SuffixSearchBox suffixName={suffixName} onsuffixNameChange={handlesSuffixfNameChange} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card style={{minWidth: 'min-content'}}>
        <Card.Header style={{fontWeight: 'bold', fontSize: '20px', color: 'black', height: '41px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          Property Filters
        </Card.Header>
        <Card.Body>
          <Row style={{margin: 0, gap: '10px'}}>
            <Col xs={12}>
              <PropertyTypeDropdown
                propertyTypes={propertyTypes}
                onCheckboxChange={handlePropertyTypeCheckboxChange}
              />

            </Col>
            <Col xs={12}>
              <PriceRangeDropdown
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={handleMinPriceChange}
                onMaxPriceChange={handleMaxPriceChange}
                onApplyClick={handlePriceApplyClick}
              />
            </Col>
            <Col xs={12}>
              <BuildingSQFT
                minSQFT={minBuildingSQFT}
                maxSQFT={maxBuildingSQFT}
                onMinSQFTChange={handleMinBuildingSQFTChange}
                onMaxSQFTChange={handleMaxBuildingSQFTChange}
                onApplyClick={handleBuildingApplyClick}
              />
            </Col>
            <Col xs={12}>
              <LandSQFTDropdown
                minSQFT={minSQFT}
                maxSQFT={maxSQFT}
                onMinSQFTChange={handleMinSQFTChange}
                onMaxSQFTChange={handleMaxSQFTChange}
                onApplyClick={handleApplyClick}
              />
            </Col>
            <Row style={{margin: 0, padding: 0, justifyContent: 'center'}}>
              <Form.Check
                type="checkbox"
                id='include-vacant-properties'
                name='vacant-properties'
                label='Include Vacant Land'
                className='include-vacant-properties'
                style={{alignContent: 'center', alignItems: 'center', display: 'flex', gap: '10px', textAlign: 'left', width: 'min-content', whiteSpace: 'nowrap'}}
                onChange={handleIncludeVacantPropsChange}
                defaultChecked={false}
              />
            </Row>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default forwardRef(FilterTools);
