# Guía de Despliegue - Flores Amarillas App v2.0

## Resumen Ejecutivo

Tu aplicación de regalo personalizada está lista para ser desplegada en Vercel. Esta es una aplicación React moderna con diseño profesional que se comunica con un backend Spring Boot.

## Estructura del Proyecto

```
flores_amarillas/
├── src/
│   ├── components/
│   │   ├── spinners/          # 4 spinners personalizables
│   │   ├── Navigation.tsx      # Navegación inferior
│   │   ├── Notification.tsx    # Notificaciones
│   │   └── AlarmNotification.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx       # Autenticación con código secreto
│   │   ├── HomePage.tsx        # Home con fondo de galería
│   │   ├── GalleryPage.tsx     # Galería con upload
│   │   ├── QuestionsPage.tsx   # Preguntas + alarmas
│   │   ├── GiftsPage.tsx       # Regalos personalizables
│   │   ├── FlowersPage.tsx     # Animación de flores
│   │   └── SettingsPage.tsx    # Configuración
│   ├── types/
│   ├── store/
│   ├── lib/
│   ├── App.tsx                 # Router principal
│   └── index.css               # Estilos globales
├── API_SPECIFICATION.md        # Especificación para Spring Boot
├── README.md                   # Documentación completa
└── vercel.json                 # Configuración de Vercel

```

## Pasos de Despliegue

### 1. Configurar Git y Push

```bash
# Asegúrate de estar en la rama main
git checkout main

# Agregar todos los cambios
git add .

# Commit
git commit -m "feat: Frontend React Flores Amarillas v2.0 - Redesign completo"

# Push
git push origin main
```

### 2. Crear Proyecto en Vercel

**Opción A: Desde CLI**
```bash
vercel
```

**Opción B: Desde Dashboard**
1. Ir a https://vercel.com
2. Click en "New Project"
3. Importar repositorio de GitHub
4. Seleccionar "Yessper13/flores_amarillas"

### 3. Configurar Variables de Entorno

En el dashboard de Vercel, ir a **Settings > Environment Variables** y añadir:

```
VITE_API_URL=https://patronly-unpredicative-gigi.ngrok-free.dev
VITE_SECRET_CODE=flores123
```

### 4. Deploy

El proyecto se desplegará automáticamente cuando hagas push a main. Vercel construirá la app y la publicará.

## Verificar Deploy

1. Accede a tu URL de Vercel (ej: `flores-amarillas.vercel.app`)
2. Ingresa el código secreto: `flores123`
3. Verifica que todas las páginas funcionen

## Backend Spring Boot - Especificación

El frontend espera un backend que implemente los siguientes endpoints:

### Autenticación
- `POST /api/auth/verify` - Verificar código secreto

### Galería
- `GET /api/gallery` - Obtener todas las fotos
- `POST /api/gallery/upload` - Subir foto/video
- `DELETE /api/gallery/{id}` - Eliminar foto

### Preguntas
- `GET /api/questions/daily` - Obtener pregunta del día
- `POST /api/questions/{id}/answer` - Guardar respuesta
- `GET /api/questions/history` - Historial de preguntas

### Alarmas
- `POST /api/alarms` - Crear alarma
- `GET /api/alarms` - Obtener alarmas
- `DELETE /api/alarms/{id}` - Eliminar alarma

### Regalos
- `GET /api/gifts` - Obtener todos los regalos
- `POST /api/gifts` - Crear regalo personalizado
- `DELETE /api/gifts/{id}` - Eliminar regalo

### Ajustes
- `GET /api/settings` - Obtener configuración
- `PUT /api/settings` - Actualizar configuración

Ver `API_SPECIFICATION.md` para detalles completos.

## Consideraciones Importantes

### ngrok URL
El backend actualmente está configurado para usar:
```
https://patronly-unpredicative-gigi.ngrok-free.dev
```

Cambios necesarios en Vercel:
- Si la URL de ngrok cambia, actualiza `VITE_API_URL` en Variables de Entorno

### CORS
Asegúrate que tu backend tiene CORS habilitado para:
- `https://flores-amarillas.vercel.app` (producción)
- `http://localhost:5173` (desarrollo local)

### Almacenamiento de Archivos
El backend debe almacenar fotos en:
```
C:/proyectos/memories/galeria/
```

Y servir URLs como:
```
https://tu-ngrok-url.ngrok-free.dev/api/gallery/images/{filename}
```

## Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview del build
pnpm preview
```

## Variables de Entorno Locales

El archivo `.env.local` contiene valores por defecto para desarrollo:

```env
VITE_API_URL=https://patronly-unpredicative-gigi.ngrok-free.dev
VITE_SECRET_CODE=flores123
```

## Característica Principales Implementadas

✓ Autenticación con código secreto  
✓ Galería de fotos con upload arrastrar-soltar  
✓ Preguntas diarias con sistema de alarmas  
✓ Regalos virtuales personalizables  
✓ 4 tipos de spinners de carga (Flor, Corazón, Puntos, Anillo)  
✓ Animación de flores CSS  
✓ Navegación intuitiva con bottom nav  
✓ Sistema de notificaciones en pantalla  
✓ Diseño responsivo y moderno  
✓ TailwindCSS con tema personalizado  
✓ Framer Motion para animaciones suaves  
✓ Zustand para state management  

## Troubleshooting

### Error: "Cannot connect to API"
- Verifica que ngrok esté corriendo
- Verifica que la URL de ngrok es correcta en Variables de Entorno
- Comprueba CORS en el backend

### Error: "Código secreto inválido"
- Verifica que `VITE_SECRET_CODE` coincide en backend y frontend
- Revisa que el endpoint de verificación está implementado

### Fotos no cargan
- Verifica que los archivos están en `C:/proyectos/memories/galeria/`
- Comprueba que las URLs de las fotos son accesibles
- Verifica CORS

### Alarmas no funcionan
- Las alarmas solo notifican cuando la app está abierta
- Verifica que el sistema de alarmas está implementado en el backend
- Comprueba que el endpoint `/api/alarms` devuelve datos correctos

## Próximos Pasos

1. Implementa los endpoints del backend en Spring Boot
2. Configura la base de datos MySQL según el schema en API_SPECIFICATION.md
3. Prueba localmente antes de desplegar
4. Desplega a Vercel cuando el backend esté listo
5. Actualiza las URLs de ngrok si es necesario

## Soporte

Para problemas o preguntas:
1. Revisa el README.md para documentación completa
2. Consulta API_SPECIFICATION.md para detalles técnicos
3. Verifica los logs de Vercel en el dashboard

---

Hecho con amor para alguien especial. Buena suerte con el despliegue!
