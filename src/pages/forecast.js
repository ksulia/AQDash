import * as React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Sidebar from '../components/sidebar.js';
import fetchData from '../functions/fetchData.js';
import ForecastMap from '../components/map_forecast.js';
import {getAODCB} from '../functions/legends.js'

export class Forecast extends React.Component {

    constructor(props) {
        console.log("forecast props", props)
        super(props)
        this.handleChange = props.handleChange//this.handleChange.bind(this);
    }



    componentDidUpdate(prevProps, prevState) {
        console.log('did update forecast',this.props.state.viirsObj)
                
        if (this.props.state.viirsObj) {
            if ((this.props.state.viirsObj != prevProps.state.viirsObj || this.props.state.AODclick36) &&
                this.props.state.AODon) {
                this.handleChange({ AODclick36: false })
                let keys = Object.keys(this.props.state.viirsObj)
                let first_key = keys[0]
                let last_key = keys[keys.length - 1]
                keys.map((k, i) => {
                    var timeout1 = setTimeout(() => {
                        if (this.props.state.AODon && this.props.state.viirsObj && this.props.state.viirsObj[k]) {
                            console.log('1',k,i,this.props.state.viirsObj,this.props.state.viirsObj[k])

                            let curr_features = this.props.state.viirsObjnow.features
                            if (k === first_key) curr_features = []
                            let new_features = this.props.state.viirsObj[k].features
                            let updated_features = curr_features.concat(new_features)
                            this.handleChange({viirsObjnow: {
                                type: 'FeatureCollection',
                                features: updated_features,
                            },viirsTimeNow: k,})
                            if (k === last_key) this.handleChange({ AODclick36: true })
                        } else clearTimeout(timeout1)
                    }, 1000 * i)
                })
            }
        }
        
    }
        
    
    

    render() {
        
        
        return (
            <div style={{justifyContent:'center',width:'100%',maxWidth:'100%'}}>
            <Row id='main-body-flex' style={{width:'100%',height:undefined,justifyContent:'center'}}>
                <Col id='sidebar' style={{width:'100px',backgroundColor:'#EEB211',padding:10,paddingLeft:'20px'}}>
                    <Sidebar state={this.props.state} fetchData={fetchData} handleChange={this.handleChange} realtime={false}/>
                </Col>
                <Col id='body' xs={10} md={20} lg={30} style={{width:'100%',backgroundColor:'#F8F7F7', justifyContent:'center'}}>
                        
                            <Row id='map-body' style={{borderRadius:5, 
                                                      border:'1px solid rgba(0, 0, 0, 0.1)',
                                                      padding:20,backgroundColor:'white', margin: 20,
                                                      marginBottom: 10}}>
                                <ForecastMap id='forecast-map' state={this.props.state} handleChange={this.handleChange}/>
                                <Col style={{width:'100%',justifyContent:'center'}}>
                                {this.props.state.aodCB36 && this.props.state.AODon ? getAODCB(this.props.state.aodCB36,'Hi-Res Trajectory Pressure (mb)'): null}
                                {this.props.state.aodCB48J && this.props.state.AODon ? getAODCB(this.props.state.aodCB48J,'JPSS Trajectory Pressure (mb)'): null}
                                {this.props.state.aodCB48S && this.props.state.AODon ? getAODCB(this.props.state.aodCB48S,'SNPP Trajectory Pressure (mb)'): null}
                                </Col>
                            </Row>
                                            

                </Col>
            </Row>
            </div>
            
        
        )
    }





}

export default Forecast