(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/formatDate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatRelativeTime",
    ()=>formatRelativeTime,
    "formatTime",
    ()=>formatTime,
    "getDDay",
    ()=>getDDay
]);
const formatDate = (dateString)=>{
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};
const formatDateTime = (dateString)=>{
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};
const formatRelativeTime = (dateString)=>{
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return '방금 전';
    if (diff < 3600) return "".concat(Math.floor(diff / 60), "분 전");
    if (diff < 86400) return "".concat(Math.floor(diff / 3600), "시간 전");
    if (diff < 2592000) return "".concat(Math.floor(diff / 86400), "일 전");
    return formatDate(dateString);
};
const getDDay = (dateString)=>{
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateString);
    target.setHours(0, 0, 0, 0);
    return Math.floor((target.getTime() - today.getTime()) / 86400000);
};
const formatTime = (seconds)=>{
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return "".concat(String(m).padStart(2, '0'), ":").concat(String(s).padStart(2, '0'));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/mate/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MatePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/formatDate.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const K = {
    home: "\ud648",
    mate: "\uba54\uc774\ud2b8",
    mateBoard: "\uba54\uc774\ud2b8 \ubaa8\uc9d1",
    all: "\uc804\uccb4",
    open: "\ubaa8\uc9d1 \uc911",
    openCompact: "\ubaa8\uc9d1\uc911",
    closed: "\ub9c8\uac10",
    comment: "\ub313\uae00",
    mine: "\ub0b4 \uae00",
    pinned: "\uace0\uc815",
    statusLabel: "\ubaa8\uc9d1 \uc0c1\ud0dc",
    currentOpen: "\ud604\uc7ac \ubaa8\uc9d1 \uc911",
    todayPost: "\uc624\ub298 \uc0c8 \uae00",
    totalMatched: "\ub204\uc801 \uc131\uc0ac",
    search: "\ubaa8\uc9d1 \uae00 \uac80\uc0c9",
    myStatus: "\ub0b4 \ubaa8\uc9d1 \ud604\ud669",
    write: "+ \uba54\uc774\ud2b8 \ubaa8\uc9d1 \uae00\uc4f0\uae30",
    filter: "\ud544\ud130",
    reset: "\ucd08\uae30\ud654",
    location: "\uc9c0\uc810",
    level: "\uacbd\ud5d8 \ub808\ubca8",
    tag: "\ubd84\uc704\uae30 \ud0dc\uadf8",
    any: "\ubb34\uad00",
    anyUser: "\ubb34\uad00 (\ub204\uad6c\ub098)",
    beginner: "\uc785\ubb38\uc790 \ud658\uc601",
    intermediate: "\uc911\uae09\uc790 \uc6b0\ub300",
    expert: "\uacbd\ud5d8\uc790 \uc6b0\ub300",
    noticeTitle: "\ubaa8\uc9d1 \uc54c\ub9ac\ubbf8",
    notice: "\uc2e0\uccad \ud6c4 \uc5f0\ub77d\uc774 \uc5c6\ub294 \uacbd\uc6b0 \ucc38\uc5ec\uac00 \uc81c\ud55c\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ucc38\uc5ec\uac00 \uc5b4\ub824\uc6cc\uc9c0\uba74 \ubaa8\uc9d1 \uc0c1\ud0dc\ub97c \ub9c8\uac10\uc73c\ub85c \ubcc0\uacbd\ud574\uc8fc\uc138\uc694.",
    joined: "\ucc38\uc5ec/\ubaa8\uc9d1",
    countSuffix: "\uac1c\uc758 \ubaa8\uc9d1 \uae00",
    noResult: "\uc870\uac74\uc5d0 \ub9de\ub294 \ubaa8\uc9d1 \uae00\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.",
    participants: "\ucc38\uc5ec \ud604\ud669",
    people: "\uba85",
    left: "\uc790\ub9ac \ub0a8\uc74c",
    complete: "\ubaa8\uc9d1 \uc644\ub8cc",
    headline: "\ud63c\uc790 \uac00\uae30 \ubb34\uc11c\uc6b4 \ud14c\ub9c8\ub3c4 \uba54\uc774\ud2b8\uc640 \ud568\uaed8\ub77c\uba74 \ub354 \uc990\uac70\uc6cc\uc838\uc694.",
    subline: "\uc6d0\ud558\ub294 \ud14c\ub9c8, \ub0a0\uc9dc, \ubd84\uc704\uae30\uc5d0 \ub9de\ub294 \ud30c\ud2f0\ub97c \ucc3e\uc544\ubcf4\uc138\uc694."
};
const L = {
    gangnam: "\uac15\ub0a8\uc810",
    hongdae: "\ud64d\ub300\uc810",
    geondae: "\uac74\ub300\uc810"
};
const T = {
    serious: "\uc9c4\uc9c0\ud558\uac8c",
    fun: "\uc990\uac81\uac8c",
    strategy: "\uacf5\ub7b5 \uc704\uc8fc",
    mood: "\ubd84\uc704\uae30 \uc704\uc8fc",
    first: "\ucc98\uc74c \ub9cc\ub09c \ud32c\ud140",
    women: "\uc5ec\uc131\ub9cc",
    photo: "\uc0ac\uc9c4 \ucd2c\uc601"
};
const MOCK_POSTS = [
    {
        id: 1,
        title: "\uc774\ubc88 \uc8fc\ub9d0 \uac15\ub0a8\uc810 \uccb4\ubc8c\ub9b0 \uac19\uc774 \uac00\uc2e4 \ubd84?",
        content: "\uc9c4\uc9c0\ud558\uac8c \uacf5\ub7b5\ud558\uae30\ubcf4\ub2e4 \ubd84\uc704\uae30\ub97c \uc990\uae30\uba70 \ud50c\ub808\uc774\ud558\uace0 \uc2f6\uc5b4\uc694.",
        authorId: 1,
        authorNickname: "\uae40\uacf5\ud3ec",
        locationName: L.gangnam,
        themeTitle: "\uccb4\ubc8c\ub9b0",
        playDate: "2026-05-31",
        reservationTime: "18:30",
        deadlineDate: "2026-05-29",
        currentMembers: 2,
        totalMembers: 3,
        experienceLevel: "ANY",
        atmosphereTags: [
            T.serious,
            T.fun
        ],
        contactMethod: "KAKAO",
        status: "OPEN",
        isPinned: true,
        commentCount: 5,
        createdAt: "2026-05-25T18:30:00"
    },
    {
        id: 2,
        title: "\uac74\ub300\uc810 \uc545\ub9c8\uc758 \uc81c\ub2e8 \uace0\uc218 2\uba85 \uad6c\ud569\ub2c8\ub2e4",
        content: "\ubc29\ud0c8\ucd9c 20\ud68c \uc774\uc0c1, \uacf5\ud3ec \uc704\uc8fc\ub85c \uc9c4\ud589\ud560 \ubd84 \ubaa8\uc9d1\ud569\ub2c8\ub2e4.",
        authorId: 3,
        authorNickname: "\uc815\ubc30\uad00",
        locationName: L.geondae,
        themeTitle: "\uc545\ub9c8\uc758 \uc81c\ub2e8",
        playDate: "2026-05-31",
        reservationTime: "19:00",
        deadlineDate: "2026-05-30",
        currentMembers: 1,
        totalMembers: 3,
        experienceLevel: "EXPERT",
        atmosphereTags: [
            T.strategy,
            T.serious
        ],
        contactMethod: "KAKAO",
        status: "OPEN",
        commentCount: 18,
        createdAt: "2026-05-24T12:00:00"
    },
    {
        id: 3,
        title: "\uac15\ub0a8\uc810 \uccb4\ubc8c\ub9b0 \uc77c\uc694\uc77c \uc800\ub141 4\uc778 \ubaa8\uc9d1",
        content: "\uc7ac\ubbf8 \uc704\uc8fc\ub85c \ud3b8\ud558\uac8c \uc990\uae30\uace0 \uc2f6\uc5b4\uc694.",
        authorId: 4,
        authorNickname: "\ud55c\uc6b8\uc11c\uc6b8",
        locationName: L.gangnam,
        themeTitle: "\uccb4\ubc8c\ub9b0",
        playDate: "2026-05-30",
        reservationTime: "20:00",
        deadlineDate: "2026-05-29",
        currentMembers: 2,
        totalMembers: 4,
        experienceLevel: "INTERMEDIATE",
        atmosphereTags: [
            T.fun,
            T.mood
        ],
        contactMethod: "KAKAO",
        status: "OPEN",
        commentCount: 3,
        createdAt: "2026-05-24T09:00:00"
    },
    {
        id: 4,
        title: "\ud64d\ub300\uc810 \uc800\uc8fc\ubc1b\uc740 \uc220 \uc8fc\ub9d0 \uc624\uc804 \uccab \ubaa8\uc9d1",
        content: "\uc0ac\uc9c4 \ucc0d\uace0 \uac00\ubccd\uac8c \uc990\uae30\ub294 \ubd84 \ud658\uc601\ud574\uc694.",
        authorId: 5,
        authorNickname: "\uadf8\ub85c\ud1a0",
        locationName: L.hongdae,
        themeTitle: "\uc800\uc8fc\ubc1b\uc740 \uc220",
        playDate: "2026-05-30",
        reservationTime: "10:30",
        deadlineDate: "2026-05-29",
        currentMembers: 3,
        totalMembers: 4,
        experienceLevel: "BEGINNER",
        atmosphereTags: [
            T.fun,
            T.mood,
            T.photo
        ],
        contactMethod: "KAKAO",
        status: "OPEN",
        commentCount: 7,
        createdAt: "2026-05-23T16:00:00"
    },
    {
        id: 5,
        title: "\uac74\ub300\uc810 \uc545\ub9c8\uc758 \ubcd1\uc6d0 \uccab \ubc29\ud0c8\uc744 \ub3c4\uc804\ud574\uc694",
        content: "\ucd08\ubcf4\ub3c4 \ud3b8\ud558\uac8c \ud568\uaed8\ud560 \ubd84\ub4e4 \ucc3e\uc544\uc694.",
        authorId: 6,
        authorNickname: "\ub098\ub3c4\uc804\uc11c",
        locationName: L.geondae,
        themeTitle: "\uc545\ub9c8\uc758 \ubcd1\uc6d0",
        playDate: "2026-05-31",
        reservationTime: "14:00",
        deadlineDate: "2026-05-29",
        currentMembers: 4,
        totalMembers: 5,
        experienceLevel: "BEGINNER",
        atmosphereTags: [
            T.fun,
            T.first
        ],
        contactMethod: "COMMENT",
        status: "OPEN",
        commentCount: 2,
        createdAt: "2026-05-23T11:00:00"
    },
    {
        id: 6,
        title: "\uac15\ub0a8\uc810 \uc0b4\uc778\ub9c8\uc758 \ubc29 3\uc778 \ub531 1\uc790\ub9ac \ub0a8\uc558\uc5b4\uc694",
        content: "\ub09c\uc774\ub3c4\uac00 \ub192\uc544 \uacbd\ud5d8\uc790\uba74 \uc88b\uaca0\uc2b5\ub2c8\ub2e4.",
        authorId: 7,
        authorNickname: "\ucd5c\uae0d\ubc15",
        locationName: L.gangnam,
        themeTitle: "\uc0b4\uc778\ub9c8\uc758 \ubc29",
        playDate: "2026-05-27",
        reservationTime: "21:00",
        deadlineDate: "2026-05-26",
        currentMembers: 3,
        totalMembers: 3,
        experienceLevel: "EXPERT",
        atmosphereTags: [
            T.serious,
            T.strategy
        ],
        contactMethod: "KAKAO",
        status: "FULL",
        commentCount: 12,
        createdAt: "2026-05-22T21:00:00"
    },
    {
        id: 7,
        title: "\uc880\ube44 \uc544\ud3ec\uce7c\ub9bd\uc2a4 \uac19\uc774 \uac08 \uc0ac\ub78c",
        content: "\uacf5\ub7b5 \uacf5\uc720\ud558\uba70 \uc9c4\uc9c0\ud558\uac8c \ub3c4\uc804\ud560 \uc778\uc6d0\uc744 \ubaa8\uc2ed\ub2c8\ub2e4.",
        authorId: 8,
        authorNickname: "\uc774\ud65c\ub3d9",
        locationName: L.gangnam,
        themeTitle: "\uc880\ube44 \uc544\ud3ec\uce7c\ub9bd\uc2a4",
        playDate: "2026-06-01",
        reservationTime: "20:00",
        deadlineDate: "2026-05-31",
        currentMembers: 2,
        totalMembers: 4,
        experienceLevel: "EXPERT",
        atmosphereTags: [
            T.strategy,
            T.serious
        ],
        contactMethod: "KAKAO",
        status: "OPEN",
        commentCount: 4,
        createdAt: "2026-05-22T09:00:00"
    },
    {
        id: 8,
        title: "\ud64d\ub300\uc810 13\ubc88\uc9f8 \ubc29 \uc8fc\ub9d0 \ud3b8\ud558\uac8c \uc990\uae30\uc790",
        content: "\ucd08\ubcf4\ub3c4 \uad1c\ucc2e\uc2b5\ub2c8\ub2e4.",
        authorId: 9,
        authorNickname: "\ubc15\uacf5\ud3ec",
        locationName: L.hongdae,
        themeTitle: "13\ubc88\uc9f8 \ubc29",
        playDate: "2026-06-01",
        reservationTime: "19:00",
        deadlineDate: "2026-05-30",
        currentMembers: 1,
        totalMembers: 4,
        experienceLevel: "ANY",
        atmosphereTags: [
            T.fun,
            T.mood
        ],
        contactMethod: "COMMENT",
        status: "OPEN",
        commentCount: 1,
        createdAt: "2026-05-21T15:00:00"
    }
];
const AVATAR_COLORS = [
    "bg-[#e63946]",
    "bg-[#f39c12]",
    "bg-[#2ecc71]",
    "bg-[#3498db]",
    "bg-[#9b59b6]",
    "bg-[#e67e22]"
];
const ALL_TAGS = [
    T.serious,
    T.fun,
    T.strategy,
    T.mood,
    T.first,
    T.women,
    T.photo
];
const PER_PAGE = 6;
const STATUS_FILTER_OPTIONS = [
    {
        value: "all",
        label: K.all
    },
    {
        value: "OPEN",
        label: K.open
    },
    {
        value: "CLOSED",
        label: K.closed
    }
];
const BADGE_BASE = "inline-flex h-[18px] items-center rounded-md border px-1.5 text-[10px] font-bold leading-none";
const LOCATION_BADGE_CLS = "border-white/[0.09] bg-[#101010]/80 text-[#858585]";
const EXPERIENCE_MAP = {
    ANY: {
        label: K.any,
        cls: "border-white/[0.08] bg-[#101010]/70 text-[#777]"
    },
    BEGINNER: {
        label: K.beginner,
        cls: "border-[#2ecc71]/22 bg-[#101010]/80 text-[#79c99a]"
    },
    INTERMEDIATE: {
        label: K.intermediate,
        cls: "border-[#f39c12]/24 bg-[#101010]/80 text-[#d0a35c]"
    },
    EXPERT: {
        label: K.expert,
        cls: "border-[#7a3f35]/35 bg-[#151111]/80 text-[#b77a6b]"
    }
};
function getDDayLabel(dateStr) {
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDDay"])(dateStr);
    if (d < 0) return {
        text: K.closed,
        cls: "text-[#888]"
    };
    if (d === 0) return {
        text: "D-Day",
        cls: "text-[#e63946] font-bold"
    };
    return {
        text: "D-".concat(d),
        cls: "text-[#f39c12] font-bold"
    };
}
function MemberDots(param) {
    let { current, total } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center gap-1",
        children: Array.from({
            length: total
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: [
                    "h-2.5 w-2.5 rounded-full border",
                    i < current ? "border-[#e63946] bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.28)]" : "border-white/[0.14] bg-[#101010]"
                ].join(" ")
            }, i, false, {
                fileName: "[project]/src/app/mate/page.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/mate/page.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c = MemberDots;
function StatusDropdown(param) {
    let { value, onChange } = param;
    var _STATUS_FILTER_OPTIONS_find;
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _STATUS_FILTER_OPTIONS_find_label;
    const currentLabel = (_STATUS_FILTER_OPTIONS_find_label = (_STATUS_FILTER_OPTIONS_find = STATUS_FILTER_OPTIONS.find((option)=>option.value === value)) === null || _STATUS_FILTER_OPTIONS_find === void 0 ? void 0 : _STATUS_FILTER_OPTIONS_find.label) !== null && _STATUS_FILTER_OPTIONS_find_label !== void 0 ? _STATUS_FILTER_OPTIONS_find_label : K.open;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatusDropdown.useEffect": ()=>{
            const close = {
                "StatusDropdown.useEffect.close": (event)=>{
                    if (ref.current && !ref.current.contains(event.target)) setOpen(false);
                }
            }["StatusDropdown.useEffect.close"];
            document.addEventListener("pointerdown", close);
            return ({
                "StatusDropdown.useEffect": ()=>document.removeEventListener("pointerdown", close)
            })["StatusDropdown.useEffect"];
        }
    }["StatusDropdown.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative w-[124px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-haspopup": "listbox",
                "aria-expanded": open,
                onClick: ()=>setOpen((prev)=>!prev),
                onKeyDown: (event)=>{
                    if (event.key === "Escape") setOpen(false);
                },
                className: [
                    "flex h-9 w-full items-center justify-between rounded-xl border bg-[#101010] px-3 text-left text-sm font-bold text-[#f5f5f5] outline-none transition-all",
                    open ? "border-[#cc2222]/75 shadow-[0_0_18px_rgba(204,34,34,0.14)]" : "border-[#cc2222]/38 hover:border-[#cc2222]/65 hover:bg-[#cc2222]/8"
                ].join(" "),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: currentLabel
                    }, void 0, false, {
                        fileName: "[project]/src/app/mate/page.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: [
                            "ml-2 h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-[#ef5353] transition-transform",
                            open ? "rotate-180" : ""
                        ].join(" ")
                    }, void 0, false, {
                        fileName: "[project]/src/app/mate/page.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mate/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-[calc(100%+6px)] z-30 w-[124px] overflow-hidden rounded-xl border border-[#cc2222]/35 bg-[#101010] p-1 shadow-[0_18px_36px_rgba(0,0,0,0.42)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    role: "listbox",
                    "aria-label": K.statusLabel,
                    children: STATUS_FILTER_OPTIONS.map((option)=>{
                        const selected = value === option.value;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            role: "option",
                            "aria-selected": selected,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    onChange(option.value);
                                    setOpen(false);
                                },
                                className: [
                                    "flex h-9 w-full items-center justify-between rounded-[9px] px-3 text-left text-sm font-bold transition-colors",
                                    selected ? "bg-[#cc2222]/16 text-[#ef5353]" : "text-[#b8b8b8] hover:bg-[#cc2222]/8 hover:text-[#f2f2f2]"
                                ].join(" "),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: option.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 21
                                    }, this),
                                    selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-1.5 w-1.5 rounded-full bg-[#ef5353]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 141,
                                columnNumber: 19
                            }, this)
                        }, option.value, false, {
                            fileName: "[project]/src/app/mate/page.tsx",
                            lineNumber: 140,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/app/mate/page.tsx",
                    lineNumber: 136,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mate/page.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mate/page.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(StatusDropdown, "wl9VvfhnMVWQ+kCekFjcRPEi3/0=");
_c1 = StatusDropdown;
function PostCard(param) {
    let { post } = param;
    const avatarColor = AVATAR_COLORS[(post.authorId - 1) % AVATAR_COLORS.length];
    const exp = EXPERIENCE_MAP[post.experienceLevel];
    const isFull = post.status === "FULL" || post.status === "CLOSED" || post.currentMembers >= post.totalMembers;
    const remains = Math.max(post.totalMembers - post.currentMembers, 0);
    var _post_commentCount;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: "/mate/".concat(post.id),
        className: "block",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#171717]/92 shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-[#cc2222]/55 hover:bg-[#1b1b1b] hover:shadow-[0_18px_48px_rgba(204,34,34,0.13)]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: [
                                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                                            avatarColor
                                        ].join(" "),
                                        children: post.authorNickname[0]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mr-1 text-sm font-bold text-[#d8d8d8]",
                                        children: post.authorNickname
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this),
                                    post.isPinned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: [
                                            BADGE_BASE,
                                            "border-[#d7b46a]/22 bg-[#101010]/70 text-[#b99a5e]"
                                        ].join(" "),
                                        children: K.pinned
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 169,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: [
                                            BADGE_BASE,
                                            LOCATION_BADGE_CLS
                                        ].join(" "),
                                        children: post.locationName
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    post.experienceLevel !== "ANY" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: [
                                            BADGE_BASE,
                                            exp.cls
                                        ].join(" "),
                                        children: exp.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 171,
                                        columnNumber: 50
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: [
                                            BADGE_BASE,
                                            isFull ? "border-white/[0.06] bg-[#252525] text-[#777]" : "border-[#9f2b2b]/35 bg-[#a72a2a]/78 text-[#f3e8e8]"
                                        ].join(" "),
                                        children: isFull ? K.closed : K.openCompact
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mb-2 text-[16px] font-black leading-snug text-[#f5f5f5]",
                                children: post.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 flex flex-wrap gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-white/[0.07] bg-[#101010] px-2.5 py-1 text-xs text-[#777]",
                                        children: post.themeTitle
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this),
                                    post.atmosphereTags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "rounded-full border border-white/[0.07] bg-[#101010] px-2.5 py-1 text-xs text-[#747474]",
                                            children: tag
                                        }, tag, false, {
                                            fileName: "[project]/src/app/mate/page.tsx",
                                            lineNumber: 177,
                                            columnNumber: 61
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2 text-xs text-[#606060]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            post.playDate,
                                            " ",
                                            post.reservationTime
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#444]",
                                        children: "·"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 66
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: post.locationName
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 111
                                    }, this),
                                    ((_post_commentCount = post.commentCount) !== null && _post_commentCount !== void 0 ? _post_commentCount : 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#444]",
                                                children: "·"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 181,
                                                columnNumber: 50
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    K.comment,
                                                    " ",
                                                    post.commentCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 181,
                                                columnNumber: 95
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    post.authorId === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#444]",
                                                children: "·"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 182,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded border border-[#e63946]/35 bg-[#101010] px-1.5 py-0.5 text-xs font-bold text-[#d56a6a]",
                                                children: K.mine
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 182,
                                                columnNumber: 86
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mate/page.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-[140px] shrink-0 flex-col p-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-1 flex-col items-center justify-center rounded-[10px] border border-white/[0.025] bg-white/[0.018] px-3 py-3 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-2 text-xs text-[#555]",
                                    children: K.participants
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/page.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: [
                                        "mt-1 whitespace-nowrap text-[22px] font-black leading-none",
                                        isFull ? "text-[#777]" : "text-[#f5f5f5]"
                                    ].join(" "),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: isFull ? "" : "text-[#e63946]",
                                            children: post.currentMembers
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/page.tsx",
                                            lineNumber: 188,
                                            columnNumber: 146
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mx-0.5 text-sm text-[#666]",
                                            children: "/"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/page.tsx",
                                            lineNumber: 188,
                                            columnNumber: 223
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-base text-[#a0a0a0]",
                                            children: post.totalMembers
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/page.tsx",
                                            lineNumber: 188,
                                            columnNumber: 276
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-0.5 text-xs text-[#777]",
                                            children: K.people
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/page.tsx",
                                            lineNumber: 188,
                                            columnNumber: 345
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mate/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemberDots, {
                                        current: post.currentMembers,
                                        total: post.totalMembers
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 39
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2.5 text-xs text-[#747474]",
                                    children: isFull ? K.complete : "".concat(remains).concat(K.left)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/page.tsx",
                                    lineNumber: 190,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mate/page.tsx",
                            lineNumber: 186,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/mate/page.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mate/page.tsx",
                lineNumber: 164,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mate/page.tsx",
            lineNumber: 163,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mate/page.tsx",
        lineNumber: 162,
        columnNumber: 5
    }, this);
}
_c2 = PostCard;
function MatePage() {
    _s1();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("OPEN");
    const [locationFilter, setLocationFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expFilter, setExpFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tagFilter, setTagFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MatePage.useMemo[filtered]": ()=>{
            let list = [
                ...MOCK_POSTS
            ];
            if (activeTab === "mine") list = list.filter({
                "MatePage.useMemo[filtered]": (p)=>p.authorId === 1
            }["MatePage.useMemo[filtered]"]);
            if (search) list = list.filter({
                "MatePage.useMemo[filtered]": (p)=>p.title.includes(search) || p.content.includes(search) || p.locationName.includes(search)
            }["MatePage.useMemo[filtered]"]);
            if (statusFilter === "OPEN") list = list.filter({
                "MatePage.useMemo[filtered]": (p)=>p.status === "OPEN" && p.currentMembers < p.totalMembers
            }["MatePage.useMemo[filtered]"]);
            if (statusFilter === "CLOSED") list = list.filter({
                "MatePage.useMemo[filtered]": (p)=>p.status === "FULL" || p.status === "CLOSED" || p.currentMembers >= p.totalMembers
            }["MatePage.useMemo[filtered]"]);
            if (locationFilter.length > 0) list = list.filter({
                "MatePage.useMemo[filtered]": (p)=>locationFilter.includes(p.locationName)
            }["MatePage.useMemo[filtered]"]);
            if (expFilter) list = list.filter({
                "MatePage.useMemo[filtered]": (p)=>p.experienceLevel === expFilter
            }["MatePage.useMemo[filtered]"]);
            if (tagFilter.length > 0) list = list.filter({
                "MatePage.useMemo[filtered]": (p)=>tagFilter.every({
                        "MatePage.useMemo[filtered]": (t)=>p.atmosphereTags.includes(t)
                    }["MatePage.useMemo[filtered]"])
            }["MatePage.useMemo[filtered]"]);
            list.sort({
                "MatePage.useMemo[filtered]": (a, b)=>(b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)
            }["MatePage.useMemo[filtered]"]);
            return list;
        }
    }["MatePage.useMemo[filtered]"], [
        activeTab,
        search,
        statusFilter,
        locationFilter,
        expFilter,
        tagFilter
    ]);
    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const openCount = MOCK_POSTS.filter((p)=>p.status === "OPEN" && p.currentMembers < p.totalMembers).length;
    const toggleLocation = (loc)=>{
        setLocationFilter((prev)=>prev.includes(loc) ? prev.filter((item)=>item !== loc) : [
                ...prev,
                loc
            ]);
        setPage(1);
    };
    const toggleTag = (tag)=>{
        setTagFilter((prev)=>prev.includes(tag) ? prev.filter((item)=>item !== tag) : [
                ...prev,
                tag
            ]);
        setPage(1);
    };
    const resetFilters = ()=>{
        setLocationFilter([]);
        setExpFilter("");
        setTagFilter([]);
        setPage(1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0d0d0d] text-[#f5f5f5]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,34,34,0.14),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(204,34,34,0.08),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#101010_48%,#0d0d0d_100%)]"
            }, void 0, false, {
                fileName: "[project]/src/app/mate/page.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "mb-6 flex items-center gap-1.5 text-xs font-bold text-[#777]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "transition-colors hover:text-[#f5f5f5]",
                                children: K.home
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 232,
                                columnNumber: 87
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 232,
                                columnNumber: 168
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#f5f5f5]",
                                children: K.mateBoard
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 232,
                                columnNumber: 189
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mate/page.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-7 border-b border-white/[0.08] pb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-[10px] font-black tracking-[0.32em] text-[#cc2222]",
                                children: "// MATE RECRUITMENT"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-[34px] font-black leading-tight text-[#f5f5f5] md:text-[44px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "\ud83d\udd25"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 94
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#e63946]",
                                        children: K.mate
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 124
                                    }, this),
                                    " ",
                                    "\ubaa8\uc9d1"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 max-w-[620px] text-[14px] leading-6 text-[#a0a0a0]",
                                children: [
                                    K.headline,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 236,
                                        columnNumber: 94
                                    }, this),
                                    K.subline
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 grid max-w-[520px] grid-cols-3 gap-2.5",
                                children: [
                                    {
                                        value: openCount,
                                        label: K.currentOpen,
                                        color: "text-[#f39c12]"
                                    },
                                    {
                                        value: 8,
                                        label: K.todayPost,
                                        color: "text-[#2ecc71]"
                                    },
                                    {
                                        value: "1,247",
                                        label: K.totalMatched,
                                        color: "text-[#3498db]"
                                    }
                                ].map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-[12px] border border-white/[0.08] bg-[#101010]/64 px-3 py-3 text-center backdrop-blur",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: [
                                                    "text-xl font-black leading-none",
                                                    stat.color
                                                ].join(" "),
                                                children: stat.value
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 237,
                                                columnNumber: 412
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1.5 text-[11px] font-bold text-[#8a8a8a]",
                                                children: stat.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 237,
                                                columnNumber: 501
                                            }, this)
                                        ]
                                    }, stat.label, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 284
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mate/page.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-7 lg:grid-cols-[248px_1fr] lg:gap-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "hidden shrink-0 self-start rounded-[18px] border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur md:block lg:sticky lg:top-24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: search,
                                        onChange: (event)=>{
                                            setSearch(event.target.value);
                                            setPage(1);
                                        },
                                        placeholder: K.search,
                                        className: "mb-3 h-11 w-full rounded-[10px] border border-white/[0.1] bg-[#101010] px-3 text-sm font-semibold text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#cc2222]/80"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 rounded-[14px] border border-[#cc2222]/22 bg-[#101010]/22 p-3.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#b85a5a]",
                                                children: K.myStatus
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 99
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mb-1.5 line-clamp-2 text-sm font-bold leading-snug text-[#dedede]",
                                                children: MOCK_POSTS[0].title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 201
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs leading-relaxed text-[#858585]",
                                                children: [
                                                    getDDayLabel(MOCK_POSTS[0].deadlineDate).text,
                                                    " · ",
                                                    MOCK_POSTS[0].locationName,
                                                    " · ",
                                                    MOCK_POSTS[0].currentMembers,
                                                    "/",
                                                    MOCK_POSTS[0].totalMembers,
                                                    K.people,
                                                    " ",
                                                    K.open
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 307
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/mate/write",
                                        className: "mb-7 flex h-11 w-full items-center justify-center gap-1 rounded-[10px] border border-[#cc2222]/45 bg-[#cc2222]/10 text-sm font-black text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/16 hover:text-white hover:shadow-[0_0_20px_rgba(204,34,34,0.14)]",
                                        children: K.write
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]",
                                                children: K.filter
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 69
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: resetFilters,
                                                className: "text-xs font-bold text-[#666] transition-colors hover:text-[#e63946]",
                                                children: K.reset
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 170
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mb-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#777]",
                                                children: K.location
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 245,
                                                columnNumber: 35
                                            }, this),
                                            [
                                                L.gangnam,
                                                L.hongdae,
                                                L.geondae
                                            ].map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "mb-1.5 mr-1.5 inline-flex h-9 cursor-pointer items-center justify-center rounded-full border border-white/[0.1] bg-[#101010] px-3 text-sm font-bold transition-all hover:border-white/20 hover:bg-[#202020] has-[:checked]:border-[#cc2222]/60 has-[:checked]:bg-[#cc2222]/12",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: locationFilter.includes(loc),
                                                            onChange: ()=>toggleLocation(loc),
                                                            className: "sr-only"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/page.tsx",
                                                            lineNumber: 245,
                                                            columnNumber: 481
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: locationFilter.includes(loc) ? "text-[#ef5353]" : "text-[#cfcfcf]",
                                                            children: loc
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/page.tsx",
                                                            lineNumber: 245,
                                                            columnNumber: 602
                                                        }, this)
                                                    ]
                                                }, loc, true, {
                                                    fileName: "[project]/src/app/mate/page.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 182
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mb-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#777]",
                                                children: K.level
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 246,
                                                columnNumber: 35
                                            }, this),
                                            [
                                                {
                                                    value: "",
                                                    label: K.anyUser
                                                },
                                                {
                                                    value: "BEGINNER",
                                                    label: K.beginner
                                                },
                                                {
                                                    value: "EXPERT",
                                                    label: K.expert
                                                }
                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "inline-flex cursor-pointer items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "exp",
                                                            checked: expFilter === opt.value,
                                                            onChange: ()=>{
                                                                setExpFilter(opt.value);
                                                                setPage(1);
                                                            },
                                                            className: "sr-only"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/page.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 334
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: [
                                                                "mb-1.5 mr-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all",
                                                                expFilter === opt.value ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]" : "border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]"
                                                            ].join(" "),
                                                            children: opt.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/page.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 479
                                                        }, this)
                                                    ]
                                                }, opt.value, true, {
                                                    fileName: "[project]/src/app/mate/page.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 259
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 246,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mb-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#777]",
                                                children: K.tag
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 247,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-1.5",
                                                children: ALL_TAGS.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>toggleTag(tag),
                                                        className: [
                                                            "rounded-full border px-2.5 py-1.5 text-xs font-bold transition-all",
                                                            tagFilter.includes(tag) ? "border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]" : "border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]"
                                                        ].join(" "),
                                                        children: tag
                                                    }, tag, false, {
                                                        fileName: "[project]/src/app/mate/page.tsx",
                                                        lineNumber: 247,
                                                        columnNumber: 175
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 247,
                                                columnNumber: 112
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex items-start gap-3 rounded-[12px] border border-[#d7b46a]/25 bg-[#d7b46a]/8 px-4 py-3 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex h-[20px] shrink-0 items-center rounded-md border border-[#d7b46a]/20 bg-transparent px-2 text-[10px] font-black text-[#c9a85f]",
                                                children: K.noticeTitle
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 250,
                                                columnNumber: 133
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-[2px] hidden text-[#d7b46a]/35 sm:block",
                                                children: "·"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 250,
                                                columnNumber: 312
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "leading-5 text-[#a9956e]",
                                                children: K.notice
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 250,
                                                columnNumber: 388
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex border-b border-white/[0.08]",
                                        children: [
                                            {
                                                id: "all",
                                                label: K.all,
                                                count: MOCK_POSTS.length
                                            },
                                            {
                                                id: "mine",
                                                label: K.joined,
                                                count: MOCK_POSTS.filter((p)=>p.authorId === 1).length
                                            }
                                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setActiveTab(tab.id);
                                                    setPage(1);
                                                },
                                                className: [
                                                    "flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold transition-colors",
                                                    activeTab === tab.id ? "border-b-2 border-[#cc2222] text-[#ef5353]" : "text-[#888] hover:text-[#f5f5f5]"
                                                ].join(" "),
                                                children: [
                                                    tab.label,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: [
                                                            "rounded-full px-1.5 py-0.5 text-xs",
                                                            activeTab === tab.id ? "bg-[#cc2222] text-white" : "bg-white/[0.08] text-[#888]"
                                                        ].join(" "),
                                                        children: tab.count
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mate/page.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 540
                                                    }, this)
                                                ]
                                            }, tab.id, true, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 248
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex items-center justify-between gap-4 rounded-[12px] border border-white/[0.08] bg-[#171717]/58 px-4 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-[#8f8f8f]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-[#f5f5f5]",
                                                        children: filtered.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mate/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 200
                                                    }, this),
                                                    K.countSuffix
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 252,
                                                columnNumber: 145
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusDropdown, {
                                                value: statusFilter,
                                                onChange: (nextValue)=>{
                                                    setStatusFilter(nextValue);
                                                    setPage(1);
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 252,
                                                columnNumber: 289
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2.5",
                                        children: [
                                            paged.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PostCard, {
                                                    post: post
                                                }, post.id, false, {
                                                    fileName: "[project]/src/app/mate/page.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 63
                                                }, this)),
                                            paged.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "py-16 text-center text-[#888]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: K.noResult
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/page.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 173
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 253,
                                                columnNumber: 126
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this),
                                    totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-8 flex items-center justify-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                                disabled: page === 1,
                                                className: "flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946] disabled:opacity-30",
                                                children: "<"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 93
                                            }, this),
                                            Array.from({
                                                length: totalPages
                                            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setPage(i + 1),
                                                    className: [
                                                        "flex h-8 w-8 items-center justify-center rounded border text-sm transition-colors",
                                                        page === i + 1 ? "border-[#e63946] bg-[#e63946]/10 text-[#e63946]" : "border-[#2a2a2a] text-[#888] hover:border-[#555]"
                                                    ].join(" "),
                                                    children: i + 1
                                                }, i, false, {
                                                    fileName: "[project]/src/app/mate/page.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 417
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPage((p)=>Math.min(totalPages, p + 1)),
                                                disabled: page === totalPages,
                                                className: "flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946] disabled:opacity-30",
                                                children: ">"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 711
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/page.tsx",
                                        lineNumber: 254,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mate/page.tsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mate/page.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mate/page.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mate/page.tsx",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
_s1(MatePage, "uLToNo1j8poI16Q7B94nGClyhj4=");
_c3 = MatePage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "MemberDots");
__turbopack_context__.k.register(_c1, "StatusDropdown");
__turbopack_context__.k.register(_c2, "PostCard");
__turbopack_context__.k.register(_c3, "MatePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_59b97025._.js.map