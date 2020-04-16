import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.scss';

(mapboxgl as any).accessToken = 'pk.eyJ1Ijoibmljb2xlaHUiLCJhIjoiSUFHaHEyVSJ9.sQh47fHih8dvNgItm92dqg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-105.185583, 39.742447],
    zoom: 10
});