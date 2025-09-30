# Usa una imagen base con Nginx y PHP-FPM
FROM richarvey/nginx-php-fpm:latest

# Cambia a usuario root para instalar paquetes
USER root
# Instala dependencias necesarias para construir el frontend
RUN apk update && apk add --no-cache curl nodejs npm

# --- INICIO DE LA MODIFICACIÓN ---
# Copia nuestro archivo de configuración personalizado de PHP-FPM al contenedor
COPY .docker/php-fpm.conf /etc/php82/php-fpm.d/zzz_custom.conf
# --- FIN DE LA MODIFICACIÓN ---

# Copia todos los archivos de la aplicación al contenedor
COPY . /var/www/html

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Instala dependencias de Composer (PHP)
RUN composer install --no-interaction --no-dev --prefer-dist

# Instala dependencias de NPM y construye los assets de producción
RUN npm install && npm run build

# Establece los permisos correctos para Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Variables de entorno para la imagen base
ENV WEBROOT /var/www/html/public
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr