export default function getRiskData(jsonParse) {
    let index,
        keys = [],
        smoke_array = [],
        smoke_obj = {}
    let dust_array = [],
        dust_obj = {},
        viirs_array = []
    let airnow_array = [],
        airnow_lon = [],
        airnow_aqi = [],
        airnow_color = [],
        airnow_text = []
    console.log('PARSE', jsonParse)
    Object.entries(jsonParse).map((ee) => {
        switch (typeof ee[1].props) {
            case 'object':
                if ('smoke' in ee[1].props) {
                    let end_time = get_date(ee[1].props.smoke.end)
                    let minutes = end_time.getMinutes()
                    let seconds = end_time.getSeconds()
                    let time
                    if (minutes < 10) {
                        if (seconds < 10) time = `0${minutes}:0${seconds}`
                        else time = `0${minutes}:${seconds}`
                    } else {
                        if (seconds < 10) time = `${minutes}:0${seconds}`
                        else time = `${minutes}:${seconds}`
                    }
                    if (time in smoke_obj) {
                        smoke_obj[time] = smoke_obj[time] + 1
                    } else {
                        smoke_obj[time] = 1
                    }
                }
                if ('dust' in ee[1].props) {
                    let end_time = get_date(ee[1].props.dust.end)
                    let minutes = end_time.getMinutes()
                    let seconds = end_time.getSeconds()
                    let time
                    if (minutes < 10) {
                        if (seconds < 10) time = `0${minutes}:0${seconds}`
                        else time = `0${minutes}:${seconds}`
                    } else {
                        if (seconds < 10) time = `${minutes}:0${seconds}`
                        else time = `${minutes}:${seconds}`
                    }
                    if (time in dust_obj) {
                        dust_obj[time] = dust_obj[time] + 1
                    } else {
                        dust_obj[time] = 1
                    }
                }
                if ('airnow' in ee[1].props) {
                    console.log('airnow props', ee[1].props.airnow)
                    let props = ee[1].props.airnow
                    props['lon'] = ee[1].lon
                    //                                     airnow_array.push(props)
                    airnow_lon.push(props['lon'])
                    airnow_aqi.push(props['AQI'])
                    airnow_color.push(props['color'])
                    airnow_text.push(props['value'])
                    //                                     airnow_array.push({
                    //                                         x: [props['lon']],
                    //                                         y: [props['AQI']],
                    //                                         type: 'scatter',
                    //                                         marker: { size:10, color:[props['color']],
                    //                                                  text: [props['value']], line:{width:1,color:'grey'}},
                    //                                     })
                }
                if ('viirs' in ee[1].props) {
                    //                     console.log('VIIRS',v.props.viirs)
                    viirs_array.push(ee[1].props.viirs)
                }
                break
            case 'string':
                break
        }
    })

    let maxVal = 0
    Object.keys(smoke_obj).map((k) => {
        if (!keys.includes(k)) keys.push(k)
    })
    Object.keys(dust_obj).map((k) => {
        if (!keys.includes(k)) keys.push(k)
    })
    keys.sort().forEach((k) => {
        //       console.log(k)
        if (k in smoke_obj) {
            smoke_array.push(smoke_obj[k])
            if (smoke_obj[k] > maxVal) maxVal = smoke_obj[k]
        } else smoke_array.push(0)
        if (k in dust_obj) {
            dust_array.push(dust_obj[k])
            if (dust_obj[k] > maxVal) maxVal = dust_obj[k]
        } else dust_array.push(0)
    })

    return {
        smoke: smoke_array,
        dust: dust_array,
        times: keys.sort(),
        maxVal: maxVal,
        airnow: {
            lon: airnow_lon,
            aqi: airnow_aqi,
            c: airnow_color,
            text: airnow_text,
        },
        viirs: viirs_array,
    }
}


function get_date(el) {
    let yr = el.slice(0, 4)
    let day = el.slice(4, 7)
    let hr = el.slice(7, 9)
    let min = el.slice(9, 11)
    let sec = el.slice(11, 13)
    let ms = el.slice(13, 14)
    let date = new Date(yr, 0, 1, hr, min, sec, ms) // initialize a date in `year-01-01`
    let new_date = new Date(date.setUTCDate(day))
    return new_date // add the number of days
}