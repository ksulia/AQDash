import * as React from 'react';
import Plot from 'react-plotly.js'
import { Container, Row, Col } from 'react-bootstrap';



export function GoesPlot (props) {
//     console.log('goes!',props)
    let times = [], aod = [], dust = [], smoke = []
    if(props.state.rawData && props.state.rawData.aod_adp_timeseries){
        Object.entries(props.state.rawData.aod_adp_timeseries).map((e)=>{
            times.push(e[0])
            aod.push(e[1].aod_avg)
            smoke.push(e[1].smoke_count)
            dust.push(e[1].dust_count)
        })
    }
    
//     console.log(times,aod,dust,smoke)
    let data = []
    if(props.state.GOESa) data.push({x:times,y:aod,type:'line',line:{width:2,color:'blue'},name:'AOD'})
    if(props.state.GOESs) data.push({x:times,y:smoke,type:'line',line:{width:2,color:'black'},name:'Smoke',yaxis:'y2',})
    if(props.state.GOESd) data.push({x:times,y:dust,type:'line',line:{width:2,color:'orange'},name:'Dust',yaxis:'y2',})
    
    if(props.state.plotsToDisplay.includes('goes'))
    return( 
                <Col style={{borderRadius:5, border:'1px solid rgba(0, 0, 0, 0.1)',
                                                  padding:20,backgroundColor:'white'}}>
                    <Plot
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        data={data}
                        useResizeHandler={true}
                        layout={{
                            title: 'GOES',
                            autosize: true,
                            width: undefined,
                            height: undefined,
                            xaxis: { title: 'Time [UTC]' },
                            yaxis: { title: 'Domain Average AOD' },
                            yaxis2: {
                                title: 'Dust/Smoke Count',
                                overlaying: 'y',
                                side: 'right'
                              },
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
                 datax={props.state.riskData.airnow.lon}
                 datay={props.state.riskData.airnow.aqi}
                 text={props.state.riskData.airnow.text}
                 colors={props.state.riskData.airnow.c}
                 xaxis={'Longitude'}
                 yaxis={'AQI'}
             />
        </Col>:null
    )
    else return null
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function AirnowPlot24hr (props) {
    if (props.state.plotsToDisplay.includes('airnow24hr')){
//         console.log('airnow24 props',props.state.airnow24hr)

        let names = {'#00e400':'Good','#ffff00':'Moderate',
                     '#ff7e00':'Unhealthy Sensitive Groups',
                     '#ff0000':'Unhealthy','#8f3f97':'Very Unhealthy',
                     '#7e0023':'Hazardous'}

        let lats = [], colors = [], utc = [], aqi = [];
        let plot_by_color = {}
        Object.keys(props.state.airnow24hr).map((k)=>{
            let features = props.state.airnow24hr[k]
            features.map((f)=>{
                let temp_obj;
                if(f.properties.color in plot_by_color){
                    temp_obj = plot_by_color[f.properties.color]
                    temp_obj['lats'].push(f.geometry.coordinates[1])
                    temp_obj['colors'].push(f.properties.color)
                    temp_obj['utc'].push(f.properties.UTC)
                    temp_obj['aqi'].push(f.properties.AQI)
                }else{
                    temp_obj = plot_by_color[f.properties.color]={
                        'lats':[f.geometry.coordinates[1]],
                        'colors':[f.properties.color],
                        'utc':[f.properties.UTC],
                        'aqi':[f.properties.AQI]
                    }
                }
                plot_by_color[f.properties.color] = temp_obj

            })
        })

//         console.log('plot_by_color',plot_by_color)
        let all_data = []
        Object.keys(plot_by_color).map((c)=>{
            all_data.push({
                x: plot_by_color[c]['utc'],
                y: plot_by_color[c]['lats'],
                type: 'scatter',
    //             text: props.text,
                textposition: 'center',
                line: { width: 0 },
                marker: {
                    size: 10,
                    color: c,
                    line: { width: 1, color: 'grey' },
                },
                mode:'markers',
                name:names[c]
            })
        })

        return(
            props.state.airnow24hr?
            <Col style={{borderRadius:5, border:'1px solid rgba(0, 0, 0, 0.1)', padding:20,
            backgroundColor:'white',}}>
                <Plot
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    data={all_data}
                    useResizeHandler={true}
                    layout={{
                        title: props.name,
                        autosize: true,
                        width: undefined,
                        height: undefined,
                        xaxis: { title: 'Time' },
                        yaxis: { title: "Latitude" },
                        margin: {
                            r: 0,
                            t: 30,
                            pad: 0,
                        },
                        legend: {orientation:"h",y:1}
                    }}
                />

            </Col>:null
        )}
        else return null
}


export function LidarPlotSca (props) {
//     console.log('getting to LidarPlot')
    if(props.state.plotsToDisplay.includes('lidar'))
        return(
            props.state.Lidaron && props.state.lidarData && 
            props.state.chosenSite && props.state.scaPlotOn?
                <Col style={{borderRadius:5, border:'1px solid rgba(0, 0, 0, 0.1)', padding:20,
                    backgroundColor:'white',}}>
                    <LidarComponent
                        name=" Backscatter [1/(m sr)]"
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
                        onClick={() => this.setState({ scaPlotOn: false })}/>
                </Col>:null
        )
    else return null
}

export function LidarPlotCnr (props) {
//     console.log('getting to LidarPlot')
    if(props.state.plotsToDisplay.includes('lidar'))
        return(
            props.state.Lidaron && props.state.lidarData && 
            props.state.chosenSite && props.state.cnrPlotOn?
                <Col style={{borderRadius:5, border:'1px solid rgba(0, 0, 0, 0.1)', padding:20,
                backgroundColor:'white',}}>
                     <LidarComponent
                         name=" CNR [dB]"
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
                 </Col>:null
        )
    else return null
}
                

const LidarComponent = (props) => {
    console.log('lidarcomp',props)
    let cscale = 'Jet', cbar = {thickness: 20};
    if (props.name.includes('CNR')){
        cscale = [['0.0', 'rgb(58,84,176)'],
                  ['0.135', 'rgb(79,118,234)'],
                  ['0.136', 'rgb(3,99,30,255)'],
                  ['0.42', 'rgb(79,245,69)'],
                  ['0.43', 'rgb(253,247,39)'],
                  ['0.855', 'rgb(188,1,0)'],
                  ['0.856', 'rgb(230,5,202)'],
                  ['1.0', 'rgb(253,132,250)']
                ]
        cbar = { thickness: 20, tickmode: 'array',cmin:-100,
                tickvals:[-30,-25,-20,-15,-10,-5,0,5],
                ticktext:['-30','-25','-20','-15','-10','-5','0','5']
               }
    }

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
                            type: 'heatmap',
                            colorscale: cscale,
                            colorbar: cbar
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
    console.log('scatter', props,props.datax.slice(0,10))
    props.colors.slice(1,10).map((lat)=>{
        console.log('lat',Math.round(lat*10)/10)
    })
    

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
                        type: 'violin',
                        text: props.text,
                        textposition: 'center',
                        line: { width: 0 },
                        marker: {
                            size: 10,
                            color: props.colors,
                            line: { width: 1, color: 'grey' },
                        },
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

