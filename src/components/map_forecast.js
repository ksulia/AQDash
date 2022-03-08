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
const { token, styles } = require('./config.json')

const Map = ReactMapboxGl({ accessToken: token })
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
                />
            </div>
        )
    }
}