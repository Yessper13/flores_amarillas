# Flores Amarillas - API Specification for Spring Boot

## Base URL
```
https://patronly-unpredicative-gigi.ngrok-free.dev
```

## Database Schema (MySQL)

### Tables

#### 1. settings
```sql
CREATE TABLE settings (
  id VARCHAR(36) PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 2. gallery_items
```sql
CREATE TABLE gallery_items (
  id VARCHAR(36) PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'photo' or 'video'
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. questions
```sql
CREATE TABLE questions (
  id VARCHAR(36) PRIMARY KEY,
  text TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_daily BOOLEAN DEFAULT FALSE
);
```

#### 4. question_answers
```sql
CREATE TABLE question_answers (
  id VARCHAR(36) PRIMARY KEY,
  question_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(50) NOT NULL, -- 'user' or 'partner'
  answer TEXT NOT NULL,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);
```

#### 5. alarm_settings
```sql
CREATE TABLE alarm_settings (
  id VARCHAR(36) PRIMARY KEY,
  time VARCHAR(5) NOT NULL, -- HH:MM format
  enabled BOOLEAN DEFAULT TRUE,
  frequency VARCHAR(50) NOT NULL, -- 'daily' or 'custom'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 6. gifts
```sql
CREATE TABLE gifts (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'flower', 'heart', 'custom'
  image_url VARCHAR(500),
  animation VARCHAR(100) NOT NULL,
  color VARCHAR(7) NOT NULL, -- HEX color
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Authentication

#### POST /api/auth/verify
Verify the secret code for access.

**Request:**
```json
{
  "code": "flores123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Code verified successfully"
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid code"
}
```

---

### Gallery

#### GET /api/gallery
Get all gallery items.

**Response (200 OK):**
```json
[
  {
    "id": "uuid-1",
    "imageUrl": "file:///C:/proyectos/memories/galeria/photo1.jpg",
    "uploadedAt": "2024-01-15T10:30:00Z",
    "type": "photo"
  },
  {
    "id": "uuid-2",
    "imageUrl": "file:///C:/proyectos/memories/galeria/video1.mp4",
    "uploadedAt": "2024-01-15T10:35:00Z",
    "type": "video"
  }
]
```

#### POST /api/gallery/upload
Upload a new gallery item (photo or video).

**Request:** multipart/form-data
- `file`: The image or video file

**Response (200 OK):**
```json
{
  "id": "uuid-3",
  "imageUrl": "file:///C:/proyectos/memories/galeria/newphoto.jpg",
  "uploadedAt": "2024-01-15T10:40:00Z",
  "type": "photo"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Invalid file type"
}
```

**Storage Path:** `C:/proyectos/memories/galeria/`

#### DELETE /api/gallery/{id}
Delete a gallery item.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Gallery item deleted"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Gallery item not found"
}
```

---

### Questions

#### GET /api/questions/daily
Get the daily question.

**Response (200 OK):**
```json
{
  "id": "uuid-q1",
  "text": "What was your favorite moment today?",
  "category": "daily"
}
```

#### POST /api/questions/answer
Submit an answer to a question.

**Request:**
```json
{
  "questionId": "uuid-q1",
  "answer": "The moment I saw you smile"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-qa1",
  "questionId": "uuid-q1",
  "userId": "user",
  "answer": "The moment I saw you smile",
  "answeredAt": "2024-01-15T10:45:00Z"
}
```

#### GET /api/questions/answers
Get all question answers.

**Response (200 OK):**
```json
[
  {
    "id": "uuid-qa1",
    "questionId": "uuid-q1",
    "userId": "user",
    "answer": "The moment I saw you smile",
    "answeredAt": "2024-01-15T10:45:00Z"
  }
]
```

---

### Alarms

#### GET /api/alarms
Get all alarm settings.

**Response (200 OK):**
```json
[
  {
    "id": "uuid-alarm1",
    "time": "09:00",
    "enabled": true,
    "frequency": "daily"
  },
  {
    "id": "uuid-alarm2",
    "time": "20:30",
    "enabled": true,
    "frequency": "daily"
  }
]
```

#### PUT /api/alarms/{id}
Update or create an alarm setting.

**Request:**
```json
{
  "time": "09:00",
  "enabled": true,
  "frequency": "daily"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-alarm1",
  "time": "09:00",
  "enabled": true,
  "frequency": "daily"
}
```

#### DELETE /api/alarms/{id}
Delete an alarm setting.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Alarm deleted"
}
```

---

### Gifts

#### GET /api/gifts
Get all gifts.

**Response (200 OK):**
```json
[
  {
    "id": "uuid-gift1",
    "name": "Mi flor especial",
    "type": "flower",
    "imageUrl": null,
    "animation": "bounce",
    "color": "#fbbf24"
  }
]
```

#### POST /api/gifts
Create a new gift.

**Request:**
```json
{
  "name": "Mi flor especial",
  "type": "flower",
  "animation": "bounce",
  "color": "#fbbf24"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-gift1",
  "name": "Mi flor especial",
  "type": "flower",
  "imageUrl": null,
  "animation": "bounce",
  "color": "#fbbf24"
}
```

#### DELETE /api/gifts/{id}
Delete a gift.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Gift deleted"
}
```

---

### Settings

#### GET /api/settings
Get all settings.

**Response (200 OK):**
```json
{
  "spinnerType": "flower",
  "spinnerColor": "#fbbf24"
}
```

#### PUT /api/settings/spinner
Update spinner configuration.

**Request:**
```json
{
  "type": "flower",
  "color": "#fbbf24"
}
```

**Response (200 OK):**
```json
{
  "type": "flower",
  "color": "#fbbf24"
}
```

---

## Implementation Notes

1. **File Storage:** All uploaded files should be stored in `C:/proyectos/memories/galeria/` on the server.

2. **CORS:** Enable CORS for the ngrok URL to allow requests from Vercel-deployed frontends.

3. **File Serving:** Create a static route that serves files from `C:/proyectos/memories/galeria/` as `file:///C:/proyectos/memories/galeria/{filename}`

4. **Secret Code:** The secret code is checked in the frontend. For production, you may want to validate it server-side as well.

5. **Database:** Initialize with sample data for testing:
   - Sample questions
   - Empty gallery, gifts, and alarms

6. **Error Handling:** All endpoints should return appropriate HTTP status codes:
   - 200: Success
   - 400: Bad Request
   - 401: Unauthorized
   - 404: Not Found
   - 500: Server Error

7. **Timestamps:** Use ISO 8601 format for all timestamps (e.g., `2024-01-15T10:45:00Z`)

---

## Testing Endpoints

You can test the API using curl or Postman:

```bash
# Verify code
curl -X POST https://patronly-unpredicative-gigi.ngrok-free.dev/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"code":"flores123"}'

# Get gallery items
curl https://patronly-unpredicative-gigi.ngrok-free.dev/api/gallery

# Get daily question
curl https://patronly-unpredicative-gigi.ngrok-free.dev/api/questions/daily

# Get alarms
curl https://patronly-unpredicative-gigi.ngrok-free.dev/api/alarms

# Get gifts
curl https://patronly-unpredicative-gigi.ngrok-free.dev/api/gifts
```

---

## Frontend Configuration

The frontend is configured with the following environment variables:

```env
VITE_API_URL=https://patronly-unpredicative-gigi.ngrok-free.dev
VITE_SECRET_CODE=flores123
```

These are used in `/src/lib/api.ts` for all API calls.
