FROM php:8.3-fpm-alpine

# System dependencies
RUN apk add --no-cache \
    bash \
    git \
    curl \
    zip \
    unzip \
    icu-dev \
    oniguruma-dev \
    libzip-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    supervisor \
    supercronic \
    nodejs \
    npm

# PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    mbstring \
    intl \
    zip \
    opcache \
    pcntl \
    gd

# OPCache config
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=30000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.revalidate_freq=0" >> /usr/local/etc/php/conf.d/opcache.ini

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 
COPY docker/php/supervisord/supervisord.conf /etc/supervisord.conf

WORKDIR /var/www

# CMD ["php-fpm"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
