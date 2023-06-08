import moment from 'moment';
export const years = ['2022']
export const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export const hours = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
]

export const res = [
    '0.01',
    '0.025',
    '0.05',
    '0.1',
    '0.5',
    '0.75',
    '1.0',
    '2.0',
]

export const state = {
    width: 0,
    height: 0,
    lidarWidth: 0,
    lng: -77.093,
    lat: 43.3802,
    mapBounds: null,
    fitBounds: [[-80, 40.1], [-71.5, 45.2]],//southwest (min,min) -> northeast (max,max)
    zoom: 4.5,
    map_realtime: false,
    map_forecast: false,
    clicked: true,
    geoJsonWind: null,
    Windlen: 0,
    Windkeys: null,
    openLayers: false,
    AODon: false,
    AODclick48S: false,
    AODclick48J: false,
    AODclick36: false,
    Windon: false,
    Airnowon: false,
    Lidaron: false,
    play: 0,
    mouseMoveLL: { lng: -77.093, lat: 43.3802 },
    mouseMoveWS: null,
    mouseMoveWD: null,
    mouseMoveGoesSmoke: null,
    mouseMoveGoesDust: null,
    mouseMovePM: null,
    mouseMoveRiskBox: null,
    year: new Date(moment().subtract(1, 'hours')).getUTCFullYear().toString(),
    month: months[new Date(moment().subtract(1, 'hours')).getUTCMonth()],
    day: ('0' + new Date(moment().subtract(1, 'hours')).getUTCDate().toString()).slice(-2),
    hour: ('0' + new Date(moment().subtract(1, 'hours')).getUTCHours().toString()).slice(-2),
    daytime: false,
    res: '0.5',
    completeTime: null,
    mapTime: null,
    rawData: null,
    airnowData: null,
    airnow24hr: null,
    aod_adp_timeseries: null,
    goesDataDust: null,
    dustDB: null,
    GOESd: false,
    GOESs: false,
    GOESa: false,
    goesDataSmoke: null,
    goesDataAOD: null,
    smokeCB: null,
    viirsData36: null,
    viirsData48J: null,
    viirsData48S: null,
    viirsObj: null,
    viirsObjnow: null,
    viirsTimeNow: '',
    aodCB36: null,
    aodCB48J: null,
    aodCB48S: null,
    aodCBValSave: null,
    riskData: null,
    vizSize: { width: 0, height: 0 },
    riskClick: false,
    riskHighlight: null,
    riskChecked: false,
    vizReady: false,
    fetching: '',
    fetchData: true,
    cbHover: false,
    cbHoverValue: null,
    lidarData: null,
    lidarSites: null,
    chosenSite: null,
    lidarRes: '5',
    plotsToDisplay: [],
    airnowPopup: false,
    airnowLoc: null,
    airnowPopupProps: null,
    wrfChem: null,
    wrfChecked: false,
    wrfObjnow: null,
    o3Checked: false,
    pmChecked: false,
    wrfTimeNow: '',
    pauseLoc: null,
    fcstPlay: true,
};

export const airnowShapes = { '1': 'circle', '2': 'diamond', '3': 'star-triangle-up', '4': 'square', '5': 'pentagon', '6': 'hexagon-open', '7': 'star', '8': 'bowtie', '9': 'hourglass' };

//https://www.nycwatershed.org/wp-content/uploads/2015/10/DEC_Regional_Offices_Contact_Info_Map.pdf
export const airnowSites = {
    'Tonawanda II': { 'lat': 42.998136, 'lon': -78.899312, 'region': 9 },
    'Amherst': { 'lat': 42.99328, 'lon': -78.7715, 'region': 9 },
    'Buffalo Near-road': { 'lat': 42.92111, 'lon': -78.76611, 'region': 9 },
    'Buffalo': { 'lat': 42.876951, 'lon': -78.809743, 'region': 9 },
    'Grand Island Blvd': { 'lat': 42.988286, 'lon': -78.918465, 'region': 9 },
    'Rochester': { 'lat': 43.14618, 'lon': -77.54817, 'region': 8 },
    'Rochester Near-road': { 'lat': 43.145021, 'lon': -77.557608, 'region': 8 },
    'Pinnacle State Park': { 'lat': 42.091154, 'lon': -77.209883, 'region': 8 },
    'East Syracuse': { 'lat': 43.0523, 'lon': -76.05921, 'region': 7 },
    'E Syracuse': { 'lat': 43.0523, 'lon': -76.05921, 'region': 7 },
    'Utica': { 'lat': 43.098908, 'lon': -75.22507, 'region': 6 },
    'Whiteface Mtn': { 'lat': 44.393136, 'lon': -73.858953, 'region': 5 },
    'Albany County HD': { 'lat': 42.642253, 'lon': -73.754576, 'region': 4 },
    'Rockland Cty': { 'lat': 41.182101, 'lon': -74.028167, 'region': 3 },
    'Albany': { 'lat': 42.6425, 'lon': -73.7547, 'region': 4 },
    'Newburgh': { 'lat': 41.49918, 'lon': -74.008886, 'region': 3 },
    'White Plains': { 'lat': 41.051896, 'lon': -73.763648, 'region': 3 },
    'Manhattan/IS143': { 'lat': 40.848913, 'lon': -73.930604, 'region': 2 },
    'Morrisania': { 'lat': 40.8367, 'lon': -73.9214, 'region': 2 },
    'Bronx - IS52': { 'lat': 40.816, 'lon': -73.902, 'region': 2 },
    'Bronx - IS74': { 'lat': 40.816, 'lon': -73.902, 'region': 2 },
    'CCNY': { 'lat': 40.819732, 'lon': -73.948239, 'region': 2 },
    'PS 274': { 'lat': 40.69454, 'lon': -73.92769, 'region': 2 },
    'Division Street': { 'lat': 40.714454, 'lon': -73.995206, 'region': 2 },
    'Fresh Kills': { 'lat': 40.580254, 'lon': -74.198295, 'region': 2 },
    'Maspeth': { 'lat': 40.72698, 'lon': -73.89312, 'region': 2 },
    'Port Richmond': { 'lat': 40.63306, 'lon': -74.137156, 'region': 2 },
    'PS 19': { 'lat': 40.730043, 'lon': -73.98445, 'region': 2 },
    'Bklyn - PS 314': { 'lat': 40.64182, 'lon': -74.01871, 'region': 2 },
    'Bklyn - PS274': { 'lat': 40.64182, 'lon': -74.01871, 'region': 2 },
    'JHS 126': { 'lat': 40.71961, 'lon': -73.94771, 'region': 2 },
    'Queens': { 'lat': 40.7375, 'lon': -73.8244, 'region': 2 },
    'Queens College': { 'lat': 40.73614, 'lon': -73.82153, 'region': 2 },
    'Queens Near-road': { 'lat': 40.739264, 'lon': -73.817694, 'region': 2 },
    'Eisenhower Park': { 'lat': 40.743156, 'lon': -73.585513, 'region': 1 },
    'Suffolk County': { 'lat': 40.828022, 'lon': -73.057548, 'region': 1 },
    'Holtsville': { 'lat': 40.8278, 'lon': -73.0575, 'region': 1 }
}

