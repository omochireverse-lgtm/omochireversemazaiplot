/* =========================================================
   Omotube 設定（ここだけ書き換えればOK）
   ========================================================= */
const OMOTUBE = {
  // Apps Scriptを公開したときのURL（https://script.google.com/macros/s/.../exec）
  API_URL: "",

  // 「Omo」の文字色： "yaki" / "kinako" / "anko"
  LOGO: "anko",

  // 載せるネタ。上にあるほど一覧の先頭に出る。増やすときは1行足すだけ
  VIDEOS: [
    { id: "zFEvSMshRk4", title: "ゲームアプリ", note: "" },
    { id: "LWtTn9KPbGY", title: "エトギャラ", note: "" },
    // { id: "動画ID", title: "ネタの名前", note: "ひとこと説明（なくてもOK）" },
  ],
};

/* =========================================================
   ここから下は触らなくてOK
   ========================================================= */
const OMO_MARKS = {
  yaki: {
    word: "#b9622a", wordDark: "#e39a62",
    mark: '<path d="M19 14.5L30 20.5L19 26.5Z" fill="#c47a3a" stroke="#8a4a1c" stroke-width="1.6" stroke-linejoin="round"/>' +
          '<ellipse cx="22.2" cy="18.6" rx="1.6" ry="1.1" fill="#7a3e16" opacity=".75"/>' +
          '<ellipse cx="24.6" cy="22.6" rx="1.1" ry=".8" fill="#7a3e16" opacity=".6"/>' +
          '<ellipse cx="20.6" cy="23.4" rx=".8" ry=".6" fill="#7a3e16" opacity=".5"/>'
  },
  kinako: {
    word: "#b07e22", wordDark: "#e6c070",
    mark: '<path d="M19 14.5L30 20.5L19 26.5Z" fill="#e6bf6a" stroke="#c99a3c" stroke-width="1.6" stroke-linejoin="round"/>' +
          '<g fill="#b4832c"><circle cx="21" cy="17.5" r=".7"/><circle cx="23.6" cy="19.6" r=".6"/><circle cx="21.2" cy="21.6" r=".6"/>' +
          '<circle cx="26.2" cy="20.4" r=".6"/><circle cx="22.8" cy="23.7" r=".7"/><circle cx="20.4" cy="25" r=".5"/></g>'
  },
  anko: {
    word: "#5b262b", wordDark: "#d79aa0",
    mark: '<path d="M19 14.5L30 20.5L19 26.5Z" fill="#4b2226" stroke="#4b2226" stroke-width="1.6" stroke-linejoin="round"/>' +
          '<g fill="#7f3f46"><ellipse cx="21.4" cy="18.2" rx="1.1" ry=".8"/><ellipse cx="24.8" cy="20.8" rx="1" ry=".75"/>' +
          '<ellipse cx="21.2" cy="22.8" rx="1.1" ry=".8"/></g>' +
          '<ellipse cx="20.6" cy="16.6" rx=".8" ry=".45" fill="#fff" opacity=".35"/>'
  }
};

let omoLogoCount = 0;
const OMO_LOGO_TEMPLATE = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="230 175 620 720"> <g fill="#fff" stroke="#111" stroke-width="28" stroke-linejoin="round" stroke-linecap="round"> <path d="M400 246H680C735 262 767 305 767 355 767 405 735 445 680 458H400C345 445 313 405 313 355 313 305 345 262 400 246Z"/> <ellipse cx="540" cy="690" rx="129" ry="76"/> <rect x="354" y="451" width="372" height="160" rx="80"/> </g> <path d="M528 764C536 800 566 818 598 826" fill="none" stroke="#111" stroke-width="24" stroke-linecap="round"/> <path d="M528 778C474 772 448 812 442 868 494 862 534 834 538 792Z" fill="#111" stroke="#111" stroke-width="10" stroke-linejoin="round"/> <line x1="281" y1="223" x2="799" y2="223" stroke="#111" stroke-width="46" stroke-linecap="round"/> <g transform="translate(540 352)"> <path d="M-42 -56L66 0L-42 56Z" fill="#4b2226" stroke="#4b2226" stroke-width="22" stroke-linejoin="round"/> <g fill="#7f3f46"> <ellipse cx="-18" cy="-24" rx="11" ry="8"/> <ellipse cx="14" cy="4" rx="10" ry="7.5"/> <ellipse cx="-20" cy="22" rx="11" ry="8"/> </g> <ellipse cx="-30" cy="-40" rx="8" ry="4.5" fill="#fff" opacity=".35"/> </g> </svg>';
function omoLogoSVG(){
  // ひっくり返した鏡餅（上に三方、大餅、中餅、橙）に、あんこの再生マーク
  omoLogoCount++;
  return OMO_LOGO_TEMPLATE.replace(/__N/g, "_" + omoLogoCount);
}

function omoMountLogo(){
  const v = OMO_MARKS[OMOTUBE.LOGO] || OMO_MARKS.anko;
  document.documentElement.style.setProperty("--word", v.word);
  document.documentElement.style.setProperty("--word-dark", v.wordDark);
  document.querySelectorAll("[data-omo-logo]").forEach(el => { el.innerHTML = omoLogoSVG(OMOTUBE.LOGO); });
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = "data:image/svg+xml," + encodeURIComponent(omoLogoSVG().replace(' aria-hidden="true"', ""));
  document.head.appendChild(link);
}

const omoStore = {
  get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
};

function omoThumb(id){ return "https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/mqdefault.jpg"; }
