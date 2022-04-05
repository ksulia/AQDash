import {redMap, blueMap, greenMap} from './colorMaps.js';
let cbMax = 501, cbMin = 0;

export default async function fetchData(state,handleChange) {
    console.log('fetch data!',state,handleChange)
    
    let setStates = {
            fetching: 'Fetching data, please wait...',
            airnowData: null,
            airnow24hr: null,
            lidarData: null,
            lidarSites: null,
            goesDataDust: null,
            goesDataSmoke: null,
            goesDataAOD: null,
            dustCB: null,
            smokeCB: null,
            viirsData36: null,
            viirsData48J: null,
            viirsData48S: null,
            viirsObj: null,
            viirsObjnow: { type: 'FeatureCollection', features: [] },
            viirsTimeNow: '',
            aodCB36: null,
            aodCB48J: null,
            aodCB48S: null,
            riskHighlight: false,
            riskData: null,
            rawData: null,
//             AODon: false,
//             GOESd: false,
//             GOESs: false,
//             GOESa: false,
//             Airnowon: false,
//             Lidaron: false,
            plotsToDisplay: [],
        };

//     Object.keys(setStates).map(k=>{
//         handleChange(k,setStates[k])
//     });
    
    handleChange(setStates)
    
    console.log('fetch2',state.fetchData,state.completeTime,state.res)

    let fetching = 'Fetching data, please wait...';
    let smokeCB = {},dustCB = {};
    let airnowData = null,goesDataDust = null, goesDataAOD = null, lidarData = null;
    let goesDataSmoke = null,dustDB = null, viirsData36 = null, lidarSites = null;
    let viirsData48J = null, viirsData48S = null, viirsTimeNow = '';
    let viirsObj = null, viirsObjnow = { type: 'FeatureCollection', features: [] };
    let aodCB36 = null, aodCB48J = null, aodCB48S = null;
    let riskHighlight = false, riskData = null, rawData = null;
    let AODon = false, Airnowon = false, Lidaron = false;
    let airnow24hr = {}
    
    
    
    
    await fetch(`http://169.226.68.133:3005/api?time=${state.completeTime}&res=${state.res}&lidarRes=${state.lidarRes}`)
//     await fetch(`https://xcitedb.asrc.albany.edu/api?time=${state.completeTime}&res=${state.res}&lidarRes=${state.lidarRes}`)
    .then(async (response) => await response.json())
    .then(async (responseJson) => rawData = responseJson) //setState
    .then(async () => {
        console.log('here', rawData)

        if (rawData && rawData.status === 0) {
            console.log('here1')
//             if (rawData.data_risk && rawData.data_risk.features){
//                 Object.entries(rawData.data_risk.features).map((e)=>{
//                     if(e[1].properties.data.length>0){
// //                         console.log('feature1',e[1].properties.data)
//                         Object.entries(e[1].properties.data).map((e1)=>{
// //                             console.log(e1[1].props)
//                             if(Object.keys(e1[1].props).includes('aod_avg')){
//                                 console.log('aod_avg',e1[1])
//                             }
//                         })
//                     }
//                 })
//             }
            
            
            
            Object.keys(rawData.data).map((k) => {
                console.log('here2', k)
                if (k.includes('airnow_pm2.5')) {
                    console.log( 'airnowpm1', k, rawData.data[k] )
                    airnowData = rawData.data[k] //setState
                    console.log( 'airnowpm2', k, rawData.data[k] )
                } else if (k.includes('airnow_24hr')){
                    console.log('airnow_24hr',rawData.data[k].features)
                    rawData.data[k].features.map((an)=>{
                        let airnow_time = an.properties.UTC
                        if(!(airnow_time in airnow24hr)) airnow24hr[airnow_time]=[]
                        airnow24hr[airnow_time].push(an)
                    })
                } else if (k.includes('GOES_ADP')) {
                    console.log('GOES_ADP', k, rawData.data[k])
//                     if (rawData.data[k].smoke) {
//                         rawData.data[k].smoke.features.map(
//                             (s) => {
//                                 smokeCB[s.properties.color] =
//                                     s.properties.start
//                             }
//                         )
//                     }
//                     if (rawData.data[k].dust) {
//                         rawData.data[k].dust.features.map(
//                             (s) => {
//                                 dustCB[s.properties.color] =
//                                     s.properties.start
//                             }
//                         )
//                     }
                    goesDataSmoke = JSON.parse(rawData.data[k].smoke) //setState
                    goesDataDust = JSON.parse(rawData.data[k].dust) //setState
//                     goesDataSmoke = rawData.timeseries_data.smoke //setState
//                     goesDataDust =rawData.timeseries_data.dust //setState
//                     smokeCB = smokeCB //setState
//                     dustCB = dustCB //setState
                    
                    console.log('GOES2', k, goesDataSmoke)
                } else if (k.includes('GOES_AOD')) {
//                     console.log('GOES_AOD', k, rawData.timeseries_data.aod)
                    goesDataAOD = JSON.parse(rawData.data[k])
//                     goesDataAOD = rawData.timeseries_data.aod
                    
                
                   
                    
                } else if (k.includes('VIIRSaerosolEntHRS') &&Object.keys(rawData.data[k]).length > 0) {
                    console.log('VIIRSEnt1',k,rawData.data[k])
                    let x = remapColorBar(redMap,rawData.data[k])
                    viirsData36 = x[1] //setState
                    aodCB36 = x[0] //setState
                } else if (k.includes('VIIRSaerosolJ') &&Object.keys(rawData.data[k]).length > 0) {
                    console.log('VIIRSJ1', k,rawData.data[k])
                    let x = remapColorBar(blueMap,rawData.data[k])
                    viirsData48J = x[1] //setState
                    aodCB48J = x[0] //setState
                } else if (k.includes('VIIRSaerosolS') &&Object.keys(rawData.data[k]).length > 0) {
                    console.log( 'VIIRSS1', k,rawData.data[k])
                    let x = remapColorBar(greenMap,rawData.data[k])
                    viirsData48S =x[1] //setState
                    aodCB48S = x[0] //setState
                }
            })
            if (rawData.lidar) {
                console.log('LIDAR1', rawData.lidar)
                let features = []
                Object.entries(rawData.lidar).map((e) => {
                    if (Object.keys(e[1]).length > 0) {
                        //                                 console.log('LIDAR map', e[1])
                        features.push({
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [e[1].LON, e[1].LAT],
                            },
                            properties: {
                                site: e[0],
                            },
                        })
                    }
                })
                let mesonet_sites = {
                    type: 'FeatureCollection',
                    features: features,
                }
                lidarData = rawData.lidar //setState
                lidarSites = mesonet_sites //setState
            
            }
            fetching = 'Fetch successful!'  //setState
            console.log('LIDAR2', rawData.lidar)
        } else {
            rawData = null //setState
            fetching = 'Error fetching data.' //setState
        }
    })
    .then(async () => {
        console.log('HERE IN VIIRS1')
        if (viirsData48S ||viirsData48J ||viirsData36) {
            console.log('HERE IN VIIRS2')
            let keys36 = [], keys48J = [], keys48S = []
            if (viirsData36) keys36 = Object.keys(viirsData36)
            if (viirsData48J) keys48J = Object.keys(viirsData48J)
            if (viirsData48S) keys48S = Object.keys(viirsData48S)

            let viirs_keys = keys36.concat(keys48J).concat(keys48S)
            viirs_keys = [...new Set([...keys36, ...keys48J, ...keys48S]),]
            let viirs_obj = {}
            viirs_keys.forEach((k) => {
                let features36 = [],
                    features48J = [],
                    features48S = []
                if (viirsData36 && k in viirsData36) features36 = viirsData36[k].features
                if (viirsData48J && k in viirsData48J) features48J = viirsData48J[k].features
                if (viirsData48S && k in viirsData48S) features48S = viirsData48S[k].features
                let all_features = features36.concat(features48J).concat(features48S)
                viirs_obj[k] = {
                    type: 'FeatureCollection',
                    features: all_features,
                }
            })
            viirsObj = viirs_obj  //setState
            console.log('viirsObj',viirsObj)
        }
    })
    .catch((e) => console.log(e))
    
    setStates = {
        fetching: fetching,
        airnowData: airnowData,
        airnow24hr: airnow24hr,
        lidarData: lidarData,
        lidarSites: lidarSites,
        goesDataDust: goesDataDust,
        goesDataSmoke: goesDataSmoke,
        goesDataAOD: goesDataAOD,
        dustCB: dustCB,
        smokeCB: smokeCB,
        viirsData36: viirsData36,
        viirsData48J: viirsData48J,
        viirsData48S: viirsData48S,
        viirsObj: viirsObj,
        viirsObjnow: viirsObjnow,
        viirsTimeNow: viirsTimeNow,
        aodCB36: aodCB36,
        aodCB48J: aodCB48J,
        aodCB48S: aodCB48S,
        riskHighlight: riskHighlight,
        riskData: riskData,
        rawData: rawData,
//         AODon: AODon,
//         Airnowon: Airnowon,
//         Lidaron: Lidaron,
    };
    
//     Object.keys(setStates).map(k=>{
//         handleChange(k,setStates[k])
//     });
    handleChange(setStates)

};


function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function remapColorBar(colormap,data){
    let temp_time = Object.keys(data)[0]
    //we need to overwrite the colorbar and pressure data so that it is the 
    //surface value minus the traj pressure level
    let updatedVIIRSObj = {}, aodCB1 = {};
    //first map over the keys in the object, which is time
    Object.keys(data).map((t)=>{
        let newFeatColl = []
        //now need to map through all the features
        let feat = data[t].features
        Object.keys(feat).forEach((f)=>{
            let temp_props = feat[f].properties
            let newCB = []
            temp_props['press_diff'] = 1013.25-temp_props['press']
            colormap.forEach((r)=>{newCB.push(rgbToHex(r[0], r[1], r[2]))})
            temp_props['cb'] = newCB

            let color_index = colormap.length*temp_props['press_diff']/cbMax
            let lowerCBVal = colormap[Math.floor(color_index)]
            let upperCBVal = colormap[Math.ceil(color_index)]
            let weight = color_index - Math.floor(color_index)
            let red = (upperCBVal[0]-lowerCBVal[0])*weight + lowerCBVal[0]
            let green = (upperCBVal[1]-lowerCBVal[1])*weight + lowerCBVal[1]
            let blue = (upperCBVal[2]-lowerCBVal[2])*weight + lowerCBVal[2]
            let hexCode = rgbToHex(Math.round(red,0), 
                                   Math.round(green,0), 
                                   Math.round(blue,0))
            temp_props['color_pres'] = hexCode
            newFeatColl.push({'type':"Feature",
                              'geometry':feat[f].geometry,
                              'properties':temp_props})
        })
        updatedVIIRSObj[t]={'type': "FeatureCollection", 'features': newFeatColl};
    })

    console.log('temp_time', temp_time)
    let minp = cbMin//rawData.data[k][temp_time].features[0].properties.minP
    let maxp = cbMax//rawData.data[k][temp_time].features[0].properties.maxP
//        let cbcolors = rawData.data[k][temp_time].features[0].properties.cb
    let cbcolors = updatedVIIRSObj[temp_time].features[0].properties.cb
    let val = (maxp - minp) / cbcolors.length
//     console.log('COLORS',val,cbcolors,cbcolors.length)
    cbcolors.forEach((c, i) => {
        aodCB1[(minp + val * i).toFixed(2)] = c
    })
//     console.log('aodCB1', aodCB1)
    return [aodCB1,updatedVIIRSObj]
    
}