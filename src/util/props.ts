import { Loader, State } from '@/util/constants'
import type { ButtonHTMLAttributes } from 'vue'
import type { InputTextTypes, StrOrRegex } from './types'

export interface BaseButtonProps {
    text?: string
    ripple?: boolean
    outline?: boolean
    textOnly?: boolean
    state?: keyof typeof State
    type?: ButtonHTMLAttributes['type']
}

export interface LoaderButtonProps extends BaseButtonProps {
    loader?: Loader
    trailing?: boolean
    showLoader?: boolean
}

export interface BaseInputProps {
    id?: string
    filled?: boolean
    outline?: boolean
    feedback?: string
    disabled?: boolean
    showFeedback?: boolean
    state?: keyof typeof State
}

export interface InputProps extends BaseInputProps {
    form?: string
    tabindex?: number
    required?: boolean
    readonly?: boolean
    autofocus?: boolean
    formaction?: string
    placeholder?: string
    floatLabel?: boolean
    formnovalidate?: boolean
    formtarget?: InputTextTypes['formtarget']
    formmethod?: InputTextTypes['formmethod']
    formenctype?: InputTextTypes['formenctype']
    autocomplete?: InputTextTypes['autocomplete']
}

export interface TextInputProps extends InputProps {
    trim?: boolean
    upper?: boolean
    type?: InputTextTypes['type']
    capitalize?: [boolean, string[]]
    //* mascara, direccion, token str, token #, inicial str, inicial #
    //? ###.### **, rtl, *, #, '', 0
    mask?: [string, 'rtl' | 'ltr', string, string, string, number]

    list?: string
    pattern?: string
    minlength?: number
    maxlength?: number
    spellcheck?: boolean
    notInput?: StrOrRegex[]

    errorIf?: (val: string) => boolean
    warningIf?: (val: string) => boolean
    successIf?: (val: string) => boolean
}

export interface NumInputProps extends InputProps {
    //* mascara, direccion, token #, inicial #
    //? ###.### **, rtl, #, 0
    mask?: [string, 'rtl' | 'ltr', string, number]
    min?: number
    max?: number
    step?: number
    list?: string
    pattern?: string

    errorIf?: (val: number) => boolean
    warningIf?: (val: number) => boolean
    successIf?: (val: number) => boolean
}
