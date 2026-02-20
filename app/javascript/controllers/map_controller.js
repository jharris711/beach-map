import { Controller } from "@hotwired/stimulus"
import L from 'leaflet'

export default class extends Controller {
    connect() {
        this.map = L.map(this.element).setView([39.0, -77.0], 10);

        var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        });     
        Stadia_AlidadeSmoothDark.addTo(this.map);

        var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'jpg'
        });

        var marker = L.marker([39.084, -77.1528]).addTo(this.map);

        var circle = L.circle([38.9764, -76.4896], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 10000
        }).addTo(this.map);

        var polygon = L.polygon([
            [39.2905, -76.6104],
            [39.4008, -76.9515],
            [39.2037, -76.8610]
        ]).addTo(this.map);

        const baseLayers = {
            "Stadia Dark": Stadia_AlidadeSmoothDark,
            "Stadia Satellite": Stadia_AlidadeSatellite
        }

        const overlays = {
            marker,
            circle,
            polygon
        }

        var layerControl = L.control
            .layers(baseLayers, overlays)
            .addTo(this.map);
    
        
    }
}