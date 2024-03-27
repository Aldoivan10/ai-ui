<template>
    <div class="ai-loader pulse-loader"></div>
</template>

<style>
.pulse-loader {
    --color: var(--ui-text-color);
    --size: 1rem;
    --speed: 1s;
    width: var(--size);
    position: relative;
    height: var(--size);
}

.pulse-loader::before,
.pulse-loader::after {
    animation: pulse-loader var(--speed) linear infinite;
    background-color: var(--color);
    transform: scale(0);
    position: absolute;
    border-radius: 50%;
    height: var(--size);
    width: var(--size);
    content: '';
    opacity: 0;
    left: 0;
    top: 0;
}

.pulse-loader::after {
    animation-delay: calc(var(--speed) / -2);
}

@keyframes pulse-loader {
    0% {
        transform: scale(0);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>
