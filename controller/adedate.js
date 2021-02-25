/**
 * @summary Returns n days from today using the current moment 
 * @description 
 * @param{String} n
 * @return[Date] myDdate
 */
const daysFromToday = n => {
    let today = new Date() , 
    nDaysAfter = today.getDate() + n 
    today.setDate(nDaysAfter)
    let year = today.getFullYear()  
    let month = String(today.getMonth() + 1).length > 1 
        ? 
        parseInt(today.getMonth() + 1) 
        : '0' + parseInt(today.getMonth() + 1),
        
    date  = String(today.getDate() ).length > 1 ? today.getDate() 
        : '0' + today.getDate() , 
    hours  = String(today.getHours() ).length > 1 ? today.getHours() 
    : '0' + today.getHours()   , 
    minutes = String(today.getMinutes() ).length > 1 ? today.getMinutes() 
    : '0' + today.getMinutes()   , 
    seconds = String(today.getSeconds() ).length > 1 ? today.getSeconds() 
    : '0' + today.getSeconds() 
    let params = `${year} ${month} ${date} ${hours}:${minutes}:${seconds} GMT+1`	
    let myDate  = new Date(params) 
    return myDate
} 
module.exports = daysFromToday