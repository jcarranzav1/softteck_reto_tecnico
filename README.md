# Soft Reto Técnico 🚀

Este proyecto es una API RESTful **serverless** desplegada en AWS que integra datos de **Star Wars API (SWAPI)** y *
*REST Countries API**, fusionando la información y almacenándola en **MySQL** con un sistema de caché en **DynamoDB**.

---

## 📚 Tecnologías usadas

- **Serverless Framework**
- **Express.js**
- **Drizzle ORM**
- **InversifyJS**
- **MySQL** (RDS en AWS)
- **DynamoDB** (caché de consultas externas)
- **CloudFront** (para servir Swagger UI)

La arquitectura implementada es **Hexagonal con DDD**.  
Cada endpoint corre en **una Lambda independiente**, gestionada mediante **API Gateway**.

---

## 🌍 APIs externas utilizadas

- **[Star Wars API (SWAPI)](https://swapi.dev/)**
- **[REST Countries API](https://restcountries.com/)**

---

## 🔐 Seguridad

Todas las APIs (excepto `/signup` y `/login`) están protegidas con **JWT**.

- **`/signup`** → para registrar un usuario.
- **`/login`** → para obtener el token JWT que da acceso a las demás rutas.

---

## 💾 Base de datos

Se utiliza **MySQL** (AWS RDS).

- En **producción**, el `MYSQL_HOST` se genera automáticamente después de crear la instancia.
- **Para correrlo offline**, debes hacer un **deploy** primero para que la instancia exista y luego agregar el
  `MYSQL_HOST` manualmente.

En la carpeta `.scripts/` encontrarás los **SQL** para crear las tablas necesarias para el proyecto.

---

## 🗃️ API de almacenamiento

Para la API de almacenamiento se utiliza como ejemplo **un perfil de GTA V**.  
Esto es solo una muestra para ilustrar la persistencia y no está vinculado con datos reales.

---

## 📄 Variables de entorno

En el proyecto encontrarás un archivo **`.env.example`** que contiene las variables necesarias.  
Puedes configurar las credenciales de la base de datos **a tu gusto**, excepto el **MYSQL_HOST** (en deploy se genera
automáticamente).

Si quieres correrlo offline:

1. Haz deploy para crear la instancia RDS.
2. Copia el `MYSQL_HOST` que genera AWS y colócalo en tu `.env`.

**`.env.example`**

```env
MYSQL_HOST=
MYSQL_PORT=3306
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB=
DDB_CACHE_TABLE=fusion-cache
JWT_SECRET=
```

💡 **Nota:**  
Las credenciales (`MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DB`) son las que usarás para conectarte desde tu gestor de base
de datos.  
El `MYSQL_HOST` solo se añade si vas a ejecutar el proyecto en **offline**, y únicamente después de hacer deploy para
que la instancia exista.

---

## 📦 Deploy

El deploy crea automáticamente:

- Instancia **RDS MySQL**
- **Bucket S3** para Swagger UI
- **Distribución CloudFront** para exponer el Swagger
- **Lambdas** y **API Gateway** para cada endpoint

**Pasos para deploy:**

```bash
npm install -g pnpm
pnpm install
pnpm run deploy
```

⚠️ **Importante:** Para usar **Serverless Framework** debes tener configuradas tus credenciales de AWS CLI.  
Si no las tienes configuradas, ejecuta:

```bash
aws configure
```

## 🗂️ Arquitectura

- **Hexagonal Architecture + Domain Driven Design (DDD)**
- **Express** como capa de API
- **Serverless Framework** para empaquetado y despliegue
- **Drizzle ORM** para acceso a datos
- **InversifyJS** para inyección de dependencias
- **DynamoDB** para caché temporal de resultados de APIs externas
- **CloudFront** para servir la documentación Swagger
- Cada endpoint es una **Lambda independiente** expuesta por **API Gateway**

## ⚡ Endpoints principales

- `GET /fusionados` → Fusiona datos de **SWAPI** y **REST Countries**
- `GET /historial` → Consulta el historial de fusiones
- `POST /almacenar` → Guarda datos (ejemplo: perfil **GTA V**)
- `POST /auth/signup` → Registro de usuario
- `POST /auth/login` → Obtiene token **JWT**

## 📜 Swagger Documentation

Para ver la documentación de la API en Swagger, debes usar la **URI de CloudFront** que se genera en el deploy.  
Esta URI se encuentra configurada como output en el `serverless.yaml`.  
Por ejemplo, actualmente hay una versión ya subida y accesible en:  
[https://dd1a3dy93gbal.cloudfront.net/?url=softteck](https://dd1a3dy93gbal.cloudfront.net/?url=softteck)

Puedes usar esa o la que se genere con tu propio deploy.