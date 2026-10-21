
const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

if (gmailInput && gmailButton && gmailResult) {
    gmailButton.onclick = () => {
        if (gmailRegex.test(gmailInput.value.trim())) {
            gmailResult.textContent = 'Gmail корректный'
            gmailResult.style.color = 'green'
        } else {
            gmailResult.textContent = 'Введите корректный Gmail'
            gmailResult.style.color = 'red'
        }
    }
}

const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')

if (parentBlock && childBlock) {
    let positionX = 0
    let positionY = 0
    let direction = 0

    const moveBlock = () => {
        const maxX = Math.max(0, parentBlock.clientWidth - childBlock.offsetWidth)
        const maxY = Math.max(0, parentBlock.clientHeight - childBlock.offsetHeight)
        const speed = 2

        if (direction === 0) {
            positionX += speed
            if (positionX >= maxX) {
                positionX = maxX
                direction = 1
            }
        } else if (direction === 1) {
            positionY += speed
            if (positionY >= maxY) {
                positionY = maxY
                direction = 2
            }
        } else if (direction === 2) {
            positionX -= speed
            if (positionX <= 0) {
                positionX = 0
                direction = 3
            }
        } else {
            positionY -= speed
            if (positionY <= 0) {
                positionY = 0
                direction = 0
            }
        }

        childBlock.style.left = `${positionX}px`
        childBlock.style.top = `${positionY}px`

        setTimeout(moveBlock, 16)
    }

    childBlock.style.left = '0px'
    childBlock.style.top = '0px'
    moveBlock()
}

const secondsDisplay = document.querySelector('#seconds')
const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')
const resetButton = document.querySelector('#reset')

if (secondsDisplay && startButton && stopButton && resetButton) {
    let seconds = 0
    let stopwatchInterval = null

    const updateSeconds = () => {
        secondsDisplay.textContent = seconds
    }

    const startStopwatch = () => {
        if (stopwatchInterval !== null) return

        stopwatchInterval = setInterval(() => {
            seconds++
            updateSeconds()
        }, 1000)
    }

    const stopStopwatch = () => {
        if (stopwatchInterval !== null) {
            clearInterval(stopwatchInterval)
            stopwatchInterval = null
        }
    }

    const resetStopwatch = () => {
        stopStopwatch()
        seconds = 0
        updateSeconds()
    }

    startButton.onclick = startStopwatch
    stopButton.onclick = stopStopwatch
    resetButton.onclick = resetStopwatch

    updateSeconds()
}
