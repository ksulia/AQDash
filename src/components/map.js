import * as React from 'react';
import ReactMapboxGl, {
    GeoJSONLayer,
    Marker,
    Image,
    Layer,
    Feature,
} from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';
import { Container, Row, Col } from 'reactstrap'
import getRiskData from '../functions/getRiskData.js';

const { token, styles } = require('./config.json')

const Map = ReactMapboxGl({ accessToken: token })
const mapStyle = {height: '50vh', borderRadius:5}


export class RealTimeMap extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            mouseMoveLL: { lng: -77.093, lat: 43.3802 },
            mouseMoveWS: null,
            mouseMoveWD: null,
            mouseMoveGoesSmoke: null,
            mouseMoveGoesDust: null,
            mouseMovePM: null,
            mouseMoveRiskBox: null,
        }
//         this._onMouseMove = this._onMouseMove.bind(this)
    } 
    
    componentDidUpdate(prevState,prevProps){
        
    }
    
    getLegend() {
        return (
            <div
                style={{
                    position: 'absolute',
                    opacity: 0.8,
//                     width: '25vw',
                    top: 0,
                    margin: 10,
                    padding: 10,
                    backgroundColor: 'grey',
                    borderWidth: 5,
                    borderRadius: 5,
                }}
            >
                <Row style={{ paddingLeft: 20 }}>
                    <a style={{ color: 'white' }}>
                        Lon: {Math.round(this.state.mouseMoveLL.lng * 10) / 10}
                    </a>
                </Row>
                <Row style={{ paddingLeft: 20 }}>
                    <a style={{ color: 'white' }}>
                        Lat: {Math.round(this.state.mouseMoveLL.lat * 10) / 10}
                    </a>
                </Row>
                {this.props.state.Windon && this.props.state.mouseMoveWS ? (
                    <Row style={{ paddingLeft: 20 }}>
                        <a style={{ color: 'white' }}>
                            Wind: {this.props.state.mouseMoveWD} at{' '}
                            {Math.round(this.props.state.mouseMoveWS * 100) / 100} m
                            s⁻¹
                        </a>
                    </Row>
                ) : null}
                {this.props.state.Airnowon && this.props.state.mouseMovePM ? (
                    <Row style={{ paddingLeft: 20 }}>
                        <a style={{ color: 'white' }}>
                            PM2.5: {this.props.state.mouseMovePM} μg m⁻³
                        </a>
                    </Row>
                ) : null}
                {this.props.state.mouseMoveGoesDust ? (
                    <Row style={{ paddingLeft: 20 }}>
                        <a style={{ color: 'white' }}>GOES Dust Detected</a>
                    </Row>
                ) : null}
                {this.props.state.mouseMoveGoesSmoke ? (
                    <Row style={{ paddingLeft: 20 }}>
                        <a style={{ color: 'white' }}>GOES Smoke Detected</a>
                    </Row>
                ) : null}
                {this.props.state.mouseMoveRiskBox ? (
                    <Row style={{ paddingLeft: 20 }}>
                        <a style={{ color: 'white' }}>
                            Risk Data Count: {this.props.state.mouseMoveRiskBox}
                        </a>
                    </Row>
                ) : null}
            </div>
        )
    }
    
    _onMouseMove = (map, e) => {
        const features = map.queryRenderedFeatures(e.point)
        this._queryFeatures(features)
        this.setState({ mouseMoveLL: e.lngLat })
        //         console.log(features)
    }
    
    _queryFeatures(f) {
        var flag1 = false,
            flag2 = false,
            flag3 = false,
            flag4 = false,
            flag5 = false
        //       console.log("LAYERS",f)
        for (var i = 0; i < f.length; i++) {
            const id = f[i].layer.id
            if (id.includes('symbol')) {
                this.setState({
                    mouseMoveWS: f[i].properties.speed,
                    mouseMoveWD: this._degToCompass(f[i].properties.dir),
                })
                flag1 = true
            }
            if (id.includes('goessmoke')) {
                this.setState({ mouseMoveGoesSmoke: true })
                flag2 = true
            }
            if (id.includes('goesdust')) {
                this.setState({ mouseMoveGoesDust: true })
                flag3 = true
            }
            if (id.includes('pm2.5')) {
                this.setState({ mouseMovePM: f[i].properties.value })
                flag4 = true
            }
            if (id.includes('risk')) {
                this.setState({ mouseMoveRiskBox: f[i].properties.count })
                flag5 = true
            }
        }
        if (!flag1) this.setState({ mouseMoveWS: null, mouseMoveWD: null })
        if (!flag2) this.setState({ mouseMoveGoesSmoke: null })
        if (!flag3) this.setState({ mouseMoveGoesDust: null })
        if (!flag4) this.setState({ mouseMovePM: null })
        if (!flag5) this.setState({ mouseMoveRiskBox: null })
    }

    _onClick = (map, e) => {
        this.props.handleChangeMulti({ riskClick: false })
//         this.setState({ riskClick: false })
        const features = map.queryRenderedFeatures(e.point)
        console.log('FEATURES', features)
        for (var i = 0; i < features.length; i++) {
            const id = features[i].layer.id
            if (id.includes('risk')) {
                try {
                    console.log('DATA', features[i].properties.data)
                    let jsonParse = JSON.parse(features[i].properties.data)
                    let riskObj = getRiskData(jsonParse)

                    console.log('json parsee', jsonParse, riskObj)

                    let lat = jsonParse[0].lat,
                        lon = jsonParse[0].lon,
                        coords
                    let array = this.props.state.rawData.data_risk.features
                    for (var j = 0; j < array.length; j++) {
                        coords = array[j].geometry.coordinates
                        let minlon = coords[0][0][0],
                            minlat = coords[0][0][1]
                        let maxlon = coords[0][1][0],
                            maxlat = coords[0][2][1]
                        if (
                            lon >= minlon &&
                            lon <= maxlon &&
                            lat >= minlat &&
                            lat <= maxlat
                        )
                            break
                    }

                    this.props.handleChangeMulti({
                        riskData: riskObj,
                        riskClick: true,
                        GOESPlotOn: riskObj.times.length > 0 ? true : false,
                        airnowPlotOn:
                            riskObj.airnow.lon.length > 0 ? true : false,
                        viirsPlotOn: riskObj.viirs.length > 0 ? true : false,
                        riskHighlight: {
                            type: 'FeatureCollection',
                            features: [{type: 'Feature', geometry: {type: 'Polygon',coordinates: coords,},properties: {},},],
                        },
                    })
                } catch (e) {
                    console.warn(e)
                }
            }
        }
        console.log('onclick', features, this.props.state.riskData)
    }
    
    render(){
        
//         console.log('map!', this.props.state)
        return (
        
            <div style={{ width: '100%'}}>
                            <Map
                                style={styles.light}
                                center={[this.props.state.lng, this.props.state.lat]}
                                zoom={[this.props.state.zoom]}
                                containerStyle={mapStyle}
                                onMouseMove={this._onMouseMove}
                                onClick={this._onClick}
                                onMove={this._onMove}
                                onStyleImageMissing={this._onStyleImageMissing}
                                onStyleLoad={this._onLoad}
                            >

                                {this.props.state.rawData &&
                                this.props.state.rawData.data_risk ? (
                                    <GeoJSONLayer
                                        key={'riskPolygons'}
                                        id={'riskPolygons'}
                                        data={this.props.state.rawData.data_risk}
                                        fillPaint={{
                                            'fill-color': ['get', 'color'],
                                            'fill-opacity': ['get', 'alpha'],
                                        }}
                                    />
                                ) : null}

                                {this.props.state.goesDataSmoke != null &&
                                this.props.state.GOESon ? (
                                    <GeoJSONLayer
                                        key={'goessmoke'}
                                        id={'goessmoke'}
                                        data={this.props.state.goesDataSmoke}
                                        circlePaint={{
                                            'circle-color': ['get', 'color'],
                                            'circle-radius': 1.75,
                                        }}
                                    />
                                ) : null}
                                {this.props.state.goesDataDust != null &&
                                this.props.state.GOESon ? (
                                    <GeoJSONLayer
                                        key={'goesdust'}
                                        id={'goesdust'}
                                        data={this.props.state.goesDataDust}
                                        circlePaint={{
                                            'circle-color': ['get', 'color'],
                                            'circle-radius': 1.75,
                                        }}
                                    />
                                ) : null}

                                {this.props.state.viirsObj != null &&
                                this.props.state.AODon ? (
                                    <GeoJSONLayer
                                        id={'viirsobj'}
                                        key={'viirsobj'}
                                        data={this.props.state.viirsObjnow}
                                        circlePaint={{
                                            'circle-color': ['get', 'color'],
                                            'circle-radius': 2,
                                            'circle-stroke-color': 'grey',
                                            'circle-stroke-width': 1,
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
                                        symbolLayout={{
                                            'text-field': ['get', 'value'],
                                            'text-size': 5,
                                            'text-allow-overlap': true,
                                        }}
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
                                            this.props.handleChangeMulti({
                                                chosenSite:e.features[0].properties.site,
                                                scaPlotOn: true,
                                                cnrPlotOn: true,
                                            })
                                        }
                                        circleOnClick={(e) =>
                                            this.props.handleChangeMulti({
                                                chosenSite:e.features[0].properties.site,
                                                scaPlotOn: true,
                                                cnrPlotOn: true,
                                            })
                                        }
                                        circlePaint={{
                                            'circle-color': 'green',
                                            'circle-opacity': 0.3,
                                            'circle-radius': 5.5,
                                            'circle-stroke-color': 'grey',
                                            'circle-stroke-width': 1,
                                        }}
                                    />
                                ) : null}

                                {this.getLegend()}
                            </Map>
                            {this.props.state.cbHover ? (
                                <div
                                    style={{
                                        backgroundColor:'rgba(255,255,255,0.8)',
                                        borderRadius: 5,
                                        border:'1px solid rgba(160,160,160,0.8)',
                                        padding: 5,
                                        position: 'absolute',
                                        top: this.props.state.cbHoverValue.loc.y,
                                        left: this.props.state.cbHoverValue.loc.x,
                                    }}
                                >
                                    <a style={{ fontSize: 10 }}>
                                        {this.props.state.cbHoverValue.value}
                                    </a>
                                </div>
                            ) : null}

                            {this.props.state.rawData &&
                            this.props.state.rawData.data_risk ? (
                                <div
                                    style={{
//                                         position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}
                                >

                                        {Object.keys(
                                            this.props.state.rawData.risk_colors
                                        ).map((k, i) => (
                                            <div
                                                key={'riskColors' + k}
                                                onMouseEnter={(e) => {
                                                    this.props.handleChangeMulti({
                                                        cbHover: true,
                                                        cbHoverValue: {
                                                            value: this.props.state.rawData.risk_colors[k].toFixed(0).toString(),
                                                            loc: {x: e.pageX,y: e.pageY - 40,},
                                                        },
                                                    })
                                                }}
                                                onMouseLeave={(e) =>
                                                    this.props.handleChangeMulti({
                                                        cbHover: false,
                                                    })
                                                }
                                                style={{
                                                    backgroundColor: k,
                                                    border:
                                                        '1px solid rgba(160,160,160,0.5)',
                                                    flex:1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <a
                                                    style={{
                                                        color: 'rgba(0,0,0,0)',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {'0'}
                                                </a>
                                            </div>
                                        ))}

                                </div>
                            ) : null}
                            {this.props.state.rawData &&
                            this.props.state.rawData.data_risk ? (
                                <div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        position: 'relative',
                                    }}
                                >
                    
                                        {Object.keys(
                                            this.props.state.rawData.risk_colors
                                        ).map((k, i) => (
                                            <div
                                                key={this.props.state.rawData.risk_colors[
                                                    k
                                                ]
                                                    .toFixed(1)
                                                    .toString()}
                                                style={{
                                                    width: '2.5%',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <a style={{ fontSize: 10 }}>
                                                    {i % 4 === 0
                                                        ? this.props.state.rawData.risk_colors[
                                                              k
                                                          ].toFixed(1)
                                                        : null}
                                                </a>
                                            </div>
                                        ))}
                                </div>
                                <div>Risk Count</div>
                                </div>
                            ) : null}
                            
                            

                        </div>
                        
        
        )
    }
}

export default RealTimeMap;