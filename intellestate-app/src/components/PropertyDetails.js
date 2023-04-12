import Plot from "react-plotly.js";
import Map, { Layer, Source, Marker, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

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

  const layerStyle = {
    id: 'tract-fills',
    type: 'fill',
    paint: {
      'fill-color': {
        'property': 'hotspotValue',
        'stops': [
          [-1, '#888'],
          [0, '#08f'],
          [.25, '#0f0'],
          [.5, '#ff0'],
          [.75, '#f80'],
          [1, '#f00'],
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
          [.25, '#0a0'],
          [.5, '#aa0'],
          [.75, '#a60'],
          [1, '#a00'],
        ]
      },
    },
  };
  
  const layerStyle2 = {
    id: 'tract-labels',
    type: 'symbol',
    minzoom: 12,
    layout: {
      'text-field': '{name}'
    }
  };

  const onHover = (e) => {
    if (e.features.length > 0) {
      if (hoveredPolygon !== null) {
        mapRef.current.setFeatureState(
          { source: 'my-data', id: hoveredPolygon },
          { hover: false }
        );
      }
      hoveredPolygon = e.features[0].id;
      mapRef.current.setFeatureState(
        { source: 'my-data', id: hoveredPolygon },
        { hover: true }
      );
      e.originalEvent.target.style.cursor = 'pointer';
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
    }
    hoveredPolygon = null;
    e.originalEvent.target.style.cursor = '';
  }

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{margin: '10px 0 0 0'}}>Advanced Location Details</h3>
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
        type='vector'
        onClick={handleMapClick}
        onMouseMove={onHover}
        onMouseLeave={onLeave}
        interactiveLayerIds={['tract-fills']}
      >
        <Source key={new Date().getTime()} id="my-data" type="geojson" data={shapes}>
          <Layer {...layerStyle}></Layer>
          <Layer {...layerStyle2}></Layer>
        </Source>
        {properties.map(prop => (
          <div key={prop.PARCELPIN}>
            <Marker
              latitude={prop.AVG_LAT}
              longitude={prop.AVG_LONG}
              color={markerColor[prop.SiteCat1 === '' ? 'Other' : prop.SiteCat1]}
              onClick={() => {setPopupOpen(prop.PARCELPIN); showDetails(prop)}}
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
      <Button style={{margin: '5px'}} onClick={() => setShowAdvancedMap(true)}>Advanced Map</Button>
      <Button style={{margin: '5px'}} onClick={() => setHotspots('tract', 'races', 'hispanic')}>Show Tract Hotspots</Button>
      <Button style={{margin: '5px'}} onClick={() => setHotspots('city', 'crime')}>Show City Hotspots</Button>
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
      <br></br>
      <br></br>
      <Row>
        <Col md={4}>
          <Plot 
            var data = {[{
            
              // make function and set data equal to something set data = to function that returns whole data object with use state
              values: [property.ind_farm, property.ind_mining, property.ind_utility, property.ind_construction, property.ind_manufacture, property.ind_wholesale, property.ind_retail, property.ind_transport, property.ind_it, property.ind_finance, property.ind_real_estate, property.ind_science, property.ind_management, property.ind_waste, property.ind_education, property.ind_health_care, property.ind_entertain, property.ind_food_service, property.ind_other, property.ind_public_admin],
              // values: [2,3,4,5,6],
              labels: ['Farming', 'Mining', 'Utility', 'Construction', 'Manufacturing', 'Wholesale', 'Retail', 'Transport', 'Information Technology', 'Finance', 'Real Estate', 'Science', 'Management', 'Waste Management', 'Education', 'Health Care', 'Entertainment', 'Food Service', 'Other', 'Public Administration'],
              type: 'pie'
            }]}
            layout = {{margin: { pad: 10, l: 5, r: 40, t: 40, b: 40 }, title: 'Area Industry Distribution', showlegend: false, textinfo: 'none', automargin: false}}
            config={{ responsive: true }}
            style={{ width: "100%", aspectRatio: "5 / 4" }}
          
          />
        </Col>
        <Col md={4}>
          <Plot 
            var data = {[{
              values: [property.d_white, property.d_black, property.d_asian, property.d_indegenous, property.d_pacific],
              // values: [.50, .50],
              labels: ['White', 'Black', 'Asian', 'Indigenous', 'Pacific'],
              type: 'pie'
            }]}
            layout = {{margin: { pad: 10, l: 40, r: 40, t: 40, b: 40 }, showlegend: false, title: 'Diversity Distribution'}}
            config={{ responsive: true }}
            style={{ width: "100%", aspectRatio: "5 / 4" }}

          />
        </Col>
        <Col md={4}>
          <Plot 
            var data = {[{
              values: [property.i_percent_low, property.i_percent_med, property.i_percent_high],
              // values: [.50, .50],
              labels: ['Less than 15k per year','15k - 40k per year', 'More than 40k per year'],
              type: 'pie'
            }]}
            layout = {{margin: { pad: 10, l: 40, r: 40, t: 40, b: 40 }, showlegend: false, title: 'Income Distribution'}}
            config={{ responsive: true }}
            style={{ width: "100%", aspectRatio: "5 / 4" }}
          
          />
        </Col>
      </Row>
    </div>
  );
}

export default PropertyDetails;