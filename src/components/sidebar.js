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
    console.log('sidebar props', props);

    
    return (
            <div id='sidebar' style={{backgroundColor:'#461660',padding:10}}>
                            <div>
                                <div style={{ margin: 0 }}>
                                    <div>
                                        <a style={{color:'white'}}>Year</a>
                                        <Dropdown
                                            options={['2020', '2021', '2022']}
                                            onChange={(e)=>props.handleChange(e,'year')}
                                            value={props.state.year}
                                        />
                                    </div>
                                    <div>
                                        <a style={{color:'white'}}>Month</a>
                                        <Dropdown
                                            options={months}
                                            onChange={(e)=>props.handleChange(e,'month')}
                                            value={props.state.month}
                                        />
                                    </div>
                                    <div>
                                        <a style={{color:'white'}}>Day</a>
                                        <Dropdown
                                            options={getDaysInMonth(props)}
                                            onChange={(e)=>props.handleChange(e,'day')}
                                            value={props.state.day}
                                        />
                                    </div>
                                    <div>
                                        <a style={{color:'white'}}>Hour (Z)</a>
                                        <Dropdown
                                            options={hours}
                                            onChange={(e)=>props.handleChange(e,'hour')}
                                            value={props.state.hour}
                                        />
                                    </div>
                                    <div>
                                        <a style={{color:'white'}}>Res (º)</a>
                                        <Dropdown
                                            options={res}
                                            onChange={(e)=>props.handleChange(e,'res')}
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
                                        onClick={() => props.fetchData()}
                                    >
                                        Fetch
                                    </button>
                                    <a
                                        style={{
                                            alignSelf: 'flex-end',
                                            fontSize: 10,
                                            color: 'red',
                                        }}
                                    >
                                        {props.state.fetching}
                                    </a>
                                </div>
                            </div>
                    
                    
                    
                </div>
)}

export default Sidebar;