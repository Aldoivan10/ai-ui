<script setup lang="ts">
import { initTextInput } from '@/controller/InputController'
import { randID, switchType } from '@/util/functions'
import IconEye from '@/components/icons/IconEye.vue'
import type { TextInputProps } from '@/util/props'
import AIBaseInput from '../base/AIBaseInput.vue'
import { computed, onMounted, ref } from 'vue'

const iconActive = ref(true)
const model = defineModel({ type: String })
const input = ref<HTMLInputElement>(document.createElement('input'))

const { type, trim, upper, capitalize, mask, notInput, successIf, warningIf, errorIf } =
    withDefaults(defineProps<TextInputProps>(), {
        id: randID(),
        trim: true,
        type: 'text',
        filled: true,
        state: 'normal',
        autocomplete: 'off',
        placeholder: 'Placeholder',
        capitalize: () => [false, ['']],
        successIf: () => false,
        warningIf: () => false,
        errorIf: () => false
    })

const success = computed(() => successIf(model.value ? model.value : ''))
const warning = computed(() => warningIf(model.value ? model.value : ''))
const error = computed(() => errorIf(model.value ? model.value : ''))

onMounted(initTextInput(input, model, trim && !mask, upper, capitalize, mask, notInput, type))
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
        <slot name="leading" />
        <input
            ref="input"
            :id
            :form
            :type
            :list
            :required
            :tabindex
            :readonly
            :maxlength
            :autofocus
            :minlength
            :spellcheck
            :formaction
            :formtarget
            :formmethod
            :formenctype
            :autocomplete
            :formnovalidate
            :name="id"
            v-model="model"
            class="ai-input"
        />
        <slot v-if="type !== 'password'" name="trailing" />
        <button
            v-else
            type="button"
            class="ai-password-toggle ai-rounded ai-input-button"
            @click="iconActive = !switchType(input, 'password', 'text')"
        >
            <IconEye :active="iconActive" />
        </button>
    </AIBaseInput>
</template>

<style>
.ai-base-input:has(.ai-input) {
    cursor: text;
    padding-right: 0;

    .ai-input {
        background-color: transparent;
        color: var(--text-color);
        flex-grow: 1;
        outline: none;
        border: none;
        height: 100%;
        z-index: 1;
    }

    .ai-placeholder {
        bottom: 0;
        left: 0;
        margin: 0;
        opacity: 1;
        width: 100%;
        height: 100%;
        display: flex;
        user-select: none;
        position: absolute;
        align-items: center;
        padding: 0 var(--spacing);
        color: var(--text-secondary-color);
        transition:
            left var(--anim-duration) ease,
            opacity var(--anim-duration) ease;
    }

    .ai-float-label {
        font-size: 1rem;
        transition:
            left var(--anim-duration) ease,
            bottom var(--anim-duration) ease,
            font-size var(--anim-duration) ease,
            color var(--anim-duration) ease;
    }

    .ai-password-toggle {
        margin-bottom: var(--border-size);
        border-radius: 0 var(--border-radius) var(--border-radius) 0;

        .ai-icon {
            scale: 1.7;
        }
    }

    &:is(:focus, :focus-within, :active, .ai-input-active):has(.ai-input) {
        .ai-placeholder {
            opacity: 0;
            left: var(--spacing);
        }

        .ai-float-label {
            opacity: 1;
            bottom: 80%;
            font-size: 0.875em;
            left: calc(var(--spacing) * -1);
            color: color-mix(in srgb, var(--ui-color) 80%, var(--text-secondary-color));
        }

        .ai-icon {
            fill: var(--ui-color);
        }
    }
}
</style>
