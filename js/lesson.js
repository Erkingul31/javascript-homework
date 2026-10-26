
fetch('../data/bio.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Не удалось загрузить bio.json');
        }

        return response.json();
    })
    .then(bio => {
        console.log('Информация обо мне:', bio);
    })
    .catch(error => {
        console.error('Ошибка загрузки bio.json:', error);
    });

    
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

fetch('../data/converter.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Не удалось загрузить курсы валют');
        }

        return response.json();
    })
    .then(rates => {
        const convertCurrency = (source) => {
            const som = Number(somInput.value);
            const usd = Number(usdInput.value);
            const eur = Number(eurInput.value);

            if (source === 'som') {
                usdInput.value = (som / rates.usd).toFixed(2);
                eurInput.value = (som / rates.eur).toFixed(2);
            }

            if (source === 'usd') {
                somInput.value = (usd * rates.usd).toFixed(2);
                eurInput.value = (usd * rates.usd / rates.eur).toFixed(2);
            }

            if (source === 'eur') {
                somInput.value = (eur * rates.eur).toFixed(2);
                usdInput.value = (eur * rates.eur / rates.usd).toFixed(2);
            }
        };

        somInput.addEventListener('input', () => {
            if (somInput.value !== '') {
                convertCurrency('som');
            } else {
                usdInput.value = '';
                eurInput.value = '';
            }
        });

        usdInput.addEventListener('input', () => {
            if (usdInput.value !== '') {
                convertCurrency('usd');
            } else {
                somInput.value = '';
                eurInput.value = '';
            }
        });

        eurInput.addEventListener('input', () => {
            if (eurInput.value !== '') {
                convertCurrency('eur');
            } else {
                somInput.value = '';
                usdInput.value = '';
            }
        });
    })
    .catch(error => {
        console.error('Ошибка конвертера:', error);
    });

    
const cardElement = document.querySelector('.card');
const prevButton = document.querySelector('#btn-prev');
const nextButton = document.querySelector('#btn-next');

if (cardElement && prevButton && nextButton) {
    let todos = [];
    let currentIndex = 0;

    const renderTodo = () => {
        const todo = todos[currentIndex];

        cardElement.innerHTML = `
            <h3>Задача №${todo.id}</h3>
            <p>${todo.title}</p>
            <p>Статус: ${todo.completed ? 'Выполнена' : 'Не выполнена'}</p>
            <p>Пользователь: ${todo.userId}</p>
        `;
    };

    fetch('https://jsonplaceholder.typicode.com/todos?_limit=200')
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить задачи');
            }

            return response.json();
        })
        .then(data => {
            todos = data;

            if (todos.length === 0) {
                cardElement.textContent = 'Задачи не найдены';
                return;
            }

            renderTodo();
        })
        .catch(error => {
            console.error('Ошибка загрузки задач:', error);
            cardElement.textContent = 'Не удалось загрузить задачи';
        });

    nextButton.addEventListener('click', () => {
        if (todos.length === 0) return;

        currentIndex = (currentIndex + 1) % todos.length;
        renderTodo();
    });

    prevButton.addEventListener('click', () => {
        if (todos.length === 0) return;

        currentIndex = (currentIndex - 1 + todos.length) % todos.length;
        renderTodo();
    });
}
