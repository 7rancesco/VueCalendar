import { reactive, watch } from "vue";
import { timeToPixel, jsToDateString } from "./lib/useTime";
import { setPositionElements } from './lib/useCalendar';

interface Calendar {
    columns: number,
    maxColumns: number,
    template: 'Loading' | 'Calendar' | 'DatePicker'
    dateArray: string[],
    calendars: string[],
    weekNames: string[],
    mounthNames: string[],
    datePickerDayNames: string[],
    datepickerNowLabel: string

    onSelectDate?: Function,
    data?: setData[],

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
}

export const CalendarSchema = reactive<Calendar>({
    template : "Calendar",
    columns : 1,
    maxColumns: 1,
    dateArray: [
        jsToDateString(new Date()),
    ],
    calendars: [],
    weekNames: ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'],
    datePickerDayNames: ['DM', 'LN', 'MA', 'ME', 'GV', 'VN', 'SB'],
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
        CalendarSchema.dateArray.sort();
        setColumns();
        if(CalendarSchema.onSelectDate){
            CalendarSchema.onSelectDate();
        } else {
            CalendarSchema.template = "Calendar"
        }
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