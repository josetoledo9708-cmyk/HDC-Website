# HDC · Notas de versión / Patch notes

Registro público de todas las actualizaciones de **HDC (Hololive Deck Constructor)**, de la más nueva a la más
vieja, en castellano y en inglés. Es el texto que se copia a la web y al canal de actualizaciones de Discord.

- **Fuente**: las notas que trae el juego (`Assets/StreamingAssets/PatchNotes/<versión>.<idioma>.txt`). Aquí van
  con tildes y formato; si algo cambia antes de publicar, se cambia en los dos sitios.
- **Cada versión nueva se añade arriba** el día que se publica.
- **Formato pensado para Discord**: títulos en negrita y listas con guion, que Discord pinta igual que la web. Un
  mensaje de Discord admite 2000 caracteres y la descripción de un embed 4096: las versiones grandes caben en un
  embed, o se parten por secciones.
- Las versiones anteriores a la 0.0.22 no tenían notas.

---

## 0.0.32 — 2026-10-08

### Español

**JUEGO ABIERTO**
- Ya no hace falta código de acceso para jugar: cualquiera con el juego puede entrar.
- El código de probador se escribe en Opciones y activa el modo probador y el cuadro de efectos.
- Los reportes de fallos y de efectos se pueden mandar sin código, con tu cuenta.

**META DECKS**
- Nuevo botón en el inicio: las Oshi más jugadas en torneo, con su % de torneos ganados.
- Al elegir una, sus 4 recetas de torneo más recientes con el puesto que consiguieron. Añadir la guarda en tus mazos; pulsar la carta abre la lista en el constructor.
- El Tutorial pasa a un botón pequeño junto a Opciones.

**AMIGOS**
- Lista de amigos: botón "Amigos" junto a tu perfil. Al pasar el cursor, su cuadro y el resumen de su tarjeta; al pulsar, Ver perfil o Eliminar de la lista.

**MULTIJUGADOR**
- Buscar partida: con tu mazo elegido entras en la cola y el juego te empareja con otro jugador al azar. La partida va directa al piedra-papel-tijera; puedes cancelar la búsqueda.
- Sala personalizada nueva: "Crear / unirse a sala personalizada" abre un menú con Crear sala y Unirse con código. En la sala se ve el marco y el mazo de cada jugador, y la partida empieza cuando los dos pulsan Listo.
- Invitar: desde la sala, copia el código o invita a un amigo de tu lista; le sale un aviso en el menú con Unirse y Rechazar.
- Irse de una sala antes de empezar ya no cuenta como derrota.
- Al terminar una partida en red vuelves a la pantalla de Multijugador.

**CUENTAS**
- Tope de intentos al entrar: tras varias contraseñas incorrectas hay que esperar unos minutos.
- Las sesiones caducan tras un mes sin jugar; el juego te pide entrar otra vez con tu nombre ya escrito.

**PARTIDA**
- Al pasar el cursor por un holomem del campo, a su lado sale su vida, sus buffs de Arts y de vida y sus cheers.
- Arreglado: salir de una partida en red durante el mulligan daba un error.
- La rendición del rival se ve al momento, tambien en tu turno.
- Las cartas que revelas se le enseñan al rival antes de ir a tu mano.
- La cheer de Life sale encima de tus cartas de Life y se arrastra al holomem, tambien si cae por un efecto.

**CARTAS**
- Arreglado: 85 Arts de hBP07-10 y de los mazos de inicio pegaban 0 de base, y CODE:81800 (hBP07-075) pegaba 81800 (ahora 70).
- Arreglado: el texto de 5 Arts no se aplicaba (Korone hBP06-070 y 4 de los mazos de inicio hSD14-18).
- Las cartas de hBP07-09 salen con su nombre en inglés.
- Traducidas las preguntas de las cartas nuevas que salían en castellano.
- Toda carta que dice "you may" te pregunta antes de aplicarse.
- Las habilidades de mascotas y herramientas pegadas se activan desde el menú del holomem.
- Hechos: el Ability Shift de hBP01-110 con Mumei, Oka-nyan con Okayu, y en 35P el rival decide si roba.

**CONSTRUCTOR Y PERFIL**
- Borrar un mazo ya no te devuelve a la primera página.
- Tu perfil guardado en el servidor manda sobre lo de esta máquina.

**RENDIMIENTO**
- El juego ocupa unos 400 MB menos: ya no lleva copias repetidas de las ilustraciones.

### English

**OPEN GAME**
- You no longer need an access code to play: anyone with the game can get in.
- The tester code goes in Options and turns on tester mode and the effect check box.
- Bug and effect reports can be sent without a code, with your account.

**META DECKS**
- New button on the home screen: the most played Oshi in tournaments, with their tournament win %.
- Pick one to see its 4 most recent tournament recipes and the place they got. Add saves it to your decks; clicking the card opens the list in the deck builder.
- The Tutorial moves to a small button next to Options.

**FRIENDS**
- Friends list: "Friends" button next to your profile. Hover to see their box and a card summary; click for View profile or Remove from list.

**MULTIPLAYER**
- Find match: with your deck chosen you join the queue and the game pairs you with a random player. The match goes straight to rock-paper-scissors; you can cancel the search.
- New custom room: "Create / Join custom room" opens a menu with Create room and Join with a code. The room shows each player's frame and deck, and the match starts when both press Ready.
- Invite: from the room, copy the code or invite a friend from your list; they get a notice in the menu with Join and Decline.
- Leaving a room before the match starts no longer counts as a loss.
- After an online match you go back to the Multiplayer screen.

**ACCOUNTS**
- Login attempt limit: after several wrong passwords you have to wait a few minutes.
- Sessions expire after a month without playing; the game asks you to log in again with your name already filled in.

**MATCH**
- Hovering a holomem on the field shows its life, Arts and HP buffs and its cheers next to it.
- Fixed: leaving an online match during the mulligan caused an error.
- Your opponent's surrender shows right away, also during your turn.
- Cards you reveal are shown to your opponent before going to your hand.
- The Life cheer appears over your Life cards and you drag it to a holomem, also when it falls to an effect.

**CARDS**
- Fixed: 85 Arts from hBP07-10 and the starter decks dealt 0 base damage, and CODE:81800 (hBP07-075) dealt 81800 (now 70).
- Fixed: the text of 5 Arts did not apply (Korone hBP06-070 and 4 from the hSD14-18 starter decks).
- hBP07-09 cards now show their English names.
- Translated the questions of the new cards that showed up in Spanish.
- Every card that says "you may" asks you before it applies.
- Abilities of attached mascots and tools are used from the holomem's menu.
- Added: hBP01-110's Ability Shift with Mumei, Oka-nyan with Okayu, and with 35P your opponent chooses whether to draw.

**DECK BUILDER AND PROFILE**
- Deleting a deck no longer sends you back to the first page.
- Your profile saved on the server wins over what this machine had.

**PERFORMANCE**
- The game is about 400 MB smaller: it no longer ships duplicate card art.

---

## 0.0.31 — 2026-10-07

### Español

- **Republicación 0.0.31:** corregidos los iconos de piedra, papel y tijeras en la build.

CARTAS Y REGLAS
- Incorporados hBP07, hBP08 y hBP09, con actualizaciones de efectos y traducciones.
- Correcciones de Kanata, Lui, Iroha, Okayu, Korone, Riona y Beef Bowl a partir de los reportes de Access.
- Busquedas del deck permiten no elegir carta; revelacion de Cheers conserva su zona de origen.
- Baton Pass se puede cancelar sin pagar ni cambiar de fase.
- Mulligan: siempre siete cartas; penalizacion acumulada solo en la mano final, despues de colocar Center.

PERFIL Y MENUS
- Tema de Ina con marcos, botones, iconos y transicion de Takodachis.
- Carta favorita independiente de la Oshi que selecciona el tema.
- Buscadores en selecciones de cartas, Oshi, imagen de perfil, fondos y cosmeticos.
- Edicion de presentacion y seleccion o copia de deck favorito.
- Historial de partidas en red separado de las partidas contra IA.
- Corregidos parpadeos del tema, contraste de Favoritos y marcos sobre las cartas.
- Iniciar o cerrar sesion desde Opciones.

CONSTRUCTOR
- Importacion de mazos holoDelta en formato JSON, ademas de los formatos existentes.

TESTER
- Control manual de ambos lados desde la preparacion y cambio de perspectiva por turno.
- Seleccion de mano inicial y movimientos entre zonas desde la interfaz.
- Cheers se pueden colocar en holomem; la Oshi queda excluida de movimientos al deck o a la mano.
- Opciones de restricciones para preparar situaciones de prueba.

REPORTES
- Correcciones de Access pendientes de confirmacion por los testers en esta build.
- Los reportes historicos de IA, Life y desincronizacion siguen abiertos para reproduccion.
- Para multijugador, ambos jugadores deben actualizar a 0.0.31.

### English

- **0.0.31 re-release:** fixed rock, paper and scissors icons in the compiled player.

CARDS AND RULES
- Added hBP07, hBP08 and hBP09, with effect and translation updates.
- Access report fixes for Kanata, Lui, Iroha, Okayu, Korone, Riona and Beef Bowl.
- Deck searches allow choosing no card; Cheer reveals preserve their source zone.
- Baton Pass can be cancelled without paying or changing phase.
- Mulligan always draws seven; accumulated penalty is applied only to the final hand, after placing Center.

PROFILE AND MENUS
- Ina theme with frames, buttons, icons and Takodachi transitions.
- Favorite card is independent from the Oshi used to choose the theme.
- Search bars for cards, Oshi, profile images, backgrounds and cosmetics.
- Edit your presentation and select or copy your favorite deck.
- Online match history excludes AI matches.
- Fixed theme flashes, Favorites contrast and card frame overlays.
- Sign in or sign out from Options.

DECK BUILDER
- Import holoDelta decks in JSON format alongside existing formats.

TESTER
- Manual control of both sides from setup, with perspective switching each turn.
- Opening hand selection and zone movement controls.
- Cheers can be attached to holomem; Oshi cannot be moved to deck or hand.
- Restriction options for setting up test situations.

REPORTS
- Access fixes await tester confirmation in this build.
- Historical AI, Life and desync reports remain open for reproduction.
- Both players must update to 0.0.31 for multiplayer.

---

## 0.0.30 — 2026-10-04

### Español

**AMIGOS**
- Nuevo botón "+ Amigos" junto a tu cuadro de perfil: copia tu usuario (Nombre#1234), busca a alguien por su usuario y mándale una solicitud de amistad.
- Las solicitudes se aceptan o se rechazan desde ese mismo panel; el botón dice cuántas tienes sin contestar.
- En una partida en red, "Enviar solicitud de amistad" en el perfil del rival ya funciona.

**MÚSICA**
- Música de fondo dentro del juego: una lista que suena una detrás de otra en el menú y en partida.
- Nuevo volumen de Música en Opciones, aparte del volumen general. Empieza bajo (25 %) para no tapar las voces.

**PARTIDA**
- La cheer de la Cheer Phase sale a la derecha del Cheer Deck (ya no cae encima del log).
- Cuando cae uno de tus holomem, la cheer de Life sale a la vista sobre tu Life y la arrastras al holomem que quieras. Si cae una Buzz, salen dos, de una en una.
- La cheer de Life del rival se ve volar de su Life a su holomem.
- Antes de cada pregunta de un efecto se ve lo que ese efecto ya hizo.

**IA RIVAL**
- Arreglado: un holomem de la IA que atacaba una vez no volvía a atacar en toda la partida.

**CONSTRUCTOR**
- Importar mazos de Bushiroad DeckLog: pega su código (G9SME, 1U7LVJ...) o su enlace (también el de holocardgame-meta) en el recuadro de Importar. Si el mazo lleva cartas que el juego aún no tiene, te dice cuáles.

**PERFIL**
- El Perfil es ahora una pantalla, con su transición y su botón Volver, como "Contra IA".
- El aviso de la pestaña Tarjeta ya no sale en las otras pestañas ni queda tapado por Cancelar.
- La tarjeta enseña aparte las partidas en red y las de contra la IA.

**MULTIJUGADOR**
- Las partidas en red las apunta el servidor, no el juego: ya no se pueden inventar resultados.
- Irse de una partida en red cuenta como derrota si no vuelves en un minuto (antes cortar la conexión era empate). Si se cae el servidor, no cuenta.

**CARTAS**
- Todo lo que se coge del archive se enseña, aunque solo haya una opción.
- Si un efecto no se puede hacer, no pregunta nada: Koganei Niko (hSD11-005) preguntaba a quién mandar la cheer sin haber cheer. Arreglado también en hBP02-055, hBP02-090, hBP02-096, hBP05-023 y hBP05-084.
- Friendly PC (hBP05-074) y Tokino Sora (hEB01-005) solo encuentran Debut con el Extra "You may include any number of this holomem".
- La SP y la Oshi skill normal se pueden usar en el mismo turno (Hakos Baelz hBP06-005).
- Hakos Baelz (hBP06-041) pide las 2 cartas a archivar de una vez; Chattino (hBP06-100) da 30 de HP con Raora, no 20.
- Si un efecto salta pero no puede hacer nada, el log dice por qué.

**SISTEMA DE PRUEBAS**
- Nuevo botón "Dudoso" al lado de Pendiente: marca la carta con un "?" naranja y sigue preguntando.
- El cuadro de pruebas también sale con los Gift y las SP que saltan solos (Koganei Niko al empezar la Performance, la SP de Isaki Riona).

**SEGURIDAD**
- El actualizador comprueba que el paquete descargado es el publicado antes de instalarlo.

### English

**FRIENDS**
- New "+ Friends" button next to your profile box: copy your user (Name#1234), find someone by their user and send them a friend request.
- Requests are accepted or rejected from the same panel; the button shows how many you have unanswered.
- In an online match, "Send friend request" on your opponent's profile now works.

**MUSIC**
- Background music inside the game: a playlist that plays one track after another in the menu and during matches.
- New Music volume in Options, separate from the master volume. It starts low (25 %) so it does not cover the voices.

**MATCH**
- The Cheer Phase cheer appears to the right of the Cheer Deck (it no longer covers the log).
- When one of your holomem is downed, the life cheer appears over your life and you drag it onto the holomem you want. If a Buzz is downed, two come out, one at a time.
- Your opponent's life cheer is shown flying from their life to their holomem.
- Before each effect question you see what that effect already did.

**OPPONENT AI**
- Fixed: an AI holomem that attacked once never attacked again for the rest of the match.

**DECK BUILDER**
- Import decks from Bushiroad DeckLog: paste their code (G9SME, 1U7LVJ...) or link (the holocardgame-meta one too) in the Import box. If the deck has cards this game does not have yet, it tells you which.

**PROFILE**
- Profile is now a screen, with its transition and a Back button, like "Vs AI".
- The Card tab hint no longer shows on the other tabs or gets covered by Cancel.
- The profile card shows online matches and matches against the AI separately.

**MULTIPLAYER**
- Online matches are recorded by the server, not the game: results can no longer be made up.
- Leaving an online match counts as a loss if you do not come back within a minute (cutting your connection used to be a draw). If the server goes down, it does not count.

**CARDS**
- Anything taken from the archive is always shown, even with a single option.
- If an effect cannot be done, it asks nothing: Koganei Niko (hSD11-005) asked where to send the cheer with no cheer available. Also fixed on hBP02-055, hBP02-090, hBP02-096, hBP05-023 and hBP05-084.
- Friendly PC (hBP05-074) and Tokino Sora (hEB01-005) only find Debuts with the Extra "You may include any number of this holomem".
- The SP and the normal Oshi skill can be used in the same turn (Hakos Baelz hBP06-005).
- Hakos Baelz (hBP06-041) asks for both cards to archive at once; Chattino (hBP06-100) gives 30 HP with Raora, not 20.
- If an effect triggers but can do nothing, the log says why.

**TESTING SYSTEM**
- New "Doubtful" button next to Pending: marks the card with an orange "?" and keeps asking.
- The testing box also shows for Gifts and SP skills that trigger on their own (Koganei Niko at the start of the Performance, Isaki Riona's SP).

**SECURITY**
- The updater checks the downloaded package is the published one before installing it.

---

## 0.0.29 — 2026-10-02

### Español

**TUTORIAL**
- Nuevo botón "Tutorial" en el menú principal: una partida guiada contra Nakiri Ayame que enseña a jugar paso a paso, en el orden del libro de reglas oficial y con sus láminas (pulsa una para verla en grande).
- Explica qué es el juego, cómo se gana, los estados de las holomem, los tipos de carta, cada zona del campo (con aura verde), el mazo y los 10 pasos de la preparación, incluido el piedra-papel-tijera.
- Después juegas tres turnos con todo: Draw, Cheer, colocar, Collab, Support, perder una Life, elegir quién sube al Center, Bloom, Oshi skill, baton pass y la Performance hasta ganar.
- En cada paso solo se puede hacer lo que toca; al terminar puedes repetirlo, jugar contra la IA o volver al menú.

**PLAYMATS**
- Cada mitad del campo lleva el playmat del mazo de su jugador: el tuyo abajo y el del rival arriba, girado como sus cartas. Hay uno por talento (53).
- Botón "Cosméticos" en el constructor para elegir el playmat de cada mazo; sin elegir, el de su Oshi. En red el rival ve el tuyo.
- Los mismos playmats sirven de fondo del menú (Perfil > Fondo). El fondo provisional de Marine se quitó.

**MULTIJUGADOR**
- Nueva primera pantalla: a la izquierda "Crear sala personalizada" con las Oshis cambiando; a la derecha el recuadro grande "+ Selecciona tu mazo" y debajo "Buscar partida" (todavía no disponible).
- La sala tiene su propio recuadro de mazo y tu cuadro de perfil con marco. Cada pantalla recuerda su mazo.

**TARJETA DE PERFIL**
- Tu tarjeta: cuadro, estadísticas y hasta 3 mazos destacados con su código para copiar. Se elige en Perfil > Tarjeta.
- En la sala ves la tarjeta del rival al encontrarlo, y en partida pulsando su cuadro.

**ARREGLOS**
- Los sonidos vuelven a sonar: el menú de sonidos de la partida y las voces de FUWAMOCO al usar sus Oshi skills (faltaba el "oyente" de audio).
- El log queda por detrás de la vista previa de la carta.
- Las cartas del visor de cartas acopladas y del Archive enseñan su vista previa al pasar el ratón.
- "Reportar fallos" ya no tapa tu nombre en la partida.
- "Copiar" en el historial de partidas pone también el código del mazo en el portapapeles, listo para pegarlo en el constructor.

### English

**TUTORIAL**
- New "Tutorial" button in the main menu: a guided match against Nakiri Ayame that teaches how to play step by step, following the official rule book in order and with its pictures (click one to see it full size).
- It explains what the game is, how to win, holomem statuses, card types, every area of the board (with a green glow), the deck and the 10 setup steps, rock-paper-scissors included.
- Then you play three turns with everything: draw, cheer, placing, collab, support, losing a life, choosing who moves to the center, bloom, Oshi skill, baton pass and the performance phase until you win.
- At each step you can only do what comes next; at the end you can repeat it, play against the AI or go back to the menu.

**PLAYMATS**
- Each half of the board shows the playmat of its player's deck: yours at the bottom and your opponent's at the top, turned around like their cards. There's one per talent (53).
- "Cosmetics" button in the deck builder to choose each deck's playmat; if not chosen, its Oshi's. Online, your opponent sees yours.
- The same playmats work as menu backgrounds (Profile > Background). The temporary Marine background was removed.

**MULTIPLAYER**
- New first screen: "Create custom room" on the left with the Oshis changing; on the right the big "+ Select your deck" box and "Find match" below it (not available yet).
- The room has its own deck box and your framed profile box. Each screen remembers its own deck.

**PROFILE CARD**
- Your card: profile box, stats and up to 3 featured decks with their code to copy. Choose them in Profile > Card.
- In the room you see your opponent's card when they join, and during the match by clicking their profile box.

**FIXES**
- Sounds play again: the in-match sound menu and FUWAMOCO's voices on their Oshi skills (the audio "listener" was missing).
- The log stays behind the card preview.
- Cards in the attached-cards viewer and in the Archive show their preview on hover.
- "Report bugs" no longer covers your name during a match.
- "Copy" in the match history also puts the deck code on the clipboard, ready to paste in the deck builder.

---

## 0.0.28 — 2026-10-02

### Español

**TABLERO NUEVO**
- Las pilas (Cheer, Life, holo Power, Deck y Archive) se acercan al centro. El log pasa a la izquierda, centrado, y el recuadro de fase y turno a la derecha.
- Tu perfil aparece abajo a la izquierda y el del rival arriba a la derecha: su imagen en un círculo y su nombre.
- Pulsa tu círculo para lanzar sonidos: los oye también el rival. Pulsa el del rival para ver su perfil completo, silenciar sus sonidos o (pronto) enviarle solicitud de amistad.
- La Support que juega el rival se ve en el centro de la pantalla, 2 segundos.

**TIEMPOS DE LA PREPARACIÓN**
- Tienes 1 minuto para el mulligan: si no decides, te quedas la mano; si no vale (sin Debut), se rehace sola hasta que valga.
- Tienes 1 minuto para colocar los Debut: al acabarse se sigue con lo que hayas puesto, y sin Center el juego pone uno. Con un solo Debut, o al colocarlos todos, se pasa solo.

**PERFIL**
- Nueva pestaña Estadísticas: partidas, victorias, mazo favorito, mejor mazo y último mazo. Tus partidas se guardan en tu cuenta.
- El Historial de partidas se abre desde ahí (ya no está en el menú principal).
- El cuadro de perfil del menú es un poco más pequeño, con las esquinas redondeadas, ajustado al marco y ya no se ve encima del cambio de pantalla. El número de versión pasa abajo a la izquierda.

**CARTAS Y SONIDOS**
- Botón "Productos" en la ficha del constructor: enseña las cajas oficiales donde sale la carta; al pulsar una se abre la tienda oficial.
- FUWAMOCO (hBP03-004) dice sus frases al usar sus Oshi skills.
- DIYMiko (hBP05-079): ahora hace también su segunda parte (cheer del archive si te tumbaron un holomem el turno anterior del rival y vas por debajo en Life).
- Contra la IA, las preguntas de sus cartas en tu turno (Robocosan hBP06-007) ya no te las hace a ti.

### English

**NEW BOARD**
- The piles (Cheer, Life, holo Power, Deck and Archive) move toward the center. The log goes to the left, centered, and the phase and turn box to the right.
- Your profile shows at the bottom left and your opponent's at the top right: their picture in a circle and their name.
- Click your circle to play sounds: your opponent hears them too. Click theirs to see their full profile, mute their sounds or (soon) send a friend request.
- The Support your opponent plays shows in the center of the screen for 2 seconds.

**SETUP TIMERS**
- You have 1 minute for the mulligan: if you don't decide, you keep the hand; if it can't be kept (no Debut), it redraws by itself until it can.
- You have 1 minute to place your Debuts: when it runs out the game goes on with what you placed, and without a Center it places one for you. With a single Debut, or after placing all of them, it moves on by itself.

**PROFILE**
- New Stats tab: matches, wins, favorite deck, best deck and last deck. Your matches are saved in your account.
- Match history opens from there (it is no longer in the main menu).
- The menu profile box is a bit smaller, with rounded corners, fitted to the frame and no longer drawn over the screen transition. The version number moves to the bottom left.

**CARDS AND SOUNDS**
- "Products" button in the deck builder card panel: shows the official boxes the card comes in; click one to open the official shop.
- FUWAMOCO (hBP03-004) says her lines when using her Oshi skills.
- DIYMiko (hBP05-079) now also does its second part (cheer from the archive if one of your holomem was downed during your opponent's previous turn and you have less life).
- Against the AI, the questions of its cards during your turn (Robocosan hBP06-007) are no longer asked to you.

---

## 0.0.27 — 2026-10-02

### Español

**PERFIL**
- El cuadro de perfil se ve distinto: tu imagen es más grande, va pegada a la izquierda y se funde con el fondo; el nombre y el fandom son más grandes, y el símbolo de tu Oshi va al lado de tu nombre.
- Primeros símbolos: Mori Calliope, Shirakami Fubuki, Ninomae Ina'nis, Pavolia Reine, Hakos Baelz, Raora Panthera y Koseki Bijou.
- NUEVO: personalización. Pulsa tu cuadro de perfil para elegir tu Oshi, tu imagen (cualquier carta de esa Oshi), tu marco y el fondo. "Automático" sigue usando la Oshi de tu último mazo. Tus cuentas se abren desde ahí.

**MULTIJUGADOR**
- Arreglada la derrota/empate al colocar holomem seguidos en el Back: la segunda jugada se cruzaba con la comprobación de la primera y daba un falso "desincronizado".
- Arreglada la mano inicial invisible: cuando el rival acababa su mulligan, se borraban tus cartas del panel.
- Al acabarse el tiempo el turno termina; antes se quedaba esperando en la Performance.

**CARTAS**
- Koganei Niko (hSD11-006): su Gift al empezar la Performance ya salta, pregunta si quieres usarlo y eliges a qué Koganei Niko va el cheer.
- Kazama Iroha (hBP06-027): su Gift ya funciona: si derriba al Center rival, puedes volver a florecer una Kazama Iroha que floreció este turno.
- Raora Panthera (hBP06-014): su Gift enseña todo el holo Power, revelas la carta que eliges y eliges cuál de tu mano vuelve.

**IA**
- Cuando el rival no ataca, el log dice por qué. Si ves "motivo desconocido", repórtalo.

### English

**PROFILE**
- The profile box looks different: your picture is bigger, sits on the left and fades into the background; name and fandom are bigger, and your Oshi's symbol is next to your name.
- First symbols: Mori Calliope, Shirakami Fubuki, Ninomae Ina'nis, Pavolia Reine, Hakos Baelz, Raora Panthera and Koseki Bijou.
- NEW: customization. Click your profile box to choose your Oshi, your picture (any card of that Oshi), your frame and the background. "Automatic" keeps using the Oshi of your last deck. Your accounts open from there.

**MULTIPLAYER**
- Fixed the defeat/draw when placing holomem in the Back one after another: the second move crossed the first one's check and gave a false "out of sync".
- Fixed the invisible opening hand: when the opponent finished their mulligan, your cards were removed from the panel.
- When time runs out the turn ends; before, it kept waiting in the Performance phase.

**CARDS**
- Koganei Niko (hSD11-006): her Gift at the start of the Performance now triggers, asks whether you want to use it and lets you choose which Koganei Niko gets the cheer.
- Kazama Iroha (hBP06-027): her Gift now works: if she downs the opponent's Center, you may bloom a Kazama Iroha that bloomed this turn once more.
- Raora Panthera (hBP06-014): her Gift shows the whole holo Power, you reveal the card you choose and choose which card from your hand goes back.

**AI**
- When the opponent does not attack, the log says why. If you see "unknown reason", please report it.

---

## 0.0.26 — 2026-10-02

### Español

**CUADRO DE PERFIL**
- Arriba a la izquierda del menú está ahora tu cuadro de perfil: tu imagen, tu nombre (sin el #1234) y debajo el fandom de tu Oshi, todo dentro de un marco temático.
- Hay 9 marcos: Mori Calliope, Fuwawa, Mococo, Hoshimachi Suisei, Houshou Marine, Ichijou Ririka, Ninomae Ina'nis, Pavolia Reine y Shirakami Fubuki.
- Mientras no se pueda personalizar (llega en la siguiente versión), la Oshi es la del mazo de tu última partida, la imagen es esa Oshi con el arte de tu mazo y el marco es el suyo si existe.
- El perfil se guarda en tu cuenta: en otra PC sale igual.
- Pulsar el cuadro abre tus cuentas, como el botón de antes.

### English

**PROFILE BOX**
- At the top left of the menu there is now your profile box: your picture, your name (without the #1234) and under it your Oshi's fandom, all inside a themed frame.
- There are 9 frames: Mori Calliope, Fuwawa, Mococo, Hoshimachi Suisei, Houshou Marine, Ichijou Ririka, Ninomae Ina'nis, Pavolia Reine and Shirakami Fubuki.
- Until it can be customized (next version), your Oshi is the one of the deck from your last match, the picture is that Oshi with your deck's art and the frame is hers if there is one.
- The profile is saved in your account: it looks the same on another PC.
- Clicking the box opens your accounts, like the old button.

---

## 0.0.25 — 2026-10-01

### Español

**CUENTAS (primera parte)**
- Al entrar al juego se crea una cuenta (nombre y contraseña) o se entra en la tuya. Tu nombre queda como Nombre#1234: el número distingue a los que se llaman igual.
- Puede haber varias cuentas en el mismo equipo: arriba a la izquierda del menú está la tuya; pulsándola se cambia de cuenta, se añade otra o se cierra sesión.
- Si tienes código de acceso, tu código tiene una sola cuenta: aunque escribas otro nombre o contraseña, entras en la misma.
- En el multijugador juegas con el nombre de tu cuenta; ya no se escribe en la sala.

**MULTIJUGADOR**
- Al acabar una partida en red se vuelve a la sala de multijugador, con el mismo mazo elegido.

**ARREGLOS**
- En el mulligan en red podía no verse tu mano: si el rival enseñaba la suya antes de que robaras, el panel se apagaba al terminar y se llevaba tus cartas.
- El Extra de los holomem ya no sale como un efecto "Support" por probar: es pasivo (copias en el mazo, Life-2...).

### English

**ACCOUNTS (part one)**
- When you start the game you create an account (name and password) or log in to yours. Your name becomes Name#1234: the number tells apart players with the same name.
- There can be several accounts on the same computer: yours is at the top left of the menu; click it to switch accounts, add another one or log out.
- If you have an access code, your code has a single account: even if you type another name or password, you get the same one.
- In multiplayer you play with your account name; it is no longer typed in the room.

**MULTIPLAYER**
- After an online match you go back to the multiplayer room, with the same deck chosen.

**FIXES**
- In an online mulligan your hand could disappear: if your opponent revealed theirs before you drew, the panel turned off afterwards and took your cards with it.
- The Extra of holomem no longer shows up as a "Support" effect to test: it is passive (copies in the deck, Life-2...).

---

## 0.0.24 — 2026-10-01

### Español

**NUMERACIÓN**
- La versión anterior era la 0.0.23 (salió como 0.1.23 por un error en el número). Esta es la 0.0.24 y desde aquí se sigue contando.

**MULTIJUGADOR**
- Arreglado: la partida se cortaba como desincronizada (DERROTA por empate) al colocar una Debut en el Back o al colocar al empezar. Cada máquina repartía el mazo del otro en distinto orden, así que las cartas no eran las mismas en las dos pantallas.
- La comprobación de que las dos partidas siguen iguales ahora mira también qué carta es cada una.

**MULLIGAN**
- Cuando el rival tiene que enseñar la mano en su mulligan, la ves. Si tú también estás en el mulligan, sale encima de tus cartas y más pequeña; contra la IA, al empezar el tuyo.

**OTROS**
- Arreglado un error al pasar el ratón por una carta marcada como rota en el sistema de pruebas.

### English

**NUMBERING**
- The previous version was 0.0.23 (it shipped as 0.1.23 by mistake). This is 0.0.24 and numbering continues from here.

**MULTIPLAYER**
- Fixed: the match ended as out of sync (DEFEAT by draw) when placing a Debut in the Back or during the opening placement. Each machine dealt the other player's deck in a different order, so the cards were not the same on both screens.
- The check that both matches are still the same now also looks at which card each one is.

**MULLIGAN**
- When your opponent has to reveal their hand in their mulligan, you see it. If you are also in your mulligan, it appears above your cards and smaller; against the AI, when yours starts.

**OTHER**
- Fixed an error when hovering a card marked as broken in the testing system.

---

## 0.0.23 (salió como 0.1.23 / shipped as 0.1.23) — 2026-10-01

### Español

**PARTIDA**
- Las Support se juegan soltándolas en cualquier sitio de la pantalla. Las que se pegan (tool, mascot, fan) van al holomem sobre el que las sueltes; si las sueltas fuera, eliges a cuál con el aura.
- Puedes arrastrar un holomem del Back a la casilla de Collab para colaborar.
- El menú de una carta se cierra al pulsar en cualquier otro sitio.
- Nueva opción "Ver cartas acopladas" al pulsar cualquier holomem del campo, tuyo o del rival.
- La Support que juega el rival sale boca arriba a la izquierda de su campo durante 3 segundos.
- "Mira las cartas de arriba": el botón dice Revelar, lo que revelas se queda a la vista y vuela a su sitio, y el rival ve salir las cartas boca abajo y voltearse las que revelas.
- Dos turnos seguidos sin jugar (el reloj se agota sin que hagas nada) pierden la partida.

**REGLAS**
- Copias: como mucho 4 de cada carta, salvo las que dicen en su Extra "You may include any number of this holomem", que no tienen tope.

**IA RIVAL**
- Pega el cheer al holomem al que más le sirve, hace baton pass cuando alguien de su Back pega más fuerte que su Center y usa sus Oshi skills (las SP, cuando a alguno le quedan 3 de Life o menos).

**MULTIJUGADOR**
- Rendirse o salir de la partida da la victoria al otro jugador al momento, también si es su turno. Si se corta tu propia conexión, la partida acaba en empate.

**CARTAS**
- Los efectos que dicen "you may" preguntan antes de hacerse (unas 140 cartas): tirar el dado, archivar de la mano, recolocar cheers...
- Los efectos que mandan o pegan algo "a tu holomem" te dejan elegir a cuál.
- Los fans que solo se pueden pegar a un holomem concreto ("You may only attach this fan to...") ya lo respetan.
- Más efectos de "mira las cartas de arriba" enseñan las cartas y dejan elegir (hololive Gen 0, Gen 1, Gen 4, FPS Stream, Late-Night Drinking Stream, Poe Poe Poe~, One Final Drink, A Leisurely Day Off, Seeker of Beauty).
- Contra la IA, cuando un efecto tuyo salta en su turno, las cartas las eliges tú.

**CONSTRUCTOR**
- En Filtros hay una pastilla por set y se pueden marcar varios.
- La Oshi sale centrada en el paso 1.
- La portada de cada mazo usa el arte que elegiste para su Oshi.
- Filtro Extra: solo los holomem con la píldora Extra en el marco.

**OPCIONES**
- Nuevo ajuste Fondo, para el menú y el campo: el de siempre o Houshou Marine (provisional, para pruebas).

**MODO PROBADOR**
- El buscador del mazo busca en todo el texto de la carta, no solo en el nombre.

### English

**MATCH**
- Support cards are played by dropping them anywhere on the screen. Attachable ones (tool, mascot, fan) go to the holomem you drop them on; drop them elsewhere and you pick the holomem with the aura.
- You can drag a Back holomem onto the Collab slot to collab.
- A card's menu closes when you click anywhere else.
- New "Show Attached Cards" option when you click any holomem on the field, yours or your opponent's.
- The Support your opponent plays is shown face up on the left of their field for 3 seconds.
- "Look at the top cards": the button says Reveal, what you reveal stays in view and flies to its place, and your opponent sees the cards come out face down and the revealed ones flip.
- Two turns in a row without playing (the clock runs out and you did nothing) lose the match.

**RULES**
- Copies: at most 4 of each card, except those whose Extra says "You may include any number of this holomem", which have no limit.

**OPPONENT AI**
- It attaches its cheer to the holomem that benefits most, baton passes when someone in its Back hits harder than its Center, and uses its Oshi skills (SP ones once either player is at 3 Life or less).

**MULTIPLAYER**
- Conceding or leaving the match gives the other player the win immediately, even during their turn. If your own connection drops, the match ends in a draw.

**CARDS**
- Effects that say "you may" now ask first (about 140 cards): rolling the die, archiving from hand, reattaching cheers...
- Effects that send or attach something "to your holomem" let you choose which one.
- Fans that can only be attached to a specific holomem ("You may only attach this fan to...") now respect it.
- More "look at the top cards" effects show the cards and let you choose (hololive Gen 0, Gen 1, Gen 4, FPS Stream, Late-Night Drinking Stream, Poe Poe Poe~, One Final Drink, A Leisurely Day Off, Seeker of Beauty).
- Against the AI, when one of your effects triggers during its turn, you choose the cards.

**DECK BUILDER**
- Filters has one chip per set, and you can select several.
- The Oshi is centered in step 1.
- Each deck's cover uses the art you picked for its Oshi.
- Extra filter: only holomem with the Extra pill on their frame.

**OPTIONS**
- New Background setting for the menu and the field: the usual one or Houshou Marine (temporary, for testing).

**TESTER MODE**
- The deck search looks through the whole card text, not just the name.

---

## 0.0.22 (salió como 0.1.22 / shipped as 0.1.22) — 2026-09-30

### Español

**NUEVO**
- Historial de partidas (menú principal): tus últimas 50 partidas, con el resultado, el rival y cuántos turnos duró. Desde ahí puedes copiar tu mazo o el del rival al constructor.
- Códigos de mazo: en el constructor, "Copiar código" copia cualquier mazo como un código que puedes pegar donde quieras, y pegando un código en el recuadro de abajo se crea ese mazo.
- Regla nueva: como mucho 4 copias de cada carta, también de los holomem Debut. Los mazos recomendados se ajustaron, y los mazos guardados con más copias se arreglan solos.
- Se pueden guardar mazos sin terminar (basta con nombre y Oshi); salen como incompletos y no se pueden jugar hasta acabarlos.
- Mazos personalizados: Amane Kanata e Isaki Riona.
- Constructor de mazos nuevo, al estilo de Master Duel: a la izquierda la carta que pulsas (con su texto, su rareza y botones para añadir, quitar, cambiar el arte y marcarla como favorita; pulsando la imagen se ve en grande), en el centro tu mazo y tu cheer deck, y a la derecha la lista de cartas con favoritas, botón de solo cheers, filtros, orden (color, set, alfabético, rareza) y botón de limpiar.
- Cada mazo recuerda el arte que eliges para cada carta, y en la partida las cartas salen con ese arte.
- Los avisos del servidor salen arriba de la pantalla (se pueden cerrar), y el juego avisa cuando sale una versión nueva.

**CARTAS**
- Los efectos de "mira las cartas de arriba" te enseñan siempre las cartas, aunque solo se pueda coger una; si lo que buscas tiene una condición, también puedes no coger ninguna (The Archiver y el resto de esa familia).
- 24 Support que revelan holomem de las 4 de arriba (Idol Microphone y el resto de esa familia) enseñan las 4 y dejan elegir cuáles revelar.
- GEOW (hSD12-016): eliges el cheer y a quién va.
- Cute Stadium Jacket (hBP06-097) ya funciona: +30 de HP a un holomem Buzz y sin daño de los efectos de la Main Phase del rival.
- Las holomem vanilla salen marcadas como correctas: no tienen nada que pueda fallar.

**MODO PROBADOR**
- Cartas más grandes en "Elegir la mano inicial" y en el buscador del mazo.
- Las herramientas de campo enseñan la carta en grande al pasar el ratón.
- Los errores que tenga el juego se mandan solos, para poder arreglarlos.

### English

**NEW**
- Match history (main menu): your last 50 matches, with the result, the opponent and how many turns it lasted. From there you can copy your deck or your opponent's deck to the deck builder.
- Deck codes: in the deck builder, "Copy code" copies any deck as a code you can paste anywhere, and pasting a code in the box at the bottom creates that deck.
- New rule: at most 4 copies of any card, Debut holomem included. The recommended decks were adjusted, and saved decks with more copies are fixed automatically.
- You can save unfinished decks (they just need a name and an Oshi); they show as unfinished and cannot be played until complete.
- Custom decks: Amane Kanata and Isaki Riona.
- New deck builder, in the style of Master Duel: the card you click on the left (with its text, rarity and buttons to add, remove, change its art and mark it as favorite; click the image to see it big), your deck and cheer deck in the middle, and the card list on the right with favorites, a cheers-only button, filters, sorting (color, set, alphabetical, rarity) and a clear button.
- Each deck remembers the art you pick for every card, and the cards come out with that art in the match.
- Notices from the server appear at the top of the screen (you can close them), and the game tells you when a new version is out.

**CARD FIXES**
- "Look at the top cards" effects now always show you the cards, even when only one can be picked; when what you look for has a condition, you may also take none (The Archiver and the rest of that family).
- 24 Supports that reveal holomem from the top 4 (Idol Microphone and the rest of that family) now show the 4 cards and let you choose which ones to reveal.
- GEOW (hSD12-016): you choose the cheer and who receives it.
- Cute Stadium Jacket (hBP06-097) now works: +30 HP on a Buzz holomem and no damage from the opponent's Main Phase effects.
- Vanilla holomem show as checked: there is nothing on them that can fail.

**TESTER MODE**
- Bigger cards in "Pick your opening hand" and in the deck search.
- The field tools show the card in large when you hover it.
- Errors the game runs into are sent automatically so they can be fixed.
