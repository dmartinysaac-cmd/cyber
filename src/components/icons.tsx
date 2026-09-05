import React from "react";

type P = React.SVGProps<SVGSVGElement> & { size?: number };

const I = ({ size = 18, children, ...rest }: P & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...rest}
  >
    {children}
  </svg>
);

export const ILogo = (p: P) => (
  <I {...p} strokeWidth={2}>
    <path d="M12 2.5 20.5 6v6.2c0 5-3.6 8.6-8.5 10.3-4.9-1.7-8.5-5.3-8.5-10.3V6z" />
    <path d="M8.5 10l3 3-3 3M13.5 16h3" />
  </I>
);
export const IDash = (p: P) => (
  <I {...p}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></I>
);
export const IBook = (p: P) => (
  <I {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 20.5V5.5M20 18v3H6.5" /><path d="M8 7h8M8 10.5h5" /></I>
);
export const IFlask = (p: P) => (
  <I {...p}><path d="M9.5 3h5M10.5 3v5.2L5 18.5A1.8 1.8 0 0 0 6.6 21h10.8a1.8 1.8 0 0 0 1.6-2.5L13.5 8.2V3" /><path d="M7.5 15h9" /></I>
);
export const ITrophy = (p: P) => (
  <I {...p}><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10" /><path d="M12 14v3.5M8.5 21h7M9.5 17.5h5v3.5h-5z" /></I>
);
export const IMedal = (p: P) => (
  <I {...p}><circle cx="12" cy="14.5" r="5" /><path d="M12 12.2l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2-1.45-1.4 2-.3zM8.5 10 5 3h4l3 6M15.5 10 19 3h-4l-3 6" /></I>
);
export const ITarget = (p: P) => (
  <I {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></I>
);
export const IUser = (p: P) => (
  <I {...p}><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" /></I>
);
export const IMap = (p: P) => (
  <I {...p}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z" /><path d="M9 4v14M15 6v14" /></I>
);
export const IShield = (p: P) => (
  <I {...p}><path d="M12 2.5 20.5 6v6.2c0 5-3.6 8.6-8.5 10.3-4.9-1.7-8.5-5.3-8.5-10.3V6z" /><path d="M12 8v5M9.5 10.5h5" /></I>
);
export const ICode = (p: P) => (
  <I {...p}><path d="M8 6 3 12l5 6M16 6l5 6-5 6M13.5 4l-3 16" /></I>
);
export const ISearch = (p: P) => (
  <I {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.8-3.8" /></I>
);
export const IBell = (p: P) => (
  <I {...p}><path d="M6 9.5a6 6 0 0 1 12 0c0 5 1.8 6 1.8 6H4.2S6 14.5 6 9.5" /><path d="M10 19a2.2 2.2 0 0 0 4 0" /></I>
);
export const ILogout = (p: P) => (
  <I {...p}><path d="M14 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" /><path d="M17 8.5 20.5 12 17 15.5M9.5 12h11" /></I>
);
export const IMenu = (p: P) => (<I {...p}><path d="M4 7h16M4 12h16M4 17h10" /></I>);
export const IX = (p: P) => (<I {...p}><path d="M6 6l12 12M18 6 6 18" /></I>);
export const IFlag = (p: P) => (
  <I {...p}><path d="M5 21V4" /><path d="M5 4c4-2.2 7 2 11 0v8c-4 2.2-7-2-11 0" /></I>
);
export const ITerm = (p: P) => (
  <I {...p}><rect x="2.5" y="4" width="19" height="16" rx="2" /><path d="M6.5 9l3.5 3-3.5 3M12.5 15.5h5" /></I>
);
export const ILock = (p: P) => (
  <I {...p}><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7M12 14.5v2.5" /></I>
);
export const ICheck = (p: P) => (<I {...p}><path d="M4.5 12.5 10 18 19.5 6.5" /></I>);
export const IChevR = (p: P) => (<I {...p}><path d="m9 5 7 7-7 7" /></I>);
export const IChevD = (p: P) => (<I {...p}><path d="m5 9 7 7 7-7" /></I>);
export const IBolt = (p: P) => (<I {...p}><path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z" /></I>);
export const IFlame = (p: P) => (
  <I {...p}><path d="M12 21.5c4 0 6.5-2.6 6.5-6.2 0-2.5-1.3-4.4-2.7-6C14.4 7.6 13.5 5.5 13.5 3c-3 2-4.2 4.7-4 7.4-.8-.4-1.5-1.2-1.8-2.4-1.4 1.5-2.2 3.5-2.2 5.6 0 4.5 2.5 7.9 6.5 7.9z" /><path d="M12 21.5c-1.8 0-3-1.5-3-3.2 0-1.6 1.2-2.6 3-4.3 1.8 1.7 3 2.7 3 4.3 0 1.7-1.2 3.2-3 3.2z" /></I>
);
export const IClock = (p: P) => (<I {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></I>);
export const IPlay = (p: P) => (<I {...p}><path d="M7 4.5v15l12-7.5z" /></I>);
export const IEye = (p: P) => (
  <I {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></I>
);
export const IEdit = (p: P) => (
  <I {...p}><path d="M14.5 5 19 9.5 8.5 20H4v-4.5z" /><path d="m12.5 7 4.5 4.5M17 3l4 4" /></I>
);
export const IPlus = (p: P) => (<I {...p}><path d="M12 5v14M5 12h14" /></I>);
export const ITrash = (p: P) => (
  <I {...p}><path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5" /></I>
);
export const IBan = (p: P) => (<I {...p}><circle cx="12" cy="12" r="9" /><path d="M5.7 5.7l12.6 12.6" /></I>);
export const IArrowR = (p: P) => (<I {...p}><path d="M4 12h15M13 6l6 6-6 6" /></I>);
export const IGlobe = (p: P) => (
  <I {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.8 2.6 4 5.6 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.6-4-9s1.2-6.4 4-9z" /></I>
);
export const ICpu = (p: P) => (
  <I {...p}><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="10" y="10" width="4" height="4" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></I>
);
export const IServer = (p: P) => (
  <I {...p}><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01M11 7.5h2M11 16.5h2" /></I>
);
export const IBug = (p: P) => (
  <I {...p}><path d="M9 7.5a3 3 0 0 1 6 0V9H9zM8 9h8l1 3v3.5a5 5 0 0 1-10 0V12z" /><path d="M12 9v11.5M8.5 12H4M8.5 16.5 5 19M20 12h-4.5M15.5 16.5 19 19M9 6 6.5 3.5M15 6l2.5-2.5" /></I>
);
export const IRadar = (p: P) => (
  <I {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><path d="M12 12 18 6M12 12h.01" /></I>
);
export const IFile = (p: P) => (
  <I {...p}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9.5 12h5M9.5 15.5h5" /></I>
);
export const IAward = (p: P) => (
  <I {...p}><circle cx="12" cy="9" r="5.5" /><path d="m8.7 13.5-1.7 7 5-2.6 5 2.6-1.7-7M12 6.5l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 8.6l2-.3z" /></I>
);
export const IInfo = (p: P) => (<I {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 7.8h.01" /></I>);
export const IAlert = (p: P) => (
  <I {...p}><path d="M12 3.5 22 20H2z" /><path d="M12 10v4.5M12 17.3h.01" /></I>
);
export const IRefresh = (p: P) => (
  <I {...p}><path d="M20 12a8 8 0 1 1-2.34-5.66M20 3.5V8h-4.5" /></I>
);
export const ISend = (p: P) => (<I {...p}><path d="m3.5 11.5 17-7.5-5 17-3.8-6.2z" /><path d="M20.5 4 11.7 14.8" /></I>);
export const IStar = (p: P) => (
  <I {...p}><path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.7-5.3 2.7 1-5.8L3.5 9.7l5.9-.9z" /></I>
);
export const ICrown = (p: P) => (
  <I {...p}><path d="m4 8 4 4 4-6.5L16 12l4-4-1.2 11H5.2z" /><path d="M5.5 21h13" /></I>
);
export const IDb = (p: P) => (
  <I {...p}><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></I>
);
export const IKey = (p: P) => (
  <I {...p}><circle cx="8" cy="14.5" r="4.5" /><path d="m11.5 11.5 8-8M17 6l2.5 2.5M14 9l2 2" /></I>
);
export const INet = (p: P) => (
  <I {...p}><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M10.8 7.2 6.2 15.8M13.2 7.2l4.6 8.6M7.5 18h9" /></I>
);
export const ILayers = (p: P) => (
  <I {...p}><path d="m12 3 9 5-9 5-9-5z" /><path d="m4.5 12.8 7.5 4.2 7.5-4.2M4.5 16.8 12 21l7.5-4.2" /></I>
);
export const IDoc = (p: P) => (
  <I {...p}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><path d="M9 12h6M9 15.5h6M9 8.5h2" /></I>
);
