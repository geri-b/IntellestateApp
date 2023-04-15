import Plot from "react-plotly.js";
import Map, { Layer, Source, Marker, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap";

function PropertyDetails({ properties, property, showDetails, popupOpen, setPopupOpen, mapRef, shapes, setHotspots }) {

  const [mapState, setMapState] = useState('');

  const [showAdvancedMap, setShowAdvancedMap] = useState(false);
  const [advancedPopupOpen, setAdvancedPopupOpen] = useState('');
  const [advancedMapState, setAdvancedMapState] = useState('');

  const handleMapClick = () => {
    if (mapState === popupOpen) {
      setPopupOpen('');
      setMapState('');
    } else {
      setMapState(popupOpen);
    }
  }

  const handleModalClose = () => {
    setAdvancedMapState('');
    setAdvancedPopupOpen('');
    setShowAdvancedMap(false);
  }

  const handleAdvancedMapClick = () => {
    if (advancedMapState === advancedPopupOpen) {
      setAdvancedPopupOpen('');
      setAdvancedMapState('');
    } else {
      setAdvancedMapState(advancedPopupOpen);
    }
  }

  const markerColor = {
    'Residential': 'lightskyblue',
    'Commercial': 'forestgreen',
    'Agricultural': 'orange',
    'Utility': 'lightgreen',
    'Government': 'royalblue',
    'Institutional': 'gold',
    'Industrial': 'saddlebrown',
    'Mixed': 'purple',
    'Other': 'lightgrey',
  };

  let hoveredPolygon = null;
  
  const layerStyle2 = {
    id: 'tract-labels',
    type: 'symbol',
    minzoom: 0,
    layout: {
      'text-field': '{name}\n{hotspotValue} / 10',
      'text-allow-overlap': true,
      'text-anchor': 'bottom',
    },
    paint: {
      'text-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        1,
        0
      ]
    },
  };

  const onHover = (e) => {
    if (e.features.length > 0) {
      if (hoveredPolygon !== null) {
        mapRef.current.setFeatureState(
          { source: 'my-data', id: hoveredPolygon },
          { hover: false }
        );
        mapRef.current.setFeatureState(
          { source: 'my-data2', id: hoveredPolygon },
          { hover: false }
        );
      }
      hoveredPolygon = e.features[0].id;
      mapRef.current.setFeatureState(
        { source: 'my-data', id: hoveredPolygon },
        { hover: true }
      );
      mapRef.current.setFeatureState(
        { source: 'my-data2', id: hoveredPolygon },
        { hover: true }
      );
      // e.originalEvent.target.style.cursor = 'pointer';
    }
    // const features = event.target.queryRenderedFeatures(event.point, {layers: ['tract-fills'],});
    // if (features && features.length) {
    //   setHoveredPolygon(features[0].properties.name);
    //   event.originalEvent.target.style.cursor = 'pointer';
    // }
    // else {
    //   setHoveredPolygon(null);
    //   event.originalEvent.target.style.cursor = '';
    // }
  };

  const onLeave = (e) => {
    if (hoveredPolygon !== null) {
      mapRef.current.setFeatureState(
        { source: 'my-data', id: hoveredPolygon },
        { hover: false }
      );
      mapRef.current.setFeatureState(
        { source: 'my-data2', id: hoveredPolygon },
        { hover: false }
      );
    }
    hoveredPolygon = null;
    // e.originalEvent.target.style.cursor = '';
  }

  const [openMapMenu, setOpenMapMenu] = useState('closed');

  const changeOpenMapMenuState = (e) => {
    if (e.target.checked) {
      setOpenMapMenu('open');
    } else {
      setOpenMapMenu('closed');
    }
  }

  const [showRecommendedProperties, setShowRecommendedProperties] = useState('');

  const changeShowRecommendedProperties = (e) => {
    if (e.target.checked) {
      setShowRecommendedProperties('');
    } else {
      setShowRecommendedProperties('none');
    }
  }

  const [showHotspots, setShowHotspots] = useState('visible');

  const changeShowHotspots = (e) => {
    if (e.target.checked) {
      setShowHotspots('visible');
      // mapRef.current.getMap().setLayoutProperty('tract-fills', 'visibility', 'visible')
    } else {
      setShowHotspots('none');
      // mapRef.current.getMap().setLayoutProperty('tract-fills', 'visibility', 'none')
    }
  }

  const [hotspotArea, setHotspotArea] = useState('tract');
  const [hotspotType, setHotspotType] = useState('rating');
  const [cityHotspotType, setCityHotspotType] = useState('crime');
  const [hotspotSubType, setHotspotSubType] = useState('');

  const onUpdateHotspots = () => {
    if (hotspotArea === 'tract') {
      setHotspots(hotspotArea, hotspotType, hotspotSubType);
    } else if (hotspotArea === 'city') {
      setHotspots(hotspotArea, cityHotspotType, cityHotspotType);
    }
  }

  return (
    <div style={{ width: "100%", paddingTop: '10px' }}>
      <div id="hotspot-scale">
        <div id="hotspot-scale-label-low">Low Quantity</div>
        <div id="hotspot-scale-label-high">High Quantity</div>
      </div>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -81.68,
          latitude: 41.43,
          zoom: 9
        }}
        style={{ width: '100%', aspectRatio: '2/1', border: '2px solid #0d6efd', borderRadius: '4px' }}
        mapLib={maplibregl}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=nmF5UJHGt6DxUo6Ooheo"
        attributionControl={false}
        type='vector'
        onClick={handleMapClick}
        onMouseMove={onHover}
        onMouseLeave={onLeave}
        interactiveLayerIds={['tract-fills']}
      >
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
                    <option value='crime'>Crime Rating</option>
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
                      onClick={(e) => {setHotspotType(e.target.value)}}
                    ></Form.Check>
                    <Form.Select aria-label="General Hotspots" size="sm" disabled={hotspotType !== 'general'} onChange={(e) => {setHotspotSubType(e.target.value)}}>
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
                      onClick={(e) => {setHotspotType(e.target.value)}}
                    ></Form.Check>
                    <Form.Select aria-label="Business Hotspots" size="sm" disabled={hotspotType !== 'com_luc'} onChange={(e) => {setHotspotSubType(e.target.value)}}>
                      <option style={{display: 'none'}}>Business</option>
                      <option value='vacant'>Vacant</option>
                      <option value='living'>Living</option>
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
                      onClick={(e) => {setHotspotType(e.target.value)}}
                    ></Form.Check>
                    <Form.Select aria-label="Race / Ethnicity Hotspots" size="sm" disabled={hotspotType !== 'races'} onChange={(e) => {setHotspotSubType(e.target.value)}}>
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
                      onClick={(e) => {setHotspotType(e.target.value)}}
                      defaultChecked={true}
                    ></Form.Check>
                    <Form.Select aria-label="Ratings" size="sm" defaultValue='price_rating_residential' disabled={hotspotType !== 'rating'} onChange={(e) => {setHotspotSubType(e.target.value)}}>
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
              <Button size="sm" type="primary" style={{width: 'fit-content'}} onClick={onUpdateHotspots}>
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
        {
        <Source key={new Date().getTime()} id="my-data" type="geojson" data={shapes}>
          <Layer {...{
            id: 'tract-fills',
            type: 'fill',
            layout: {
              'visibility': showHotspots
            },
            paint: {
              'fill-color': {
                'property': 'hotspotValue',
                'stops': [
                  [-1, '#888'],
                  [0, '#08f'],
                  [2.5, '#0f0'],
                  [5, '#ff0'],
                  [7.5, '#f80'],
                  [10, '#f00'],
                ]
              },
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                .5,
                .25
              ],
              'fill-outline-color': {
                'property': 'hotspotValue',
                'stops': [
                  [-1, '#888'],
                  [0, '#06a'],
                  [2.5, '#0a0'],
                  [5, '#aa0'],
                  [7.5, '#a60'],
                  [10, '#a00'],
                ]
              },
            }
          }}></Layer>
        </Source>
        }
        <Source key={new Date().getTime() + 1} id="my-data2" type="geojson" data={shapes}>
          <Layer {...layerStyle2}></Layer>
        </Source>
        {properties.map(prop => (
          <div key={prop.PARCELPIN} style={{display: 'none'}}>
            <Marker
              latitude={prop.AVG_LAT}
              longitude={prop.AVG_LONG}
              color={markerColor[prop.SiteCat1 === '' ? 'Other' : prop.SiteCat1]}
              onClick={() => {setPopupOpen(prop.PARCELPIN); showDetails(prop)}}
              style={{display: showRecommendedProperties}}
            ></Marker>
            {popupOpen === prop.PARCELPIN && (
              <Popup
                latitude={prop.AVG_LAT}
                longitude={prop.AVG_LONG}
                onClose={() => setPopupOpen('')}
                closeButton={true}
                closeOnClick={false}
              >
                <span>
                  {prop.FULL_ADDR} <br></br>
                  {prop.SiteCat1 === '' ? 'Undefined' : prop.SiteCat1} <br></br>
                  {prop.PARCL_OWN2}
                </span>
              </Popup>
            )}
          </div>
        ))}
        <Marker
          latitude={isNaN(property.AVG_LAT) ? 0 : property.AVG_LAT}
          longitude={isNaN(property.AVG_LONG) ? 0 : property.AVG_LONG}
          color="red"
          style={{ zIndex: 1, display: property.PARCELPIN === '' ? 'none' : '' }}
          onClick={() => setPopupOpen(property.PARCELPIN)}
        ></Marker>
      </Map>
      <div style={{margin: '5px 0 0 0', display: property.FULL_ADDR == null ? 'none' : 'inline-block'}}>{property.FULL_ADDR}</div><br></br>
      {/* <Button style={{margin: '5px'}} onClick={() => setShowAdvancedMap(true)}>Advanced Map</Button>
      <Button style={{margin: '5px'}} onClick={() => setHotspots('tract', 'income')}>Show Tract Hotspots</Button>
      <Button style={{margin: '5px'}} onClick={() => setHotspots('city', 'crime')}>Show City Hotspots</Button> */}
      <Modal
        show={showAdvancedMap}
        onHide={handleModalClose}
        dialogClassName="modal-90w"
        aria-labelledby="advanced-map-modal-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="advanced-map-modal-title">
            Advanced Map
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{height: '100%', rowGap: '5px'}}>
            <Col md={6} lg={6}>
              <Map
                initialViewState={{
                  longitude: -81.6,
                  latitude: 41.5,
                  zoom: 9,
                }}
                style={{border: '2px solid lightgrey', borderRadius: '8px'}}
                mapLib={maplibregl}
                mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=nmF5UJHGt6DxUo6Ooheo"
                type="vector"
                onClick={handleAdvancedMapClick}
              >
                <Marker
                  latitude={isNaN(property.AVG_LAT) ? 0 : property.AVG_LAT}
                  longitude={isNaN(property.AVG_LONG) ? 0 : property.AVG_LONG}
                  color="red"
                  style={{zIndex: 1, display: isNaN(property.PARCELPIN) ? 'none' : ''}}
                  onClick={() => setAdvancedPopupOpen(property.PARCELPIN)}
                ></Marker>
                {advancedPopupOpen === property.PARCELPIN && (
                  <Popup
                    latitude={isNaN(property.AVG_LAT) ? 0 : property.AVG_LAT}
                    longitude={isNaN(property.AVG_LONG) ? 0 : property.AVG_LONG}
                    onClose={() => setAdvancedPopupOpen('')}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="top"
                  >
                    <span>
                      {property.FULL_ADDR}<br></br>
                      {property.SiteCat1}<br></br>
                      {property.PARCL_OWN2}
                    </span>
                  </Popup>
                )}
              </Map>
            </Col>
            <Col className="advanced-map-column" md={6} lg={3}>
              <Col className="data-overlays-column">Data Overlays</Col>
            </Col>
            <Col className="advanced-map-column" lg={3}>
              Similar Properties
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Row>
        <Col md={6}>
          <Plot 
            var data = {[{
            
              // make function and set data equal to something set data = to function that returns whole data object with use state
              values: [property.ind_farm, property.ind_mining, property.ind_utility, property.ind_construction, property.ind_manufacture, property.ind_wholesale, property.ind_retail, property.ind_transport, property.ind_it, property.ind_finance, property.ind_real_estate, property.ind_science, property.ind_management, property.ind_waste, property.ind_education, property.ind_health_care, property.ind_entertain, property.ind_food_service, property.ind_other, property.ind_public_admin],
              labels: ['Farming', 'Mining', 'Utility', 'Construction', 'Manufacturing', 'Wholesale', 'Retail', 'Transport', 'Information Technology', 'Finance', 'Real Estate', 'Science', 'Management', 'Waste Management', 'Education', 'Health Care', 'Entertainment', 'Food Service', 'Other', 'Public Administration'],
              type: 'pie',
              marker: {colors: [
                '#e71d43',
                '#ff3700',
                '#ff6e00',
                '#ffa500',
                '#ffc300',
                '#ffe100',
                '#aad500',
                '#55aa00',
                '#008000',
                '#005555',
                '#002baa',
                '#0000ff',
                '#1900d5',
                '#3200ac',
                '#4b0082',
                '#812ba6',
                '#b857ca',
                '#d03a87',
                '#A0A4A5',
                '#33E6FF'
              ]}
            }]}
            layout = {{automargin: true, autosize: false, width:"25%", height:"25%",  title: 'Area Industry Distribution', showlegend: false, textinfo: 'none'}}
            config={{ responsive: true }}
            style={{width: "50%", aspectRatio: "5 / 4" }}
          
          />
        </Col>
        </Row>
        <Row>
        <Col md={4}>
          <Plot 
            var data = {[{
              values: [property.d_white, property.d_black, property.d_asian, property.d_indegenous, property.d_pacific],
              // values: [.50, .50],
              labels: ['White', 'Black', 'Asian', 'Indigenous', 'Pacific'],
              type: 'pie',
              marker: {colors: [
                '#4444AA',
                '#DDDD44',
                '#44AA44',
                '#AA44AA',
                '#AA4444'
              ]}
            }]}
            layout = {{automargin: true, autosize: false, width:"25%", height:"25%", showlegend: false, title: 'Diversity Distribution'}}
            config={{ responsive: true }}
            style={{width: "50%", aspectRatio: "5 / 4" }}

          />
        </Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
        <Col md={4}>
          <Plot 
            var data = {[{
              values: [property.i_percent_low, property.i_percent_med, property.i_percent_high],
              labels: ['Less than 15k per year','15k - 40k per year', 'More than 40k per year'],
              type: 'pie',
              marker: {colors: ['#d9463e','#d9d93e', '#4ec94e']}
            }]}
            layout = {{automargin: true, autosize: false, width:"25%", height:"25%", showlegend: false, title: 'Income Distribution'}}
            config={{ responsive: true }}
            style={{width: "50%", aspectRatio: "5 / 4" }}
          
          />
        </Col>
        </Row>
        <Row>
        <Col>
          <Plot

            data = {[{
              r: [property.comm_vacant, property.comm_living, property.comm_retail, property.comm_food, property.comm_life_services, property.comm_office, property.comm_automotive, property.comm_entertainment_sports, property.comm_warehouse_supply, property.comm_watercraft_aircraft, property.comm_other],
              theta: ['Vacant','Living','Retail', 'Food', 'Life Services', 'Office', 'Automotive','Entertainment', 'Warehouse', 'Aircraft', 'Other'],
              type: "scatterpolar",
              fill: 'toself'
            }]}
            layout = {{automargin: true, autosize: false, width:"25%", height:"25%", showlegend: false, title: 'Number of Commercial Parcels'}}
            config={{ responsive: true }}
            style={{width: "50%", aspectRatio: "5 / 4" }}
            />
        </Col>
      </Row>
    </div>
  );
}

export default PropertyDetails;