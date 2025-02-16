FROM php:8.2-fpm

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    nodejs \
    npm

# Очистка кеша
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Установка PHP расширений
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Установка рабочей директории
WORKDIR /var/www

# Копирование composer.json и composer.lock
COPY composer.json composer.lock ./

# Установка зависимостей composer
RUN composer install --no-scripts --no-autoloader --no-dev

# Копирование остальных файлов проекта
COPY . .

# Генерация автозагрузчика и оптимизация
RUN composer dump-autoload --optimize

# Установка прав на директории
RUN chmod -R 777 storage bootstrap/cache

# Expose port 8000
EXPOSE 8000

# Запуск Laravel
CMD php artisan serve --host=0.0.0.0 --port=8000 