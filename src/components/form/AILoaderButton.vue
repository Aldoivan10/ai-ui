<script setup lang="ts">
import AIBaseButton from '../base/AIBaseButton.vue'
import { Loader, Loaders } from '@/util/constants'
import { type LoaderButtonProps } from '@/util/props'

withDefaults(defineProps<LoaderButtonProps>(), {
    type: 'button',
    ripple: true,
    trailing: false,
    showLoader: true,
    loader: Loader.pulse
})

defineOptions({ inheritAttrs: true })
</script>

<template>
    <AIBaseButton
        class="ai-loader-button"
        :class="[
            {
                'ai-loader-show': showLoader,
                'ai-loader-trailing': trailing,
                'ai-loader-leading': !trailing
            }
        ]"
        :disabled="showLoader"
        :type
        :state
        :text-only
        :ripple
        :outline
    >
        <Transition name="fade">
            <span v-if="showLoader && !trailing" class="ai-loader-container">
                <slot name="leading">
                    <component :is="Loaders[loader]" />
                </slot>
            </span>
        </Transition>
        <span class="ai-button-content">
            <slot>{{ text }}</slot>
        </span>
        <Transition name="fade">
            <span v-if="showLoader && trailing" class="ai-loader-container">
                <slot name="trailing">
                    <component :is="Loaders[loader]" />
                </slot>
            </span>
        </Transition>
    </AIBaseButton>
</template>

<style>
.ai-loader-button {
    --loader-size: 1.1rem;

    display: flex;
    align-items: center;
    justify-content: center;
}

.ai-loader-button > .ai-loader-container {
    position: relative;
    height: 100%;
}

.ai-loader-button > .ai-loader-container > .ai-loader {
    --size: var(--loader-size);
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    left: 0;
}

.ai-loader-button:is(.ai-loader-trailing) > .ai-loader-container > .ai-loader {
    left: inherit;
    right: 0;
}

.ai-loader-leading > .ai-button-content,
.ai-loader-trailing > .ai-button-content {
    transform: translateX(0);
    transition: transform var(--anim-duration) ease;
}

.ai-loader-leading:not(.ai-loader-show) > .ai-button-content {
    transform: translateX(calc(var(--loader-size) / -2 - var(--spacing) / 2));
    transition: transform var(--anim-duration) ease-in calc(var(--anim-duration) / 2);
}

.ai-loader-trailing:not(.ai-loader-show) > .ai-button-content {
    transform: translateX(calc(var(--loader-size) / 2 + var(--spacing) / 2));
    transition: transform var(--anim-duration) ease-in calc(var(--anim-duration) / 2);
}

.ai-loader-leading > .ai-button-content {
    margin-left: calc(var(--loader-size) + var(--spacing));
}

.ai-loader-trailing > .ai-button-content {
    margin-right: calc(var(--loader-size) + var(--spacing));
}
</style>
