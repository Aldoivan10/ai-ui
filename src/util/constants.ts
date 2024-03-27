import PulseLoader from '@/components/loaders/PulseLoader.vue'
import SpinLoader from '@/components/loaders/SpinLoader.vue'

export enum State {
    normal = '',
    secondary = 'ai-secondary',
    error = 'ai-error',
    info = 'ai-info',
    warning = 'ai-warning',
    success = 'ai-success'
}

export enum Loader {
    pulse = 'pulse',
    spin = 'spin'
}

export const Loaders = {
    pulse: PulseLoader,
    spin: SpinLoader
}
