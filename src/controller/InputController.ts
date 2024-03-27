import type { ModelRef, Ref } from 'vue'
import type { InputTextTypes, StrOrRegex } from '@/util/types'
import { swapTransition, capitalize, charMatchSome, addRippleEffect } from '@/util/functions'

export const initBaseInput = (outline: boolean, input: Ref<HTMLElement>) => {
    if (outline)
        return () => {
            const condition = ':is(:focus, :focus-within, :active)'
            const el = input.value!
            const btl = el.querySelector('span[name=borderTopL]') as HTMLSpanElement
            const btr = el.querySelector('span[name=borderTopR]') as HTMLSpanElement

            btl.ontransitionend = () =>
                swapTransition(
                    el,
                    btl,
                    condition,
                    'width var(--border-anim-duration) ease',
                    'width var(--border-anim-duration) ease calc(var(--border-anim-duration) * 2)'
                )
            btr.ontransitionend = () =>
                swapTransition(
                    el,
                    btr,
                    condition,
                    'width var(--border-anim-duration) ease',
                    'width var(--border-anim-duration) ease calc(var(--border-anim-duration) * 2)'
                )
            el.ontransitionend = () => {
                if (el.matches(condition))
                    el.style.setProperty(
                        '--border-anim-delay',
                        'calc(var(--border-anim-duration) * 2)'
                    )
                else el.style.setProperty('--border-anim-delay', '0s')
            }
        }
    else return () => {}
}

export const initTextInput = (
    input: Ref<HTMLInputElement>,
    model: ModelRef<unknown, string>,
    trim: boolean,
    upper: boolean,
    capitalizeText: [boolean, string[]],
    mask: [string, 'rtl' | 'ltr', string, string, string, number],
    notInput: StrOrRegex[],
    type: InputTextTypes['type']
) => {
    return () => {
        const el = input.value!
        const noInputEvent = (evt: KeyboardEvent) => {
            const char = evt.key
            if (charMatchSome(char, notInput)) {
                evt.preventDefault()
                return
            }
        }
        if (trim) el.addEventListener('blur', () => (model.value = el.value.trim()))
        if (type !== 'password') {
            if (upper) el.addEventListener('input', () => (model.value = el.value.toUpperCase()))
            if (capitalizeText[0])
                el.addEventListener('blur', () => {
                    const texts = el.value.split(' ')
                    const newText = texts
                        .map((str) =>
                            capitalizeText[1].includes(str.toLowerCase()) ? str : capitalize(str)
                        )
                        .join(' ')
                    model.value = newText
                })
            if (mask) {
                const dir = mask[1]
                const charToken = mask[2]
                const numToken = mask[3]
                const defChar = mask[4]
                const defNum = mask[5]

                const numRegex = /\d/g
                const charRegex = /[a-zA-Z]/g

                model.value = mask[0]
                    .replaceAll(charToken, defChar)
                    .replaceAll(numToken, defNum.toString())

                el.addEventListener('click', (evt) => {
                    const element = evt.target as HTMLInputElement
                    element.selectionStart = element.selectionEnd = element.value.length
                })

                el.addEventListener('keydown', (evt) => {
                    const char = evt.key
                    let regex = /./g
                    let token = ''
                    let defToken = ''

                    if (evt.ctrlKey) return
                    else if (notInput) {
                        evt.preventDefault()
                        if (charMatchSome(char, notInput)) return
                    } else evt.preventDefault()

                    if (/^\d$/.test(char ?? '')) {
                        regex = numRegex
                        token = numToken
                        defToken = defNum.toString()
                    } else if (/^[a-zA-Z]$/.test(char ?? '')) {
                        regex = charRegex
                        token = charToken
                        defToken = defChar
                    } else return
                    const current = (evt.target as HTMLInputElement).value
                    const isLTR = dir === 'ltr'
                    const chars = isLTR
                        ? [char].concat(current.match(regex) ?? [])
                        : [char].concat(current.match(regex)?.reverse() ?? [])
                    let newMask = current.replaceAll(regex, token).replaceAll(defToken, token)
                    newMask = isLTR ? newMask : newMask.split('').reverse().join('')
                    for (const c of chars) newMask = newMask.replace(token, c)
                    model.value = isLTR
                        ? newMask.replaceAll(token, defToken)
                        : newMask.split('').reverse().join('').replaceAll(token, defToken)
                })
            }
            if (notInput && !mask) el.addEventListener('keydown', noInputEvent)
        } else {
            if (notInput) el.addEventListener('keydown', noInputEvent)
            addRippleEffect(el.parentElement!.querySelector('.ai-password-toggle')!)
        }
    }
}
