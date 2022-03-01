import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Checkbox from '@mui/material/Checkbox'
import {state, months, hours, res} from '../state.js';
import {getAODCB, getCB} from '../functions/colorbars.js';
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
            <div id='sidebar' style={{backgroundColor:'#461660',padding:10, width:'170px'}}>
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
                            style={{ marginTop:15, width:'100%', fontSize:20, fontFamily: 'Roboto', fontWeight: 'bold',
                                   backgroundColor:'white', color: '#461660', borderRadius:5 }}
                            onClick={(e)=>props.handleChange('fetchData',true)}
                        > Fetch </button>
                        <a style={{ alignSelf: 'flex-end', fontSize: 10, color: fontColor, }} > 
                            {props.state.fetching}
                        </a>
                    </div>


                   <div >
                       {props.state.goesDataSmoke || props.state.goesDataDust ? (
                           <div style={{display:'flex',justifyContent:'flex-start'}}>
                               <div style={{ alignItems: 'center', }} >
                                   <Checkbox
                                        style={{color:"white"}} checked={ props.state.GOESon } onClick={() => 
                                        props.handleChangeMulti({ GOESon: !props.state.GOESon,})}
                                   />
                                   <a style={{color:"white"}}>GOES</a>
                               </div>
                           </div>
                       ) : null}
                       
                       {props.state.goesDataSmoke && props.state.smokeCB && props.state.GOESon ? 
                           getCB( props.state.smokeCB, 'blue', 'Smoke' )
                       : null}

                       {props.state.GOESon && props.state.goesDataDust && props.state.dustCB ? 
                            getCB( props.state.dustCB, 'red','Dust')
                        : null}

                       {props.state.viirsData48J || props.state.viirsData48S || props.state.viirsData36 ? (
                           <div style={{display:'flex',justifyContent:'flex-start'}}>
                               <div style={{ alignItems: 'center', }} >
                                   <Checkbox style={{color:"white"}}
                                       checked={props.state.AODon}
                                       onClick={() =>
                                           props.handleChangeMulti({
                                               AODon: !props.state.AODon,
                                               AODclick36: !props.state.AODon? true: false,
                                               AODclick48J: !props.state.AODon? true: false,
                                               AODclick48S: !props.state.AODon? true: false,
                                           })
                                       }
                                   />
                                   <a style={{color:"white"}}>VIIRS AOD</a>
                                   <a style={{ marginLeft: 40, }} >
                                       { props.state.viirsTimeNow }
                                   </a>
                               </div>
                           </div>
                       ) : null}

                       {props.state.aodCB36 && props.state.AODon ? getAODCB(props.state.aodCB36,'Hi-Res'): null}
                       {props.state.aodCB48J && props.state.AODon ? getAODCB(props.state.aodCB48J,'JPSS'): null}
                       {props.state.aodCB48S && props.state.AODon ? getAODCB(props.state.aodCB48S,'SNPP'): null}

                       {props.state.AODon && props.state.aodCBValSave ? (
                           <div style={{ display: 'flex', justifyContent: 'center', }} >
                               <Row style={{ width: '100%', justifyContent: 'center', }}>
                                   {Object.keys(props.state.aodCBValSave).map((k, i) => (
                                       <div key={props.state.aodCBValSave[k].toString()}
                                           style={{ width: '2.5%', justifyContent: 'center', }} >
                                           <a style={{fontSize: 10,}}> 
                                               {i % 4 === 0 ? props.state.aodCBValSave[k]: null}
                                           </a>
                                       </div>
                                   ))}
                               </Row>
                           </div>
                       ) : null}

                       {props.state.airnowData ? (
                           <div style={{display:'flex',justifyContent:'flex-start'}}>
                               <div style={{ alignItems: 'center',}} >
                                   <Checkbox style={{color:"white"}}
                                       checked={props.state.Airnowon}
                                       onClick={() => props.handleChangeMulti({Airnowon: !props.state.Airnowon,})}/>
                                   <a style={{color:"white"}}>Airnow PM2.5</a>
                               </div>
                           </div>
                       ) : null}
                       {props.state.lidarData ? (
                           <div style={{display:'flex',justifyContent:'flex-start'}}>
                               <div style={{ alignItems: 'center', }} >
                                   <Checkbox style={{color:"white"}}
                                       checked={props.state.Lidaron }
                                       onClick={() => props.handleChangeMulti({ Lidaron: !props.state.Lidaron,})}/>
                                   <a style={{color:"white"}}>NYSM Lidar</a>
                               </div>
                           </div>
                       ) : null}

                       {props.state.Airnowon && props.state.airnowData ? (
                           <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: 5}}>
                               <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                                       <p style={{fontSize: 10,color: 'white',marginBottom: 0,}}>Very</p>
                                       <p style={{fontSize: 10,color: 'white',marginBottom: 0,marginTop: 0,}}>Unhealthy</p>
                                   </div>
                                   <div style={{ backgroundColor: 'rgb(126,0,35)', marginRight: 5, paddingRight: 5,
                                              paddingLeft: 5, borderRadius: 5,}}>
                                       <a style={{fontSize: 10,color: 'white',}}>Hazardous</a>
                                   </div>
                               </div>
                           </div>
                       ) : null}
                   </div>

                </div>
            </div>
)}

export default Sidebar;