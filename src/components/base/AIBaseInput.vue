<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { State } from '@/util/constants'
import { randID } from '@/util/functions'
import { type BaseInputProps } from '@/util/props'
import { initBaseInput } from '@/controller/InputController'

const input = ref<HTMLLabelElement>(document.createElement('label'))

const { outline } = withDefaults(defineProps<BaseInputProps>(), {
    id: randID(),
    filled: true,
    state: 'normal'
})

onMounted(initBaseInput(outline, input))
</script>

<template>
    <label
        ref="input"
        class="ai-base ai-base-input ai-rounded"
        :class="[{ 'ai-input-outline': outline, 'ai-input-filled': filled }, State[state]]"
        :for="id"
        :disabled
    >
        <span name="borderTopL" class="ai-outline-aux ai-input-border-top-left" v-if="outline" />
        <span name="borderTopR" class="ai-outline-aux ai-input-border-top-right" v-if="outline" />
        <span class="ai-outline-aux ai-input-border-x" v-if="outline" />
        <slot />
        <Transition name="width">
            <p v-if="showFeedback" class="ai-feedback">
                <small>
                    <slot name="feedback">
                        {{ feedback }}
                    </slot>
                </small>
            </p>
        </Transition>
    </label>
</template>

<style>
.ai-base-input {
    --border-unfocus-color: var(--text-secondary-color);
    --border-anim-duration: 0.2s;
    --border-anim-delay: 0s;
    width: 10rem;
    height: 2rem;
    display: flex;
    position: relative;
    gap: var(--spacing);
    padding: 0 var(--spacing);
    margin: calc(var(--spacing) * 2.5) 0;
}

.ai-base-input::after,
.ai-base-input::before {
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: inherit;
    border-bottom: calc(var(--border-size) / 1.5) solid var(--border-unfocus-color);
}

.ai-base-input::after {
    transform: scaleX(0);
    transition:
        transform var(--border-anim-duration) ease var(--border-anim-delay),
        border-color var(--border-anim-duration) ease;
    border-color: var(--ui-color);
}

.ai-base-input:is(:focus, :focus-within, :active, .ai-input-active)::after {
    transform: scaleX(1);
}

.ai-base-input {
    .ai-feedback {
        left: 0;
        top: 100%;
        margin: 0;
        width: 100%;
        overflow: hidden;
        font-size: 0.875em;
        position: absolute;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: calc(var(--spacing) / 2);
        transition: color var(--anim-duration) ease;
        color: color-mix(in srgb, var(--ui-color) 80%, var(--text-secondary-color));
    }
}

.ai-input-filled {
    background-color: var(--surface-color);
}

/*** OUTLINE ***/

.ai-input-outline {
    --border-anim-duration: 0.1s;
}

.ai-input-outline::before {
    border: calc(var(--border-size) / 2) solid var(--border-unfocus-color);
}

.ai-input-outline::after {
    border-bottom: calc(var(--border-size) / 2) solid var(--ui-color);
}

.ai-input-outline {
    .ai-outline-aux {
        transition: border-color var(--anim-duration) ease;
        border-radius: inherit;
        pointer-events: none;
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
    }

    .ai-input-border-x {
        bottom: 0;
        height: 0%;
        top: initial;
        border-left: calc(var(--border-size) / 2) solid var(--ui-color);
        border-right: calc(var(--border-size) / 2) solid var(--ui-color);
        transition: height var(--border-anim-duration) ease var(--border-anim-duration);
    }

    .ai-input-border-top-left,
    .ai-input-border-top-right {
        width: 0%;
        border-top: calc(var(--border-size) / 2) solid var(--ui-color);
        transition: width var(--border-anim-duration) ease calc(var(--border-anim-duration) * 2);
    }

    .ai-input-border-top-left {
        border-top-right-radius: 0;
    }

    .ai-input-border-top-right {
        border-top-left-radius: 0;
        left: initial;
        right: 0;
    }
}

.ai-input-outline:is(:focus, :focus-within, :active, .ai-input-active) {
    .ai-input-border-x {
        height: 100%;
    }

    .ai-input-border-top-left,
    .ai-input-border-top-right {
        width: 50%;
    }
}
</style>
