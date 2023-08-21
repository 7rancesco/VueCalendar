import { CalendarSchema } from "../CalendarSchema";
import { getDate } from "./useTime";

const setPositionElements = () => {

    const dates = CalendarSchema.dateArray;
    const calendars = CalendarSchema.calendars;

    dates.forEach(date => {
        calendars.forEach(calendar => {
            const events = CalendarSchema.data?.filter(e => getDate(e.datetime) === getDate(date) && e.calendar === calendar);
            events?.map(e => e.width = 100)
            events?.map(e => e.left = 0)


            interface Pixelled {
                id: number,
                y?: number[],
            }

            const pixelled : Pixelled[] = [];
            events?.forEach(event => {
                pixelled.push({id: event.id, y : []});
                if(event.y1 && event.y2){
                    for (let pixel = event.y1; pixel < event.y2; pixel++) {
                        const p = pixelled.find(p => p.id === event.id);
                        p?.y?.push(Math.round(pixel))
                    }
                }
            });

            const equalsId : number[] = [];
            pixelled.forEach((pix, i) => {
                if(pixelled[i + 1]){
                    pix.y?.forEach(y => {
                        const foundY = pixelled[i+1].y?.find(py => py == y);
                        if(foundY){

                            if(!equalsId.find(e => e === pix.id)){
                                equalsId.push(pix.id)
                            }
                            if(!equalsId.find(e => e === pixelled[i + 1].id)){
                                equalsId.push(pixelled[i + 1].id)
                            }

                        }
                    });
                }
            });

            raggruppaSequenzaNonCongiunta(equalsId).forEach(element => {
                element.forEach((el, i) => {
                    const event = CalendarSchema.data?.find(e => e.id === el);
                    if(event){
                        event.width = 100 / element.length;
                        event.left = 100 / element.length * i;
                    }
                });
            });

        });
    });
    
}

    function raggruppaSequenzaNonCongiunta(array : number[]) {
        const result = [];
        let currentGroup = [array[0]];
    
        for (let i = 1; i < array.length; i++) {
        if (array[i] - array[i - 1] !== 1) {
            result.push(currentGroup);
            currentGroup = [];
        }
        currentGroup.push(array[i]);
        }
    
        result.push(currentGroup);
        return result;
    }


export {
    setPositionElements
}