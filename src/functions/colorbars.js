import * as React from 'react';
import { Container, Row, Col } from 'reactstrap'



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
                        <a style={{display:'block'}}>{cb[k]}</a>
                    </Col>
                ))}
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


