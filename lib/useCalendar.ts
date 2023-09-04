import { CalendarSchema } from "../CalendarSchema";
import { getDate } from "./useTime";

const setPositionElements = () => {
    const dates = CalendarSchema.dateArray;
    const calendars = CalendarSchema.calendars;

    dates.forEach(date => {
        calendars.forEach(calendar => {
            const events = CalendarSchema.data?.filter(e => getDate(e.datetime) === getDate(date) && e.calendar === calendar);
            const sameEventsArray : setData[][] = [];
            events?.forEach(event => {
                const y1 = event.y1
                const y2 = event.y2
                if(y1 && y2){
                    const same_Events = events.filter(e => e.y1 === y1 || y1 < (e.y2 ? e.y2 : 0) && y2 > (e.y1 ? e.y1 : 100000) );
                    same_Events.sort((a, b) => ((a.height ? a.height : 0) > (b.height ? b.height : 0)) ? 1 : -1).reverse()
                    sameEventsArray.push(same_Events)
                }
            });  

            sameEventsArray.sort((a, b) => (a.length > b.length) ? 1 : -1);
            sameEventsArray.forEach(element => {
                element.forEach((e, i) => {
                    e.width = 100 / element.length
                    e.left = (100 / element.length) * i
                });
            });

        });
    });

}


export {
    setPositionElements
}