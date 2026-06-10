module.exports = [
"[project]/src/app/mypage/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const K = {
    home: "\ud648",
    mypage: "\ub9c8\uc774\ud398\uc774\uc9c0",
    reservation: "\uc608\uc57d",
    achievement: "\uc5c5\uc801",
    activity: "\ub0b4 \ud65c\ub3d9",
    titleLead: "\ub9c8\uc774",
    titleRest: "\ud398\uc774\uc9c0",
    subtitle: "\ub098\uc758 \uc608\uc57d \ud604\ud669\uacfc \uc608\uc57d \uae30\ub85d\uc744 \ud655\uc778\ud558\uc138\uc694.",
    name: "\uae40\uacf5\ud3ec",
    branch: "\uac15\ub0a8\uc810",
    gender: "\uc131\ubcc4 \uc5ec\uc790",
    age: "\ub098\uc774 24",
    totalPlay: "\ucd1d \ud50c\ub808\uc774",
    successRate: "\uc131\uacf5\ub960",
    bestClear: "\ucd5c\ub2e8 \ud074\ub9ac\uc5b4",
    achievements: "\ud68d\ub4dd \uc5c5\uc801",
    rankLabel: "\ud604\uc7ac \ub4f1\uae09",
    rank: "\uac15\uc2ec\uc7a5",
    topRank: "\uc0c1\uc704 25%",
    rankRule: "\uc131\uacf5\ub960 75% \uc774\uc0c1",
    upcoming: "\uc608\uc815\ub41c \uc608\uc57d",
    past: "\uc9c0\ub09c \uc608\uc57d",
    horror: "\uacf5\ud3ec\ub3c4",
    difficulty: "\ub09c\uc774\ub3c4",
    scheduled: "\uc608\uc815",
    cleared: "\ud074\ub9ac\uc5b4",
    failed: "\uc2e4\ud328",
    change: "\uc608\uc57d \ubcc0\uacbd",
    reviewView: "\ud6c4\uae30 \ubcf4\uae30",
    reviewWrite: "\ud6c4\uae30 \uc4f0\uae30",
    clearTime: "\ud074\ub9ac\uc5b4 \ud0c0\uc784",
    nextStep: "\ud0ed\uc740 \ub2e4\uc74c \ub2e8\uacc4\uc5d0\uc11c \uc815\ub9ac\ub429\ub2c8\ub2e4."
};
const TABS = [
    {
        key: "reservation",
        label: K.reservation
    },
    {
        key: "achievement",
        label: K.achievement
    },
    {
        key: "activity",
        label: K.activity
    }
];
const STATS = [
    {
        label: K.totalPlay,
        value: "12",
        accent: "text-[#f5f5f5]",
        icon: "\ud83c\udfae"
    },
    {
        label: K.successRate,
        value: "75%",
        accent: "text-[#2ecc71]",
        icon: "\ud83c\udfaf"
    },
    {
        label: K.bestClear,
        value: "38:24",
        accent: "text-[#3498db]",
        icon: "\u23f1"
    },
    {
        label: K.achievements,
        value: "17",
        accent: "text-[#b66ae0]",
        icon: "\ud83c\udfc6"
    }
];
const UPCOMING_RESERVATIONS = [
    {
        id: 1,
        themeTitle: "\ud3d0\ubcd1\uc6d0\uc758 \uc800\uc8fc",
        date: "2026-06-02",
        day: "\ud654",
        time: "20:00",
        location: K.branch,
        horrorLevel: 5,
        difficulty: 4,
        status: "upcoming",
        imageUrl: "/images/horror/%EC%A0%95%EC%A7%80.png"
    },
    {
        id: 2,
        themeTitle: "\ubb18\uc9c0\uc758 \uc800\uc8fc",
        date: "2026-06-17",
        day: "\uc218",
        time: "17:00",
        location: "\uc2e0\ucd0c\uc810",
        horrorLevel: 4,
        difficulty: 4,
        status: "upcoming",
        imageUrl: "/images/horror/theme-smoke.png",
        dday: "D-7"
    }
];
const PAST_RESERVATIONS = [
    {
        id: 3,
        themeTitle: "\uc880\ube44 \uc544\ud3ec\uce7c\ub9bd\uc2a4",
        date: "2026-04-30",
        day: "\ubaa9",
        time: "16:00",
        location: K.branch,
        horrorLevel: 5,
        difficulty: 4,
        status: "cleared",
        clearTime: "47:32",
        imageUrl: "/images/horror/theme-pumpkin.png",
        hasReview: true
    },
    {
        id: 4,
        themeTitle: "\uc545\ub9c8\uc758 \uc81c\ub2e8",
        date: "2026-04-05",
        day: "\uc77c",
        time: "21:00",
        location: "\uc2e0\ucd0c\uc810",
        horrorLevel: 3,
        difficulty: 3,
        status: "failed",
        imageUrl: "/images/horror/theme-clown.png"
    },
    {
        id: 5,
        themeTitle: "\uc720\ub839 \ud559\uad50",
        date: "2026-03-22",
        day: "\uc77c",
        time: "19:00",
        location: "\ud64d\ub300\uc810",
        horrorLevel: 4,
        difficulty: 4,
        status: "cleared",
        clearTime: "52:18",
        imageUrl: "/images/horror/theme-zebra.png"
    },
    {
        id: 6,
        themeTitle: "\ubc84\ub824\uc9c4 \uc720\ub78c\uc120",
        date: "2026-02-14",
        day: "\ud1a0",
        time: "15:00",
        location: K.branch,
        horrorLevel: 4,
        difficulty: 3,
        status: "cleared",
        clearTime: "49:05",
        imageUrl: "/images/horror/hero-door.png",
        hasReview: true
    }
];
function SkullIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 16 16",
        "aria-hidden": "true",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fill: "currentColor",
            d: "M8 1.7c-3.1 0-5.2 2.1-5.2 5.1 0 1.8.8 3.2 2 4v2.1c0 .8.6 1.4 1.4 1.4h3.6c.8 0 1.4-.6 1.4-1.4v-2.1c1.2-.8 2-2.2 2-4 0-3-2.1-5.1-5.2-5.1Zm-2.1 7.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4Zm2.1 1.5c-.4 0-.8-.3-.8-.7 0-.3.5-1.2.8-1.7.3.5.8 1.4.8 1.7 0 .4-.4.7-.8.7Zm2.1-1.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4ZM6.1 12.1h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Z"
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
function LockIcon({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 16 16",
        "aria-hidden": "true",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fill: "currentColor",
            d: "M4.2 6.7V5.2C4.2 3 5.8 1.5 8 1.5s3.8 1.5 3.8 3.7v1.5h.4c.8 0 1.3.6 1.3 1.3v5.1c0 .8-.6 1.4-1.4 1.4H3.9c-.8 0-1.4-.6-1.4-1.4V8c0-.8.6-1.3 1.3-1.3h.4Zm1.7 0h4.2V5.2c0-1.2-.8-2-2.1-2s-2.1.8-2.1 2v1.5Z"
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
function MetaIcon({ type }) {
    const common = "h-3.5 w-3.5 text-[#8c8c8c]";
    if (type === "date") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 16 16",
            className: common,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "currentColor",
                d: "M4 2h1v1h6V2h1v1h1.2c.7 0 1.3.6 1.3 1.3v8.9c0 .7-.6 1.3-1.3 1.3H2.8c-.7 0-1.3-.6-1.3-1.3V4.3C1.5 3.6 2.1 3 2.8 3H4V2Zm9 4H3v7h10V6Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 105,
                columnNumber: 75
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 105,
            columnNumber: 12
        }, this);
    }
    if (type === "time") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 16 16",
            className: common,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "currentColor",
                d: "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm.6 3.2v3l2.2 1.3-.7 1.1-2.9-1.7V4.7h1.4Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 108,
                columnNumber: 75
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 108,
            columnNumber: 12
        }, this);
    }
    if (type === "location") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 16 16",
            className: common,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "currentColor",
                d: "M8 1.5A4.7 4.7 0 0 0 3.3 6.2c0 3.6 4.7 8.3 4.7 8.3s4.7-4.7 4.7-8.3A4.7 4.7 0 0 0 8 1.5Zm0 6.3A1.6 1.6 0 1 1 8 4.6a1.6 1.6 0 0 1 0 3.2Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 111,
                columnNumber: 75
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 111,
            columnNumber: 12
        }, this);
    }
    if (type === "gender") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 16 16",
            className: common,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "currentColor",
                d: "M8 8.2a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm-5 6.1c.4-2.5 2.3-4.2 5-4.2s4.6 1.7 5 4.2H3Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 114,
                columnNumber: 75
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 114,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 16 16",
        className: common,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fill: "currentColor",
            d: "M3 4.2h10v8.5H3V4.2Zm2-2h1.2v1.2H5V2.2Zm4.8 0H11v1.2H9.8V2.2ZM4.4 6.5v1.2h7.2V6.5H4.4Z"
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 116,
            columnNumber: 73
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 116,
        columnNumber: 10
    }, this);
}
function RatingIcons({ level, type }) {
    const Icon = type === "horror" ? SkullIcon : LockIcon;
    const active = type === "horror" ? "text-[#ef4a4a] drop-shadow-[0_0_5px_rgba(239,74,74,0.2)]" : "text-[#e2bd63] drop-shadow-[0_0_5px_rgba(226,189,99,0.18)]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5",
        children: Array.from({
            length: 5
        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: [
                    "h-[15px] w-[15px] transition-all",
                    index < level ? `${active} opacity-100` : "text-[#292929] opacity-75"
                ].join(" ")
            }, index, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
function ProfileSummaryCard() {
    const [avatarSrc, setAvatarSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("/images/%EB%A0%B9%EB%83%A5/ghost-cat-avatar.png");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "overflow-hidden rounded-[17px] border border-white/[0.075] bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.055),transparent_36%),linear-gradient(112deg,rgba(24,24,24,0.96),rgba(18,18,18,0.92)_48%,rgba(20,12,12,0.94)),rgba(18,18,18,0.9)] shadow-[0_28px_95px_rgba(0,0,0,0.52),0_0_34px_rgba(204,34,34,0.04)] backdrop-blur-md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid min-h-[156px] items-stretch lg:grid-cols-[350px_1fr_222px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-5 border-b border-white/[0.035] px-7 py-6 lg:border-b-0 lg:border-r lg:border-white/[0.035]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative h-[98px] w-[98px] shrink-0 overflow-hidden rounded-full border border-white/[0.1] bg-[#1b1b1b] shadow-[inset_0_0_32px_rgba(255,255,255,0.045),0_14px_32px_rgba(0,0,0,0.42)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: avatarSrc,
                                alt: "",
                                fill: true,
                                sizes: "98px",
                                className: "object-cover p-3",
                                onError: ()=>setAvatarSrc("/images/%EB%A0%B9%EB%83%A52_%ED%88%AC%EB%AA%85.png")
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-3 flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-[30px] font-black leading-none text-[#f5f5f5]",
                                            children: K.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mypage/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "rounded-md border border-[#cc2222]/58 bg-[#101010]/60 px-2.5 py-1 text-xs font-black text-[#ef5353] shadow-[0_0_14px_rgba(204,34,34,0.08)]",
                                            children: K.branch
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mypage/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mypage/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-bold text-[#aaa]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaIcon, {
                                                    type: "gender"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mypage/page.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 66
                                                }, this),
                                                K.gender
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mypage/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#4d4d4d]",
                                            children: "|"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mypage/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaIcon, {
                                                    type: "age"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mypage/page.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 66
                                                }, this),
                                                K.age
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mypage/page.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mypage/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 divide-x divide-y divide-white/[0.032] sm:grid-cols-4 sm:divide-y-0",
                    children: STATS.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-h-[156px] flex-col items-center justify-center px-4 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-3 flex items-center justify-center gap-2 text-[12px] font-black text-[#7d7d7d]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[20px]",
                                            children: stat.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mypage/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 112
                                        }, this),
                                        stat.label
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mypage/page.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: [
                                        "text-[30px] font-black leading-none tracking-[0.01em]",
                                        stat.accent
                                    ].join(" "),
                                    children: stat.value
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mypage/page.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, stat.label, true, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RankBadgeCard, {}, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 136,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
function RankBadgeCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "m-4 flex min-h-[126px] flex-col items-center justify-center rounded-[14px] border border-[#cc2222]/58 bg-[radial-gradient(circle_at_50%_0%,rgba(204,34,34,0.2),transparent_66%),linear-gradient(180deg,rgba(204,34,34,0.038),rgba(0,0,0,0.15)),#161111] px-5 text-center shadow-[0_0_30px_rgba(204,34,34,0.12),inset_0_0_22px_rgba(204,34,34,0.026)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-3 text-[11px] font-black tracking-[0.16em] text-[#9c8e8e]",
                children: K.rankLabel
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex items-center justify-center gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[34px] leading-none",
                        children: "\ud83d\udd25"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[22px] font-black text-[#f5f5f5]",
                        children: K.rank
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-black text-[#ef5353]",
                children: K.topRank
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-xs font-black text-[#d58a80]",
                children: K.rankRule
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
function ReservationTabs({ active, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-7 flex border-b border-white/[0.085]",
        children: TABS.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onChange(tab.key),
                className: [
                    "relative mr-7 px-0 py-4 text-sm font-black transition-colors",
                    active === tab.key ? "text-[#ef5353]" : "text-[#777] hover:text-[#d8d8d8]"
                ].join(" "),
                children: [
                    tab.label,
                    active === tab.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute bottom-[-1px] left-0 h-0.5 w-full bg-[#cc2222] shadow-[0_0_16px_rgba(204,34,34,0.65)]"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 189,
                        columnNumber: 34
                    }, this)
                ]
            }, tab.key, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 187,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 185,
        columnNumber: 5
    }, this);
}
function ReservationSection({ title, count, tone, reservations }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: tone === "upcoming" ? "mt-5" : "mt-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "flex items-center gap-2.5 text-[17px] font-black text-[#f5f5f5]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: [
                                    "h-2 w-2 rounded-full",
                                    tone === "upcoming" ? "bg-[#e53939] shadow-[0_0_12px_rgba(229,57,57,0.58)]" : "bg-[#828282]"
                                ].join(" ")
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            title
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-md border border-white/[0.08] bg-[#151515]/88 px-2.5 py-1 text-xs font-bold text-[#8a8a8a]",
                        children: [
                            count,
                            "\uac74"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-[13px] border border-white/[0.075] bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] shadow-[0_20px_58px_rgba(0,0,0,0.38),0_0_28px_rgba(204,34,34,0.025)]",
                children: reservations.map((reservation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationRowCard, {
                        reservation: reservation,
                        isLast: index === reservations.length - 1
                    }, reservation.id, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
function ReservationRowCard({ reservation, isLast }) {
    const status = getStatusStyle(reservation);
    const action = getActionText(reservation);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "grid min-h-[108px] items-center gap-4 px-4.5 py-4 transition-all hover:bg-white/[0.026] hover:shadow-[inset_0_0_28px_rgba(204,34,34,0.025)] md:grid-cols-[138px_1fr_178px_178px_112px_136px]",
            !isLast ? "border-b border-white/[0.042]" : ""
        ].join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-[86px] overflow-hidden rounded-[8px] border border-white/[0.065] bg-[#101010]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    src: reservation.imageUrl,
                    alt: reservation.themeTitle,
                    fill: true,
                    sizes: "138px",
                    className: "object-cover brightness-[0.9] contrast-[1.16] saturate-[0.96]"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "truncate text-[20px] font-black leading-tight text-[#f5f5f5]",
                                children: reservation.themeTitle
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            reservation.dday && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-md border border-[#d7b46a]/35 bg-[#d7b46a]/10 px-2 py-0.5 text-xs font-black text-[#d7b46a]",
                                children: reservation.dday
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 227,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-bold text-[#8e8e8e]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaIcon, {
                                        type: "date"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 62
                                    }, this),
                                    reservation.date,
                                    " (",
                                    reservation.day,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaIcon, {
                                        type: "time"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 62
                                    }, this),
                                    reservation.time
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaIcon, {
                                        type: "location"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 62
                                    }, this),
                                    reservation.location
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            reservation.clearTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-black text-[#2ecc71]",
                                children: [
                                    K.clearTime,
                                    " ",
                                    reservation.clearTime
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 233,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricBlock, {
                label: K.horror,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RatingIcons, {
                    level: reservation.horrorLevel,
                    type: "horror"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 237,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricBlock, {
                label: K.difficulty,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RatingIcons, {
                    level: reservation.difficulty,
                    type: "difficulty"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 238,
                    columnNumber: 41
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-start md:justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: [
                        "inline-flex h-8 min-w-[58px] items-center justify-center rounded-md border px-3 text-xs font-black",
                        status
                    ].join(" "),
                    children: getStatusText(reservation.status)
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-start md:justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "h-9 min-w-[104px] rounded-md border border-[#cc2222]/58 bg-[#101010]/55 px-4 text-[13px] font-black text-[#ef5353] transition-all hover:border-[#cc2222]/90 hover:bg-[#cc2222]/10 hover:text-white",
                    children: action
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 245,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}
function MetricBlock({ label, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden border-l border-white/[0.038] pl-5 md:block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 text-xs font-black text-[#747474]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
}
function getStatusText(status) {
    if (status === "upcoming") return K.scheduled;
    if (status === "cleared") return K.cleared;
    return K.failed;
}
function getStatusStyle(reservation) {
    if (reservation.status === "upcoming") return "border-[#cc2222]/52 bg-[#cc2222]/6 text-[#ef5353]";
    if (reservation.status === "cleared") return "border-[#2ecc71]/36 bg-[#2ecc71]/10 text-[#2ecc71]";
    return "border-white/[0.14] bg-white/[0.035] text-[#b8b8b8]";
}
function getActionText(reservation) {
    if (reservation.status === "upcoming") return K.change;
    if (reservation.status === "cleared") return reservation.hasReview ? K.reviewView : K.reviewWrite;
    return K.reviewWrite;
}
function ReservationTabContent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationSection, {
                title: K.upcoming,
                count: UPCOMING_RESERVATIONS.length,
                tone: "upcoming",
                reservations: UPCOMING_RESERVATIONS
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationSection, {
                title: K.past,
                count: PAST_RESERVATIONS.length,
                tone: "past",
                reservations: PAST_RESERVATIONS
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 282,
        columnNumber: 5
    }, this);
}
function PlaceholderTab({ title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 rounded-[14px] border border-white/[0.08] bg-[#171717]/72 px-6 py-16 text-center text-[#777]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm font-bold",
            children: [
                title,
                " ",
                K.nextStep
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 292,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 291,
        columnNumber: 5
    }, this);
}
function MyPage() {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("reservation");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen overflow-hidden bg-[#0b0b0b] text-[#f5f5f5]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_86%_9%,rgba(150,20,20,0.42),transparent_30%),radial-gradient(circle_at_2%_82%,rgba(150,24,24,0.34),transparent_28%),radial-gradient(circle_at_24%_14%,rgba(204,34,34,0.105),transparent_32%),linear-gradient(180deg,#0b0b0b_0%,#101010_46%,#090909_100%)]"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_82%_13%,rgba(255,70,70,0.55)_0_1px,transparent_1px),radial-gradient(circle_at_9%_78%,rgba(255,60,60,0.5)_0_1px,transparent_1px)] [background-size:34px_34px,46px_46px] blur-[0.5px]"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mx-auto max-w-[1380px] px-5 py-8 sm:px-8 lg:py-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "mb-7 flex items-center gap-2 text-xs font-bold text-[#777]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "transition-colors hover:text-[#f5f5f5]",
                                children: K.home
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: ">"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: K.mypage
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 307,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: ">"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 308,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#f5f5f5]",
                                children: K.reservation
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-3 text-[10px] font-black tracking-[0.32em] text-[#cc2222]",
                                children: "// MY PAGE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 313,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "flex items-center gap-3 text-[38px] font-black leading-tight md:text-[50px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[46px] leading-none",
                                        children: "\ud83d\udd25"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#e63946]",
                                                children: K.titleLead
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mypage/page.tsx",
                                                lineNumber: 316,
                                                columnNumber: 19
                                            }, this),
                                            K.titleRest
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 316,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm font-bold text-[#aaa]",
                                children: K.subtitle
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 312,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileSummaryCard, {}, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 321,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationTabs, {
                        active: tab,
                        onChange: setTab
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    tab === "reservation" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationTabContent, {}, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 324,
                        columnNumber: 35
                    }, this),
                    tab === "achievement" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlaceholderTab, {
                        title: K.achievement
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 325,
                        columnNumber: 35
                    }, this),
                    tab === "activity" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlaceholderTab, {
                        title: K.activity
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 326,
                        columnNumber: 32
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 303,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_mypage_page_tsx_3468ff08._.js.map