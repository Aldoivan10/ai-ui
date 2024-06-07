import type { ModelRef, Ref } from 'vue'
import type { InputTextTypes, StrOrRegex } from '@/util/types'
import {
    swapTransition,
    capitalize,
    charMatchSome,
    addRippleEffect,
    addAndClampNum
} from '@/util/functions'

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

export const initNumInput = (
    input: Ref<HTMLInputElement>,
    model: ModelRef<unknown, number>,
    notInput: number[],
    min: number,
    max: number
) => {
    return () => {
        let timer = setTimeout(() => {}, 0)
        let duration = 200
        let clickCount = 0

        const el = input.value!
        const buttons = el.parentElement!.querySelectorAll('.ai-input-button')
        const btnMinus = buttons[0] as HTMLButtonElement
        const btnAdd = buttons[1] as HTMLButtonElement
        const limitInput = () => {
            if (model.value && min) {
                const val = model.value as number
                if (val <= min) {
                    const evt = new Event('mouseup', { bubbles: false, cancelable: true })
                    el.dispatchEvent(evt)
                }
            }
            if (model.value && max) model.value = Math.min(max, model.value as number)
        }
        const addFunc = (model: ModelRef<unknown, number>, num: number) => {
            const val = model.value as number
            if (clickCount++ === 5) {
                duration = Math.max(50, duration - 50)
                clickCount = 0
            }

            model.value = (model.value ? val : 0) + num
            timer = setTimeout(addFunc, duration, model, num)
        }

        const clearPressed = () => {
            limitInput()
            duration = 200
            clickCount = 0
            timer && clearTimeout(timer)
        }

        if (notInput) {
            el.addEventListener('keydown', (evt: KeyboardEvent) => {
                const char = evt.key
                if (charMatchSome(char, notInput)) {
                    evt.preventDefault()
                    return
                }
            })
        }
        if (min && !model.value) {
            model.value = min
            btnMinus.setAttribute('disabled', 'true')
        }

        for (const btn of Array.from(buttons)) {
            addRippleEffect(btn as HTMLElement)
            ;(btn as HTMLButtonElement).addEventListener('mouseup', clearPressed)
            ;(btn as HTMLButtonElement).addEventListener('mouseout', clearPressed)
        }

        btnMinus.addEventListener('mousedown', () => {
            console.log('??')
            const val = addAndClampNum(model.value, -1, min, max)
            console.log(val)
            if (max && val > max) btnAdd.setAttribute('disabled', 'false')
            if (min && val === min) btnMinus.setAttribute('disabled', 'true')
            timer = setTimeout(addFunc, duration, model, -1)
            model.value = val
        })
        btnAdd.addEventListener('mousedown', () => {
            const val = addAndClampNum(model.value, 1, min, max)
            if (min && val > min) btnMinus.setAttribute('disabled', 'false')
            if (max && val === max) btnAdd.setAttribute('disabled', 'true')
            timer = setTimeout(addFunc, duration, model, 1)
            model.value = val
        })
    }
}
