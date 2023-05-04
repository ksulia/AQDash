import * as React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Sidebar from '../components/sidebar.js';
import fetchData from '../functions/fetchData.js';
import ForecastMap from '../components/map_forecast.js';
import { getRiskLegend, getAODCB } from '../functions/legends.js'
import { o3_colors, pm_colors, aodNumbers, pmNumbers, o3Numbers } from '../functions/colorMaps.js'

// import Colorbar from "react-colors";

export class Forecast extends React.Component {

    constructor(props) {
        console.log("forecast props", props)
        super(props)
        this.handleChange = props.handleChange//this.handleChange.bind(this);
    }

    //this is a recursive function. the recursion stops if a user selection has changed
    createAnimation(i, hires, loJ, loS, o3, pm) {

        let keys = [], wrfkeys = [];
        if (this.props.state.viirsObj) keys = Object.keys(this.props.state.viirsObj)//with space
        if (this.props.state.wrfChem) wrfkeys = Object.keys(this.props.state.wrfChem)//with T
        let arr = keys.concat(wrfkeys)

        let all_keys = {}
        for (let j in arr) { //loop through array that contains all keys for both viirs and wrf
            j = arr[j]
            let j_temp = j
            if (j.includes("T")) j_temp = j.split("T")[0] + " " + j.split("T")[1]
            if (!(j_temp in all_keys)) all_keys[j_temp] = { 'viirs': null, 'wrf': null }
            if (j.includes("T")) all_keys[j_temp]['wrf'] = j
            else all_keys[j_temp]['viirs'] = j
        }

        // console.log('all_keys', all_keys)
        let key_arr = []
        Object.keys(all_keys).sort().map(k => {
            key_arr.push(all_keys[k])
        })
        console.log('key_arr', key_arr)
        let iwrf = 1000, iviirs = 1000;

        if (this.props.state.AODon &&
            (this.props.state.AODclick36 ||
                this.props.state.AODclick48J ||
                this.props.state.AODclick48S)) {
            for (let k = 0; k < key_arr.length; k++) {
                if (key_arr[k]['viirs']) {
                    iviirs = k
                    break
                }
            }
        }

        if (this.props.state.wrfChecked &&
            (this.props.state.o3Checked || this.props.state.pmChecked)) {
            for (let k = 0; k < key_arr.length; k++) {
                if (key_arr[k]['wrf']) {
                    iwrf = k
                    break
                }
            }
        }

        i = Math.min(iviirs, iwrf)
        this.animate(i, key_arr, hires, loJ, loS, o3, pm)

    }



    animate(i, key_arr, hires, loJ, loS, o3, pm) {
        let k = key_arr[i];
        //loop through all times as long as the usr doesnt change selected boxes

        console.log("animate", this.props.state.AODclick36, hires,
            this.props.state.AODclick48J, loJ,
            this.props.state.AODclick48S, loS,
            this.props.state.pmChecked, pm,
            this.props.state.o3Checked, o3)

        if (this.props.state.AODclick36 == hires &&
            this.props.state.AODclick48J == loJ &&
            this.props.state.AODclick48S == loS &&
            this.props.state.pmChecked == pm &&
            this.props.state.o3Checked == o3) {
            if (i < key_arr.length) {
                setTimeout(() => {
                    console.log('1', k, i, this.props.state.viirsObj)

                    ///VIIRS///////////////
                    if (k['viirs'] && this.props.state.AODon) {
                        let curr_features;
                        if (i == 0 || this.props.state.viirsObjnow == null) curr_features = []
                        else curr_features = this.props.state.viirsObjnow.features
                        let new_features = []
                        this.props.state.viirsObj[k['viirs']].features.forEach((f) => {
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
                            }, viirsTimeNow: k['viirs'],
                        })

                    }
                    ///WRF///////////////
                    if (k['wrf'] && this.props.state.wrfChecked) {
                        if (this.props.state.o3Checked) {
                            this.handleChange({
                                wrfObjnow: this.props.state.wrfChem[k['wrf']]['o3'], wrfTimeNow: k['wrf'].split('T')[0] + " " + k['wrf'].split('T')[1],
                            })
                        }
                        if (this.props.state.pmChecked) {
                            this.handleChange({
                                wrfObjnow: this.props.state.wrfChem[k['wrf']]['pm2.5'], wrfTimeNow: k['wrf'].split('T')[0] + " " + k['wrf'].split('T')[1],
                            })
                        }
                    } else {
                        this.handleChange({
                            wrfObjnow: null, wrfTimeNow: 'N/A',
                        })
                    }

                    i++;
                    if (i == key_arr.length) i = 0;
                    this.animate(i, key_arr, hires, loJ, loS, o3, pm);
                }, 1000);
            }
        }
    }


    componentDidUpdate(prevProps, prevState) {
        console.log('did update forecast', this.props.state.viirsObjnow, this.props.state.wrfChem)
        console.log('color', this.props.state.aodCB36)

        //first check to make sure that there is viirs data, that the layer is on, 
        //and one of the viirs options are chosen
        if ((this.props.state.viirsObj && this.props.state.AODon &&
            (this.props.state.AODclick36 || this.props.state.AODclick48J || this.props.state.AODclick48S)) ||
            (this.props.state.wrfChem && this.props.state.wrfChecked &&
                (this.props.state.o3Checked || this.props.state.pmChecked))) {
            //now check to see if the dataset has changed at all, or if the user has checked/unchecked a box
            if (
                (this.props.state.viirsObj != prevProps.state.viirsObj) ||
                (this.props.state.AODclick36 != prevProps.state.AODclick36) ||
                (this.props.state.AODclick48J != prevProps.state.AODclick48J) ||
                (this.props.state.AODclick48S != prevProps.state.AODclick48S) ||
                (this.props.state.wrfChem != prevProps.state.wrfChem) ||
                (this.props.state.o3Checked != prevProps.state.o3Checked) ||
                (this.props.state.pmChecked != prevProps.state.pmChecked)
            ) {
                //reset the trajectory feature collection to empty
                this.handleChange({ viirsObjnow: null, viirsTimeNow: '', wrfObjnow: null, wrfTimeNow: '' })
                //now fill up the feature collection
                this.createAnimation(0, this.props.state.AODclick36,
                    this.props.state.AODclick48J, this.props.state.AODclick48S, this.props.state.o3Checked, this.props.state.pmChecked) //check why passing through state variables 

            }
        }


        // if (this.props.state.wrfChem && this.props.state.wrfChecked &&
        //     (this.props.state.o3Checked || this.props.state.pmChecked)) {

        //     if ((this.props.state.wrfChem != prevProps.state.wrfChem) ||
        //         (this.props.state.o3Checked != prevProps.state.o3Checked) ||
        //         (this.props.state.pmChecked != prevProps.state.pmChecked)
        //     ) {

        //         //reset the trajectory feature collection to empty
        //         this.handleChange({ viirsObjnow: { type: 'FeatureCollection', features: [] }, viirsTimeNow: '', wrfObjnow: { type: 'FeatureCollection', features: [] }, wrfTimeNow: '' })
        //         //now fill up the feature collection
        //         this.createAnimation(0, this.props.state.AODclick36,
        //             this.props.state.AODclick48J, this.props.state.AODclick48S, this.props.state.o3Checked, this.props.state.pmChecked)
        //     }



        // }

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
                                <Row style={{ width: '100%', justifyContent: 'center' }}>
                                    {this.props.state.wrfChecked ?
                                        this.props.state.o3Checked ?
                                            getAODCB(o3_colors, 'O3 (ppmv)', o3Numbers)
                                            : this.props.state.pmChecked ?
                                                getAODCB(pm_colors, 'PM2.5 (μg m⁻³)', pmNumbers) : null
                                        : null}
                                </Row>
                                <Row style={{ width: '100%', justifyContent: 'center', paddingBottom: 10 }}>
                                    {this.props.state.AODon && this.props.state.aodCB36 &&
                                        this.props.state.AODclick36 ?
                                        getAODCB(this.props.state.aodCB36, 'Hi-Res Surface Minus Trajectory Pressure (mb)', aodNumbers)
                                        : null}
                                </Row>
                                <Row style={{ width: '100%', justifyContent: 'center', paddingBottom: 10 }}>
                                    {this.props.state.AODon && this.props.state.aodCB48J &&
                                        this.props.state.AODclick48J ?
                                        getAODCB(this.props.state.aodCB48J, 'JPSS Surface Minus Trajectory Pressure (mb)', aodNumbers)
                                        : null}
                                </Row>
                                <Row style={{ width: '100%', justifyContent: 'center' }}>
                                    {this.props.state.AODon && this.props.state.aodCB48S &&
                                        this.props.state.AODclick48S ?
                                        getAODCB(this.props.state.aodCB48S, 'SNPP Surface Minus Trajectory Pressure (mb)', aodNumbers)
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