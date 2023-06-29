export const exportToCsv = (e, csv, time) => {
    console.log('exportToCsv', e, csv)
    e.preventDefault()

    // Headers for each column
    let headers = ['STN,YYMMDD/HHMM,OZCN,PM25,8hr_OZ_AVE,24hr_PM25_AVE']

    // Convert users data to a csv
    let usersCsv = csv.csv.reduce((acc, user) => {
        acc.push(Object.values(user).join(','))
        return acc
    }, [])


    downloadFile({
        data: [...headers, ...usersCsv].join('\n'),
        fileName: `Wx-AQ_${time.slice(0, -3)}.csv`,
        fileType: 'text/csv',
    })
}

export const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })

    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}