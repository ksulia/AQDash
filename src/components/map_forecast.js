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
import {getLegend} from '../functions/legends.js';
import {_onMouseMove,_onClick} from '../functions/mouseFunctions.js';


const Map = ReactMapboxGl({ accessToken: token_fore })
const mapStyle = {height: '50vh', borderRadius:5}


export default class ForecastMap extends React.Component {
    
    constructor(props) {
        super(props)
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
                    onMouseMove={(map,e)=>_onMouseMove(
                        map,e,this.props)}
                    onClick={(map,e)=>_onClick(
                        map,e,this.props)}
                >
                    {this.props.state.viirsObj != null && this.props.state.AODon ? (
                        <GeoJSONLayer
                            id={'viirsobj'}
                            key={'viirsobj'}
                            data={this.props.state.viirsObjnow}
                            circlePaint={{
                                'circle-color': ['get', 'color_pres'],
                                'circle-radius': 2,
                                'circle-stroke-color': 'grey',
                                'circle-stroke-width': 1,
                            }}
                        />
                    ) : null}
                    
                    {getLegend(this.props.state, this.state)}
                </Map>
            </div>
        )
    }
}