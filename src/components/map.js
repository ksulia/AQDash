import * as React from 'react';
import ReactMapboxGl, {
    GeoJSONLayer,
    Popup,
    Marker,
    Image,
    Layer,
    Feature,
} from 'react-mapbox-gl';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { Container, Row, Col } from 'react-bootstrap'
import { getLegend } from '../functions/legends.js';
import { _onMouseMove, _onClick, _onMove } from '../functions/mouseFunctions.js';

const { token_real, styles } = require('./config.json')

const Map = ReactMapboxGl({ accessToken: token_real })
const mapStyle = { height: '50vh', borderRadius: 5 }

export class RealTimeMap extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log("MAP", this.mapRef)
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
                    style={styles.light}
                    center={[this.props.state.lng, this.props.state.lat]}
                    zoom={[this.props.state.zoom]}
                    containerStyle={mapStyle}
                    fitBounds={this.props.state.fitBounds}
                    onMouseMove={(map, e) => _onMouseMove(map, e, this.props)}
                    onMove={(map, e) => _onMove(map, e, this.props)}
                    onClick={(map, e) => _onClick(map, e, this.props)}
                >



                    {this.props.state.goesDataAOD &&
                        this.props.state.GOESa ? (
                        <GeoJSONLayer
                            key={'goesaod'}
                            id={'goesaod'}
                            data={this.props.state.goesDataAOD}
                            fillPaint={{
                                'fill-color': ['get', 'fill'],
                                'fill-opacity': ['get', 'fill-opacity'],
                                'fill-outline-color': ['get', 'stroke']
                            }}
                        />
                    ) : null}

                    {this.props.state.goesDataDust &&
                        this.props.state.GOESd ? (
                        <GeoJSONLayer
                            key={'goesdust'}
                            id={'goesdust'}
                            data={this.props.state.goesDataDust}
                            fillPaint={{
                                'fill-color': ['get', 'fill'],
                                'fill-opacity': ['get', 'fill-opacity'],
                                'fill-outline-color': ['get', 'stroke']
                            }}
                        />
                    ) : null}

                    {this.props.state.goesDataSmoke &&
                        this.props.state.GOESs ? (
                        <GeoJSONLayer
                            key={'goessmoke'}
                            id={'goessmoke'}
                            data={this.props.state.goesDataSmoke}
                            fillPaint={{
                                'fill-color': ['get', 'fill'],
                                'fill-opacity': ['get', 'fill-opacity'],
                                'fill-outline-color': ['get', 'stroke']
                            }}
                        />
                    ) : null}


                    {this.props.state.geoJsonWind != null &&
                        this.props.state.Windon ? (
                        <GeoJSONLayer
                            key={'WIND'}
                            data={
                                this.props.state.geoJsonWind[
                                this.props.state.Windkeys[0]
                                ]
                            }
                            symbolLayout={{
                                'icon-image': 'wind-arrow',
                                'icon-size': ['get', 'speed'],
                                'icon-rotate': ['get', 'dir'],
                                'icon-allow-overlap': true,
                            }}
                        />
                    ) : null}

                    {this.props.state.airnowData != null &&
                        this.props.state.Airnowon ? (
                        <GeoJSONLayer
                            key={'pm2.5'}
                            id={'pm2.5'}
                            data={this.props.state.airnowData}
                            /*symbolLayout={{
                                'text-field': ['get', 'value'],
                                'text-size': 5,
                                'text-allow-overlap': true,
                            }}*/
                            circlePaint={{
                                'circle-color': ['get', 'color'],
                                'circle-opacity': 0.3,
                                'circle-radius': 5.5,
                                'circle-stroke-color': 'grey',
                                'circle-stroke-width': 1,
                            }}

                        />
                    ) : null}

                    {this.props.state.riskHighlight ? (
                        <GeoJSONLayer
                            key={'riskHighlight'}
                            id={'riskHighlight'}
                            data={this.props.state.riskHighlight}
                            linePaint={{
                                'line-color': 'red',
                                'line-width': 3,
                            }}
                        />
                    ) : null}

                    {this.props.state.lidarSites && this.props.state.Lidaron ? (
                        <GeoJSONLayer
                            key={'lidarSites'}
                            id={'lidarSites'}
                            data={this.props.state.lidarSites}
                            symbolLayout={{
                                'text-field': ['get', 'site'],
                                'text-size': 15,
                                'text-allow-overlap': true,
                                'text-anchor': 'bottom',
                            }}
                            symbolOnClick={(e) =>
                                this.props.handleChange({
                                    chosenSite: e.features[0].properties.site,
                                    scaPlotOn: true,
                                    cnrPlotOn: true,
                                })
                            }
                            circleOnClick={(e) =>
                                this.props.handleChange({
                                    chosenSite: e.features[0].properties.site,
                                    scaPlotOn: true,
                                    cnrPlotOn: true,
                                })
                            }
                            circlePaint={{
                                'circle-color': 'blue',
                                'circle-opacity': 0.3,
                                'circle-radius': 5.5,
                                'circle-stroke-color': 'grey',
                                'circle-stroke-width': 1,
                            }}
                        />
                    ) : null}

                    {this.props.state.airnowPopup ?
                        <Popup coordinates={this.props.state.airnowLoc}
                            style={{ textAlign: 'left', width: 'undefined' }}>
                            {this.popUpTextRow('Site:', this.props.state.airnowPopupProps.site_props.site)}
                            {this.popUpTextRow('PM 2.5:', this.props.state.airnowPopupProps.props.value + ' μg m⁻³')}
                            {this.popUpTextRow('AQI:', this.props.state.airnowPopupProps.props.AQI)}
                            {this.popUpTextRow('Region:', this.props.state.airnowPopupProps.site_props.region)}
                        </Popup>
                        : null}

                    {getLegend(this.props.state, this.props.handleChange)}

                </Map>
            </div>


        )
    }
}

export default RealTimeMap;