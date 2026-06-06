// Generiert calendar.ics – wird von GitHub Actions nach jeder Änderung an index.html automatisch ausgeführt
// Muster Jun–Aug: Di (Qualität) / Fr (Locker + Gym) / So (Long Run)

function ds(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function pd(s){ const[y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d); }
function p2(n){ return String(n).padStart(2,'0'); }
function icsD(d){ return d.getFullYear()+p2(d.getMonth()+1)+p2(d.getDate()); }
function icsDT(d,h,m=0){ return d.getFullYear()+p2(d.getMonth()+1)+p2(d.getDate())+'T'+p2(h)+p2(m)+'00'; }
function esc(s){ return (s||'').replace(/,/g,'\\,').replace(/;/g,'\\;'); }

const CFG = {
  race:{em:'🏆'},long:{em:'🔵'},tempo:{em:'⚡'},interval:{em:'💥'},
  medium:{em:'🟢'},easy:{em:'🌿'},strength:{em:'💪'},baseball:{em:'⚾'},
  recovery:{em:'💤'},taper:{em:'↘'},rest:{em:''},
};

const RACES = [
  {date:'2026-08-30',name:'Grafschaftslauf Rietberg',      dist:'28,5 km', cup:'ATRC #1',    url:'https://www.grafschaftslauf.de/web/', sh:7},
  {date:'2026-09-06',name:'Bochum Halbmarathon',           dist:'21,1 km', cup:'Rennen',     url:'',                                   sh:9},
  {date:'2026-09-09',name:'B2Run Köln',                    dist:'5 km',    cup:'Rennen',     url:'',                                   sh:19},
  {date:'2026-09-13',name:'City Move Bielefeld',           dist:'10 km',   cup:'ATRC #2',    url:'https://www.bielefeld.jetzt/run',    sh:9},
  {date:'2026-09-26',name:'Böckstiegellauf Werther',       dist:'18 km',   cup:'ATRC #3',    url:'https://www.boeckstiegellauf.de',    sh:9},
  {date:'2026-10-25',name:'DJK Halbmarathon Gütersloh',    dist:'21,1 km', cup:'ATRC #4',    url:'https://www.djkguetersloh.de',       sh:9},
  {date:'2026-12-13',name:'Weihnachts-Crosslauf',          dist:'16 km',   cup:'ATRC #5',    url:'https://www.lcsolbad.de',            sh:10},
  {date:'2027-03-07',name:'Luisenturmlauf Borgholzhausen', dist:'21,1 km', cup:'ATRC #6',    url:'https://www.lcsolbad.de',            sh:10},
  {date:'2027-04-25',name:'Hermannslauf Detmold–Bielefeld',dist:'31,1 km', cup:'ATRC #7 🔥', url:'https://www.hermannslauf.de',        sh:9},
  {date:'2027-05-22',name:'RENNSTEIGLAUF SUPERMARATHON',   dist:'73,9 km', cup:'🏆 HAUPTZIEL',url:'https://www.rennsteiglauf.de',     sh:7},
];
const raceMap = new Map(RACES.map(r=>[r.date,r]));

const PLAN = {
  // KW23 (Jun 1–7) – Einstieg
  '2026-06-06':{y:'easy',    short:'8km · 6:20',    full:'Locker 8 km',           detail:'6:15–6:30/km · Regeneration'},
  // KW24 (Jun 8–14) – Di / Fr / So
  '2026-06-09':{y:'interval',short:'6×800m @ 4:40', full:'Intervalle 6×800m',     detail:'@ 4:40/km'},
  '2026-06-12':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km'},
  '2026-06-14':{y:'long',    short:'14km · 6:15',   full:'Long Run 14 km',        detail:'6:15/km'},
  // KW25 (Jun 15–21) – Di / Fr / So
  '2026-06-16':{y:'tempo',   short:'8km · 5:35',    full:'Tempodauerlauf 8 km',   detail:'5:35/km'},
  '2026-06-19':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km'},
  '2026-06-21':{y:'long',    short:'16km · 6:20',   full:'Long Run 16 km',        detail:'6:20/km'},
  // KW26 (Jun 22–28) – Di / Fr / Sa  ⚾ Spiel So 11h → Long Run Sa
  '2026-06-23':{y:'interval',short:'5×1km @ 4:40',  full:'Intervalle 5×1.000m',   detail:'@ 4:40/km'},
  '2026-06-26':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km'},
  '2026-06-27':{y:'long',    short:'18km · 6:20',   full:'Long Run 18 km',        detail:'6:20/km · ⚾ Spiel ab 16:30h'},
  // KW27 (Jun 29 – Jul 5) – Di / Fr / So
  '2026-06-30':{y:'medium',  short:'12km · 6:20',   full:'GA1 12 km',             detail:'6:20/km'},
  '2026-07-03':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km'},
  '2026-07-05':{y:'long',    short:'20km · 6:20',   full:'Long Run 20 km',        detail:'6:20/km'},
  // KW28 (Jul 6–12) – Di / Fr / So  ⚾ Spiel So 13:30h → Morgenrun OK
  '2026-07-07':{y:'tempo',   short:'10km · 5:30',   full:'Tempodauerlauf 10 km',  detail:'5:30/km'},
  '2026-07-10':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km'},
  '2026-07-12':{y:'long',    short:'22km · 6:20',   full:'Long Run 22 km',        detail:'6:20/km · früh starten · ⚾ 13:30h'},
  // KW29 (Jul 13–19) – Di / Fr / So
  '2026-07-14':{y:'interval',short:'6×1km @ 4:40',  full:'Intervalle 6×1.000m',   detail:'@ 4:40/km'},
  '2026-07-17':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km'},
  '2026-07-19':{y:'long',    short:'24km · 6:20',   full:'Long Run 24 km',        detail:'6:20/km'},
  // KW30 (Jul 20–26) – Di / Fr / Sa  ⚾ Spiel So 10:30h → Long Run Sa
  '2026-07-21':{y:'medium',  short:'12km · 6:20',   full:'GA1 12 km',             detail:'6:20/km'},
  '2026-07-24':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km'},
  '2026-07-25':{y:'long',    short:'26km · 6:20',   full:'Long Run 26 km',        detail:'6:20/km · ⚾ Spiel So'},
  // KW31 (Jul 27 – Aug 2) – Di / Fr / So (Entlastungswoche)
  '2026-07-28':{y:'tempo',   short:'8km · 5:35',    full:'Tempodauerlauf 8 km',   detail:'5:35/km · Entlastung'},
  '2026-07-31':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km · Entlastung'},
  '2026-08-02':{y:'long',    short:'20km · 6:30',   full:'Long Run 20 km',        detail:'6:30/km · Entlastung'},
  // KW32 (Aug 3–9) – Di / Fr / So
  '2026-08-04':{y:'interval',short:'6×1km @ 4:40',  full:'Intervalle 6×1.000m',   detail:'@ 4:40/km'},
  '2026-08-07':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km'},
  '2026-08-09':{y:'long',    short:'24km · 6:20',   full:'Long Run 24 km',        detail:'6:20/km'},
  // KW33 (Aug 10–16) – Di / Fr / So
  '2026-08-11':{y:'medium',  short:'12km · 6:20',   full:'GA1 12 km',             detail:'6:20/km'},
  '2026-08-14':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km'},
  '2026-08-16':{y:'long',    short:'26km · 6:20',   full:'Long Run 26 km',        detail:'6:20/km'},
  // KW34 – Taper 1 (Di / Fr / So)
  '2026-08-18':{y:'taper',   short:'8km locker',    full:'Taper 8 km',            detail:'7:00/km'},
  '2026-08-21':{y:'taper',   short:'6km locker',    full:'Taper 6 km',            detail:'7:00/km'},
  '2026-08-23':{y:'taper',   short:'12km · 6:00',   full:'Taper 12 km',           detail:'6:00/km'},
  // KW35 – Race week Grafschaftslauf (Di / Fr / So=Rennen)
  '2026-08-25':{y:'taper',   short:'5km locker',    full:'Taper 5 km',            detail:'7:00/km'},
  '2026-08-28':{y:'taper',   short:'6km locker',    full:'Taper 6 km',            detail:'7:00/km'},
  // September Wettkampfblock
  '2026-09-01':{y:'recovery',short:'6km Regen.',    full:'Locker 6 km',           detail:'Regeneration nach Rennen'},
  '2026-09-03':{y:'recovery',short:'8km Regen.',    full:'Locker 8 km',           detail:'Regeneration'},
  '2026-09-05':{y:'easy',    short:'4km locker',    full:'Locker 4 km',           detail:'Einlaufen vor Rennen'},
  '2026-09-08':{y:'recovery',short:'5km Regen.',    full:'Locker 5 km',           detail:'Regeneration'},
  '2026-09-10':{y:'recovery',short:'6km Regen.',    full:'Locker 6 km',           detail:'Regeneration'},
  '2026-09-15':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'Regeneration'},
  '2026-09-17':{y:'medium',  short:'10km · 6:10',   full:'GA1 10 km',             detail:'6:10/km'},
  '2026-09-20':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:'6:30/km'},
  '2026-09-29':{y:'recovery',short:'8km Regen.',    full:'Locker 8 km',           detail:'Regeneration nach Rennen'},
  '2026-10-01':{y:'medium',  short:'10km · 6:10',   full:'GA1 10 km',             detail:'6:10/km'},
  '2026-10-04':{y:'long',    short:'12km · 6:20',   full:'Long Run 12 km',        detail:'6:20/km'},
  // Winterblock Schlüsselläufe
  '2027-01-17':{y:'long',    short:'⭐ 35km · 7:00', full:'Long Run 35 km',        detail:'7:00/km – Schlüssellauf Januar'},
  '2027-02-07':{y:'long',    short:'⭐ 40km · 7:00', full:'Long Run 40 km',        detail:'7:00/km – Schlüssellauf Februar'},
  '2026-12-24':{y:'rest',    short:'',              full:'Heiligabend',            detail:''},
  '2026-12-25':{y:'rest',    short:'',              full:'Weihnachten',            detail:''},
  '2026-12-31':{y:'easy',    short:'10km',          full:'Jahresabschluss 10 km',  detail:'6:45/km'},
  '2027-01-01':{y:'rest',    short:'',              full:'Neujahr',                detail:''},
  '2027-03-14':{y:'interval',short:'8×3min Berg',   full:'Bergintervalle 8×3 min', detail:'Hügel, Puls Zone 4–5'},
  '2027-03-28':{y:'interval',short:'10×3min Berg',  full:'Bergintervalle 10×3 min',detail:'Hügel, Puls Zone 4–5'},
  '2027-04-05':{y:'long',    short:'32km · 7:00',   full:'Long Run 32 km',        detail:'7:00/km'},
  '2027-04-12':{y:'long',    short:'33km · 7:00',   full:'Long Run 33 km',        detail:'7:00/km'},
  '2027-04-27':{y:'recovery',short:'8km Regen.',    full:'Locker 8 km',           detail:'Regeneration nach Hermannslauf'},
  '2027-04-28':{y:'recovery',short:'6km Regen.',    full:'Locker 6 km',           detail:'Regeneration'},
  '2027-04-30':{y:'recovery',short:'8km locker',    full:'Locker 8 km',           detail:'Regeneration'},
  '2027-05-02':{y:'easy',    short:'10km locker',   full:'Locker 10 km',          detail:''},
  '2027-05-03':{y:'long',    short:'⭐ 45km · 6:30', full:'Long Run 45 km',        detail:'6:20–6:40/km – Hauptprobe!'},
  '2027-05-08':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:''},
  '2027-05-10':{y:'long',    short:'25km · 6:30',   full:'Long Run 25 km',        detail:'6:30/km'},
  '2027-05-13':{y:'easy',    short:'8km locker',    full:'Locker 8 km',           detail:''},
  '2027-05-15':{y:'taper',   short:'15km locker',   full:'Taper 15 km',           detail:'6:30/km'},
  '2027-05-17':{y:'taper',   short:'10km locker',   full:'Taper 10 km',           detail:'6:45/km'},
  '2027-05-19':{y:'taper',   short:'6km locker',    full:'Taper 6 km',            detail:'7:00/km'},
  '2027-05-21':{y:'taper',   short:'5km locker',    full:'Taper 5 km',            detail:'7:00/km · Tag vor dem Rennen'},
};

function fillWeek(start, end, tmpl){
  for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)){
    const s=ds(d);
    if(PLAN[s]||raceMap.has(s)) continue;
    const act=tmpl[d.getDay()];
    if(act) PLAN[s]={...act};
  }
}

function buildPlan(){
  fillWeek(new Date(2026,9,5), new Date(2026,9,24), {
    2:{y:'tempo', short:'9km · 5:35',  full:'Tempodauerlauf 9 km',  detail:'5:30–5:40/km'},
    5:{y:'tempo', short:'8km · 5:40',  full:'Tempodauerlauf 8 km',  detail:'5:30–5:40/km'},
    0:{y:'long',  short:'22km · 6:20', full:'Long Run 22 km',       detail:'6:20/km'},
  });
  fillWeek(new Date(2026,10,1), new Date(2027,1,28), {
    2:{y:'easy',  short:'12km locker', full:'Locker 12 km',          detail:'6:30/km'},
    4:{y:'tempo', short:'10km · 5:35', full:'Tempodauerlauf 10 km',  detail:'5:30–5:40/km'},
    6:{y:'easy',  short:'10km locker', full:'Locker 10 km',          detail:'6:30/km'},
    0:{y:'long',  short:'26km · 6:45', full:'Long Run 26 km',        detail:'6:30–7:00/km'},
  });
  fillWeek(new Date(2027,2,8), new Date(2027,2,31), {
    2:{y:'easy',  short:'12km locker', full:'Locker 12 km',          detail:'6:30/km'},
    4:{y:'tempo', short:'10km · 5:30', full:'Tempo 10 km',           detail:'5:30/km'},
    6:{y:'easy',  short:'10km locker', full:'Locker 10 km',          detail:'6:30/km'},
    0:{y:'long',  short:'30km · 7:00', full:'Long Run 30 km',        detail:'7:00/km'},
  });
  fillWeek(new Date(2027,3,1), new Date(2027,3,24), {
    2:{y:'easy',  short:'12km locker', full:'Locker 12 km',          detail:'6:30/km'},
    4:{y:'tempo', short:'10km · 5:30', full:'Tempo 10 km',           detail:'5:30/km'},
    6:{y:'easy',  short:'10km locker', full:'Locker 10 km',          detail:'6:30/km'},
  });
}

const BB = {
  '2026-06-08':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-06-11':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
  '2026-06-13':{g:true, short:'13:30–16:30h',full:'Spiel: Marl Sly Dogs',             detail:'Otto-Hue-Str. 1, Marl'},
  '2026-06-15':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-06-18':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
  '2026-06-22':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-06-25':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
  '2026-06-27':{g:true, short:'16:30–19:30h',full:'Spiel: Untouchables Paderborn',    detail:'Ahornallee 20, Paderborn'},
  '2026-06-28':{g:true, short:'11–14h',      full:'Spiel: Paderborn (2)',              detail:'Ahornallee 20, Paderborn'},
  '2026-06-29':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-07-02':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
  '2026-07-06':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-07-09':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
  '2026-07-12':{g:true, short:'13:30–16:30h',full:'Spiel: Bochum Barflys',            detail:'Anemonenweg 16, Bochum'},
  '2026-07-13':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-07-16':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
  '2026-07-18':{g:true, short:'07:30–10:30h',full:'Spiel: Rheine Mavericks (Heim)',   detail:'Kirchderner Str. 35-43, Dortmund'},
  '2026-07-20':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-07-23':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
  '2026-07-26':{g:true, short:'10:30–13:30h',full:'Spiel: Minden Millers (Heim)',     detail:'Kirchderner Str. 35-43, Dortmund'},
  '2026-07-27':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-07-30':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
  '2026-08-03':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-08-06':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
  '2026-08-10':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-08-13':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
  '2026-08-17':{g:false,short:'19–21h',      full:'Baseball Training H1+H2',          detail:'Kirchderner Str. 35, Dortmund'},
  '2026-08-20':{g:false,short:'19–21h',      full:'Baseball 1H Training',              detail:'Hahnenmühlenweg, Dortmund'},
};

const STR = {};

function buildStrength(){
  let toggle = 0;
  const TAPER_START = new Date(2027,3,20);
  const end         = new Date(2027,4,20);
  const firstMon = new Date(2026,5,1);
  firstMon.setDate(firstMon.getDate() - (firstMon.getDay()+6)%7);

  for(let ws=new Date(firstMon); ws<=end; ws.setDate(ws.getDate()+7)){
    const isTaper = ws >= TAPER_START;
    const maxSt   = isTaper ? 1 : 2;
    const cands=[];
    for(let i=0;i<7;i++){
      const d=new Date(ws); d.setDate(d.getDate()+i);
      const s=ds(d);
      if(raceMap.has(s)) continue;
      const prev=new Date(d); prev.setDate(prev.getDate()-1);
      const next=new Date(d); next.setDate(next.getDate()+1);
      if(raceMap.has(ds(prev))||raceMap.has(ds(next))) continue;
      const act=PLAN[s], bb=BB[s];
      if(bb&&bb.g) continue;
      if(act&&['long','tempo','interval','recovery'].includes(act.y)) continue;
      let prio = 3;
      if(act){ if(act.y==='easy') prio=0; else if(act.y==='medium') prio=1; else if(act.y==='taper') prio=2; }
      cands.push({s, prio, hasBb:!!bb});
    }
    cands.sort((a,b)=> a.prio-b.prio || (a.hasBb?1:0)-(b.hasBb?1:0));
    for(const {s} of cands.slice(0, maxSt)){
      const up=toggle%2===0;
      STR[s]={
        type: up?'upper':'lower',
        short:'30–45 min',
        full: up?'Kraft Oberkörper':'Kraft Unterkörper',
        detail: up?'Liegestütze · Rudern · Schultern · Core (3×12)':'Squats · Lunges · Deadlift · Wadenheben (3×12)',
      };
      toggle++;
    }
  }
}

function buildIcsSummary(act){
  const sh = act.short||'';
  switch(act.y){
    case 'race':     { const r=act._race; return '🏆 '+(r?r.name+' · '+r.dist:act.full.replace(/🏆\s*/,'')); }
    case 'easy':     return '🌿 '+sh;
    case 'recovery': return '💤 '+sh;
    case 'long':     return '🔵 Long Run '+sh;
    case 'tempo':    return '⚡ Tempo '+sh;
    case 'interval': return '💥 '+sh;
    case 'medium':   return '🟢 GA1 '+sh;
    case 'strength': return (act.full.includes('Ober')?'💪 Oberkörper':'🦵 Unterkörper')+' · '+sh;
    case 'taper':    return '↘ '+sh;
    default:         return (CFG[act.y]?CFG[act.y].em+' ':'')+sh;
  }
}

function defaultAct(d){
  const s=ds(d);
  if(raceMap.has(s)){
    const r=raceMap.get(s);
    return {y:'race', short:r.dist, full:'🏆 '+r.name, detail:r.dist+' · '+r.cup, _race:r};
  }
  return PLAN[s] ? {...PLAN[s]} : null;
}

function makeIcs(){
  const L=[
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Trainingsplan Rennsteiglauf 2027//DE',
    'CALSCALE:GREGORIAN','METHOD:PUBLISH',
    'X-WR-CALNAME:🏔 Rennsteiglauf 2027',
    'X-WR-TIMEZONE:Europe/Berlin','X-APPLE-CALENDAR-COLOR:#6366F1',
  ];
  const s0=new Date(2026,5,1), s1=new Date(2027,4,23);
  let uid=1;

  for(let d=new Date(s0);d<=s1;d.setDate(d.getDate()+1)){
    const act = defaultAct(new Date(d));
    if(!act||act.y==='rest') continue;
    const ds2=icsD(d), nd=new Date(d); nd.setDate(nd.getDate()+1);
    if(act.y==='race'){
      const r=act._race||raceMap.get(ds(d));
      const sh=r?r.sh:8;
      const lines = ['BEGIN:VEVENT',`UID:race-${ds2}-${uid++}@tp2027`,
        `DTSTART;TZID=Europe/Berlin:${icsDT(d,sh)}`,
        `DTEND;TZID=Europe/Berlin:${icsDT(d,sh+4)}`,
        `SUMMARY:${esc(buildIcsSummary(act))}`,
        `DESCRIPTION:${esc(act.detail||'')}`,
        'CATEGORIES:Wettkampf','END:VEVENT'];
      if(r&&r.url) lines.splice(6,0,`URL:${r.url}`);
      L.push(...lines);
    } else {
      L.push('BEGIN:VEVENT',`UID:tr-${ds2}-${uid++}@tp2027`,
        `DTSTART;VALUE=DATE:${ds2}`,`DTEND;VALUE=DATE:${icsD(nd)}`,
        `SUMMARY:${esc(buildIcsSummary(act))}`,
        `DESCRIPTION:${esc(act.detail||'')}`,
        'CATEGORIES:Training','END:VEVENT');
    }
  }

  for(const [dateStr, st] of Object.entries(STR)){
    const d=pd(dateStr), ds2=icsD(d), nd=new Date(d); nd.setDate(nd.getDate()+1);
    L.push('BEGIN:VEVENT',`UID:str-${ds2}-${uid++}@tp2027`,
      `DTSTART;VALUE=DATE:${ds2}`,`DTEND;VALUE=DATE:${icsD(nd)}`,
      `SUMMARY:${esc((st.type==='upper'?'💪 Oberkörper':'🦵 Unterkörper')+' · '+st.short)}`,
      `DESCRIPTION:${esc(st.detail)}`,
      'CATEGORIES:Krafttraining','END:VEVENT');
  }

  for(const [dateStr, bb] of Object.entries(BB)){
    const d=pd(dateStr), ds2=icsD(d);
    const tm=bb.short.match(/^(\d+)(?::(\d+))?/);
    const sh=tm?parseInt(tm[1]):19, sm=tm&&tm[2]?parseInt(tm[2]):0;
    const em2=bb.short.match(/–(\d+)(?::(\d+))?h/);
    const eh=em2?parseInt(em2[1]):sh+2, emin=em2&&em2[2]?parseInt(em2[2]):0;
    const sum = bb.g
      ? '⚾🏟 Spiel: '+bb.full.replace(/^Spiel:\s*/,'')
      : '⚾ Baseball · '+bb.short;
    L.push('BEGIN:VEVENT',`UID:bb-${ds2}-${uid++}@tp2027`,
      `DTSTART;TZID=Europe/Berlin:${icsDT(d,sh,sm)}`,
      `DTEND;TZID=Europe/Berlin:${icsDT(d,eh,emin)}`,
      `SUMMARY:${esc(sum)}`,
      `DESCRIPTION:${esc(bb.detail)}`,
      'CATEGORIES:Baseball','END:VEVENT');
  }

  L.push('END:VCALENDAR');
  return L.join('\r\n');
}

// ─── MAIN ─────────────────────────────────────────────────────────────────
buildPlan();
buildStrength();

const ics = makeIcs();
const fs = require('fs');
fs.writeFileSync('calendar.ics', ics, 'utf8');

const events = (ics.match(/BEGIN:VEVENT/g)||[]).length;
const races    = (ics.match(/CATEGORIES:Wettkampf/g)||[]).length;
const training = (ics.match(/CATEGORIES:Training/g)||[]).length;
const kraft    = (ics.match(/CATEGORIES:Krafttraining/g)||[]).length;
const baseball = (ics.match(/CATEGORIES:Baseball/g)||[]).length;
console.log(`✅ calendar.ics: ${events} Events · 🏆 ${races} · 🏃 ${training} · 💪 ${kraft} · ⚾ ${baseball}`);
