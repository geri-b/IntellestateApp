import Plot from "react-plotly.js";

function PropertyDetails() {
  return (
    <div style={{ width: "100%" }}>
      <h3>Visualizations</h3>
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