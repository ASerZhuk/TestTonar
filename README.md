# Тонар

Веб-приложение для отображения структуры Тонар.

## Требования

- PHP 8.3+
- Composer 
- Node.js 18+
- npm
- PostgreSQL

## Установка и запуск

### Backend (Laravel)
1. Перейдите в директорию backend
cd backend

2. Установите зависимости
composer install

3. Скопируйте файл окружения
cp .env.example .env

4. Настройте подключение к базе данных в .env:
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

5. Сгенерируйте ключ приложения
php artisan key:generate

6. Запустите миграции
php artisan migrate

7. Запустите сервер
php artisan serve

Backend будет доступен по адресу: http://localhost:8000

### Frontend (React + Vite)
1. Перейдите в директорию frontend
cd frontend/vite-project

2. Установите зависимости
npm install

3. Создайте .env файл
VITE_API_URL=http://localhost:8000

4. Запустите приложение
npm run dev

Frontend будет доступен по адресу: http://localhost:3000
