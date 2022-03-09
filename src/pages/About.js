import * as React from 'react'
import { Container, Row, Col } from 'reactstrap'

export class About extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h2 style={{backgroundColor:'#461660',color:'white', textAlign:'left', padding:10}}>About</h2>
                <p style={{backgroundColor:'#F8F7F7',color:'black', textAlign:'left', padding:10}}>
                    This dashboard conatins both real-time and forecasted information on air quality.
                </p>

                <h2 style={{backgroundColor:'#461660',color:'white', textAlign:'left', padding:10}}>Data Sources</h2>
                <p style={{backgroundColor:'#F8F7F7',color:'black', textAlign:'left', padding:10}}>
                    There are four primary data sources in this application:
                    <ul>
                        <li>Airnow: AirNow reports air quality using the official U.S. Air Quality Index (AQI). 
                            AirNow is a partnership of the U.S. Environmental Protection Agency, National Oceanic 
                          and Atmospheric Administration (NOAA), National Park Service, NASA, Centers for Disease Control, 
                              and tribal, state, and local air quality agencies. Complete list of AirNow partners. 
                              Agencies all over the country send their monitoring data to AirNow for display. 
                              The Department of State provides data from U.S. Embassies and Consulates to inform personnel 
                              and citizens overseas, and the U.S. Forest Service and NOAA provide fire and smoke data. 
                              For more information, visit: <a href="https://www.airnow.gov/about-airnow/"> airnow.gov </a>
                        </li>
                        <li>GOES: The Geostationary Operational Environmental Satellite (GOES) – R Series is the nation’s 
                        most advanced fleet of geostationary weather satellites. The GOES-R Series significantly improves 
                        the detection and observation of environmental phenomena that directly affect public safety, 
                            protection of property and our nation’s economic health and prosperity. This dashboard makes
                            use of the GOES-R Aerosol Detection Data product, providing two aerosol products: AOD and ADP 
                            (aerosol detection product; smoke/dust masks). 
                            For more information, visit: 
                                <a href="https://www.goes-r.gov/products/baseline-aerosol-detection.html"> goes-r.gov </a>
                        </li>
                        <li>NYSM: In April 2014, the State of New York in collaboration with the Department of Homeland Security 
                        and Emergency Services funded the University at Albany to design, install, and operate the NYS Early Warning
                        Weather Detection System. Operated by the University at Albany, the New York State Mesonet collects, archives,
                            and processes data in real-time every 5 minutes, feeding weather prediction models and decision-support
                            tools for users across the greater New York region.The NYSM includes a Profiler Network of 17 sites 
                            provides additional atmospheric data in the vertical (up to 6 miles above ground) Each profiler 
                            site is equipped with a Leosphere WindCube WLS-100 series Doppler LiDAR (Light Detection and Ranging). 
                            The LiDAR uses a vertically-pointing eye-safe laser to estimate wind velocities in the vertical. 
                            The LiDAR measures the speed and direction of aerosols moving towards and away from the beam, 
                                and the reflected energy is analyzed to determine 3-D wind speed and direction. During 
                                times of low aerosol concentration, data availability may be limited. The Carrier to 
                                Noise Ratio (CNR) plot is a measure of reflected energy as detected by the sensor. 
                                Data availability is poor when the CNR is below -25 dB. For more information, visit: 
                                    <a href="http://nysmesonet.org"> nysmesonet.org </a></li>
                        <li>IDEA-NYS Trajectories: IDEA-NYS is an air quality application system. It brings in satellite and model 
                    information and generates forward trajectories, predicting the directions of aerosol plumes.  IDEA-NYS has 
                    three runs per day with different resolution and different input sources:
                            <ul>
                                <li>Low resolution run - <a href="https://www.ospo.noaa.gov/Operations/SNPP/status.html">SNPP</a> </li>
                                <li> Low resolution run - <a href="https://www.jpss.noaa.gov/mission_and_instruments.html">JPSS</a> </li>
                                <li> High resolution run </li>
                            </ul>
                        </li>
                    </ul>
                </p>

                <h2 style={{backgroundColor:'#461660',color:'white', textAlign:'left', padding:10}}>Contact Information</h2>
                <p style={{backgroundColor:'#F8F7F7',color:'black', textAlign:'left', padding:10}}> 
                    <a style={{fontWeight:'bold'}}> Project Lead and Data Information: </a> 
                    Dr. Cheng-Hsuan Lu, Research Associate, Atmospheric Sciences Research Center, University at Albany, 
                        clu4@albany.edu <br/>
                    <a style={{fontWeight:'bold'}}> Website Technical Details: </a> 
                    Dr. Kara Sulia, Director, xCITE Lab, Atmospheric Sciences Research Center, University at Albany, 
                        ksulia@albany.edu
                    
                </p>

                <h2 style={{backgroundColor:'#461660',color:'white', textAlign:'left', padding:10}}>Support</h2>
                <p style={{backgroundColor:'#F8F7F7',color:'black', textAlign:'left', padding:10}}> 
                    This work was funded by the New York State Energy Research and Development Authority (NYSERDA) under grant numbers
                    XXXX and YYYY. Locations of performance include the <a href='https://www.albany.edu/asrc/'>
                        Atmospheric Sciences Research Center</a> at the <a href="https://www.albany.edu">University at 
                    Albany</a> as well as the <a href="https://ncar.ucar.edu">National Center for Atmospheric Research.</a>
                    
                </p>


            </div>
        
        
        )
    }


}

export default About