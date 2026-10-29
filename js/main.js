
 // RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = '#'

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }

    return color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        const color = generateRandomColor()

        buttonColor.textContent = color

        buttonColor.onclick = () => {
            if (javaScript) {
                javaScript.style.color = color
            }
        }
    })
}

window.addEventListener('load', setRandomColors)

window.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement
    const isTyping =
        activeElement &&
        (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable
        )

    if (event.code === 'Space' && !isTyping) {
        event.preventDefault()
        setRandomColors()
    }
})


// SLIDER BLOCK

const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')

let index = 0
let sliderInterval = null

const hideSlides = () => {
    slides.forEach((slide) => {
        slide.style.opacity = '0'
        slide.classList.remove('active_slide')
    })
}

const showSlide = (i) => {
    if (slides.length === 0) return

    index = ((i % slides.length) + slides.length) % slides.length

    hideSlides()

    slides[index].style.opacity = '1'
    slides[index].classList.add('active_slide')
}

const nextSlide = () => {
    showSlide(index + 1)
}

const prevSlide = () => {
    showSlide(index - 1)
}

const startAutoSlider = () => {
    clearInterval(sliderInterval)

    if (slides.length > 1) {
        sliderInterval = setInterval(() => {
            nextSlide()
        }, 5000)
    }
}

if (slides.length > 0) {
    showSlide(0)

    if (next) {
        next.addEventListener('click', () => {
            nextSlide()
            startAutoSlider()
        })
    }

    if (prev) {
        prev.addEventListener('click', () => {
            prevSlide()
            startAutoSlider()
        })
    }

    startAutoSlider()
}