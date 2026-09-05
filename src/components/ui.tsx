import React, { createContext, useCallback, useContext, useState } from "react";
import { IX, ICheck, IInfo, IAlert } from "./icons";

/* ---------------- Button ---------------- */
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "subtle" | "cyan" | "amber";
  size?: "sm" | "md" | "lg";
};
export function Btn({ variant = "primary", size = "md", className = "", children, ...rest }: BtnProps) {
  const v = {
    primary:
      "bg-mint-500 text-abyss-950 hover:bg-mint-400 active:translate-y-px font-semibold shadow-[0_6px_20px_-8px_rgba(34,207,125,0.55)]",
    cyan: "bg-cy-500 text-abyss-950 hover:bg-cy-400 active:translate-y-px font-semibold shadow-[0_6px_20px_-8px_rgba(37,168,221,0.55)]",
    amber: "bg-amb-400 text-abyss-950 hover:bg-amb-300 active:translate-y-px font-semibold",
    ghost:
      "border border-edge-600 text-fog-200 hover:border-mint-500/60 hover:text-mint-300 hover:bg-mint-900/30",
    subtle: "bg-panel-700 text-fog-200 hover:bg-panel-600 border border-edge-700",
    danger: "bg-coral-500/15 text-coral-300 border border-coral-500/40 hover:bg-coral-500/25",
  }[variant];
  const s = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" }[size];
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-display tracking-wide transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none cursor-pointer ${v} ${s} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------------- Card ---------------- */
export function Card({
  className = "",
  glow,
  children,
  onClick,
  style,
}: {
  className?: string;
  glow?: string;
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`rounded-xl border border-edge-700 bg-panel-900/80 backdrop-blur-sm ${
        glow ? `hover:border-[${glow}]` : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------- Chip ---------------- */
export function Chip({ color = "#8aa1b8", children, className = "" }: { color?: string; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold font-display tracking-wider uppercase ${className}`}
      style={{ color, background: `${color}1a`, border: `1px solid ${color}40` }}
    >
      {children}
    </span>
  );
}

/* ---------------- Progress bar ---------------- */
export function Bar({ pct, color = "#22cf7d", h = 6, className = "" }: { pct: number; color?: string; h?: number; className?: string }) {
  return (
    <div className={`w-full rounded-full bg-abyss-800 border border-edge-800 overflow-hidden ${className}`} style={{ height: h }}>
      <div className="bar-fill h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, pct))}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
    </div>
  );
}

/* ---------------- Ring ---------------- */
export function Ring({ pct, size = 92, color = "#22cf7d", label, sub }: { pct: number; size?: number; color?: string; label?: string; sub?: string }) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#1d2b3d" strokeWidth="7" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(100, pct)) / 100}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(.2,.7,.2,1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display font-bold text-fog-100" style={{ fontSize: size / 4.6 }}>{label ?? `${Math.round(pct)}%`}</div>
        {sub && <div className="text-[10px] text-mist-400 uppercase tracking-wider">{sub}</div>}
      </div>
    </div>
  );
}

/* ---------------- Modal ---------------- */
export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-abyss-950/80 backdrop-blur-sm a-fade-in" onClick={onClose} />
      <div className={`relative a-pop w-full ${wide ? "max-w-3xl" : "max-w-lg"} max-h-[88vh] overflow-y-auto rounded-xl border border-edge-600 bg-panel-800 shadow-2xl shadow-black/60`}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-edge-700 bg-panel-800/95 px-5 py-3.5 backdrop-blur">
          <h3 className="font-display font-bold text-fog-100 tracking-wide">{title}</h3>
          <button onClick={onClose} className="rounded-md p-1.5 text-mist-400 hover:bg-panel-600 hover:text-fog-100 transition-colors cursor-pointer">
            <IX size={17} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ---------------- Toasts ---------------- */
export interface Toast { id: number; kind: "ok" | "err" | "info" | "xp"; title: string; body?: string }
const ToastCtx = createContext<(t: Omit<Toast, "id">) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((x) => [...x.slice(-3), { ...t, id }]);
    setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), 4200);
  }, []);
  const meta = {
    ok: { icon: <ICheck size={16} />, c: "#22cf7d" },
    err: { icon: <IAlert size={16} />, c: "#f0555c" },
    info: { icon: <IInfo size={16} />, c: "#4cc3ef" },
    xp: { icon: <IInfo size={16} />, c: "#ffb454" },
  };
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[min(92vw,340px)]">
        {toasts.map((t) => (
          <div key={t.id} className="a-pop flex items-start gap-3 rounded-lg border bg-panel-800/95 backdrop-blur px-4 py-3 shadow-xl shadow-black/50" style={{ borderColor: `${meta[t.kind].c}55` }}>
            <span className="mt-0.5 shrink-0" style={{ color: meta[t.kind].c }}>{meta[t.kind].icon}</span>
            <div className="min-w-0">
              <div className="font-display text-sm font-semibold text-fog-100">{t.title}</div>
              {t.body && <div className="text-xs text-mist-400 mt-0.5 leading-relaxed">{t.body}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------------- misc ---------------- */
export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-edge-600 bg-panel-700 px-1.5 py-0.5 font-mono text-[11px] text-fog-300">{children}</kbd>;
}

export function Empty({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="mb-3 text-dim-600">{icon}</div>
      <div className="font-display font-semibold text-fog-200">{title}</div>
      <div className="mt-1 max-w-sm text-sm text-mist-400">{body}</div>
    </div>
  );
}

export function SectionTitle({ kicker, title, right }: { kicker: string; title: string; right?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-mint-500">{kicker}</div>
        <h2 className="font-display text-xl font-bold text-fog-100 tracking-wide sm:text-2xl">{title}</h2>
      </div>
      {right}
    </div>
  );
}
