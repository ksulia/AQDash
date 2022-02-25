import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {state, years, months, hours, res} from '../state.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Sidebar from '../components/sidebar.js'

export class RealTime extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = state
    }
    
    async fetchData() {
        this.setState({
            fetching: 'Fetching data, please wait...',
            airnowData: null,
            goesData: null,
            goesDataDust: null,
            goesDataSmoke: null,
            dustDB: null,
            smokeCB: null,
            viirsData36: null,
            viirsData48J: null,
            viirsData48S: null,
            aodCB36: null,
            aodCB48J: null,
            aodCB48S: null,
            riskHighlight: false,
            riskData: false,
            rawData: false,
        })

        let smokeCB = {},
            dustCB = {},
            aodCB1 = {},
            aodCB2 = {},
            aodCB3 = {}

        await fetch(
            `http://169.226.68.133:3005?time=${this.state.completeTime}&res=${this.state.res}`
        )
            .then(async (response) => await response.json())
            .then(
                async (responseJson) =>
                    await this.setState({ rawData: responseJson })
            )
            .then(async () => {
                console.log('here', this.state.rawData)

                if (this.state.rawData && this.state.rawData.status === 0) {
                    console.log('here1')
                    Object.keys(this.state.rawData.data).map((k) => {
                        console.log('hhere2', k)
                        if (k.includes('airnow')) {
                            console.log('airnow', k, this.state.rawData.data[k])
                            this.setState({
                                airnowData: this.state.rawData.data[k],
                            })
                        } else if (k.includes('GOES')) {
                            if (this.state.rawData.data[k].smoke) {
                                this.state.rawData.data[k].smoke.features.map(
                                    (s) => {
                                        smokeCB[s.properties.color] =
                                            s.properties.start
                                    }
                                )
                            }
                            if (this.state.rawData.data[k].dust) {
                                this.state.rawData.data[k].dust.features.map(
                                    (s) => {
                                        dustCB[s.properties.color] =
                                            s.properties.start
                                    }
                                )
                            }
                            this.setState({
                                goesDataSmoke: this.state.rawData.data[k].smoke,
                                goesDataDust: this.state.rawData.data[k].dust,
                                smokeCB: smokeCB,
                                dustCB: dustCB,
                            })
                            console.log('GOES', k, this.state.rawData.data[k])
                        } else if (k.includes('VIIRSaerosolEntHRS')) {
                            let minaod = this.state.rawData.data[k].features[0]
                                .properties.minaod
                            let maxaod = this.state.rawData.data[k].features[0]
                                .properties.maxaod
                            let cbcolors = this.state.rawData.data[k]
                                .features[0].properties.cb
                            let val = (maxaod - minaod) / cbcolors.length
                            cbcolors.forEach((c, i) => {
                                aodCB1[c] = (minaod + val * i).toFixed(2)
                            })
                            this.setState({
                                viirsData36: this.state.rawData.data[k],
                                aodCB36: aodCB1,
                            })
                            console.log('VIIRS', k, this.state.rawData.data[k])
                        } else if (k.includes('VIIRSaerosolJ')) {
                            let minaod = this.state.rawData.data[k].features[0]
                                .properties.minaod
                            let maxaod = this.state.rawData.data[k].features[0]
                                .properties.maxaod
                            let cbcolors = this.state.rawData.data[k]
                                .features[0].properties.cb
                            let val = (maxaod - minaod) / cbcolors.length
                            cbcolors.forEach((c, i) => {
                                aodCB2[c] = (minaod + val * i).toFixed(2)
                            })
                            this.setState({
                                viirsData48J: this.state.rawData.data[k],
                                aodCB48J: aodCB2,
                            })
                            console.log('VIIRS', k, this.state.rawData.data[k])
                        } else if (k.includes('VIIRSaerosolS')) {
                            let minaod = this.state.rawData.data[k].features[0]
                                .properties.minaod
                            let maxaod = this.state.rawData.data[k].features[0]
                                .properties.maxaod
                            let cbcolors = this.state.rawData.data[k]
                                .features[0].properties.cb
                            let val = (maxaod - minaod) / cbcolors.length
                            cbcolors.forEach((c, i) => {
                                aodCB3[c] = (minaod + val * i).toFixed(2)
                            })
                            this.setState({
                                viirsData48S: this.state.rawData.data[k],
                                aodCB48S: aodCB3,
                            })
                            console.log('VIIRS', k, this.state.rawData.data[k])
                        }
                    })
                    if (this.state.rawData.lidar) {
                        let features = []
                        Object.entries(this.state.rawData.lidar).map((e) => {
                            features.push({
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [e[1].LON, e[1].LAT],
                                },
                                properties: {
                                    site: e[0],
                                },
                            })
                        })
                        let mesonet_sites = {
                            type: 'FeatureCollection',
                            features: features,
                        }
                        this.setState({
                            lidarData: this.state.rawData.lidar,
                            lidarSites: mesonet_sites,
                        })
                    }
                    this.setState({ fetching: 'Fetch successful!' })
                } else {
                    this.setState({
                        rawData: null,
                        fetching: 'Error fetching data.',
                    })
                }
            })
            .catch((e) => console.log(e))

    }
    

    
    handleChange(event,name) {
        console.log("event",event,name)
        this.setState({[name]:event.value,clicked:true});
      }
    

    render() {
        return (
            
            <div id='main-body-flex' style={{display:'flex',flexDirection:'row',margin:0, height:'100vh'}}>
                {console.log('state',this.state.width)}
                <Sidebar state={this.state} handleChange={this.handleChange} fetchData={this.fetchData}/>
                


                <div id='body' style={{backgroundColor:'#F8F7F7',width:'100%'}}></div>
            </div>
            
        
        )
    }


}

export default RealTime