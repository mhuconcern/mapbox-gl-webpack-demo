import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';
import Windy from './windy';

(mapboxgl as any).accessToken = 'pk.eyJ1Ijoibmljb2xlaHUiLCJhIjoiSUFHaHEyVSJ9.sQh47fHih8dvNgItm92dqg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [95.899147, 18.088694],
    zoom: 10
});

(window as any).Map = map;

map.on("load", function () {
  map.addSource("canvas-source", {
    type: "canvas",
    canvas: "canvasID",
    coordinates: [
      [91.4461, 21.5006],
      [100.3541, 21.5006],
      [100.3541, 13.9706],
      [91.4461, 13.9706],
    ],
    // Set to true if the canvas source is animated. If the canvas is static, animate should be set to false to improve performance.
    animate: true,
  });

  map.addLayer({
    id: "canvas-layer",
    type: "raster",
    source: "canvas-source",
  });
});