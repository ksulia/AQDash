import * as React from 'react';
import ReactMapboxGl, { 
    GeoJSONLayer,
    Marker,
    Image,
    Layer,
    Feature,
} from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';
import { Container, Row, Col } from 'react-bootstrap'
const { token_fore, styles } = require('./config.json')

const Map = ReactMapboxGl({ accessToken: token_fore })
const mapStyle = {height: '50vh', borderRadius:5}


export default class ForecastMap extends React.Component {
    
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
    }
    
    render(){
    
        return (

            <div style={{ width: '100%'}}>
                {console.log('virrsobjnow',this.props.state.viirsObjnow)}
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
                    {this.props.state.viirsObj != null && this.props.state.AODon ? (
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
                </Map>
            </div>
        )
    }
}