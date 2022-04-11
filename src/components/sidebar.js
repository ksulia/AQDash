import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Checkbox from '@mui/material/Checkbox'
import {state, months, hours, res} from '../state.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'


function getDaysInMonth(props) {
     let daysInMonth = new Date(parseInt(props.state.year),months.indexOf(props.state.month) + 1,0).getDate()
     let arr = []
     for (var i = 1; i <= daysInMonth; i++) arr.push(('0'+i.toString()).slice(-2))
     return arr
}

const Sidebar = (props) => {
    let fontColor = 'white'
    
    return (
                <div>
                    <div style={{ margin: 0 }}>
                        <div>
                            <a style={{color:fontColor}}>Year</a>
                            <Dropdown
                                options={['2020', '2021', '2022']}
                                onChange={(e)=>props.handleChange({year:e.value,clicked:true})}
                                value={props.state.year}
                            />
                        </div>
                        <div>
                            <a style={{color:fontColor}}>Month</a>
                            <Dropdown
                                options={months}
                                onChange={(e)=>props.handleChange({month:e.value,clicked:true})}
                                value={props.state.month}
                            />
                        </div>
                        <div>
                            <a style={{color:fontColor}}>Day</a>
                            <Dropdown
                                options={getDaysInMonth(props)}
                                onChange={(e)=>props.handleChange({day:e.value,clicked:true})}
                                value={props.state.day}
                            />
                        </div>
                        <div>
                            <a style={{color:fontColor}}>Hour (Z)</a>
                            <Dropdown
                                options={hours}
                                onChange={(e)=>props.handleChange({hour:e.value,clicked:true})}
                                value={props.state.hour}
                            />
                        </div>
                        <div>
                            <a style={{color:fontColor}}>Res (º)</a>
                            <Dropdown
                                options={res}
                                onChange={(e)=>props.handleChange({res:e.value})}
                                value={props.state.res}
                            />
                        </div>
                        <button
                            style={{ marginTop:15, width:'100%', fontSize:20, fontFamily: 'Roboto', fontWeight: 'bold',
                                   backgroundColor:'white', color: props.realtime ? '#461660': '#EEB211', borderRadius:5 }}
                            onClick={(e)=>props.handleChange({fetchData:true})}
                        > Fetch </button>
                        <a style={{ alignSelf: 'flex-end', fontSize: 10, color: fontColor, }} > 
                            {props.state.fetching}
                        </a>
                    </div>


                   <div style={{padding:0}}>
                            
                       {!props.realtime && (props.state.rawData && props.state.rawData.data_risk) ? (
                               <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center'}} >
                                   {/*
                                   <Checkbox
                                        style={{color:"white"}} checked={ props.state.riskChecked } onClick={() => 
                                        props.handleChange({ riskChecked: !props.state.riskChecked})}
                                   />
                                   <a style={{color:"white",textAlign:'left'}}>Risk</a>
                                    */}
                                   <Checkbox disabled
                                        style={{color:"grey"}} checked={ props.state.riskChecked } onClick={() => 
                                        props.handleChange({ riskChecked: !props.state.riskChecked})} 
                                   />
                                   <a style={{color:"grey",textAlign:'left'}}>Risk</a>
                
                               </div>
                       ) : null}
                       {props.realtime && (props.state.goesDataAOD) ? (
                               <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center'}} >
                                   <Checkbox
                                        style={{color:"white"}} checked={ props.state.GOESa } onClick={() => 
                                        props.handleChange({ GOESa: !props.state.GOESa})}
                                   />
                                   <a style={{color:"white",textAlign:'left'}}>GOES AOD</a>

                               </div>
                       ) : null}
                       
                        {props.realtime && (props.state.goesDataSmoke ) ? (
                               <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center'}} >
                                   <Checkbox
                                        style={{color:"white"}} checked={ props.state.GOESs } onClick={() => 
                                        props.handleChange({ GOESs: !props.state.GOESs})}
                                   />
                                   <a style={{color:"white",textAlign:'left'}}>GOES Smoke</a>
                               </div>
                       ) : null}
                       
                        {props.realtime && (props.state.goesDataDust) ? (
                               <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}} >
                                   <Checkbox
                                        style={{color:"white"}} checked={ props.state.GOESd } onClick={() => 
                                        props.handleChange({ GOESd: !props.state.GOESd})}
                                   />
                                   <a style={{color:"white",textAlign:'left'}}>GOES Dust</a>
                               </div>
                       ) : null}
                       

                       {!props.realtime && 
                           (props.state.viirsData48J || props.state.viirsData48S || props.state.viirsData36) ? (
                           <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center'}}>
                                   <Checkbox style={{color:"white"}}
                                       checked={props.state.AODon}
                                       onClick={() =>props.handleChange({AODon: !props.state.AODon})}
                                   />
                                   <a style={{color:"white",textAlign:'left'}}>IDEA-NYS</a>
                         
                           </div>
                       ) : null}
                       
                       {!props.realtime && (props.state.rawData ) ? (
                               <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center'}} >
                                   {/*
                                   <Checkbox
                                        style={{color:"white"}} checked={ props.state.riskChecked } onClick={() => 
                                        props.handleChange({ riskChecked: !props.state.riskChecked})}
                                   />
                                   <a style={{color:"white",textAlign:'left'}}>WRF-CHEM</a>
                                    */}
                                   <Checkbox disabled
                                        style={{color:"grey"}} checked={ false } 
                                   />
                                   <a style={{color:"grey",textAlign:'left'}}>WRF-CHEM</a>
                
                               </div>
                       ) : null}
                       
                       {!props.realtime && props.state.viirsData48J && props.state.AODon? (
                           <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center',
                           paddingLeft:10}}>
                                   <Checkbox style={{color:"white"}}
                                       size="small"
                                       checked={props.state.AODclick48J}
                                       onClick={() =>props.handleChange({AODclick48J: !props.state.AODclick48J,})}
                                   />
                                   <a style={{color:"white",textAlign:'left',fontSize:15}}>Lo-Res (JPSS)</a>
                         
                           </div>
                       ) : null}
                       {!props.realtime && props.state.viirsData48S  && props.state.AODon? (
                           <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center',
                           paddingLeft:10}}>
                                   <Checkbox style={{color:"white"}}
                                       size='small'
                                       checked={props.state.AODclick48S}
                                       onClick={() =>props.handleChange({AODclick48S: !props.state.AODclick48S})}
                                   />
                                   <a style={{color:"white",textAlign:'left',fontSize:15}}>Lo-Res (SNPP)</a>
                         
                           </div>
                       ) : null}
                       {!props.realtime && props.state.viirsData36 && props.state.AODon ? (
                           <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center',
                           paddingLeft:10}}>
                                   <Checkbox style={{color:"white",size:10}}
                                       size="small"
                                       checked={props.state.AODclick36}
                                       onClick={() =>props.handleChange({AODclick36: !props.state.AODclick36})}
                                   />
                                   <a style={{color:"white",textAlign:'left',fontSize:15}}>Hi-Res (SNPP)</a>
                         
                           </div>
                       ) : null}


                       {props.realtime && props.state.AODon && props.state.aodCBValSave ? (
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

                       {props.realtime && props.state.airnowData ? (
                               <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center'}} >
                                   <Checkbox style={{color:"white"}}
                                       checked={props.state.Airnowon}
                                       onClick={() => props.handleChange({Airnowon: !props.state.Airnowon,})}/>
                                   <a style={{color:"white",textAlign:'left'}}>Airnow PM2.5</a>
                               </div>
                       ) : null}
                       {props.realtime && props.state.lidarData ? (
                               <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center'}} >
                                   <Checkbox style={{color:"white"}}
                                       checked={props.state.Lidaron }
                                       onClick={() => props.handleChange({ Lidaron: !props.state.Lidaron,})}/>
                                   <a style={{color:"white",textAlign:'left'}}>NYSM Lidar</a>
                               </div>
                       ) : null}

                       
                   </div>

                </div>
)}

export default Sidebar;