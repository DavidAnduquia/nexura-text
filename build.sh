#!/usr/bin/env bash
# Exit on error
set -o errexit

# Instalar dependencias de PHP (sin las de desarrollo)
composer install --no-interaction --no-dev --prefer-dist

# Instalar dependencias de Node.js y compilar los assets para producción
npm install
npm run build

# Generar la clave de la aplicación (si no está en las variables de entorno)
php artisan key:generate --force

# Optimizar la configuración y las rutas para producción
php artisan config:cache
php artisan route:cache

# Ejecutar las migraciones de la base de datos
# El flag --force es necesario para ejecutar migraciones en un entorno de producción
php artisan migrate --force