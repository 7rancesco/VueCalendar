<script setup lang="ts">

</script>


<template>
<div id="loader_container">
    <svg width="200" viewBox="0 0 100 100">
        <path
            stroke="black"
            stroke-width="1"
            fill="none"
            d="M10 10 L90 10 L90 90 L10 90 Z"
        ></path>

        <path
            fill="gray"
            d="M10 10 L90 10 L90 20 L10 20 Z"
        ></path>

        <circle
            id="dot1"
            cx="30"
            cy="30"
            r="5"
            fill="orange"
        ></circle>

        <circle
            id="dot2"
            cx="50"
            cy="30"
            r="5"
            fill="purple"
        ></circle>

        <circle
            id="dot3"
            cx="70"
            cy="30"
            r="5"
            fill="blue"
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
        animation: animate_dot 1.1s linear reverse infinite;
    }
    #dot2{
        animation: animate_dot 1.2s linear reverse infinite;
    }
    #dot3{
        animation: animate_dot 1.3s linear reverse infinite;
    }

    @keyframes animate_dot {
        0%{
            transform: translateX(100%) translateY(10%);
            opacity: 0;
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
            transform: translateX(-100%) translateY(10%);
            opacity: 0;
        }
    }
</style>