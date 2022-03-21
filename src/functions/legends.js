import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import dustCB from '../images/dust_colorbar_h.png';
import smokeCB from '../images/smoke_colorbar_h.png';
import aodCB from '../images/aod_colorbar_h.png';



export function getLegend(props) {
    return (
        <div
            style={{
                position: 'absolute',
                opacity: 0.8,
                   width: 'undefined',
                top: 0,
                margin: 10,
                padding: 10,
                backgroundColor: 'grey',
                borderWidth: 5,
                borderRadius: 5,
            }}
        >
            <Col >
                <Row>
                    <a style={{ color: 'white' }}>
                        Lon: {Math.round(props.mouseMoveLL.lng * 10) / 10}
                    </a>
                </Row>
                <Row >
                    <a style={{ color: 'white' }}>
                        Lat: {Math.round(props.mouseMoveLL.lat * 10) / 10}
                    </a>
                </Row>
                    
            </Col>
            
            {props.Windon && props.mouseMoveWS ? (
                <Row style={{ paddingLeft: 20 }}>
                    <a style={{ color: 'white' }}>
                        Wind: {props.mouseMoveWD} at{' '}
                        {Math.round(props.mouseMoveWS * 100) / 100} m
                        s⁻¹
                    </a>
                </Row>
            ) : null}
            {props.Airnowon && props.mouseMovePM ? (
                <Row style={{ paddingLeft: 20 }}>
                    <a style={{ color: 'white' }}>
                        PM2.5: {props.mouseMovePM} μg m⁻³
                    </a>
                </Row>
            ) : null}
            {props.mouseMoveGoesDust ? (
                <Row style={{ paddingLeft: 20 }}>
                    <a style={{ color: 'white' }}>GOES Dust Detected</a>
                </Row>
            ) : null}
            {props.mouseMoveGoesSmoke ? (
                <Row style={{ paddingLeft: 20 }}>
                    <a style={{ color: 'white' }}>GOES Smoke Detected</a>
                </Row>
            ) : null}
            {props.mouseMoveRiskBox ? (
                <Row style={{ paddingLeft: 20 }}>
                    <a style={{ color: 'white' }}>
                        Risk Data Count: {props.mouseMoveRiskBox}
                    </a>
                </Row>
            ) : null}
        </div>
    )
}


export function getAODCB(cb, name) {
    return (
        <Row style={{width:'100%',justifyContent:'center'}}>
                <Col className='col-12' style={{alignItems:'center'}}>
                    <a style={{color: 'black',marginRight: 5,}}>{name} </a>
                </Col>
                {Object.keys(cb).map((k, i) => (
                    <Col 
                        key={'AODcb' + k}
                        style={{
                            backgroundColor: k,
                            border: '1px solid rgba(160,160,160,0.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width:100/Object.keys(cb).length+'%',
                            padding:0
                        }}
                    >
                        <a style={{color:'rgba(0,0,0,0)',display:'block'}}>{cb[k]}</a>
                    </Col>
                ))}
                {Object.keys(cb).map((k, i) => (
                    <Col 
                        key={'AODcb' + k}
                        style={{
                            backgroundColor: 'rgba(0,0,0,0)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width:100/Object.keys(cb).length+'%',
                            padding:0,
                            transform: "rotate(90deg)"
                        }}
                    >
                        <a style={{color:'black',display:'block'}}>
                            {Math.round(cb[k],0)}</a>
                    </Col>
                ))}
        </Row>
    )
}
export function getRiskLegend(state,handleChange){
    console.log('risklegend',state, handleChange)
    return(
        state.rawData && state.rawData.data_risk && state.riskChecked?
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
            </div>:null

    )
}

function airnowTrace(title,color){
    return(
        <Col style={{borderStyle:'solid',borderWidth:1,borderColor:'rgb(200,200,200)',
        display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Row style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Col>
                    <Row style={{display:'flex',justifyContent:'center'}}>
                        <div style={{display:'flex',width:'10px',height:'10px',
                                    backgroundColor:color,borderRadius: '50%',
                                    margin:2,border:'1px',borderColor:'rgb(100,100,100)',
                                    borderStyle:'solid'
                                   }}/>
                    </Row>
                    <Row style={{display:'flex',justifyContent:'center'}}>
                        <a style={{ fontSize: 14, }}>{title}</a>
                    </Row>
                </Col>
            </Row>
        </Col>
    
    )
}

export function getAirnowLegend(state){
    if(state.Airnowon && state.airnowData){
        return (
            <Row style={{width:'100%'}}>
                {airnowTrace('Good','rgb(0,228,0)')}
                {airnowTrace('Moderate','rgb(255,255,0)')}
                {airnowTrace('Unhealthy Sensitive Groups','rgb(255,126,0)')}
                {airnowTrace('Unhealthy','rgb(255,0,0)')}
                {airnowTrace('Very Unhealthy','rgb(143,63,151)')}
                {airnowTrace('Hazardous','rgb(126,0,35)')}
            </Row>
        )
    }else return null
    
}


export function getGOESCB(props) {
    console.log('AODCD',props)
    return (
        <Row style={{width:'100%', justifyContent:'center'}}>
            {props.GOESd?
                <Col style={{display:'flex',
                            alignItems:'center',
                            justifyContent:'center'}}>
                    <img src={dustCB} style={{width:'120px'}}/>
                </Col>:null}

            {props.GOESa?
                <Col style={{display:'flex',
                            alignItems:'center',
                            justifyContent:'center'}}>
                    <img src={aodCB} style={{width:'250px'}}/>
                </Col>:null}
            {props.GOESs?
                <Col style={{display:'flex',
                            alignItems:'center',
                            justifyContent:'center'}}>
                    <img src={smokeCB} style={{width:'120px'}}/>
                </Col>:null}
            
        </Row>
    )
}

export function getCB(cb, color, name) {
    return (
        <div style={{ width: '100%', justifyContent: 'center' }}>
            <div style={{ marginLeft: 10, justifyContent: 'flex-start', alignItems: 'center'}}>
                {Object.keys(cb).sort((a, b) => a[1] - b[1]).map((k, i) => (
                        <div key={'cb' + k}
                            style={{ backgroundColor: k, border: '1px solid rgba(160,160,160,0.5)',
                                                                 paddingLeft: 10, paddingRight: 10,
                                                                 justifyContent: 'center',alignItems: 'center'}}>
                            <a style={{ color: 'white', textAlign: 'center', fontSize: 10, }}>
                                {cb[k].slice(9, 11) + ':' + cb[k].slice(11, 13)}
                            </a>
                        </div>
                    ))}
                <a style={{ color: color, marginLeft: 5, fontSize: 10 }}>
                    {name}
                </a>
            </div>
        </div>
    )
}