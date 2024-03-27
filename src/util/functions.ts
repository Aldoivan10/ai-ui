import type { StrOrRegex } from './types'

export const addRippleEffect = (element: HTMLElement) => {
    const limit = document.createElement('span')
    element.style.position = 'relative'
    limit.classList.add('ai-ripple-container')
    element.appendChild(limit)
    element.addEventListener('click', (event) => {
        const target = limit
        const circle = document.createElement('span') as HTMLSpanElement
        const diameter = Math.max(target.clientWidth, target.clientHeight)
        const radius = diameter / 2
        circle.style.width = circle.style.height = `${diameter}px`
        circle.style.left = `${event.clientX - target.getBoundingClientRect().x - radius}px`
        circle.style.top = `${event.clientY - target.getBoundingClientRect().y - radius}px`
        circle.onanimationend = () => circle.remove()
        circle.classList.add('ai-ripple-effect')
        target.appendChild(circle)
    })
}

export const swapTransition = (
    el: HTMLElement,
    target: HTMLElement,
    condition: string,
    ifMatch: string,
    notMatch: string
) => {
    const match = el.matches(condition)
    if (match) target.style.transition = ifMatch
    else target.style.transition = notMatch
}

export const randID = (prefix: string = 'in') => {
    return `${prefix}${crypto.randomUUID()}`
}

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const charMatchSome = (char: string, matcher: StrOrRegex[]) => {
    for (const not of matcher) {
        if (typeof not === 'object' && (not as any).test(char)) return true
        else if (not === char) return true
    }
    return false
}

export const switchType = (input: HTMLInputElement, targetType: string, defaultType: string) => {
    if (input.type === targetType) {
        input.type = defaultType
        return true
    }
    input.type = targetType
    return false
}
