import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';



export function getRiskLegend(state,handleChange){
    console.log('risklegend',state, handleChange)
    return(
        <div style={{width:'100%'}}>
        {state.cbHover ? (
            <div
                style={{
                    backgroundColor:'rgba(255,255,255,0.8)',
                    borderRadius: 5,
                    border:'1px solid rgba(160,160,160,0.8)',
                    padding: 5,
                    position: 'absolute',
                    top: state.cbHoverValue.loc.y,
                    left: state.cbHoverValue.loc.x,
                }}
            >
                <a style={{ fontSize: 10 }}>
                    {state.cbHoverValue.value}
                </a>
            </div>
        ) : null}

        {state.rawData &&
        state.rawData.data_risk ? (
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >

                    {Object.keys(
                        state.rawData.risk_colors
                    ).map((k, i) => (
                        <div
                            key={'riskColors' + k}
                            onMouseEnter={(e) => {
                                handleChange({
                                    cbHover: true,
                                    cbHoverValue: {
                                        value: state.rawData.risk_colors[k].toFixed(0).toString(),
                                        loc: {x: e.pageX,y: e.pageY - 40,},
                                    },
                                })
                            }}
                            onMouseLeave={(e) =>
                                handleChange({
                                    cbHover: false,
                                })
                            }
                            style={{
                                backgroundColor: k,
                                border:
                                    '1px solid rgba(160,160,160,0.5)',
                                flex:1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                style={{
                                    color: 'rgba(0,0,0,0)',
                                    textAlign: 'center',
                                }}
                            >
                                {'0'}
                            </a>
                        </div>
                    ))}

            </div>
        ) : null}
        {state.rawData &&
        state.rawData.data_risk ? (
            <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
        
                    {Object.keys(
                        state.rawData.risk_colors
                    ).map((k, i) => (
                        <div
                            key={state.rawData.risk_colors[
                                k
                            ]
                                .toFixed(1)
                                .toString()}
                            style={{
                                width: '2.5%',
                                justifyContent: 'center',
                            }}
                        >
                            <a style={{ fontSize: 10 }}>
                                {i % 4 === 0
                                    ? state.rawData.risk_colors[
                                          k
                                      ].toFixed(1)
                                    : null}
                            </a>
                        </div>
                    ))}
            </div>
            <div>Risk Count</div>
            </div>
        ) : null}
        </div>
    )
}

export function getAirnowLegend(state){
    if(state.Airnowon && state.airnowData){
        return (
            <div style={{alignItems:'center',position:'absolute',right:30,margin:5}}>
                <Row style={{}}>
                    <Col md={'auto'} style={{ backgroundColor: 'rgb(0,228,0)',borderRadius: 5, 
                                            lineHeight:'10px'}}>
                        <a style={{ fontSize: 10, }}>Good</a>
                    </Col>
                    <Col md={'auto'} style={{ backgroundColor: 'rgb(255,255,0)',borderRadius: 5,lineHeight:'10px'}}>
                        <a style={{ fontSize: 10,}}>Moderate</a>
                    </Col>
                    <Col md={'auto'} style={{backgroundColor:'rgb(255,126,0)',borderRadius: 5,lineHeight:'10px'}}>
                        <a style={{ fontSize: 10, color: 'white', padding:0}}>Unhealthy<br/>Sensitive<br/>Groups</a>
                    </Col>
                    <Col md={'auto'} style={{ backgroundColor: 'rgb(255,0,0)', borderRadius: 5,lineHeight:'10px'}}>
                        <a style={{ fontSize: 10, color: 'white'}}>Unhealthy</a>
                    </Col>
                    <Col md={'auto'} style={{ backgroundColor:'rgb(143,63,151)',borderRadius: 5,lineHeight:'10px'}}>
                        <a style={{ fontSize: 10, color: 'white', }}>Very<br/>Unhealthy</a>
                    </Col>
                    <Col md={'auto'} style={{ backgroundColor: 'rgb(126,0,35)', borderRadius: 5,lineHeight:'10px'}}>
                        <a style={{fontSize: 10,color: 'white',}}>Hazardous</a>
                    </Col>
                </Row>
            </div>
        )
    }else return null
    
}