<script setup lang="ts">

    import { CalendarSchema } from '../CalendarSchema';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import { jsToDateString } from '../lib/useTime';

</script>


<template>
    
    <div>
        <button @click="CalendarSchema.template = 'Index'">Index</button>
    </div>

    <VueDatePicker 
        v-model="CalendarSchema.dateArray" 
        multi-dates inline :format="'yyyy-MM-dd HH:mm'" 
        :enable-time-picker="false"
        :day-names="CalendarSchema.datePickerDayNames"
    ></VueDatePicker>

    <button @click="CalendarSchema.dateArray = [jsToDateString(new Date())]">{{ CalendarSchema.datepickerNowLabel }}</button>

    <div>
        ZOOM
        <input 
            type="range" 
            min="1" 
            :max="CalendarSchema.maxColumns"
            v-model="CalendarSchema.columns"
        > 
        {{ CalendarSchema.columns }} / {{ CalendarSchema.dateArray.length }}

    </div>

</template>
<style scoped>

</style>