FROM php:8.2-fpm-alpine

# Instalar dependencias necesarias para Alpine Linux
RUN apk add --no-cache \
    linux-headers \
    g++ \
    make \
    autoconf \
    curl \
    curl-dev \
    mysql-client

# Instalar extensiones de PHP
RUN docker-php-ext-install pdo pdo_mysql sockets \
    && docker-php-ext-install curl

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el proyecto Laravel y el script wait-for-it.sh
COPY . .
COPY ./wait-for-it.sh .

# Dar permisos de ejecución al script
RUN chmod +x wait-for-it.sh

# Instalar dependencias de Composer
RUN composer install \
    && php artisan key:generate \
    && php artisan jwt:secret \
    && php artisan cache:clear \
    && php artisan config:cache

# Limpiar archivos temporales de Composer
RUN rm -rf /tmp/* /var/tmp/*

EXPOSE 8000
