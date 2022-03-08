import * as React from 'react';
import Plot from 'react-plotly.js'
import { Container, Row, Col } from 'react-bootstrap';



export function GoesPlot (props) {
    if(props.state.plotsToDisplay.includes('goes'))
    return( 
                <Col style={{borderRadius:5, border:'1px solid rgba(0, 0, 0, 0.1)',
                                                  padding:20,backgroundColor:'white'}}>
                    {console.log("goes!!")}
                    <Plot
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        data={[
                            {
                                x: props.state.riskData.times,
                                y: props.state.riskData.smoke,
                                type: 'line',
                                line: { width: 2, color: 'blue' },
                                name: 'smoke',
                            },
                            {
                                x: props.state.riskData.times,
                                y: props.state.riskData.dust,
                                type: 'line',
                                line: { width: 2, color: 'red' },
                                name: 'dust',
                            },
                        ]}
                        useResizeHandler={true}
                        layout={{
                            title: 'GOES',
                            autosize: true,
                            width: undefined,
                            height: undefined,
                            xaxis: { title: 'Time [UTC]' },
                            yaxis: { title: 'Count' },
                            margin: {
                                r: 0,
                                t: 30,
                                pad: 0,
                            },
                        }}
                    />

                </Col>
        )
        else return null
}

export function AirnowPlot (props) {
    console.log('airnow props',props)
    
    if (props.state.plotsToDisplay.includes('airnow'))
    return(
        props.state.riskData?
        <Col style={{borderRadius:5, border:'1px solid rgba(0, 0, 0, 0.1)', padding:20,
        backgroundColor:'white',}}>
             <ScatterComponent
                 name="AIRNOW"
                 width={props.state.airnowwidth}
                 height={props.state.airnowheight}
                 x={props.state.airnowx}
                 y={props.state.airnowy}
                 datax={props.state.riskData.airnow.lon}
                 datay={props.state.riskData.airnow.aqi}
                 text={props.state.riskData.airnow.text}
                 colors={props.state.riskData.airnow.c}
                 xaxis={'Longitude'}
                 yaxis={'AQI'}
                 onPositionChange={(e) =>
                     this.setState({ airnowx: e.x, airnowy: e.y })
                 }
                 onSizeChange={(e) =>
                     this.setState({
                         airnowwidth: e.width,
                         airnowheight: e.height,
                     })
                 }
                 onClick={() =>
                     this.setState({ airnowPlotOn: false })
                 }
             />
        </Col>:null
    )
    else return null
}


export function LidarPlot (props) {
    console.log('getting to LidarPlot')
    if(props.state.plotsToDisplay.includes('lidar'))
    return(
        <Col style={{borderRadius:5, border:'1px solid rgba(0, 0, 0, 0.1)', padding:20,
        backgroundColor:'white',}}>
        {props.state.lidarData &&
         props.state.chosenSite &&
         props.state.cnrPlotOn ? (
             <LidarComponent
                 name=" CNR [DB]"
                 width={props.state.cnrwidth}
                 height={props.state.cnrheight}
                 x={props.state.cnrx}
                 y={props.state.cnry}
                 data={props.state.lidarData[props.state.chosenSite].CNR}
                 site={props.state.chosenSite}
                 onPositionChange={(e) =>
                     this.setState({ cnrx: e.x, cnry: e.y })
                 }
                 onSizeChange={(e) =>
                     this.setState({
                         cnrwidth: e.width,
                         cnrheight: e.height,
                     })
                 }
                 onClick={() => this.setState({ cnrPlotOn: false })}
             />
         ) : null}

         {props.state.lidarData &&
         props.state.chosenSite &&
         props.state.scaPlotOn ? (
             <LidarComponent
                 name=" SCA [m/s]"
                 width={props.state.scawidth}
                 height={props.state.scaheight}
                 x={props.state.scax}
                 y={props.state.scay}
                 data={props.state.lidarData[props.state.chosenSite].SCA}
                 site={props.state.chosenSite}
                 onPositionChange={(e) =>
                     this.setState({ scax: e.x, scay: e.y })
                 }
                 onSizeChange={(e) =>
                     this.setState({
                         scawidth: e.width,
                         scaheight: e.height,
                     })
                 }
                 onClick={() => this.setState({ scaPlotOn: false })}
             />
         ) : null}  
         </Col>
        
    )
    else return null
}
                

const LidarComponent = (props) => {
    console.log('lidarcomp',props)

        return (
                <Plot
                    style={{
                        width: '100%',
                        height: undefined
                    }}
                    data={[
                        {
                            z: props.data.Z,
                            x: props.data.Y,
                            y: props.data.X,
                            type: 'contour',
                            colorscale: 'Jet',
                            line: { width: 0 },
                            colorbar: { thickness: 5 },
                        },
                    ]}
                    useResizeHandler={true}
                    layout={{
                        title: props.site + props.name,
                        
                        xaxis: {
                            title: 'Time [UTC]',
                            ticktext: props.data.Y.filter((e, i) => {
                                return (
                                    i % Math.ceil(props.data.Y.length / 12) ===
                                    0
                                )
                            }),
                            tickvals: props.data.Y.filter((e, i) => {
                                return (
                                    i % Math.ceil(props.data.Y.length / 12) ===
                                    0
                                )
                            }),
                            
                        },
                        yaxis: { automargin: true, title: 'Range [m]' },
                        margin: {
                            r: 0,
                            t: 30,
                            pad: 0,
                        },
                        //                                     paper_bgcolor: 'rgba(0,0,0,0)',
                    }}
                />

        )
    }

const ScatterComponent = (props) => {
        console.log('scatter', props)

        return (
                <Plot
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    data={[
                        {
                            x: props.datax,
                            y: props.datay,
                            type: 'scatter',
                            text: props.text,
                            textposition: 'center',
                            line: { width: 0 },
                            marker: {
                                size: 10,
                                color: props.colors,
                                line: { width: 1, color: 'grey' },
                            },
                            text: props.text,
                        },
                    ]}
                    useResizeHandler={true}
                    layout={{
                        title: props.name,
                        autosize: true,
                        width: undefined,
                        height: undefined,
                        xaxis: { title: props.xaxis },
                        yaxis: { title: props.yaxis },
                        margin: {
                            r: 0,
                            t: 30,
                            pad: 0,
                        },
                        //                                     paper_bgcolor: 'rgba(0,0,0,0)',
                    }}
                />

        )
    }

