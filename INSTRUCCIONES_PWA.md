# 📱 Instalar Plan Nutricional Pro como App

## ✅ Pasos Previos

1. **Generar los Iconos:**
   - Abre `generate-icons.html` en tu navegador
   - Click en "📥 Descargar Todos los Iconos"
   - Se descargarán 8 iconos (icon-72.png hasta icon-512.png)
   - Guarda todos los iconos en la misma carpeta que `plan_nutricion_completo.html`

2. **Estructura de Archivos** (todos en la misma carpeta):
   ```
   📁 Nutri/
   ├── plan_nutricion_completo.html
   ├── recipes-data.js
   ├── app.js
   ├── manifest.json
   ├── service-worker.js
   ├── icon-72.png
   ├── icon-96.png
   ├── icon-128.png
   ├── icon-144.png
   ├── icon-152.png
   ├── icon-192.png
   ├── icon-384.png
   └── icon-512.png
   ```

---

## 🌐 Opción 1: Instalación Local (Más Rápido)

### Para Android:

1. **Abre el archivo localmente:**
   - En Chrome Android, abre `file:///...plan_nutricion_completo.html`
   - O usa una app como "HTML Viewer" desde tu almacenamiento

2. **Agregar a pantalla de inicio:**
   - Chrome: Menú (⋮) → "Agregar a pantalla de inicio"
   - Dale un nombre: "Nutri Pro"
   - ¡Listo! El ícono aparecerá en tu pantalla

### Para iOS:

1. **Abre el archivo en Safari:**
   - Transfiere el archivo a tu iPhone
   - Ábrelo con Safari

2. **Agregar a pantalla de inicio:**
   - Toca el botón compartir (□↑)
   - Selecciona "Agregar a pantalla de inicio"
   - Dale un nombre: "Nutri Pro"
   - ¡Listo!

---

## 🚀 Opción 2: Instalación desde Web (Recomendado)

### Subir a GitHub Pages (como ya hicimos):

1. **La web ya está en:** `https://gonmasia.github.io/plan-nutricional/plan_nutricion_completo.html`

### Instalar en Android (Chrome):

1. Abre la URL en Chrome
2. Verás un banner automático "Agregar a pantalla de inicio"
3. O usa el botón **"📱 Instalar App"** que aparece en la toolbar
4. Click en "Instalar"
5. ¡Listo! La app se instalará como nativa

### Instalar en iOS (Safari):

1. Abre la URL en Safari
2. Toca el botón compartir (□↑)
3. Scroll hasta "Agregar a pantalla de inicio"
4. Dale un nombre y confirma
5. ¡Listo!

---

## ✨ Características de la App Instalada

✅ **Funciona 100% offline** - Usa la app sin internet
✅ **Ícono en pantalla** - Como cualquier app nativa
✅ **Sin barra del navegador** - Experiencia fullscreen
✅ **Notificaciones** - (Próximamente)
✅ **Datos guardados** - Todo en localStorage
✅ **Rápida y fluida** - Optimizada para móvil

---

## 🔧 Solución de Problemas

### No aparece el botón "Instalar App":
- **Causa:** El service worker necesita HTTPS
- **Solución:** Úsalo desde GitHub Pages (tiene HTTPS automático)

### Los iconos no se muestran:
- **Causa:** Rutas incorrectas en manifest.json
- **Solución:**
  1. Asegúrate que todos los archivos estén en la misma carpeta
  2. Si usas GitHub Pages, actualiza las rutas en `manifest.json`:
     ```json
     "start_url": "/plan-nutricional/plan_nutricion_completo.html"
     ```

### La app no funciona offline:
- **Causa:** Service Worker no registrado
- **Solución:**
  1. Abre las DevTools (F12)
  2. Ve a "Application" → "Service Workers"
  3. Verifica que esté activo
  4. Recarga la página

### En iOS no se ve el ícono personalizado:
- **Causa:** iOS es más restrictivo con PWAs
- **Solución:** Asegúrate de tener los meta tags `apple-touch-icon` (ya los tiene el HTML)

---

## 📊 Verificar que funciona

1. **Abre las DevTools** (F12 en escritorio)
2. Ve a **"Application"**
3. Verifica:
   - ✅ **Manifest:** Debe mostrar nombre, iconos, etc.
   - ✅ **Service Worker:** Debe estar "activated and running"
   - ✅ **Cache Storage:** Debe tener "nutri-pro-v1"

---

## 🎯 Próximos Pasos

Una vez instalada la app:

1. **Marca tus favoritos** ⭐
2. **Trackea tus comidas** ✓
3. **Revisa tu progreso** 📊
4. **Genera listas de compras** 🛒
5. **Usa la calculadora** ⚖️

---

## 💡 Tips Pro

- **Usa la app en modo avión** - Funciona perfectamente offline
- **Actualiza semanalmente** - Solo necesitas conexión para actualizar
- **Exporta tu progreso** - Usa la función "Exportar PDF"
- **Comparte recetas** - Toma screenshots de tus favoritas

---

## 🆘 Soporte

Si tienes problemas:
1. Verifica que todos los archivos estén presentes
2. Abre la consola del navegador (F12) y busca errores
3. Prueba en modo incógnito
4. Limpia caché del navegador

---

¡Disfruta tu Plan Nutricional Pro! 🥗💪