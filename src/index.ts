import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.scss";
import Windy from "./windy";
const data = require("./gfs2.json");

(mapboxgl as any).accessToken =
  "pk.eyJ1Ijoibmljb2xlaHUiLCJhIjoiSUFHaHEyVSJ9.sQh47fHih8dvNgItm92dqg";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-99.076, 39.132],
  zoom: 2,
});

(window as any).Map = map;

map.on("load", function () {
  var bounds = new mapboxgl.LngLatBounds([
    42.51529678358733,
    1.4153098311803234,
    77.37276507109567,
    42.10251144607963,
  ]);
  map.addSource("canvas-source", {
    type: "canvas",
    canvas: "canvasID",
    coordinates: [
      bounds.getNorthEast().toArray(),
      bounds.getNorthWest().toArray(),
      bounds.getSouthWest().toArray(),
      bounds.getSouthEast().toArray(),
    ],
    // Set to true if the canvas source is animated. If the canvas is static, animate should be set to false to improve performance.
    animate: true,
  });
  var layers = map.getStyle().layers;
  // Find the index of the first symbol layer in the map style
  var firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === "symbol") {
      firstSymbolId = layers[i].id;
      break;
    }
  }
  map.addLayer(
    {
      id: "canvas-layer",
      type: "raster",
      source: "canvas-source",
    },
    firstSymbolId
  );
  redraw();
});
var canvas: HTMLCanvasElement = document.getElementById("canvasID") as HTMLCanvasElement;
var windy = Windy({ canvas, data });
map.on("resize", redraw);
function redraw() {
  const canvasMap: mapboxgl.CanvasSource = map.getSource("canvas-source") as mapboxgl.CanvasSource;
  const bounds = map.getBounds();
  canvasMap.setCoordinates([
    bounds.getNorthWest().toArray(),
    bounds.getNorthEast().toArray(),
    bounds.getSouthEast().toArray(),
    bounds.getSouthWest().toArray(),
  ]);
  canvasMap.getCanvas().height = map.getCanvas().height;
  canvasMap.getCanvas().width = map.getCanvas().width;
  windy.stop();
  setTimeout(function () {
    windy.start(
      [
        [0, 0],
        [map.getCanvas().width, map.getCanvas().height],
      ],
      map.getCanvas().width,
      map.getCanvas().height,
      bounds.toArray()
    );
  }, 500);
}
