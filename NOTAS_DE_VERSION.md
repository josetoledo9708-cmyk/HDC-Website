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
