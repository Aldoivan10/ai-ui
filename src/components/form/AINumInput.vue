<script setup lang="ts">
import { initNumInput } from '@/controller/InputController'
import IconMinus from '@/components/icons/IconMinus.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import type { NumInputProps } from '@/util/props'
import AIBaseInput from '../base/AIBaseInput.vue'
import { computed, onMounted, ref } from 'vue'
import { randID } from '@/util/functions'

const model = defineModel({ type: Number })
const input = ref<HTMLInputElement>(document.createElement('input'))

const { successIf, warningIf, errorIf, notInput, min, max } = withDefaults(
    defineProps<NumInputProps>(),
    {
        id: randID(),
        filled: true,
        state: 'normal',
        autocomplete: 'off',
        placeholder: 'Placeholder',

        successIf: () => false,
        warningIf: () => false,
        errorIf: () => false
    }
)

const success = computed(() => successIf(model.value ? model.value : 0))
const warning = computed(() => warningIf(model.value ? model.value : 0))
const error = computed(() => errorIf(model.value ? model.value : 0))

onMounted(initNumInput(input, model, notInput, min, max))
</script>

<template>
    <AIBaseInput
        :id
        :feedback
        :show-feedback
        :filled
        :outline
        :state
        :disabled
        :class="{
            'ai-input-active': model,
            'ai-success': success && !error && !warning,
            'ai-warning': warning && !error && !success,
            'ai-error': error && !warning && !success
        }"
    >
        <p class="ai-placeholder" :class="{ 'ai-float-label': floatLabel }">
            <slot name="placeholder">
                {{ placeholder }}
            </slot>
        </p>
        <button type="button" class="ai-base ai-input-button">
            <slot name="leading-icon">
                <IconMinus />
            </slot>
        </button>
        <input
            ref="input"
            :id
            :form
            :list
            :required
            :tabindex
            :readonly
            :autofocus
            :formaction
            :formtarget
            :formmethod
            :formenctype
            :autocomplete
            :formnovalidate
            class="ai-input ai-number-input"
            v-model="model"
            type="number"
            :name="id"
        />
        <button type="button" class="ai-base ai-input-button">
            <slot name="trailing-icon">
                <IconPlus />
            </slot>
        </button>
    </AIBaseInput>
</template>

<style>
.ai-base-input:has(.ai-number-input) {
    padding-left: 0;

    .ai-input[type='number']::-webkit-outer-spin-button,
    .ai-input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .ai-placeholder {
        padding-left: calc(var(--input-button-size));
    }

    .ai-input-button {
        display: flex;
        align-items: center;

        .ai-icon {
            scale: 1.8;
        }
    }

    .ai-input-button:nth-child(2) {
        border-radius: var(--border-radius) 0 0 var(--border-radius);
    }

    .ai-input-button:nth-child(4) {
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
    }
}
</style>
