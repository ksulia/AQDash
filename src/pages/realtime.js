import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {state, years, months, hours, res} from '../state.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Sidebar from '../components/sidebar.js';
import fetchData from '../functions/fetchData.js';
import MyFirstGrid from '../components/gridlayout.js';
import RealTimeMap from '../components/map.js';
import {GoesPlot, AirnowPlot, LidarPlot} from '../components/graphs.js';
import {getAODCB, getCB} from '../functions/colorbars.js';
import {getRiskLegend, getAirnowLegend} from '../functions/legends.js';

export class RealTime extends React.Component {

    constructor(props) {
        console.log("realtime props", props)
        super(props)
        this.handleChange = props.handleChange//this.handleChange.bind(this);
    }

    getCompleteTime(){
        let i = months.indexOf(this.props.state.month) + 1,
                month_num,
                day_num
        if (i < 10) month_num = `0${i}`
        else month_num = `${i}`
        if (this.props.state.day < 10) day_num = `0${this.props.state.day}`
        else day_num = `${this.props.state.day}`

        this.handleChange({
            completeTime: `${this.props.state.year}-${month_num}-${day_num}T${this.props.state.hour}`,
            clicked: false,
        })
    }
    
    updateDimensions = () => {
        this.handleChange({ width: window.innerWidth, height: window.innerHeight })
    }


    
    
    componentDidMount() {
        this.getCompleteTime()
        if (this.props.state.completeTime && this.props.state.fetchData) {
            console.log('fetch1',this.props.state.fetchData)
            this.handleChange({fetchData:false});
            fetchData(this.props.state,this.handleChange);
            
        }
        window.addEventListener('load', this.updateDimensions)
    }
    

    componentDidUpdate(prevProps, prevState) {
        
                
        if (this.props.state.clicked) this.getCompleteTime()
        if (this.props.state.fetchData && this.props.state.completeTime) {
            this.handleChange({fetchData:false});
            fetchData(this.props.state,this.handleChange);
        }
        if(prevProps.state.rawData != this.props.state.rawData)
            console.log('rawData', this.props.state.rawData)

        window.addEventListener('resize', this.updateDimensions)
        if (prevProps.state.width != this.props.state.width)console.log('width/height', this.props.state.width, this.props.state.height)
        
                
        if(this.props.state.riskData && this.props.state.riskClick && this.props.state.GOESPlotOn && !this.props.state.plotsToDisplay.includes('goes'))
            this.handleChange({ plotsToDisplay: [...this.props.state.plotsToDisplay, 'goes'] })
        if(this.props.state.riskData && this.props.state.riskClick && this.props.state.airnowPlotOn&& !this.props.state.plotsToDisplay.includes('airnow'))
            this.handleChange({ plotsToDisplay: [...this.props.state.plotsToDisplay, 'airnow'] })
        if(this.props.state.chosenSite && !this.props.state.plotsToDisplay.includes('lidar'))
            this.handleChange({ plotsToDisplay: [...this.props.state.plotsToDisplay, 'lidar'] })
        
        if(!(this.props.state.riskData && this.props.state.riskClick && this.props.state.GOESPlotOn) && this.props.state.plotsToDisplay.includes('goes'))
            this.handleChange({plotsToDisplay: this.props.state.plotsToDisplay.filter(function(plot) { return plot !== 'goes' })});
        if(!(this.props.state.riskData && this.props.state.riskClick && this.props.state.airnowPlotOn) && this.props.state.plotsToDisplay.includes('airnow'))
            this.handleChange({plotsToDisplay: this.props.state.plotsToDisplay.filter(function(plot) { return plot !== 'airnow' })});
        if(!this.props.state.chosenSite && this.props.state.plotsToDisplay.includes('lidar'))
            this.handleChange({plotsToDisplay: this.props.state.plotsToDisplay.filter(function(plot) { return plot !== 'lidar' })});
        
//         console.log('plotsToDisplay',this.props.state.plotsToDisplay, this.props.state.riskData, this.props.state.riskClick, this.props.state.GOESPlotOn, this.props.state.airnowPlotOn,this.props.state.chosenSite)
        
        if(prevProps.state.plotsToDisplay != this.props.state.plotsToDisplay || prevProps.state.width != this.props.state.width || prevProps.state.height != this.props.state.height){

            let ar = this.props.state.width/this.props.state.height;
            let figs_per_row = Math.ceil(ar/1.4);
            let arrTempFull = [], arrTemp = [], j = 0;

            console.log("ar",ar)
            
            this.props.state.plotsToDisplay.map((e,i)=>{                
                if(j<figs_per_row){
                    j++;
                }else{
                    arrTempFull.push(arrTemp);
                    arrTemp = [], j = 0;
                }
                arrTemp.push(e);
                if(i==this.props.state.plotsToDisplay.length-1)arrTempFull.push(arrTemp);
            })
            this.handleChange({plotsToDisplayTemp:arrTempFull})
        }
    }
    
//     handleChange(name,value) {
// //         console.log("event",value,name)
//         this.handleChange({[name]:value,clicked:true});
//       }
    
//     handleChange (obj){
//         console.log("handleChangeple",obj)
//         this.handleChange(obj)
//         console.log("handleChange",this.props.state.riskHighlight)
//     }
    

        
    getPlots(){
        return(
            <Row id='graph-body' md={2} style={{marginTop:10, margin:20}}>
                <GoesPlot state={this.props.state}/>
                <AirnowPlot state={this.props.state}/>
                <LidarPlot state={this.props.state}/>
            </Row>
        )
        
        
    }
    
    getAirnowLegend(){
        return(
            <div style={{alignItems:'center',position:'absolute',right:20}}>
                <Row style={{}}>
                    <Col md={'auto'} style={{ backgroundColor: 'rgb(0,228,0)',borderRadius: 5, 
                                            lineHeight:'10px'}}>
                        <a style={{ fontSize: 10, }}>Good</a>
                    </Col>
                    <Col md={'auto'} style={{ backgroundColor: 'rgb(255,255,0)',borderRadius: 5,lineHeight:'10px'}}>
                        <a style={{ fontSize: 10,}}>Moderate</a>
                    </Col>
                    <Col md={'auto'} style={{backgroundColor:'rgb(255,126,0)',borderRadius: 5,lineHeight:'10px'}}>
                        <a style={{ fontSize: 10, color: 'white', padding:0}}>Unhealthy<br/>Sensitive<br/>Groups</a>
                    </Col>
                    <Col md={'auto'} style={{ backgroundColor: 'rgb(255,0,0)', borderRadius: 5,lineHeight:'10px'}}>
                        <a style={{ fontSize: 10, color: 'white'}}>Unhealthy</a>
                    </Col>
                    <Col md={'auto'} style={{ backgroundColor:'rgb(143,63,151)',borderRadius: 5,lineHeight:'10px'}}>
                        <a style={{ fontSize: 10, color: 'white', }}>Very<br/>Unhealthy</a>
                    </Col>
                    <Col md={'auto'} style={{ backgroundColor: 'rgb(126,0,35)', borderRadius: 5,lineHeight:'10px'}}>
                        <a style={{fontSize: 10,color: 'white',}}>Hazardous</a>
                    </Col>
                </Row>
            </div>
        )
    }
        
    
    

    render() {
        
        
        return (
            <div style={{justifyContent:'center',width:'100%',padding:0, maxWidth:'100%'}}>
            <Row id='main-body-flex' style={{width:'100%',height:undefined,justifyContent:'center'}}>
                <Col id='sidebar' style={{width:'100px',backgroundColor:'#461660',padding:10}}>
                    <Sidebar state={this.props.state} 
                            fetchData={fetchData} handleChange={this.handleChange}/>
                </Col>
                <Col id='body' xs={10} md={20} lg={30} style={{width:'100%',backgroundColor:'#F8F7F7', justifyContent:'center'}}>
                        
                            <Row id='map-body' style={{borderRadius:5, 
                                                      border:'1px solid rgba(0, 0, 0, 0.1)',
                                                      padding:20,backgroundColor:'white', margin: 20,
                                                      marginBottom: 10}}>
                                <RealTimeMap id='real-time-map' state={this.props.state} handleChange={this.handleChange}/>
                                    
                                {getRiskLegend(this.props.state)}
                                {getAirnowLegend(this.props.state)}
                                
                                {this.props.state.goesDataSmoke && this.props.state.smokeCB && this.props.state.GOESon ? 
                                   getCB( this.props.state.smokeCB, 'blue', 'Smoke' )
                               : null}

                               {this.props.state.GOESon && this.props.state.goesDataDust && this.props.state.dustCB ? 
                                    getCB( this.props.state.dustCB, 'red','Dust')
                                : null}


                            </Row>
                            {this.props.state.plotsToDisplay.length>0?
                                <Row id='graph-body' md={2} style={{marginTop:10, margin:20}}>
                                    <GoesPlot state={this.props.state}/>
                                    <AirnowPlot state={this.props.state}/>
                                    <LidarPlot state={this.props.state}/>
                                </Row>
                                
                            :null}
                                            

                </Col>
            </Row>
            </div>
            
        
        )
    }


}

export default RealTime