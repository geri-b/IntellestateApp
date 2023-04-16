import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";


function MapMenu({setHotspots, changeShowHotspots, changeShowRecommendedProperties, geographicShapes}) {
  const [openMapMenu, setOpenMapMenu] = useState('closed');

  const changeOpenMapMenuState = (e) => {
    if (e.target.checked) {
      setOpenMapMenu('open');
    } else {
      setOpenMapMenu('closed');
    }
  }

  const [hotspotArea, setHotspotArea] = useState('tract');
  const [hotspotType, setHotspotType] = useState('rating');
  const [cityHotspotType, setCityHotspotType] = useState('crime');
  const [hotspotSubType, setHotspotSubType] = useState('price_rating_residential');
  const [dropdownStates, setDropdownStates] = useState({
    'general': '',
    'com_luc': '',
    'races': '',
    'rating': 'price_rating_residential',
  });

  const onUpdateHotspots = () => {
    if (hotspotArea === 'tract') {
      setHotspots(hotspotArea, hotspotType, hotspotSubType);
    } else if (hotspotArea === 'city') {
      setHotspots(hotspotArea, cityHotspotType, cityHotspotType);
    }
  }

  const updateHotspotSubType = (e) => {
    let newDropdownStates = dropdownStates;
    newDropdownStates[hotspotType] = e.target.value;
    setDropdownStates(newDropdownStates);
    setHotspotSubType(e.target.value);
  }

  const updateHospotType = (e) => {
    setHotspotSubType(dropdownStates[e.target.value]);
    setHotspotType(e.target.value);
  }

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad && geographicShapes !== null) {
      setInitialLoad(false);
      setHotspots(hotspotArea, hotspotType, hotspotSubType);
    }
  }, [initialLoad, setInitialLoad, hotspotArea, hotspotType, hotspotSubType, setHotspots, geographicShapes]);

  return (
    <div id="map-menu-container">
      <div style={{height: 'fit-content', borderBottom: openMapMenu === 'open' ? '2px solid #0d4ead' : '', paddingBottom: openMapMenu === 'open'? '5px' : '0px', display: 'grid', gridAutoFlow: 'column', gridTemplateColumns: openMapMenu === 'open' ? 'min-content 1fr' : '1fr', gap: '10px'}}>
        <div id="map-menu-button-container">
          <input
            id="map-menu-button"
            type="checkbox"
            onChange={changeOpenMapMenuState}
          />
          <label htmlFor="map-menu-button" id="map-menu-line-container">
            <div id="l1" className="map-menu-line"></div>
            <div id="l2" className="map-menu-line"></div>
            <div id="l3" className="map-menu-line"></div>
          </label>
        </div>
        <div style={{display: 'flex', margin: 0, alignItems: 'center', fontSize: '21px', color: '#0d4ead'}} className={openMapMenu === 'open' ? 'justify-content-center' : 'hide'}>
          Map Controls
        </div>
      </div>
      <Col className={openMapMenu === 'open' ? '' : 'hide'} style={{padding: '0 5px'}}>
        <Row style={{margin: 0}}>
          <Form.Check
            type="switch"
            id='show-recommended-properties'
            name='recommended-properties'
            label='Recommended Properties'
            className="map-control-switch"
            style={{margin: '0', padding: 0, alignContent: 'center', alignItems: 'center', display: 'flex', gap: '10px', textAlign: 'left'}}
            onChange={changeShowRecommendedProperties}
            defaultChecked={true}
          />
        </Row>
        <hr style={{margin: '.5rem 0'}}></hr>
        <Row style={{margin: 0, gap: '5px'}}>
          <Form.Check
            type="switch"
            id='show-hotspots'
            name='hotspots'
            label='Hotspots'
            className="map-control-switch"
            style={{margin: '0', padding: 0, alignContent: 'center', alignItems: 'center', display: 'flex', gap: '10px', textAlign: 'left'}}
            onChange={changeShowHotspots}
            defaultChecked={true}
          />
          <Form.Select aria-label="Hotspot Area Type" size="sm" defaultValue='tract' onChange={(e) => {setHotspotArea(e.target.value)}}>
            <option value='tract'>Census Tract</option>
            <option value='city'>City</option>
          </Form.Select>
          <Col style={{display: 'grid', gap: '5px'}}>
            <b><u>Hotspot Type</u></b>
            <Row className={hotspotArea === 'city' ? '' : 'hide'}>
              <Form.Select aria-label="City Hotspot Types" size="sm" onChange={(e) => {setCityHotspotType(e.target.value)}}>
                <option value='crime'>Crime Rate</option>
                <option value='school'>School Rating</option>
                <option value='price_rating_residential'>Price Rating - Residential</option>
                <option value='price_rating_commercial'>Price Rating - Commercial</option>
                <option value='price_rating_industrial'>Price Rating - Industrial</option>
                <option value='price_rating_institutional'>Price Rating - Institutional</option>
                <option value='price_rating_government'>Price Rating - Government</option>
                <option value='price_rating_agricultural'>Price Rating - Agricultural</option>
                <option value='price_rating_utility'>Price Rating - Utility</option>
                <option value='price_residential'>Price - Residential</option>
                <option value='price_commercial'>Price - Commercial</option>
                <option value='price_industrial'>Price - Industrial</option>
                <option value='price_institutional'>Price - Institutional</option>
                <option value='price_government'>Price - Government</option>
                <option value='price_agricultural'>Price - Agricultural</option>
                <option value='price_utility'>Price - Utility</option>
              </Form.Select>
            </Row>
            <Row className={hotspotArea === 'tract' ? '' : 'hide'}>
              <Col className="map-radio-container">
                <Form.Check
                  type="radio"
                  name="tract-hotspot-types"
                  value={'general'}
                  className="map-control-radio"
                  style={{textAlign: 'left', alignContent: 'center', alignItems: 'center'}}
                  onClick={(e) => {updateHospotType(e)}}
                ></Form.Check>
                <Form.Select aria-label="General Hotspots" size="sm" disabled={hotspotType !== 'general'} onChange={(e) => {updateHotspotSubType(e)}}>
                  <option style={{display: 'none'}}>General</option>
                  <option value='income'>Income Level</option>
                  <option value='density'>Building Density</option>
                  <option value='price_residential'>Price - Residential</option>
                  <option value='price_commercial'>Price - Commercial</option>
                  <option value='price_industrial'>Price - Industrial</option>
                  <option value='price_institutional'>Price - Institutional</option>
                  <option value='price_government'>Price - Government</option>
                  <option value='price_agricultural'>Price - Agricultural</option>
                  <option value='price_utility'>Price - Utility</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className={hotspotArea === 'tract' ? '' : 'hide'}>
              <Col className="map-radio-container">
                <Form.Check
                  type="radio"
                  name="tract-hotspot-types"
                  value={'com_luc'}
                  className="map-control-radio"
                  style={{textAlign: 'left', alignContent: 'center', alignItems: 'center'}}
                  onClick={(e) => {updateHospotType(e)}}
                ></Form.Check>
                <Form.Select aria-label="Business Hotspots" size="sm" disabled={hotspotType !== 'com_luc'} onChange={(e) => {updateHotspotSubType(e)}}>
                  <option style={{display: 'none'}}>Business</option>
                  <option value='vacant'>Commercial Vacant</option>
                  <option value='living'>Commercial Living</option>
                  <option value='retail'>Retail</option>
                  <option value='food'>Food</option>
                  <option value='life_services'>Life Services</option>
                  <option value='office'>Office</option>
                  <option value='automotive'>Automotive</option>
                  <option value='entertainment_sports'>Sports & Entertainment</option>
                  <option value='warehouse_supply'>Warehouses & Supply</option>
                  <option value='watercraft_aircraft'>Watercraft & Aircraft</option>
                  <option value='other'>Other</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className={hotspotArea === 'tract' ? '' : 'hide'}>
              <Col className="map-radio-container">
                <Form.Check
                  type="radio"
                  name="tract-hotspot-types"
                  value={'races'}
                  className="map-control-radio"
                  style={{textAlign: 'left', alignContent: 'center', alignItems: 'center'}}
                  onClick={(e) => {updateHospotType(e)}}
                ></Form.Check>
                <Form.Select aria-label="Race / Ethnicity Hotspots" size="sm" disabled={hotspotType !== 'races'} onChange={(e) => {updateHotspotSubType(e)}}>
                  <option style={{display: 'none'}}>Race / Ethnicity</option>
                  <option value='white'>% White</option>
                  <option value='black'>% Black</option>
                  <option value='asian'>% Asian</option>
                  <option value='indigenous'>% Indigenous</option>
                  <option value='pacific'>% Pacific</option>
                  <option value='hispanic'>% Hispanic</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className={hotspotArea === 'tract' ? '' : 'hide'}>
              <Col className="map-radio-container">
                <Form.Check
                  type="radio"
                  name="tract-hotspot-types"
                  value={'rating'}
                  className="map-control-radio"
                  style={{textAlign: 'left', alignContent: 'center', alignItems: 'center'}}
                  onClick={(e) => {updateHospotType(e)}}
                  defaultChecked={true}
                ></Form.Check>
                <Form.Select aria-label="Ratings" size="sm" defaultValue='price_rating_residential' disabled={hotspotType !== 'rating'} onChange={(e) => {updateHotspotSubType(e)}}>
                  <option value='income_rating'>Income Rating</option>
                  <option value='diversity_rating'>Diversity Rating</option>
                  <option value='price_rating_residential'>Price Rating - Residential</option>
                  <option value='price_rating_commercial'>Price Rating - Commercial</option>
                  <option value='price_rating_industrial'>Price Rating - Industrial</option>
                  <option value='price_rating_institutional'>Price Rating - Institutional</option>
                  <option value='price_rating_government'>Price Rating - Government</option>
                  <option value='price_rating_agricultural'>Price Rating - Agricultural</option>
                  <option value='price_rating_utility'>Price Rating - Utility</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{margin: 0, justifyContent: 'center', marginTop: '5px'}}>
          <Button size="sm" type="primary" style={{width: 'fit-content', whiteSpace: 'nowrap'}} onClick={onUpdateHotspots}>
            Update Hotspots
          </Button>
        </Row>
        <hr style={{margin: '.5rem 0'}}></hr>
        <Row style={{margin: 0}}>
          <Form.Check
            type="switch"
            id='show-nearby-property-types'
            name='nearby-property-types'
            label='Nearby Property Types'
            className="map-control-switch"
            style={{margin: '0', padding: 0, alignContent: 'center', alignItems: 'center', display: 'flex', gap: '10px', textAlign: 'left'}}
            // onChange={changeShowHotspots}
            defaultChecked={true}
          />
        </Row>
      </Col>
    </div>
  );
}

export default MapMenu;
