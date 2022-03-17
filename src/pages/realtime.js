import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {state, years, months, hours, res} from '../state.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Sidebar from '../components/sidebar.js';
import fetchData from '../functions/fetchData.js';
import RealTimeMap from '../components/map.js';
import {GoesPlot, AirnowPlot, AirnowPlot24hr, LidarPlotSca, LidarPlotCnr} from '../components/graphs.js';
import {getCB} from '../functions/colorbars.js';
import {getRiskLegend, getAirnowLegend} from '../functions/legends.js';
import dustCB from '../images/dust_colorbar.png';
import smokeCB from '../images/smoke_colorbar.png';
import aodCB from '../images/aod_colorbar.png';


export class RealTime extends React.Component {

    constructor(props) {
        console.log("realtime props", props)
        super(props)
        this.handleChange = props.handleChange//this.handleChange.bind(this);
    }


    

    componentDidUpdate(prevProps, prevState) {
        
                
        if(this.props.state.riskData && this.props.state.riskClick && 
           this.props.state.GOESPlotOn && !this.props.state.plotsToDisplay.includes('goes'))
            this.handleChange({ plotsToDisplay: [...this.props.state.plotsToDisplay, 'goes'] })
        if(this.props.state.riskData && this.props.state.riskClick && 
           this.props.state.airnowPlotOn&& !this.props.state.plotsToDisplay.includes('airnow'))
            this.handleChange({ plotsToDisplay: [...this.props.state.plotsToDisplay, 'airnow'] })
        if(this.props.state.Airnowon&&this.props.state.airnow24hr && !this.props.state.plotsToDisplay.includes('airnow24hr'))
            this.handleChange({ plotsToDisplay: [...this.props.state.plotsToDisplay, 'airnow24hr'] })
        if(this.props.state.chosenSite && !this.props.state.plotsToDisplay.includes('lidar'))
            this.handleChange({ plotsToDisplay: [...this.props.state.plotsToDisplay, 'lidar'] })
        
        if(!(this.props.state.riskData && this.props.state.riskClick && 
             this.props.state.GOESPlotOn) && this.props.state.plotsToDisplay.includes('goes'))
            this.handleChange({plotsToDisplay: this.props.state.plotsToDisplay.filter(function(plot) { return plot !== 'goes' })});
        if(!(this.props.state.riskData && this.props.state.riskClick && 
             this.props.state.airnowPlotOn) && this.props.state.plotsToDisplay.includes('airnow'))
            this.handleChange({plotsToDisplay: this.props.state.plotsToDisplay.filter(function(plot) { return plot !== 'airnow' })});
        if(!(this.props.state.Airnowon&&this.props.state.airnow24hr) &&
           this.props.state.plotsToDisplay.includes('airnow24hr'))
            this.handleChange({plotsToDisplay: this.props.state.plotsToDisplay.filter(function(plot) { return plot !== 'airnow24hr' })});
        if(!this.props.state.chosenSite && this.props.state.plotsToDisplay.includes('lidar'))
            this.handleChange({plotsToDisplay: this.props.state.plotsToDisplay.filter(function(plot) { return plot !== 'lidar' })});
        
        console.log('plotstodisplay', this.props.state.plotsToDisplay)
        
        
    }
        
    
    

    render() {
        
        
        return (
            <div style={{justifyContent:'center',width:'100%',padding:0, maxWidth:'100%'}}>
            <Row id='main-body-flex' style={{width:'100%',height:undefined,justifyContent:'center'}}>
                <Col id='sidebar' style={{width:'100px',backgroundColor:'#461660',padding:10}}>
                    <Sidebar state={this.props.state} fetchData={fetchData} handleChange={this.handleChange}
                             realtime={true}/>
                </Col>
                <Col id='body' xs={10} md={20} lg={30} style={{width:'100%',backgroundColor:'#F8F7F7', justifyContent:'center'}}>
                        
                            <Row id='map-body' style={{borderRadius:5, 
                                                      border:'1px solid rgba(0, 0, 0, 0.1)',
                                                      padding:20,backgroundColor:'white', margin: 20,
                                                      marginBottom: 10}}>
                                <RealTimeMap id='real-time-map' state={this.props.state} handleChange={this.handleChange}/>
                                    
                                {getRiskLegend(this.props.state, this.handleChange)}
                                {getAirnowLegend(this.props.state)}
                                <Col style={{position:'absolute', right:0}}>
                                    <Row><img src={dustCB} style={{left:0, width:'75px'}}/></Row>
                                    <Row><img src={smokeCB} style={{left:0, width:'75px'}}/></Row>
                                    <Row><img src={aodCB} style={{left:0, width:'35px'}}/></Row>
                                </Col>

                            </Row>
                            {this.props.state.plotsToDisplay.length>0?
                                <Row id='graph-body' md={2} style={{marginTop:10, margin:20}}>
                                    <GoesPlot state={this.props.state}/>
                                    <AirnowPlot24hr state={this.props.state}/>
                                    <LidarPlotSca state={this.props.state}/>
                                    <LidarPlotCnr state={this.props.state}/>
                                </Row>
                                
                            :null}
                                            

                </Col>
            </Row>
            </div>
            
        
        )
    }


}

export default RealTime