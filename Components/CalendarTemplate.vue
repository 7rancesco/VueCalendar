<script setup lang="ts">

    import { ref, onMounted } from 'vue';
    import { CalendarSchema } from '../CalendarSchema';
    import CalendarEvent from './CalendarEvent.vue';
    import { getDate, setDateTimeCalendar } from '../lib/useTime';
    import { setPositionElements } from '../lib/useCalendar';


    const calendarChildContainerLeft_WIDTH = (
        (90 / CalendarSchema.columns) * CalendarSchema.dateArray.length
    )+'vw';


    onMounted(() => {
        const timeBar = document.querySelector('#calendarTimeScrollContainer');
        if(timeBar){
            timeBar.scrollTop = 720;
        }
        CalendarSchema.eventSelected = undefined;
    })

    const timeScroll = ref<number>(0);
    const timeScroller = () => {
        const timeBar = document.querySelector('#calendarTimeScrollContainer');
        let s = timeBar?.scrollTop;
        if(s)
        timeScroll.value = s;
    }

    const isDraw = ref<boolean>(false);
    const enableNewEvent = ref<boolean>(false);

    let timer: any;
    const activeDraw = () => {
        if(!timer){
            let time = 0;
            timer = setInterval(() => {
                time++;
                if(time > 1){
                    //!important
                    deactiveDraw();//!first line code
                    isDraw.value = true;//!second line code
                    enableNewEvent.value = true;
                }
            }, 200);
        }
    }

    const xPosition = ref<number>(0);
    const yPosition = ref<number>(0);
    const deactiveDraw = ( e? : MouseEvent | TouchEvent ) => {
        isDraw.value = false;
        clearInterval(timer);
        timer = null;
        if(enableNewEvent.value){
            if(e){
                let event : any;
                event = e;
                const header : any = document.querySelector('#calendarHeaderLeft');
                const h = header?.offsetHeight;

                if(event.type === 'mouseup'){
                    xPosition.value = event.clientX;
                    yPosition.value = event.clientY - h;
                } else {
                    xPosition.value = event.touches[0].clientX;
                    yPosition.value = event.touches[0].clientY - h;
                }

                const containerX = document.querySelector('#calendarChildContainerLeft');
                const containerY = document.querySelector('#calendarTimeScrollContainer');
                const x = containerX?.scrollLeft;
                const y = containerY?.scrollTop;

                if(x)
                xPosition.value+= x;
                if(y)
                yPosition.value+= y;

            }
            
            enableNewEvent.value = false;
            newEvent();

        }
    }

    const detectPosition = () => {
        //Calendar
        const containerColumn : any = document.querySelectorAll('.calendarTitle')[0];

        const column_w = containerColumn?.offsetWidth;

        let column = Math.floor( xPosition.value / column_w);

        let ii = 0;
        for (let i = 0; i < column; i++) {
            ii++;
            if(ii > CalendarSchema.calendars.length - 1){
                ii = 0;
            }
        }
        column = ii;


        //Time

        const containerY : any = document.querySelector('#calendarTimeScroll');

        const y = containerY?.offsetHeight;

        const hour = Math.floor(yPosition.value / (y / 24))

        const prevMinutes = (yPosition.value / (y / 24)) - hour;
        let minutes = '00';
        if(prevMinutes <= 1){
            minutes = '45';
        }
        if(prevMinutes <= 0.75){
            minutes = '30';
        }
        if(prevMinutes <= 0.5){
            minutes = '15';
        }
        if(prevMinutes <= 0.25){
            minutes = '00';
        }

        //Date
        const date_containerColumn : any = document.querySelectorAll('.dataTitle')[0];

        const date_column_w = date_containerColumn?.offsetWidth;

        let date_column = Math.floor( xPosition.value / date_column_w);

        let date_ii = 0;
        for (let i = 0; i < date_column; i++) {
            date_ii++;
            if(date_ii > CalendarSchema.dateArray.length - 1){
                date_ii = 0;
            }
        }
        date_column = date_ii;
        
        return {
            datetime : CalendarSchema.dateArray[date_column],
            hours: hour,
            minutes: minutes,
            calendar : CalendarSchema.calendars[column]
        }

    }

    const newEvent = () => {
        CalendarSchema.newEvent = detectPosition();
        if (CalendarSchema.eventSelected) {

            setDateTimeCalendar();
            CalendarSchema.eventSelected = undefined;
            if(CalendarSchema.getData){
                //Attiva quando la fetch è reale altrimenti ripristina evento
                //CalendarSchema.getData();
            }
            setPositionElements();

        } else {
            if(CalendarSchema.onNewEvent){
                CalendarSchema.onNewEvent();
            }
        }        
    }

    const getDataEvent = (datetime : string, calendar : string) => {
        return CalendarSchema.data?.filter(e =>
            getDate(e.datetime) === getDate(datetime) && e.calendar === calendar
        )
    }

</script>

<template>


    <div v-if="isDraw" style="position: fixed; top: 0px; left: 90vw; background: black; color: white; width: 10vw; height: 10vh; display: flex; justify-content: center; align-items: center; font-size: 1vw;">
        Drug event
    </div>

    <div id="calendarContainer">

        <div id="calendarChildContainerLeft">
            <div id="calendarHeaderLeft">
                <div v-for="dataHeader in CalendarSchema.dateArray" class="calendarHeaderLeftComponent">
                    <div class="dataTitle">WEEK {{ dataHeader }}</div>
                    <div class="headerTitlesContainer">
                        <div class="calendarTitle" v-for="title in CalendarSchema.calendars">
                            {{ title }}
                        </div>
                    </div>
                </div>
            </div>
            <div id="calendarInnerContainer"
                @mousedown="activeDraw()"
                @touchstart="activeDraw()"
                @mouseup="deactiveDraw($event)"
                @touchend="deactiveDraw($event)"
            >
                <div v-for="dataColumn in CalendarSchema.dateArray" class="calendarColumnContainer">
                    <div class="calendarColumnInnerContainer" 
                        :style="`transform: translateY(-${timeScroll}px)`"
                    >
                        <div v-for="calendar in CalendarSchema.calendars" class="calendarsColumn"
                        >
                            <CalendarEvent v-for="event in getDataEvent(dataColumn, calendar)" 
                                :event="event" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="calendarChildContainerRight">
            <div id="calendarHeaderRight" 
                @click="CalendarSchema.template = 'Setting'"
            >
            </div>
            <div id="calendarTimeScrollContainer" @scroll="timeScroller">
                <div id="calendarTimeScroll">
                    <div v-for="i in 24" class="timeText">{{ (i - 1) < 10 ? '0' + (i - 1) :  (i - 1)}}:00</div>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>

    #calendarContainer{
        height: 100vh;
        width: 100vw;
        margin: 0px;
        overflow: hidden;
        display: flex;
    }
    #calendarChildContainerLeft{
        width: 90vw;
        height: 100vh;
        overflow-x: scroll;
        overflow-y: hidden;
    }
    #calendarChildContainerRight{
        width: 10vw;
        height: 100vh;
    }
    #calendarHeaderLeft{
        width: v-bind('calendarChildContainerLeft_WIDTH');
        height: 10vh;
        display: flex;
    }
    .calendarHeaderLeftComponent{
        width: 90vw;
        height: 100%;
        box-shadow: 0px 1px 1px black inset;
    }

    .calendarHeaderLeftComponent:nth-child(even){
        background: rgba(0, 0, 0, 0.035);
    }
        
    #calendarInnerContainer{
        width: v-bind('calendarChildContainerLeft_WIDTH');
        height: 90vh;
        display: flex;
    }
    .calendarColumnContainer{
        width: 90vw;
        height: 100%;
        overflow: hidden;
        box-shadow: 0px 1px 1px black inset;
    }

    .calendarColumnContainer:nth-child(even){
        background: rgba(239, 241, 244, 0.514);
    }

    #calendarHeaderRight{
        width: 10vw;
        height: 10vh;
        box-shadow: 0px 0px 1px black inset;
    }
    #calendarTimeScrollContainer{
        width: 10vw;
        height: 90vh;
        box-shadow: 0px -1px 1px black inset;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    #calendarTimeScroll{
        width: 10vw;
        height: 240vh;
    }
    .calendarColumnInnerContainer{
        width: 100%;
        height: 240vh;
        box-shadow: 0px -1px 1px black inset;
        display: flex;
    }

    .dataTitle{
        height: 6vh;
        text-align: center;
        box-shadow: 0px -1px 1px black inset;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: 1.2vw;        
    }

    .headerTitlesContainer{
        height: 4vh;
        display: flex;
        align-items: center;
        justify-content: stretch;
    }

    .calendarTitle{
        width: 100%;
        height: 4vh;
        box-shadow: 0px 0px 1px black inset;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: 1vw;
    }

    .calendarsColumn{
        width: 100%;
        height: 100%;
        box-shadow: 0px -1px 1px black inset;
        position: relative;
    }
    
    .calendarsColumn{
        background-image: url(../SVG/Line.svg);
        background-size: 10vh;
    }

    #calendarTimeScroll{
        background-image: url(../SVG/Line.svg), linear-gradient(rgb(214 220 226), rgb(214 220 226));
        background-size: 10vh;
    }

    .timeText{
        height: 10vh;
        font-size: 0.9vw;
    }

</style>
