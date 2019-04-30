import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

(mapboxgl as any).accessToken = 'pk.eyJ1Ijoic2FnZXdhbGwiLCJhIjoiY2oyMmpla213MDBmdDMybWtjY3lyYzRjeSJ9.Nd7bpm84x9CerBQz9DG_Cw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-105.185583, 39.742447],
    zoom: 10
});

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
}))