import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; 

import Navigation from './Navigation.js';
import Forecast from './pages/forecast.js';
import RealTime from './pages/realtime.js';
import About from './pages/About.js';
import {state, years, months, hours, res} from './state.js';
import fetchData from './functions/fetchData.js';



class App extends Component {
    
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = state
    }
    
    
    getCompleteTime(){
        console.log('getcompletetime', this.state)
        let i = months.indexOf(this.state.month) + 1,month_num,day_num
        month_num = ('0'+i).slice(-2)

        this.handleChange({
            completeTime: `${this.state.year}-${month_num}-${this.state.day}T${this.state.hour}`,
            mapTime: `${this.state.year}-${month_num}-${this.state.day}T${this.state.hour}`,
            clicked: false,
        })
    }
    
    updateDimensions = () => {
        this.handleChange({ width: window.innerWidth, height: window.innerHeight })
    }


    
    componentDidMount(prevState,prevPops) {
        if(this.props) console.log('getcompletetime', this.state)
        this.getCompleteTime()
        if (this.state.completeTime && this.state.fetchData) {
            console.log('fetch1',this.state.fetchData)
            this.handleChange({fetchData:false});
            fetchData(this.state,this.handleChange);
            
        }
        window.addEventListener('load', this.updateDimensions)
    }

    componentDidUpdate(prevProps, prevState) {
//         console.log('did update', this.state)
                
        if (this.state.clicked) this.getCompleteTime()
        if (this.state.fetchData && this.state.completeTime) {
            this.handleChange({fetchData:false});
            fetchData(this.state,this.handleChange);
        }
        if(prevState.rawData != this.state.rawData)
            console.log('rawData', this.state.rawData)

        window.addEventListener('resize', this.updateDimensions)
//         if (prevState.width != this.state.width)console.log('width/height', this.state.width, this.state.height)
    }
    
    
    handleChange (obj){
        this.setState(obj)
    }
    
  render() {
    return (      
       <BrowserRouter >
        <div id='header' style={{width:'100%'}}>
          <Navigation />
            <Routes>
             <Route path="/" element={<RealTime 
                                        state={this.state} 
                                        handleChange={this.handleChange}/>} exact
                                        />
             <Route path="/forecast" element={<Forecast
                                                state={this.state} 
                                                handleChange={this.handleChange}/>} exact
                                                />
             <Route path="/about" element={<About/>} exact/>
           </Routes>
        </div> 
        <div id='footer' style={{paddingTop:5, display:'flex', flexDirection: 'row', width: '100%'}}>
            <div id='footer-right' style={{width: '100%',display:'flex',flexDirection:'row',justifyContent: 'flex-end'}}>
                &copy; {new Date().getFullYear()} Copyright: 
                <a href="https://www.albany.edu/atmospheric-sciences-research-center/xcite-laboratory"> xCITE Lab </a>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default App;


ReactDOM.render(<App />, document.getElementById('app'));