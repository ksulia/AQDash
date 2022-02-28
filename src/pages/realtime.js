import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {state, years, months, hours, res} from '../state.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Sidebar from '../components/sidebar.js';
import fetchData from '../functions/fetchData.js';
import MyFirstGrid from '../components/gridlayout.js';
import RealTimeMap from '../components/map.js';

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

    
    
    componentDidMount() {
        this.getCompleteTime()
        if (this.state.completeTime && this.state.fetchData) {
            console.log('fetch1',this.state.fetchData)
            this.setState({fetchData:false});
            fetchData(this.state,this.handleChange);
            
        }
    }
    

    componentDidUpdate(prevProps, prevState) {
        if (this.state.clicked) this.getCompleteTime()
        if (this.state.fetchData && this.state.completeTime) {
            this.setState({fetchData:false});
            fetchData(this.state,this.handleChange);
        }
        if(prevState.rawData != this.state.rawData)
            console.log('rawData', this.state.rawData)



//         if (
//             prevState.riskClick !== this.state.riskClick ||
//             (this.state.vizSize.width !==
//                 document.getElementById('vizDiv').clientWidth &&
//                 this.state.vizReady)
//         ) {
//             console.log(
//                 'viz',
//                 document.getElementById('vizDiv').clientHeight,
//                 document.getElementById('vizDiv').clientWidth
//             )
//             this.setState({
//                 vizSize: {
//                     ...this.state.vizSize,
//                     width: document.getElementById('vizDiv').clientWidth,
//                     height: document.getElementById('vizDiv').clientHeight,
//                 },
//                 vizReady: true,
//             })
//         }

//         if (
//             document.getElementById('lidarComp') &&
//             prevState.lidarWidth !==
//                 document.getElementById('lidarComp').clientWidth
//         ) {
//             this.setState({
//                 lidarWidth: document.getElementById('lidarComp').clientWidth,
//             })
//         }

//         if (
//             prevState.aodCB36 != this.state.aodCB36 ||
//             prevState.aodCB48J != this.state.aodCB48J ||
//             prevState.aodCB48S != this.state.aodCB48S
//         ) {
//             if (this.state.aodCB36)
//                 this.setState({ aodCBValSave: this.state.aodCB36 })
//             else if (this.state.aodCB48J)
//                 this.setState({ aodCBValSave: this.state.aodCB48J })
//             else if (this.state.aodCB48S)
//                 this.setState({ aodCBValSave: this.state.aodCB48S })
//             else this.setState({ aodCBValSave: null })
//         }

//         window.addEventListener('resize', this.updateDimensions)
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
    

    render() {
        
        
        return (
            
            <div id='main-body-flex' style={{display:'flex',flexDirection:'row',margin:0, height:undefined,justifyContent:'center'}}>
                <Sidebar state={this.state} handleChange={this.handleChange} fetchData={fetchData}/>

                <div id='body' style={{flex:10,backgroundColor:'#F8F7F7', justifyContent:'center'}}>
                    <div id='map-above-graphs' style={{display:'flex',flexDirection:'column',
                                justifyContent:'center'}}>
                        <div id='map-body' style={{flex:1, borderRadius:5, 
                                                  border:'1px solid rgba(0, 0, 0, 0.1)',
                                                  padding:20,backgroundColor:'white', margin: 20,
                                                  marginBottom: 10}}>
                            <RealTimeMap id='real-time-map' state={this.state} handleChangeMulti={this.handleChangeMulti}/>
                        </div>
                        <div style={{flex:1, backgroundColor:'orange', margin:20, marginTop:10}}>Test
                        </div>
                    </div>
                    
                </div>
            </div>
            
        
        )
    }


}

export default RealTime