import { FsNode, Lab } from "../types";

const D = (children: Record<string, FsNode>): FsNode => ({ type: "dir", children });
const F = (content: string, hidden = false): FsNode => ({ type: "file", content, hidden });

const homeFs = (extra: Record<string, FsNode> = {}): FsNode =>
  D({
    home: D({
      student: D({
        "README.txt": F("Bienvenido al laboratorio de CyberLab.\nTodo lo que ves aquí es un entorno simulado y aislado.\nEscribe `help` para ver los comandos disponibles."),
        "mision.txt": F("Tu misión está en el panel del laboratorio (pestaña Briefing).\nUsa la terminal para investigar el objetivo."),
        ...extra,
      }),
    }),
    tmp: D({}),
  });

export const LABS: Lab[] = [
  {
    id: "srv-misterioso",
    name: "El Servidor Misterioso",
    difficulty: "Fácil",
    pts: 150,
    color: "#22cf7d",
    icon: "IServer",
    published: true,
    story:
      "El equipo de desarrollo de CyberCorp dejó un servidor olvidado en la red interna 10.10.10.0/24. Nadie recuerda qué expone ni por qué sigue encendido. Tu misión, como parte del Red Team autorizado, es reconocerlo, enumerar sus servicios y descubrir qué información sensible dejó expuesta el equipo de desarrollo.",
    objective: [
      "Reconocer el objetivo con scan y ping (SOLO la IP del lab).",
      "Enumerar los servicios web y su contenido.",
      "Localizar 2 flags: una vía HTTP y otra en el sistema de archivos.",
    ],
    targetIp: "10.10.10.7",
    ports: [
      { port: 22, svc: "OpenSSH 7.9", note: "acceso remoto" },
      { port: 80, svc: "nginx 1.18", note: "web pública" },
      { port: 8080, svc: "dev server", note: "¿entorno de desarrollo?" },
    ],
    fs: homeFs({}),
    http: [
      {
        method: "GET", path: "/", status: 200,
        body: "<html><head><title>CyberCorp</title></head>\n<body><h1>Bienvenido a CyberCorp</h1>\n<p>Sitio corporativo en construcción.</p>\n<!-- TODO: revisar robots.txt antes de producción -->\n</body></html>",
      },
      {
        method: "GET", path: "/robots.txt", status: 200,
        body: "User-agent: *\nDisallow: /backup/\nDisallow: /dev/\n\n# nota del dev: primera entrega del reto\n# flag: CYBERLAB{r0b0ts_siempre_hablan}",
      },
      {
        method: "GET", path: "/dev/", status: 200,
        body: "Índice de /dev/\n- app.wip\n- notas.md\n(pista: el segundo reto está en el sistema de archivos del servidor)",
      },
    ],
    flags: [
      { id: "f1", value: "CYBERLAB{r0b0ts_siempre_hablan}", pts: 70, where: "En la respuesta HTTP de un archivo que los crawlers adoran." },
      { id: "f2", value: "CYBERLAB{el_dev_dejo_notas}", pts: 80, where: "En una nota del desarrollador dentro del sistema de archivos." },
    ],
    hints: [
      "Empieza con `scan 10.10.10.7` para ver qué puertos están abiertos.",
      "Explora el puerto 80 con curl. robots.txt suele listar rutas que alguien quiso ocultar.",
      "La segunda flag no está en la web: navega el sistema de archivos con ls y cd. Prueba rutas como /home.",
    ],
    solution: [
      { step: "Reconocimiento", detail: "scan 10.10.10.7 revela tres puertos: 22 (SSH), 80 (nginx) y 8080 (dev server)." },
      { step: "Enumeración web", detail: "curl http://10.10.10.7/ muestra un comentario HTML apuntando a robots.txt." },
      { step: "Flag 1", detail: "curl http://10.10.10.7/robots.txt expone la primera flag: el archivo reveló rutas y una nota del desarrollador." },
      { step: "Flag 2", detail: "En el sistema de archivos, ls /home y navegar hasta las notas del dev revela la segunda flag." },
      { step: "Lección", detail: "Los comentarios HTML, robots.txt y los archivos olvidados en disco son fugas de información clásicas de la fase de recon." },
    ],
    skills: ["Recon", "HTTP", "Sistema de archivos"],
  },
  {
    id: "api-perdida",
    name: "La API Perdida",
    difficulty: "Media",
    pts: 200,
    color: "#b18cff",
    icon: "ICode",
    published: true,
    story:
      "Durante una migración, CyberCorp publicó sin querer una API interna en el puerto 5000 del host 10.10.10.42. No aparece en ningún documento oficial… pero el servicio está vivo. La auditoría autorizada te pide encontrar su documentación, listar usuarios y comprobar si los objetos están protegidos por autorización.",
    objective: [
      "Descubrir los endpoints de la API sin documentación oficial.",
      "Encontrar la flag escondida en la documentación expuesta.",
      "Demostrar un IDOR accediendo a un usuario que no es el tuyo.",
    ],
    targetIp: "10.10.10.42",
    ports: [
      { port: 22, svc: "OpenSSH 8.2", note: "acceso remoto" },
      { port: 5000, svc: "Flask API", note: "API interna expuesta" },
    ],
    fs: homeFs({}),
    http: [
      {
        method: "GET", path: "/", status: 404,
        body: "{\"error\": \"not found\", \"hint\": \"esta app sirve su API bajo /api/v1\"}",
      },
      {
        method: "GET", path: "/api/v1/", status: 200,
        body: "{\"service\": \"cybercorp-internal-api\", \"version\": \"1.0\", \"endpoints\": [\"/api/v1/docs\", \"/api/v1/users\", \"/api/v1/users/{id}\"]}",
      },
      {
        method: "GET", path: "/api/v1/docs", status: 200,
        body: "# CyberCorp Internal API — docs autogeneradas\nGET /api/v1/users        → lista de usuarios\nGET /api/v1/users/{id}   → detalle de usuario (SIN control de autorización: FIX ME)\n\n// recompensa del reto: CYBERLAB{docs_al_descubierto}",
      },
      {
        method: "GET", path: "/api/v1/users", status: 200,
        body: "[{\"id\": 1, \"nombre\": \"tú (auditor)\"}, {\"id\": 2, \"nombre\": \"???\"}, {\"id\": 3, \"nombre\": \"???\"}]",
      },
      {
        method: "GET", path: "/api/v1/users/1", status: 200,
        body: "{\"id\": 1, \"nombre\": \"auditor\", \"rol\": \"guest\", \"email\": \"auditor@cyberlab.dev\"}",
      },
      {
        method: "GET", path: "/api/v1/users/2", status: 200,
        body: "{\"id\": 2, \"nombre\": \"directora.finanzas\", \"rol\": \"admin\", \"email\": \"cfo@cybercorp.example\", \"nota_privada\": \"flag del reto: CYBERLAB{id0r_usuario_ajeno}\"}",
      },
      {
        method: "GET", path: "/api/v1/users/3", status: 200,
        body: "{\"id\": 3, \"nombre\": \"soporte\", \"rol\": \"user\", \"email\": \"soporte@cybercorp.example\"}",
      },
    ],
    flags: [
      { id: "f1", value: "CYBERLAB{docs_al_descubierto}", pts: 90, where: "La documentación autogenerada nunca debería estar pública." },
      { id: "f2", value: "CYBERLAB{id0r_usuario_ajeno}", pts: 110, where: "En el perfil de un usuario que no es el tuyo (IDOR)." },
    ],
    hints: [
      "Escanea 10.10.10.42: hay un servicio poco común en el puerto 5000. Recuerda incluir el puerto en la URL: http://10.10.10.42:5000",
      "La raíz da 404 con una pista. Prueba /api/v1/ para listar endpoints.",
      "/api/v1/users devuelve IDs. ¿Qué pasa si pides el usuario 2 con /api/v1/users/2?",
    ],
    solution: [
      { step: "Descubrimiento", detail: "scan muestra el puerto 5000 (Flask). curl http://10.10.10.42:5000/ responde 404 revelando la base /api/v1." },
      { step: "Documentación expuesta", detail: "GET /api/v1/docs entrega la especificación completa… y la flag 1. Swagger/docs sin protección = mapa del tesoro." },
      { step: "Enumeración de usuarios", detail: "GET /api/v1/users lista IDs numéricos secuenciales: señal clásica de posible IDOR." },
      { step: "Flag 2 (IDOR)", detail: "GET /api/v1/users/2 devuelve el perfil de la directora de finanzas sin validar quién lo pide: Broken Object Level Authorization." },
      { step: "Lección", detail: "En una API, cada endpoint debe comprobar que la sesión autenticada tiene derecho sobre el objeto pedido. Los IDs secuenciales se enumeran en segundos." },
    ],
    skills: ["APIs", "IDOR", "Enumeración"],
  },
  {
    id: "cookie-rota",
    name: "Cookie Rota",
    difficulty: "Media",
    pts: 220,
    color: "#4cc3ef",
    icon: "IKey",
    published: true,
    story:
      "La intranet de CyberCorp (10.10.10.21) usa sesiones basadas en cookies. El equipo de seguridad sospecha que la cookie se puede manipular para escalar privilegios. Tu misión: inspeccionar la cookie, entender su estructura y demostrar que un usuario normal puede convertirse en administrador… sin tocar la base de datos.",
    objective: [
      "Capturar y leer la cookie de sesión (pista: curl -v).",
      "Descifrar su contenido con base64 -d.",
      "Forjar una cookie de administrador y acceder a /admin.",
    ],
    targetIp: "10.10.10.21",
    ports: [
      { port: 80, svc: "Intranet CyberCorp", note: "app de sesiones" },
    ],
    fs: homeFs({}),
    http: [
      {
        method: "GET", path: "/", status: 200,
        body: "HTTP/1.1 200 OK\nSet-Cookie: sesion=eyJ1c2VyIjoiZ3Vlc3QiLCJyb2wiOiJ1c2VyIn0=; Path=/\n\n<html><body><h2>Intranet CyberCorp</h2>\n<p>Hola, invitado. Tu rol actual no permite ver /admin.</p>\n<!-- debug de sesiones activo en /debug -->\n</body></html>",
      },
      {
        method: "GET", path: "/debug", status: 200,
        body: "{ \"modo\": \"debug\", \"nota\": \"las cookies se serializan en base64 SIN firma. pendiente implementar HMAC.\" }\n\nflag de reconocimiento: CYBERLAB{base64_no_es_cifrado}",
      },
      {
        method: "GET", path: "/admin", needHeader: ["cookie", "eyJ1c2VyIjoiZ3Vlc3QiLCJyb2wiOiJhZG1pbiJ9"], status: 200,
        body: "HTTP/1.1 200 OK\n\n<h2>Panel de administración</h2>\n<p>Bienvenida, admin. El servidor confió ciegamente en tu cookie.</p>\n<pre>flag final: CYBERLAB{r0l_admin_falsificado}</pre>",
      },
      {
        method: "GET", path: "/admin", status: 403,
        body: "HTTP/1.1 403 Forbidden\n\nAcceso denegado: se requiere rol 'admin'.\n(pista: el servidor lee el rol directamente de tu cookie)",
      },
    ],
    flags: [
      { id: "f1", value: "CYBERLAB{base64_no_es_cifrado}", pts: 90, where: "En el endpoint de debug que revela cómo se construyen las cookies." },
      { id: "f2", value: "CYBERLAB{r0l_admin_falsificado}", pts: 130, where: "En el panel /admin tras forjar una cookie de administrador." },
    ],
    hints: [
      "curl -v http://10.10.10.21/ muestra las cabeceras, incluida la Set-Cookie. Copia el valor base64.",
      "Decodifica la cookie: base64 -d <valor>. Verás el JSON con tu rol. /debug da la primera flag y confirma el fallo.",
      "Cambia \"rol\":\"user\" por \"rol\":\"admin\", codifica el JSON con base64 y envía: curl -H 'Cookie: sesion=<nuevo_valor>' http://10.10.10.21/admin",
    ],
    solution: [
      { step: "Captura de cookie", detail: "curl -v revela Set-Cookie: sesion=eyJ1c2VyIjoiZ3Vlc3QiLCJyb2wiOiJ1c2VyIn0= — un base64 sospechosamente corto." },
      { step: "Decodificación", detail: "base64 -d muestra {\"user\":\"guest\",\"rol\":\"user\"}. El servidor confía en el contenido: no hay firma (HMAC/JWT)." },
      { step: "Flag 1", detail: "El endpoint /debug (referenciado en un comentario HTML) confirma el diseño inseguro y entrega la primera flag." },
      { step: "Flag 2 (forja)", detail: "Codificando {\"user\":\"guest\",\"rol\":\"admin\"} → eyJ1c2VyIjoiZ3Vlc3QiLCJyb2wiOiJhZG1pbiJ9 y enviándolo como Cookie, /admin responde 200 con la flag." },
      { step: "Lección", detail: "Nunca confíes en datos del cliente sin verificar. Las sesiones deben ir firmadas (JWT con secreto, HMAC) y las cookies llevar HttpOnly, Secure y SameSite." },
    ],
    skills: ["Cookies", "Base64", "Escalada de privilegios"],
  },
  {
    id: "login-vulnerable",
    name: "El Login Vulnerable",
    difficulty: "Difícil",
    pts: 260,
    color: "#ffb454",
    icon: "ILock",
    published: true,
    story:
      "Una app legacy de CyberCorp en 10.10.10.99 sigue usando consultas SQL concatenadas en su formulario de login. El cliente autoriza demostrar el bypass de autenticación y la extracción de datos del panel interno. Recuerda: SOLO contra este objetivo del laboratorio, nunca contra sistemas reales.",
    objective: [
      "Analizar el formulario de login y su comportamiento normal.",
      "Bypasear la autenticación con una inyección SQL clásica.",
      "Extraer la tabla de usuarios del panel interno.",
    ],
    targetIp: "10.10.10.99",
    ports: [
      { port: 80, svc: "Apache + PHP legacy", note: "app vulnerable" },
      { port: 3306, svc: "MySQL 5.6", note: "base de datos (no accesible directamente)" },
    ],
    fs: homeFs({}),
    http: [
      {
        method: "GET", path: "/login", status: 200,
        body: "<form action='/login' method='POST'>\n  <input name='user'> <input name='pass' type='password'>\n  <button>Entrar</button>\n</form>\n<!-- consulta del servidor: SELECT * FROM users WHERE user='X' AND pass='Y' -->",
      },
      {
        method: "POST", path: "/login", needBody: "password123", status: 401,
        body: "Credenciales inválidas. (respuesta normal del login)",
      },
      {
        method: "POST", path: "/login", needBody: "' or '1'='1", status: 200,
        body: "HTTP/1.1 200 OK\nSet-Cookie: auth=admin; Path=/\n\nBienvenido, admin.\nLa consulta resultante fue: SELECT * FROM users WHERE user='admin' OR '1'='1' AND pass='...'\nEl OR '1'='1' hizo la condición siempre verdadera.\n\nflag de bypass: CYBERLAB{auth_bypass_clasico}",
      },
      {
        method: "GET", path: "/panel", needHeader: ["cookie", "auth=admin"], status: 200,
        body: "<h2>Panel interno — volcado de users</h2>\n<table>\n id | user            | rol\n 1  | admin           | admin\n 2  | gerente         | user\n 3  | soporte         | user\n</table>\n<pre>flag de extracción: CYBERLAB{dump_de_usuarios}</pre>",
      },
      {
        method: "GET", path: "/panel", status: 403,
        body: "HTTP/1.1 403 Forbidden\n\nNecesitas la cookie auth=admin (la obtienes al bypasear el login).",
      },
    ],
    flags: [
      { id: "f1", value: "CYBERLAB{auth_bypass_clasico}", pts: 120, where: "Al bypasear el login con la inyección clásica." },
      { id: "f2", value: "CYBERLAB{dump_de_usuarios}", pts: 140, where: "En el panel interno accesible con la sesión obtenida." },
    ],
    hints: [
      "curl http://10.10.10.99/login muestra el formulario Y (en un comentario) la consulta exacta del servidor.",
      "Envía el payload con -d. Prueba: curl -d \"user=admin' OR '1'='1&pass=x\" http://10.10.10.99/login",
      "La respuesta exitosa fija una cookie. Úsala: curl -H 'Cookie: auth=admin' http://10.10.10.99/panel",
    ],
    solution: [
      { step: "Análisis", detail: "El comentario HTML del login revela la consulta: SELECT * FROM users WHERE user='X' AND pass='Y' con input concatenado." },
      { step: "Flag 1 (bypass)", detail: "POST con user=admin' OR '1'='1 convierte el WHERE en siempre verdadero: el servidor autentica sin contraseña válida." },
      { step: "Sesión robada", detail: "El servidor responde Set-Cookie: auth=admin. Con ella, el panel interno queda accesible." },
      { step: "Flag 2 (extracción)", detail: "GET /panel con la cookie vuelca la tabla users completa: usuarios y roles expuestos." },
      { step: "Lección", detail: "La corrección es trivial: consultas parametrizadas (SELECT ... WHERE user=? AND pass=?). El input jamás debe interpretarse como SQL." },
    ],
    skills: ["SQL Injection", "Autenticación", "HTTP"],
  },
  {
    id: "db-oculta",
    name: "La Base de Datos Oculta",
    difficulty: "Difícil",
    pts: 280,
    color: "#ff7b72",
    icon: "IDb",
    published: true,
    story:
      "El SIEM de CyberCorp generó una alerta anoche: múltiples fallos de autenticación SSH contra el servidor de base de datos 10.10.10.5, seguidos de un inicio de sesión exitoso. Como analista Blue Team con acceso de solo lectura al equipo, debes hacer el triage forense: confirmar el ataque, identificar la IP del atacante y encontrar qué dejó expuesto el equipo: hay un volcado de base de datos olvidado en el disco.",
    objective: [
      "Analizar /var/log/auth.log con grep para confirmar la fuerza bruta.",
      "Identificar la IP del atacante (origen del login exitoso).",
      "Localizar el backup oculto de la base de datos.",
    ],
    targetIp: "10.10.10.5",
    ports: [
      { port: 22, svc: "OpenSSH 8.4", note: "servicio atacado" },
      { port: 5432, svc: "PostgreSQL 13", note: "base de datos" },
    ],
    fs: D({
      home: D({
        student: D({
          "README.txt": F("Entorno forense de solo lectura.\nObjetivo: triage del incidente SSH de anoche.\nEmpieza por los logs: /var/log/auth.log"),
        }),
        analyst: D({
          "caso.txt": F("CASO #2049 — posible intrusión SSH\nEstado: pendiente de triage\nFormato de flag de atribución: CYBERLAB{<IP-del-atacante>}\nEjemplo: CYBERLAB{1.2.3.4}"),
        }),
      }),
      var: D({
        log: D({
          "auth.log": F(
            "Jan 12 02:41:03 db01 sshd[1041]: Failed password for admin from 203.0.113.66 port 40210 ssh2\n" +
            "Jan 12 02:41:05 db01 sshd[1041]: Failed password for admin from 203.0.113.66 port 40211 ssh2\n" +
            "Jan 12 02:41:06 db01 sshd[1041]: Failed password for admin from 203.0.113.66 port 40212 ssh2\n" +
            "Jan 12 02:41:08 db01 sshd[1041]: Failed password for admin from 203.0.113.66 port 40213 ssh2\n" +
            "Jan 12 02:41:09 db01 sshd[1041]: Failed password for admin from 203.0.113.66 port 40214 ssh2\n" +
            "Jan 12 02:41:11 db01 sshd[1041]: Failed password for root from 203.0.113.66 port 40215 ssh2\n" +
            "Jan 12 02:41:12 db01 sshd[1041]: Failed password for root from 203.0.113.66 port 40216 ssh2\n" +
            "Jan 12 02:41:14 db01 sshd[1041]: Accepted password for admin from 203.0.113.66 port 40217 ssh2\n" +
            "Jan 12 02:41:14 db01 sshd[1041]: pam_unix(sshd:session): session opened for user admin\n" +
            "Jan 12 02:44:51 db01 sudo: admin : TTY=pts/0 ; PWD=/var/backups ; COMMAND=/bin/ls\n" +
            "Jan 12 03:02:10 db01 sshd[1041]: pam_unix(sshd:session): session closed for user admin\n" +
            "Jan 12 08:15:22 db01 CRON[2210]: pam_unix(cron:session): session opened for user postgres"
          ),
        }),
        backups: D({
          "weekly.tar": F("[binario] volcado semanal legítimo — íntegro"),
          ".db_backup.sql": F(
            "-- CyberCorp DB dump (OLVIDADO por el equipo de datos)\n-- pg_dump -h localhost -U cyber_admin produccion\nCREATE TABLE clientes (id serial, nombre text, tarjeta text);\nINSERT INTO clientes VALUES (1, 'A. López', '****-4421');\n-- credencial filtrada: cyber_admin / Sup3rS3cret0!\n-- flag del reto: CYBERLAB{backup_sin_cifrar}", true
          ),
        }),
      }),
      etc: D({
        "hostname": F("db01.cybercorp.internal"),
      }),
      tmp: D({}),
    }),
    http: [],
    flags: [
      { id: "f1", value: "CYBERLAB{backup_sin_cifrar}", pts: 130, where: "En un volcado de base de datos que nadie recordó borrar (está oculto)." },
      { id: "f2", value: "CYBERLAB{203.0.113.66}", pts: 150, where: "Constrúyela con la IP del login SSH exitoso: CYBERLAB{<IP>}." },
    ],
    hints: [
      "Los archivos que empiezan por punto están ocultos: usa ls -a en cada directorio interesante (/var/backups, /home…).",
      "grep 'Failed' /var/log/auth.log muestra la fuerza bruta; grep 'Accepted' revela el login exitoso y su IP de origen.",
      "La flag de atribución sigue el formato del caso: CYBERLAB{IP}. Léela en /home/analyst/caso.txt y en el backup (.db_backup.sql).",
    ],
    solution: [
      { step: "Triage de logs", detail: "grep 'Failed password' /var/log/auth.log muestra 7 fallos en 11 segundos desde 203.0.113.66: fuerza bruta confirmada." },
      { step: "Login exitoso", detail: "grep 'Accepted' muestra que admin entró desde esa misma IP a las 02:41:14: credenciales comprometidas." },
      { step: "Flag 2 (atribución)", detail: "El origen del ataque es 203.0.113.66 → flag CYBERLAB{203.0.113.66}, tal y como pedía el caso." },
      { step: "Flag 1 (backup)", detail: "ls -a /var/backups revela .db_backup.sql: un pg_dump con credenciales y datos en claro. Flag CYBERLAB{backup_sin_cifrar}." },
      { step: "Lección", detail: "El incidente deja tres acciones: rotar credenciales, eliminar/copiar el backup a almacenamiento cifrado y bloquear la IP. El log completo permite reconstruir la línea temporal (02:41 entrada → 02:44 sudo → 03:02 salida)." },
    ],
    skills: ["Blue Team", "Forense", "Logs"],
  },
];

// Segunda flag de "El Servidor Misterioso" vive en el fs: se añade aquí para mantener limpio el builder
LABS[0].fs = D({
  home: D({
    student: D({
      "README.txt": F("Bienvenido al laboratorio de CyberLab.\nTodo lo que ves aquí es un entorno simulado y aislado.\nEscribe `help` para ver los comandos disponibles."),
      "mision.txt": F("Tu misión está en el panel del laboratorio (pestaña Briefing).\nUsa la terminal para investigar el objetivo."),
    }),
    dev: D({
      "notas.md": F(
        "# Notas del desarrollador\n- Migrar la web a producción el viernes.\n- Quitar los comentarios HTML antes de desplegar.\n- OJO: no olvidar el archivo de notas en /home/dev.\n\nflag del servidor: CYBERLAB{el_dev_dejo_notas}"
      ),
      "app.wip": F("[código fuente en desarrollo]"),
    }),
  }),
  var: D({
    www: D({
      html: D({
        "index.html": F("<h1>Bienvenido a CyberCorp</h1><!-- TODO: revisar robots.txt -->"),
      }),
    }),
  }),
  tmp: D({}),
});
