
const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

if (gmailInput && gmailButton && gmailResult) {
    gmailButton.onclick = () => {
        if (gmailRegex.test(gmailInput.value.trim())) {
            gmailResult.textContent = 'Gmail корректный';
            gmailResult.style.color = 'green';
        } else {
            gmailResult.textContent = 'Введите корректный Gmail';
            gmailResult.style.color = 'red';
        }
    };
}

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

if (parentBlock && childBlock) {
    let positionX = 0;
    let positionY = 0;
    let direction = 0;

    const speed = 2;

    const moveBlock = () => {
        const maxX = Math.max(
            0,
            parentBlock.clientWidth - childBlock.offsetWidth
        );
        const maxY = Math.max(
            0,
            parentBlock.clientHeight - childBlock.offsetHeight
        );

        if (direction === 0) {
            positionX += speed;

            if (positionX >= maxX) {
                positionX = maxX;
                direction = 1;
            }
        } else if (direction === 1) {
            positionY += speed;

            if (positionY >= maxY) {
                positionY = maxY;
                direction = 2;
            }
        } else if (direction === 2) {
            positionX -= speed;

            if (positionX <= 0) {
                positionX = 0;
                direction = 3;
            }
        } else {
            positionY -= speed;

            if (positionY <= 0) {
                positionY = 0;
                direction = 0;
            }
        }

        childBlock.style.left = `${positionX}px`;
        childBlock.style.top = `${positionY}px`;

        setTimeout(moveBlock, 16);
    };

    childBlock.style.left = '0px';
    childBlock.style.top = '0px';

    moveBlock();
}

const secondsDisplay = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

if (secondsDisplay && startButton && stopButton && resetButton) {
    let seconds = 0;
    let stopwatchInterval = null;

    const updateSeconds = () => {
        secondsDisplay.textContent = seconds;
    };

    const startStopwatch = () => {
        if (stopwatchInterval !== null) return;

        stopwatchInterval = setInterval(() => {
            seconds++;
            updateSeconds();
        }, 1000);
    };

    const stopStopwatch = () => {
        if (stopwatchInterval !== null) {
            clearInterval(stopwatchInterval);
            stopwatchInterval = null;
        }
    };

    const resetStopwatch = () => {
        stopStopwatch();
        seconds = 0;
        updateSeconds();
    };

    startButton.onclick = startStopwatch;
    stopButton.onclick = stopStopwatch;
    resetButton.onclick = resetStopwatch;

    updateSeconds();
}

function delay(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`Ошибка при обработке: ${value}`));
            } else {
                resolve(value);
            }
        }, ms);
    });
}

function runThenCatchChain() {
    delay(1, 500)
        .then(value => {
            console.log('Первый результат:', value);
            return delay(value + 1, 500, true);
        })
        .then(value => {
            console.log('Второй результат:', value);
            return delay(value + 1, 500);
        })
        .then(value => {
            console.log('Третий результат:', value);
        })
        .catch(error => {
            console.log('Ошибка цепочки:', error.message);
        })
        .finally(() => {
            console.log('Цепочка завершена');
        });
}

async function runAsyncAwaitChain() {
    try {
        const first = await delay(1, 500);
        console.log('Async/Await — первый результат:', first);

        const second = await delay(first + 1, 500, true);
        console.log('Async/Await — второй результат:', second);

        const third = await delay(second + 1, 500);
        console.log('Async/Await — третий результат:', third);
    } catch (error) {
        console.log('Async/Await — ошибка:', error.message);
    } finally {
        console.log('Async/Await — выполнение завершено');
    }
}

async function processArraySafely() {
    const numbers = [10, 20, 30, 40];
    const results = [];

    for (const value of numbers) {
        try {
            const result = await delay(value, 500, Math.random() > 0.7);

            results.push({
                value: result,
                error: null
            });
        } catch (error) {
            results.push({
                value: value,
                error: error.message
            });
        }
    }

    console.log('Результаты обработки массива:', results);
}

async function runParallelTasks() {
    const tasks = [
        delay('Задача 1', 500),
        delay('Задача 2', 700, true),
        delay('Задача 3', 1000),
        delay('Задача 4', 1200)
    ];

    try {
        const results = await Promise.all(tasks);
        console.log('Promise.all:', results);
    } catch (error) {
        console.log('Promise.all — ошибка:', error.message);
    }

    const settledTasks = [
        delay('Первый результат', 500),
        delay('Вторая задача', 700, true),
        delay('Третий результат', 1000),
        delay('Четвёртая задача', 1200, true)
    ];

    const settledResults = await Promise.allSettled(settledTasks);

    const succeeded = settledResults
        .filter(item => item.status === 'fulfilled')
        .map(item => item.value);

    const failed = settledResults
        .filter(item => item.status === 'rejected')
        .map(item => item.reason.message);

    console.log('Promise.allSettled — успешные:', succeeded);
    console.log('Promise.allSettled — ошибки:', failed);

    const dataPromise = delay('Данные получены', 2000);
    const timeoutPromise = delay('Таймаут истёк!', 500, true);

    try {
        const result = await Promise.race([
            dataPromise,
            timeoutPromise
        ]);

        console.log('Promise.race:', result);
    } catch (error) {
        console.log('Promise.race — ошибка:', error.message);
    }
}

runThenCatchChain();
runAsyncAwaitChain();
processArraySafely();
runParallelTasks();

const charactersContainer = document.querySelector('#characters-container');

if (charactersContainer) {
    fetch('../data/characters.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить персонажей');
            }

            return response.json();
        })
        .then(characters => {
            if (!Array.isArray(characters)) {
                throw new Error('Файл characters.json должен содержать массив');
            }

            charactersContainer.innerHTML = '';

            characters.forEach(person => {
                const card = document.createElement('div');
                card.classList.add('character-card');

                const image = document.createElement('img');
                image.src = person.person_photo;
                image.alt = person.name;
                image.classList.add('character-photo');

                image.onerror = () => {
                    image.removeAttribute('src');
                    image.alt = 'Фото недоступно';
                    image.classList.add('photo-error');
                };

                const title = document.createElement('h3');
                title.textContent = person.name;

                const age = document.createElement('p');
                age.textContent = `Age: ${person.age}`;

                const country = document.createElement('p');
                country.textContent = `Country: ${person.country}`;

                card.append(image, title, age, country);
                charactersContainer.append(card);
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки персонажей:', error);
            charactersContainer.textContent =
                'Не удалось загрузить персонажей.';
        });
}
