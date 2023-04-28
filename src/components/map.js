import * as React from 'react';
import Map, { Marker, Source, Layer, Popup } from "react-map-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { Container, Row, Col } from 'react-bootstrap'
import { getLegend } from '../functions/legends.js';
import { _onMouseMove, _onClick, _onMove } from '../functions/mouseFunctions.js';

const { token_real, styles } = require('./config.json')

// const Map = ReactMapboxGl({ accessToken: token_real })
const mapStyle = { height: '50vh', borderRadius: 5 }
const goesLayer = {
    type: 'fill',
    paint: {
        'fill-color': ['get', 'fill'],
        'fill-opacity': ['get', 'fill-opacity'],
        'fill-outline-color': ['get', 'stroke']
    }
};
const airnowLayer = {
    type: 'circle',
    paint: {
        'circle-color': ['get', 'color'],
        'circle-opacity': 0.3,
        'circle-radius': 5.5,
        'circle-stroke-color': 'grey',
        'circle-stroke-width': 1,
    }
};
const lidarLayer = {
    type: 'symbol',
    layout: {
        'text-field': ['get', 'site'],
        'text-size': 15,
        'text-allow-overlap': true,
        'text-anchor': 'bottom',
    }
    //NEED TO FIX THIS AND PUT THE HANDLER IN mouseFunctions 
    // onClick: {(e) =>
    //     this.props.handleChange({
    //         chosenSite: e.features[0].properties.site,
    //         scaPlotOn: true,
    //         cnrPlotOn: true,
    //     })
    // }
};

export class RealTimeMap extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // console.log("MAP", this.mapRef)
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
                <Map
                    ref={map => this.mapRef = map}
                    initialViewState={{
                        latitude: this.props.state.lat,
                        longitude: this.props.state.lng,
                        zoom: this.props.state.zoom
                    }}
                    style={mapStyle}
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                    mapboxAccessToken={token_real}
                    onMouseMove={(e) => _onMouseMove(this.mapRef, e, this.props)}
                    onMove={(e) => _onMove(this.mapRef, e, this.props)}
                    onClick={(e) => _onClick(this.mapRef, e, this.props)}
                >
                    {this.props.state.goesDataAOD &&
                        this.props.state.GOESa ? (
                        <Source id='goesaod' type='geojson' data={this.props.state.goesDataAOD}>
                            <Layer {...goesLayer} />
                        </Source>
                    ) : null}

                    {this.props.state.goesDataDust &&
                        this.props.state.GOESd ? (
                        <Source id='goesdust' type='geojson' data={this.props.state.goesDataDust}>
                            <Layer {...goesLayer} />
                        </Source>
                    ) : null}

                    {this.props.state.goesDataSmoke &&
                        this.props.state.GOESs ? (
                        <Source id='goessmoke' type='geojson' data={this.props.state.goesDataSmoke}>
                            <Layer {...goesLayer} />
                        </Source>
                    ) : null}

                    {this.props.state.airnowData != null &&
                        this.props.state.Airnowon ? (
                        <Source id='pm2.5' type='geojson' data={this.props.state.airnowData}>
                            <Layer {...airnowLayer} />
                        </Source>
                    ) : null}

                    {this.props.state.lidarSites && this.props.state.Lidaron ? (
                        <Source id='lidarSites' type='geojson' data={this.props.state.lidarSites}>
                            <Layer {...lidarLayer} />
                        </Source>
                    ) : null}

                    {console.log('this.props.state.airnowLoc', this.props.state.airnowPopup)}
                    {this.props.state.airnowPopup ?
                        <Popup
                            longitude={this.props.state.airnowLoc[0]}
                            latitude={this.props.state.airnowLoc[1]}
                            style={{ textAlign: 'left', width: 'undefined' }}>
                            {this.popUpTextRow('Site:', this.props.state.airnowPopupProps.site_props.site)}
                            {this.popUpTextRow('PM 2.5:', this.props.state.airnowPopupProps.props.value + ' μg m⁻³')}
                            {this.popUpTextRow('AQI:', this.props.state.airnowPopupProps.props.AQI)}
                            {this.popUpTextRow('Region:', this.props.state.airnowPopupProps.site_props.region)}
                        </Popup>
                        : null}

                    {getLegend(this.props.state, this.props.handleChange)}



                </Map>



            </div >


        )
    }
}

export default RealTimeMap;