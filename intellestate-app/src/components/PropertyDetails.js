import Plot from "react-plotly.js";
import Map, { Layer, Source, Marker, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const geojson = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Point', coordinates: [-81.9151, 41.4816] } }
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 5,
    'circle-color': '#007cbf'
  }
};

function PropertyDetails({ properties, property, showDetails, popupOpen, setPopupOpen }) {

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

  return (
    <div style={{ width: "100%" }}>
      <h3>Visualizations</h3>
      {property.FULL_ADDR}
      <br></br>
      <Map
        initialViewState={{
          longitude: -81.6,
          latitude: 41.5,
          zoom: 8
        }}
        style={{ width: '100%', aspectRatio: '3/2', border: '2px solid lightgrey', borderRadius: '4px' }}
        mapLib={maplibregl}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=nmF5UJHGt6DxUo6Ooheo"
        type='vector'
        onClick={handleMapClick}
      >
        {/* <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle}></Layer>
        </Source> */}
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
      <Button style={{margin: '5px'}} onClick={() => setShowAdvancedMap(true)}>Advanced Map</Button>
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
      <Plot
        data={[
          // {
          //     x: [1, 2, 3],
          //     y: [2, 6, 3],
          //     type: "scatter",
          //     mode: "lines+markers",
          //     marker: { color: "red" },
          // },
          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{
          title: "A Fancy Plot",
          margin: { pad: 10, l: 40, r: 40, t: 40, b: 40 },
          paper_bgcolor: "rgba(0,0,0,0)",
          //plot_bgcolor: "rgba(0,0,0,0)",
        }}
        config={{ responsive: true }}
        style={{ width: "100%", aspectRatio: "5 / 4" }}
      />
    </div>
  );
}

export default PropertyDetails;