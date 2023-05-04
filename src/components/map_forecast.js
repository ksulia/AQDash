import * as React from 'react';
const { token_fore, styles } = require('./config.json')
import { getLegend } from '../functions/legends.js';
import { _onMouseMove, _onClick, _onMove } from '../functions/mouseFunctions.js';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = token_fore;

const mapStyle = { height: '50vh', width: '100vw', borderRadius: 5 }


export default class ForecastMap extends React.Component {

    constructor(props) {
        super(props)
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            // id: 'forecast_map',
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v9',
            center: [this.props.state.lng, this.props.state.lat],
            zoom: this.props.state.zoom
        });

        map.on('move', () => _onMove(map, this.props))
        map.on('mousemove', (e) => {
            _onMouseMove(map, e, this.props)
        })

        map.once('load', async () => {
            map.addSource('wrfchem', {
                'type': 'geojson',
                'data': this.props.state.wrfObjnow
            })
            map.addLayer({
                'id': 'wrfchem',
                'type': 'fill',
                'source': 'wrfchem',
                'layout': { 'visibility': 'none' },
                'paint': {
                    'fill-color': ['get', 'fill'],
                    'fill-opacity': ['get', 'fill-opacity'],
                    'fill-outline-color': ['get', 'stroke']
                }
            })

            map.addSource('viirs', {
                'type': 'geojson',
                'data': this.props.state.viirsObjnow
            })
            map.addLayer({
                'id': 'viirs',
                'type': 'circle',
                'source': 'viirs',
                'layout': { 'visibility': 'none' },
                'paint': {
                    'circle-color': ['get', 'color_pres'],
                    'circle-radius': 2,
                    'circle-stroke-color': 'grey',
                    'circle-stroke-width': 1,
                }
            })
            setInterval(async () => {
                map.getSource('wrfchem').setData(this.props.state.wrfObjnow);
                map.getSource('viirs').setData(this.props.state.viirsObjnow);
            }, 1000);

            this.props.handleChange({ map_forecast: true })
        })



        this.map = map
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.state.map_forecast) {

            if (prevProps.state.wrfObjnow != this.props.state.wrfObjnow ||
                this.props.state.pmChecked != prevProps.state.pmChecked ||
                this.props.state.o3Checked != prevProps.state.o3Checked) {

                if (this.props.state.wrfObjnow && this.props.state.wrfChecked &&
                    (this.props.state.pmChecked || this.props.state.o3Checked)) {

                    this.map.setLayoutProperty('wrfchem', 'visibility', 'visible')
                } else
                    this.map.setLayoutProperty('wrfchem', 'visibility', 'none')
            }

            if (prevProps.state.viirsObjnow != this.props.state.viirsObjnow ||
                this.props.state.AODclick48S != prevProps.state.AODclick48S ||
                this.props.state.AODclick36 != prevProps.state.AODclick36 ||
                this.props.state.AODclick48J != prevProps.state.AODclick48J) {

                if (this.props.state.viirsObjnow && this.props.state.AODon &&
                    (this.props.state.AODclick48S || this.props.state.AODclick36 || this.props.state.AODclick48J)) {

                    this.map.setLayoutProperty('viirs', 'visibility', 'visible')
                } else
                    this.map.setLayoutProperty('viirs', 'visibility', 'none')
            }
        }
    }

    render() {

        return (
            <div style={{ width: '100%' }}>
                {console.log('virrsobjnow', this.props.state.viirsObjnow)}
                {this.props.state.AODon &&
                    (this.props.state.AODclick36 || this.props.state.AODclick48J || this.props.state.AODclick48S) ?
                    <a style={{ color: "black", textAlign: 'left' }}>IDEA-NYS: {this.props.state.viirsTimeNow}  /   </a>
                    : null}
                {this.props.state.wrfChecked &&
                    (this.props.state.pmChecked || this.props.state.o3Checked) ?
                    <a style={{ color: "black", textAlign: 'right' }}>WRF CHEM: {this.props.state.wrfTimeNow}</a>
                    : null}
                <div ref={this.mapContainer} style={{ height: '50vh' }} />
                {getLegend(this.props.state, this.props.handleChange)}
            </div >

        )
    }
}