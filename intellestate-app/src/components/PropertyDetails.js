import Plot from "react-plotly.js";
import Map, { Layer, Source, Marker, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-81.9151, 41.4816]}}
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

function PropertyDetails() {
  return (
    <div style={{ width: "100%" }}>
      <h3>Visualizations</h3>
      <br></br>
      <Map
        initialViewState={{
          longitude: -81.6,
          latitude: 41.5,
          zoom: 8
        }}
        style={{width: '100%', aspectRatio: '3/2', border: '2px solid lightgrey', borderRadius: '4px'}}
        mapLib={maplibregl}
        mapStyle="https://api.maptiler.com/maps/bright/style.json?key=nmF5UJHGt6DxUo6Ooheo"
        type='vector'
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle}></Layer>
        </Source>
      </Map>
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