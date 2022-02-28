import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {state, months, hours, res} from '../state.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'


function getDaysInMonth(props) {
     let daysInMonth = new Date(
         parseInt(props.state.year),
         months.indexOf(props.state.month) + 1,
         0
     ).getDate()
     let arr = []
     for (var i = 1; i <= daysInMonth; i++) arr.push(i.toString())
     return arr
}

const Sidebar = (props) => {
//     console.log('sidebar props', props);
    let fontColor = 'white'
    
    return (
            <div id='sidebar' style={{backgroundColor:'#461660',padding:10, flex:1}}>
                <div>
                    <div style={{ margin: 0 }}>
                        <div>
                            <a style={{color:fontColor}}>Year</a>
                            <Dropdown
                                options={['2020', '2021', '2022']}
                                onChange={(e)=>props.handleChange('year',e.value)}
                                value={props.state.year}
                            />
                        </div>
                        <div>
                            <a style={{color:fontColor}}>Month</a>
                            <Dropdown
                                options={months}
                                onChange={(e)=>props.handleChange('month',e.value,)}
                                value={props.state.month}
                            />
                        </div>
                        <div>
                            <a style={{color:fontColor}}>Day</a>
                            <Dropdown
                                options={getDaysInMonth(props)}
                                onChange={(e)=>props.handleChange('day',e.value)}
                                value={props.state.day}
                            />
                        </div>
                        <div>
                            <a style={{color:fontColor}}>Hour (Z)</a>
                            <Dropdown
                                options={hours}
                                onChange={(e)=>props.handleChange('hour',e.value)}
                                value={props.state.hour}
                            />
                        </div>
                        <div>
                            <a style={{color:fontColor}}>Res (º)</a>
                            <Dropdown
                                options={res}
                                onChange={(e)=>props.handleChange('res',e.value)}
                                value={props.state.res}
                            />
                        </div>
                        <button
                            style={{
                                   marginTop:15,
                                   width:'100%',
                                   fontSize:20,
                                   fontFamily: 'Roboto',
                                   fontWeight: 'bold',
                                   backgroundColor:'white',
                                   color: '#461660',
                                   borderRadius:5
                                   
                            }}
                            onClick={(e)=>props.handleChange('fetchData',true)}
                        >
                            Fetch
                        </button>
                        <a
                            style={{
                                alignSelf: 'flex-end',
                                fontSize: 10,
                                color: fontColor,
                            }}
                        >
                            {props.state.fetching}
                        </a>
                    </div>


                   <div>
                       {this.props.state.goesDataSmoke ||
                       this.props.state.goesDataDust ? (
                           <Row>
                               <div
                                   style={{
                                       alignItems: 'center',
                                   }}
                               >
                                   <Checkbox
                                       checked={
                                           this.state.GOESon
                                       }
                                       onClick={() =>
                                           this.setState({
                                               GOESon: !this
                                                   .state
                                                   .GOESon,
                                           })
                                       }
                                   />
                                   <a>GOES</a>
                               </div>
                           </Row>
                       ) : null}

                       {this.props.state.goesDataSmoke && this.props.state.smokeCB && this.props.state.GOESon ? 
                           this.getCB(this.props.state.smokeCB,'blue','Smoke')
                       : null}
                       {this.props.state.GOESon && this.props.state.goesDataDust && this.props.state.dustCB ? 
                           this.getCB(this.props.state.dustCB,'red','Dust')
                       : null}

                       {this.state.viirsData48J || this.state.viirsData48S || this.state.viirsData36 ? (
                           <Row style={{ width: '100%' }}>
                               <div
                                   style={{
                                       alignItems: 'center',
                                       width: '100%',
                                   }}
                               >
                                   <Checkbox
                                       checked={this.state.AODon}
                                       onClick={() =>
                                           this.setState({
                                               AODon: !this.props.state.AODon,
                                               AODclick36: !this.props.state.AODon? true: false,
                                               AODclick48J: !this.props.state.AODon? true: false,
                                               AODclick48S: !this.props.state.AODon? true: false,
                                           })
                                       }
                                   />
                                   <a>VIIRS AOD</a>
                                   <a
                                       style={{
                                           marginLeft: 40,
                                       }}
                                   >
                                       { this.props.state.viirsTimeNow }
                                   </a>
                               </div>
                           </Row>
                       ) : null}

                       {this.state.aodCB36 && this.state.AODon ? this.getAODCB(this.state.aodCB36,'Hi-Res'): null}
                       {this.state.aodCB48J && this.state.AODon ? this.getAODCB(this.state.aodCB48J,'JPSS'): null}
                       {this.state.aodCB48S && this.state.AODon ? this.getAODCB(this.state.aodCB48S,'SNPP'): null}

                       {this.state.AODon && this.state.aodCBValSave ? (
                           <div
                               style={{ display: 'flex', justifyContent: 'center', }}
                           >
                               <Row style={{ width: '100%', justifyContent: 'center', }}
                               >
                                   {Object.keys(this.state.aodCBValSave).map((k, i) => (
                                       <div
                                           key={this.state.aodCBValSave[k].toString()}
                                           style={{ width: '2.5%', justifyContent: 'center', }}
                                       >
                                           <a style={{fontSize: 10,}}> 
                                               {i % 4 === 0 ? this.props.state.aodCBValSave[k]: null}
                                           </a>
                                       </div>
                                   ))}
                               </Row>
                           </div>
                       ) : null}

                       {this.state.airnowData ? (
                           <Row>
                               <div style={{ alignItems: 'center',}} >
                                   <Checkbox
                                       checked={this.props.state.Airnowon}
                                       onClick={() => this.setState({Airnowon: !this.props.state.Airnowon,})}/>
                                   <a>Airnow PM2.5</a>
                               </div>
                           </Row>
                       ) : null}
                       {this.state.lidarData ? (
                           <Row>
                               <div style={{ alignItems: 'center', }} >
                                   <Checkbox
                                       checked={ this.props.state.Lidaron }
                                       onClick={() => this.setState({ Lidaron: !this.props.state.Lidaron,})}/>
                                   <a>NYSM Lidar</a>
                               </div>
                           </Row>
                       ) : null}

                       {this.state.Airnowon && this.state.airnowData ? (
                           <div
                               style={{
                                   width: '100%',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   paddingLeft: 5,
                               }}
                           >
                               <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                   <div style={{ backgroundColor: 'rgb(0,228,0)', marginRight: 5, paddingRight: 5,
                                               paddingLeft: 5, borderRadius: 5, }}>
                                       <a style={{ fontSize: 10, }}>Good</a>
                                   </div>
                                   <div style={{ backgroundColor: 'rgb(255,255,0)', marginRight: 5, paddingRight: 5,
                                               paddingLeft: 5, borderRadius: 5,}}>
                                       <a style={{ fontSize: 10,}}>Moderate</a>
                                   </div>
                                   <div style={{backgroundColor:'rgb(255,126,0)',marginRight: 5,paddingRight: 5,
                                               borderRadius: 5,}}>
                                       <p style={{ fontSize: 10, color: 'white', marginBottom: 0,}}>Unhealthy</p>
                                       <p style={{ fontSize: 10, color: 'white', marginBottom: 0,}}>Sensitive</p>
                                       <p style={{ fontSize: 10, color: 'white', marginBottom: 0,}}>Groups</p>
                                   </div>
                                   <div style={{ backgroundColor: 'rgb(255,0,0)', marginRight: 5, paddingRight: 5,
                                               paddingLeft: 5, borderRadius: 5,}}>
                                       <a style={{ fontSize: 10, color: 'white', }}>Unhealthy</a>
                                   </div>
                                   <div style={{ backgroundColor:'rgb(143,63,151)',marginRight: 5,paddingRight: 5,
                                               paddingLeft: 5, borderRadius: 5,}}>
                                       <p style={{fontSize: 10,color: 'white',marginBottom: 0,}}
                                       >
                                           Very
                                       </p>
                                       <p
                                           style={{
                                               fontSize: 10,
                                               color: 'white',
                                               marginBottom: 0,
                                               marginTop: 0,
                                           }}
                                       >
                                           Unhealthy
                                       </p>
                                   </div>
                                   <div
                                       style={{
                                           backgroundColor:
                                               'rgb(126,0,35)',
                                           marginRight: 5,
                                           paddingRight: 5,
                                           paddingLeft: 5,
                                           borderRadius: 5,
                                       }}
                                   >
                                       <a
                                           style={{
                                               fontSize: 10,
                                               color: 'white',
                                           }}
                                       >
                                           Hazardous
                                       </a>
                                   </div>
                               </Row>
                           </div>
                       ) : null}
                   </div>

                </div>
            </div>
)}

export default Sidebar;