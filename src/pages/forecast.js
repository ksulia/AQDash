import * as React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Sidebar from '../components/sidebar.js';
import fetchData from '../functions/fetchData.js';
import ForecastMap from '../components/map_forecast.js';
import { getRiskLegend, getAODCB } from '../functions/legends.js'

export class Forecast extends React.Component {

    constructor(props) {
        console.log("forecast props", props)
        super(props)
        this.handleChange = props.handleChange//this.handleChange.bind(this);
    }

    //this is a recursive function. the recursion stops if a user selection has changed
    createViirsTraj(i, hires, loJ, loS) {
        let keys = Object.keys(this.props.state.viirsObj)
        let k = keys[i];
        console.log('KEY', i, k, k.split(" ")[0] + "T" + k.split(" ")[1], this.props.state.wrfChem[k.split(" ")[0] + "T" + k.split(" ")[1]])
        //loop through all times as long as the usr doesnt change selected boxes
        if (i < keys.length && this.props.state.AODon && this.props.state.AODclick36 == hires &&
            this.props.state.AODclick48J == loJ && this.props.state.AODclick48S == loS) {
            setTimeout(() => {
                console.log('1', k, i, this.props.state.viirsObj, this.props.state.viirsObj[k],
                    this.props.state.AODclick48S)


                let curr_features = this.props.state.viirsObjnow.features
                if (i == 0) curr_features = []
                let new_features = []
                this.props.state.viirsObj[k].features.forEach((f) => {
                    //                    console.log('feature',f.properties.key)
                    if (f.properties.key.includes('aerosolEnt') && hires) new_features.push(f)
                    else if (f.properties.key.includes('aerosolJ') && loJ) new_features.push(f)
                    else if (f.properties.key.includes('aerosolS') && loS) new_features.push(f)
                })
                let updated_features = curr_features.concat(new_features)
                this.handleChange({
                    viirsObjnow: {
                        type: 'FeatureCollection',
                        features: updated_features,
                    }, viirsTimeNow: k,
                })
                i++;
                if (i == keys.length) i = 0;
                this.createViirsTraj(i, hires, loJ, loS);
            }, 1000);
        }
    }


    componentDidUpdate(prevProps, prevState) {
        console.log('did update forecast', this.props.state.viirsObjnow, this.props.state.wrfChem)

        //first check to make sure that there is viirs data, that the layer is on, 
        //and one of the viirs options are chosen
        if (this.props.state.viirsObj && this.props.state.AODon &&
            (this.props.state.AODclick36 || this.props.state.AODclick48J || this.props.state.AODclick48S)) {
            //now check to see if the dataset has changed at all, or if the user has checked/unchecked a box
            if ((this.props.state.viirsObj != prevProps.state.viirsObj) ||
                (this.props.state.AODclick36 != prevProps.state.AODclick36) ||
                (this.props.state.AODclick48J != prevProps.state.AODclick48J) ||
                (this.props.state.AODclick48S != prevProps.state.AODclick48S)
            ) {
                //reset the trajectory feature collection to empty
                this.handleChange({ viirsObjnow: { type: 'FeatureCollection', features: [] }, viirsTimeNow: '' })
                //now fill up the feature collection
                this.createViirsTraj(0, this.props.state.AODclick36,
                    this.props.state.AODclick48J, this.props.state.AODclick48S)

            }
        }

        // if (this.props.state.wrfChem && this.state.props.wrf)

    }




    render() {


        return (
            <div style={{ justifyContent: 'center', width: '100%', maxWidth: '100%' }}>
                <Row id='main-body-flex' style={{ width: '100%', height: undefined, justifyContent: 'center' }}>
                    <Col id='sidebar' style={{ width: '100px', backgroundColor: '#EEB211', padding: 10, paddingLeft: '20px' }}>
                        <Sidebar state={this.props.state} fetchData={fetchData} handleChange={this.handleChange} realtime={false} />
                    </Col>
                    <Col id='body' xs={10} md={20} lg={30} style={{ width: '100%', backgroundColor: '#F8F7F7', justifyContent: 'center' }}>

                        <Row id='map-body' style={{
                            borderRadius: 5,
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            padding: 20, backgroundColor: 'white', margin: 20,
                            marginBottom: 10
                        }}>
                            <ForecastMap id='forecast-map' state={this.props.state} handleChange={this.handleChange} />

                            {getRiskLegend(this.props.state, this.handleChange)}


                            <Col style={{ width: '100%', justifyContent: 'center' }}>
                                <Row style={{ width: '100%', justifyContent: 'center', paddingBottom: 10 }}>
                                    {this.props.state.AODon && this.props.state.aodCB36 &&
                                        this.props.state.AODclick36 ?
                                        getAODCB(this.props.state.aodCB36, 'Hi-Res Surface Minus Trajectory Pressure (mb)')
                                        : null}
                                </Row>
                                <Row style={{ width: '100%', justifyContent: 'center', paddingBottom: 10 }}>
                                    {this.props.state.AODon && this.props.state.aodCB48J &&
                                        this.props.state.AODclick48J ?
                                        getAODCB(this.props.state.aodCB48J, 'JPSS Surface Minus Trajectory Pressure (mb)')
                                        : null}
                                </Row>
                                <Row style={{ width: '100%', justifyContent: 'center' }}>
                                    {this.props.state.AODon && this.props.state.aodCB48S &&
                                        this.props.state.AODclick48S ?
                                        getAODCB(this.props.state.aodCB48S, 'SNPP Surface Minus Trajectory Pressure (mb)')
                                        : null}
                                </Row>
                            </Col>
                        </Row>


                    </Col>
                </Row>
            </div>


        )
    }





}

export default Forecast