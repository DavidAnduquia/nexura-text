# Prueba Técnica - Aplicación de Gestión de Empleados

Esta aplicación es un sistema CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de empleados, desarrollado como parte de una prueba técnica. La aplicación está construida con Laravel en el backend y React en el frontend.

## Características Principales

- Creación, edición y eliminación de empleados.
- Listado de empleados con búsqueda y filtro.
- Exportación de datos a formato CSV.
- Dashboard con estadísticas y gráficos.
- Autenticación de usuarios.

## Tecnologías Utilizadas

- **Backend**: Laravel 12, PHP 8.2
- **Frontend**: React, Inertia.js, Vite
- **Base de Datos**: PostgreSQL
- **Estilos**: Tailwind CSS
- **Librerías Adicionales**: Recharts, `laravel-lang/common`

---

## Guía de Instalación y Construcción

A continuación se detallan los pasos seguidos para construir la aplicación desde cero.

### 1. Inicialización del Proyecto Laravel

El proyecto se inicializó utilizando Composer:

```bash
composer create-project laravel/laravel laravel-react-project
cd laravel-react-project
```

### 2. Configuración del Frontend con Laravel Breeze y React

Se utilizó Laravel Breeze para generar el scaffolding de autenticación y la integración con React.

```bash
# Instalar Breeze
composer require laravel/breeze --dev

# Instalar el scaffolding de React
php artisan breeze:install react

# Instalar dependencias de Node.js
npm install

# Compilar los assets por primera vez
npm run build
```

### 3. Configuración de la Base de Datos (PostgreSQL)

Se configuró el archivo `.env` para conectar con una base de datos PostgreSQL y se habilitó la extensión `pdo_pgsql` en el archivo `php.ini`.

### 4. Creación de la Estructura de la Base de Datos

Se generaron los modelos y las migraciones para las tablas `empleados`, `areas`, `roles` y la tabla pivote `empleado_rol`.

```bash
php artisan make:model Area -m
php artisan make:model Rol -m
php artisan make:model Empleado -m
php artisan make:migration create_empleado_rol_table
```

Posteriormente, se modificaron los archivos de migración para definir la estructura de cada tabla y se ejecutó el comando para crear las tablas en la base de datos:

```bash
php artisan migrate
```

### 5. Población de Datos Iniciales (Seeders)

Se crearon seeders para poblar las tablas `areas` y `roles` con datos iniciales.

```bash
php artisan make:seeder AreaSeeder
php artisan make:seeder RolSeeder
```

Luego de añadir la lógica a los seeders, se ejecutaron con:

```bash
php artisan db:seed
```

### 6. Desarrollo del Backend (API y Lógica)

- Se crearon las relaciones entre los modelos (`Area`, `Rol`, `Empleado`).
- Se generó un `EmpleadoController` para manejar toda la lógica del CRUD, validación, búsqueda y exportación.
- Se definieron las rutas web y de API en `routes/web.php`.

### 7. Desarrollo del Frontend (React)

- Se crearon los componentes de React para las diferentes vistas: `Welcome.jsx`, `Dashboard.jsx`, `Empleados/Index.jsx`, `Empleados/Create.jsx`, `Empleados/Edit.jsx`.
- Se implementaron las funcionalidades de listado, creación, edición, eliminación, búsqueda y exportación, conectando con el backend a través de Inertia.js.
- Se añadieron librerías como `recharts` para los gráficos y `use-debounce` para optimizar la búsqueda.

### 8. Internacionalización (Traducciones)

Para traducir los mensajes de validación al español, se añadieron mensajes personalizados directamente en los métodos `store` y `update` del `EmpleadoController`.

---

## Cómo Ejecutar la Aplicación

1.  **Clonar el repositorio** (si aplica).
2.  **Instalar dependencias**: `composer install` y `npm install`.
3.  **Configurar el archivo `.env`**: Copiar `.env.example` a `.env` y configurar la base de datos.
4.  **Generar la clave de la aplicación**: `php artisan key:generate`.
5.  **Ejecutar las migraciones y los seeders**: `php artisan migrate --seed && php artisan db:seed`.
6.  **Iniciar los servidores**:

    En una terminal, para el backend de Laravel:
    ```bash
    php artisan serve
    ```

    En otra terminal, para el frontend con Vite:
    ```bash
    npm run dev
    ```

7.  **Acceder a la aplicación**: Navegar a `http://127.0.0.1:8000`.
Base de datos: postgres remota de digital ocean
usuario: nexura@test.com
contraseña: password