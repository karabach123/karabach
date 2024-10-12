import json
import os

DB_FILE = 'users.json'

# Инициализация базы данных, если файл не существует
if not os.path.exists(DB_FILE):
    with open(DB_FILE, 'w') as db_file:
        json.dump([], db_file)  # Создаем пустой список пользователей


# Загрузка пользователей
def load_users():
    with open(DB_FILE, 'r') as db_file:
        return json.load(db_file)

# Сохранение пользователей
def save_users(users):
    with open(DB_FILE, 'w') as db_file:
        json.dump(users, db_file, indent=4)  # Записываем пользователей в файл в формате JSON


# Регистрация нового пользователя
def register_user(username, password):
    users = load_users()  # Загружаем существующих пользователей
    for user in users:
        if user['username'] == username:
            return False  # Пользователь уже существует
    # Если пользователь не найден, добавляем нового
    users.append({'username': username, 'password': password})
    save_users(users)  # Сохраняем всех пользователей обратно в файл
    return True


# Проверка логина
def login_user(username, password):
    users = load_users()
    for user in users:
        if user['username'] == username and user['password'] == password:
            return True
    return False
