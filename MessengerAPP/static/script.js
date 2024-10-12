// Регистрация пользователя
function register() {
    console.log('Register button clicked'); // Отладочное сообщение

    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    if (!username || !password) {
        document.getElementById('regMessage').innerText = 'Username and password are required!';
        return;
    }

    console.log('Sending registration request with:', { username, password }); // Отладка данных

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data); // Отладка ответа сервера
        document.getElementById('regMessage').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error); // Отладка ошибок
        document.getElementById('regMessage').innerText = 'Registration failed!';
    });
}

// Логин пользователя
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        document.getElementById('loginMessage').innerText = 'Username and password are required!';
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loginMessage').innerText = data.message;
        if (data.message === 'Login successful!') {
            // Перенаправление на страницу чата после успешного входа
            window.location.href = '/chat';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loginMessage').innerText = 'Login failed!';
    });
}

// Шифрование сообщения с использованием шифра Цезаря
function encryptMessage() {
    const message = document.getElementById('inputMessage').value;
    let key = parseInt(document.getElementById('key').value); // Используйте число в качестве ключа

    // Проверьте, что ключ является числом
    if (isNaN(key)) {
        alert("Please enter a valid number as a key.");
        return;
    }

    let encrypted = '';
    for (let i = 0; i < message.length; i++) {
        let char = message.charCodeAt(i);

        // Если это буква в верхнем регистре
        if (char >= 65 && char <= 90) {
            encrypted += String.fromCharCode(((char - 65 + key) % 26) + 65);
        }
        // Если это буква в нижнем регистре
        else if (char >= 97 && char <= 122) {
            encrypted += String.fromCharCode(((char - 97 + key) % 26) + 97);
        }
        // Если это не буква, оставить символ без изменений
        else {
            encrypted += message[i];
        }
    }

    document.getElementById('outputMessage').value = encrypted;
}

// Дешифрование сообщения с использованием шифра Цезаря
function decryptMessage() {
    const encryptedMessage = document.getElementById('inputMessage').value;
    let key = parseInt(document.getElementById('key').value); // Используйте число в качестве ключа

    // Проверьте, что ключ является числом
    if (isNaN(key)) {
        alert("Please enter a valid number as a key.");
        return;
    }

    let decrypted = '';
    for (let i = 0; i < encryptedMessage.length; i++) {
        let char = encryptedMessage.charCodeAt(i);

        // Если это буква в верхнем регистре
        if (char >= 65 && char <= 90) {
            decrypted += String.fromCharCode(((char - 65 - key + 26) % 26) + 65);
        }
        // Если это буква в нижнем регистре
        else if (char >= 97 && char <= 122) {
            decrypted += String.fromCharCode(((char - 97 - key + 26) % 26) + 97);
        }
        // Если это не буква, оставить символ без изменений
        else {
            decrypted += encryptedMessage[i];
        }
    }

    document.getElementById('outputMessage').value = decrypted;
}

