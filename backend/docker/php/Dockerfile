FROM php:8.3.6-cli-alpine3.18

COPY --from=composer:2.7.4 /usr/bin/composer /usr/bin/

RUN set -ex \
    && apk update \
    && apk add --no-cache \
    libstdc++ libpq supervisor supercronic git nodejs npm \
    freetype-dev libjpeg-turbo-dev libpng-dev icu-dev \
    libzip-dev libxml2-dev oniguruma-dev \
    postgresql-dev imagemagick imagemagick-dev ffmpeg \
    && apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS curl-dev linux-headers zlib-dev openssl-dev pcre-dev pcre2-dev \
    \
    # Core PHP extensions
    && docker-php-ext-install mbstring bcmath pcntl sockets intl zip \
    pdo_mysql pdo_pgsql pgsql xml \
    \
    # GD for DomPDF
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    \
    # Redis extension
    && pecl install redis \
    && docker-php-ext-enable redis \
    \
    # ImageMagick extension
    && pecl install imagick \
    && docker-php-ext-enable imagick
# \
# pcntl extension
# && docker-php-ext-configure pcntl --enable-pcntl \
# && docker-php-ext-install pcntl \
# \
# Swoole for Octane
# && pecl channel-update pecl.php.net \
# && docker-php-source extract \
# && mkdir /usr/src/php/ext/swoole \
# && curl -sfL https://github.com/swoole/swoole-src/archive/v5.1.2.tar.gz -o swoole.tar.gz \
# && tar xfz swoole.tar.gz --strip-components=1 -C /usr/src/php/ext/swoole \
# && docker-php-ext-configure swoole \
# --enable-swoole-pgsql \
# --enable-openssl \
# --enable-sockets \
# --enable-swoole-curl \
# && docker-php-ext-install -j$(nproc) swoole \
# && rm -f swoole.tar.gz \
# && docker-php-source delete \
# && apk del .build-deps

# Supervisor config location
COPY docker/php/supervisord/supervisord.conf /etc/supervisord.conf

RUN mkdir -m 446 /.composer /.npm

WORKDIR /var/www

COPY . .

# RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader \
#     && composer require laravel/horizon --no-interaction \
#     && php artisan horizon:install \
#     && php artisan optimize

EXPOSE 8000

ENTRYPOINT ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]
