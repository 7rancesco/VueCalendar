const timeToPixel = (date : string) => {
    const jsDate = new Date(date);
    const hours = jsDate.getHours() * 10;
    const minutes = (10 / 60) * jsDate.getMinutes();
    return hours + minutes;
}

function setNumber(n : number){
    if(n < 10){
        return `0${n}`
    } return n
}

function getMonthNumber(n : number){
    let month = n + 1;
    return setNumber(month)
}

const getDate = (date : string) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${getMonthNumber(d.getMonth())}-${setNumber(d.getDate())}`
}

//const setDate () => string to JS
export {
    timeToPixel,
    getDate
}