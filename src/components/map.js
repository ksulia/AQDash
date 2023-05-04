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
        console.log('compoennt did mount map')

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
                'layout': { 'visibility': 'none' },
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
                'layout': { 'visibility': 'none' },
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
                'layout': { 'visibility': 'none' },
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
                'layout': { 'visibility': 'none' },
                'paint': {
                    'circle-color': ['get', 'color'],
                    'circle-opacity': 0.3,
                    'circle-radius': 5.5,
                    'circle-stroke-color': 'grey',
                    'circle-stroke-width': 1
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
            // setInterval(async () => console.log(map.querySourceFeatures('goesaod')), 1000)


            //map.getSource('goesaod').setData({'data':this.props.state.goesDataAOD});
            //dont use this method! It does not properly load the layer on refresh

            setTimeout(() => {
                map.getSource('goesaod').setData(this.props.state.goesDataAOD);
                map.getSource('goesdust').setData(this.props.state.goesDataDust);
                map.getSource('goessmoke').setData(this.props.state.goesDataSmoke);
                map.getSource('pm2.5').setData(this.props.state.airnowData);
            }, 1000);

            this.props.handleChange({ map_realtime: true })
        })
        this.map = map
    }

    componentDidUpdate(prevProps, prevState) {


        if (this.props.state.map_realtime) {

            if (this.props.state.goesDataAOD != prevProps.state.goesDataAOD ||
                this.props.state.GOESa != prevProps.state.GOESa) {
                console.log('AOD', prevProps.state.goesDataAOD, this.props.state.goesDataAOD, prevProps.state.GOESa, this.props.state.GOESa)
                if (this.props.state.goesDataAOD &&
                    this.props.state.GOESa) {

                    this.map.getSource('goesaod').setData(this.props.state.goesDataAOD);
                    this.map.setLayoutProperty('goesaod', 'visibility', 'visible')
                } else {
                    this.map.setLayoutProperty('goesaod', 'visibility', 'none')
                }
            }
            if (this.props.state.goesDataDust != prevProps.state.goesDataDust ||
                this.props.state.GOESd != prevProps.state.GOESd) {
                console.log('DUST', prevProps.state.goesDataDust, this.props.state.goesDataDust, prevProps.state.GOESd, this.props.state.GOESd)
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
                console.log('SMOKE', prevProps.state.goesDataSmoke, this.props.state.goesDataSmoke, prevProps.state.GOESs, this.props.state.GOESs)
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
                console.log('AIRNOW', prevProps.state.airnowData, this.props.state.airnowData, prevProps.state.Airnowon, this.props.state.Airnowon)
                if (this.props.state.airnowData &&
                    this.props.state.Airnowon) {

                    this.map.getSource('pm2.5').setData(this.props.state.airnowData);
                    this.map.setLayoutProperty('pm2.5', 'visibility', 'visible')
                } else {
                    this.map.setLayoutProperty('pm2.5', 'visibility', 'none')
                }
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