export type Role = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  pass: string; // demo: base64 — en producción: bcrypt/argon2 (ver backend/)
  role: Role;
  color: number;
  banned?: boolean;
  createdAt: number;
}

export interface QuizQ {
  q: string;
  opts: string[];
  a: number;
  why: string;
}

export type Block =
  | { k: "h"; t: string }
  | { k: "p"; t: string }
  | { k: "code"; lang: string; t: string }
  | { k: "tip"; t: string }
  | { k: "list"; items: string[] };

export interface CodeExercise {
  lang: "javascript" | "python" | "bash" | "sql";
  prompt: string;
  starter: string;
  expected: string;
  hint: string;
}

export interface Lesson {
  id: string;
  title: string;
  min: number;
  xp: number;
  sum: string;
  body: Block[];
  quiz: QuizQ[];
  exercise?: CodeExercise;
}

export interface Level {
  id: string;
  num: number;
  title: string;
  tag: string;
  color: string;
  desc: string;
  icon: string;
  published: boolean;
  lessons: Lesson[];
}

export interface FlagDef {
  id: string;
  value: string;
  pts: number;
  where: string;
}

export interface HttpRoute {
  method: "GET" | "POST";
  path: string;
  needHeader?: [string, string];
  needBody?: string;
  status: number;
  body: string;
}

export interface FsNode {
  type: "dir" | "file";
  content?: string;
  hidden?: boolean;
  children?: Record<string, FsNode>;
}

export interface Lab {
  id: string;
  name: string;
  difficulty: "Fácil" | "Media" | "Difícil" | "Insana";
  pts: number;
  color: string;
  icon: string;
  story: string;
  objective: string[];
  targetIp: string;
  ports: { port: number; svc: string; note?: string }[];
  fs: FsNode;
  http: HttpRoute[];
  flags: FlagDef[];
  hints: string[];
  solution: { step: string; detail: string }[];
  skills: string[];
  published: boolean;
}

export type ActivityType =
  | "lesson"
  | "quizok"
  | "flag"
  | "lab"
  | "code"
  | "mission"
  | "bonus";

export interface Activity {
  ts: number;
  xp: number;
  type: ActivityType;
  label: string;
}

export interface Notif {
  id: string;
  icon: string;
  title: string;
  body: string;
  ts: number;
  read: boolean;
}

export interface OnboardingResult {
  score: number;
  profile: string;
  startLevel: number;
  ts: number;
}

export interface Progress {
  xp: number;
  activity: Activity[];
  lessonsDone: string[];
  quiz: Record<string, number>;
  flags: string[]; // `${labId}:${flagId}`
  labsDone: string[];
  ach: string[];
  missionsClaimed: string[];
  codeRuns: number;
  streak: number;
  lastDay: string;
  notifs: Notif[];
  onboarding?: OnboardingResult;
}

export interface AppState {
  users: User[];
  session: string | null;
  levels: Level[];
  labs: Lab[];
  progress: Record<string, Progress>;
}

export interface RankInfo {
  name: string;
  min: number;
  color: string;
}

export interface AchDef {
  id: string;
  name: string;
  desc: string;
  icon: string;
  xp: number;
}

export interface MissionDef {
  id: string;
  label: string;
  metric: ActivityType;
  target: number;
  xp: number;
  scope: "daily" | "weekly";
}
