# Guía de Despliegue en GitHub Pages

## 🚀 Tu sitio está listo para desplegarse

He configurado todo lo necesario para desplegar automáticamente tu sitio de IA e investigación usando GitHub Actions.

### ✅ Lo que ya está configurado:

1. **Workflow de GitHub Actions** (`/.github/workflows/static.yml`)
2. **Estructura completa del sitio**
3. **Repositorio git inicializado**
4. **Commits realizados**

### 📋 Pasos para completar el despliegue:

#### 1. Subir los cambios a GitHub
```bash
git push origin main
```

#### 2. Habilitar GitHub Pages en tu repositorio
1. Ve a tu repositorio en GitHub: https://github.com/ruiz-jose/iainvestigacion
2. Clica en **Settings** (Configuración)
3. Scrollea hacia abajo hasta la sección **Pages**
4. En **Source**, selecciona **GitHub Actions**
5. Guarda los cambios

#### 3. Ejecutar el workflow
- El workflow se ejecutará automáticamente al hacer push
- También puedes ejecutarlo manualmente desde la pestaña **Actions**

### 🌐 URLs importantes:
- **Repositorio**: https://github.com/ruiz-jose/iainvestigacion
- **Sitio web** (después del despliegue): https://ruiz-jose.github.io/iainvestigacion

### ⚙️ Características del despliegue:
- ✅ Despliegue automático en cada push a `main`
- ✅ Sitio estático optimizado
- ✅ Sin necesidad de build process
- ✅ Gráficos interactivos funcionales
- ✅ Diseño responsivo

### 🔄 Actualizaciones futuras:
Para actualizar el sitio, simplemente:
1. Haz cambios en los archivos
2. Commit y push a la rama `main`
3. GitHub Actions desplegará automáticamente

### 📱 El sitio incluye:
- Navegación suave entre secciones
- Gráficos interactivos con Chart.js
- Diseño responsivo con Tailwind CSS
- Contenido académico sobre IA en investigación social
- Optimizado para todos los dispositivos
