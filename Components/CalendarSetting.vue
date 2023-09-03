<script setup lang="ts">

    import { CalendarSchema } from '../CalendarSchema';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import { jsToDateString } from '../lib/useTime';
    import { setPositionElements } from '../lib/useCalendar';
    import IconLeft from './IconLeft.vue';

    const emits = defineEmits(['closeCalendar']);

</script>


<template>
    
    <div style="display: flex; justify-content: space-between; padding: 5px; height: 60px;">
        <IconLeft @click="CalendarSchema.template = 'Calendar'"></IconLeft>
        <button class="button" @click="emits('closeCalendar')" style=" background: #d21935; margin-bottom: 120px;">Exit</button>
    </div>

    <div id="setting_container">
    <div class="row" style="height: 120vh;">

        <div class="column" style="background: rgb(240, 242, 244);">
            <!-- <h2>Date setting</h2> -->
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

        <div class="column" style="background: rgb(236, 238, 244);">
            <h2>View setting</h2>
            <div>
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

                <!-- <div class="setting_spacer">
                    <select 
                        v-if="CalendarSchema.calendarsSelection.length" 
                        multiple 
                        v-model="CalendarSchema.calendars"
                        @change="setPositionElements()"
                    >
                        <option v-for="c in CalendarSchema.calendarsSelection" :value="c">{{ c }}</option>
                    </select>
                </div> -->
            </div>

        </div> 
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

    .column{
        padding-bottom: 60px;
    }

    #setting_container{
        height: 80vh; max-width: 98vw; overflow-y: scroll; overflow-x: hidden;        
    }    

    @media(min-width: 1000px){
        .row{
            /* display: flex; */
        }

        .column{
            width: 100%;
            text-align: center;
        }

        #setting_container{
            height: 80vh; max-width: 98vw; overflow-y: hidden; overflow-x: hidden;        
        }        
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

    select{
        width: 80%;
        height: 200px;
    }

    select > option{
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: solid 1px rgb(211, 211, 211);
    }

    select > option:checked{
        background: #1976d2;
        color: white;
    }




</style>