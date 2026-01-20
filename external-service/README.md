# Catalog Mock Service 📦

## Cómo ejecutar el servicio

```bash
docker compose up -d
```

### 2. Levantar el contenedor

Ejecuta el siguiente comando en la terminal:

```bash
docker compose up
```

Posibles endpoints

```
GET http://localhost:3001/health

GET http://localhost:3001/products

GET http://localhost:3001/products/p-1001

GET /products?\_page=1&\_limit=20

GET /products?category=Audio

GET /products?title_like=teclado

```
