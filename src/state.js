import moment from 'moment';
export const years = ['2020', '2021', '2022']
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
    zoom: 4.5,
    clicked: true,
    geoJsonWind: null,
    Windlen: 0,
    Windkeys: null,
    openLayers: false,
    AODon: false,
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
    year: new Date(moment().subtract(1, 'days'))
        .getUTCFullYear()
        .toString(),
    month: months[new Date(moment().subtract(1, 'days')).getUTCMonth()],
    day: new Date(moment().subtract(1, 'days')).getUTCDate().toString(),
    hour: new Date(moment().subtract(1, 'days'))
        .getUTCHours()
        .toString(),
    res: '0.5',
    completeTime: null,
    rawData: null,
    airnowData: null,
    goesDataDust: null,
    dustDB: null,
    GOESon: false,
    goesDataSmoke: null,
    smokeCB: null,
    viirsData36: null,
    viirsData48J: null,
    viirsData48S: null,
    aodCB36: null,
    aodCB48J: null,
    aodCB48S: null,
    aodCBValSave: null,
    riskData: null,
    vizSize: { width: 0, height: 0 },
    riskClick: false,
    riskHighlight: null,
    vizReady: false,
    fetching: '',
    fetchData:true,
    cbHover: false,
    cbHoverValue: null,
    lidarData: null,
    lidarSites: null,
    chosenSite: null,
    lidarRes:'10',
    plotsToDisplay: [],
    plotsToDisplayTemp: null
};