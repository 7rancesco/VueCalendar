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

    <div class="setting_spacer">
        <button @click="CalendarSchema.dateArray = [jsToDateString(new Date())]">{{ CalendarSchema.datepickerNowLabel }}</button>
    </div>

    <div class="setting_spacer">
        ZOOM
        <input 
            type="range" 
            min="1" 
            :max="CalendarSchema.maxColumns"
            v-model="CalendarSchema.columns"
        > 
        {{ CalendarSchema.columns }} / {{ CalendarSchema.dateArray.length }}

    </div>

    <div class="setting_spacer">
        <select v-if="CalendarSchema.calendarsSelection.length" multiple v-model="CalendarSchema.calendars">
            <option v-for="c in CalendarSchema.calendarsSelection" :value="c">{{ c }}</option>
        </select>
    </div>

</template>
<style scoped>
    .dp__main{
        justify-content: center;
        margin-top: 60px;
    }
    .setting_spacer{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
    }
</style>