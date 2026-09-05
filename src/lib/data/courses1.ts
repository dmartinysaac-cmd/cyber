import { Block, CodeExercise, Lesson, Level, QuizQ } from "../types";

const L = (id: string, title: string, min: number, xp: number, sum: string, body: Block[], quiz: QuizQ[], exercise?: CodeExercise): Lesson =>
  ({ id, title, min, xp, sum, body, quiz, exercise });
const Q = (q: string, opts: string[], a: number, why: string): QuizQ => ({ q, opts, a, why });

export const LEVEL1: Level = {
  id: "n1", num: 1, title: "Fundamentos", tag: "NIVEL 1", color: "#4cc3ef", icon: "ILayers", published: true,
  desc: "La base de todo: qué es la ciberseguridad, cómo piensan los atacantes y defensores, y las reglas del juego ético y legal.",
  lessons: [
    L("n1-1", "Qué es la ciberseguridad", 10, 40, "La tríada CIA y el panorama de amenazas digitales.",
      [
        { k: "p", t: "La ciberseguridad es la disciplina que protege sistemas, redes y datos frente a ataques digitales. Su objetivo central se resume en la tríada CIA: Confidencialidad (solo accede quien debe), Integridad (los datos no se alteran sin autorización) y Disponibilidad (el servicio funciona cuando se necesita)." },
        { k: "list", items: ["Confidencialidad: cifrado, autenticación, mínimos privilegios.", "Integridad: hashes, firmas digitales, control de cambios.", "Disponibilidad: redundancia, backups, protección anti-DDoS."] },
        { k: "p", t: "Un ataque rompe al menos una de las tres patas: una filtración rompe la confidencialidad, un ransomware rompe la disponibilidad y la integridad, y una web falsificada rompe la integridad." },
        { k: "tip", t: "Cuando analices cualquier incidente, pregúntate siempre: ¿qué parte de la tríada CIA se vio comprometida?" },
      ],
      [
        Q("Un ransomware que cifra los discos de un hospital rompe principalmente…", ["La disponibilidad y la integridad", "Solo la confidencialidad", "Ninguna: es un fallo de hardware", "El protocolo TCP"], 0, "Los datos quedan inaccesibles (disponibilidad) y alterados (integridad)."),
        Q("¿Cuál de estas medidas protege la confidencialidad?", ["Cifrar la base de datos", "Hacer copias de seguridad", "Añadir más servidores", "Monitorizar el tráfico"], 0, "El cifrado garantiza que solo pueda leer la información quien tenga la clave."),
      ]),
    L("n1-2", "Tipos de hackers", 8, 35, "White hat, black hat, grey hat y los equipos red/blue/purple.",
      [
        { k: "p", t: "El término hacker describe a alguien con habilidad técnica profunda, no a un delincuente. El sombrero define la ética: white hat (autorizado y legal), black hat (malicioso) y grey hat (zona ambigua, sin permiso pero sin daño directo)." },
        { k: "list", items: ["Red Team: simula atacantes reales para poner a prueba defensas.", "Blue Team: detecta, analiza y responde a los ataques.", "Purple Team: combina ambos para mejorar la seguridad de forma continua."] },
        { k: "p", t: "En esta plataforma serás white hat: cada técnica se practica únicamente sobre objetivos simulados y autorizados dentro de CyberLab." },
      ],
      [
        Q("Un pentester contratado por una empresa para auditar sus sistemas es un…", ["White hat", "Black hat", "Grey hat", "Script kiddie"], 0, "Trabaja con autorización expresa y un alcance definido."),
        Q("¿Qué equipo se encarga de detectar y responder ataques?", ["Blue Team", "Red Team", "Green Team", "Dev Team"], 0, "El Blue Team opera el SOC, los SIEM y la respuesta a incidentes."),
      ]),
    L("n1-3", "Ética y legalidad", 10, 40, "Autorización, alcance y las líneas que nunca se cruzan.",
      [
        { k: "p", t: "La diferencia entre un pentester y un cibercriminal no es la técnica: es el permiso. Acceder a un sistema sin autorización es delito en prácticamente todos los países, aunque no causes daño ni robes nada." },
        { k: "list", items: ["Autorización por escrito: contrato o programa de bug bounty con alcance definido.", "Reglas de enfrentamiento (RoE): qué se puede tocar, cuándo y cómo.", "Reporte responsable: las vulnerabilidades se comunican en privado al afectado.", "No exceder el alcance: encontrar un fallo no da permiso para explorarlo todo."] },
        { k: "tip", t: "Regla de oro de CyberLab: solo se practica contra objetivos del propio laboratorio. IPs y dominios externos están vetados por diseño." },
        { k: "p", t: "Marcos como el Código de Ética de (ISC)² o la EC-Council exigen proteger la privacidad, actuar con consentimiento y reportar con responsabilidad." },
      ],
      [
        Q("Encuentras una vulnerabilidad en la web de tu banco sin permiso. ¿Qué es correcto?", ["Reportarla por el canal responsable del banco, sin explotar datos", "Publicarla en redes para que la arreglen rápido", "Venderla al mejor postor", "Entrar a demostrar que existe"], 0, "La divulgación responsable comunica en privado y sin acceder a datos ajenos."),
        Q("¿Qué documento define qué sistemas pueden probarse en un pentest?", ["El alcance (scope) del contrato", "El WHOIS del dominio", "El archivo robots.txt", "La política de cookies"], 0, "El alcance acordado por escrito delimita objetivos, horarios y técnicas permitidas."),
      ]),
    L("n1-4", "Sistemas operativos", 12, 45, "Kernel, procesos, memoria y por qué importan en seguridad.",
      [
        { k: "p", t: "El sistema operativo gestiona hardware, procesos, memoria, usuarios y archivos. El kernel es su núcleo: decide quién puede hacer qué. Casi todas las vulnerabilidades críticas son fallos de esas decisiones." },
        { k: "list", items: ["Linux: abierto, dominante en servidores, contenedores y herramientas de seguridad.", "Windows: mayoritario en escritorios corporativos; objetivo frecuente de malware.", "macOS/BSD: base Unix, presentes en entornos de desarrollo."] },
        { k: "p", t: "Conceptos clave: usuario y privilegios (root/administrador lo puede todo), sistema de archivos (todo es un archivo en Unix) y servicios (programas que escuchan en la red)." },
      ],
      [
        Q("El núcleo del sistema operativo que gestiona hardware y privilegios se llama…", ["Kernel", "Shell", "BIOS", "Driver"], 0, "El kernel media entre el software y el hardware y aplica los permisos."),
        Q("En Linux, el usuario con privilegios totales es…", ["root", "admin", "sudo", "master"], 0, "root (UID 0) puede leer, escribir y ejecutar cualquier cosa del sistema."),
      ]),
    L("n1-5", "Linux básico", 15, 50, "La herramienta nº1 del hacker ético: navega el sistema como en casa.",
      [
        { k: "p", t: "Kali, Parrot y Ubuntu son distribuciones Linux. El 90% del trabajo de seguridad pasa por su terminal. Estructura clave: / (raíz), /home (usuarios), /etc (configuración), /var (logs y datos variables), /tmp (temporal)." },
        { k: "code", lang: "bash", t: "pwd                # ¿dónde estoy?\nls -la             # listar todo, incluso ocultos\ncd /etc            # moverse\ncat /etc/passwd    # leer un archivo\nmkdir lab && cd lab\nwhoami             # ¿qué usuario soy?" },
        { k: "tip", t: "Los archivos que empiezan por punto (.bashrc, .ssh) están ocultos: ls -a los revela. Muchos retos esconden pistas ahí." },
      ],
      [
        Q("¿Qué comando muestra tu ubicación actual en el sistema de archivos?", ["pwd", "ls", "cd", "whoami"], 0, "pwd (print working directory) imprime la ruta absoluta actual."),
        Q("¿Dónde guarda Linux la configuración del sistema?", ["/etc", "/bin", "/root", "/dev"], 0, "/etc contiene los archivos de configuración globales."),
      ]),
    L("n1-6", "Windows básico", 10, 40, "Registro, servicios y PowerShell: el otro lado del mapa.",
      [
        { k: "p", t: "Windows domina el escritorio corporativo, así que un profesional de seguridad debe conocerlo. Piezas clave: el Registro (base de datos de configuración), los Servicios (procesos en segundo plano), el Visor de eventos (logs) y las Políticas de grupo (GPO)." },
        { k: "code", lang: "powershell", t: "Get-Process              # procesos activos\nGet-Service              # servicios\nnetstat -ano             # conexiones y puertos\nGet-EventLog -LogName Security -Newest 5" },
        { k: "p", t: "PowerShell es la terminal moderna de Windows: scripting potente que tanto administradores como atacantes usan. Entenderla es obligatorio para defenderla." },
      ],
      [
        Q("¿Qué herramienta lista las conexiones de red y sus puertos en Windows?", ["netstat", "regedit", "tasklist", "ipconfig"], 0, "netstat -ano muestra conexiones activas con el PID del proceso."),
        Q("La base de datos de configuración jerárquica de Windows es…", ["El Registro", "El Explorador", "La BIOS", "WMI"], 0, "El Registro (regedit) almacena configuración de sistema y aplicaciones."),
      ]),
    L("n1-7", "La terminal", 12, 45, "Shell, comandos, tuberías y redirecciones: tu mesa de trabajo.",
      [
        { k: "p", t: "La terminal (bash, zsh, PowerShell) ejecuta comandos de texto. Su poder está en combinar programas pequeños con tuberías: la salida de uno alimenta la entrada del siguiente." },
        { k: "code", lang: "bash", t: "cat access.log | grep 404        # filtra líneas con 404\nps aux | grep nginx              # busca un proceso\nhistory                          # comandos anteriores\necho \"hola\" > archivo.txt        # redirige salida a archivo\ncat archivo.txt >> otro.txt      # añade al final" },
        { k: "tip", t: "man <comando> abre el manual. Dominar grep, find y las redirecciones multiplica tu velocidad en cualquier laboratorio." },
      ],
      [
        Q("¿Qué hace el operador | (pipe)?", ["Pasa la salida de un comando como entrada del siguiente", "Ejecuta dos comandos en paralelo", "Concatena archivos", "Comenta una línea"], 0, "La tubería encadena comandos: ls | grep txt."),
        Q("¿Qué símbolo añade la salida al final de un archivo sin borrarlo?", [">>", ">", "<", "|"], 0, ">> añade (append); > sobrescribe el archivo."),
      ]),
    L("n1-8", "Procesos", 9, 35, "PIDs, servicios y cómo detectar actividad sospechosa.",
      [
        { k: "p", t: "Cada programa en ejecución es un proceso con un identificador (PID). Los procesos escuchan puertos, leen archivos y consumen recursos: por eso son la primera pista en un análisis de intrusión." },
        { k: "code", lang: "bash", t: "ps aux               # todos los procesos\ntop / htop           # monitor en vivo\nkill 1234            # termina el PID 1234\nnetstat -tulpn       # qué proceso escucha cada puerto" },
        { k: "p", t: "Señal de alarma clásica: un proceso con nombre raro (xm1gr.exe), ejecutado desde /tmp o consumiendo el 100% de CPU, suele ser malware o minería no autorizada." },
      ],
      [
        Q("¿Qué comando de Linux muestra todos los procesos del sistema?", ["ps aux", "ls -p", "proc list", "show proc"], 0, "ps aux lista procesos de todos los usuarios con detalles."),
        Q("Un proceso consumiendo 100% de CPU llamado svch0st.exe en /tmp es…", ["Sospechoso: posible malware disfrazado", "Normal en Windows", "Un servicio del kernel", "Un contenedor Docker"], 0, "El nombre imita a svchost.exe y /tmp no es ubicación legítima de servicios."),
      ]),
    L("n1-9", "Archivos y permisos", 12, 45, "rwx, chmod y por qué un permiso mal puesto es una vulnerabilidad.",
      [
        { k: "p", t: "En Linux cada archivo tiene tres permisos (lectura r, escritura w, ejecución x) para tres dueños: usuario, grupo y otros. Se representan como -rwxr-xr-- o en octal: 754." },
        { k: "code", lang: "bash", t: "ls -l script.sh\n# -rwxr-xr-- 1 alice devs  script.sh\nchmod 600 id_rsa       # solo el dueño lee/escribe\nchmod +x script.sh     # lo hace ejecutable\nchmod 777 temporal     # ¡peligro! todos pueden todo" },
        { k: "tip", t: "chmod 777 es la vulnerabilidad de permisos más común en ejercicios: cualquiera puede leer o modificar el archivo. Nunca lo uses en archivos sensibles." },
      ],
      [
        Q("El permiso 754 significa…", ["Dueño: rwx, grupo: r-x, otros: r--", "Dueño: r--, grupo: rwx, otros: r-x", "Todos: rwx", "Dueño: rw-, grupo: r-x, otros: r-x"], 0, "7=rwx, 5=r-x, 4=r--."),
        Q("¿Por qué chmod 777 en una clave privada es grave?", ["Cualquier usuario del sistema puede leerla", "Hace el archivo más lento", "Borra el archivo", "Lo convierte en ejecutable"], 0, "777 da lectura, escritura y ejecución a todos los usuarios."),
      ]),
  ],
};

export const LEVEL2: Level = {
  id: "n2", num: 2, title: "Redes", tag: "NIVEL 2", color: "#22cf7d", icon: "INet", published: true,
  desc: "Cómo viajan los datos: IPs, puertos, protocolos y los dispositivos que filtran el tráfico.",
  lessons: [
    L("n2-1", "IPv4", 10, 40, "Direcciones, clases, privadas vs públicas y ejercicios de identificación.",
      [
        { k: "p", t: "Una IPv4 son 32 bits escritos como 4 octetos (0-255) separados por puntos: 192.168.1.10. Identifica un dispositivo en la red. Las públicas son ruteables en Internet; las privadas (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) solo viven dentro de redes locales." },
        { k: "list", items: ["127.0.0.1 → loopback: tu propia máquina.", "192.168.x.x, 10.x.x.x → privadas, no salen a Internet.", "169.254.x.x → autoasignada cuando falla el DHCP (pista forense)."] },
        { k: "p", t: "Ejercicio mental: ¿cuál es válida? 300.1.2.3 no (octeto > 255), 192.168.1 no (faltan octetos), 10.0.0.256 tampoco. Cada octeto va de 0 a 255." },
      ],
      [
        Q("¿Cuál de estas direcciones IPv4 es válida?", ["172.16.44.9", "256.10.10.1", "192.168.7", "10.0.0.-1"], 0, "Todos los octetos deben estar entre 0 y 255 y ser exactamente cuatro."),
        Q("¿Cuál es una dirección de loopback?", ["127.0.0.1", "192.168.0.1", "8.8.8.8", "255.255.255.0"], 0, "127.0.0.1 siempre apunta a la propia máquina."),
      ]),
    L("n2-2", "IPv6", 8, 35, "128 bits, notación hexadecimal y por qué existe.",
      [
        { k: "p", t: "IPv4 se quedó corta (~4.300M de direcciones). IPv6 usa 128 bits en hexadecimal: 2001:0db8:85a3:0000:0000:8a2e:0370:7334. Los grupos de ceros se comprimen con :: una sola vez." },
        { k: "code", lang: "text", t: "2001:db8::1            # comprimida\nfe80::1                # enlace local\n::1                    # loopback de IPv6" },
        { k: "tip", t: "Si ves :: en una dirección, es IPv6. Los ataques no cambian de naturaleza, pero cambian las herramientas: ping6, ip -6, nmap -6." },
      ],
      [
        Q("¿Cuántos bits tiene una dirección IPv6?", ["128", "64", "32", "256"], 0, "128 bits: 8 grupos de 16 bits en hexadecimal."),
        Q("La dirección ::1 en IPv6 equivale a…", ["127.0.0.1 (loopback)", "0.0.0.0", "255.255.255.255", "192.168.1.1"], 0, "::1 es el loopback de IPv6."),
      ]),
    L("n2-3", "TCP/IP y el modelo de capas", 12, 45, "Las 4 capas que explican todo el tráfico de Internet.",
      [
        { k: "p", t: "El modelo TCP/IP organiza la comunicación en capas: Aplicación (HTTP, DNS, SSH), Transporte (TCP/UDP con puertos), Internet (IP con direcciones) y Acceso a red (Ethernet, Wi-Fi). Cada capa añade su cabecera: eso es encapsulación." },
        { k: "list", items: ["Aplicación: qué se dice (HTTP GET /index.html).", "Transporte: de qué proceso a qué proceso (puerto 443 → navegador).", "Internet: de qué máquina a qué máquina (IP origen → IP destino).", "Acceso a red: cómo viaja físicamente (MAC, cable, ondas)."] },
        { k: "p", t: "Cuando un paquete llega, cada capa quita su cabecera y entrega el contenido a la siguiente: desencapsulación. Los firewalls y IDS inspeccionan cabeceras de distintas capas." },
      ],
      [
        Q("¿En qué capa del modelo TCP/IP trabajan los puertos?", ["Transporte", "Aplicación", "Internet", "Acceso a red"], 0, "TCP y UDP usan puertos para identificar procesos en la capa de transporte."),
        Q("HTTP, DNS y SSH pertenecen a la capa de…", ["Aplicación", "Transporte", "Internet", "Enlace"], 0, "Son protocolos de la capa de aplicación."),
      ]),
    L("n2-4", "UDP", 8, 35, "Rápido, sin conexión… y sin garantías.",
      [
        { k: "p", t: "UDP envía datagramas sin establecer conexión ni confirmar recepción: más rápido y con menos latencia que TCP, pero sin garantía de entrega ni orden. Lo usan DNS, videojuegos, streaming y VoIP, donde perder un paquete es mejor que esperar." },
        { k: "list", items: ["TCP: fiable, orientado a conexión, con control de flujo.", "UDP: sin conexión, mínimo overhead, ideal para tiempo real.", "El escaneo UDP es más lento y menos fiable que el TCP: muchos puertos no responden."] },
      ],
      [
        Q("¿Qué protocolo usa consultas DNS clásicas por su rapidez?", ["UDP", "TCP", "HTTP", "ICMP"], 0, "DNS usa UDP puerto 53; solo pasa a TCP para respuestas grandes o transferencias de zona."),
        Q("La principal debilidad de UDP es…", ["No garantiza entrega ni orden", "Es demasiado lento", "Cifra demasiado", "Necesita handshake"], 0, "No hay confirmaciones: el emisor no sabe si el datagrama llegó."),
      ]),
    L("n2-5", "DNS", 10, 40, "La agenda telefónica de Internet y cómo se envenena.",
      [
        { k: "p", t: "DNS traduce nombres (cyberlab.dev) a IPs (203.0.113.7). Funciona por jerarquía: tu resolver pregunta a servidores raíz, TLD (.dev) y autoritativos, cacheando respuestas. El registro A apunta a IPv4, AAAA a IPv6, MX a correo, CNAME a alias." },
        { k: "code", lang: "bash", t: "dig cyberlab.dev A        # consulta DNS\nnslookup example.com\nhost -t MX example.com" },
        { k: "tip", t: "En labs de reconocimiento, los registros DNS revelan subdominios, proveedores de correo y servicios internos: una mina de oro para el recon." },
      ],
      [
        Q("¿Qué registro DNS apunta un dominio a una dirección IPv4?", ["A", "MX", "CNAME", "TXT"], 0, "El registro A mapea nombre → IPv4; AAAA lo hace para IPv6."),
        Q("El puerto estándar de DNS es…", ["53", "80", "25", "443"], 0, "DNS escucha en 53, normalmente UDP y también TCP."),
      ]),
    L("n2-6", "HTTP/HTTPS", 12, 45, "Métodos, cabeceras, códigos de estado y el candado TLS.",
      [
        { k: "p", t: "HTTP es el protocolo de la web: el cliente pide (GET /index.html) y el servidor responde con un código de estado. HTTPS añade TLS: cifra el tráfico y verifica la identidad del servidor con certificados." },
        { k: "list", items: ["200 OK · 301/302 redirección · 401 sin credenciales · 403 prohibido · 404 no existe · 500 error del servidor.", "GET trae datos, POST los envía, PUT actualiza, DELETE borra.", "Cabeceras clave: Cookie, Authorization, User-Agent, Content-Type."] },
        { k: "code", lang: "bash", t: "curl -v http://10.10.10.7/       # ve cabeceras y respuesta\ncurl -I https://ejemplo.com      # solo cabeceras" },
      ],
      [
        Q("¿Qué código HTTP indica recurso no encontrado?", ["404", "200", "302", "500"], 0, "404 Not Found: la ruta no existe en el servidor."),
        Q("La diferencia entre HTTP y HTTPS es…", ["HTTPS cifra el tráfico con TLS", "HTTPS es más antiguo", "HTTP usa el puerto 443", "No hay diferencia"], 0, "TLS aporta confidencialidad, integridad y autenticación del servidor."),
      ]),
    L("n2-7", "Puertos", 10, 40, "Los 65.535 números que ordenan el tráfico.",
      [
        { k: "p", t: "Un puerto identifica el proceso que recibe el tráfico en una IP. Rangos: 0-1023 bien conocidos (requieren privilegios), 1024-49151 registrados y 49152-65535 efímeros. Memoriza los clásicos: 22 SSH, 80 HTTP, 443 HTTPS, 53 DNS, 25 SMTP, 3306 MySQL, 8080 HTTP alternativo." },
        { k: "p", t: "Ejercicio: un escaneo revela 22, 80 y 3306 abiertos. Deducción: servidor Linux con web y base de datos MySQL. Si el 3306 es accesible desde Internet, hay un problema de exposición serio." },
        { k: "tip", t: "En CyberLab usarás scan <ip> en la terminal de los labs: solo funciona contra las IPs del laboratorio, como en un entorno real autorizado." },
      ],
      [
        Q("¿Qué servicio escucha normalmente en el puerto 22?", ["SSH", "HTTP", "DNS", "SMTP"], 0, "SSH (acceso remoto cifrado) usa el puerto 22."),
        Q("Los puertos 0-1023 se llaman…", ["Bien conocidos (well-known)", "Efímeros", "Privados", "Dinámicos"], 0, "Están reservados a servicios estándar y requieren privilegios de root."),
      ]),
    L("n2-8", "El handshake TCP", 9, 40, "SYN → SYN-ACK → ACK: así nace una conexión fiable.",
      [
        { k: "p", t: "Antes de enviar datos, TCP establece la conexión en 3 pasos (three-way handshake): el cliente envía SYN, el servidor responde SYN-ACK y el cliente confirma con ACK. Ambos acuerdan números de secuencia que ordenarán y verificarán los datos." },
        { k: "list", items: ["SYN: ¿hablamos? (sincroniza secuencia inicial).", "SYN-ACK: claro, yo también sincronizo.", "ACK: confirmado, empezamos.", "El escaneo SYN (medio abierto) envía SYN y observa: si llega SYN-ACK, el puerto está abierto; si llega RST, cerrado."] },
      ],
      [
        Q("El orden correcto del handshake TCP es…", ["SYN → SYN-ACK → ACK", "ACK → SYN → SYN-ACK", "SYN → ACK → SYN-ACK", "HELLO → OK → DATA"], 0, "Tres pasos: sincronización, confirmación mutua y asentimiento final."),
        Q("Si tras un SYN recibes un paquete RST, el puerto está…", ["Cerrado", "Abierto", "Filtrado", "Cifrado"], 0, "RST (reset) rechaza la conexión: no hay servicio escuchando."),
      ]),
    L("n2-9", "Subredes y CIDR", 12, 50, "Máscaras, /24 y cómo dividir redes como un pro.",
      [
        { k: "p", t: "Una subred divide una red en trozos usando la máscara. 192.168.1.0/24 significa: 24 bits de red y 8 de hosts → 254 equipos útiles (192.168.1.1 a .254). La notación CIDR (/8, /16, /24) sustituye a las máscaras largas." },
        { k: "code", lang: "text", t: "10.0.0.0/24   → 254 hosts (10.0.0.1 - 10.0.0.254)\n192.168.0.0/26 → 62 hosts por subred\nMáscara /24 = 255.255.255.0" },
        { k: "p", t: "Ejercicio: ¿pertenece 192.168.1.77 a 192.168.1.0/24? Sí: la parte de red (192.168.1) coincide. ¿Y a 10.10.10.0/24? No. Saber leer esto a ojo es clave en recon y en firewalls." },
      ],
      [
        Q("¿Cuántos hosts útiles tiene una subred /24?", ["254", "256", "128", "62"], 0, "2^8 - 2 = 254: se descuentan la dirección de red y la de broadcast."),
        Q("¿Cuál de estas IPs pertenece a 192.168.1.0/24?", ["192.168.1.200", "192.168.2.200", "10.0.1.1", "172.16.1.1"], 0, "En /24 los tres primeros octetos identifican la red."),
      ]),
    L("n2-10", "Firewalls", 9, 40, "Reglas de filtrado: la primera muralla de toda red.",
      [
        { k: "p", t: "Un firewall filtra tráfico según reglas: IP origen/destino, puerto, protocolo y estado de la conexión. Dos filosofías: denegar por defecto (solo pasa lo permitido, la segura) y permitir por defecto (peligrosa)." },
        { k: "list", items: ["Firewall de red: protege el perímetro (iptables, pfSense).", "Firewall de host: protege una máquina (ufw, Windows Firewall).", "Stateful: recuerda conexiones establecidas y solo deja pasar respuestas legítimas."] },
        { k: "code", lang: "bash", t: "ufw allow 22/tcp      # permite SSH\nufw deny 3306         # bloquea MySQL desde fuera\nufw status verbose    # reglas activas" },
      ],
      [
        Q("La política de firewall más segura es…", ["Denegar todo por defecto y permitir lo necesario", "Permitir todo y bloquear lo conocido", "No usar reglas", "Bloquear solo el puerto 80"], 0, "Default-deny minimiza la superficie de ataque."),
        Q("Un firewall stateful…", ["Recuerda el estado de las conexiones", "Solo filtra por IP", "Cifra el tráfico", "No necesita reglas"], 0, "Distingue paquetes nuevos de respuestas a conexiones ya establecidas."),
      ]),
    L("n2-11", "VPN", 8, 35, "Túneles cifrados: privacidad en redes que no confías.",
      [
        { k: "p", t: "Una VPN crea un túnel cifrado entre tu equipo y un servidor remoto: tu tráfico sale desde allí y nadie en la red local puede leerlo. Esencial al usar Wi-Fi públicas y para acceder a redes corporativas de forma segura." },
        { k: "list", items: ["Cifra el tráfico extremo a túnel.", "Oculta tu IP real al destino (el destino ve la del servidor VPN).", "No te hace anónimo mágico: el proveedor VPN sí ve tu tráfico.", "Protocolos comunes: WireGuard, OpenVPN, IPsec."] },
      ],
      [
        Q("¿Qué aporta una VPN en una Wi-Fi pública?", ["Cifra tu tráfico frente a otros usuarios de la red", "Anonimato total garantizado", "Más ancho de banda", "Inmunidad a malware"], 0, "El túnel cifrado impide que intercepten tus datos en la red local."),
        Q("¿Quién puede ver tu tráfico dentro del túnel VPN?", ["El servidor VPN de destino", "Cualquiera en tu Wi-Fi", "Tu router doméstico", "Nadie, jamás"], 0, "El túnel termina en el servidor VPN: él ve el tráfico descifrado."),
      ]),
    L("n2-12", "Proxies", 8, 35, "Intermediarios: forward, reverse y el arte de reescribir peticiones.",
      [
        { k: "p", t: "Un proxy intermedia peticiones entre cliente y servidor. Forward proxy: el cliente lo usa para salir (filtra, cachea, oculta origen). Reverse proxy: se sitúa delante de servidores web (balancea, termina TLS, protege). Los proxies de intercepción (Burp, mitmproxy) son la herramienta nº1 para auditar tráfico web con autorización." },
        { k: "tip", t: "En seguridad web, un proxy de intercepción te deja ver y modificar cada petición HTTP de una app vulnerable del laboratorio. Así se entienden XSS o IDOR desde dentro." },
      ],
      [
        Q("Un reverse proxy se coloca…", ["Delante de los servidores para recibir el tráfico entrante", "En el cliente para salir a Internet", "Solo en routers", "Entre dos firewalls"], 0, "Actúa como fachada: balanceo, TLS y protección de los servidores internos."),
        Q("¿Para qué sirve un proxy de intercepción en una auditoría?", ["Capturar y modificar peticiones HTTP de la app objetivo", "Acelerar la conexión", "Cifrar el disco", "Borrar logs"], 0, "Permite inspeccionar y manipular el tráfico entre navegador y aplicación."),
      ]),
  ],
};

export const LEVEL3: Level = {
  id: "n3", num: 3, title: "Programación", tag: "NIVEL 3", color: "#b18cff", icon: "ICode", published: true,
  desc: "Python, JavaScript, Bash y SQL: el idioma de la automatización y de las vulnerabilidades.",
  lessons: [
    L("n3-1", "Python para seguridad", 15, 55, "Variables, listas, bucles y tu primer script de recon.",
      [
        { k: "p", t: "Python es el lenguaje más usado en ciberseguridad por su legibilidad y sus librerías de red (socket, requests). Fundamentos: variables tipadas dinámicamente, listas, diccionarios, bucles for/while y funciones." },
        { k: "code", lang: "python", t: "puertos = [22, 80, 443, 3306]\nabiertos = []\n\nfor p in puertos:\n    if p in (22, 443):\n        abiertos.append(p)\n\nprint(abiertos)        # [22, 443]\nprint(len(puertos))    # 4" },
        { k: "tip", t: "El editor de esta lección ejecuta JavaScript real en un entorno aislado del navegador. En Python valida tu lógica contra la salida esperada: misma dinámica, cero riesgo." },
      ],
      [
        Q("¿Qué devuelve len([22, 80, 443])?", ["3", "2", "4", "Error"], 0, "len() cuenta los elementos de la lista."),
        Q("Para recorrer una lista elemento a elemento en Python usas…", ["for x in lista:", "foreach(lista)", "loop lista", "while lista:"], 0, "La sintaxis nativa es for elemento in iterable."),
      ],
      { lang: "javascript", prompt: "Ejercicio: dada la lista de puertos, muestra SOLO los menores de 1000, uno por línea (el sandbox ejecuta JavaScript).", starter: "const puertos = [22, 80, 3306, 443, 8080, 53];\n// tu código aquí\n", expected: "22\n80\n443\n53", hint: "Usa puertos.filter(p => p < 1000).forEach(p => console.log(p))." }),
    L("n3-2", "JavaScript y la web", 14, 50, "El lenguaje que corre en el navegador… y donde vive XSS.",
      [
        { k: "p", t: "JavaScript domina la web: manipula el DOM, hace peticiones (fetch) y maneja eventos. Entenderlo es obligatorio tanto para construir como para auditar aplicaciones web: el XSS es, literalmente, JavaScript ejecutándose donde no debería." },
        { k: "code", lang: "javascript", t: "const usuario = { nombre: \"nova\", rol: \"admin\" };\nconst headers = Object.keys(usuario);\nconsole.log(headers.join(\", \"));" },
        { k: "p", t: "En el editor de abajo el código se ejecuta en un sandbox aislado: sin acceso a red, cookies ni DOM real. Perfecto para practicar sin peligro." },
      ],
      [
        Q("¿Qué método de JavaScript convierte un objeto JSON en texto?", ["JSON.stringify()", "JSON.parse()", "toString()", "text()"], 0, "stringify serializa el objeto; parse hace lo contrario."),
        Q("document.cookie permite leer…", ["Las cookies accesibles de la página", "Contraseñas guardadas", "El historial", "La IP del usuario"], 0, "Expone las cookies sin flag HttpOnly: por eso el XSS las roba."),
      ],
      { lang: "javascript", prompt: "Ejercicio: imprime cada propiedad del objeto como nombre=valor, una por línea.", starter: "const cfg = { host: \"10.10.10.7\", puerto: 8080 };\n// tu código aquí\n", expected: "host=10.10.10.7\npuerto=8080", hint: "Object.entries(cfg).forEach(([k,v]) => console.log(k + '=' + v));" }),
    L("n3-3", "Bash scripting", 12, 45, "Automatiza tareas repetitivas como un sysadmin.",
      [
        { k: "p", t: "Un script de Bash encadena comandos con lógica: variables ($VAR), condicionales (if), bucles (for) y parámetros ($1). Es el pegamento de todo pentest: recolectar, filtrar y reportar." },
        { k: "code", lang: "bash", t: "#!/bin/bash\nfor ip in 10.10.10.1 10.10.10.2 10.10.10.3; do\n  echo \"Probando $ip\"\ndone" },
        { k: "tip", t: "En la terminal de los labs ya practicas Bash real: ls, cat, grep y redirecciones funcionan igual que en un sistema de verdad." },
      ],
      [
        Q("En Bash, ¿cómo se accede al primer argumento del script?", ["$1", "#1", "arg1", "%1"], 0, "$1, $2… contienen los argumentos posicionales."),
        Q("¿Qué línea hace ejecutable un script?", ["#!/bin/bash", "chmod +x script.sh", "run script.sh", "exec bash"], 0, "chmod +x otorga el permiso de ejecución; el shebang indica el intérprete."),
      ]),
    L("n3-4", "SQL esencial", 14, 50, "SELECT, WHERE, JOIN… y por qué importan en SQL Injection.",
      [
        { k: "p", t: "SQL consulta bases de datos relacionales. Lo esencial: SELECT columnas FROM tabla WHERE condición. Los operadores AND/OR y los comodines % filtran filas. Entender su lógica es el requisito previo para comprender (y prevenir) la inyección SQL." },
        { k: "code", lang: "sql", t: "SELECT usuario, rol FROM usuarios WHERE rol = 'admin';\nSELECT * FROM accesos WHERE ip LIKE '10.10.%';" },
        { k: "p", t: "Regla de oro defensiva: nunca concatenes entradas del usuario en la consulta; usa consultas parametrizadas. Lo verás a fondo en el Nivel 4." },
      ],
      [
        Q("¿Qué devuelve SELECT * FROM usuarios WHERE rol = 'admin'?", ["Todas las columnas de los usuarios admin", "Solo la columna rol", "Todos los usuarios", "Un error"], 0, "El asterisco trae todas las columnas; el WHERE filtra las filas admin."),
        Q("En SQL, LIKE '10.10.%' significa…", ["Coincide con cadenas que empiezan por 10.10.", "Igualdad exacta", "Error de sintaxis", "Compara números"], 0, "% es el comodín de cualquier secuencia de caracteres."),
      ],
      { lang: "sql", prompt: "Ejercicio (simulador): escribe la consulta que liste usuario y email de la tabla usuarios donde el rol sea 'admin'. El validador normaliza espacios.", starter: "SELECT ", expected: "select usuario, email from usuarios where rol = 'admin'", hint: "SELECT usuario, email FROM usuarios WHERE rol = 'admin';" }),
  ],
};
