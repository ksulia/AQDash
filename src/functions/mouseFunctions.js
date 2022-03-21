import * as React from 'react';
import getRiskData from '../functions/getRiskData.js';




export function _onMouseMove(map, e, props){
    console.log("mouseMove",map, e)
    const features = map.queryRenderedFeatures(e.point)
    _queryFeatures(features,props.handleChange)
    props.handleChange({ mouseMoveLL: e.lngLat })
    //         console.log(features)
}

export function _queryFeatures(f,handleChange) {
    var flag1 = false,
        flag2 = false,
        flag3 = false,
        flag4 = false,
        flag5 = false
    //       console.log("LAYERS",f)
    for (var i = 0; i < f.length; i++) {
        const id = f[i].layer.id
        if (id.includes('symbol')) {
            handleChange({
                mouseMoveWS: f[i].properties.speed,
                mouseMoveWD: this._degToCompass(f[i].properties.dir),
            })
            flag1 = true
        }
        if (id.includes('goessmoke')) {
            handleChange({ mouseMoveGoesSmoke: true })
            flag2 = true
        }
        if (id.includes('goesdust')) {
            handleChange({ mouseMoveGoesDust: true })
            flag3 = true
        }
        if (id.includes('pm2.5')) {
            handleChange({ mouseMovePM: f[i].properties.value })
            flag4 = true
        }
        if (id.includes('risk')) {
            handleChange({ mouseMoveRiskBox: f[i].properties.count })
            flag5 = true
        }
    }
    if (!flag1) handleChange({ mouseMoveWS: null, mouseMoveWD: null })
    if (!flag2) handleChange({ mouseMoveGoesSmoke: null })
    if (!flag3) handleChange({ mouseMoveGoesDust: null })
    if (!flag4) handleChange({ mouseMovePM: null })
    if (!flag5) handleChange({ mouseMoveRiskBox: null })
}

export function _onClick (map, e, props) {
    props.handleChange({ riskClick: false })
       props.handleChange({ riskClick: false })
    const features = map.queryRenderedFeatures(e.point)
    console.log('FEATURES', features)
    for (var i = 0; i < features.length; i++) {
        const id = features[i].layer.id
        if (id.includes('risk')) {
            try {
                console.log('DATA', features[i].properties.data)
                let jsonParse = JSON.parse(features[i].properties.data)
                let riskObj = getRiskData(jsonParse)

                console.log('json parsee', jsonParse, riskObj)

                let lat = jsonParse[0].lat,
                    lon = jsonParse[0].lon,
                    coords
                let array = props.state.rawData.data_risk.features
                for (var j = 0; j < array.length; j++) {
                    coords = array[j].geometry.coordinates
                    let minlon = coords[0][0][0],
                        minlat = coords[0][0][1]
                    let maxlon = coords[0][1][0],
                        maxlat = coords[0][2][1]
                    if (
                        lon >= minlon &&
                        lon <= maxlon &&
                        lat >= minlat &&
                        lat <= maxlat
                    )
                        break
                }

                props.handleChange({
                    riskData: riskObj,
                    riskClick: true,
                    GOESPlotOn: riskObj.times.length > 0 ? true : false,
                    airnowPlotOn:
                        riskObj.airnow.lon.length > 0 ? true : false,
                    viirsPlotOn: riskObj.viirs.length > 0 ? true : false,
                    riskHighlight: {
                        type: 'FeatureCollection',
                        features: [{type: 'Feature', geometry: {type: 'Polygon',coordinates: coords,},properties: {},},],
                    },
                })
            } catch (e) {
                console.warn(e)
            }
        }
    }
//     console.log('onclick', features, this.props.state.riskData)
}

