# Childrens Hospital - Nativo Digital
Desarrollado por: [Monica Garcilazo](https://github.com/MoniGarcilazo)

## Requisitos previos
> [!IMPORTANT]
> Para poder hacer uso de la aplicación completa de Childrens Hospital es
> necesario tener instaladas las siguientes tecnologías:

- [x] [PostgreSQL](https://www.postgresql.org/download/)
- [x] [Node.js](https://nodejs.org/en/download/package-manager)

## 1. Primeros pasos
### 1.1 Instalar las dependencias del backend
Ubicados en la carpeta referente al backend se debe ejecutar el comando:

`npm install`

### 1.2 Crear la base de datos
Tener el servicio de PostgreSQL activo y luego ejecutar el siguiente
comando:

`npx prisma migrate dev`

## 2. Levantar la API
Para levantar los servicios de la API se debió cumplir el paso 1 en su totalidad
y entonces ejecutar lo siguiente:

`npm start`

## 3. Levantar el frontend
Es necesario haber cumplido con los pasos 1 y 2.

### Instalar las dependencias del frontend
Ubicados en la caperta correspondiente del frontend se debe ejecutar el comando:

`npm install`

### Levantar el servicio frontend
Mediante el siguiente comando se puede realizar la acción:

`npm run dev`
