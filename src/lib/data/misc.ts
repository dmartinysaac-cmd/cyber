import { AchDef, MissionDef, RankInfo } from "../types";

export const RANKS: RankInfo[] = [
  { name: "Novato", min: 0, color: "#8aa1b8" },
  { name: "Explorador", min: 300, color: "#4cc3ef" },
  { name: "Analista", min: 800, color: "#22cf7d" },
  { name: "Pentester", min: 1600, color: "#b18cff" },
  { name: "Especialista", min: 2800, color: "#ffb454" },
  { name: "Cyber Master", min: 4500, color: "#ff7b72" },
];

export function rankOf(xp: number): { idx: number; info: RankInfo; next: RankInfo | null; pct: number } {
  let idx = 0;
  RANKS.forEach((r, i) => { if (xp >= r.min) idx = i; });
  const next = RANKS[idx + 1] ?? null;
  const pct = next ? ((xp - RANKS[idx].min) / (next.min - RANKS[idx].min)) * 100 : 100;
  return { idx, info: RANKS[idx], next, pct };
}

export const ACHIEVEMENTS: AchDef[] = [
  { id: "first-step", name: "Primer paso", desc: "Completa tu primera lección", icon: "IPlay", xp: 30 },
  { id: "scholar", name: "Estudioso", desc: "Completa 5 lecciones", icon: "IBook", xp: 50 },
  { id: "bookworm", name: "Ratón de biblioteca", desc: "Completa 15 lecciones", icon: "IBook", xp: 100 },
  { id: "fundamentals", name: "Base sólida", desc: "Termina todo el Nivel 1: Fundamentos", icon: "ILayers", xp: 120 },
  { id: "netrunner", name: "Netrunner", desc: "Termina todo el Nivel 2: Redes", icon: "INet", xp: 140 },
  { id: "first-blood", name: "First blood", desc: "Captura tu primera flag", icon: "IFlag", xp: 60 },
  { id: "flag-hunter", name: "Cazador de flags", desc: "Captura 6 flags", icon: "IFlag", xp: 120 },
  { id: "lab-rat", name: "Rata de laboratorio", desc: "Completa tu primer laboratorio", icon: "IFlask", xp: 80 },
  { id: "lab-master", name: "Dominio total", desc: "Completa todos los laboratorios", icon: "IFlask", xp: 250 },
  { id: "coder", name: "Manos al código", desc: "Ejecuta código en el editor 3 veces", icon: "ICode", xp: 40 },
  { id: "streak-3", name: "Constancia", desc: "Racha de 3 días seguidos", icon: "IFlame", xp: 60 },
  { id: "streak-7", name: "Imparable", desc: "Racha de 7 días seguidos", icon: "IFlame", xp: 150 },
  { id: "analyst", name: "Mente analítica", desc: "Alcanza el rango Analista", icon: "IAward", xp: 100 },
  { id: "blue-shield", name: "Escudo azul", desc: "Completa una lección de Blue Team", icon: "IShield", xp: 60 },
  { id: "quiz-perfect", name: "Perfeccionista", desc: "Clava un quiz con 100% de aciertos", icon: "ITarget", xp: 40 },
  { id: "missionary", name: "Misiones al día", desc: "Reclama 5 misiones", icon: "ITarget", xp: 70 },
];

export const DAILIES: MissionDef[] = [
  { id: "d-lesson", label: "Completa 1 lección", metric: "lesson", target: 1, xp: 40, scope: "daily" },
  { id: "d-quiz", label: "Acierta 5 preguntas de quiz", metric: "quizok", target: 5, xp: 30, scope: "daily" },
  { id: "d-flag", label: "Captura 1 flag en un lab", metric: "flag", target: 1, xp: 60, scope: "daily" },
];

export const WEEKLIES: MissionDef[] = [
  { id: "w-lab", label: "Completa 1 laboratorio entero", metric: "lab", target: 1, xp: 150, scope: "weekly" },
  { id: "w-lessons", label: "Completa 3 lecciones esta semana", metric: "lesson", target: 3, xp: 90, scope: "weekly" },
];

export const ONBOARDING_QS = [
  {
    q: "¿Qué significa la sigla CIA en ciberseguridad?",
    opts: ["Confidencialidad, Integridad y Disponibilidad", "Control, Inspección y Análisis", "Cifrado, Identidad y Acceso", "Comando, Interface y Aplicación"],
    a: 0,
  },
  {
    q: "¿Cuál de estas es una dirección IPv4 válida?",
    opts: ["192.168.1.25", "999.168.1.1", "192.168.1", "AB12::FF"],
    a: 0,
  },
  {
    q: "El comando `ls` en Linux sirve para…",
    opts: ["Listar archivos de un directorio", "Borrar archivos", "Apagar el sistema", "Crear un usuario"],
    a: 0,
  },
  {
    q: "¿Qué protocolo traduce nombres de dominio a direcciones IP?",
    opts: ["DNS", "HTTP", "FTP", "SSH"],
    a: 0,
  },
  {
    q: "Un hacker ético trabaja…",
    opts: ["Con autorización del propietario del sistema", "Sin pedir permiso pero con buena intención", "Solo de noche", "Únicamente en Linux"],
    a: 0,
  },
  {
    q: "¿Qué es una flag (CTF)?",
    opts: ["Una cadena secreta que demuestra que resolviste un reto", "Un tipo de virus", "Una bandera de país", "Un comando de red"],
    a: 0,
  },
];

export const PROFILES = [
  { key: "novato", name: "Novato", start: 1, msg: "Empezarás desde cero: construirás una base sólida antes de tocar la terminal." },
  { key: "explorador", name: "Explorador", start: 2, msg: "Ya conoces lo básico. Convalidamos Fundamentos y arrancas en Redes." },
  { key: "analista", name: "Analista", start: 3, msg: "Nivel avanzado detectado: tu ruta comienza directo en Programación y Seguridad Web." },
];

export interface SeedUser { name: string; xp: number; week: number; labs: number; flags: number }
export const LEADER_SEED: SeedUser[] = [
  { name: "zer0cool", xp: 5230, week: 420, labs: 5, flags: 13 },
  { name: "n3bula", xp: 4710, week: 380, labs: 5, flags: 12 },
  { name: "phantom_dev", xp: 4105, week: 290, labs: 4, flags: 11 },
  { name: "r00tina", xp: 3480, week: 350, labs: 4, flags: 9 },
  { name: "kernel_panic", xp: 2960, week: 210, labs: 3, flags: 8 },
  { name: "byt3storm", xp: 2450, week: 260, labs: 3, flags: 7 },
  { name: "l4mbda", xp: 1980, week: 150, labs: 2, flags: 6 },
  { name: "sh4dowfax", xp: 1560, week: 120, labs: 2, flags: 5 },
  { name: "crypt0nia", xp: 1140, week: 175, labs: 1, flags: 4 },
  { name: "gl1tch", xp: 830, week: 90, labs: 1, flags: 3 },
  { name: "pingüino", xp: 520, week: 60, labs: 1, flags: 2 },
  { name: "n00bslayer", xp: 240, week: 45, labs: 0, flags: 1 },
];

export const ROUTE_NODES = [
  { level: "n1", label: "Fundamentos" },
  { level: "n1b", label: "Linux" },
  { level: "n2", label: "Redes" },
  { level: "n3", label: "Python" },
  { level: "n4", label: "Web" },
  { level: "n5", label: "Pentesting" },
  { level: "n6", label: "Blue Team" },
];

export const LEVEL_COLORS: Record<string, string> = {
  n1: "#4cc3ef",
  n2: "#22cf7d",
  n3: "#b18cff",
  n4: "#ffb454",
  n5: "#ff7b72",
  n6: "#7fd9f6",
};
