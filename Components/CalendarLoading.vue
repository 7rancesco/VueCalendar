<script setup lang="ts">

</script>


<template>
<div id="loader_container">
    <svg width="200" viewBox="0 0 100 100">
        <path
            stroke="var(--color)"
            stroke-width="1"
            fill="none"
            d="M10 10 L90 10 L90 90 L10 90 Z"
        ></path>

        <path
            fill="var(--color)"
            d="M10 10 L90 10 L90 20 L10 20 Z"
        ></path>

        <circle
            id="dot1"
            cx="30"
            cy="20"
            r="5"
            fill="var(--color)"
        ></circle>

        <circle
            id="dot2"
            cx="50"
            cy="30"
            r="5"
            fill="var(--border)"
        ></circle>

        <circle
            id="dot3"
            cx="70"
            cy="40"
            r="5"
            fill="var(--color)"
        ></circle>

    </svg>
    <p>Loading ...</p>
</div>    

</template>



<style scoped>
    #loader_container{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #dot1{
        animation: animate_dot 0.5s linear reverse infinite;
    }
    #dot2{
        animation: animate_dot 0.3s linear reverse infinite;
    }
    #dot3{
        animation: animate_dot 1s linear reverse infinite;
    }

    @keyframes animate_dot {
        0%{
            transform: translateX(0%) translateY(10%);
            opacity: 0;
            r: 2;
        }
        40%{
            transform: translateX(0%) translateY(30%);
            opacity: 1
        }
        60%{
            transform: translateX(-20%) translateY(30%);
            opacity: 1
        }
        100%{
            transform: translateX(-70%) translateY(10%);
            opacity: 0;
            r: 25;
        }
    }
</style>