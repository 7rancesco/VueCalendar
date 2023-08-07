<script setup lang="ts">
    import CalendarTemplate from './Components/CalendarTemplate.vue';
    import CalendarSetting from './Components/CalendarSetting.vue';
    import CalendarLoading from './Components/CalendarLoading.vue';
    import { CalendarSchema } from './CalendarSchema';

</script>

<template>

    <CalendarTemplate 
        v-if="CalendarSchema.template === 'Index'"
    />


    <CalendarSetting 
        v-if="CalendarSchema.template === 'Setting'"
    />


    <CalendarLoading
        v-if="CalendarSchema.template === 'Loading'"
    />

    
</template>