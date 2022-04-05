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
                    This dashboard contains both real-time and forecasted information on fine particulate (PM) air quality for New York State.
                </p>

                <h2 style={{backgroundColor:'#461660',color:'white', textAlign:'left', padding:10}}>Data Sources</h2>
                <p style={{backgroundColor:'#F8F7F7',color:'black', textAlign:'left', padding:10}}>
                    There are four primary data sources in this application:
                    <ul>
                        <li>Airnow: AirNow is one-stop source for air quality data, managed by U.S. Environmental Protection Agency. 
                        The New York State Department of Environmental Conservation (NYSDEC) operated and maintained a statewide 
                        continuous air quality monitoring network. Ambient air quality observations are submitted to EPA AirNow for display. 
                        Hourly monitoring data can be accessed via the EPA Air Quality System (AQS) API. For more information, visit: 
                        <a href="https://www.dec.ny.gov/chemical/34985.html"> DEC AQ monitoring </a> and 
                        <a href="https://www.airnow.gov/about-airnow/"> EPA AirNow  </a>
                        </li>
                        <li>GOES: The Geostationary Operational Environmental Satellite (GOES)–R Series is the nation’s most advanced
                        fleet of geostationary weather satellites. This dashboard makes use of Aerosol Optical Depth (AOD) product and
                        Aerosol (including dust/smoke) Detection Product (ADP), retrieved from multispectral reflectance measurements 
                        observed by the Advanced Baseline Imager (ABI) onboard GOES-16. For more information, visit:
                                <a href="https://www.goes-r.gov/products/baseline-aerosol-detection.html"> goes-r.gov </a>
                        </li>
                        <li>NYSM: In April 2014, the State of New York in collaboration with the Department of Homeland Security 
                        and Emergency Services funded the University at Albany (UAlbany) to design, install, and operate the NYS 
                        Early Warning Weather Detection System. Operated by the UAlbany, the New York State Mesonet collects, archives, 
                            and processes data in real-time every 5 minutes, feeding weather prediction models and decision-support 
                            tools for users across the greater New York region. The NYSM includes a profiler network of 17 sites. 
                            Each profiler site is equipped with a Leosphere WindCube WLS-100 series Doppler LiDAR (Light Detection 
                            and Ranging). The Carrier to Noise Ratio (CNR) is a measure of reflected energy as detected by the sensor.
                            For more information, visit: 
                                    <a href="http://nysmesonet.org"> nysmesonet.org </a></li>
                        <li>IDEA-NYS and risk map: A near real-time (NRT) aerosol forecast and diagnostic system is developed 
                        by adopting Infusing satellite Data into Environmental Applications (IDEA) for the NY region, herein 
                        denoted as IDEA-NYS. It brings in satellite and model information and generates forward trajectories, 
                            predicting the transport of aerosol plumes. Daily risk map is generated from ensemble of IDEA-NYS 
                            runs. For more information, visit: 
                                <a href="https://research.asrc.albany.edu/facstaff/lulab/idea-nys.html"> IDEA-NYS </a> 
                                and <a href="https://research.asrc.albany.edu/facstaff/lulab/riskmap.html"> Risk Map </a>.
                        </li>
                    </ul>
                </p>

                <h2 style={{backgroundColor:'#461660',color:'white', textAlign:'left', padding:10}}>Contact Information</h2>
                <p style={{backgroundColor:'#F8F7F7',color:'black', textAlign:'left', padding:10}}> 
                    <a style={{fontWeight:'bold'}}> Project Lead and Data Information: </a> 
                    <a href="https://research.asrc.albany.edu/facstaff/lulab/"> 
                        Dr. Cheng-Hsuan Lu </a>, Research Associate, Atmospheric Sciences Research Center, University at Albany, 
                        clu4@albany.edu <br/>
                    <a style={{fontWeight:'bold'}}> Website Technical Details: </a> 
                    <a href="https://www.albany.edu/asrc/researchers-and-staff/faculty/kara-sulia"> 
                        Dr. Kara Sulia </a>, Director, xCITE Lab, Atmospheric Sciences Research Center, University at Albany, 
                        ksulia@albany.edu
                    
                </p>

                <h2 style={{backgroundColor:'#461660',color:'white', textAlign:'left', padding:10}}>Support</h2>
                <p style={{backgroundColor:'#F8F7F7',color:'black', textAlign:'left', padding:10}}> 
                    This work was funded by the New York State Energy Research and Development Authority (NYSERDA) 
                    under grant number 100417. Locations of performance include the <a href='https://www.albany.edu/asrc/'>
                        Atmospheric Sciences Research Center</a> at the <a href="https://www.albany.edu">University at 
                    Albany</a> as well as the <a href="https://www.jcsda.org"> Joint Center for 
                            Satellite Data Assimilation </a> 
                    
                </p>


            </div>
        
        
        )
    }


}

export default About