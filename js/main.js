// RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}

window.addEventListener('load', setRandomColors)
window.addEventListener('keydown', (event) => {
    if (event.code.toLowerCase() === 'space') {
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
        slide.style.opacity = 0
        slide.classList.remove('active_slide')
    })
}

const showSlide = (i) => {
    hideSlides()
    slides[i].style.opacity = 1
    slides[i].classList.add('active_slide')
    index = i
}

const nextSlide = () => {
    const nextIndex = (index + 1) % slides.length
    showSlide(nextIndex)
}

const prevSlide = () => {
    const prevIndex = (index - 1 + slides.length) % slides.length
    showSlide(prevIndex)
}

const startAutoSlider = () => {
    clearInterval(sliderInterval)

    sliderInterval = setInterval(() => {
        nextSlide()
    }, 5000)
}

if (slides.length > 0 && next && prev) {
    showSlide(0)

    next.onclick = () => {
        nextSlide()
        startAutoSlider()
    }

    prev.onclick = () => {
        prevSlide()
        startAutoSlider()
    }

    startAutoSlider()
}
