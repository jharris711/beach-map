import { Controller } from "@hotwired/stimulus"
import L from 'leaflet'

export default class extends Controller {
    static values = {
        beaches: Array,
        location: Object
    }

    connect() {
        console.log("*****************LOCATION", this.locationValue)
        const { latitude, longitude } = this.locationValue;
        const center = latitude && longitude 
            ? L.latLng(latitude, longitude) 
            : L.latLng(39.0, -77.0);

        this.map = L.map(this.element).setView(center, 7);

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

        const baseLayers = {
            "Stadia Dark": Stadia_AlidadeSmoothDark,
            "Stadia Satellite": Stadia_AlidadeSatellite
        }

        var layerControl = L.control.layers(baseLayers).addTo(this.map);

        // Plot beaches from Overpass
        this.beachesValue.forEach(beach => {
            const lat = beach.lat ?? beach.center?.lat;
            const lon = beach.lon ?? beach.center?.lon;
            if (!lat || !lon) return;

            L.marker([lat, lon])
                .addTo(this.map)
                .bindPopup(beach.tags?.name ?? "Unnamed Beach");
        });
    }
}