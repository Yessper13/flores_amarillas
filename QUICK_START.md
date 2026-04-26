# Quick Start - Flores Amarillas v2.0

## 30 segundos para empezar

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar servidor
pnpm dev

# 3. Abrir navegador en http://localhost:5173
# 4. Ingresa código: flores123
```

## Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `README.md` | Documentación completa |
| `API_SPECIFICATION.md` | Especificación para Spring Boot |
| `DEPLOYMENT.md` | Guía de despliegue a Vercel |
| `.env.local` | Variables de entorno (ya configuradas) |
| `vercel.json` | Configuración de Vercel |

## Estructura de Páginas

| Página | Ruta | Descripción |
|--------|------|-------------|
| Login | `/` | Autenticación con código secreto |
| Home | `/home` | Página principal con fondo de galería |
| Galería | `/gallery` | Subir y ver fotos/videos |
| Preguntas | `/questions` | Preguntas diarias con alarmas |
| Regalos | `/gifts` | Regalos virtuales personalizables |
| Flores | `/flowers` | Animación de flores |
| Ajustes | `/settings` | Configuración de spinners y colores |

## Variables de Entorno

```
VITE_API_URL=https://patronly-unpredicative-gigi.ngrok-free.dev
VITE_SECRET_CODE=flores123
```

Para cambiar en Vercel: Settings > Environment Variables

## Comandos Útiles

```bash
# Desarrollo
pnpm dev              # Servidor en vivo

# Producción
pnpm build            # Build para producción
pnpm preview          # Ver el build localmente

# Deploy
git push origin main  # Vercel automáticamente despliega

# Linting/Tipos
pnpm type-check       # Verificar tipos TypeScript
```

## Características

- 4 Spinners intercambiables
- Galería con drag & drop
- Preguntas + Alarmas personalizables
- Regalos virtuales
- Animaciones de flores
- Diseño moderno con TailwindCSS
- Totalmente responsivo

## Pasos para Desplegar a Vercel

1. `git push origin main`
2. Ir a https://vercel.com > Settings > Environment Variables
3. Añadir:
   - `VITE_API_URL=https://patronly-unpredicative-gigi.ngrok-free.dev`
   - `VITE_SECRET_CODE=flores123`
4. Deploy automático!

## Notas

- El backend debe implementarse en Spring Boot
- Las fotos se almacenan en `C:/proyectos/memories/galeria/`
- ngrok debe estar corriendo para que la API funcione
- Cambios en main se despliegan automáticamente en Vercel

Listo! Ya tienes tu app lista. Consulta los otros archivos .md para más detalles.
