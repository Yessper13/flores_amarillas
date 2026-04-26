# 💛 Flores Amarillas - Mi Regalo Especial

Una aplicación moderna y personalizada construida con React, Vite y TailwindCSS. Un regalo especial para tu persona favorita.

## 🌟 Características

- **📷 Galería de Fotos**: Sube y visualiza tus fotos y videos favoritos
- **💬 Preguntas Diarias**: Responde preguntas especiales cada día con alarmas personalizables
- **🎁 Regalos Personalizables**: Crea regalos virtuales con animaciones
- **🌼 Flores Animadas**: Una hermosa animación de flores CSS
- **⏳ Spinners Intercambiables**: Personaliza los spinners de carga (Flor, Corazón, Puntos, Anillo)
- **🔐 Autenticación**: Acceso con código secreto único
- **🎨 Diseño Profesional**: Interfaz moderna con TailwindCSS y animaciones Framer Motion

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Icons**: Lucide React
- **Backend API**: Spring Boot (especificación incluida)

## 📋 Requisitos Previos

- Node.js 18+ 
- pnpm (o npm/yarn)
- Backend Spring Boot en ejecución en: `https://patronly-unpredicative-gigi.ngrok-free.dev`

## 🚀 Instalación Local

```bash
# Clonar el repositorio
git clone <repository-url>
cd flores_amarillas

# Instalar dependencias
pnpm install

# Crear archivo .env.local (ya incluido con valores por defecto)
# Los valores actuales son:
# VITE_API_URL=https://patronly-unpredicative-gigi.ngrok-free.dev
# VITE_SECRET_CODE=flores123

# Iniciar servidor de desarrollo
pnpm dev

# El app se abrirá automáticamente en http://localhost:5173
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── spinners/           # Componentes de spinners personalizables
│   │   ├── FlowerSpinner.tsx
│   │   ├── HeartSpinner.tsx
│   │   ├── DotsSpinner.tsx
│   │   ├── RingSpinner.tsx
│   │   └── Spinner.tsx     # Componente principal
│   ├── Navigation.tsx       # Navegación inferior
│   ├── Notification.tsx     # Sistema de notificaciones
│   └── AlarmNotification.tsx # Notificación de alarmas
├── pages/
│   ├── LoginPage.tsx        # Página de autenticación
│   ├── HomePage.tsx         # Página principal con fondo de galería
│   ├── GalleryPage.tsx      # Galería con subida de archivos
│   ├── QuestionsPage.tsx    # Preguntas diarias con alarmas
│   ├── GiftsPage.tsx        # Regalos personalizables
│   ├── FlowersPage.tsx      # Animación de flores
│   └── SettingsPage.tsx     # Configuración de la app
├── types/
│   └── index.ts             # Tipos TypeScript
├── store/
│   └── index.ts             # Zustand store global
├── lib/
│   └── api.ts               # Cliente API
├── App.tsx                  # Componente raíz con enrutador
├── main.tsx                 # Punto de entrada
└── index.css                # Estilos globales y tema

```

## 🔐 Autenticación

El app requiere un código secreto para acceder. Por defecto es `flores123`.

Para cambiar el código, edita `.env.local`:

```env
VITE_SECRET_CODE=tu_codigo_secreto
```

## 📱 Páginas

### 🔑 Login
- Pantalla de autenticación con código secreto
- Animación de flor
- Validación local

### 🏠 Home
- Fondo dinámico con fotos de la galería
- Acceso rápido a todas las secciones
- Contador de fotos en galería

### 📷 Galería
- Subida de fotos y videos mediante arrastrar y soltar
- Grid responsivo
- Eliminación de elementos
- Almacenamiento en servidor Spring Boot

### 💬 Preguntas
- Pregunta del día
- Sistema de respuestas
- Alarmas personalizables por hora
- Notificaciones en pantalla
- Historial de respuestas

### 🎁 Regalos
- Crear regalos virtuales personalizados
- Seleccionar tipo (Flor, Corazón, Personalizado)
- Elegir animación y color
- Visualización con preview
- Eliminar regalos

### 🌼 Flores
- Animación CSS de flores flotantes
- Cantidad de flores ajustable
- Múltiples estilos de animación
- Mensajes especiales

### ⚙️ Ajustes
- Personalizar spinner de carga
- Seleccionar colores
- Vista previa en vivo
- Información de la app
- Cerrar sesión

## 🌐 Variables de Entorno

```env
# URL del backend Spring Boot (requiere ngrok)
VITE_API_URL=https://patronly-unpredicative-gigi.ngrok-free.dev

# Código secreto para autenticación
VITE_SECRET_CODE=flores123
```

## 📤 Deploy a Vercel

### 1. Conectar GitHub
```bash
git push origin main
```

### 2. Crear proyecto en Vercel
```bash
vercel
```

### 3. Configurar variables de entorno en Vercel
En el dashboard de Vercel, añade en "Settings > Environment Variables":
```
VITE_API_URL=https://tu-ngrok-url.ngrok-free.dev
VITE_SECRET_CODE=tu_codigo_secreto
```

### 4. Deploy automático
Los cambios en main se despliegan automáticamente.

## 🔌 Backend Spring Boot

Para el backend, implementa los endpoints especificados en `API_SPECIFICATION.md`.

Requisitos del backend:
- Almacenamiento de archivos en `C:/proyectos/memories/galeria/`
- Base de datos MySQL con schema incluido
- CORS habilitado para Vercel
- Servir archivos estáticos desde el directorio de galería

## 🎨 Personalización de Tema

Los colores se definen en `src/index.css` con variables CSS:

```css
@theme {
  --color-primary: #fbbf24;      /* Amarillo */
  --color-secondary: #ec4899;    /* Rosa */
  --color-accent: #8b5cf6;       /* Morado */
  --color-background: #0f172a;   /* Fondo oscuro */
  --color-surface: #1e293b;      /* Superficies */
}
```

## 📞 Soporte

Si encuentras problemas:

1. Verifica que el backend esté corriendo
2. Comprueba las variables de entorno
3. Revisa la consola del navegador para errores
4. Asegúrate de que ngrok esté activo

## 📝 Licencia

Hecho con ❤️ para alguien especial.

## 🙏 Créditos

- **React**: UI library
- **Vite**: Build tool
- **TailwindCSS**: Styling
- **Framer Motion**: Animations
- **Zustand**: State management

---

**Hecho con amor 💛**
