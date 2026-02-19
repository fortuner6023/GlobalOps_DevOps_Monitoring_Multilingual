# Primeros pasos con GlobalOps

## Descripción general

GlobalOps es un panel de monitoreo DevOps en tiempo real listo para producción que admite 6 idiomas de forma nativa. Integra las 5 herramientas de traducción de Lingo.dev para proporcionar una experiencia completamente multilingüe.

## Características

- **Transmisión de registros en tiempo real** — Observa los registros aparecer en tiempo real desde todos tus servicios
- **Alertas multiidioma** — Crea, gestiona y rastrea alertas traducidas a tu idioma
- **Información impulsada por IA** — Análisis inteligente de tus registros con recomendaciones
- **Documentación traducida automáticamente** — Toda la documentación disponible en 6 idiomas
- **Cambio de idioma** — Cambia instantáneamente entre inglés, español, francés, alemán, japonés y chino

## Inicio rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/your-username/globalops.git
cd globalops
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de entorno de ejemplo y completa tus claves:

```bash
cp .env.local.example .env.local
```

Variables requeridas:
- `LINGODOTDEV_API_KEY` — Obtén desde [Panel de Lingo.dev](https://lingo.dev/dashboard)
- `NEXT_PUBLIC_SUPABASE_URL` — URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Clave anónima de Supabase
- `SUPABASE_SERVICE_ROLE_KEY` — Clave de rol de servicio de Supabase

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 5. Generar datos de demostración

```bash
npm run generate:logs
```

## Enviar registros mediante API

Puedes enviar registros a GlobalOps usando la API REST:

```bash
curl -X POST http://localhost:3000/api/logs \
  -H "Content-Type: application/json" \
  -d '{
    "level": "ERROR",
    "service": "api-gateway",
    "message": "Connection timeout after 30000ms",
    "metadata": {
      "request_id": "req_abc123",
      "duration_ms": 30000
    }
  }'
```

## Configurar tu idioma preferido

Haz clic en el selector de idioma en la esquina superior derecha del panel para cambiar tu idioma preferido. Todos los registros, alertas e información se traducirán automáticamente.

## Próximos pasos

- [Referencia de API](./api-reference.md) — Documentación completa de la API
- [Guía de despliegue](./deployment.md) — Despliega a producción
