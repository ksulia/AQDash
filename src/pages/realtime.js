import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {state, years, months, hours, res} from '../state.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Sidebar from '../components/sidebar.js';
import fetchData from '../functions/fetchData.js';
import MyFirstGrid from '../components/gridlayout.js';
import RealTimeMap from '../components/map.js';
import {GoesPlot, AirnowPlot, LidarPlot} from '../components/graphs.js';

export class RealTime extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMulti = this.handleChangeMulti.bind(this);
        this.state = state
    }

    getCompleteTime(){
        let i = months.indexOf(this.state.month) + 1,
                month_num,
                day_num
        if (i < 10) month_num = `0${i}`
        else month_num = `${i}`
        if (this.state.day < 10) day_num = `0${this.state.day}`
        else day_num = `${this.state.day}`

        this.setState({
            completeTime: `${this.state.year}-${month_num}-${day_num}T${this.state.hour}`,
            clicked: false,
        })
    }
    
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }


    
    
    componentDidMount() {
        this.getCompleteTime()
        if (this.state.completeTime && this.state.fetchData) {
            console.log('fetch1',this.state.fetchData)
            this.setState({fetchData:false});
            fetchData(this.state,this.handleChange);
            
        }
        window.addEventListener('load', this.updateDimensions)
    }
    

    componentDidUpdate(prevProps, prevState) {
        if (this.state.clicked) this.getCompleteTime()
        if (this.state.fetchData && this.state.completeTime) {
            this.setState({fetchData:false});
            fetchData(this.state,this.handleChange);
        }
        if(prevState.rawData != this.state.rawData)
            console.log('rawData', this.state.rawData)

        window.addEventListener('resize', this.updateDimensions)
        if (prevState.width != this.state.width)console.log('width/height', this.state.width, this.state.height)
        
                
        if(this.state.riskData && this.state.riskClick && this.state.GOESPlotOn && !this.state.plotsToDisplay.includes('goes'))
            this.setState({ plotsToDisplay: [...this.state.plotsToDisplay, 'goes'] })
        if(this.state.riskData && this.state.riskClick && this.state.airnowPlotOn&& !this.state.plotsToDisplay.includes('airnow'))
            this.setState({ plotsToDisplay: [...this.state.plotsToDisplay, 'airnow'] })
        if(this.state.chosenSite && !this.state.plotsToDisplay.includes('lidar'))
            this.setState({ plotsToDisplay: [...this.state.plotsToDisplay, 'lidar'] })
        
        if(!(this.state.riskData && this.state.riskClick && this.state.GOESPlotOn) && this.state.plotsToDisplay.includes('goes'))
            this.setState({plotsToDisplay: this.state.plotsToDisplay.filter(function(plot) { return plot !== 'goes' })});
        if(!(this.state.riskData && this.state.riskClick && this.state.airnowPlotOn) && this.state.plotsToDisplay.includes('airnow'))
            this.setState({plotsToDisplay: this.state.plotsToDisplay.filter(function(plot) { return plot !== 'airnow' })});
        if(!this.state.chosenSite && this.state.plotsToDisplay.includes('lidar'))
            this.setState({plotsToDisplay: this.state.plotsToDisplay.filter(function(plot) { return plot !== 'lidar' })});

        console.log("plotsToDisplay", this.state.plotsToDisplay,this.state.plotsToDisplay.includes('airnow'))
    }
    
    handleChange(name,value) {
//         console.log("event",value,name)
        this.setState({[name]:value,clicked:true});
      }
    
    handleChangeMulti (obj){
        console.log("handleChangeMultiple",obj)
        this.setState(obj)
        console.log("handleChange",this.state.riskHighlight)
    }
    
//     handleChange(event,name) {
//         console.log("event",event,name)
//         this.setState({[name]:event.value,clicked:true});
//       }

    getPlot(p){
        switch (p){
            case 'goes': return <GoesPlot state={this.state}/>
            case 'airnow': return <AirnowPlot state={this.state}/>
            case 'lidar': return <LidarPlot state={this.state}/>
        }
   
    }
    

    render() {
        
        
        return (
            
            <div id='main-body-flex' style={{display:'flex',flexDirection:'row',margin:0, height:undefined,justifyContent:'center'}}>
                <Sidebar state={this.state} handleChange={this.handleChange} fetchData={fetchData} handleChangeMulti={this.handleChangeMulti}/>

                <div id='body' style={{flex:10,backgroundColor:'#F8F7F7', justifyContent:'center'}}>
                    <div id='map-and-graphs' style={{display:'flex',flexDirection:'column',
                                justifyContent:'center'}}>
                        <div id='map-body' style={{flex:1, borderRadius:5, 
                                                  border:'1px solid rgba(0, 0, 0, 0.1)',
                                                  padding:20,backgroundColor:'white', margin: 20,
                                                  marginBottom: 10}}>
                            <RealTimeMap id='real-time-map' state={this.state} handleChangeMulti={this.handleChangeMulti}/>
                        </div>
                        <div id='graph-body' style={{flex:1}}>
                            <div id='graph-body-flex-column' style={{display:'flex', flexDirection:'column'}}>
                                
                                    {Array.from(Array(this.state.plotsToDisplay.length), (e, i) => 
                                        <div key={"column" + i} id={"column" + i} style={{flex:1}}>
                                            <div key={"row div" + i} id={"row div" + i} style={{display:'flex', flexDirection:'row'}}>
                                                {console.log("here?", this.state.plotsToDisplay, 
                                                 this.state.width/this.state.height,e,i)}
                                                 {this.state.plotsToDisplay.map((p,j)=>
                                                     this.getPlot(p)
                                                 
                                                 )}
                                                    
                                                
                                            </div>
                                        </div>
                                        
                                        )
                                    }
                                    
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        
        )
    }


}

export default RealTime