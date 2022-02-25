import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 

import Navigation from './Navigation.js';
import Forecast from './pages/forecast.js';
import RealTime from './pages/realtime.js';
import About from './pages/About.js';

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div id='header'>
          <Navigation />
            <Routes>
             <Route path="/" element={<RealTime/>} exact/>
             <Route path="/forecast" element={<Forecast/>}/>
             <Route path="/about" element={<About/>}/>
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