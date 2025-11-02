# Limo Rental Backend

Backend API con Express, TypeScript, Prisma y PostgreSQL.

## 🚀 Setup Inicial

```bash
# 1. Generar el cliente de Prisma
npm run prisma:generate

# 2. Crear las tablas en la base de datos
npm run prisma:migrate
# Nombre de migración: init

# 3. Poblar la base de datos con datos de prueba
npm run prisma:seed

# 4. Iniciar servidor de desarrollo
npm run dev
```

## 📝 Scripts Disponibles

```bash
npm run dev              # Desarrollo con hot-reload
npm run build            # Compilar TypeScript
npm start                # Producción

npm run prisma:generate  # Generar cliente Prisma
npm run prisma:migrate   # Crear migración
npm run prisma:studio    # GUI para ver la BD
npm run prisma:seed      # Poblar BD con datos de prueba
```

## 📁 Estructura

```
src/
├── controllers/  # Manejo de requests/responses
├── services/     # Lógica de negocio y BD
├── routes/       # Definición de endpoints
├── middleware/   # Middleware personalizado
├── utils/        # Utilidades (Prisma client, etc)
└── index.ts      # Archivo principal
```

## 🔨 Cómo Crear una Ruta

1. **Service** (`src/services/`) - Interactúa con la BD
2. **Controller** (`src/controllers/`) - Valida y llama al service
3. **Routes** (`src/routes/`) - Define los endpoints
4. **Registrar** en `src/index.ts`

Ver archivos creados para ejemplos detallados.

## 📊 Prisma Studio

Ver y editar datos visualmente:

```bash
npm run prisma:studio
```

Abre en: http://localhost:5555
