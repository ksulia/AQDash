import * as React from 'react';
import { getLegend } from '../functions/legends.js';
import { _onMouseMove, _onClick, _onMove } from '../functions/mouseFunctions.js';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { airnowSites } from '../state.js'

const { token_real, styles } = require('./config.json')
mapboxgl.accessToken = token_real;


export class RealTimeMap extends React.Component {

    constructor(props) {
        super(props)
        this.mapContainer = React.createRef();
    }

    componentDidMount() {

        const map = new mapboxgl.Map({
            id: 'realtime_map',
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v9',
            center: [this.props.state.lng, this.props.state.lat],
            zoom: this.props.state.zoom
        });

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.once('load', async () => {
            map.addSource('goesaod', {
                'type': 'geojson',
                'data': this.props.state.goesDataAOD
            })
            map.addLayer({
                'id': 'goesaod',
                'type': 'fill',
                'source': 'goesaod',
                'layout': { 'visibility': this.props.state.GOESa ? 'visible' : 'none' },
                'paint': {
                    'fill-color': ['get', 'fill'],
                    'fill-opacity': ['get', 'fill-opacity'],
                    'fill-outline-color': ['get', 'stroke']
                }
            })

            map.addSource('goesdust', {
                'type': 'geojson',
                'data': this.props.state.goesDataDust
            })
            map.addLayer({
                'id': 'goesdust',
                'type': 'fill',
                'source': 'goesdust',
                'layout': { 'visibility': this.props.state.GOESd ? 'visible' : 'none' },
                'paint': {
                    'fill-color': ['get', 'fill'],
                    'fill-opacity': ['get', 'fill-opacity'],
                    'fill-outline-color': ['get', 'stroke']
                }
            })

            map.addSource('goessmoke', {
                'type': 'geojson',
                'data': this.props.state.goesDataSmoke
            })
            map.addLayer({
                'id': 'goessmoke',
                'type': 'fill',
                'source': 'goessmoke',
                'layout': { 'visibility': this.props.state.GOESs ? 'visible' : 'none' },
                'paint': {
                    'fill-color': ['get', 'fill'],
                    'fill-opacity': ['get', 'fill-opacity'],
                    'fill-outline-color': ['get', 'stroke']
                }
            })

            map.addSource('pm2.5', {
                'type': 'geojson',
                'data': this.props.state.airnowData
            })
            map.addLayer({
                'id': 'pm2.5',
                'type': 'circle',
                'source': 'pm2.5',
                'layout': { 'visibility': this.props.state.Airnowon ? 'visible' : 'none' },
                'paint': {
                    'circle-color': ['get', 'color'],
                    'circle-opacity': 0.3,
                    'circle-radius': 5.5,
                    'circle-stroke-color': 'grey',
                    'circle-stroke-width': 1
                }
            })

            map.addSource('lidarSites', {
                'type': 'geojson',
                'data': this.props.state.lidarSites
            })
            map.addLayer({
                'id': 'lidarSites',
                'type': 'circle',
                'source': 'lidarSites',
                'layout': { 'visibility': this.props.state.Lidaron ? 'visible' : 'none' },
                'paint': {
                    'circle-color': 'blue',
                    'circle-opacity': 0.3,
                    'circle-radius': 5.5,
                    'circle-stroke-color': 'grey',
                    'circle-stroke-width': 1,
                },
                'symbol': {
                    'text-field': ['get', 'site'],
                    'text-size': 15,
                    'text-allow-overlap': true,
                    'text-anchor': 'bottom',
                    'text-color': 'black'
                }
            })

            map.on('move', () => _onMove(map, this.props))
            map.on('mousemove', (e) => {
                _onMouseMove(map, e, this.props)
            })

            map.on('mouseenter', 'pm2.5', (e) => {
                console.log('pm2.5', e)
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';

                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();

                // console.log('desc', airnowSites);
                console.log('desc', e.features[0].properties.site);
                let phrase1 = '', phrase2 = '', phrase3 = '', phrase4 = '';
                try { phrase1 = `<strong>${e.features[0].properties.site}</strong><br/>` }
                catch { phrase1 = '' }
                try { phrase2 = `<a><strong>PM 2.5: </strong>${e.features[0].properties.value} μg m⁻³</a><br/>` }
                catch { phrase2 = '' }
                try { phrase3 = `<a><strong>AQI: </strong>${e.features[0].properties.AQI}</a><br/>` }
                catch { phrase3 = '' }
                try { phrase4 = `<a><strong>Region: </strong>${airnowSites[e.features[0].properties.site].region}</a>` }
                catch { phrase4 = '' }
                const description = `${phrase1}${phrase2}${phrase3}${phrase4}`;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.setLngLat(coordinates).setHTML(description).addTo(map);
            });

            map.on('mouseleave', 'pm2.5', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });

            map.on('click', 'lidarSites', (e) => {
                console.log('click lidar', e.features[0].properties.site)
                this.props.handleChange({
                    chosenSite: e.features[0].properties.site,
                    cnrPlotOn: true,
                })
            })
            // setInterval(async () => console.log(map.querySourceFeatures('goesaod')), 1000)


            //map.getSource('goesaod').setData({'data':this.props.state.goesDataAOD});
            //dont use this method! It does not properly load the layer on refresh

            setTimeout(() => {
                map.getSource('goesaod').setData(this.props.state.goesDataAOD);
                map.getSource('goesdust').setData(this.props.state.goesDataDust);
                map.getSource('goessmoke').setData(this.props.state.goesDataSmoke);
                map.getSource('pm2.5').setData(this.props.state.airnowData);
            }, 500);

            this.props.handleChange({ map_realtime: true })
        })
        this.map = map
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.state.map_realtime) {

            if (this.props.state.goesDataAOD != prevProps.state.goesDataAOD ||
                this.props.state.GOESa != prevProps.state.GOESa) {
                if (this.props.state.goesDataAOD &&
                    this.props.state.GOESa) {
                    console.log('get bounds', this.map.getBounds())

                    this.map.getSource('goesaod').setData(this.props.state.goesDataAOD);
                    this.map.setLayoutProperty('goesaod', 'visibility', 'visible')
                } else {
                    this.map.setLayoutProperty('goesaod', 'visibility', 'none')
                }
            }
            if (this.props.state.goesDataDust != prevProps.state.goesDataDust ||
                this.props.state.GOESd != prevProps.state.GOESd) {
                if (this.props.state.goesDataDust &&
                    this.props.state.GOESd) {

                    this.map.getSource('goesdust').setData(this.props.state.goesDataDust);
                    this.map.setLayoutProperty('goesdust', 'visibility', 'visible')
                } else {
                    this.map.setLayoutProperty('goesdust', 'visibility', 'none')
                }
            }
            if (this.props.state.goesDataSmoke != prevProps.state.goesDataSmoke ||
                this.props.state.GOESs != prevProps.state.GOESs) {
                if (this.props.state.goesDataSmoke &&
                    this.props.state.GOESs) {

                    this.map.getSource('goessmoke').setData(this.props.state.goesDataSmoke);
                    this.map.setLayoutProperty('goessmoke', 'visibility', 'visible')
                } else {
                    this.map.setLayoutProperty('goessmoke', 'visibility', 'none')
                }

            }

            if (this.props.state.airnowData != prevProps.state.airnowData ||
                this.props.state.Airnowon != prevProps.state.Airnowon) {
                if (this.props.state.airnowData &&
                    this.props.state.Airnowon) {

                    this.map.getSource('pm2.5').setData(this.props.state.airnowData);
                    this.map.setLayoutProperty('pm2.5', 'visibility', 'visible')
                } else {
                    this.map.setLayoutProperty('pm2.5', 'visibility', 'none')
                }
            }

            if (this.props.state.lidarSites != prevProps.state.lidarSites ||
                this.props.state.Lidaron != prevProps.state.Lidaron) {
                if (this.props.state.lidarSites &&
                    this.props.state.Lidaron) {

                    this.map.getSource('lidarSites').setData(this.props.state.lidarSites);
                    this.map.setLayoutProperty('lidarSites', 'visibility', 'visible')
                } else {
                    this.map.setLayoutProperty('lidarSites', 'visibility', 'none')
                }
            }

            //get AOD data in map bounds
            if (this.props.state.rawData && this.props.state.mapBounds && this.props.state.mapBounds != prevProps.state.mapBounds) {
                console.log('map bounds', this.props.state.mapBounds)
                let min_lat = this.props.state.mapBounds._sw.lat, max_lat = this.props.state.mapBounds._ne.lat, min_lon = this.props.state.mapBounds._sw.lng, max_lon = this.props.state.mapBounds._ne.lng;
                let timeseries = {}
                Object.entries(this.props.state.rawData.timeseries_data.aod).map(e => { //loop over time
                    console.log(e)
                    let temp_obj = {}
                    let total_area = 0, weighted_aod = 0;
                    e[1].features.map(feature => { //loop over features in that time
                        if (feature.geometry.coordinates[0] >= min_lon && feature.geometry.coordinates[0] <= max_lon &&
                            feature.geometry.coordinates[1] >= min_lat && feature.geometry.coordinates[1] <= max_lat) {
                            total_area += feature.properties.area
                            weighted_aod += feature.properties.area * feature.properties.aod
                        }
                    });
                    timeseries[e[0]] = { 'aod': weighted_aod / total_area }
                })
                this.props.handleChange({ aod_adp_timeseries: timeseries })

            }

        }
    }



    render() {

        return (

            <div style={{ width: '100%' }}>
                <div ref={this.mapContainer} style={{ height: '50vh' }} />
                {getLegend(this.props.state, this.props.handleChange)}
            </div >

        )
    }
}

export default RealTimeMap;