# Eldar Challenge

## Descripción

Esta es una aplicación web que permite a los usuarios autenticarse y visualizar información desde una API. Los usuarios pueden tener dos roles: `admin` y `user`. El rol `admin` tiene permisos para realizar operaciones CRUD (crear, leer, actualizar y eliminar), mientras que el rol `user` solo puede ver los datos.

## Características

- **Autenticación de Usuarios**: Sistema de autenticación básico que valida las credenciales al iniciar sesión.
- **Roles de Usuario**: Dos roles definidos, `admin` y `user`, con diferentes permisos.
- **Protección de Rutas**: Implementación de enrutamiento protegido para gestionar el acceso a diferentes páginas según el rol.
- **Operaciones CRUD**: 
  - **User**: Acceso de solo lectura.
  - **Admin**: Permite realizar operaciones de creación y edición de datos.
- **Interfaz de Usuario**: 
  - Página de inicio de sesión.
  - Página de visualización de información con opciones de edición para `admin`.
- **Estilización**: Utiliza CSS y/o frameworks para una interfaz de usuario atractiva y responsiva.

## Requisitos

- Node.js y npm instalados en tu máquina.
- Una cuenta de GitHub para gestionar el repositorio.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/eldar-challenge.git
2. Instalar dependencias: Corre en tu consola el comando `npm install`
3. Inicia el proyecto: Corre el comando `npm start`

## Accesos

- **Admin**:
  - **Usuario**: `admin`
  - **Contraseña**: `admin`

- **User**:
  - **Usuario**: Puedes usar cualquier nombre de usuario.
  - **Contraseña**: Puedes usar cualquier contraseña.
