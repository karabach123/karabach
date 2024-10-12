from flask import Flask, render_template, request, jsonify
import db

app = Flask(__name__)

# Главная страница
@app.route('/')
def index():
    return render_template('index.html')

# Страница чата
@app.route('/chat')
def chat():
    return render_template('chat.html')

# Регистрация
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print('Received registration data:', data)  # Отладка данных регистрации

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    if db.register_user(username, password):
        print('User registered successfully')  # Отладка успешной регистрации
        return jsonify({'message': 'Registration successful!'}), 200
    else:
        print('User already exists')  # Отладка ошибки
        return jsonify({'message': 'User already exists!'}), 400

# Логин
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if db.login_user(username, password):
        return jsonify({'message': 'Login successful!'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 400

# Запуск приложения
if __name__ == '__main__':
    app.run(debug=True)