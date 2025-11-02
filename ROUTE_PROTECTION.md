# 🔒 Protección de Rutas del Backend

Este documento describe el sistema de autenticación y autorización implementado para todas las rutas de la API.

## 🛡️ Middleware de Seguridad

### `requireAuth`
- Verifica que el usuario esté autenticado con Clerk
- Valida el token JWT en el header `Authorization: Bearer <token>`
- Agrega información del usuario a `req.user` y `req.auth`

### `requireAdmin`
- Verifica que el usuario tenga rol de `admin` en `publicMetadata`
- Debe usarse DESPUÉS de `requireAuth`

---

## 📋 Rutas Protegidas

### **VEHICLES (Vehículos)** `/api/vehicles`

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| GET | `/` | 🌍 **Público** | Ver todos los vehículos |
| GET | `/:id` | 🌍 **Público** | Ver un vehículo específico |
| POST | `/` | 🔒 **Solo Admin** | Crear nuevo vehículo |
| PUT | `/:id` | 🔒 **Solo Admin** | Actualizar vehículo |
| DELETE | `/:id` | 🔒 **Solo Admin** | Eliminar vehículo |

**Implementación:**
```typescript
router.post("/", requireAuth, requireAdmin, vehicleController.createVehicle);
router.put("/:id", requireAuth, requireAdmin, vehicleController.updateVehicle);
router.delete("/:id", requireAuth, requireAdmin, vehicleController.deleteVehicle);
```

---

### **BOOKINGS (Reservaciones)** `/api/bookings`

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| GET | `/` | 🔒 **Solo Admin** | Ver todas las reservas |
| GET | `/:id` | 🔐 **Usuario Autenticado** | Ver su propia reserva |
| GET | `/number/:bookingNumber` | 🔐 **Usuario Autenticado** | Buscar por número de reserva |
| POST | `/` | 🔐 **Usuario Autenticado** | Crear nueva reserva |
| PUT | `/:id` | 🔒 **Solo Admin** | Modificar reserva |
| PATCH | `/:id/status` | 🔒 **Solo Admin** | Cambiar estado de reserva |
| DELETE | `/:id` | 🔒 **Solo Admin** | Cancelar reserva |

**Implementación:**
```typescript
// Solo admin
router.get("/", requireAuth, requireAdmin, bookingController.getAllBookings);
router.put("/:id", requireAuth, requireAdmin, bookingController.updateBooking);
router.patch("/:id/status", requireAuth, requireAdmin, bookingController.updateBookingStatus);
router.delete("/:id", requireAuth, requireAdmin, bookingController.deleteBooking);

// Usuario autenticado
router.get("/number/:bookingNumber", requireAuth, bookingController.getBookingByNumber);
router.get("/:id", requireAuth, bookingController.getBookingById);
router.post("/", requireAuth, bookingController.createBooking);
```

---

### **SERVICES (Servicios)** `/api/services`

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| GET | `/` | 🌍 **Público** | Ver todos los servicios |
| GET | `/slug/:slug` | 🌍 **Público** | Ver servicio por slug |
| GET | `/:id` | 🌍 **Público** | Ver un servicio específico |
| POST | `/` | 🔒 **Solo Admin** | Crear nuevo servicio |
| PUT | `/:id` | 🔒 **Solo Admin** | Actualizar servicio |
| DELETE | `/:id` | 🔒 **Solo Admin** | Eliminar servicio |

**Implementación:**
```typescript
// Público
router.get("/", serviceController.getAllServices);
router.get("/slug/:slug", serviceController.getServiceBySlug);
router.get("/:id", serviceController.getServiceById);

// Solo admin
router.post("/", requireAuth, requireAdmin, serviceController.createService);
router.put("/:id", requireAuth, requireAdmin, serviceController.updateService);
router.delete("/:id", requireAuth, requireAdmin, serviceController.deleteService);
```

---

### **CONTACTS (Mensajes de Contacto)** `/api/contacts`

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| GET | `/` | 🔒 **Solo Admin** | Ver todos los mensajes |
| GET | `/:id` | 🔒 **Solo Admin** | Ver un mensaje específico |
| POST | `/` | 🌍 **Público** | Enviar mensaje de contacto |
| PATCH | `/:id/status` | 🔒 **Solo Admin** | Cambiar estado del mensaje |
| DELETE | `/:id` | 🔒 **Solo Admin** | Eliminar mensaje |

**Implementación:**
```typescript
// Público
router.post("/", contactController.createContact);

// Solo admin
router.get("/", requireAuth, requireAdmin, contactController.getAllContacts);
router.get("/:id", requireAuth, requireAdmin, contactController.getContactById);
router.patch("/:id/status", requireAuth, requireAdmin, contactController.updateContactStatus);
router.delete("/:id", requireAuth, requireAdmin, contactController.deleteContact);
```

---

## 🎯 Resumen de Niveles de Acceso

### 🌍 **Público** (Sin autenticación)
- Ver vehículos (GET)
- Ver servicios (GET)
- Enviar mensaje de contacto (POST)

### 🔐 **Usuario Autenticado**
- Crear reserva
- Ver su propia reserva
- Buscar su reserva por número

### 🔒 **Solo Administradores**
- **Vehículos**: Crear, editar, eliminar
- **Servicios**: Crear, editar, eliminar
- **Reservas**: Ver todas, modificar, cancelar
- **Contactos**: Ver todos, gestionar

---

## ⚙️ Configuración de Admin

Para asignar rol de administrador a un usuario:

1. Ve a https://dashboard.clerk.com/
2. Users → Selecciona el usuario
3. Metadata → Public metadata
4. Agrega:
```json
{
  "role": "admin"
}
```

---

## 🧪 Testing

### Probar con token válido:
```bash
# Obtener token desde el navegador (consola)
const token = await window.Clerk.session.getToken();

# Hacer petición con token
curl -X POST http://localhost:5001/api/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Test Vehicle",...}'
```

### Respuestas de Error:
- **401 Unauthorized**: No token o token inválido
- **403 Forbidden**: Usuario autenticado pero no es admin
