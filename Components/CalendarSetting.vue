<script setup lang="ts">

    import { CalendarSchema } from '../CalendarSchema';

</script>


<template>
    
    <div>
        <button @click="CalendarSchema.template = 'Index'">Index</button>
    </div>

    <div>
        <select multiple v-model="CalendarSchema.dateArray">
            <option value="20/07/1990 00:00:00">20/07/1990 00:00:00</option>
            <option value="21/07/1990 00:00:00">21/07/1990 00:00:00</option>
            <option value="22/07/1990 00:00:00">22/07/1990 00:00:00</option>
            <option value="23/07/1990 00:00:00">23/07/1990 00:00:00</option>
            <option value="24/07/1990 00:00:00">24/07/1990 00:00:00</option>
            <option value="25/07/1990 00:00:00">25/07/1990 00:00:00</option>
            <option value="26/07/1990 00:00:00">26/07/1990 00:00:00</option>
            <option value="27/07/1990 00:00:00">27/07/1990 00:00:00</option>
            <option value="28/07/1990 00:00:00">28/07/1990 00:00:00</option>
            <option value="29/07/1990 00:00:00">29/07/1990 00:00:00</option>
        </select>
    </div>

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