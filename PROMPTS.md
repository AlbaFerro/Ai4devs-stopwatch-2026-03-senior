
# 1 CHATGTP

Quiero que crees un prompt para crear una landing en HTML con javascript vanilla en el que haya dos botones: cronómetro y cuenta atrás. Clicando en cada uno de ellos se habita o deshabilita la visualización de su contenido. El apartado cronometro contendrá un cronometro con botones de iniciar  y finalizar. El apartado cuenta atrás, el usuario puede indicar los minutos.

# 2 CLAUDE


Crea una landing page en HTML, CSS y JavaScript vanilla, en un solo proyecto simple y funcional, sin frameworks ni librerías externas.

Requisitos generales:
- Diseño limpio, moderno y responsive.
- Estructura clara y visualmente agradable.
- Usa solo HTML, CSS y JavaScript puro.
- El código debe estar bien organizado y ser fácil de entender.
- La landing debe tener un título principal y una breve descripción.
- Debe haber dos botones principales o pestañas visibles al inicio:
  1. "Cronómetro"
  2. "Cuenta atrás"

Comportamiento de los botones:
- Al hacer clic en "Cronómetro", se debe mostrar el contenido del cronómetro y ocultar o deshabilitar visualmente el contenido de "Cuenta atrás".
- Al hacer clic en "Cuenta atrás", se debe mostrar el contenido de la cuenta atrás y ocultar o deshabilitar visualmente el contenido de "Cronómetro".
- El botón activo debe destacarse visualmente.

Sección "Cronómetro":
- Debe mostrar un cronómetro digital en formato HH:MM:SS o MM:SS.
- Debe incluir dos botones:
  - "Iniciar"
  - "Finalizar"
- Al pulsar "Iniciar", el cronómetro comienza a contar desde 0.
- Al pulsar "Finalizar", el cronómetro se detiene.
- Evita que se creen múltiples intervalos si el usuario pulsa varias veces "Iniciar".
- El cronómetro debe verse grande y centrado.

Sección "Cuenta atrás":
- Debe incluir un input donde el usuario pueda indicar la cantidad de minutos.
- Debe haber un botón para iniciar la cuenta atrás.
- La cuenta atrás debe mostrar el tiempo restante en formato MM:SS.
- Cuando llegue a 0, debe detenerse correctamente y mostrar un mensaje como "Tiempo finalizado".
- Valida que el usuario introduzca un número válido de minutos.
- El contenido debe ser claro, intuitivo y fácil de usar.

Estilo:
- Usa una estética moderna, minimalista y profesional.
- Botones con hover.
- Tarjetas o contenedores con bordes redondeados y sombra suave.
- Buena jerarquía visual y espaciado.
- Responsive para móvil y escritorio.

Entrega:
- Proporciona el código completo de:
  - index.html
  - style.css
  - script.js
- Asegúrate de que funcione al abrir el HTML en el navegador sin dependencias externas.


# 3 CLAUDE

El input pide en minuto, la cuenta atras se estable en DD:HH:MM:SS

