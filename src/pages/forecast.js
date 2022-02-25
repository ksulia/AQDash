import * as React from 'react'
import { Container, Row, Col } from 'reactstrap'
import {state} from '../state.js'

export class Forecast extends React.Component {

    constructor() {
        super()
        
        this.state = state
    }

    render() {
        return (
            
            <div id='main-body-flex' style={{display:'flex',flexDirection:'row',margin:0, height:'100vh'}}>
                <div id='sidebar' style={{backgroundColor:'black',flex:1}}></div>
                <div id='body' style={{backgroundColor:'#0f0f0f',flex:10}}></div>
            </div>
            
       


        
        )
    }


}

export default Forecast