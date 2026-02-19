# Guía de despliegue

## Requisitos previos

- Node.js 20+
- Un proyecto de Supabase
- Una clave API de Lingo.dev
- Una cuenta de Vercel (para el despliegue)
- Una cuenta de GitHub (para CI/CD)

## Paso 1: configuración de Supabase

1. Crea un nuevo proyecto en [supabase.com](https://supabase.com)
2. Ve al editor SQL
3. Ejecuta el SQL de `lib/supabase.ts` (la sección comentada al final)
4. Copia la URL de tu proyecto y las claves desde Configuración → API

## Paso 2: variables de entorno

Crea `.env.local` con tus valores reales:

```env
LINGODOTDEV_API_KEY=tu_clave
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon
SUPABASE_SERVICE_ROLE_KEY=tu_clave_servicio
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
```

## Paso 3: traducir la documentación

Ejecuta la CLI de Lingo para generar traducciones de toda la documentación:

```bash
npm run translate:docs
```

Esto crea documentos traducidos en `docs/es/`, `docs/fr/`, `docs/de/`, `docs/ja/` y `docs/zh/`.

## Paso 4: desplegar en Vercel

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com) e importa tu repositorio
3. Añade todas las variables de entorno en el panel de Vercel
4. Despliega

## Paso 5: GitHub Actions (CI/CD)

1. Ve a tu repositorio de GitHub → Configuración → Secrets and variables → Actions
2. Añade el secreto: `LINGODOTDEV_API_KEY`
3. El flujo de trabajo en `.github/workflows/translate-docs.yml` traducirá automáticamente los documentos en cada push

## Paso 6: configurar Lingo MCP en Cursor

1. Abre la configuración de Cursor → pestaña MCP
2. Añade un nuevo servidor MCP:
   - Nombre: `Lingo.dev`
   - Comando: `npx`
   - Args: `["-y", "lingo.dev", "mcp", "TU_CLAVE_API"]`
3. Reinicia Cursor
4. Verifica el indicador de estado verde

## Lista de verificación de producción

- [ ] Tablas de Supabase creadas con RLS habilitado
- [ ] Todas las variables de entorno configuradas en Vercel
- [ ] Lingo Compiler compilando traducciones en el despliegue
- [ ] Documentación traducida mediante CLI
- [ ] Flujo de trabajo CI/CD probado
- [ ] MCP configurado en el entorno de desarrollo
- [ ] Datos de demostración generados para la presentación
- [ ] Las 5 herramientas de Lingo.dev verificadas y funcionando

## Monitoreo

Después del despliegue, monitorea tu aplicación:

- **Panel de Vercel** — Registros de despliegue y analíticas
- **Panel de Supabase** — Monitoreo de base de datos y registros
- **GitHub Actions** — Estado del pipeline de CI/CD
