import * as React from 'react';
import Map, { Marker, Source, Layer, Popup } from "react-map-gl";
const { token_fore, styles } = require('./config.json')
import { getLegend } from '../functions/legends.js';
import { _onMouseMove, _onClick, _onMove } from '../functions/mouseFunctions.js';

const mapStyle = { height: '50vh', borderRadius: 5 }


export default class ForecastMap extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (

            <div style={{ width: '100%' }}>
                {console.log('virrsobjnow', this.props.state.viirsObjnow)}
                {this.props.state.AODon &&
                    (this.props.state.AODclick36 || this.props.state.AODclick48J || this.props.state.AODclick48S) ?
                    <a style={{ color: "black", textAlign: 'left' }}>IDEA-NYS: {this.props.state.viirsTimeNow}    </a>
                    : null}
                {this.props.state.wrfChecked &&
                    (this.props.state.pmChecked || this.props.state.o3Checked) ?
                    <a style={{ color: "black", textAlign: 'left' }}>WRF CHEM: {this.props.state.wrfTimeNow}</a>
                    : null}

                <Map
                    ref={map => this.mapRef = map}
                    initialViewState={{
                        latitude: this.props.state.lat,
                        longitude: this.props.state.lng,
                        zoom: this.props.state.zoom
                    }}
                    style={mapStyle}
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                    mapboxAccessToken={token_fore}
                    onMouseMove={(e) => _onMouseMove(this.mapRef, e, this.props)}
                    onMove={(e) => _onMove(this.mapRef, e, this.props)}
                    onClick={(e) => _onClick(this.mapRef, e, this.props)}
                >

                    {this.props.state.wrfChecked && this.props.state.wrfObjnow &&
                        (this.props.state.pmChecked || this.props.state.o3Checked) ?
                        <Source id='wrfobj' type='geojson' data={this.props.state.wrfObjnow}>
                            <Layer {...{
                                type: 'fill',
                                paint: {
                                    'fill-color': ['get', 'fill'],
                                    'fill-opacity': ['get', 'fill-opacity'],
                                    'fill-outline-color': ['get', 'stroke'],
                                }
                            }} />
                        </Source>
                        : null}

                    {this.props.state.viirsObj != null && this.props.state.AODon &&
                        (this.props.state.AODclick48S || this.props.state.AODclick36 || this.props.state.AODclick48J) ? (
                        <Source id='viirsobj' type='geojson' data={this.props.state.viirsObjnow}>
                            <Layer {...{
                                type: 'circle',
                                paint: {
                                    'circle-color': ['get', 'color_pres'],
                                    'circle-radius': 2,
                                    'circle-stroke-color': 'grey',
                                    'circle-stroke-width': 1,
                                }
                            }} />

                        </Source>
                    ) : null}
                    {getLegend(this.props.state, this.state)}
                </Map>
            </div>
        )
    }
}