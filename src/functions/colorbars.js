import * as React from 'react';

export function getAODCB(cb, name) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', justifyContent: 'center' }}>
                <a
                    style={{
                        position: 'absolute',
                        color: 'white',
                        marginRight: 5,
                        fontSize: 10,
                    }}
                >
                    {name}
                </a>
                {Object.keys(cb).map((k, i) => (
                    <div
                        key={'AODcb' + k}
                        style={{
                            backgroundColor: k,
                            border: '1px solid rgba(160,160,160,0.5)',
                            width: '2.5%',
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
                            {cb[k]}
                        </a>
                    </div>
                ))}
            </div>
        </div>
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