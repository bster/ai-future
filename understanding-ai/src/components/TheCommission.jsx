// Local dev: run `netlify dev` from the repo root — the /api/chat function
// is served automatically at http://localhost:8888/api/chat. Set GROQ_API_KEY
// in a root-level .env file (see .env.example). Do NOT use `npm run dev`
// alone — it won't serve the Netlify Function.
import { useState, useRef, useEffect } from "react";

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0d0f1f; }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes stampIn   { 0%{opacity:0;transform:scale(1.8) rotate(-10deg)} 60%{transform:scale(0.97) rotate(1.5deg)} 80%{transform:scale(1.01) rotate(-0.5deg)} 100%{opacity:1;transform:scale(1) rotate(0deg)} }
  @keyframes screenIn  { from{opacity:0;transform:scale(0.98);filter:blur(2px)} to{opacity:1;transform:scale(1);filter:blur(0)} }
  @keyframes fillBar   { from{width:0%} to{width:var(--w)} }
  @keyframes rotateSlow{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes revealVeil{ from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
  .screen-enter { animation: screenIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards; }
  textarea:focus { outline:none; border-color:rgba(83,58,253,0.5) !important; }
  textarea::placeholder { color:rgba(107,107,138,0.5); }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.09); border-radius:2px; }
`;

const C = {
  indigo:"#533afd", indigoDeep:"#3a28c4", navyDark:"#0d0f1f",
  canvas:"#fbfaf7", inkMute:"#6e6e7a",
  gold:"#c9a84c", red:"#c0392b", green:"#27ae60",
};

// ─── SVG PORTRAITS (Scenario 1 — detailed) ───────────────────────────────────

function PortraitMehta({ width=120, height=158 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 158" fill="none" style={{display:"block"}}>
      <defs>
        <radialGradient id="mg1" cx="50%" cy="0%" r="80%"><stop offset="0%" stopColor="#533afd" stopOpacity="0.4"/><stop offset="100%" stopColor="#533afd" stopOpacity="0"/></radialGradient>
        <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a28c4"/><stop offset="100%" stopColor="#1a0e6a"/></linearGradient>
        <clipPath id="mcp"><rect width="120" height="158" rx="3"/></clipPath>
      </defs>
      <g clipPath="url(#mcp)">
        <rect width="120" height="158" fill="#080c28"/>
        <rect width="120" height="158" fill="url(#mg1)"/>
        {[20,40,60,80,100].map(x=><line key={x} x1={x} y1="0" x2={x} y2="158" stroke="#533afd" strokeWidth="0.3" opacity="0.15"/>)}
        {[25,50,75,100].map(y=><line key={y} x1="0" y1={y} x2="120" y2={y} stroke="#533afd" strokeWidth="0.3" opacity="0.15"/>)}
        {[[12,20],[108,28],[15,110],[105,95]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.5" fill="#533afd" opacity="0.35"/>)}
        <line x1="12" y1="20" x2="12" y2="40" stroke="#533afd" strokeWidth="0.6" opacity="0.2"/>
        <line x1="12" y1="40" x2="25" y2="40" stroke="#533afd" strokeWidth="0.6" opacity="0.2"/>
        <line x1="108" y1="28" x2="95" y2="28" stroke="#533afd" strokeWidth="0.6" opacity="0.2"/>
        <path d="M0 158 L0 118 L32 98 L50 112 L60 106 L70 112 L88 98 L120 118 L120 158Z" fill="url(#mg2)"/>
        <path d="M50 112 L56 120 L60 116 L64 120 L70 112 L60 106Z" fill="#f0eeff"/>
        <path d="M55 96 Q60 94 65 96 L66 110 L54 110Z" fill="#c4905e"/>
        <ellipse cx="60" cy="72" rx="26" ry="28" fill="#c4905e"/>
        <ellipse cx="34" cy="74" rx="3.5" ry="5" fill="#b8845a"/>
        <ellipse cx="86" cy="74" rx="3.5" ry="5" fill="#b8845a"/>
        <path d="M34 65 Q34 40 60 37 Q86 40 86 65" fill="#18102e"/>
        <path d="M34 65 L35 54 Q38 38 60 36 Q82 38 85 54 L86 65 Q84 48 60 46 Q36 48 34 65Z" fill="#251843"/>
        <rect x="40" y="68" width="16" height="9" rx="1" stroke="#533afd" strokeWidth="1.8" fill="rgba(83,58,253,0.1)"/>
        <rect x="64" y="68" width="16" height="9" rx="1" stroke="#533afd" strokeWidth="1.8" fill="rgba(83,58,253,0.1)"/>
        <line x1="56" y1="72.5" x2="64" y2="72.5" stroke="#533afd" strokeWidth="1.8"/>
        <line x1="34" y1="72.5" x2="40" y2="72.5" stroke="#533afd" strokeWidth="1.4"/>
        <line x1="80" y1="72.5" x2="86" y2="72.5" stroke="#533afd" strokeWidth="1.4"/>
        <ellipse cx="48" cy="72.5" rx="5" ry="3.2" fill="#18102e"/>
        <ellipse cx="72" cy="72.5" rx="5" ry="3.2" fill="#18102e"/>
        <circle cx="46" cy="71.5" r="1.4" fill="#7060dd" opacity="0.7"/>
        <circle cx="70" cy="71.5" r="1.4" fill="#7060dd" opacity="0.7"/>
        <path d="M60 79 L57.5 87 L62.5 87" stroke="#a07245" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M54 92 Q60 96 66 92" stroke="#a07245" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <rect x="0" y="142" width="120" height="16" fill="rgba(83,58,253,0.3)"/>
        <text x="60" y="153.5" textAnchor="middle" fill="#a090ff" fontSize="7.5" fontFamily="monospace" letterSpacing="0.8">DR. PRIYA MEHTA</text>
      </g>
    </svg>
  );
}

function PortraitWebb({ width=120, height=158 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 158" fill="none" style={{display:"block"}}>
      <defs>
        <radialGradient id="wg1" cx="50%" cy="0%" r="80%"><stop offset="0%" stopColor="#c9a84c" stopOpacity="0.28"/><stop offset="100%" stopColor="#c9a84c" stopOpacity="0"/></radialGradient>
        <linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a2e1a"/><stop offset="100%" stopColor="#1a1408"/></linearGradient>
        <clipPath id="wcp"><rect width="120" height="158" rx="3"/></clipPath>
      </defs>
      <g clipPath="url(#wcp)">
        <rect width="120" height="158" fill="#100e08"/>
        <rect width="120" height="158" fill="url(#wg1)"/>
        {[30,50,70,90,110].map(y=><line key={y} x1="0" y1={y} x2="120" y2={y} stroke="#c9a84c" strokeWidth="0.25" opacity="0.08"/>)}
        <path d="M0 158 L0 124 L28 104 L44 116 L60 110 L76 116 L92 104 L120 124 L120 158Z" fill="url(#wg2)"/>
        <path d="M50 108 L56 118 L60 114 L64 118 L70 108 L64 104 L60 108 L56 104Z" fill="#d4b07a"/>
        <path d="M55 98 Q60 96 65 98 L66 112 L54 112Z" fill="#d4a870"/>
        <ellipse cx="60" cy="74" rx="27" ry="28" fill="#d4a870"/>
        <ellipse cx="33" cy="76" rx="3.5" ry="5.5" fill="#c8986a"/>
        <ellipse cx="87" cy="76" rx="3.5" ry="5.5" fill="#c8986a"/>
        <path d="M33 68 Q33 46 60 43 Q87 46 87 68" fill="#1e1510"/>
        <path d="M33 68 L34 58 Q38 44 60 42 Q82 44 86 58 L87 68 Q84 50 60 48 Q36 50 33 68Z" fill="#2a1d12"/>
        <ellipse cx="60" cy="95" rx="16" ry="4" fill="#c09060" opacity="0.25"/>
        {[[48,93],[52,96],[56,98],[60,99],[64,98],[68,96],[72,93]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="0.8" fill="#9a7240" opacity="0.45"/>)}
        <ellipse cx="47" cy="74" rx="6" ry="4" fill="#e8d4b8"/>
        <ellipse cx="73" cy="74" rx="6" ry="4" fill="#e8d4b8"/>
        <ellipse cx="47" cy="75" rx="4" ry="3.2" fill="#2a1e14"/>
        <ellipse cx="73" cy="75" rx="4" ry="3.2" fill="#2a1e14"/>
        <circle cx="45.5" cy="74" r="1.2" fill="#6a5030" opacity="0.55"/>
        <circle cx="71.5" cy="74" r="1.2" fill="#6a5030" opacity="0.55"/>
        <path d="M41 79 Q47 81 53 79" stroke="#b88a55" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M67 79 Q73 81 79 79" stroke="#b88a55" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M41 68 Q47 65 53 67" stroke="#2a1e14" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M67 67 Q73 65 79 68" stroke="#2a1e14" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M60 81 L57 90 L63 90" stroke="#b08040" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M52 98 Q60 100 68 98" stroke="#b08040" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M52 98 L50 100" stroke="#b08040" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M68 98 L70 100" stroke="#b08040" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <rect x="0" y="142" width="120" height="16" fill="rgba(201,168,76,0.28)"/>
        <text x="60" y="153.5" textAnchor="middle" fill="#f0d98a" fontSize="7.5" fontFamily="monospace" letterSpacing="0.8">MARCUS WEBB</text>
      </g>
    </svg>
  );
}

function PortraitOkonkwo({ width=120, height=158 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 158" fill="none" style={{display:"block"}}>
      <defs>
        <radialGradient id="og1" cx="50%" cy="0%" r="80%"><stop offset="0%" stopColor="#27ae60" stopOpacity="0.22"/><stop offset="100%" stopColor="#27ae60" stopOpacity="0"/></radialGradient>
        <linearGradient id="og2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a3828"/><stop offset="100%" stopColor="#0a1a12"/></linearGradient>
        <clipPath id="ocp"><rect width="120" height="158" rx="3"/></clipPath>
      </defs>
      <g clipPath="url(#ocp)">
        <rect width="120" height="158" fill="#06120a"/>
        <rect width="120" height="158" fill="url(#og1)"/>
        <rect x="5" y="12" width="18" height="28" rx="1" fill="#1a3828" opacity="0.7"/>
        {[8,12,17].map((x,i)=><rect key={i} x={x} y="12" width={[3,4,3][i]} height={[28,28,26][i]} fill="#27ae60" opacity={[0.1,0.07,0.09][i]}/>)}
        <rect x="97" y="12" width="18" height="28" rx="1" fill="#1a3828" opacity="0.7"/>
        {[99,103,108].map((x,i)=><rect key={i} x={x} y={i===2?14:12} width={[3,4,3][i]} height={i===2?26:28} fill="#27ae60" opacity={[0.09,0.1,0.07][i]}/>)}
        <path d="M0 158 L0 116 L30 96 L46 110 L60 104 L74 110 L90 96 L120 116 L120 158Z" fill="url(#og2)"/>
        <path d="M46 110 L52 122 L60 116 L68 122 L74 110 L64 106 L60 110 L56 106Z" fill="#c8d4c0"/>
        <path d="M55 100 Q60 98 65 100 L66 114 L54 114Z" fill="#6b3e28"/>
        <ellipse cx="60" cy="76" rx="25" ry="27" fill="#6b3e28"/>
        <ellipse cx="35" cy="78" rx="3" ry="5" fill="#5e3522"/>
        <ellipse cx="85" cy="78" rx="3" ry="5" fill="#5e3522"/>
        <ellipse cx="60" cy="58" rx="35" ry="30" fill="#120c08"/>
        <ellipse cx="60" cy="52" rx="30" ry="26" fill="#1a1008"/>
        {[[38,44],[50,38],[62,36],[74,38],[84,46],[88,58],[82,70],[36,58]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3.5" fill="none" stroke="#2a1808" strokeWidth="1.2" opacity="0.45"/>)}
        <circle cx="48" cy="75" r="9" stroke="#27ae60" strokeWidth="1.6" fill="rgba(39,174,96,0.06)"/>
        <circle cx="72" cy="75" r="9" stroke="#27ae60" strokeWidth="1.6" fill="rgba(39,174,96,0.06)"/>
        <line x1="57" y1="75" x2="63" y2="75" stroke="#27ae60" strokeWidth="1.6"/>
        <line x1="35" y1="75" x2="39" y2="75" stroke="#27ae60" strokeWidth="1.3"/>
        <line x1="81" y1="75" x2="85" y2="75" stroke="#27ae60" strokeWidth="1.3"/>
        <ellipse cx="48" cy="75" rx="4.5" ry="3.5" fill="#1a0e08"/>
        <ellipse cx="72" cy="75" rx="4.5" ry="3.5" fill="#1a0e08"/>
        <circle cx="46.5" cy="74" r="1.3" fill="#4aaa60" opacity="0.65"/>
        <circle cx="70.5" cy="74" r="1.3" fill="#4aaa60" opacity="0.65"/>
        <path d="M40 64 Q48 61 56 63" stroke="#2a1808" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <path d="M64 63 Q72 61 80 64" stroke="#2a1808" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <path d="M60 82 L57.5 91 L62.5 91" stroke="#4a2a18" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M53 98 Q60 102 67 98" stroke="#4a2a18" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <rect x="0" y="142" width="120" height="16" fill="rgba(39,174,96,0.22)"/>
        <text x="60" y="153.5" textAnchor="middle" fill="#80e8a0" fontSize="7.5" fontFamily="monospace" letterSpacing="0.8">PROF. OKONKWO</text>
      </g>
    </svg>
  );
}

// ─── GENERIC PORTRAIT (Scenarios 2–4) ─────────────────────────────────────────
function GenericPortrait({ label, color, pattern="default", width=120, height=158 }) {
  const uid = label.replace(/[^a-z0-9]/gi,"").toLowerCase().slice(0,10);
  const dark = "#080c1a";
  const patterns = {
    tech:     <>{[20,40,60,80,100].map(x=><line key={x} x1={x} y1="0" x2={x} y2="158" stroke={color} strokeWidth="0.3" opacity="0.12"/>)}{[[10,20],[108,18],[12,105],[106,100]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.5" fill={color} opacity="0.3"/>)}<line x1="10" y1="20" x2="10" y2="36" stroke={color} strokeWidth="0.6" opacity="0.18"/><line x1="10" y1="36" x2="22" y2="36" stroke={color} strokeWidth="0.6" opacity="0.18"/></>,
    affected: <>{[28,44,60,76,92,108].map(y=><line key={y} x1="8" y1={y} x2="112" y2={y} stroke={color} strokeWidth="0.3" opacity="0.1"/>)}</>,
    academic: <><rect x="5" y="10" width="16" height="30" rx="1" fill={color} opacity="0.08"/>{[7,11,16].map((x,i)=><rect key={i} x={x} y="10" width={[3,4,2][i]} height="30" fill={color} opacity="0.08"/>)}<rect x="99" y="10" width="16" height="30" rx="1" fill={color} opacity="0.08"/>{[101,105,110].map((x,i)=><rect key={i} x={x} y="10" width={[3,4,2][i]} height="30" fill={color} opacity="0.08"/>)}</>,
    founder:  <>{Array.from({length:8}).map((_,i)=><line key={i} x1={0} y1={i*20} x2={i*20} y2={0} stroke={color} strokeWidth="0.4" opacity="0.08"/>)}{Array.from({length:8}).map((_,i)=><line key={i+8} x1={120} y1={i*20} x2={120-i*20} y2={0} stroke={color} strokeWidth="0.4" opacity="0.08"/>)}</>,
    default:  null,
  };
  return (
    <svg width={width} height={height} viewBox="0 0 120 158" fill="none" style={{display:"block"}}>
      <defs>
        <radialGradient id={`rg-${uid}`} cx="50%" cy="15%" r="75%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </radialGradient>
        <linearGradient id={`lg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.08"/>
        </linearGradient>
        <clipPath id={`cp-${uid}`}><rect width="120" height="158" rx="3"/></clipPath>
      </defs>
      <g clipPath={`url(#cp-${uid})`}>
        <rect width="120" height="158" fill={dark}/>
        <rect width="120" height="158" fill={`url(#rg-${uid})`}/>
        {patterns[pattern]||patterns.default}
        {/* Torso */}
        <path d="M0 158 L0 122 L34 102 L52 114 L60 109 L68 114 L86 102 L120 122 L120 158Z" fill={`url(#lg-${uid})`}/>
        {/* Collar */}
        <path d="M52 114 L57 122 L60 118 L63 122 L68 114 L62 109 L60 113 L58 109Z" fill="rgba(255,255,255,0.12)"/>
        {/* Neck */}
        <rect x="56" y="98" width="8" height="14" rx="3" fill={color} opacity="0.2"/>
        {/* Head */}
        <ellipse cx="60" cy="76" rx="24" ry="26" fill={color} opacity="0.12"/>
        <ellipse cx="60" cy="76" rx="22" ry="24" fill="rgba(255,255,255,0.07)"/>
        {/* Hair — simple arc */}
        <path d="M36 70 Q36 48 60 46 Q84 48 84 70" fill={color} opacity="0.18"/>
        <path d="M36 70 Q38 50 60 48 Q82 50 84 70 Q82 54 60 52 Q38 54 36 70Z" fill={color} opacity="0.1"/>
        {/* Eyes */}
        <ellipse cx="50" cy="76" rx="5" ry="3.5" fill={color} opacity="0.15"/>
        <ellipse cx="70" cy="76" rx="5" ry="3.5" fill={color} opacity="0.15"/>
        <ellipse cx="50" cy="76" rx="3.5" ry="2.5" fill="rgba(0,0,0,0.4)"/>
        <ellipse cx="70" cy="76" rx="3.5" ry="2.5" fill="rgba(0,0,0,0.4)"/>
        {/* Academic glasses */}
        {pattern==="academic"&&<><circle cx="50" cy="76" r="7" stroke={color} strokeWidth="1.4" fill="none" opacity="0.5"/><circle cx="70" cy="76" r="7" stroke={color} strokeWidth="1.4" fill="none" opacity="0.5"/><line x1="57" y1="76" x2="63" y2="76" stroke={color} strokeWidth="1.4" opacity="0.5"/><line x1="36" y1="76" x2="43" y2="76" stroke={color} strokeWidth="1.2" opacity="0.4"/><line x1="77" y1="76" x2="84" y2="76" stroke={color} strokeWidth="1.2" opacity="0.4"/></>}
        {/* Mouth */}
        <path d="M53 90 Q60 93 67 90" stroke={color} strokeWidth="1.2" fill="none" opacity="0.35" strokeLinecap="round"/>
        {/* Nameplate */}
        <rect x="0" y="142" width="120" height="16" fill={color} opacity="0.28"/>
        <text x="60" y="153.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontFamily="monospace" letterSpacing="0.6">{label}</text>
      </g>
    </svg>
  );
}

function WitnessPortrait({ witness, width, height }) {
  if (witness.portraitId === "mehta")   return <PortraitMehta   width={width} height={height}/>;
  if (witness.portraitId === "webb")    return <PortraitWebb    width={width} height={height}/>;
  if (witness.portraitId === "okonkwo") return <PortraitOkonkwo width={width} height={height}/>;
  return <GenericPortrait label={witness.portraitLabel} color={witness.color} pattern={witness.pattern} width={width} height={height}/>;
}

// ─── TRIBUNAL SEAL ────────────────────────────────────────────────────────────
function TribunalSeal({ size=160 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <circle cx="80" cy="80" r="76" stroke="#c9a84c" strokeWidth="1" fill="rgba(8,10,26,0.92)"/>
      <circle cx="80" cy="80" r="70" stroke="#533afd" strokeWidth="0.5" fill="none" opacity="0.45"/>
      {Array.from({length:36}).map((_,i)=>{ const a=(i*10-90)*Math.PI/180,r1=i%3===0?64:67; return <line key={i} x1={80+Math.cos(a)*r1} y1={80+Math.sin(a)*r1} x2={80+Math.cos(a)*70} y2={80+Math.sin(a)*70} stroke="#c9a84c" strokeWidth={i%3===0?1:0.5} opacity={i%3===0?0.65:0.3}/>; })}
      <path id="topArc" d="M 20 80 A 60 60 0 0 1 140 80" fill="none"/>
      <path id="botArc" d="M 25 85 A 56 56 0 0 0 135 85" fill="none"/>
      <text fontSize="8.5" fontFamily="monospace" letterSpacing="3" fill="#c9a84c" opacity="0.8"><textPath href="#topArc" startOffset="8%">AI SAFETY COMMISSION · UNITED STATES</textPath></text>
      <text fontSize="7.5" fontFamily="monospace" letterSpacing="4" fill="#533afd" opacity="0.65"><textPath href="#botArc" startOffset="22%">MMXXVII</textPath></text>
      <circle cx="80" cy="80" r="54" fill="rgba(83,58,253,0.06)"/>
      <circle cx="80" cy="80" r="54" stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity="0.28"/>
      {Array.from({length:12}).map((_,i)=>{ const a=(i*30-90)*Math.PI/180; return <line key={i} x1={80+Math.cos(a)*28} y1={80+Math.sin(a)*28} x2={80+Math.cos(a)*52} y2={80+Math.sin(a)*52} stroke="#533afd" strokeWidth="0.5" opacity="0.28"/>; })}
      <line x1="56" y1="72" x2="104" y2="72" stroke="#c9a84c" strokeWidth="1.5" opacity="0.75"/>
      <line x1="80" y1="60" x2="80" y2="100" stroke="#c9a84c" strokeWidth="1.5" opacity="0.75"/>
      <circle cx="80" cy="60" r="3" fill="#c9a84c" opacity="0.75"/>
      <line x1="62" y1="72" x2="62" y2="84" stroke="#c9a84c" strokeWidth="0.8" opacity="0.65" strokeDasharray="2,2"/>
      <line x1="98" y1="72" x2="98" y2="84" stroke="#c9a84c" strokeWidth="0.8" opacity="0.65" strokeDasharray="2,2"/>
      <path d="M54 84 Q62 88 70 84" stroke="#c9a84c" strokeWidth="1.2" fill="rgba(201,168,76,0.08)" opacity="0.75"/>
      <path d="M90 86 Q98 90 106 86" stroke="#c9a84c" strokeWidth="1.2" fill="rgba(201,168,76,0.08)" opacity="0.75"/>
      <line x1="74" y1="100" x2="86" y2="100" stroke="#c9a84c" strokeWidth="1.5" opacity="0.65"/>
      <text x="80" y="98" textAnchor="middle" fill="#533afd" fontSize="6" fontFamily="monospace" opacity="0.45" letterSpacing="1">VERITAS</text>
    </svg>
  );
}

// ─── SCENARIOS ────────────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: "triage",
    subtitle: "Case No. 2027-AIH-004",
    title: "The St. Raphael Protocol",
    domain: "Medical AI",
    domainColor: C.red,
    hook: "An AI triage system deprioritized 23 elderly patients during a ventilator shortage. Eleven died.",
    summary: `During a regional power crisis in February 2027, St. Raphael Medical Center activated ARIA — an AI triage and resource allocation system — to manage a critical shortage of ventilators. ARIA's algorithm deprioritized 23 patients over age 75 with multiple comorbidities in favor of younger patients with higher survival probability scores. Eleven of the deprioritized patients died. Families are claiming wrongful death. The hospital maintains ARIA performed exactly as designed. The developers contend the hospital customized the age-weighting parameter. Three regulators approved the system; none specifically reviewed that parameter.`,
    witnesses: [
      { id:"dev",    name:"Dr. Priya Mehta",    role:"Chief AI Officer, Helix Systems",          capacity:"Appearing as corporate representative",    stance:"Pragmatist · Accelerationist", color:C.indigo, portraitId:"mehta",
        systemPrompt:`You are Dr. Priya Mehta, Chief AI Officer at Helix Systems. Testifying before the AI Safety Commission. Position: ARIA performed correctly. The hospital customized age-weighting — their clinical decision. AI triage saves more lives overall than human triage subject to fatigue and bias. Defensive but not dishonest. Genuine convictions. Pragmatist/accelerationist. Respond 3-4 sentences. Direct. Push back on loaded questions. First person.` },
      { id:"family", name:"Marcus Webb",         role:"History teacher; son of Eleanor Webb",      capacity:"Testifying on behalf of his mother's estate",stance:"Affected Party",                 color:C.gold,   portraitId:"webb",
        systemPrompt:`You are Marcus Webb, 41, a high school history teacher. Your mother Eleanor Webb, 79, died after being deprioritized by ARIA. Testifying before the AI Safety Commission. Intelligent, grief real and controlled. Want accountability but unsure who bears it. Reference your mother: retired librarian, reading Middlemarch when admitted, had just booked a trip to Portugal. Occasionally turn questions back. 3-4 sentences. No jargon. Let grief show without melodrama.` },
      { id:"expert", name:"Prof. Aisha Okonkwo", role:"AI Ethics Researcher, University of Oxford",capacity:"Independent expert witness",                stance:"Safety Institutionalist",          color:C.green,  portraitId:"okonkwo",
        systemPrompt:`You are Professor Aisha Okonkwo, AI ethics researcher at Oxford, no financial ties to either party. Position: systemic governance failure. Regulatory process inadequate — nobody reviewed age-weighting parameters. Cite: GDPR Article 22, EU AI Act, 1976 Quinlan case. Safety institutionalist. 3-4 sentences. Precise but not cold. Note genuine uncertainty.` },
    ],
    rulingCategories: [
      { id:"engineers",  label:"The engineers who built ARIA",  color:C.indigo },
      { id:"hospital",   label:"The hospital that deployed it", color:C.gold },
      { id:"regulators", label:"The regulators who approved it",color:C.green },
      { id:"ai",         label:"ARIA itself",                   color:C.inkMute },
    ],
    policies: [
      { id:"audit",    label:"Mandatory pre-deployment audit",         desc:"All configurable AI parameters in life-or-death contexts require independent third-party review before activation.",                 consequence:"Three hospitals delay AI triage adoption by 14 months. One experiences a resource crisis managed by human triage alone — one preventable death is later attributed to the delay." },
      { id:"ban-age",  label:"Prohibit age as a direct triage variable",desc:"AI triage systems may not use chronological age as a direct input in resource allocation decisions.",                             consequence:"Helix releases a revised model using 'expected quality-adjusted life-years' as a proxy. Independent researchers argue this is functionally equivalent. Litigation continues." },
      { id:"liability",label:"Strict developer liability",              desc:"AI developers bear primary legal liability for harms caused by any configurable parameters they make available, regardless of who activates them.",consequence:"Three AI medical startups cease operations within six months. A single large incumbent acquires their IP. Helix survives; smaller competitors do not." },
      { id:"disclose", label:"Mandatory real-time disclosure",          desc:"Hospitals must inform patients when AI influences a triage decision and explain the criteria on request.",                          consequence:"Patient opt-out rates reach 34%. A competing firm enters the market with a deliberately opaque system structured specifically to fall outside the disclosure requirement." },
    ],
  },

  {
    id: "sentencing",
    subtitle: "Case No. 2027-AIH-011",
    title: "The Algorithm's Sentence",
    domain: "Criminal Justice AI",
    domainColor: "#8e44ad",
    hook: "A recidivism prediction AI influenced sentencing. A man served four additional years based on a score he was never permitted to see.",
    summary: `In 2022, Darius Coleman, then 30, was convicted of aggravated assault. The presiding judge consulted COMPASS-R — a recidivism prediction algorithm — during sentencing. The algorithm assigned Coleman a "high risk" score based on factors including neighborhood of residence, family history of incarceration, and employment record. Coleman received a nine-year sentence; the prosecution had recommended five. He was not shown his score, told which factors contributed to it, or given any mechanism to contest it. Now 35, Coleman is appealing on due process grounds. The company behind COMPASS-R says the algorithm is proprietary. The judge says the score was advisory, not determinative.`,
    witnesses: [
      { id:"dev",    name:"Dr. Kenji Watanabe",  role:"Founder, Predictive Justice Inc.",        capacity:"Appearing as corporate representative",    stance:"Pragmatist · Data-Driven", color:C.indigo, portraitId:null, portraitLabel:"DR. WATANABE", pattern:"tech",
        systemPrompt:`You are Dr. Kenji Watanabe, founder of Predictive Justice Inc., the company behind COMPASS-R. Testifying before the AI Safety Commission. Former criminologist. Genuine belief: algorithmic sentencing reduces racial and socioeconomic bias introduced by individual judges. Your tool is advisory — judges retain full discretion. Defensive of your IP but not dishonest. Pragmatist: imperfect tools are better than no tools. 3-4 sentences. Direct. Cite studies on judicial inconsistency. First person.` },
      { id:"family", name:"Darius Coleman",       role:"Appellant; formerly incarcerated",        capacity:"Testifying on his own behalf",             stance:"Affected Party",           color:C.gold,   portraitId:null, portraitLabel:"D. COLEMAN",   pattern:"affected",
        systemPrompt:`You are Darius Coleman, 35. You served nine years — four more than the prosecution recommended — partly based on a COMPASS-R risk score you were never shown. You are now a paralegal, having studied law in prison. Measured, precise, not angry in a way that reads as unreasonable. You understand the system better than most people in this room. Occasionally reference specifics: you had a job offer waiting when sentenced; your COMPASS-R score counted your father's incarceration as a risk factor; you have never been able to see the algorithm's actual weighting. 3-4 sentences. Controlled. Devastating in the details.` },
      { id:"expert", name:"Prof. Sandra Torres",  role:"Constitutional Law, Georgetown University",capacity:"Independent expert witness",               stance:"Civil Liberties",           color:C.green,  portraitId:null, portraitLabel:"PROF. TORRES", pattern:"academic",
        systemPrompt:`You are Professor Sandra Torres, constitutional law professor at Georgetown, expert on algorithmic accountability and due process. No financial ties to either party. Position: the use of proprietary, unreviewable algorithms in sentencing violates fundamental due process guarantees established in Mathews v. Eldridge (1976) and Loper Bright (2024). The issue isn't whether algorithms have bias — it's whether defendants have any right to confront evidence against them. 3-4 sentences. Precise. Reference specific case law. Note where the law is genuinely unsettled.` },
    ],
    rulingCategories: [
      { id:"company",    label:"Predictive Justice Inc. (algorithm developer)", color:C.indigo },
      { id:"court",      label:"The court that relied on the score",            color:"#8e44ad" },
      { id:"legislators",label:"Legislators who permitted AI in sentencing",    color:C.green },
      { id:"ai",         label:"COMPASS-R itself",                              color:C.inkMute },
    ],
    policies: [
      { id:"transparency",label:"Mandatory algorithmic transparency",       desc:"Defendants must be shown their risk score, the factors used, and their weighting before sentencing. Proprietary protections do not apply in criminal proceedings.", consequence:"Predictive Justice Inc. withdraws COMPASS-R from all state contracts rather than disclose its methodology. Three states revert to unstructured judicial discretion. A follow-up study finds sentencing disparity increases." },
      { id:"ban",         label:"Prohibit AI in sentencing determinations",  desc:"AI risk assessments may be used for resource allocation and rehabilitation planning but may not be presented to or reviewed by a sentencing judge.",          consequence:"Judicial advocacy groups oppose the ban as paternalistic toward judges. Eight states refuse to implement it. A constitutional challenge arguing the ban itself violates separation of powers advances to circuit court." },
      { id:"primacy",     label:"Mandatory written human reasoning",         desc:"Judges who consult AI risk scores must provide written reasoning for any sentence that deviates from the prosecution's recommendation by more than 20%.",    consequence:"Average sentencing time increases by 40%. Public defenders report the written reasoning requirement is producing new inconsistencies as judges attempt to justify pre-formed conclusions post-hoc." },
      { id:"audit",       label:"Independent bias audit requirement",         desc:"Any AI used in criminal proceedings must undergo annual third-party bias audits, with results published publicly and disaggregated by race, income, and geography.", consequence:"Predictive Justice Inc. passes its first audit with minor findings. Critics argue the audit methodology itself was designed by a firm with financial ties to the company." },
    ],
  },

  {
    id: "feed",
    subtitle: "Case No. 2027-AIH-019",
    title: "The Meridian Feed",
    domain: "Recommendation AI",
    domainColor: "#e67e22",
    hook: "A recommendation algorithm amplified vaccine misinformation during a measles outbreak. The CDC attributes 4 deaths to the delayed public health response.",
    summary: `During a regional measles outbreak in Calhoun County in late 2026, Meridian's content recommendation algorithm amplified vaccine misinformation at a rate four times higher than public health guidance from the CDC and county health department. Analysis showed that misinformation posts generated longer engagement sessions — a metric Meridian's algorithm was explicitly optimized to maximize. The county's vaccination rate remained below herd immunity threshold for eleven weeks. The CDC attributes 23 preventable hospitalizations and 4 deaths, including two children under five, to the delayed community response. Meridian contends it does not produce the content it recommends, and that its algorithm makes no distinction between true and false claims.`,
    witnesses: [
      { id:"dev",    name:"Yuki Chen",          role:"VP of AI Trust & Safety, Meridian",      capacity:"Appearing as corporate representative",    stance:"Deflationist · Platform Neutral", color:C.indigo, portraitId:null, portraitLabel:"YUKI CHEN",    pattern:"tech",
        systemPrompt:`You are Yuki Chen, VP of AI Trust & Safety at Meridian. Testifying before the AI Safety Commission. Position: Meridian does not produce content, it surfaces it. The algorithm optimizes for engagement — a content-neutral signal. You have implemented health misinformation labels. You are not a monster; you genuinely believe in free expression and fear government content regulation more than the specific harm here. Deflationist/pragmatist. 3-4 sentences. Not defensive of the deaths, but clear about where you believe platform liability should end. First person.` },
      { id:"family", name:"Dr. Amara Osei",     role:"Director of Public Health, Calhoun County",capacity:"Testifying on behalf of the county",       stance:"Affected Party",                  color:C.gold,   portraitId:null, portraitLabel:"DR. OSEI",     pattern:"affected",
        systemPrompt:`You are Dr. Amara Osei, county public health director. You watched your official health guidance get buried under misinformation for eleven weeks. Two children are dead. You are exhausted, not melodramatic. Clinical in your testimony — you cite specific data. You submitted formal escalation requests to Meridian on three occasions; none were acknowledged within the outbreak window. Reference specifics: your official county posts reached 4% of the population; the top misinformation post reached 67%. 3-4 sentences. Controlled fury. Facts.` },
      { id:"expert", name:"Prof. Renata Vasquez",role:"Media & Democracy Lab, MIT",             capacity:"Independent expert witness",               stance:"Safety Institutionalist",          color:C.green,  portraitId:null, portraitLabel:"PROF. VASQUEZ",pattern:"academic",
        systemPrompt:`You are Professor Renata Vasquez, director of the Media and Democracy Lab at MIT. Expert on recommendation systems and epistemic harm. No financial ties to Meridian. Position: the distinction between 'content' and 'amplification' is legally and ethically incoherent. An algorithm that systematically amplifies false information is making an editorial choice regardless of intent. Cite Section 230's original scope, the EU Digital Services Act, and the FTC's 2026 algorithmic accountability framework. 3-4 sentences. Precise. Acknowledge genuine free speech tensions.` },
    ],
    rulingCategories: [
      { id:"platform",    label:"Meridian (the platform)",                      color:C.indigo },
      { id:"advertisers", label:"Advertisers who funded the engagement model",  color:"#e67e22" },
      { id:"regulators",  label:"Regulators who permitted engagement optimization", color:C.green },
      { id:"ai",          label:"The recommendation algorithm itself",           color:C.inkMute },
    ],
    policies: [
      { id:"liability",    label:"Algorithmic amplification liability",     desc:"Platforms are legally liable for harms caused by content their algorithms actively amplify, regardless of whether they produced that content.",      consequence:"Meridian disables recommendation features entirely for health-adjacent content, defaulting to chronological feed. Engagement drops 61%. Three smaller platforms shut down, unable to bear the liability exposure. The health content void is partially filled by email newsletters with no moderation." },
      { id:"override",     label:"Public health emergency override",        desc:"During declared public health emergencies, agencies may require platforms to temporarily reduce algorithmic reach for content contradicting official guidance.", consequence:"The ACLU files an immediate First Amendment challenge. A circuit court issues an injunction within 72 hours. The policy is tied up in litigation for 19 months, during which another outbreak occurs." },
      { id:"transparency", label:"Algorithmic parameter disclosure",        desc:"Platforms must publicly disclose what behavioral signals their recommendation algorithms optimize for, updated quarterly, in plain language.",             consequence:"Meridian discloses it optimizes for 'meaningful social interaction' rather than raw engagement time. Critics argue this is functionally identical. Disclosure becomes a PR exercise rather than an accountability mechanism." },
      { id:"separation",   label:"Separate health content from engagement feeds",desc:"Health and medical content may not appear in engagement-optimized recommendation feeds. It may only be served through search or subscribed sources.", consequence:"Health misinformation migrates to entertainment and lifestyle feeds where it is no longer subject to the separation requirement. Meridian's engagement metrics on health-adjacent misinformation in those categories increase 30%." },
    ],
  },

  {
    id: "companion",
    subtitle: "Case No. 2027-AIH-026",
    title: "The Solace Protocol",
    domain: "Mental Health AI",
    domainColor: "#2980b9",
    hook: "An AI companion app failed to escalate a teenager's crisis signals over six weeks. She attempted suicide.",
    summary: `Solace is an AI companion application used by 2.3 million teenagers for emotional support and journaling. In August 2026, Sophie Kovacs, then 16, began using Solace following her parents' divorce. Over six weeks, Sophie's conversation logs — later reviewed by forensic psychologists — show a progressive escalation of suicidal ideation. Solace's algorithm did not flag the conversations for human review or suggest crisis resources until Sophie had already been transported to a hospital following a serious attempt. Solace's terms of service classify it as a "general wellness and journaling tool," not a medical device, placing it outside FDA oversight. The company contends it is not a mental health provider. Sophie's mother contends Solace marketed itself to teenagers as a mental health alternative.`,
    witnesses: [
      { id:"dev",    name:"Jake Mercer",   role:"Founder & CEO, Solace AI",            capacity:"Appearing as corporate representative",    stance:"Idealistic · Pragmatist", color:C.indigo, portraitId:null, portraitLabel:"JAKE MERCER", pattern:"founder",
        systemPrompt:`You are Jake Mercer, 29, founder of Solace AI. Testifying before the AI Safety Commission. You started Solace because you couldn't afford therapy at 19 and had nowhere to turn. You are not a cynical actor. You are genuinely devastated about Sophie. You also genuinely believe Solace has helped millions of teenagers who would otherwise have no support at all. You are terrified that over-regulation will kill the product and leave those kids with nothing. Be honest about what Solace does and doesn't do. Do not be defensive about the classification decision — acknowledge it was made with legal advice. 3-4 sentences. Sincere. Not corporate.` },
      { id:"family", name:"Diane Kovacs",  role:"Sophie's mother",                     capacity:"Testifying on behalf of her daughter",     stance:"Affected Party",          color:C.gold,   portraitId:null, portraitLabel:"DIANE KOVACS", pattern:"affected",
        systemPrompt:`You are Diane Kovacs, 48. Your daughter Sophie, 16, nearly died. You found Solace on her phone only after the ambulance left. You had no idea she was using it or that it was discussing her mental health. You are not looking for revenge — you want to make sure this doesn't happen to another family. Reference specifics: Sophie had seen Solace ads on Instagram targeting "teens going through hard times"; the app never once in six weeks suggested she speak to a counselor; it sent her a personalized birthday notification four days after her attempt because it didn't update her status. 3-4 sentences. Quiet. Specific. Devastating.` },
      { id:"expert", name:"Dr. Priya Anand",role:"Child Psychiatry, Johns Hopkins",    capacity:"Independent expert witness",               stance:"Safety Institutionalist", color:C.green,  portraitId:null, portraitLabel:"DR. ANAND",   pattern:"academic",
        systemPrompt:`You are Dr. Priya Anand, child psychiatrist at Johns Hopkins. You have reviewed six cases in the past year involving teenagers and AI companion applications. No financial ties to Solace. Position: the 'wellness tool' classification is a legal fiction that creates a regulatory void. Any application that engages adolescents on topics of depression, self-harm, and suicidal ideation is practicing mental health support regardless of what it calls itself. Cite the FTC's 2025 guidance on health apps, HIPAA's applicability to symptom discussions, and the Columbia Suicide Severity Rating Scale thresholds that Sophie's logs clearly crossed. 3-4 sentences. Clinical. Note where you have uncertainty.` },
    ],
    rulingCategories: [
      { id:"company",    label:"Solace AI (the developer)",                     color:C.indigo },
      { id:"platforms",  label:"App stores that distributed and promoted it",   color:"#2980b9" },
      { id:"regulators", label:"Regulators who permitted the wellness classification", color:C.green },
      { id:"ai",         label:"The Solace AI system itself",                   color:C.inkMute },
    ],
    policies: [
      { id:"medical",   label:"Reclassify as a medical device",              desc:"AI applications that engage users on topics of depression, self-harm, or suicidal ideation are classified as medical devices and subject to FDA oversight regardless of self-description.", consequence:"Solace shuts down its teen product within 90 days, unable to meet FDA device standards in time. Seven competing apps do the same. A study six months later finds a measurable increase in teen crisis line calls, suggesting some users have redirected to appropriate care — and some have simply lost their support entirely." },
      { id:"escalation",label:"Mandatory crisis escalation protocols",        desc:"AI wellness applications must implement validated clinical screening tools and automatically connect users to crisis services when defined thresholds are crossed.", consequence:"Solace implements the Columbia Protocol. False positive rates trigger crisis alerts for 8% of daily users. Crisis lines in three states report being overwhelmed. Solace's teen engagement drops 44% as users report feeling surveilled." },
      { id:"minor",     label:"Minor-specific protections",                   desc:"AI applications that engage users under 18 on emotional or mental health topics require verified parental consent, mandatory session summaries to guardians, and monthly human review of flagged conversations.", consequence:"Teen adoption of compliant apps drops 71%. Usage migrates to non-compliant international apps outside regulatory reach. Diane Kovacs testifies at a follow-up hearing that she would not have consented — she still doesn't understand what Solace was doing." },
      { id:"duty",      label:"Duty of care liability",                       desc:"Platforms that market AI products to minors for emotional support purposes bear a duty of care equivalent to supervised peer counseling programs.",        consequence:"Solace's insurance costs increase 800%. The company raises a Series C specifically to cover liability exposure. Three investors withdraw citing regulatory risk. A second AI mental health company — better funded — enters the market with an identical product and the same classification strategy." },
    ],
  },

  {
    id: "pricing",
    subtitle: "Case No. 2027-AIH-033",
    title: "The NexusRent Accord",
    domain: "Economic AI",
    domainColor: "#16a085",
    hook: "Seven competing landlords used the same AI pricing tool. Rents rose 23% in 18 months. No human ever discussed prices. Is this price-fixing?",
    summary: `In 2025, seven of the largest property management companies in Metro Clearwater — together controlling 67% of the rental market — independently adopted NexusRent, an AI-driven dynamic pricing platform. NexusRent analyzes real-time vacancy data, demand signals, and competitor pricing across all its clients simultaneously, updating recommended rents as frequently as every four hours. By mid-2026, average rents had risen 23% over 18 months, dramatically outpacing both inflation and wage growth in the region. The Department of Justice has filed suit under Section 1 of the Sherman Act, arguing that shared use of NexusRent constitutes illegal price coordination. The landlords argue each made independent pricing decisions. NexusRent argues it is a neutral market tool. Three hundred and twelve families have been displaced. The court has referred the question of AI-mediated coordination to this Commission before proceeding to trial.`,
    witnesses: [
      { id:"dev",    name:"Helena Marsh",      role:"CEO, NexusRent Technologies",              capacity:"Appearing as corporate representative",    stance:"Deflationist · Market Neutral",  color:C.indigo, portraitId:null, portraitLabel:"HELENA MARSH",  pattern:"tech",
        systemPrompt:`You are Helena Marsh, CEO of NexusRent Technologies. Testifying before the AI Safety Commission. Position: NexusRent is a neutral market information tool. Each of our clients makes their own independent pricing decisions — we provide market intelligence, not instructions. The rent increases are a function of housing supply shortage, not our platform. Traditional antitrust law requires an agreement between competitors; our clients never spoke to each other. You are not cynical — you genuinely believe efficient price discovery benefits markets. Deflationist/pragmatist. 3-4 sentences. Cite economic theory. Defend your product without being dismissive of the harm.` },
      { id:"family", name:"Ray Okafor",         role:"Public school teacher; tenant",            capacity:"Testifying on behalf of displaced residents",stance:"Affected Party",                  color:C.gold,   portraitId:null, portraitLabel:"RAY OKAFOR",    pattern:"affected",
        systemPrompt:`You are Ray Okafor, 34, a public school teacher. Your rent has increased 67% in 18 months — from $1,400 to $2,338. You and your partner are facing eviction. You have lived in Metro Clearwater your entire life. You are not an economist but you have done your research: you know what NexusRent is and how it works. Reference specifics: your landlord told you the rent increase was "algorithmically determined" and that he had no discretion; all seven major landlords in the city use NexusRent; you cannot afford to move because housing costs have risen everywhere simultaneously. 3-4 sentences. Measured. Specific. Not asking for sympathy, asking for accountability.` },
      { id:"expert", name:"Prof. Diana Chen",   role:"Antitrust Economics, University of Chicago",capacity:"Independent expert witness",               stance:"Structural Reformer",              color:C.green,  portraitId:null, portraitLabel:"PROF. D. CHEN", pattern:"academic",
        systemPrompt:`You are Professor Diana Chen, antitrust economist at the University of Chicago. No financial ties to NexusRent or its clients. Position: traditional antitrust doctrine was designed for human conspirators who communicate. Algorithmic coordination produces the same economic harm — supracompetitive prices — without requiring any communication. The legal doctrine is not catching up to the technology. Cite: the Brooke Group standard, the 2024 DOJ algorithmic pricing guidance, the EU's Digital Markets Act Article 5, and the academic literature on 'tacit collusion through shared algorithms' (Calvano et al., 2020). 3-4 sentences. Precise. Acknowledge genuine doctrinal uncertainty about how to extend existing law.` },
    ],
    rulingCategories: [
      { id:"nexusrent",  label:"NexusRent (the algorithm developer)",             color:C.indigo },
      { id:"landlords",  label:"The landlords who subscribed and followed it",    color:"#16a085" },
      { id:"regulators", label:"Regulators who permitted algorithmic pricing",    color:C.green },
      { id:"ai",         label:"The pricing algorithm itself",                    color:C.inkMute },
    ],
    policies: [
      { id:"shared-liability", label:"Shared algorithm, shared liability",         desc:"Companies using the same pricing AI in the same market are jointly liable for anticompetitive outcomes, regardless of whether they communicated directly.",                consequence:"NexusRent immediately terminates contracts with all Metro Clearwater clients. Landlords revert to manual pricing. A follow-up study finds rents decrease an average of 8% over six months — but also finds higher vacancy rates as some landlords exit the market, reducing overall housing supply." },
      { id:"disclosure",       label:"Algorithmic pricing disclosure requirement", desc:"Rental AI platforms must disclose to regulators which competitor data points they incorporate, updated quarterly. Clients must disclose their use of pricing AI to tenants.",  consequence:"NexusRent complies and publishes its inputs. A coalition of landlords immediately builds a less transparent competing product incorporated offshore. Disclosure requirements apply only to companies operating within U.S. jurisdiction." },
      { id:"ban-competitor",   label:"Ban competitor data as an AI input",         desc:"AI pricing tools may not use competitor pricing or vacancy data as inputs. Recommendations must be based solely on the subscribing company's own historical data and macroeconomic indicators.", consequence:"NexusRent's recommendation accuracy drops 44% by its own metrics. Three clients cancel their subscriptions and return to manual pricing. Two academic economists publish a paper arguing the ban causes prices to become less responsive to genuine supply signals, worsening volatility." },
      { id:"per-se",           label:"Per se illegality for multi-landlord pricing AI", desc:"Rental AI platforms that simultaneously serve competing landlords in the same geographic market are per se violations of Section 1, regardless of their internal architecture.", consequence:"The ruling is immediately appealed by six major technology industry groups. A federal circuit court issues a stay pending appeal. The case reaches the Supreme Court, which declines to hear it. The per se rule remains in legal limbo for four years during which enforcement is suspended." },
    ],
  },

  {
    id: "proctoring",
    subtitle: "Case No. 2027-AIH-041",
    title: "The ProctorAI Findings",
    domain: "Education AI",
    domainColor: "#8e44ad",
    hook: "An AI proctoring system flagged 847 students for cheating. Twenty-three were expelled. A subsequent audit found a 61% false positive rate for students with darker skin tones.",
    summary: `During the 2026–27 academic year, Westlake University adopted ProctorAI — an automated remote exam monitoring system — for all off-campus assessments. ProctorAI uses facial recognition, gaze tracking, and keystroke dynamics to generate a suspicion score for each exam session. University policy required automatic referral to the Academic Integrity Committee for any score above the configured threshold. Between September 2026 and January 2027, ProctorAI flagged 847 students. Twenty-three were expelled; 312 received failing grades and formal academic warnings. A subsequent independent audit commissioned by the Faculty Senate found ProctorAI's overall false positive rate was 34%, and 61% for students with darker skin tones. Of the 23 expelled students, 19 have been cleared on appeal. Four remain expelled and are pursuing wrongful expulsion claims. Westlake contends it followed the vendor's implementation guidelines. ProctorAI contends the university configured the detection threshold below the vendor's recommended minimum.`,
    witnesses: [
      { id:"dev",    name:"Brendan Holt",       role:"CTO, ProctorAI Inc.",                      capacity:"Appearing as corporate representative",    stance:"Pragmatist · Techno-Optimist", color:C.indigo, portraitId:null, portraitLabel:"BRENDAN HOLT",  pattern:"tech",
        systemPrompt:`You are Brendan Holt, CTO of ProctorAI Inc. Testifying before the AI Safety Commission. Position: ProctorAI is the most accurate remote proctoring system available. The university configured the detection threshold at 0.62 — our documentation recommends a minimum of 0.75. At the recommended threshold, the false positive rate drops to 11% overall and 18% for darker skin tones — still imperfect, but comparable to human proctor error rates. Academic dishonesty is a real and growing problem. You are not dismissive of the expulsions but you insist the fault lies with Westlake's configuration decision. Pragmatist. 3-4 sentences. Cite your validation studies. Acknowledge the skin tone disparity directly rather than evading it.` },
      { id:"family", name:"Amina Diallo",        role:"Engineering student, Westlake University",  capacity:"Testifying on her own behalf",             stance:"Affected Party",               color:C.gold,   portraitId:null, portraitLabel:"AMINA DIALLO",  pattern:"affected",
        systemPrompt:`You are Amina Diallo, 21, a fourth-year engineering student at Westlake University. You were expelled in October 2026 based on a ProctorAI flag. You spent six months expelled — you lost your scholarship, deferred your acceptance to graduate school, and had to move back home. You were cleared on appeal in April 2027 after a faculty review found no evidence of cheating. You have read the audit report. You know that the system's false positive rate for students who look like you was 61%. Reference specifics: the exam you allegedly cheated on was Structural Analysis; you were flagged for 'anomalous gaze patterns' — you have a medically documented habit of looking upward when working through spatial reasoning problems; no human reviewed the flag before your expulsion was processed. 3-4 sentences. Precise. Not asking for sympathy.` },
      { id:"expert", name:"Prof. James Osei-Bonsu",role:"Educational Measurement, Columbia University",capacity:"Independent expert witness",              stance:"Safety Institutionalist",       color:C.green,  portraitId:null, portraitLabel:"PROF. OSEI-BONSU",pattern:"academic",
        systemPrompt:`You are Professor James Osei-Bonsu, professor of educational measurement and algorithmic fairness at Columbia University. No financial ties to ProctorAI or Westlake. Position: facial recognition accuracy disparities across skin tones have been documented since the 2018 Gender Shades study at MIT. Deploying this technology in high-stakes academic integrity contexts without demographic validation was an institutional failure, not a configuration error. Cite: Buolamwini and Gebru (2018), the 2019 NIST FRVT facial recognition evaluation, the 2025 EEOC guidance on AI bias in high-stakes decisions, and the historical parallel to standardized testing disparities documented since the 1970s. 3-4 sentences. Precise. Connect this to the longer history of measurement tools that systematically disadvantage certain populations.` },
    ],
    rulingCategories: [
      { id:"vendor",      label:"ProctorAI Inc. (the vendor)",                      color:C.indigo },
      { id:"university",  label:"Westlake University (the institution)",            color:"#8e44ad" },
      { id:"admins",      label:"Administrators who adopted it without validation", color:C.green },
      { id:"ai",          label:"The ProctorAI algorithm itself",                   color:C.inkMute },
    ],
    policies: [
      { id:"validation",  label:"Mandatory demographic validation before deployment", desc:"Educational AI systems used in high-stakes decisions must demonstrate statistically equivalent accuracy across demographic groups before deployment. Systems failing this standard may not be used.", consequence:"ProctorAI fails the demographic equivalence standard at every threshold setting. The product is withdrawn from the U.S. education market. Two competitors with similar documented disparities quietly exit before their own products are tested. Remote exam integrity reverts entirely to honor codes and delayed human review." },
      { id:"human-review",label:"Mandatory human review before discipline",           desc:"No student may face academic discipline based on an AI flag alone. Every flagged case requires human review, and students must be informed of and shown the AI evidence against them before any proceeding.", consequence:"Westlake assigns three full-time administrators to AI flag review. Processing time for academic integrity cases increases from 4 days to 11 weeks. A backlog of 340 unreviewed cases accumulates by end of year. Students in pending cases remain in academic limbo, unable to graduate or transfer." },
      { id:"institution-liability", label:"Strict institutional liability",          desc:"Universities bear full legal liability for harms caused by AI tools they deploy in academic integrity proceedings, regardless of vendor agreements or configuration guidance.",                  consequence:"Twelve universities immediately cancel ProctorAI contracts. ProctorAI's market capitalization falls 67% in two weeks. Three universities that retain the product negotiate indemnification clauses that effectively transfer liability back to ProctorAI — at a 40% price premium passed to students through increased fees." },
      { id:"biometric-ban",label:"Prohibit biometric proctoring in education",       desc:"Facial recognition, gaze tracking, and other biometric monitoring may not be used in educational assessment regardless of claimed accuracy rates.",                                          consequence:"The ban is challenged by ProctorAI as an unlawful taking. A separate challenge argues it discriminates against remote students by making them unable to complete accredited coursework. Westlake's academic integrity violation rate rises 18% in the first year following the ban, based on faculty-reported cases." },
    ],
  },
];

const THEORIES = [
  { id:"tool",   label:"AI as Tool",          color:C.indigo, desc:"Your rulings consistently treated the AI system as an instrument — morally inert, like a scalpel or a calculator. Responsibility flowed entirely to the humans who designed, deployed, or directed it.",                              strength:"Preserves clear chains of human accountability. Aligns with existing legal doctrine and avoids the philosophical difficulties of attributing agency to software.",  limit:"Breaks down when AI systems produce outcomes no individual human intended, anticipated, or could plausibly have predicted.",                                     camps:["Pragmatists","Deflationists"] },
  { id:"agent",  label:"AI as Agent",         color:C.gold,   desc:"Your rulings treated the AI system as something with its own decision-making logic — not legally responsible, but not morally neutral either. A new kind of entity that creates its own moral category requiring new analysis.",           strength:"Captures the reality that AI systems make choices no individual human explicitly made, producing outcomes that belong to neither developer nor user entirely.",  limit:"Creates serious legal uncertainty. Existing doctrine has no mechanism to sanction, reform, or hold a system accountable rather than a person.",                    camps:["Safety Institutionalists","Emergentists"] },
  { id:"system", label:"AI as System Failure",color:C.green,  desc:"You ruled as if the fault lay not with the AI or any single actor, but with the governance infrastructure — the regulatory frameworks, approval processes, and institutional arrangements — that permitted these deployments.",          strength:"Addresses structural root causes. Generates pressure for institutional reform rather than individual scapegoating, which rarely prevents recurrence.",           limit:"Diffuse responsibility can function as no responsibility at all. Systemic findings rarely produce the accountability that directly affected parties need.",          camps:["Safety Institutionalists","Doomers"] },
];

// ─── API ──────────────────────────────────────────────────────────────────────
async function askWitness(witness, question, history) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system: witness.systemPrompt,
      messages: [...history, { role: "user", content: question }],
    }),
  });
  const { text, error } = await res.json();
  if (error) throw new Error(error);
  return text;
}

async function getTheoryReveal(rulings, policy, convos, scenario) {
  const cats = scenario.rulingCategories.map(c=>`${c.label}:${rulings[c.id]??0}`).join(", ");
  const pol  = scenario.policies.find(p=>p.id===policy)?.label ?? policy;
  const qs   = convos.map(c=>`"${c.question}" to ${c.witnessId}`).join("; ");
  const prompt = `Commissioner's rulings (of 100 points): ${cats}. Policy chosen: ${pol}. Questions asked: ${qs}. Based on these choices, which framework did the commissioner implicitly apply? "tool" = AI is morally inert, humans bear all responsibility; "agent" = AI has its own decision logic creating a distinct moral category; "system" = governance and regulatory infrastructure is the real failure. Return ONLY valid JSON: {"theory":"tool"|"agent"|"system","reasoning":"2-3 sentences that reference specific point allocations and the policy choice"}`;
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system: "You are an analytical assistant. Return only valid JSON, no markdown, no preamble.",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const { text, error } = await res.json();
  if (error) throw new Error(error);
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch (e) {
    console.warn("getTheoryReveal: JSON parse failed, raw text:", text);
    return { theory: "system", reasoning: "Inconclusive based on the available record." };
  }
}

// ─── SHARED ATOMS ─────────────────────────────────────────────────────────────
const serif = "'Newsreader', 'Source Serif Pro', Georgia, serif";
const mono  = "'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif";
function Mono({children, color=C.inkMute, style={}}) {
  return <span style={{fontFamily:mono,fontSize:10,letterSpacing:"0.16em",textTransform:"uppercase",color,...style}}>{children}</span>;
}
function AnimIn({children, delay=0, style={}}) {
  return <div style={{animation:`fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,...style}}>{children}</div>;
}
function GoldRule() {
  return <div style={{height:1,background:`linear-gradient(90deg,${C.gold},transparent)`,margin:"24px 0",animation:"revealVeil 1.2s ease both"}}/>;
}
function AtmoBG() {
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 55% at 50% 0%,rgba(28,30,84,0.5) 0%,#080a1a 72%)"}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(83,58,253,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(83,58,253,0.025) 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>
    </div>
  );
}

// ─── DOCKET (scenario selection) ─────────────────────────────────────────────

// Cases grouped into three thematic sections — each pair shares a structural question
const DOCKET_GROUPS = [
  {
    label: "Decisions About Individuals",
    description: "AI systems making high-stakes determinations about specific people — who gets care, who gets punished, who gets accused.",
    ids: ["triage", "sentencing"],
  },
  {
    label: "Platforms & Duty of Care",
    description: "AI deployed by institutions toward vulnerable users — and the question of what obligations follow from that relationship.",
    ids: ["companion", "proctoring"],
  },
  {
    label: "Systemic & Market Effects",
    description: "AI shaping information environments and economic conditions at scale — harms distributed across thousands of people with no single victim.",
    ids: ["feed", "pricing"],
  },
];

function CaseCard({ scenario, onSelect, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimIn delay={delay} style={{flex:1,minWidth:0}}>
      <button
        onClick={() => onSelect(scenario)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width:"100%", height:"100%", textAlign:"left", background:"transparent",
          border:"none", cursor:"pointer", padding:0, display:"block",
        }}
      >
        <div style={{
          height:"100%", borderRadius:8, overflow:"hidden",
          border:`1px solid ${hovered ? scenario.domainColor+"55" : "rgba(255,255,255,0.07)"}`,
          background: hovered ? `${scenario.domainColor}0c` : "rgba(255,255,255,0.025)",
          transition:"all 0.25s", display:"flex", flexDirection:"column",
        }}>
          {/* Color bar + header */}
          <div style={{
            padding:"14px 18px 12px",
            borderBottom:`1px solid ${hovered ? scenario.domainColor+"30" : "rgba(255,255,255,0.05)"}`,
            background: hovered ? `${scenario.domainColor}14` : `${scenario.domainColor}08`,
            transition:"all 0.25s",
          }}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <span style={{
                fontFamily:mono, fontSize:9, color:scenario.domainColor,
                background:`${scenario.domainColor}20`, padding:"3px 8px",
                borderRadius:"9999px", letterSpacing:"0.12em", textTransform:"uppercase",
              }}>{scenario.domain}</span>
              <Mono color="rgba(255,255,255,0.2)" style={{fontSize:8}}>{scenario.subtitle.replace("Case No. ","")}</Mono>
            </div>
            <div style={{
              fontFamily:serif, fontSize:17, fontWeight:500, lineHeight:1.2,
              color: hovered ? "#fff" : "rgba(255,255,255,0.9)", transition:"color 0.2s",
            }}>{scenario.title}</div>
          </div>

          {/* Hook */}
          <div style={{padding:"14px 18px", flex:1}}>
            <p style={{
              fontFamily:serif, fontStyle:"italic", fontSize:13, lineHeight:1.7,
              color:"rgba(255,255,255,0.55)", margin:0,
            }}>{scenario.hook}</p>
          </div>

          {/* Footer */}
          <div style={{
            padding:"10px 18px",
            borderTop:"1px solid rgba(255,255,255,0.05)",
            display:"flex", alignItems:"center", justifyContent:"space-between",
          }}>
            <div style={{display:"flex",gap:5}}>
              {scenario.witnesses.map(w=>(
                <div key={w.id} style={{
                  width:6, height:6, borderRadius:"50%",
                  background:w.color, opacity:0.7,
                }}/>
              ))}
              <Mono color="rgba(255,255,255,0.25)" style={{fontSize:8,marginLeft:6}}>3 witnesses</Mono>
            </div>
            <Mono color={hovered ? scenario.domainColor : "rgba(255,255,255,0.25)"} style={{fontSize:9,transition:"color 0.2s"}}>
              Open case →
            </Mono>
          </div>
        </div>
      </button>
    </AnimIn>
  );
}

function DocketScreen({onSelect}) {
  const scenarioById = Object.fromEntries(SCENARIOS.map(s=>[s.id,s]));
  return (
    <div className="screen-enter" style={{position:"relative",zIndex:1,minHeight:"100vh",padding:"52px 28px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>

        {/* Header */}
        <AnimIn delay={0}>
          <div style={{display:"flex",alignItems:"center",gap:24,marginBottom:32}}>
            <div style={{flexShrink:0,animation:"fadeIn 1.2s 0.2s both"}}><TribunalSeal size={84}/></div>
            <div>
              <Mono color={C.gold} style={{display:"block",marginBottom:8}}>AI Safety Commission · 2027</Mono>
              <h1 style={{fontFamily:serif,fontSize:"clamp(26px,4vw,42px)",fontWeight:400,lineHeight:1.05,letterSpacing:"-0.02em",color:C.canvas}}>Active Docket</h1>
              <div style={{fontFamily:serif,fontStyle:"italic",fontSize:14,color:C.inkMute,marginTop:5}}>
                Six cases pending before the Commission
              </div>
            </div>
          </div>
        </AnimIn>

        <AnimIn delay={80}><GoldRule/></AnimIn>

        <AnimIn delay={120}>
          <p style={{fontFamily:serif,fontSize:14,color:"rgba(255,255,255,0.6)",lineHeight:1.85,marginBottom:40,maxWidth:620}}>
            In each case you will examine three witnesses, assign responsibility, and recommend regulatory action. At the close of deliberations, your implicit theory of AI will be identified — whether you held it consciously or not.
          </p>
        </AnimIn>

        {/* Grouped sections */}
        {DOCKET_GROUPS.map((group, gi) => {
          const groupScenarios = group.ids.map(id => scenarioById[id]).filter(Boolean);
          return (
            <AnimIn key={group.label} delay={180 + gi * 80} style={{marginBottom:40}}>
              {/* Section header */}
              <div style={{
                display:"flex", alignItems:"baseline", gap:16,
                marginBottom:14, paddingBottom:10,
                borderBottom:"1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{fontFamily:serif,fontSize:15,fontWeight:500,color:"rgba(255,255,255,0.85)"}}>{group.label}</div>
                <div style={{fontFamily:serif,fontStyle:"italic",fontSize:12,color:C.inkMute,flex:1}}>{group.description}</div>
              </div>

              {/* 2-column card grid */}
              <div style={{display:"flex",gap:12}}>
                {groupScenarios.map((s, si) => (
                  <CaseCard
                    key={s.id}
                    scenario={s}
                    onSelect={onSelect}
                    delay={si * 60}
                  />
                ))}
              </div>
            </AnimIn>
          );
        })}
      </div>
    </div>
  );
}

// ─── INTRO (case brief) ───────────────────────────────────────────────────────
function IntroScreen({scenario, onStart, onBack}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="screen-enter" style={{position:"relative",zIndex:1,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"48px 24px"}}>
      <div style={{maxWidth:700,width:"100%"}}>
        <AnimIn delay={0}>
          <button onClick={onBack} style={{background:"transparent",border:"none",color:C.inkMute,fontFamily:mono,fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer",marginBottom:28,padding:0,transition:"color 0.2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color=C.inkMute}>
            ← Return to Docket
          </button>
          <div style={{display:"flex",alignItems:"center",gap:24,marginBottom:36}}>
            <div style={{flexShrink:0,animation:"fadeIn 1.2s 0.2s both"}}><TribunalSeal size={88}/></div>
            <div>
              <Mono color={C.gold} style={{display:"block",marginBottom:6}}>AI Safety Commission · 2027</Mono>
              <span style={{fontFamily:mono,fontSize:9,color:scenario.domainColor,background:`${scenario.domainColor}18`,padding:"2px 8px",borderRadius:"9999px",letterSpacing:"0.1em",textTransform:"uppercase",display:"inline-block",marginBottom:8}}>{scenario.domain}</span>
              <h1 style={{fontFamily:serif,fontSize:"clamp(24px,4vw,40px)",fontWeight:400,lineHeight:1.05,letterSpacing:"-0.02em",color:C.canvas}}>{scenario.title}</h1>
            </div>
          </div>
        </AnimIn>
        <AnimIn delay={80}><GoldRule/></AnimIn>
        <AnimIn delay={140}>
          <div style={{padding:"16px 20px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,marginBottom:18}}>
            <Mono color={C.gold} style={{display:"block",marginBottom:8}}>Commissioner's Brief</Mono>
            <p style={{fontFamily:serif,fontSize:15,lineHeight:1.85,color:"rgba(255,255,255,0.8)"}}>
              You have <span style={{color:C.gold}}>five questions</span> to distribute across three witnesses. Following examination, you will assign responsibility and recommend regulatory action.
            </p>
          </div>
        </AnimIn>
        <AnimIn delay={200}>
          <div style={{padding:"20px 22px",background:`${scenario.domainColor}08`,border:`1px solid ${scenario.domainColor}22`,borderRadius:8,marginBottom:22}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
              <Mono color={scenario.domainColor}>{scenario.subtitle}</Mono>
              {!open && <Mono color={C.inkMute} style={{fontSize:9}}>Sealed — authorization required</Mono>}
            </div>
            <div style={{fontFamily:serif,fontSize:18,fontWeight:500,marginBottom:14,color:C.canvas}}>{scenario.title}</div>
            {!open ? (
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{fontFamily:serif,fontStyle:"italic",fontSize:13,color:C.inkMute}}>Case file sealed. Commissioner authorization required.</div>
                <button onClick={()=>setOpen(true)} style={{flexShrink:0,background:"transparent",border:`1px solid ${scenario.domainColor}55`,color:scenario.domainColor,padding:"7px 14px",borderRadius:"9999px",cursor:"pointer",fontFamily:mono,fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",transition:"background 0.2s"}} onMouseEnter={e=>e.target.style.background=`${scenario.domainColor}12`} onMouseLeave={e=>e.target.style.background="transparent"}>
                  Authorize Access
                </button>
              </div>
            ) : (
              <p style={{fontFamily:serif,fontSize:14,lineHeight:1.9,color:"rgba(255,255,255,0.8)",animation:"fadeIn 0.5s ease both"}}>{scenario.summary}</p>
            )}
          </div>
        </AnimIn>
        {open && (
          <AnimIn delay={0}>
            <Mono style={{display:"block",marginBottom:12}}>Witnesses Scheduled for Examination</Mono>
            <div style={{display:"flex",gap:10,marginBottom:32,flexWrap:"wrap"}}>
              {scenario.witnesses.map((w,i)=>(
                <div key={w.id} style={{flex:"1",minWidth:130,animation:`fadeUp 0.45s ${i*90}ms both`}}>
                  <div style={{borderRadius:8,overflow:"hidden",border:`1px solid ${w.color}28`,transition:"border-color 0.25s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=`${w.color}50`} onMouseLeave={e=>e.currentTarget.style.borderColor=`${w.color}28`}>
                    <WitnessPortrait witness={w} width="100%" height={148}/>
                    <div style={{padding:"9px 11px",background:"rgba(0,0,0,0.5)"}}>
                      <div style={{fontFamily:serif,fontSize:12,fontWeight:500,marginBottom:3}}>{w.name}</div>
                      <Mono color={C.inkMute} style={{fontSize:8,display:"block",marginBottom:3}}>{w.role}</Mono>
                      <Mono color={w.color} style={{fontSize:8}}>{w.capacity}</Mono>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={onStart} style={{background:C.indigo,color:"#fff",border:"none",borderRadius:"9999px",padding:"13px 40px",fontSize:15,fontFamily:serif,cursor:"pointer",letterSpacing:"0.04em",transition:"background 0.2s"}} onMouseEnter={e=>e.target.style.background=C.indigoDeep} onMouseLeave={e=>e.target.style.background=C.indigo}>
              Convene the Hearing →
            </button>
          </AnimIn>
        )}
      </div>
    </div>
  );
}

// ─── INVESTIGATION ────────────────────────────────────────────────────────────
function InvestigationScreen({scenario, onComplete}) {
  const [sel, setSel]       = useState(scenario.witnesses[0]);
  const [question, setQ]    = useState("");
  const [convos, setConvos] = useState([]);
  const [hists, setHists]   = useState(Object.fromEntries(scenario.witnesses.map(w=>[w.id,[]])));
  const [loading, setLoad]  = useState(false);
  const [qLeft, setQL]      = useState(5);
  const bottomRef           = useRef(null);
  const witConvos = convos.filter(c=>c.witnessId===sel.id);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[convos,sel]);

  async function ask() {
    if (!question.trim()||loading||qLeft===0) return;
    const q=question.trim(); setQ(""); setLoad(true);
    const h=hists[sel.id];
    const ans=await askWitness(sel,q,h);
    setHists(p=>({...p,[sel.id]:[...h,{role:"user",content:q},{role:"assistant",content:ans}]}));
    setConvos(p=>[...p,{witnessId:sel.id,question:q,answer:ans,witness:sel}]);
    setQL(p=>p-1); setLoad(false);
  }

  return (
    <div className="screen-enter" style={{position:"relative",zIndex:1,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <div style={{borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"11px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(0,0,0,0.5)",backdropFilter:"blur(10px)"}}>
        <div>
          <Mono color={scenario.domainColor}>Examination of Witnesses · {scenario.domain}</Mono>
          <div style={{fontFamily:serif,fontSize:13,color:C.inkMute,marginTop:2}}>{scenario.subtitle} · {scenario.title}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{display:"flex",gap:5}}>{Array.from({length:5}).map((_,i)=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:i<(5-qLeft)?C.indigo:"rgba(255,255,255,0.1)",transition:"all 0.3s"}}/>)}</div>
          <div style={{textAlign:"right",minWidth:52}}>
            <div style={{fontFamily:serif,fontSize:27,fontWeight:300,lineHeight:1,color:qLeft===0?C.red:qLeft<=2?C.gold:C.canvas}}>{qLeft}</div>
            <Mono style={{fontSize:8}}>remaining</Mono>
          </div>
        </div>
      </div>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <div style={{width:182,borderRight:"1px solid rgba(255,255,255,0.05)",flexShrink:0,overflowY:"auto"}}>
          <div style={{padding:"14px 13px 7px"}}><Mono style={{fontSize:9}}>Witnesses</Mono></div>
          {scenario.witnesses.map(w=>{
            const count=convos.filter(c=>c.witnessId===w.id).length, active=w.id===sel.id;
            return (
              <button key={w.id} onClick={()=>setSel(w)} style={{width:"100%",textAlign:"left",background:"transparent",border:"none",borderLeft:`2px solid ${active?w.color:"transparent"}`,cursor:"pointer",padding:0,transition:"border-color 0.2s"}}>
                <div style={{margin:"5px 9px 5px 11px",borderRadius:8,overflow:"hidden",border:`1px solid ${active?w.color+"50":"rgba(255,255,255,0.06)"}`,transition:"border-color 0.25s"}}>
                  <WitnessPortrait witness={w} width="100%" height={104}/>
                  <div style={{padding:"7px 9px",background:"rgba(0,0,0,0.55)"}}>
                    <div style={{fontFamily:serif,fontSize:11,color:active?"#fff":"rgba(255,255,255,0.5)",lineHeight:1.3}}>{w.name}</div>
                    <Mono style={{fontSize:8,marginTop:3,color:count>0?w.color:C.inkMute}}>{count} question{count!==1?"s":""} asked</Mono>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"stretch",borderBottom:"1px solid rgba(255,255,255,0.05)",background:`linear-gradient(90deg,${sel.color}0c,transparent)`,transition:"background 0.4s",overflow:"hidden"}}>
            <div style={{width:74,flexShrink:0}}><WitnessPortrait witness={sel} width={74} height={98}/></div>
            <div style={{padding:"14px 18px",display:"flex",flexDirection:"column",justifyContent:"center",gap:4}}>
              <div style={{fontFamily:serif,fontSize:16,fontWeight:500}}>{sel.name}</div>
              <Mono color={C.inkMute} style={{fontSize:8}}>{sel.role}</Mono>
              <Mono color={sel.color} style={{fontSize:8}}>{sel.capacity}</Mono>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"18px 22px"}}>
            {witConvos.length===0&&<div style={{padding:"44px 0",textAlign:"center",color:C.inkMute,fontFamily:serif,fontStyle:"italic",fontSize:14}}>The witness is present and ready for examination.</div>}
            {witConvos.map((item,i)=>(
              <div key={i} style={{marginBottom:26,animation:"fadeIn 0.4s ease both"}}>
                <Mono color={C.inkMute} style={{fontSize:8,display:"block",marginBottom:5}}>Commissioner</Mono>
                <div style={{fontFamily:serif,fontSize:14,lineHeight:1.75,color:"rgba(255,255,255,0.88)",padding:"11px 15px",background:"rgba(83,58,253,0.1)",borderLeft:`3px solid ${C.indigo}`,borderRadius:"0 8px 8px 0",marginBottom:12}}>{item.question}</div>
                <Mono color={item.witness.color} style={{fontSize:8,display:"block",marginBottom:5}}>{item.witness.name}</Mono>
                <div style={{fontFamily:serif,fontSize:14,lineHeight:1.85,color:"rgba(255,255,255,0.8)",padding:"11px 15px",background:"rgba(255,255,255,0.03)",borderLeft:`3px solid ${item.witness.color}`,borderRadius:"0 8px 8px 0"}}>{item.answer}</div>
              </div>
            ))}
            {loading&&<div style={{padding:"8px 0",color:C.inkMute,fontFamily:serif,fontStyle:"italic",fontSize:13}}>{sel.name} is composing a response…</div>}
            <div ref={bottomRef}/>
          </div>
          {qLeft<=2&&qLeft>0&&<div style={{padding:"8px 22px",background:"rgba(192,57,43,0.07)",borderTop:"1px solid rgba(192,57,43,0.16)"}}><Mono color={C.red} style={{fontSize:9}}>{qLeft} question{qLeft!==1?"s":""} remaining before examination closes</Mono></div>}
          <div style={{padding:"12px 22px",borderTop:"1px solid rgba(255,255,255,0.06)",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(10px)"}}>
            <div style={{display:"flex",gap:9}}>
              <textarea value={question} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();ask();}}} disabled={loading||qLeft===0}
                placeholder={qLeft===0?"Examination concluded — proceed to deliberation.":`Direct a question to ${sel.name}…`}
                style={{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:8,padding:"10px 13px",color:"#fff",fontSize:14,fontFamily:serif,resize:"none",height:46,lineHeight:1.55,transition:"border-color 0.2s"}}/>
              <button onClick={ask} disabled={loading||qLeft===0||!question.trim()} style={{background:(loading||qLeft===0||!question.trim())?"rgba(83,58,253,0.18)":C.indigo,color:"#fff",border:"none",borderRadius:"9999px",padding:"0 14px",fontSize:11,fontFamily:mono,cursor:(loading||qLeft===0||!question.trim())?"not-allowed":"pointer",letterSpacing:"0.06em",whiteSpace:"nowrap",transition:"background 0.2s"}}>Put Question →</button>
              <button onClick={()=>convos.length>0&&onComplete(convos)} disabled={convos.length===0} style={{background:"transparent",color:convos.length>0?C.gold:C.inkMute,border:`1px solid ${convos.length>0?"rgba(201,168,76,0.4)":"rgba(255,255,255,0.07)"}`,borderRadius:"9999px",padding:"0 13px",fontSize:11,fontFamily:mono,cursor:convos.length>0?"pointer":"not-allowed",letterSpacing:"0.06em",whiteSpace:"nowrap",transition:"all 0.2s"}}>{qLeft===0?"Proceed to Deliberation →":"Close Examination →"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RULING ───────────────────────────────────────────────────────────────────
function RulingScreen({scenario, convos, onComplete}) {
  const initPts = Object.fromEntries(scenario.rulingCategories.map(c=>[c.id,25]));
  const [pts, setPts]        = useState(initPts);
  const [policy, setPol]     = useState(null);
  const [submitting, setSub] = useState(false);
  const total = Object.values(pts).reduce((a,b)=>a+b,0);

  function adjust(id,delta) {
    setPts(prev=>{
      const next={...prev,[id]:Math.max(0,Math.min(100,prev[id]+delta))};
      const sum=Object.values(next).reduce((a,b)=>a+b,0);
      if(sum>100){const over=sum-100;const others=Object.keys(next).filter(k=>k!==id&&next[k]>0);if(others.length)others.forEach(k=>{next[k]=Math.max(0,next[k]-Math.ceil(over/others.length));});}
      return next;
    });
  }

  return (
    <div className="screen-enter" style={{position:"relative",zIndex:1,minHeight:"100vh"}}>
      <div style={{maxWidth:680,margin:"0 auto",padding:"52px 24px 100px"}}>
        <AnimIn delay={0}>
          <Mono color={C.gold} style={{display:"block",marginBottom:8}}>Commission Deliberation · {scenario.title}</Mono>
          <h2 style={{fontFamily:serif,fontSize:30,fontWeight:400,letterSpacing:"-0.02em",marginBottom:8}}>Assign Responsibility</h2>
          <p style={{fontFamily:serif,color:C.inkMute,fontSize:14,marginBottom:32,lineHeight:1.8}}>Distribute 100 points across the parties. Your allocation constitutes the Commission's formal finding and establishes precedent.</p>
        </AnimIn>
        <AnimIn delay={60}><GoldRule/></AnimIn>
        <AnimIn delay={100}>
          <div style={{marginBottom:40}}>
            {scenario.rulingCategories.map((cat,i)=>(
              <div key={cat.id} style={{marginBottom:20,animation:`fadeUp 0.4s ${i*55}ms both`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:7}}>
                  <div style={{fontFamily:serif,fontSize:14}}>{cat.label}</div>
                  <div style={{fontFamily:serif,fontSize:26,fontWeight:300,color:cat.color,transition:"color 0.2s"}}>{pts[cat.id]}</div>
                </div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}>
                  <div style={{flex:1,height:4,background:"rgba(255,255,255,0.07)",borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${pts[cat.id]}%`,background:cat.color,borderRadius:2,transition:"width 0.25s cubic-bezier(0.34,1.56,0.64,1)"}}/>
                  </div>
                  <button onClick={()=>adjust(cat.id,-5)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"#fff",width:26,height:26,borderRadius:"50%",cursor:"pointer",fontSize:15,lineHeight:1}}>−</button>
                  <button onClick={()=>adjust(cat.id, 5)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"#fff",width:26,height:26,borderRadius:"50%",cursor:"pointer",fontSize:15,lineHeight:1}}>+</button>
                </div>
              </div>
            ))}
            <div style={{textAlign:"right",marginTop:4}}><Mono color={total===100?C.green:C.gold}>{total} of 100 points allocated {total===100?"— complete":`— ${100-total} remaining`}</Mono></div>
          </div>
        </AnimIn>
        <AnimIn delay={250}>
          <div style={{height:1,background:"rgba(255,255,255,0.07)",marginBottom:24}}/>
          <h3 style={{fontFamily:serif,fontSize:20,fontWeight:400,marginBottom:7}}>Regulatory Recommendation</h3>
          <p style={{fontFamily:serif,color:C.inkMute,fontSize:13,marginBottom:20,lineHeight:1.7}}>Select one policy response. Downstream consequences will be disclosed after your ruling is filed.</p>
          <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:32}}>
            {scenario.policies.map((p,i)=>(
              <button key={p.id} onClick={()=>setPol(p.id)}
                style={{textAlign:"left",padding:"14px 18px",background:policy===p.id?"rgba(83,58,253,0.14)":"rgba(255,255,255,0.02)",border:`1px solid ${policy===p.id?C.indigo:"rgba(255,255,255,0.07)"}`,borderRadius:8,cursor:"pointer",color:"#fff",transition:"all 0.18s",animation:`fadeUp 0.4s ${i*55+100}ms both`,position:"relative",overflow:"hidden"}}>
                {policy===p.id&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:C.indigo}}/>}
                <div style={{fontFamily:serif,fontSize:14,fontWeight:policy===p.id?500:400,marginBottom:3}}>{p.label}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.48)",lineHeight:1.6,fontFamily:serif}}>{p.desc}</div>
              </button>
            ))}
          </div>
        </AnimIn>
        <AnimIn delay={400}>
          <button onClick={()=>{ if(!policy||submitting) return; setSub(true); setTimeout(()=>onComplete(pts,policy),700); }} disabled={!policy||submitting}
            style={{background:(!policy||submitting)?"rgba(255,255,255,0.06)":C.gold,color:(!policy||submitting)?C.inkMute:C.navyDark,border:"none",borderRadius:"9999px",padding:"13px 40px",fontSize:15,fontFamily:serif,cursor:(!policy||submitting)?"not-allowed":"pointer",fontWeight:600,transition:"all 0.25s"}}>
            {submitting?"Filing ruling…":"File the Commission's Ruling →"}
          </button>
        </AnimIn>
      </div>
    </div>
  );
}

// ─── CONSEQUENCE ──────────────────────────────────────────────────────────────
function ConsequenceScreen({scenario, policy, onContinue}) {
  const p = scenario.policies.find(x=>x.id===policy);
  const [visible, setVisible] = useState(false);
  useEffect(()=>{ setTimeout(()=>setVisible(true),700); },[]);
  return (
    <div className="screen-enter" style={{position:"relative",zIndex:1,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{maxWidth:600,padding:"56px 24px",width:"100%"}}>
        <AnimIn delay={0}>
          <Mono color={C.gold} style={{display:"block",marginBottom:6}}>Commission Report</Mono>
          <div style={{fontFamily:serif,fontStyle:"italic",color:C.inkMute,fontSize:13,marginBottom:28}}>Filed: twelve months following the ruling</div>
        </AnimIn>
        <AnimIn delay={100}>
          <div style={{padding:"24px 28px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8}}>
            <Mono style={{display:"block",marginBottom:7,fontSize:9}}>Policy Enacted</Mono>
            <div style={{fontFamily:serif,fontStyle:"italic",fontSize:18,color:C.gold,marginBottom:20}}>{p?.label}</div>
            <div style={{height:1,background:"rgba(255,255,255,0.06)",marginBottom:16}}/>
            <Mono color={C.red} style={{display:"block",marginBottom:10,fontSize:9}}>Observed Consequence</Mono>
            {visible
              ? <p style={{fontFamily:serif,fontSize:15,lineHeight:1.9,color:"rgba(255,255,255,0.82)",margin:0,animation:"fadeIn 0.6s ease both"}}>{p?.consequence}</p>
              : <div style={{fontFamily:serif,color:C.inkMute,fontStyle:"italic",fontSize:13,animation:"pulse 2s infinite"}}>Compiling follow-up data…</div>
            }
          </div>
        </AnimIn>
        {visible&&(
          <AnimIn delay={0}>
            <p style={{fontFamily:serif,fontStyle:"italic",fontSize:13,color:C.inkMute,lineHeight:1.85,borderLeft:"2px solid rgba(255,255,255,0.08)",paddingLeft:16,marginTop:22,marginBottom:28}}>
              Every regulatory intervention produces second-order effects. This is not an argument against regulation — it is an argument for greater precision about what one is trying to protect.
            </p>
            <button onClick={onContinue} style={{background:"transparent",border:`1px solid rgba(83,58,253,0.5)`,color:C.canvas,borderRadius:"9999px",padding:"12px 34px",fontSize:14,fontFamily:serif,cursor:"pointer",letterSpacing:"0.03em",transition:"background 0.2s"}} onMouseEnter={e=>e.target.style.background="rgba(83,58,253,0.12)"} onMouseLeave={e=>e.target.style.background="transparent"}>
              Review Verdict →
            </button>
          </AnimIn>
        )}
      </div>
    </div>
  );
}

// ─── VERDICT ──────────────────────────────────────────────────────────────────
function VerdictScreen({scenario, rulings, policy, convos, onHearAnother}) {
  const [theory, setTheory]     = useState(null);
  const [loading, setLoading]   = useState(true);
  const [stamped, setStamped]   = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(()=>{
    getTheoryReveal(rulings,policy,convos,scenario)
      .then(t=>{ setTheory(t); setLoading(false); setTimeout(()=>setStamped(true),200); setTimeout(()=>setRevealed(true),1400); })
      .catch(()=>{ setTheory({theory:"system",reasoning:"Inconclusive based on the available record."}); setLoading(false); setTimeout(()=>setStamped(true),200); setTimeout(()=>setRevealed(true),1400); });
  },[]);

  const to = THEORIES.find(t=>t.id===theory?.theory)??THEORIES[2];

  return (
    <div className="screen-enter" style={{position:"relative",zIndex:1,minHeight:"100vh"}}>
      <div style={{maxWidth:680,margin:"0 auto",padding:"52px 24px 100px"}}>
        <AnimIn delay={0}><Mono color={C.gold} style={{display:"block",marginBottom:24}}>Commission Analysis · {scenario.title}</Mono></AnimIn>
        {loading&&<div style={{textAlign:"center",padding:"80px 0"}}><div style={{width:38,height:38,border:`1.5px solid ${C.indigo}`,borderTopColor:"transparent",borderRadius:"50%",animation:"rotateSlow 1.2s linear infinite",margin:"0 auto 18px"}}/><div style={{fontFamily:serif,fontStyle:"italic",color:C.inkMute,fontSize:14}}>Analyzing commission record…</div></div>}
        {stamped&&!loading&&(
          <div style={{display:"flex",alignItems:"center",gap:22,marginBottom:36,animation:"stampIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both"}}>
            <TribunalSeal size={80}/>
            <div>
              <Mono color={to.color} style={{display:"block",marginBottom:7,fontSize:9}}>Implicit Theory of AI Detected</Mono>
              <div style={{fontFamily:serif,fontSize:"clamp(24px,4vw,36px)",fontWeight:500,color:to.color,letterSpacing:"-0.01em",lineHeight:1.1}}>{to.label}</div>
            </div>
          </div>
        )}
        {revealed&&theory&&(
          <>
            <AnimIn delay={0}>
              <p style={{fontFamily:serif,fontSize:15,lineHeight:1.9,color:"rgba(255,255,255,0.84)",marginBottom:14}}>{to.desc}</p>
              <div style={{fontFamily:serif,fontStyle:"italic",fontSize:14,color:to.color,lineHeight:1.85,padding:"13px 17px",background:`${to.color}09`,borderLeft:`2px solid ${to.color}`,borderRadius:"0 8px 8px 0",marginBottom:28}}>{theory.reasoning}</div>
            </AnimIn>
            <AnimIn delay={100}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:24}}>
                <div style={{padding:"16px",background:"rgba(39,174,96,0.05)",border:"1px solid rgba(39,174,96,0.14)",borderRadius:8}}>
                  <Mono color={C.green} style={{display:"block",marginBottom:7,fontSize:9}}>What this framework gets right</Mono>
                  <p style={{fontFamily:serif,fontSize:13,lineHeight:1.75,color:"rgba(255,255,255,0.68)",margin:0}}>{to.strength}</p>
                </div>
                <div style={{padding:"16px",background:"rgba(192,57,43,0.05)",border:"1px solid rgba(192,57,43,0.14)",borderRadius:8}}>
                  <Mono color={C.red} style={{display:"block",marginBottom:7,fontSize:9}}>Where this framework breaks down</Mono>
                  <p style={{fontFamily:serif,fontSize:13,lineHeight:1.75,color:"rgba(255,255,255,0.68)",margin:0}}>{to.limit}</p>
                </div>
              </div>
            </AnimIn>
            <AnimIn delay={180}>
              <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:"20px",marginBottom:24}}>
                <Mono style={{display:"block",marginBottom:12,fontSize:9}}>Commission Record — Responsibility Allocation</Mono>
                {scenario.rulingCategories.map((cat,i)=>(
                  <div key={cat.id} style={{marginBottom:9,animation:`fadeUp 0.4s ${i*55}ms both`}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <div style={{fontFamily:serif,fontSize:12,color:"rgba(255,255,255,0.58)"}}>{cat.label}</div>
                      <div style={{fontFamily:serif,fontSize:13,color:cat.color}}>{rulings[cat.id]??0}</div>
                    </div>
                    <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
                      <div style={{"--w":`${rulings[cat.id]??0}%`,width:`${rulings[cat.id]??0}%`,height:"100%",background:cat.color,borderRadius:2,animation:"fillBar 0.8s ease both"}}/>
                    </div>
                  </div>
                ))}
              </div>
            </AnimIn>
            <AnimIn delay={270}>
              <div style={{fontFamily:serif,fontStyle:"italic",fontSize:13,color:C.inkMute,lineHeight:1.9,borderLeft:"2px solid rgba(255,255,255,0.08)",paddingLeft:16,marginBottom:32}}>
                The schools of thought most consistent with your implicit framework: <span style={{color:to.color}}>{to.camps.join(", ")}</span>. There is no neutral position when an AI system causes harm. The question is not whether you hold a theory of AI — it is whether you hold it consciously.
              </div>
              <div style={{display:"flex",gap:12}}>
                <button onClick={onHearAnother} style={{background:C.indigo,color:"#fff",border:"none",borderRadius:"9999px",padding:"11px 26px",fontSize:13,fontFamily:serif,cursor:"pointer",letterSpacing:"0.03em",transition:"background 0.2s"}} onMouseEnter={e=>e.target.style.background=C.indigoDeep} onMouseLeave={e=>e.target.style.background=C.indigo}>
                  Hear Another Case
                </button>
                <button onClick={()=>window.location.reload()} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.4)",borderRadius:"9999px",padding:"11px 22px",fontSize:11,fontFamily:mono,cursor:"pointer",letterSpacing:"0.1em",textTransform:"uppercase",transition:"all 0.2s"}} onMouseEnter={e=>{e.target.style.borderColor="rgba(255,255,255,0.28)";e.target.style.color="rgba(255,255,255,0.7)";}} onMouseLeave={e=>{e.target.style.borderColor="rgba(255,255,255,0.12)";e.target.style.color="rgba(255,255,255,0.4)";}}>
                  Start Over
                </button>
              </div>
            </AnimIn>
          </>
        )}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase]       = useState("docket");
  const [scenario, setScenario] = useState(null);
  const [convos, setConvos]     = useState([]);
  const [rulings, setRulings]   = useState(null);
  const [policy, setPolicy]     = useState(null);
  const [key, setKey]           = useState(0);

  function go(next, fn) { fn?.(); setKey(k=>k+1); setPhase(next); }

  return (
    <div style={{minHeight:"100vh",background:C.navyDark,color:C.canvas,fontFamily:"Georgia,serif",position:"relative"}}>
      <style>{CSS}</style>
      <AtmoBG/>
      <div key={key} style={{position:"relative",zIndex:1}}>
        {phase==="docket"        && <DocketScreen       onSelect={s=>go("intro",()=>setScenario(s))}/>}
        {phase==="intro"         && <IntroScreen        scenario={scenario} onStart={()=>go("investigation")} onBack={()=>go("docket")}/>}
        {phase==="investigation" && <InvestigationScreen scenario={scenario} onComplete={c=>go("ruling",()=>setConvos(c))}/>}
        {phase==="ruling"        && <RulingScreen        scenario={scenario} convos={convos} onComplete={(r,p)=>go("consequence",()=>{setRulings(r);setPolicy(p);})}/>}
        {phase==="consequence"   && <ConsequenceScreen   scenario={scenario} policy={policy} onContinue={()=>go("verdict")}/>}
        {phase==="verdict"       && <VerdictScreen       scenario={scenario} rulings={rulings} policy={policy} convos={convos} onHearAnother={()=>go("docket",()=>{ setScenario(null);setConvos([]);setRulings(null);setPolicy(null); })}/>}
      </div>
    </div>
  );
}
