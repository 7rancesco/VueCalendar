<script setup lang="ts">

    import { CalendarSchema } from '../CalendarSchema';

</script>


<template>
    
    <div>
        <button @click="CalendarSchema.template = 'Index'">Index</button>
    </div>

    <div>
        <select multiple v-model="CalendarSchema.dateArray">
            <option value="20/07/1990">20/07/1990</option>
            <option value="21/07/1990">21/07/1990</option>
            <option value="22/07/1990">22/07/1990</option>
            <option value="23/07/1990">23/07/1990</option>
            <option value="24/07/1990">24/07/1990</option>
            <option value="25/07/1990">25/07/1990</option>
            <option value="26/07/1990">26/07/1990</option>
            <option value="27/07/1990">27/07/1990</option>
            <option value="28/07/1990">28/07/1990</option>
            <option value="29/07/1990">29/07/1990</option>
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