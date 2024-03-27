<script setup lang="ts">
defineProps({
    active: { type: Boolean, default: false }
})
</script>

<template>
    <svg
        class="ai-icon ai-eye-icon"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512.19 512.19"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision"
        :class="{ 'ai-icon-active': active }"
    >
        <g transform="matrix(1, 0, 0, 1, 0, 3.552713678800501e-15)">
            <path
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
            />
            <rect
                class="line"
                x="45.927"
                y="320.07"
                width="512.607"
                height="61.949"
                rx="20.591"
                ry="20.591"
            />
            <rect
                class="bg-line"
                x="45.927"
                y="320.07"
                width="512.607"
                height="61.949"
                rx="20.591"
                ry="20.591"
            />
        </g>
    </svg>
</template>

<style>
.ai-eye-icon {
    overflow: visible;

    g {
        .line {
            transform: rotate(45deg) translate(-200px, -300px) scaleX(0);
            transition: transform var(--anim-duration) ease;
            transform-origin: left center;
        }

        .bg-line {
            transform: rotate(45deg) translate(-200px, -250px) scaleX(0);
            transition: transform var(--anim-duration) ease;
            transform-origin: left center;
            fill: var(--surface-color);
        }
    }
}

.ai-eye-icon:is(.ai-icon-active) > g {
    .line {
        transform: rotate(45deg) translate(-200px, -300px) scaleX(1.35);
    }

    .bg-line {
        transform: rotate(45deg) translate(-200px, -250px) scaleX(1.35);
    }
}
</style>
