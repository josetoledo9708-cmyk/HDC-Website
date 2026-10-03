# Guía Oficial de Permisos y Canales de Discord
## HololiveDeckConstructor (HDC)

Matriz exacta de permisos y configuración de roles para el servidor oficial de **HololiveDeckConstructor** según la estructura real de canales.

---

## 🎭 1. Definición de los 3 Roles

| Rol | Color Sugerido | Descripción y Dominio de Acceso |
|---|---|---|
| **`Dev`** | 🟣 Púrpura (`#9b59b6`) | **Desarrollador / Administrador.** Acceso total a todos los canales, categorías de reportes, administración y moderación. |
| **`Tester`** | 🟡 Dorado (`#f1c40f`) | **Probador de Campo (Closed Alpha).** Acceso a la categoría privada de **REPORTES** (`#software`, `#systems`, `#menus`, `#sounds-and-animations`, `#multiplayer`), `#rep`, canal de voz `Testing` + todos los canales públicos. |
| **`Visitor`** | 🟢 Cyan/Gris (`#1abc9c`) | **Visitante / Usuario General.** Acceso **exclusivamente a las categorías públicas** (Canales Fijados, Noticias, Canales de Texto generales y voz `Conversation`). La categoría **REPORTES**, `#moderator-only` y `#rep` permanecen ocultos. |

---

## 🔒 2. Matriz de Permisos por Canal y Categoría

### 📌 Canales Fijados / Inicio
- **`#hololive-deck-constructor`**
  - `@Visitor` / `@Tester` / `@Dev`: `Ver Canal = TRUE`, `Enviar Mensajes = FALSE` (Solo Lectura)
- **`#rules`**
  - `@Visitor` / `@Tester` / `@Dev`: `Ver Canal = TRUE`, `Enviar Mensajes = FALSE` (Solo Lectura)
- **`#moderator-only`**
  - `@Visitor` / `@Tester`: `Ver Canal = FALSE` (Oculto)
  - `@Dev`: `Ver Canal = TRUE`, `Enviar Mensajes = TRUE`
- **`#rep`**
  - `@Visitor`: `Ver Canal = FALSE` (Oculto)
  - `@Tester` / `@Dev`: `Ver Canal = TRUE`, `Enviar Mensajes = TRUE`
- **`#roles`**
  - `@Visitor` / `@Tester` / `@Dev`: `Ver Canal = TRUE`, `Enviar Mensajes = FALSE` (Solo Lectura)

---

### 📢 Categoría: Noticias (Pública)
*Permiso de Categoría:* `@Visitor`, `@Tester`, `@Dev` -> `Ver Categoría = TRUE`
- **`#updates`**: `Enviar Mensajes = FALSE` (Solo `@Dev` publica anuncios de versiones).
- **`#new-sets`**: `Enviar Mensajes = FALSE` (Solo `@Dev` publica sobre nuevas cartas/colecciones).

---

### 💬 Categoría: Canales de texto (Pública)
*Permiso de Categoría:* `@Visitor`, `@Tester`, `@Dev` -> `Ver Categoría = TRUE`
- **`#game-rules`**: `Enviar Mensajes = FALSE` (Solo Lectura de reglas oficiales).
- **`#general`**: `Enviar Mensajes = TRUE` (Chat abierto para la comunidad).
- **`#questions`**: `Enviar Mensajes = TRUE` (Dudas y preguntas frecuentes).
- **`#sugerences`**: `Enviar Mensajes = TRUE` (Sugerencias para el juego).

---

### 🚨 Categoría: REPORTES (Privada: Solo `@Tester` y `@Dev`)
> ⚠️ **Configuración Crítica de Categoría:**
> - `@everyone` / `@Visitor`: `Ver Categoría = FALSE` *(Completamente Oculta)*
> - `@Tester` / `@Dev`: `Ver Categoría = TRUE` *(Acceso para probadores Alpha)*

#### Canales de la Categoría:
- **`#how-to-report`**: `Enviar Mensajes = FALSE` (Instrucciones de cómo reportar fallos).
- **`#software`**: `Enviar Mensajes = TRUE`, `Adjuntar Archivos = TRUE` (Fallos del ejecutable `.exe` o bloqueos).
- **`#systems`**: `Enviar Mensajes = TRUE`, `Adjuntar Archivos = TRUE` (Errores de lógica de juego o efectos de cartas).
- **`#menus`**: `Enviar Mensajes = TRUE` (Errores de interfaz, perfil o selecciones).
- **`#sounds-and-animations`**: `Enviar Mensajes = TRUE` (Fallos en audio o efectos visuales).
- **`#multiplayer`**: `Enviar Mensajes = TRUE` (Errores en salas online o partidas en red).

---

### 🔊 Categoría: Canales de voz
- **`🔊 Conversation`**: `@Visitor` / `@Tester` / `@Dev` -> `Conectarse = TRUE`, `Hablar = TRUE` (Público)
- **`🔊 Testing`**: `@Visitor` -> `Ver Canal = FALSE` (Oculto). `@Tester` / `@Dev` -> `Conectarse = TRUE`, `Hablar = TRUE` (Pruebas Alpha)

---

## ⚙️ Pasos Rápidos de Configuración en Discord

1. **Configurar `@everyone`:**
   - Ir a Ajustes del Servidor > Roles > `@everyone` -> Desactivar **Ver Canales** (`View Channels = FALSE`).
2. **Asignar Permisos a Categoría `REPORTES`:**
   - Ajustes de Categoría `REPORTES` > Permisos -> Activar **Categoría Privada** -> Añadir los roles `@Tester` y `@Dev` con **Ver Canales = TRUE**.
3. **Rol por Defecto:**
   - Asignar el rol `@Visitor` a cualquier nuevo usuario al ingresar para dar acceso controlado únicamente a la zona pública.
