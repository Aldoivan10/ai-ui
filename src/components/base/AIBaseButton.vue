<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { State } from '@/util/constants'
import type { BaseButtonProps } from '@/util/props'
import { addRippleEffect } from '@/util/functions'

const btn = ref<HTMLButtonElement>()

const { ripple } = withDefaults(defineProps<BaseButtonProps>(), {
    state: 'normal',
    type: 'button',
    ripple: true
})

onMounted(() => {
    if (ripple) addRippleEffect(btn.value!)
})
</script>

<template>
    <button
        ref="btn"
        class="ai-base ai-base-button ai-ripple-border ai-rounded"
        :class="[State[state], { 'ai-btn-outline': outline, 'ai-btn-only-text': textOnly }]"
        :type
    >
        <slot>
            {{ text }}
        </slot>
    </button>
</template>

<style>
.ai-base-button {
    padding: var(--spacing) calc(var(--spacing) * 2);
    background-color: var(--ui-color);
    color: var(--ui-text-color);
    cursor: pointer;
    outline: none;
    border: none;

    &:is(:focus, :hover, :active):not(:disabled) {
        background-color: color-mix(in srgb, var(--ui-color) 95%, var(--ui-text-color));
    }
}

/*** ONLY TEXT ***/

.ai-btn-only-text {
    --ui-color: var(--surface-color);
    --ui-text-color: var(--primary-color);
    border: 1px solid transparent;

    &:is(:focus, :hover, :active):not(:disabled) {
        background-color: color-mix(in srgb, var(--ui-text-color) 10%, transparent);
    }
}

/*** OUTLINE ***/

.ai-btn-outline {
    --ui-color: var(--surface-color);
    --ui-text-color: var(--primary-color);
    border: 1px solid var(--ui-text-color);

    &:not(:disabled):hover {
        background-color: color-mix(in srgb, var(--ui-color) 95%, var(--ui-text-color));
    }

    &:is(:focus, :active):not(:disabled) {
        &::after,
        &::before {
            --border-color: var(--ui-text-color);
        }
    }
}

/*** DISABLED ***/

:where(.ai-base-button, .ai-btn-outline, .ai-btn-only-text):disabled {
    opacity: 0.75;
    cursor: auto;
}

/*** COLORS ***/

:where(.ai-btn-outline, .ai-btn-only-text) {
    &:is(.ai-error) {
        --ui-text-color: var(--error-color);
    }
    &:is(.ai-info) {
        --ui-text-color: var(--info-color);
    }
    &:is(.ai-success) {
        --ui-text-color: var(--success-color);
    }
    &:is(.ai-warning) {
        --ui-text-color: var(--warning-color);
    }
    &:is(.ai-secondary) {
        --ui-text-color: var(--secondary-color);
    }
}
</style>
