<script setup lang="ts">

    import { ref } from 'vue';
    import { CalendarSchema } from '../CalendarSchema';


    const calendarChildContainerLeft_WIDTH = (
        (90 / CalendarSchema.columns) * CalendarSchema.dateArray.length
    )+'vw';


    const timeScroll = ref<number>(0);
    const timeScroller = () => {
        const timeBar = document.querySelector('#calendarTimeScrollContainer');
        if(timeBar?.scrollTop)
        timeScroll.value = timeBar?.scrollTop;
    }    


</script>

<template>

    <div id="calendarContainer">

        <div id="calendarChildContainerLeft">
            <div id="calendarHeaderLeft">
                <div v-for="dataHeader in CalendarSchema.dateArray" class="calendarHeaderLeftComponent">
                    <div class="dataTitle">{{ dataHeader }}</div>
                    <div class="headerTitlesContainer">
                        <div class="calendarTitle" v-for="title in CalendarSchema.calendars">
                            {{ title }}
                        </div>
                    </div>
                </div>
            </div>
            <div id="calendarInnerContainer">
                <div v-for="dataColumn in CalendarSchema.dateArray" class="calendarColumnContainer">
                    <div class="calendarColumnInnerContainer" 
                        :style="`transform: translateY(-${timeScroll}px)`"
                    >
                        <div v-for="calendar in CalendarSchema.calendars" class="calendarsColumn"></div>
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
                <div id="calendarTimeScroll"></div>
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
        height: 180vh;
    }
    .calendarColumnInnerContainer{
        width: 100%;
        height: 180vh;
        /* background: linear-gradient(gray, white); */
        box-shadow: 0px -1px 1px black inset;
        display: flex;
    }

    .dataTitle{
        height: 4vh;
        text-align: center;
        box-shadow: 0px -1px 1px black inset;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-size: 1vw;        
    }

    .headerTitlesContainer{
        height: 6vh;
        display: flex;
        align-items: center;
        justify-content: stretch;
    }

    .calendarTitle{
        width: 100%;
        height: 6vh;
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
    }

</style>
