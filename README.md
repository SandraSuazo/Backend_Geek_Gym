# Geek Gym

Este es el backend de Geek Gym, una plataforma en desarrollo que ofrece servicios relacionados con el fitness y bienestar. Este backend proporciona funciones como registro de usuarios, inicio de sesión, gestión de perfiles y actividades, con el objetivo de enriquecer tu experiencia. Estamos trabajando constantemente para implementar nuevas características y mejorar la funcionalidad general.

## Índice

- [Tecnologías](#tectonogías)
- [Instalación](#instalación)
- [Endpoints y Acciones](#endpoints)
- [Contacto](#contacto)

## Tecnologías

Este proyecto utiliza las siguientes tecnologías:

- **Node.js (v21.2.0):** Plataforma de ejecución de JavaScript para construir aplicaciones del lado del servidor.
- **Express (v4.18.2):** Framework de aplicación web para Node.js que simplifica el desarrollo de aplicaciones RESTful.
- **MongoDB (con Mongoose v8.0.3):** Base de datos NoSQL utilizada para almacenar y recuperar datos de manera eficiente.
- **bcrypt (v5.1.1):** Librería para el hashing seguro de contraseñas.
- **jsonwebtoken (v9.0.2):** Implementación de JSON Web Tokens (JWT) para la autenticación segura entre partes.
- **cors (v2.8.5):** Middleware de Express para habilitar el control de acceso a recursos de manera segura.
- **dotenv (v16.3.1) y dotenv-safe (v8.2.0):** Gestión de variables de entorno para la configuración segura de la aplicación.
- **nodemon (v3.0.2):** Herramienta que monitorea cambios en el código y reinicia automáticamente la aplicación.

Este backend proporciona servicios para la aplicación Geek Gym, permitiendo gestionar usuarios, actividades y perfiles de usuario.

## Instalación

Para instalar y ejecutar este backend, sigue los siguientes pasos:

1. **Clona el Repositorio:**
   git clone https://github.com/SandraSuazo/Backend_Geek_Gym.git

2. **Instala las Dependencias:**
   npm install

3. **Configurar Variables de Entorno:**
   Crea un archivo .env en el directorio raíz y agrega las siguientes variables:

   - DB_URL = Example URL
   - PORT = 0000
   - SECRET = "Example Secret"
   - HASH_ROUNDS = 0

4. **Iniciar el Servidor:**
   nodemon

5. **Utilizar Postman para Pruebas:**
   Utiliza Postman para realizar solicitudes a las rutas del backend, como la creación de usuarios, actividades, y otras operaciones.

Con estos pasos, tendrás el backend de Geek Gym en funcionamiento y podrás comenzar a probar las funcionalidades utilizando Postman.

## Endpoints y Acciones

### Auth

| Endpoint | Verbo HTTP | Acción                       | Autenticación | Autorización |
| -------- | ---------- | ---------------------------- | ------------- | ------------ |
| `/`      | POST       | Registro de un nuevo usuario | No            | No           |
| `/login` | POST       | Inicio de sesión de usuario  | No            | No           |

### User

| Endpoint                   | Verbo HTTP | Acción                                    | Autenticación | Autorización                        |
| -------------------------- | ---------- | ----------------------------------------- | ------------- | ----------------------------------- |
| `/user/profile`            | GET        | Obtener perfil del usuario autenticado    | Sí            | Sí - Usuario activo                 |
| `/user/update-profile`     | PATCH      | Actualizar perfil del usuario autenticado | Sí            | Sí - Usuario activo                 |
| `/user/all-users`          | GET        | Obtener todos los usuarios                | Sí            | Sí - Administrador                  |
| `/user/details/:userId`    | GET        | Obtener detalles de un usuario por ID     | Sí            | Sí - Administrador                  |
| `/user/deactivate/:userId` | DELETE     | Desactivar un usuario por ID              | Sí            | Sí - Usuario activo y Administrador |
| `/user/activate/:userId`   | PATCH      | Activar un usuario por ID                 | Sí            | Sí - Administrador                  |

### Activity

| Endpoint     | Verbo HTTP | Acción                          | Autenticación | Autorización       |
| ------------ | ---------- | ------------------------------- | ------------- | ------------------ |
| `/activity/` | POST       | Registro de una nueva actividad | Sí            | Sí - Administrador |

Quiero informaros que el backend de Geek Gym se encuentra actualmente en una fase inicial de desarrollo. Aunque ya puedes aprovechar algunas funcionalidades, estoy trabajando para implementar características adicionales que mejorarán tu experiencia. En este momento, algunas de las funcionalidades, como la gestión de "Actividades", aún están en proceso de desarrollo.

## Contacto

- Email: sandrasuazo96@gmail.com
- Teléfono: +34 664 472 083
- Linkedin: https://www.linkedin.com/in/sandra-suazo/
