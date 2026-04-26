# Flores Amarillas - Backend Spring Boot

Backend API para la aplicacion Flores Amarillas, construido con Spring Boot 3.2 y MySQL.

## Requisitos Previos

- Java 17+
- MySQL 8.0+
- Maven 3.8+

## Configuracion de MySQL

1. Crea la base de datos:

```sql
CREATE DATABASE flores_amarillas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Actualiza las credenciales en `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/flores_amarillas?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password
```

## Configuracion del Almacenamiento

La galeria almacena archivos en `C:/proyectos/memories/galeria/`.

Crea esta carpeta si no existe:

```bash
mkdir -p C:/proyectos/memories/galeria
```

Para cambiar la ruta, edita `application.properties`:

```properties
app.gallery.storage-path=C:/tu/ruta/personalizada/
```

## Configuracion CORS

Por defecto, CORS permite peticiones desde:
- `http://localhost:5173` (dev frontend)
- `https://flores-amarillas.vercel.app` (production)

Para agregar mas origenes, edita `application.properties`:

```properties
app.cors.allowed-origins=http://localhost:5173,https://tu-dominio.vercel.app
```

## Codigo Secreto

El codigo secreto para autenticacion se configura en `application.properties`:

```properties
app.secret-code=flores123
```

## Ejecucion

### Desarrollo

```bash
# Desde la carpeta backend/
mvn spring-boot:run
```

### Produccion

```bash
# Compilar
mvn clean package -DskipTests

# Ejecutar
java -jar target/flores-amarillas-backend-1.0.0.jar
```

El servidor iniciara en `http://localhost:8080`

## Exposicion con ngrok

Para exponer el backend a internet (necesario para el frontend en Vercel):

```bash
ngrok http 8080
```

Copia la URL generada (ej: `https://abc123.ngrok-free.dev`) y configurala en el frontend.

## API Endpoints

### Autenticacion

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/api/auth/verify` | Verificar codigo secreto |

### Galeria

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/gallery` | Obtener todos los items |
| POST | `/api/gallery/upload` | Subir foto/video |
| DELETE | `/api/gallery/{id}` | Eliminar item |

### Preguntas

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/questions/daily` | Obtener pregunta del dia |
| GET | `/api/questions` | Obtener todas las preguntas |
| POST | `/api/questions/answer` | Enviar respuesta |
| GET | `/api/questions/answers` | Obtener todas las respuestas |

### Alarmas

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/alarms` | Obtener todas las alarmas |
| POST | `/api/alarms` | Crear alarma |
| PUT | `/api/alarms/{id}` | Actualizar alarma |
| DELETE | `/api/alarms/{id}` | Eliminar alarma |

### Regalos

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/gifts` | Obtener todos los regalos |
| POST | `/api/gifts` | Crear regalo |
| DELETE | `/api/gifts/{id}` | Eliminar regalo |

### Configuracion

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/settings` | Obtener configuracion |
| GET | `/api/settings/spinner` | Obtener config del spinner |
| PUT | `/api/settings/spinner` | Actualizar spinner |

## Estructura del Proyecto

```
backend/
├── src/main/java/com/floresamarillas/
│   ├── FloresAmarillasApplication.java
│   ├── config/
│   │   ├── CorsConfig.java
│   │   ├── WebConfig.java
│   │   └── DataInitializer.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── GalleryController.java
│   │   ├── QuestionController.java
│   │   ├── AlarmController.java
│   │   ├── GiftController.java
│   │   └── SettingController.java
│   ├── dto/
│   │   ├── ApiResponse.java
│   │   ├── AuthRequest.java
│   │   ├── AnswerRequest.java
│   │   ├── AlarmRequest.java
│   │   ├── GiftRequest.java
│   │   └── SpinnerRequest.java
│   ├── entity/
│   │   ├── GalleryItem.java
│   │   ├── Question.java
│   │   ├── QuestionAnswer.java
│   │   ├── AlarmSetting.java
│   │   ├── Gift.java
│   │   └── Setting.java
│   ├── exception/
│   │   └── GlobalExceptionHandler.java
│   ├── repository/
│   │   ├── GalleryRepository.java
│   │   ├── QuestionRepository.java
│   │   ├── QuestionAnswerRepository.java
│   │   ├── AlarmRepository.java
│   │   ├── GiftRepository.java
│   │   └── SettingRepository.java
│   └── service/
│       ├── GalleryService.java
│       ├── QuestionService.java
│       ├── AlarmService.java
│       ├── GiftService.java
│       └── SettingService.java
└── src/main/resources/
    ├── application.properties
    ├── schema.sql
    └── data.sql
```

## Datos de Prueba

Al iniciar por primera vez, el `DataInitializer` crea:
- 20 preguntas de ejemplo en espanol
- Configuracion de spinner por defecto (flor amarilla)
- Alarma por defecto a las 9:00 AM

## Solución de Problemas

### Error de conexion a MySQL

1. Verifica que MySQL este corriendo
2. Verifica las credenciales en `application.properties`
3. Verifica que la base de datos existe

### Error al subir archivos

1. Verifica que la carpeta de almacenamiento existe
2. Verifica permisos de escritura en la carpeta
3. El limite de archivo es 50MB

### CORS errors

1. Verifica que el origen esta en `app.cors.allowed-origins`
2. Reinicia el servidor despues de cambios en application.properties

---

**Hecho con amor para alguien especial**
