import { reactive, watch } from "vue";
import { timeToPixel, jsToDateString } from "./lib/useTime";
import { setPositionElements } from './lib/useCalendar';

interface Data {
    datetime: string,//Date
    endtime: string,
    calendar: string,
    id: number,
    content: string,
    color: string,
    y1?: number,
    y2?: number,
    height?: number,
    width?: number,
    left?: number,
}

interface Calendar {
    columns: number,
    maxColumns: number,
    template: string,
    dateArray: string[],
    calendars: string[],
    calendarsSelection: string[],
    weekNames: string[],
    mounthNames: string[],
    datePickerDayNames: string[],
    datepickerNowLabel: string

    getData?: Function,
    data?: Data[],

    onEventSelected?: Function,
    eventSelected?: number

    onNewEvent?: Function
    newEvent?: {
        datetime: string,
        hours: number,
        minutes: string,
        calendar: string
    }

    onMoveEvent?: Function

    firstLoad: boolean
}

export const CalendarSchema = reactive<Calendar>({
    template : 'Index',
    columns : 1,
    maxColumns: 1,
    dateArray: [
        jsToDateString(new Date()),
    ],
    calendars: [],
    calendarsSelection: [],
    firstLoad: true,
    weekNames: ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'],
    datePickerDayNames: ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'],
    mounthNames: ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'],
    datepickerNowLabel: 'Oggi'
});

const setColumns = () => {
    let dl = CalendarSchema.dateArray.length;
    if(dl > 5){dl = 5}
    CalendarSchema.maxColumns = dl;
    CalendarSchema.columns = dl;
}

watch(
    () => CalendarSchema.dateArray,
    (d) => {
        const newDates : string[] = [];
        d.forEach(date => {
            newDates.push(jsToDateString( new Date(date)))
        });
        CalendarSchema.dateArray = newDates;
        CalendarSchema.dateArray.sort();
        setColumns();
        if(CalendarSchema.getData)
        CalendarSchema.getData();
    }
)

watch(
    () => CalendarSchema.data,
    (d) => {
        if(CalendarSchema.data){
            CalendarSchema.data.map( e => 
                {
                    e.y1 = timeToPixel(e.datetime),
                    e.y2 = timeToPixel(e.endtime),
                    e.height = e.y2 - e.y1
                }
            );
            setPositionElements();
            console.log(CalendarSchema.data)
        }
    }
)

watch(
    () => CalendarSchema.newEvent,
    (n) => {
        if(n){
            if(n.datetime){
                const date = new Date(n.datetime);
                if(n.hours){
                    date.setHours(n.hours)
                }
                if(n.minutes){
                    date.setMinutes(parseInt(n.minutes));
                }

                n.datetime = jsToDateString(date);
            }
        }
    }
)