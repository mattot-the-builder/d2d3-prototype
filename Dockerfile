# Use an official PHP image as the base image
FROM php:8.2-fpm

# Set the working directory inside the container
WORKDIR /var/www/html

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip unzip && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql

# Copy the Laravel project files to the container
COPY . .

# Expose the container port (adjust if your Laravel app uses a different port)
EXPOSE 9000

# Install Node.js and NPM
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Start the PHP-FPM server
CMD ["php-fpm", "&&", "php", "artisan", "serve"]
