# Despliegue en Railway - Guía Paso a Paso

## ✅ Configuración Completada

Tu backend ya está configurado con:
- Scripts de build optimizados para Railway
- Configuración de Prisma para producción
- Archivos de configuración Railway (railway.json, Procfile)
- Variables de entorno documentadas (.env.example)

---

## 📋 Pasos para Desplegar

### 1️⃣ Preparar el Repositorio Git

```bash
# Asegúrate de estar en el directorio del backend
cd "/Users/caballerorandy/Desktop/Projects - 2024/My Projects/limo-rental/limo-rental-backend"

# Verificar el estado de git
git status

# Agregar todos los archivos
git add .

# Crear commit
git commit -m "Configure backend for Railway deployment"

# Si aún no has conectado con GitHub, crea un nuevo repositorio en GitHub y luego:
git branch -M main
git remote add origin https://github.com/TU-USUARIO/limo-rental-backend.git
git push -u origin main
```

### 2️⃣ Crear Cuenta en Railway

1. Ve a https://railway.app
2. Click en **"Start a New Project"** o **"Login"**
3. Conecta tu cuenta de GitHub
4. Autoriza Railway para acceder a tus repositorios

### 3️⃣ Crear Proyecto en Railway

1. Click en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Busca y selecciona tu repositorio `limo-rental-backend`
4. Railway comenzará a detectar tu proyecto automáticamente

### 4️⃣ Agregar Base de Datos PostgreSQL

1. En tu proyecto de Railway, click en **"New"** (botón +)
2. Selecciona **"Database"** → **"Add PostgreSQL"**
3. Railway creará automáticamente una base de datos PostgreSQL
4. La variable `DATABASE_URL` se generará automáticamente

### 5️⃣ Configurar Variables de Entorno

1. Click en tu servicio backend (no la base de datos)
2. Ve a la pestaña **"Variables"**
3. Agrega las siguientes variables:

```bash
# Railway ya proporciona DATABASE_URL automáticamente
# Solo necesitas agregar estas:

POSTGRES_PRISMA_URL=${{Postgres.DATABASE_URL}}
NODE_ENV=production
PORT=5001
FRONTEND_URL=https://limo-rental-frontend.vercel.app
```

**IMPORTANTE:** Para `POSTGRES_PRISMA_URL`, Railway te permite referenciar otras variables:
- Escribe exactamente: `${{Postgres.DATABASE_URL}}`
- Railway lo reemplazará automáticamente con la URL de tu base de datos

### 6️⃣ Ejecutar Migraciones de Base de Datos

Después del primer despliegue:

1. Ve a tu servicio backend en Railway
2. Click en **"Settings"** → **"Deploy"**
3. En la sección **"Custom Start Command"**, temporalmente cambia a:
   ```bash
   npm run deploy && npm start
   ```
4. Esto ejecutará `prisma db push` y luego iniciará el servidor

O alternativamente, usa la terminal de Railway:

1. Click en tu servicio
2. Ve a **"Settings"** → **"Project"**
3. Busca **"Service ID"** y cópialo
4. Instala Railway CLI:
   ```bash
   npm install -g @railway/cli
   railway login
   railway run npx prisma db push
   ```

### 7️⃣ Sembrar la Base de Datos (Opcional)

Si tienes un archivo de seed:

```bash
# Desde Railway CLI
railway run npm run prisma:seed
```

### 8️⃣ Generar Dominio Público

1. Click en tu servicio backend
2. Ve a **"Settings"** → **"Networking"**
3. Click en **"Generate Domain"**
4. Railway te dará una URL como: `https://tu-app.up.railway.app`
5. **COPIA ESTA URL** - la necesitarás para el frontend

### 9️⃣ Verificar el Despliegue

1. Visita tu URL de Railway: `https://tu-app.up.railway.app`
2. Deberías ver:
   ```json
   {
     "message": "🚗 Limo Rental API is running!",
     "version": "1.0.0",
     "status": "active"
   }
   ```

3. Prueba el endpoint de vehículos: `https://tu-app.up.railway.app/api/vehicles`

### 🔟 Actualizar Frontend

Ahora actualiza tu frontend con la nueva URL:

```bash
# En el proyecto frontend
cd "/Users/caballerorandy/Desktop/Projects - 2024/My Projects/limo-rental/limo-rental-frontend"

# Edita el archivo .env
# Cambia:
NEXT_PUBLIC_API_URL=https://tu-app.up.railway.app

# Commit y push
git add .
git commit -m "Update API URL to Railway deployment"
git push
```

---

## 🔍 Monitoreo y Logs

### Ver Logs en Tiempo Real

1. En Railway, click en tu servicio
2. Ve a la pestaña **"Deployments"**
3. Click en el deployment activo
4. Verás los logs en tiempo real

### Ver Métricas

1. Ve a la pestaña **"Metrics"**
2. Podrás ver:
   - CPU usage
   - Memory usage
   - Network usage
   - Request count

---

## 🛠️ Troubleshooting

### Error: "Prisma Client not generated"

Solución:
```bash
# Verifica que el script postinstall esté en package.json
# Debe tener: "postinstall": "prisma generate"
```

### Error: "Cannot connect to database"

Solución:
1. Verifica que `POSTGRES_PRISMA_URL` esté configurado correctamente
2. Verifica que la base de datos PostgreSQL esté corriendo
3. Revisa los logs en Railway

### Error: "Module not found"

Solución:
```bash
# Asegúrate de que todas las dependencias estén en dependencies (no en devDependencies)
# Railway no instala devDependencies en producción
```

### El build falla

Solución:
1. Verifica que `npm run build` funcione localmente
2. Revisa los logs de build en Railway
3. Asegúrate de que TypeScript compile sin errores

---

## 📝 Comandos Útiles Railway CLI

```bash
# Instalar CLI
npm install -g @railway/cli

# Login
railway login

# Link proyecto existente
railway link

# Ver logs
railway logs

# Ejecutar comando en Railway
railway run <comando>

# Ver variables de entorno
railway variables

# Abrir dashboard
railway open
```

---

## 🎉 ¡Listo!

Tu backend ahora está desplegado en Railway con:
- ✅ PostgreSQL Database
- ✅ Prisma ORM configurado
- ✅ Auto-deployments desde GitHub
- ✅ HTTPS automático
- ✅ Logs y métricas
- ✅ Escalabilidad automática

Cada vez que hagas push a tu repositorio, Railway automáticamente:
1. Detectará los cambios
2. Ejecutará `npm run build`
3. Generará Prisma Client
4. Desplegará la nueva versión
5. Reiniciará el servidor

---

## 📧 Soporte

Si tienes problemas:
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Prisma Docs: https://www.prisma.io/docs
