# Wishlist API

API REST para gestión de listas de deseos que permite a los usuarios guardar sus productos favoritos desde un catálogo externo. Construida con NestJS y PostgreSQL.

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Características Principales

- **Gestión de Favoritos:** Los usuarios pueden agregar, consultar y eliminar productos de su wishlist personal.
- **Integración con Catálogo Externo:** Consulta productos desde un servicio de catálogo independiente vía API REST.
- **Tests E2E Completos:** Suite de pruebas end-to-end para garantizar el correcto funcionamiento de todos los endpoints.

## 🏗️ Arquitectura

El proyecto está compuesto por tres servicios principales:

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  Wishlist API   │─────▶│ Catalog Service  │      │   PostgreSQL    │
│   (Puerto 3000) │      │   (Puerto 3001)  │      │  (Puerto 5432)  │
└─────────────────┘      └──────────────────┘      └─────────────────┘
        │                                                    │
        └────────────────────────────────────────────────────┘
                    Almacena productos favoritos
```

## 📡 Endpoints Disponibles

### Productos (Catálogo)
- `GET /products` - Obtener todos los productos del catálogo
- `GET /products/:id` - Obtener un producto específico por ID

### Favoritos (Wishlist)
- `GET /users/:userId/wishlist` - Obtener la wishlist de un usuario
- `POST /users/:userId/wishlist` - Agregar un producto a la wishlist
- `DELETE /users/:userId/wishlist/:productId` - Eliminar un producto de la wishlist
- `GET /users/:userId/wishlist/:productId` - Obtener un favorito específico

## 🚀 Instalación y Uso

### Requisitos Previos

- [Docker](https://www.docker.com/get-started) y Docker Compose
- [pnpm](https://pnpm.io/installation) (gestor de paquetes)
- Node.js v18 o superior

### Pasos de Instalación

1. **Clona este repositorio**
   ```bash
   git clone https://github.com/R-javier/wishlist.git
             

   cd wishlist
   ```

2. **Configura las variables de entorno**
   
   Copia el archivo de ejemplo y completa los valores:
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` y configura:
   ```env
   DB_PASSWORD=tu_contraseña_segura
   DB_NAME=wishlist_db
   # El resto de las variables ya tienen valores por defecto
   ```

3. **Instala las dependencias**
   ```bash
   pnpm install
   ```

4. **Levanta los servicios con Docker Compose**
   ```bash
   docker-compose up -d
   ```
   
   Esto iniciará:
   - 🗄️ PostgreSQL en `localhost:5432`
   - 📦 Catalog Service en `localhost:3001`

5. **Inicia la aplicación**
   ```bash
   pnpm run start:dev
   ```
   
   La API estará disponible en `http://localhost:3000`


### Ejecutar todos los tests E2E

```bash
pnpm run test:e2e
```

### Ejecutar tests específicos

```bash
# Solo tests de productos
pnpm run test:e2e -- test/products.e2e.spec.ts

# Solo tests de usuarios/wishlist
pnpm run test:e2e -- test/users.e2e.spec.ts
```


```

## 🐳 Docker Compose

El archivo `docker-compose.yml` incluye:

```yaml
services:
  postgres:       # Base de datos PostgreSQL
  catalog:        # Servicio de catálogo externo
```


## 📝 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `DB_HOST` | Host de PostgreSQL | `localhost` |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_USERNAME` | Usuario de la BD | `postgres` |
| `DB_PASSWORD` | Contraseña de la BD | ⚠️ **Configurar** |
| `DB_NAME` | Nombre de la BD | ⚠️ **Configurar** |
| `CATALOG_SERVICE_URL` | URL del catálogo | `http://localhost:3001/products` |


