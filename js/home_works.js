
const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

gmailButton.onclick = () => {
    if (gmailRegex.test(gmailInput.value.trim())) {
        gmailResult.textContent = 'Gmail корректный'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.textContent = 'Введите корректный Gmail'
        gmailResult.style.color = 'red'
    }
}

const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')

let position = 0

const moveBlock = () => {
    const maxPosition = parentBlock.clientWidth - childBlock.offsetWidth

    if (position < maxPosition) {
        position += 1
        childBlock.style.left = `${position}px`
        requestAnimationFrame(moveBlock)
    }
}

moveBlock()
