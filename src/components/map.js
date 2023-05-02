import * as React from 'react';
// import Map, { Marker, Source, Layer, Popup } from "react-map-gl";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { Container, Row, Col } from 'react-bootstrap'
import { getLegend } from '../functions/legends.js';
import { _onMouseMove, _onClick, _onMove } from '../functions/mouseFunctions.js';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useClassNamesOverride } from '@mui/base/utils/ClassNameConfigurator.js';

const { token_real, styles } = require('./config.json')
mapboxgl.accessToken = token_real;


export class RealTimeMap extends React.Component {

    constructor(props) {
        super(props)
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        // console.log("MAP", this.mapRef)
        const map = new mapboxgl.Map({
            id: 'realtime_map',
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v9',
            center: [this.props.state.lng, this.props.state.lat],
            zoom: this.props.state.zoom
        });

        // _onMouseMove(map, null, this.props)

        map.on('move', () => _onMove(map, this.props))
        map.on('mousemove', (e) => {
            _onMouseMove(map, e, this.props)
        })
        map.on('mouseenter', 'pm2.5', (e) => {
            console.log('pm2.5', e)
        })

        // this.goesLayer(map, 'goesaod', this.props.state.goesDataAOD)
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
            })

            setTimeout(async () => {
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

                    console.log("aod obj updating", this.props.state.goesDataAOD, typeof (this.props.state.goesDataAOD))
                    console.log("aod map source", this.map.getSource('goesaod'))
                    console.log('query', this.map.querySourceFeatures('goesaod', {
                        sourceLayer: 'goesaod'
                    }))
                    this.map.getSource('goesaod').setData({ 'data': this.props.state.goesDataAOD })

                    this.map.setLayoutProperty('goesaod', 'visibility', 'visible')
                    this.map.setPaintProperty('goesaod', 'fill-color', ['get', 'fill'])
                    this.map.setPaintProperty('goesaod', 'fill-opacity', ['get', 'fill-opacity'])
                    this.map.setPaintProperty('goesaod', 'fill-outline-color', ['get', 'stroke'])

                } else {
                    this.map.setLayoutProperty('goesaod', 'visibility', 'none')
                }
            }
            if (this.props.state.goesDataDust != prevProps.state.goesDataDust ||
                this.props.state.GOESd != prevProps.state.GOESd) {
                console.log('DUST', prevProps.state.goesDataDust, this.props.state.goesDataDust, prevProps.state.GOESd, this.props.state.GOESd)
                if (this.props.state.goesDataDust &&
                    this.props.state.GOESd) {

                    this.map.getSource('goesdust').setData({ 'data': this.props.state.goesDataDust })
                    this.map.setLayoutProperty('goesdust', 'visibility', 'visible')
                    this.map.setPaintProperty('goesdust', 'fill-color', ['get', 'fill'])
                    this.map.setPaintProperty('goesdust', 'fill-opacity', ['get', 'fill-opacity'])
                    this.map.setPaintProperty('goesdust', 'fill-outline-color', ['get', 'stroke'])

                } else {
                    this.map.setLayoutProperty('goesdust', 'visibility', 'none')
                }
            }
            if (this.props.state.goesDataSmoke != prevProps.state.goesDataSmoke ||
                this.props.state.GOESs != prevProps.state.GOESs) {
                console.log('SMOKE', prevProps.state.goesDataSmoke, this.props.state.goesDataSmoke, prevProps.state.GOESs, this.props.state.GOESs)
                if (this.props.state.goesDataSmoke &&
                    this.props.state.GOESs) {

                    this.map.getSource('goessmoke').setData({ 'data': this.props.state.goesDataSmoke })
                    this.map.setLayoutProperty('goessmoke', 'visibility', 'visible')
                    this.map.setPaintProperty('goessmoke', 'fill-color', ['get', 'fill'])
                    this.map.setPaintProperty('goessmoke', 'fill-opacity', ['get', 'fill-opacity'])
                    this.map.setPaintProperty('goessmoke', 'fill-outline-color', ['get', 'stroke'])

                } else {
                    this.map.setLayoutProperty('goessmoke', 'visibility', 'none')
                }

            }


            if (this.props.state.airnowData != prevProps.state.airnowData ||
                this.props.state.Airnowon != prevProps.state.Airnowon) {
                console.log('AIRNOW', prevProps.state.airnowData, this.props.state.airnowData, prevProps.state.Airnowon, this.props.state.Airnowon)
                if (this.props.state.airnowData &&
                    this.props.state.Airnowon) {
                    this.map.getSource('pm2.5').setData({
                        'data': this.props.state.airnowData
                    })

                    this.map.setLayoutProperty(
                        'pm2.5', 'visibility', 'visible'
                    )
                    this.map.setPaintProperty('pm2.5', 'circle-color', ['get', 'color'])
                    this.map.setPaintProperty('pm2.5', 'circle-opacity', 0.3)
                    this.map.setPaintProperty('pm2.5', 'circle-radius', 5.5)
                    this.map.setPaintProperty('pm2.5', 'circle-stroke-color', 'grey')
                    this.map.setPaintProperty('pm2.5', 'circle-stroke-width', 1)


                } else {
                    this.map.setLayoutProperty(
                        'pm2.5', 'visibility', 'none'
                    )
                }
            }
        }
    }


    popUpTextRow(name, value) {
        return (
            <Row>
                <Col style={{ paddingRight: 5 }}>
                    <a class="text-nowrap" >{name}</a>
                </Col>
                <Col>
                    <a class="text-nowrap">{value}</a>
                </Col>
            </Row>
        )
    }

    onDrawCreate = ({ features }) => {
        console.log('create', features[0].geometry.coordinates, this.props);
        let coords = features[0].geometry.coordinates[0]
        let minLat = 1000, maxLat = -1000, minLon = 1000, maxLon = -1000
        coords.forEach((e) => {
            console.log('coords', e)
            minLon = Math.min(minLon, e[0])
            minLat = Math.min(minLat, e[1])
            maxLon = Math.max(maxLon, e[0])
            maxLat = Math.max(maxLat, e[1])
        })
        console.log(minLat, minLon, maxLat, maxLon)
        this.props.handleChange({ fitBounds: [[minLon, minLat], [maxLon, maxLat]] })

    };
    onDrawUpdate = ({ features }) => {
        console.log(features);
    };


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