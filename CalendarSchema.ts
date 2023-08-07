import { reactive, watch } from "vue";

interface Calendar {
    columns: number,
    maxColumns: number,
    template: string,
    dateArray: string[]//Date[]
}

export const CalendarSchema = reactive<Calendar>({
    template : 'Index',
    columns : 1,
    maxColumns: 1,
    dateArray: [
        '26/07/1990 00:00:00',//DateNow()
    ]
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
    }, 500);
}

watch(
    () => CalendarSchema.dateArray,
    (d) => {
        setColumns();
        //fetch(d);
        flush('Setting');
    }
)