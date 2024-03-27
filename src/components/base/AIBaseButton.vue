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
}

.ai-base-button:is(:focus, :hover, :active):not(:disabled) {
    background-color: color-mix(in srgb, var(--ui-color) 95%, var(--ui-text-color));
}

/*** ONLY TEXT ***/

.ai-btn-only-text {
    --ui-color: var(--surface-color);
    --ui-text-color: var(--primary-color);
    border: 1px solid transparent;
}

.ai-btn-only-text:is(:focus, :hover, :active):not(:disabled) {
    background-color: color-mix(in srgb, var(--ui-text-color) 10%, transparent);
}

/*** OUTLINE ***/

.ai-btn-outline {
    --ui-color: var(--surface-color);
    --ui-text-color: var(--primary-color);
    border: 1px solid var(--ui-text-color);
}

.ai-btn-outline:not(:disabled):hover {
    background-color: color-mix(in srgb, var(--ui-color) 95%, var(--ui-text-color));
}

.ai-btn-outline:is(:focus, :active):not(:disabled)::after,
.ai-btn-outline:is(:focus, :active):not(:disabled)::before {
    --border-color: var(--ui-text-color);
}

/*** DISABLED ***/

.ai-base-button:disabled,
.ai-btn-outline:disabled,
.ai-btn-only-text:disabled {
    opacity: 0.75;
    cursor: auto;
}

/*** COLORS ***/

.ai-btn-outline:is(.ai-error),
.ai-btn-only-text:is(.ai-error) {
    --ui-text-color: var(--error-color);
}

.ai-btn-outline:is(.ai-info),
.ai-btn-only-text:is(.ai-info) {
    --ui-text-color: var(--info-color);
}

.ai-btn-outline:is(.ai-success),
.ai-btn-only-text:is(.ai-success) {
    --ui-text-color: var(--success-color);
}

.ai-btn-outline:is(.ai-warning),
.ai-btn-only-text:is(.ai-warning) {
    --ui-text-color: var(--warning-color);
}

.ai-btn-outline:is(.ai-secondary),
.ai-btn-only-text:is(.ai-secondary) {
    --ui-text-color: var(--secondary-color);
}
</style>
