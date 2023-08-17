import { reactive, watch } from "vue";
import { timeToPixel } from "./lib/useTime";
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
    dateArray: string[],//Date[]
    calendars: string[],

    getData?: Function,
    data?: Data[],

    onEventSelected?: Function,
    eventSelected?: number

    onNewEvent?: Function
    newEvent?: {
        datetime: string, //Date
        calendar: string
    }

    firstLoad: boolean
}

export const CalendarSchema = reactive<Calendar>({
    template : 'Index',
    columns : 1,
    maxColumns: 1,
    dateArray: [
        '1990-07-20T00:00:00',//new Date()
    ],
    calendars: [],
    firstLoad: true
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