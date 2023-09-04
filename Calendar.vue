<script setup lang="ts">
    import CalendarTemplate from './Components/CalendarTemplate.vue';
    import CalendarSetting from './Components/CalendarSetting.vue';
    import CalendarLoading from './Components/CalendarLoading.vue';
    import { CalendarSchema } from './CalendarSchema';

    const emits = defineEmits(['closeCalendar']);
    const closeCalendar = () => {
        CalendarSchema.template = "Calendar";
        emits('closeCalendar');
    }

</script>

<template>

    <CalendarTemplate 
        v-if="CalendarSchema.template === 'Calendar'"
    />


    <CalendarSetting 
        v-if="CalendarSchema.template === 'DatePicker'"
        @close-calendar="closeCalendar()"
    />


    <CalendarLoading
        v-if="CalendarSchema.template === 'Loading'"
    />

    
</template>