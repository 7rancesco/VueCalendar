<script setup lang="ts">

    import { CalendarSchema } from '../CalendarSchema';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import { jsToDateString } from '../lib/useTime';
    import IconLeft from './IconLeft.vue';

    const emits = defineEmits(['closeCalendar']);

</script>


<template>
    
    <div style="display: flex; justify-content: space-between; padding: 5px; height: 60px;">
        <IconLeft @click="CalendarSchema.template = 'Calendar'"></IconLeft>
        <button class="button" @click="emits('closeCalendar')" style=" background: #d21935; margin-bottom: 120px;">Exit</button>
    </div>

    <div id="setting_container">
            <VueDatePicker 
                v-model="CalendarSchema.dateArray" 
                multi-dates inline :format="'yyyy-MM-dd HH:mm'" 
                :enable-time-picker="false"
                :day-names="CalendarSchema.datePickerDayNames"
                select-text="Mostra"
            ></VueDatePicker>

            <div class="setting_spacer">
                <button class="button" @click="CalendarSchema.dateArray = [jsToDateString(new Date())]">{{ CalendarSchema.datepickerNowLabel }}</button>
            </div>
    </div>

</template>
<style scoped>
    .dp__main{
        justify-content: center;
        margin-top: 10px;
    }
    .setting_spacer{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
    }


    #setting_container{
        height: 80vh; max-width: 98vw; overflow-y: scroll; overflow-x: hidden;        
    }    


    .button {
        border: none;
        width: 80px;
        height: 40px;
        border-radius: 5px;
        background: #1976d2;
        color: white;
    }

    .button:hover{
        cursor: pointer;
    }




</style>