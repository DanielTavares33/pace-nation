#!/bin/sh
set -e

# Install composer dependencies if vendor directory is empty
if [ ! -d "vendor" ] || [ -z "$(ls -A vendor 2>/dev/null)" ]; then
    echo "Installing Composer dependencies..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Generate Wayfinder types for frontend
echo "Generating Wayfinder types..."
php artisan wayfinder:generate --with-form

# Start PHP-FPM
exec php-fpm
