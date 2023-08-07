import { reactive, watch } from "vue";

interface Data {
    datetime: string,//Date
    endtime: string,
    calendar: string,
    id: number,
    content: string,
    color: string
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

}

export const CalendarSchema = reactive<Calendar>({
    template : 'Index',
    columns : 1,
    maxColumns: 1,
    dateArray: [
        '26/07/1990 00:00:00',//DateNow()
    ],
    calendars: []
});

const setColumns = () => {
    let dl = CalendarSchema.dateArray.length;
    if(dl > 5){dl = 5}
    CalendarSchema.maxColumns = dl;
    CalendarSchema.columns = dl;
}

const flush = (template : string) => {
    CalendarSchema.template = 'Loading';
    setTimeout(() => {
        CalendarSchema.template = template;
        if(CalendarSchema.getData)
        CalendarSchema.getData();
    }, 500);
}

watch(
    () => CalendarSchema.dateArray,
    (d) => {
        setColumns();
        flush('Setting');
    }
)