# Guía Oficial de Configuración del Servidor de Discord
## HololiveDeckConstructor (HDC)

Esta guía detalla la estructura exacta de roles, permisos, categorías y canales para el servidor de Discord de **HololiveDeckConstructor**.

---

## 🎭 1. Roles del Servidor (Solo 3 Roles)

| Rol | Color Sugerido | Descripción y Nivel de Acceso |
|---|---|---|
| **`Dev`** | 🟣 Púrpura (`#9b59b6`) | **Desarrollador / Administrador.** Acceso total a todas las categorías (Dev, Testers, Pública, Configuración). |
| **`Tester`** | 🟡 Dorado (`#f1c40f`) | **Probador de Campo (Closed Alpha).** Acceso a la descarga del ejecutable v0.0.28, reporte de bugs, feedback y chat privado de testers + canales públicos. |
| **`Visitor`** | 🟢 Cyan/Gris (`#1abc9c`) | **Visitante / Usuario General.** Acceso **exclusivamente a la categoría pública** (Reglas, Anuncios, Solicitar Alpha y Chat General). Bloqueado de canales de Dev y Testers. |

---

## 🔒 2. Matriz de Permisos por Categoría y Canales

### 🔴 Permiso Global Crítico: `@everyone`
> **Configuración Obligatoria:** En la configuración del rol `@everyone` (el rol por defecto al unirse):
> - **Ver Canales (`View Channels`):** `DESACTIVADO / FALSE` (Crucial para que nadie vea canales de Testers o Devs sin el rol adecuado).
> - **Asignación Automática:** Asignar el rol `@Visitor` a todo nuevo miembro al ingresar (usando un bot como Carl-bot, MEE6 o manualmente).

---

### 📢 Categoría 1: 🌐 COMUNIDAD (Pública para `@Visitor`, `@Tester`, `@Dev`)
*Permisos de Categoría:*
- `@everyone`: `Ver Canales = FALSE`
- `@Visitor`: `Ver Canales = TRUE`
- `@Tester`: `Ver Canales = TRUE`
- `@Dev`: `Ver Canales = TRUE`

#### Canales de la Categoría:
1. **`#📌-bienvenida-y-reglas`** *(Solo Lectura)*
   - `@Visitor` / `@Tester`: `Ver Canal = TRUE`, `Enviar Mensajes = FALSE`
   - `@Dev`: `Enviar Mensajes = TRUE`
   - *Contenido:* Normas del servidor, disclaimer fan sin fines de lucro.
2. **`#📢-noticias-y-anuncios`** *(Solo Lectura)*
   - `@Visitor` / `@Tester`: `Ver Canal = TRUE`, `Enviar Mensajes = FALSE`
   - `@Dev`: `Enviar Mensajes = TRUE`
   - *Contenido:* Novedades del juego, parches y estados del servidor.
3. **`#🔑-solicitar-alpha`** *(Solo Lectura)*
   - `@Visitor`: `Ver Canal = TRUE`, `Enviar Mensajes = FALSE`
   - *Contenido:* Instrucciones de cómo solicitar acceso a la Alpha Cerrada v0.0.28 y obtener la clave y el rol `@Tester`.
4. **`#💬-chat-general`** *(Lectura y Escritura)*
   - `@Visitor` / `@Tester` / `@Dev`: `Ver Canal = TRUE`, `Enviar Mensajes = TRUE`
   - *Contenido:* Espacio abierto para conversar con la comunidad.

---

### 🧪 Categoría 2: 🔬 CLOSED ALPHA TESTERS (Exclusiva para `@Tester` y `@Dev`)
*Permisos de Categoría:*
- `@everyone`: `Ver Canales = FALSE`
- `@Visitor`: `Ver Canales = FALSE` *(Bloqueado completamente)*
- `@Tester`: `Ver Canales = TRUE`
- `@Dev`: `Ver Canales = TRUE`

#### Canales de la Categoría:
1. **`#🚀-descarga-alpha-v0.0.28`** *(Solo Lectura para Testers)*
   - `@Tester`: `Ver Canal = TRUE`, `Enviar Mensajes = FALSE`
   - `@Dev`: `Enviar Mensajes = TRUE`
   - *Contenido:* Enlace directo al instalador ejecutable `.exe` y clave de activación.
2. **`#🐛-reporte-de-bugs`** *(Lectura y Escritura para Testers)*
   - `@Tester`: `Ver Canal = TRUE`, `Enviar Mensajes = TRUE`, `Adjuntar Archivos = TRUE`
   - *Contenido:* Registro de fallos con capturas y archivos de registro `alpha.log`.
3. **`#💡-feedback-y-sugerencias`** *(Lectura y Escritura para Testers)*
   - `@Tester`: `Ver Canal = TRUE`, `Enviar Mensajes = TRUE`
   - *Contenido:* Comentarios sobre el balance de cartas, interfaz y experiencia de juego.
4. **`#🧪-chat-testers`** *(Lectura y Escritura para Testers)*
   - `@Tester`: `Ver Canal = TRUE`, `Enviar Mensajes = TRUE`
   - *Contenido:* Canal de voz y texto para coordinar partidas de prueba y duelos.

---

### 🛠️ Categoría 3: 💻 DESARROLLO INTERNO (Exclusiva para `@Dev`)
*Permisos de Categoría:*
- `@everyone`: `Ver Canales = FALSE`
- `@Visitor`: `Ver Canales = FALSE`
- `@Tester`: `Ver Canales = FALSE`
- `@Dev`: `Ver Canales = TRUE` (Acceso completo)

#### Canales de la Categoría:
1. **`#📊-dev-log-y-commits`** *(Webhooks de GitHub y Vercel)*
2. **`#💻-discusión-técnica`** *(Código de Unity, Cloudflare Workers, Base de datos)*
3. **`#🤖-bot-logs-y-alertas`** *(Registros del servidor y alertas)*

---

## 📝 3. Plantillas de Texto Oficiales para Copiar y Pegar

### Mensaje para `#📌-bienvenida-y-reglas`:
```markdown
# 🎴 ¡Bienvenidos a HololiveDeckConstructor (HDC)!

Este es el servidor oficial de la comunidad del simulador digital independiente para PC de **hololive Official Card Game**.

### 📜 Reglas del Servidor:
1. **Respeto Mutuo:** Mantén un trato amable con todos los miembros de la comunidad.
2. **Proyecto Fan Sin Ánimo de Lucro:** Este simulador es un proyecto independiente desarrollado por fans y para fans. No se comercializa ni se venden accesos.
3. **No Spam / Publicidad:** Evita enlaces maliciosos o promociones ajenas al juego.
4. **Canales Adecuados:** Utiliza `#💬-chat-general` para charlar y `#🔑-solicitar-alpha` si deseas probar el juego.

¡Disfruta tu estadía y apoya a tus Oshis favoritas! 🌟
```

### Mensaje para `#🔑-solicitar-alpha`:
```markdown
# 🔒 Solicitar Acceso a la Alpha Cerrada v0.0.28

La versión **Alpha v0.0.28** para PC cuenta con **cupos limitados para testers** para evaluar la estabilidad de los servidores multijugador.

### ❓ ¿Cómo solicitar tu clave de acceso y rol de Tester?
1. Escribe un mensaje por privado a un miembro con el rol `@Dev` o sigue las instrucciones en las dinámicas de selección.
2. Una vez verificado tu cupo, recibirás el rol `@Tester`.
3. Al obtener el rol `@Tester`, se desbloqueará automáticamente la categoría privada **`🧪 CLOSED ALPHA TESTERS`**, donde podrás acceder al enlace de descarga en `#🚀-descarga-alpha-v0.0.28`.

*Nota: Si aún no tienes el rol `@Tester`, la sección de descarga permanecerá oculta.*
```

---

## ⚙️ 4. Pasos Rápidos en Discord (Resumen)

1. **Crear los 3 Roles en Ajustes del Servidor > Roles:**
   - Crear `Dev` (Activar permiso de Administrador).
   - Crear `Tester` (Sin admin, pero con permisos estándar).
   - Crear `Visitor` (Sin admin).

2. **Configurar Permisos de `@everyone`:**
   - En Ajustes del Servidor > Roles > `@everyone`, desactiva **Ver Canales** (`View Channels`).

3. **Crear las 3 Categorías y Asignar Permisos:**
   - **Comunidad:** `@Visitor` -> Ver Canales: Sí.
   - **Closed Alpha Testers:** Configurar como **Categoría Privada** -> Añadir `@Tester` y `@Dev`.
   - **Desarrollo Interno:** Configurar como **Categoría Privada** -> Añadir solo `@Dev`.
