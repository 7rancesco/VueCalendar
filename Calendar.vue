<script setup lang="ts">
    import { ref } from 'vue';

    const timeScroll = ref<number>(0);
    const timeScroller = () => {
        const timeBar = document.querySelector('#calendarTimeScrollContainer');
        if(timeBar?.scrollTop)
        timeScroll.value = timeBar?.scrollTop;
    }

    const dataCalendar = {
        dates : ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'],
        calendars : ['Calendar1', 'Calendar2'],
    };

    const columnsLenght = ref(dataCalendar.dates.length);//setZoom
    if(columnsLenght.value > 5){
        columnsLenght.value = 5;
    }

    const calendarDateColumn_WIDTH = ref(90 / columnsLenght.value);
    const calendarChildContainerLeft_WIDTH = (calendarDateColumn_WIDTH.value * dataCalendar.dates.length)+'vw';

</script>

<template>

    <div id="calendarContainer">

        <div id="calendarChildContainerLeft">
            <div id="calendarHeaderLeft">
                <div v-for="dataHeader in dataCalendar.dates" class="calendarHeaderLeftComponent">
                    {{ dataHeader }}
                </div>
            </div>
            <div id="calendarInnerContainer">
                <div v-for="dataColumn in dataCalendar.dates" class="calendarColumnContainer">
                    <div class="calendarColumnInnerContainer" 
                        :style="`transform: translateY(-${timeScroll}px)`"
                    >
                    </div>
                </div>
            </div>
        </div>

        <div id="calendarChildContainerRight">
            <div id="calendarHeaderRight">
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
    #calendarHeaderRight{
        width: 10vw;
        height: 10vh;
        box-shadow: 0px 1px 1px black inset;
    }
    #calendarTimeScrollContainer{
        width: 10vw;
        height: 90vh;
        box-shadow: 0px 1px 1px black inset;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    #calendarTimeScroll{
        width: 10vw;
        height: 180vh;
    }
    .calendarColumnInnerContainer{
        width: 90vw;
        height: 180vh;
        background: linear-gradient(gray, white);
        box-shadow: 0px 1px 1px black inset;
    }
</style>
