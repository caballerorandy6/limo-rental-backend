# 🐳 Docker Setup - Limo Rental Backend

Configuración Docker profesional con multi-stage builds, desarrollo con hot-reload, y optimizaciones de producción.

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Arquitectura](#arquitectura)
- [Quick Start](#quick-start)
- [Scripts Disponibles](#scripts-disponibles)
- [Desarrollo Local](#desarrollo-local)
- [Producción](#producción)
- [Railway Deployment](#railway-deployment)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Requisitos Previos

```bash
# Verifica que tengas Docker instalado
docker --version
# Docker version 24.0.0 o superior

docker-compose --version
# Docker Compose version 2.20.0 o superior
```

**Si no tienes Docker:**
- macOS: https://docs.docker.com/desktop/install/mac-install/
- Windows: https://docs.docker.com/desktop/install/windows-install/
- Linux: https://docs.docker.com/engine/install/

---

## 🏗️ Arquitectura

### Multi-Stage Dockerfile

```
┌─────────────────────────────────────────┐
│ Stage 1: deps                           │
│ - Instala dependencias                  │
│ - Genera Prisma Client                  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Stage 2: builder                        │
│ - Compila TypeScript                    │
│ - Ejecuta build                         │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Stage 3: runner (Production)            │
│ - Solo dependencias de producción      │
│ - Usuario no-root (seguridad)          │
│ - Health checks                         │
│ - Imagen final: ~150MB                  │
└─────────────────────────────────────────┘
```

### Docker Compose Development

```
┌──────────────────┐      ┌──────────────────┐
│   PostgreSQL     │◄────►│  Backend (Dev)   │
│  Port: 5433      │      │  Port: 5001      │
│  Password: ***   │      │  Hot Reload ✓    │
└──────────────────┘      └──────────────────┘
         ↑
         │
   Volume: postgres_data
```

---

## 🚀 Quick Start

### Opción 1: Docker Compose (Recomendado para desarrollo)

```bash
# 1. Levantar servicios (PostgreSQL + Backend)
npm run docker:dev

# 2. Ver logs
npm run docker:dev:logs

# 3. Verificar que funciona
curl http://localhost:5001/health

# 4. Parar servicios
npm run docker:dev:down
```

### Opción 2: Solo Docker

```bash
# 1. Build imagen
npm run docker:build

# 2. Ejecutar contenedor
npm run docker:run

# 3. Ver logs
npm run docker:logs
```

---

## 📝 Scripts Disponibles

### Development

| Script | Descripción |
|--------|-------------|
| `npm run docker:dev` | Inicia PostgreSQL + Backend en modo desarrollo |
| `npm run docker:dev:build` | Reconstruye las imágenes y las inicia |
| `npm run docker:dev:logs` | Ver logs del backend en tiempo real |
| `npm run docker:dev:down` | Detener todos los servicios |
| `npm run docker:dev:clean` | Detener y eliminar volúmenes (limpieza completa) |

### Production

| Script | Descripción |
|--------|-------------|
| `npm run docker:prod` | Ejecuta en modo producción |
| `npm run docker:prod:build` | Build y ejecuta producción |
| `npm run docker:prod:down` | Detener producción |

### Standalone Docker

| Script | Descripción |
|--------|-------------|
| `npm run docker:build` | Build imagen de Docker |
| `npm run docker:run` | Ejecutar contenedor standalone |
| `npm run docker:ps` | Ver todos los contenedores |
| `npm run docker:logs` | Ver logs del contenedor |
| `npm run docker:shell` | Acceder a shell del contenedor |

---

## 💻 Desarrollo Local

### 1️⃣ Primera vez

```bash
# Levantar servicios
npm run docker:dev:build

# Espera ~30 segundos para el primer build

# Verificar logs
npm run docker:dev:logs
```

Deberías ver:
```
✅ Server running on port 5001
🌍 Environment: development
🔗 Frontend URL: http://localhost:3000
```

### 2️⃣ Aplicar migraciones de base de datos

```bash
# Opción A: Desde el contenedor
docker exec -it limo-rental-backend npm run prisma:push

# Opción B: Usar CLI local apuntando a Docker
POSTGRES_PRISMA_URL="postgresql://postgres:postgres@localhost:5433/limo-rental-store" \
  npx prisma db push
```

### 3️⃣ Sembrar base de datos

```bash
docker exec -it limo-rental-backend npm run prisma:seed
```

### 4️⃣ Ver base de datos con Prisma Studio

```bash
# Desde el contenedor
docker exec -it limo-rental-backend npm run prisma:studio

# O desde local
POSTGRES_PRISMA_URL="postgresql://postgres:postgres@localhost:5433/limo-rental-store" \
  npx prisma studio
```

### 5️⃣ Hot Reload

El código en `./src` y `./prisma` está montado en el contenedor.

**Cualquier cambio se refleja automáticamente** gracias a `nodemon`.

### 6️⃣ Conectar DBeaver a PostgreSQL Docker

**Nueva Conexión:**
```
Host:     localhost
Port:     5433
Database: limo-rental-store
Username: postgres
Password: postgres
```

Tu PostgreSQL local (puerto 5432) sigue funcionando normalmente.

---

## 🏭 Producción

### Build Optimizado

```bash
# Build imagen de producción
docker build -t limo-rental-backend:prod --target runner .

# Ver tamaño de la imagen
docker images limo-rental-backend:prod
# ~150MB (vs ~500MB sin multi-stage)
```

### Variables de Entorno Producción

```bash
# Crea .env.production
PORT=5001
NODE_ENV=production
POSTGRES_PRISMA_URL="postgresql://user:password@host:5432/database"
FRONTEND_URL="https://your-frontend.vercel.app"
```

### Ejecutar Producción Localmente

```bash
# Con docker-compose
npm run docker:prod:build

# O standalone
docker run -d \
  --name limo-backend-prod \
  --env-file .env.production \
  -p 5001:5001 \
  limo-rental-backend:prod
```

---

## 🚂 Railway Deployment

Railway detecta automáticamente el `Dockerfile` y lo usa.

### Paso 1: Push a GitHub

```bash
git add .
git commit -m "Add Docker configuration"
git push
```

### Paso 2: Deploy en Railway

1. **New Project** → **Deploy from GitHub repo**
2. Selecciona tu repositorio
3. Railway automáticamente:
   - Detecta el `Dockerfile`
   - Usa multi-stage build
   - Ejecuta `npm start`

### Paso 3: Agregar PostgreSQL

1. **New** → **Database** → **Add PostgreSQL**
2. Railway crea `DATABASE_URL` automáticamente

### Paso 4: Variables de Entorno

En Railway → Variables:

```bash
POSTGRES_PRISMA_URL=${{Postgres.DATABASE_URL}}
NODE_ENV=production
PORT=5001
FRONTEND_URL=https://your-frontend.vercel.app
```

### Paso 5: Ejecutar Migraciones

Railway CLI:
```bash
railway login
railway link
railway run npx prisma db push
railway run npm run prisma:seed
```

### Paso 6: Generate Domain

Settings → Networking → Generate Domain

Copia la URL: `https://your-app.up.railway.app`

---

## 🔍 Troubleshooting

### El backend no inicia

```bash
# Ver logs completos
docker-compose logs backend

# Si falla Prisma:
docker exec -it limo-rental-backend npx prisma generate

# Reiniciar todo
npm run docker:dev:clean
npm run docker:dev:build
```

### No puede conectarse a PostgreSQL

```bash
# Verificar que PostgreSQL está corriendo
docker ps | grep postgres

# Verificar health check
docker inspect limo-rental-db | grep Health

# Ver logs de PostgreSQL
docker logs limo-rental-db
```

### Port 5433 ya está en uso

```bash
# Ver qué proceso usa el puerto
lsof -i :5433

# O cambiar puerto en docker-compose.yml:
ports:
  - "5434:5432"  # Cambiar 5433 por 5434
```

### Cambios no se reflejan (hot reload no funciona)

```bash
# Verificar que los volúmenes están montados
docker inspect limo-rental-backend | grep Mounts -A 20

# Reiniciar el backend
docker restart limo-rental-backend

# Si persiste, rebuild:
npm run docker:dev:build
```

### Limpiar todo y empezar de cero

```bash
# Eliminar contenedores, volúmenes e imágenes
npm run docker:dev:clean
docker system prune -a --volumes

# Rebuild desde cero
npm run docker:dev:build
```

### Error: Prisma Client not generated

```bash
# Regenerar Prisma Client
docker exec -it limo-rental-backend npx prisma generate

# O rebuild la imagen
npm run docker:dev:build
```

### Ver uso de recursos

```bash
# Stats en tiempo real
docker stats

# O con docker-compose
docker-compose stats
```

---

## 📊 Comparación: Local vs Docker

| Aspecto | Desarrollo Local | Docker Compose |
|---------|------------------|----------------|
| Setup inicial | 2 min | 5 min (primera vez) |
| PostgreSQL | Requiere instalación | Incluido |
| Dependencias | npm install local | Aislado en contenedor |
| Hot reload | ✅ | ✅ |
| Limpieza | Manual | `docker:dev:clean` |
| Portabilidad | Solo tu Mac | Cualquier máquina |
| Producción | Diferente | Idéntico |

---

## 🎓 Comandos Docker Útiles

```bash
# Ver contenedores corriendo
docker ps

# Ver todos los contenedores (incluidos detenidos)
docker ps -a

# Ver logs de un contenedor
docker logs -f <container_name>

# Acceder a shell del contenedor
docker exec -it <container_name> sh

# Ver uso de recursos
docker stats

# Eliminar contenedor
docker rm -f <container_name>

# Eliminar imagen
docker rmi <image_name>

# Limpiar sistema completo
docker system prune -a --volumes
```

---

## 📚 Recursos

- [Docker Docs](https://docs.docker.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Prisma + Docker](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-railway)

---

## ✅ Checklist Deploy

Antes de hacer push a producción:

- [ ] `npm run docker:build` funciona sin errores
- [ ] Health check responde en `/health`
- [ ] Variables de entorno configuradas
- [ ] Migraciones aplicadas
- [ ] Seed ejecutado (si aplica)
- [ ] Frontend actualizado con nueva API URL
- [ ] CORS configurado correctamente
- [ ] Logs no muestran errores
- [ ] Tests pasan (si tienes)

---

## 🎉 ¡Listo!

Ahora tienes una configuración Docker profesional lista para:
- ✅ Desarrollo local con hot reload
- ✅ Producción optimizada
- ✅ Deploy en Railway/cualquier cloud
- ✅ CI/CD ready
- ✅ Team onboarding simplificado

**¿Problemas?** Revisa la sección [Troubleshooting](#troubleshooting)
