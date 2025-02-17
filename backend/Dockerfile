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
    libpq-dev

# Очистка кеша
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Установка PHP расширений
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Установка рабочей директории
WORKDIR /var/www

# Копирование только файлов для composer
COPY composer.json composer.lock ./

# Установка зависимостей
RUN composer install --no-scripts --no-autoloader --no-dev

# Копирование остальных файлов проекта
COPY . .

# Генерация автозагрузчика
RUN composer dump-autoload --optimize

# Установка прав на директории
RUN chmod -R 777 storage bootstrap/cache

# Expose port 8000
EXPOSE 8000

# Запуск Laravel
CMD php artisan serve --host=0.0.0.0 --port=8000 