<script setup lang="ts">
    import { CalendarSchema } from '../CalendarSchema';

    const data = defineProps({
        event: Object
    })

    const setEvent = ( id : number ) => {
        CalendarSchema.eventSelected = id;
        if(CalendarSchema.onEventSelected)
        CalendarSchema.onEventSelected();
    }

    const moveEvent = ( id : number ) => {
        CalendarSchema.eventSelected = id;
        console.log('moveEvent'+CalendarSchema.eventSelected)
    }

</script>

<template>
    <div v-if="data.event" class="calendar_event" 
        :style="`top:${data.event.y1}vh; height:${data.event.height}vh; left:${data.event.left}%; width:${data.event.width}%; background: ${data.event.color};`"
        @click="setEvent(data.event.id)"
        @mousedown="moveEvent(data.event.id)"
        @touchstart="moveEvent(data.event.id)"
    >
        {{ data.event.content }}
    </div> 
</template>

<style scoped>
    .calendar_event{
        position: absolute;
        overflow: hidden;
        box-shadow: 0px 0px 0px 0.5px var(--color) inset;
        font-size: 1vw;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        user-select: none;
        color: black;
    }

</style>