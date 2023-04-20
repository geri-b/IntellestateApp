import Plot from "react-plotly.js";
import Map, { Layer, Source, Marker, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import MapMenu from "./MapMenu";

function PropertyDetails({ properties, property, showDetails, popupOpen, setPopupOpen, mapRef, shapes, setHotspots, geographicShapes, setPropertyTypes, propertyTypesData }) {

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

  const hotspotScaleDict = {
    'crime': ['Low Crime', 'High Crime'],
    'school': ['Low District Achievement Score', 'High District Achievement Score'],
    'price_rating_residential': ['Bad Price Rating', 'Good Price Rating'],
    'price_rating_commercial': ['Bad Price Rating', 'Good Price Rating'],
    'price_rating_industrial': ['Bad Price Rating', 'Good Price Rating'],
    'price_rating_institutional': ['Bad Price Rating', 'Good Price Rating'],
    'price_rating_government': ['Bad Price Rating', 'Good Price Rating'],
    'price_rating_agricultural': ['Bad Price Rating', 'Good Price Rating'],
    'price_rating_utility': ['Bad Price Rating', 'Good Price Rating'],
    'price_residential': ['Low Residential Price', 'High Residential Price'],
    'price_commercial': ['Low Commercial Price', 'High Commercial Price'],
    'price_industrial': ['Low Industrial Price', 'High Industrial Price'],
    'price_institutional': ['Low Institutional Price', 'High Institutional Price'],
    'price_government': ['Low Government Price', 'High Government Price'],
    'price_agricultural': ['Low Agricultural Price', 'High Agricultural Price'],
    'price_utility': ['Low Utility Property Price', 'High Utility Property Price'],
    'income': ['Low Income Area', 'High Income Area'],
    'density': ['Low Building Denisty', 'High Building Density'],
    'vacant': ['Few Properties', 'Many Properties'],
    'living': ['Few Properties', 'Many Properties'],
    'retail': ['Few Properties', 'Many Properties'],
    'food': ['Few Properties', 'Many Properties'],
    'life_services': ['Few Properties', 'Many Properties'],
    'office': ['Few Properties', 'Many Properties'],
    'automotive': ['Few Properties', 'Many Properties'],
    'entertainment_sports': ['Few Properties', 'Many Properties'],
    'warehouse_supply': ['Few Properties', 'Many Properties'],
    'watercraft_aircraft': ['Few Properties', 'Many Properties'],
    'other': ['Few Properties', 'Many Properties'],
    'white': ['Low Percentage Area', 'High Percentage Area'],
    'black': ['Low Percentage Area', 'High Percentage Area'],
    'asian': ['Low Percentage Area', 'High Percentage Area'],
    'indigenous': ['Low Percentage Area', 'High Percentage Area'],
    'pacific': ['Low Percentage Area', 'High Percentage Area'],
    'hispanic': ['Low Percentage Area', 'High Percentage Area'],
    'income_rating': ['Low Income Rating', 'High Income Rating'],
    'diversity_rating': ['Low Diversity Area', 'High Diversity Area'],
  };

  const [hotspotScaleLabels, setHotspotScaleLabels] = useState(['Low', 'High'])
  const onSetHotspots = (hArea, hType, hSubType) => {
    if (hotspotScaleDict[hSubType]) {
      setHotspots(hArea, hType, hSubType);
      if (hotspotScaleDict[hSubType] !== hotspotScaleLabels) {
        setHotspotScaleLabels(hotspotScaleDict[hSubType]);
      }
    }
  }

  const [showPropertyTypes, setShowPropertyTypes] = useState('');

  const changeShowPropertyTypes = (e) => {
    if (e.target.checked) {
      setShowPropertyTypes('');
    } else {
      setShowPropertyTypes('none');
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: '100%', height: 'max-content', background: 'white', borderRadius: '4px' }}>
        <div id="hotspot-scale" style={{ opacity: showHotspots === 'visible' ? '' : '0' }}>
          <div id="hotspot-scale-label-low">{hotspotScaleLabels[0]}</div>
          <div id="hotspot-scale-label-high">{hotspotScaleLabels[1]}</div>
        </div>
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
        <MapMenu
          setHotspots={onSetHotspots}
          changeShowHotspots={changeShowHotspots}
          changeShowRecommendedProperties={changeShowRecommendedProperties}
          changeShowPropertyTypes={changeShowPropertyTypes}
          geographicShapes={geographicShapes}
          setPropertyTypes={setPropertyTypes}
        ></MapMenu>
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
        {propertyTypesData.map(prop => (
          <div key={isNaN(prop.PARCELPIN) ? prop.b_irn : prop.PARCELPIN}>
            <Marker
              latitude={prop.AVG_LAT}
              longitude={prop.AVG_LONG}
              onClick={() => {if (isNaN(prop.PARCELPIN)) {setPopupOpen("m" + prop.b_irn);} else {setPopupOpen("m" + prop.PARCELPIN);}}}
              style={{display: showPropertyTypes}}
            >
              <div style={{width: '16px', height: '16px', border: '2px solid #808', borderRadius: '50%', background: 'magenta'}}></div>
            </Marker>
            {popupOpen === "m" + prop.b_irn && (
              <Popup
                latitude={prop.AVG_LAT}
                longitude={prop.AVG_LONG}
                onClose={() => setPopupOpen('')}
                closeButton={true}
                closeOnClick={false}
              >
                {prop.b_name} <br></br>
                {Math.round(prop.haversine_distance * 1000) / 1000} Miles
              </Popup>
            )}
            {popupOpen === "m" + prop.PARCELPIN && (
              <Popup
                latitude={prop.AVG_LAT}
                longitude={prop.AVG_LONG}
                onClose={() => setPopupOpen('')}
                closeButton={true}
                closeOnClick={false}
              >
                {prop.FULL_ADDR} <br></br>
                {prop.SiteCat1 === 'Residential' ? '' : 'Owner: ' + prop.PARCL_OWN2} <br></br>
                Distance: {Math.round(prop.haversine_distance * 1000) / 1000} Miles
              </Popup>
            )}
          </div>
        ))}
        {properties.map(prop => (
          <div key={prop.PARCELPIN} style={{ display: 'none' }}>
            <Marker
              latitude={prop.AVG_LAT}
              longitude={prop.AVG_LONG}
              color={markerColor[prop.SiteCat1 === '' ? 'Other' : prop.SiteCat1]}
              onClick={() => { setPopupOpen(prop.PARCELPIN); showDetails(prop) }}
              style={{ display: showRecommendedProperties }}
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
                  {prop.SiteCat1 === 'Residential' ? '' : 'Owner: ' + prop.PARCL_OWN2}
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
      <div style={{ margin: '5px 0 0 0', display: property.FULL_ADDR == null ? 'none' : 'inline-block' }}>{property.FULL_ADDR}</div><br></br>
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
          <Row style={{ height: '100%', rowGap: '5px' }}>
            <Col md={6} lg={6}>
              <Map
                initialViewState={{
                  longitude: -81.6,
                  latitude: 41.5,
                  zoom: 9,
                }}
                style={{ border: '2px solid lightgrey', borderRadius: '8px' }}
                mapLib={maplibregl}
                mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=nmF5UJHGt6DxUo6Ooheo"
                type="vector"
                onClick={handleAdvancedMapClick}
              >
                <Marker
                  latitude={isNaN(property.AVG_LAT) ? 0 : property.AVG_LAT}
                  longitude={isNaN(property.AVG_LONG) ? 0 : property.AVG_LONG}
                  color="red"
                  style={{ zIndex: 1, display: isNaN(property.PARCELPIN) ? 'none' : '' }}
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
      <div style={{ display: isNaN(property.PARCELPIN) ? 'none' : '' }}>
          <Row style={{justifyContent: 'center', margin: 0, padding: 0}}>
            <Col md={6} xxl={6} style={{display: 'grid', aspectRatio: '1/1', padding: 0, minWidth: '300px'}}>
              <Plot
                var data={[{
                  values: [property.i_percent_low, property.i_percent_med, property.i_percent_high],
                  labels: ['Less than $15k per year', '$15k - $40k per year', 'More than $40k per year'],
                  type: 'pie',
                  marker: { colors: ['#d9463e', '#d9d93e', '#4ec94e'] }
                }]}
                layout={{ automargin: true, autosize: true, showlegend: false, title: 'Neighborhood Income', plot_bgcolor: "rgba(0,0,0,0)", paper_bgcolor: "rgba(0,0,0,0)"}}
                config={{ responsive: true }}

              />
            </Col>


            <Col md={6} xxl={6} style={{display: 'grid', aspectRatio: '1/1', padding: 0, minWidth: '300px'}}>
              <Plot
                var data={[{
                  values: [property.d_white, property.d_black, property.d_asian, property.d_indigenous, property.d_pacific],
                  // values: [.50, .50],
                  labels: ['White', 'Black', 'Asian', 'Indigenous', 'Pacific'],
                  type: 'pie',
                  marker: {
                    colors: [
                      '#4444AA',
                      '#DDDD44',
                      '#44AA44',
                      '#AA44AA',
                      '#AA4444'
                    ]
                  }
                }]}
                layout={{ automargin: true, autosize: true, showlegend: false, title: 'Local Diversity', plot_bgcolor: "rgba(0,0,0,0)", paper_bgcolor: "rgba(0,0,0,0)"}}
                config={{ responsive: true }}

              />
            </Col>
            <Col md={6} xxl={6} style={{display: 'grid', aspectRatio: '1/1', padding: 0, minWidth: '300px'}}>
              <Plot
                var data={[{

                  // make function and set data equal to something set data = to function that returns whole data object with use state
                  values: [property.ind_farm, property.ind_mining, property.ind_utility, property.ind_construction, property.ind_manufacture, property.ind_wholesale, property.ind_retail, property.ind_transport, property.ind_it, property.ind_finance, property.ind_real_estate, property.ind_science, property.ind_management, property.ind_waste, property.ind_education, property.ind_health_care, property.ind_entertain, property.ind_food_service, property.ind_other, property.ind_public_admin],
                  labels: ['Farming', 'Mining', 'Utility', 'Construction', 'Manufacturing', 'Wholesale', 'Retail', 'Transport', 'Information Technology', 'Finance', 'Real Estate', 'Science', 'Management', 'Waste Management', 'Education', 'Health Care', 'Entertainment', 'Food Service', 'Other', 'Public Administration'],
                  type: 'pie',
                  marker: {
                    colors: [
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
                    ]
                  }
                }]}
                layout={{ automargin: true, autosize: true, title: 'Area Industry Distribution', showlegend: false, textinfo: 'none', plot_bgcolor: "rgba(0,0,0,0)", paper_bgcolor: "rgba(0,0,0,0)"}}
                config={{ responsive: true }}
              />
            </Col>
            <Col md={6} xxl={6} style={{display: 'grid', aspectRatio: '1/1', padding: 0, minWidth: '300px'}}>
              <Plot
                data={[{
                  r: [property.comm_vacant, property.comm_living, property.comm_retail, property.comm_food, property.comm_life_services, property.comm_office, property.comm_automotive, property.comm_entertainment_sports, property.comm_warehouse_supply, property.comm_watercraft_aircraft, property.comm_other],
                  theta: ['Vacant', 'Living', 'Retail', 'Food', 'Life Services', 'Office', 'Automotive', 'Entertainment', 'Warehouse', 'Aircraft', 'Other'],
                  type: "scatterpolar",
                  fill: 'toself'
                }]}
                layout={{ automargin: true, autosize: true, showlegend: false, title: 'Number of Commercial Parcels', plot_bgcolor: "rgba(0,0,0,0)", paper_bgcolor: "rgba(0,0,0,0)"}}
                config={{ responsive: true }}
              />
            </Col>
          </Row>
      </div>
    </div>
  );
}

export default PropertyDetails;