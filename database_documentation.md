# Documentación de la Base de Datos

Este documento contiene la documentación de las tablas y consultas SQL utilizadas en el proyecto.

## Tabla de Usuarios (Users)

Esta tabla almacena la información de los usuarios de la aplicación.

```sql
-- Documentación de la tabla de Usuarios (Users)
-- Esta tabla almacena la información de los usuarios de la aplicación.

CREATE TABLE "Users" (
    -- id: Es la clave primaria de la tabla. Se autoincrementa para garantizar que cada usuario tenga un identificador único.
    id SERIAL PRIMARY KEY,

    -- nombre: Almacena el nombre del usuario. No puede ser nulo.
    nombre VARCHAR(255) NOT NULL,

    -- email: Almacena el correo electrónico del usuario. Debe ser único y no puede ser nulo.
    -- Se utiliza para el inicio de sesión y la comunicación.
    email VARCHAR(255) NOT NULL UNIQUE,

    -- password: Almacena la contraseña del usuario de forma segura (hasheada). No puede ser nulo.
    password VARCHAR(255) NOT NULL,

    -- rol: Define el rol del usuario en la aplicación.
    -- Los roles posibles son 'Ciclista', 'Comerciante', 'Creador de Ruta', 'Admin'. No puede ser nulo.
    rol VARCHAR(255) NOT NULL CHECK (rol IN ('Ciclista', 'Comerciante', 'Creador de Ruta', 'Admin')),

    -- createdAt: Registra la fecha y hora en que se creó el registro del usuario.
    -- Sequelize añade este campo automáticamente.
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,

    -- updatedAt: Registra la fecha y hora de la última actualización del registro del usuario.
    -- Sequelize añade este campo automáticamente.
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);
```
