<script setup lang="ts">
import { ref } from 'vue'
import AIBaseButton from './components/base/AIBaseButton.vue'
import AILoaderButton from './components/form/AILoaderButton.vue'
import { Loader, State } from './util/constants'
import AIInput from './components/form/AIInput.vue'
import AINumInput from './components/form/AINumInput.vue'

const showLoader = ref(false)
const text = ref('')
const state = ref<keyof typeof State>('normal')
</script>

<template>
    <div class="container">
        <div class="group-container">
            <AIBaseButton @click="state = 'error'" disabled> Active </AIBaseButton>
            <AIBaseButton @click="showLoader = !showLoader" text="Mostrar loaders" outline />
            <AIBaseButton text="Only text" :state="'error'" text-only />
            <AILoaderButton text="Loader" :show-loader="showLoader" :loader="Loader.spin" />
            <AILoaderButton text="Custom loader" :show-loader="showLoader" trailing>
                <template #trailing>
                    <div class="ai-loader">
                        <svg class="boxes-loader"><rect class="boxes"></rect></svg>
                    </div>
                </template>
            </AILoaderButton>
        </div>
        <div class="group-container">
            <AIInput
                v-model="text"
                type="password"
                :state="state"
                placeholder="Text"
                show-feedback
                float-label
                :success-if="
                    (val) => {
                        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
                        return regex.test(val)
                    }
                "
                :warning-if="
                    (val) => {
                        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
                        return !!val && !regex.test(val)
                    }
                "
                :error-if="(val) => !val"
            />

            <AINumInput placeholder="Number" :min="10" :max="20" float-label />
            <!--  <input type="file" accept="capture=camera,image/*" /> -->
        </div>
        <div class="group-container"></div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.group-container {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.ai-loader > .boxes-loader {
    width: 100%;
    height: 100%;
}

.ai-loader > .boxes-loader > .boxes {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: var(--color);
    stroke-dashoffset: 50%;
    stroke-width: var(--size);
    stroke-dasharray: var(--size);
    animation: animate 2s linear infinite;
}

@keyframes animate {
    to {
        stroke-dashoffset: 250%;
    }
}
</style>
