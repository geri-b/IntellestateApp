import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";


function MapMenu({setHotspots, changeShowHotspots, changeShowRecommendedProperties, geographicShapes, setPropertyTypes, changeShowPropertyTypes}) {
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


  const [propertyType, setPropertyType] = useState('school');
  const [propertySubType, setPropertySubType] = useState('public');
  const [propTypeDropdownStates, setPropTypeDropdownStates] = useState({
    'school': 'public',
    'agricultural': 'VACANT AG LAND',
    'industrial': 'VAC INDUSTRIAL LAND',
    'commercial': 'COMMERCIAL VAC LAND',
    'residential': 'RES VACANT LAND',
    'exempt': 'FED-OWNED PROP NEC',
  });

  const onUpdatePropertyTypes = () => {
    setPropertyTypes(propertyType, propertySubType);
  }

  const updatePropertyType = (e) => {
    setPropertySubType(propTypeDropdownStates[e.target.value]);
    setPropertyType(e.target.value);
  }

  const updatePropertySubType = (e) => {
    let newDropdownStates = dropdownStates;
    newDropdownStates[propertyType] = e.target.value;
    setPropTypeDropdownStates(newDropdownStates);
    setPropertySubType(e.target.value);
  }

  const agriculturalProps = [
    "VACANT AG LAND",
    "VEGETABLE FARM",
    "NURSERY",
    "GREENHOUSE",
    "VACANT AG LAND-CAUV",
    "CASH GRAIN/GEN-CAUV",
    "LIVESTOCK FARM-CAUV",
    "FRUIT/NUT FARM-CAUV",
    "VEGGIE FARM - CAUV",
    "TIMBER - CAUV",
    "OTHER AG NEC - CAUV"
  ];

  const industrialProps = [
    "VAC INDUSTRIAL LAND",
    "MATERIAL YARD STGE",
    "M & E YARD STGE",
    "SALVAGE/ SCRAP YARD",
    "VEHICLE RECYCLING YD",
    "BILLBOARD SITE(S)",
    "LAND FILL",
    "RV STORAGE",
    "FOOD/DRINK PROC/STGE",
    "HEAVY MFG/ FOUNDRY",
    "MEDIUM MFG/ ASSEMBLY",
    "LIGHT MFG / ASSEMBLY",
    "SMALL SHOPS",
    "MINES AND QUARRIES",
    "GRAIN ELEVATORS",
    "CONTRACT/ CONST SVCS",
    "BULK OIL STGE",
    "R & D FACILITY",
    "TRANSPORTATION FAC.",
    "COMMUNICATION FAC.",
    "UTILITY SERVICE FAC.",
    "OTHER INDUSTRIAL NEC",
    "INDUSTRIAL COMMON AR"
  ];

  const commercialProps = [
    "COMMERCIAL VAC LAND",
    "WALK-UP APTS 7-19 U",
    "WALK-UP APTS 20-39 U",
    "WALK-UP APTS 40+ U",
    "ELEVATOR APTS 7-19 U",
    "ELEVATOR APTS 20-39U",
    "GARDEN APTS 20-39 U",
    "ELEVATOR APTS 40+ U",
    "GARDEN APTS 40+ U",
    "4- 6 UNIT APARTMENTS",
    "ROW HOUSING",
    "CONVALESCENT HOME",
    "SUBSIDIZED HOUSING",
    "DORMITORY",
    "DAY CARE CENTER",
    "MOTELS",
    "HOTELS",
    "NURSING HOME",
    "HOSPITALS FOR PROFIT",
    "MOBILE HOME PARK",
    "COMM CAMPGROUNDS",
    "OTHER COMM HSNG NEC",
    "DETACHD STORE<7500SF",
    "SUPERMARKET",
    "DISCNT/JR DEPT STORE",
    "FURNITURE MART",
    "DEPARTMENT STORE",
    "STRIPCNTR 4+U>7500SF",
    "GNRL RETAIL+ 7500 SQ",
    "COMMUNITY SHOP CNTR",
    "REGIONAL SHOP CENTER",
    "FRANCHISE FOOD STORE",
    "OTHER RETAIL NEC",
    "RETAIL CONDOMINIUM",
    "CAFETERIA",
    "NIGHTCLUB",
    "PARTY CENTER",
    "NEIGHBORHOOD TAVERN",
    "FRANCHISE FD SITDOWN",
    "FRANCHISE FD COUNTER",
    "DRIVE-IN RESTAURANT",
    "ICE CREAM STAND",
    "OTHER FOOD SVC NEC",
    "DRYCLEAN PLANT/LNDRY",
    "FUNERAL HOME",
    "MED CLINIC/ OFFICES",
    "MED CLNC/ OFFC CONDO",
    "ANIMAL CLINIC/ HOSP",
    "FULL SERVICE BANK",
    "SAVINGS AND LOAN",
    "POST OFFICE",
    "1-2 STORY OFFCE BLDG",
    "WALKUP OFFICE >2 ST",
    "ELEVATOR OFFCE >2 ST",
    "OFFICE CONDO",
    "GAS STATION W/ KIOSK",
    "FULL SVC GAS STATION",
    "FS DRIVETHRU CARWASH",
    "AUTO SALES & SERVICE",
    "TRUCK SALES & SVC",
    "COMM PARKING GARAGE",
    "COMM PARKING LOT",
    "ASSOCIATD PARKNG LOT",
    "SELF-SVC CAR WASH",
    "USED CAR SALES",
    "AUTO REPAIR GARAGE",
    "FRANCHISE AUTO SVC",
    "THEATRE",
    "MINATURE GOLF/DR RNG",
    "GOLF COURSE",
    "BOWLING ALLEY",
    "LODGE HALL",
    "AMUSEMENT PARK",
    "SPORT/ PUBLC ASSMBLY",
    "CULTRL/NATURE EXHIBT",
    "RAQTBALL/TENNIS CLUB",
    "DETACHED HEALTH SPA",
    "HOME IMPRVMNT CENTER",
    "HOME GARDEN CENTER",
    "BLDG MATERIAL STGE",
    "MINI-STORAGE WHSE",
    "1-UNIT WHSE <75000SF",
    "1-UNIT WHSE >75000SF",
    "COMM WHSE LOFT-TYPE",
    "DISTRIBUTION WHSE",
    "MULTI-TENANT WHSE",
    "WAREHOUSE CONDO",
    "COMM TRUCK TERMINAL",
    "MARINE SVC FACILITY",
    "AIRCRAFT SALES & SVC",
    "SMALL BOAT MARINA",
    "STORE W/ WALKUP APTS",
    "STORE W/ WALKUP OFFC",
    "OTHER COMMERCIAL NEC",
    "COMMERCIAL CONDOMINI",
    "COMMERCIAL COMN AREA"
  ];

  const residentialProps = [
    "RES VACANT LAND",
    "1-FAMILY PLATTED LOT",
    "2-FAMILY PLATTED LOT",
    "3-FAMILY PLATTED LOT",
    "RESIDENTIAL CONDO",
    "MOBL HM PLATTED LOT",
    "LISTED WITH",
    "COMMON AREA PLATTED",
    "OTHER RES PLATTED"
  ];

  const exemptProps = [
    "FED-OWNED PROP NEC",
    "FED-OWNED OFFICE",
    "STATE-OWNED PROP NEC",
    "STATE-OWNED OFFICE",
    "STATE-OWNED WHSE",
    "CNTY-OWNED PROP NEC",
    "COUNTY-OWNED RES",
    "COUNTY-OWNED OFFICE",
    "TWP-OWNED PROP NEC",
    "MUNI-OWNED PROP NEC",
    "CITY-OWNED RES",
    "CITY-OWNED OFFICE",
    "CITY-OWNED PROPERTY",
    "BOE-OWNED PROP NEC",
    "PARK-OWNED PROP NEC",
    "PARK-OWNED RES",
    "PRIVATE-ED PROP NEC",
    "PRIVATE-ED OWNED RES",
    "PRIVATE-ED OWNED RET",
    "CHARITABLE USES NEC",
    "CHARITABLE USES-RES",
    "CHARITABLE USES-RETL",
    "CHARITABLE USES-OFFC",
    "RELIGIOUS USES NEC",
    "RELIGIOUS USES-RES",
    "RELIGIOUS USES-OFFC",
    "CEMETERIES ETC NEC",
    "CHARITABLE VETRN ORG",
    "LAND BANK",
    "NEW COUNTY LAND BANK",
    "CCC-OWNED PROP NEC",
    "CCC-OWNED OFFICE",
    "REGIONAL AGENCY NEC",
    "CMHA-OWNED PROP NEC",
    "CMHA-OWNED RES"
  ]

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
          <Row style={{margin: 0, padding: 0, gap: '5px'}}>
            <div style={{display: 'flex', fontWeight: 'bold', margin: 0, padding: 0, alignItems: 'center', width: 'fit-content'}}>Area:</div>
            <Col style={{margin: 0, padding: 0}}>
              <Form.Select aria-label="Hotspot Area Type" size="sm" defaultValue='tract' onChange={(e) => {setHotspotArea(e.target.value)}}>
                <option value='tract'>Census Tract</option>
                <option value='city'>City</option>
              </Form.Select>
            </Col>
          </Row>
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
            onChange={changeShowPropertyTypes}
            defaultChecked={true}
          />
          <Col style={{display: 'grid', gap: '5px'}}>
            <b><u>Property Type</u></b>
            <Row>
              <Col className="map-radio-container">
                <Form.Check
                  type="radio"
                  name="property-types"
                  value={'school'}
                  className="map-control-radio"
                  style={{textAlign: 'left', alignContent: 'center', alignItems: 'center'}}
                  onClick={(e) => {updatePropertyType(e)}}
                  defaultChecked={true}
                ></Form.Check>
                <Form.Select aria-label="Schools" size="sm" defaultValue='public' disabled={propertyType !== 'school'} onChange={(e) => {updatePropertySubType(e)}}>
                  <option style={{display: 'none'}}>Schools</option>
                  <option value='public'>Public Schools</option>
                  <option value='private'>Private Schools</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col className="map-radio-container">
                <Form.Check
                  type="radio"
                  name="property-types"
                  value={'agricultural'}
                  className="map-control-radio"
                  style={{textAlign: 'left', alignContent: 'center', alignItems: 'center'}}
                  onClick={(e) => {updatePropertyType(e)}}
                ></Form.Check>
                <Form.Select aria-label="Agricultural Properties" size="sm" disabled={propertyType !== 'agricultural'} onChange={(e) => {updatePropertySubType(e)}}>
                  <option style={{display: 'none'}}>Agricultural</option>
                  {agriculturalProps.map(propType => (
                    <option value={propType}>{propType}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col className="map-radio-container">
                <Form.Check
                  type="radio"
                  name="property-types"
                  value={'industrial'}
                  className="map-control-radio"
                  style={{textAlign: 'left', alignContent: 'center', alignItems: 'center'}}
                  onClick={(e) => {updatePropertyType(e)}}
                ></Form.Check>
                <Form.Select aria-label="Industrial Properties" size="sm" disabled={propertyType !== 'industrial'} onChange={(e) => {updatePropertySubType(e)}}>
                  <option style={{display: 'none'}}>Industrial</option>
                  {industrialProps.map(propType => (
                    <option value={propType}>{propType}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col className="map-radio-container">
                <Form.Check
                  type="radio"
                  name="property-types"
                  value={'commercial'}
                  className="map-control-radio"
                  style={{textAlign: 'left', alignContent: 'center', alignItems: 'center'}}
                  onClick={(e) => {updatePropertyType(e)}}
                ></Form.Check>
                <Form.Select aria-label="Commercial Properties" size="sm" disabled={propertyType !== 'commercial'} onChange={(e) => {updatePropertySubType(e)}}>
                  <option style={{display: 'none'}}>Commercial</option>
                  {commercialProps.map(propType => (
                    <option value={propType}>{propType}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col className="map-radio-container">
                <Form.Check
                  type="radio"
                  name="property-types"
                  value={'residential'}
                  className="map-control-radio"
                  style={{textAlign: 'left', alignContent: 'center', alignItems: 'center'}}
                  onClick={(e) => {updatePropertyType(e)}}
                ></Form.Check>
                <Form.Select aria-label="Residential Properties" size="sm" disabled={propertyType !== 'residential'} onChange={(e) => {updatePropertySubType(e)}}>
                  <option style={{display: 'none'}}>Residential</option>
                  {residentialProps.map(propType => (
                    <option value={propType}>{propType}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col className="map-radio-container">
                <Form.Check
                  type="radio"
                  name="property-types"
                  value={'exempt'}
                  className="map-control-radio"
                  style={{textAlign: 'left', alignContent: 'center', alignItems: 'center'}}
                  onClick={(e) => {updatePropertyType(e)}}
                ></Form.Check>
                <Form.Select aria-label="Tax-Exempt Properties" size="sm" disabled={propertyType !== 'exempt'} onChange={(e) => {updatePropertySubType(e)}}>
                  <option style={{display: 'none'}}>Tax-Exempt</option>
                  {exemptProps.map(propType => (
                    <option value={propType}>{propType}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row style={{margin: 0, justifyContent: 'center'}}>
              <Button size="sm" type="primary" style={{width: 'fit-content'}} onClick={onUpdatePropertyTypes}>
                Update Property Types
              </Button>
            </Row>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default MapMenu;
