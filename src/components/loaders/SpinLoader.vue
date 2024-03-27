<template>
    <div class="ai-loader">
        <span>
            <svg class="spin-loader" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </span>
    </div>
</template>

<style>
.ai-loader > span {
    transform-origin: center center;
    animation: rotate4 2s linear infinite;
}

.ai-loader > span > .spin-loader {
    fill: none;
    stroke-width: 2;
    stroke-dashoffset: 0;
    stroke: var(--color);
    stroke-linecap: round;
    stroke-dasharray: 1, 200;
    animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash4 {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }

    100% {
        stroke-dashoffset: -125px;
    }
}
</style>
