import { CalendarSchema } from "../CalendarSchema";

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

const jsToDateString = (d : Date) => {
    return `${d.getFullYear()}-${getMonthNumber(d.getMonth())}-${setNumber(d.getDate())}T${setNumber(d.getHours())}:${setNumber(d.getMinutes())}:00`
}

const setDateTimeCalendar = () => {
    const element = CalendarSchema.data?.find(e => e.id === CalendarSchema.eventSelected);
    if (element && CalendarSchema.newEvent) {
        const date = new Date(CalendarSchema.newEvent.datetime);
        date.setHours(CalendarSchema.newEvent.hours);
        date.setMinutes(parseFloat(CalendarSchema.newEvent.minutes));

        element.datetime = jsToDateString(date);

        element.endtime = '';
        if(element.y2 && element.y1){
            const duration = (element.y2 - element.y1) * 6;//in minutes
            date.setMinutes(date.getMinutes() + duration);
            element.endtime = jsToDateString(date);
        }

        element.y1 = timeToPixel(element.datetime),
        element.y2 = timeToPixel(element.endtime),
        element.height = element.y2 - element.y1;

        element.calendar = CalendarSchema.newEvent.calendar;

        if(CalendarSchema.onMoveEvent){
            CalendarSchema.onMoveEvent()
        }
    }
}

export {
    timeToPixel,
    getDate,
    setDateTimeCalendar
}