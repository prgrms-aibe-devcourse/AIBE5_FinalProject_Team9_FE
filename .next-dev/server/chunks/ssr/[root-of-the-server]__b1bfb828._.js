module.exports = [
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/src/lib/axios.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/token.ts [app-ssr] (ecmascript)");
;
;
const baseURL = ("TURBOPACK compile-time value", "http://localhost:8080") || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
const extractTokens = (body)=>{
    const accessToken = body.accessToken ?? body.data?.accessToken;
    const refreshToken = body.refreshToken ?? body.data?.refreshToken;
    return {
        accessToken,
        refreshToken
    };
};
const redirectToLogin = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
axiosInstance.interceptors.request.use((config)=>{
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error)=>Promise.reject(error));
axiosInstance.interceptors.response.use((response)=>response, async (error)=>{
    const originalRequest = error.config;
    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry || originalRequest.url?.includes('/api/auth/refresh')) {
        return Promise.reject(error);
    }
    const refreshToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRefreshToken"])();
    if (!refreshToken) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeToken"])();
        redirectToLogin();
        return Promise.reject(error);
    }
    originalRequest._retry = true;
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${baseURL}/api/auth/refresh`, {
            refreshToken
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const tokens = extractTokens(data);
        if (!tokens.accessToken || !tokens.refreshToken) {
            throw new Error('Token refresh response is missing tokens.');
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthTokens"])({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return axiosInstance(originalRequest);
    } catch (refreshError) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeToken"])();
        redirectToLogin();
        return Promise.reject(refreshError);
    }
});
const __TURBOPACK__default__export__ = axiosInstance;
}),
"[project]/src/services/authService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractAuthPayload",
    ()=>extractAuthPayload,
    "getAuthErrorMessage",
    ()=>getAuthErrorMessage,
    "getMe",
    ()=>getMe,
    "loginUser",
    ()=>loginUser,
    "loginWithGoogle",
    ()=>loginWithGoogle,
    "logoutUser",
    ()=>logoutUser,
    "signupUser",
    ()=>signupUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/axios.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/token.ts [app-ssr] (ecmascript)");
;
;
;
const getAuthErrorMessage = (error, fallbackMessage)=>{
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isAxiosError(error)) {
        const responseData = error.response?.data;
        return responseData?.message ?? responseData?.error ?? responseData?.data?.message ?? responseData?.data?.error ?? fallbackMessage;
    }
    return fallbackMessage;
};
const normalizeRole = (role)=>{
    if (role === 'MANAGER' || role === 'OWNER') return 'OWNER';
    if (role === 'ADMIN') return 'ADMIN';
    return 'USER';
};
const createUserFromPayload = (payload)=>{
    if (!payload?.id || !payload.email || !payload.nickname) return undefined;
    return {
        id: payload.id,
        email: payload.email,
        nickname: payload.nickname,
        role: normalizeRole(payload.role),
        profileImageUrl: payload.profileImageUrl,
        gender: payload.gender,
        age: payload.age,
        phone: payload.phone,
        isEmailPublic: payload.isEmailPublic ?? payload.emailVisible,
        isAgePublic: payload.isAgePublic ?? payload.ageVisible,
        isGenderPublic: payload.isGenderPublic ?? payload.genderVisible
    };
};
const createPartialUserFromPayload = (payload)=>{
    if (!payload) return {};
    return {
        id: payload.id,
        email: payload.email,
        nickname: payload.nickname,
        role: payload.role ? normalizeRole(payload.role) : undefined,
        profileImageUrl: payload.profileImageUrl,
        gender: payload.gender,
        age: payload.age,
        phone: payload.phone,
        isEmailPublic: payload.isEmailPublic ?? payload.emailVisible,
        isAgePublic: payload.isAgePublic ?? payload.ageVisible,
        isGenderPublic: payload.isGenderPublic ?? payload.genderVisible
    };
};
const extractAuthPayload = (response)=>{
    const accessToken = response.accessToken ?? response.data?.accessToken;
    const refreshToken = response.refreshToken ?? response.data?.refreshToken;
    const user = response.user ?? response.data?.user ?? createUserFromPayload(response.data) ?? createUserFromPayload(response);
    return {
        accessToken,
        refreshToken,
        user
    };
};
const loginUser = async (credentials, role = 'member')=>{
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/api/auth/login/${role}`, credentials);
    console.log(data);
    return data;
};
const signupUser = async (payload, role = 'member')=>{
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/api/auth/register/${role}`, payload);
    return data;
};
const logoutUser = async ()=>{
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/api/auth/logout', {
        refreshToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRefreshToken"])()
    });
};
const getMe = async ()=>{
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/api/auth/me');
    const payload = data.data ?? data;
    return createPartialUserFromPayload(payload);
};
const loginWithGoogle = async (code)=>{
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/api/auth/google', {
        code
    });
    return data;
};
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authService.ts [app-ssr] (ecmascript)");
"use client";
;
;
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
    gender: "\uc131\ubcc4 \ubbf8\uc785\ub825",
    age: "\ub098\uc774 \ubbf8\uc785\ub825",
    settings: "\uc124\uc815",
    totalPlay: "\ucd1d \ud50c\ub808\uc774",
    successRate: "\uc131\uacf5\ub960",
    bestClear: "\ucd5c\ub2e8 \ud074\ub9ac\uc5b4",
    achievements: "\ud68d\ub4dd \uc5c5\uc801",
    rankLabel: "\ud604\uc7ac \ub4f1\uae09",
    rank: "오컬트 동호회장",
    topRank: "상위 12%",
    rankRule: "성공률 70% 이상 ~ 85% 미만",
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
        accent: "text-[#f5f5f5]"
    },
    {
        label: K.successRate,
        value: "75%",
        accent: "text-[#2ecc71]"
    },
    {
        label: K.bestClear,
        value: "38:24",
        accent: "text-[#3498db]"
    },
    {
        label: K.achievements,
        value: "17",
        accent: "text-[#b66ae0]"
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
        imageUrl: "/images/horror/hero-door.png"
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
const TITLES = [
    {
        id: 1,
        name: "\ucabc\ubcf4",
        condition: "\uc131\uacf5\ub960 30% \ubbf8\ub9cc",
        status: "earned",
        icon: "ghost"
    },
    {
        id: 2,
        name: "\uc77c\ubc18\uc778",
        condition: "\uc131\uacf5\ub960 30% \uc774\uc0c1 ~ 50% \ubbf8\ub9cc",
        status: "earned",
        icon: "user"
    },
    {
        id: 3,
        name: "\uac15\uc2ec\uc7a5",
        condition: "\uc131\uacf5\ub960 50% \uc774\uc0c1 ~ 70% \ubbf8\ub9cc",
        status: "earned",
        icon: "flame"
    },
    {
        id: 4,
        name: "오컬트 동호회장",
        condition: "\uc131\uacf5\ub960 70% \uc774\uc0c1 ~ 85% \ubbf8\ub9cc",
        status: "current",
        icon: "group"
    },
    {
        id: 5,
        name: "\ud1f4\ub9c8\uc0ac",
        condition: "\uc131\uacf5\ub960 85% \uc774\uc0c1 + \uc644\ub8cc \ubc29\ud0c8\ucd9c 5\ud68c \uc774\uc0c1",
        status: "locked",
        icon: "lock"
    }
];
const ACHIEVEMENTS = [
    {
        id: 1,
        name: "\uccab \ubc1c\uac78\uc74c",
        condition: "\uccab \ubc29\ud0c8\ucd9c\uc744 \uc644\ub8cc\ud558\uc138\uc694.",
        status: "complete",
        icon: "foot",
        accent: "lime"
    },
    {
        id: 2,
        name: "\uc2a4\ud53c\ub4dc \ub7ec\ub108",
        condition: "40\ubd84 \uc774\ub0b4\uc5d0 \ubc29\ud0c8\ucd9c\uc744 \uc644\ub8cc\ud558\uc138\uc694.",
        status: "progress",
        icon: "timer",
        progress: 1,
        total: 3,
        accent: "red"
    },
    {
        id: 3,
        name: "\ud300\uc6cc\ud06c \ub9c8\uc2a4\ud130",
        condition: "\uba54\uc774\ud2b8 \ucc38\uc5ec/\ubaa8\uc9d1 5\ud68c \ud50c\ub808\uc774",
        status: "progress",
        icon: "group",
        progress: 3,
        total: 5,
        accent: "teal"
    },
    {
        id: 4,
        name: "\ub2e8\uc9dd \uce5c\uad6c",
        condition: "\uac19\uc740 \ud300\uc6d0\uacfc 3\ud68c \ud50c\ub808\uc774\ud558\uc138\uc694.",
        status: "progress",
        icon: "heart",
        progress: 1,
        total: 3,
        accent: "rose"
    },
    {
        id: 5,
        name: "\uacf5\ud3ec \uc815\ubcf5\uc790",
        condition: "\ub09c\uc774\ub3c4 5 \ubc29\ud0c8\ucd9c 3\uac1c\ub97c \uc131\uacf5\ud558\uc138\uc694.",
        status: "complete",
        icon: "skull",
        accent: "deepRed"
    },
    {
        id: 6,
        name: "\ubc29\ud0c8\ucd9c \ubcd1\uc544\ub9ac",
        condition: "\ubc29\ud0c8\ucd9c 3\ud68c \ud50c\ub808\uc774\ud558\uc138\uc694.",
        status: "complete",
        icon: "chick",
        accent: "amber"
    },
    {
        id: 7,
        name: "\uc5f4\uc1e0 \uc218\uc9d1\uac00",
        condition: "\ubc29\ud0c8\ucd9c 7\ud68c \ud50c\ub808\uc774",
        status: "progress",
        icon: "key",
        progress: 3,
        total: 7,
        accent: "orange"
    },
    {
        id: 8,
        name: "\ub2e8\uc11c \uc0ac\ub0e5\uafbc",
        condition: "\ubc29\ud0c8\ucd9c 15\ud68c \ud50c\ub808\uc774",
        status: "progress",
        icon: "search",
        progress: 7,
        total: 15,
        accent: "orange"
    },
    {
        id: 9,
        name: "\ubc29\ud0c8\ucd9c \uc9c0\ubc30\uc790",
        condition: "\ubc29\ud0c8\ucd9c 30\ud68c \ud50c\ub808\uc774\ud558\uc138\uc694.",
        status: "locked",
        icon: "crown",
        progress: 12,
        total: 30,
        accent: "gold"
    }
];
const ACTIVITY_REVIEWS = [
    {
        id: 1,
        themeTitle: "좀비 아포칼립스",
        date: "2026-04-22",
        rating: 5,
        horrorLevel: 5,
        difficulty: 4,
        content: "퍼즐 구성이 탄탄하고 좀비 분장이 리얼해서 몰입감이 좋았어요. 팀원들이랑 같이 가면 훨씬 재미있을 것 같아요.",
        tags: [
            "무서워요",
            "퍼즐이 좋아요",
            "팀워크 필요"
        ],
        imageUrl: "/images/horror/theme-pumpkin.png"
    },
    {
        id: 2,
        themeTitle: "유령 학교",
        date: "2026-03-24",
        rating: 4,
        horrorLevel: 4,
        difficulty: 4,
        content: "학교 테마가 익숙해서 더 무서웠어요. 초반 단서가 살짝 어렵지만 흐름이 좋아서 끝까지 긴장감 있게 플레이했습니다.",
        tags: [
            "스토리가 좋아요",
            "숙련자 추천"
        ],
        imageUrl: "/images/horror/hero-door.png"
    }
];
const ACTIVITY_POSTS = [
    {
        id: 1,
        category: "모집",
        date: "2026-05-03",
        title: "이번 주말 강남점 폐병원 같이 가실 분?",
        comments: 8
    },
    {
        id: 2,
        category: "정보",
        date: "2026-04-21",
        title: "좀비 아포칼립스 공략 팁 공유합니다",
        comments: 15
    },
    {
        id: 3,
        category: "모집",
        date: "2026-04-12",
        title: "홍대점 공포 테마 위주로 같이 도실 분 찾아요",
        comments: 4
    }
];
const ACTIVITY_MATES = [
    {
        id: 1,
        themeTitle: "폐병원의 저주",
        location: "강남점",
        title: "이번 주말 강남점 폐병원 같이 가실 분?",
        date: "2026-05-10",
        time: "14:30",
        currentMembers: 2,
        totalMembers: 4,
        status: "open",
        isAuthor: true,
        imageUrl: "/images/horror/theme-clown.png"
    },
    {
        id: 2,
        themeTitle: "감옥 탈출",
        location: "홍대점",
        title: "홍대 감옥탈출 처음인데 같이 가봐요",
        date: "2026-05-10",
        time: "13:30",
        currentMembers: 3,
        totalMembers: 4,
        status: "joined",
        imageUrl: "/images/horror/theme-smoke.png"
    },
    {
        id: 3,
        themeTitle: "인형의 방",
        location: "건대점",
        title: "건대 인형의 방 2인 구합니다",
        date: "2026-05-08",
        time: "16:00",
        currentMembers: 4,
        totalMembers: 4,
        status: "closed",
        imageUrl: "/images/horror/offline-scene.png"
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
            lineNumber: 469,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 468,
        columnNumber: 5
    }, this);
}
function ThemeThumbnail({ src, alt, width, className = "", children }) {
    const style = {
        aspectRatio: "16/9",
        width: width ? `${width}px` : "100%"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "relative overflow-hidden rounded-lg border border-white/[0.065] bg-[#101010]",
            className
        ].join(" "),
        style: style,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                src: src,
                alt: alt ?? "",
                fill: true,
                sizes: width ? `${width}px` : "100vw",
                className: "object-cover object-center brightness-[0.9] contrast-[1.16] saturate-[0.96] transition-transform"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 502,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 495,
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
            lineNumber: 517,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 516,
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
                lineNumber: 534,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 533,
            columnNumber: 7
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
                lineNumber: 544,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 543,
            columnNumber: 7
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
                lineNumber: 554,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 553,
            columnNumber: 7
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
                lineNumber: 564,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 563,
            columnNumber: 7
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
            lineNumber: 573,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 572,
        columnNumber: 5
    }, this);
}
function ActivityLineIcon({ type, className = "h-4 w-4" }) {
    const line = {
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 1.8
    };
    if (type === "review") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            className: className,
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    ...line,
                    d: "M4.5 3.5h11v10.2h-4.2L7.4 17v-3.3H4.5V3.5Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 598,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    ...line,
                    d: "m7.1 8.8 1.6 1.6 4.1-4.1"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 599,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 597,
            columnNumber: 7
        }, this);
    }
    if (type === "post") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            className: className,
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    ...line,
                    d: "M5 3.4h7.2L15 6.2v10.4H5V3.4Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 606,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    ...line,
                    d: "M12.2 3.4v3h2.9M7.5 9.3h5M7.5 12.2h4.2"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 607,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 605,
            columnNumber: 7
        }, this);
    }
    if (type === "mate" || type === "users") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 20 20",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...line,
                d: "M7.7 9.4a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.7 16.4c.5-3.4 2.2-5.1 5-5.1s4.5 1.7 5 5.1H2.7ZM13.5 9.2a2.4 2.4 0 1 0 0-4.8M13.2 11.4c2.3.2 3.6 1.8 4.1 5"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 614,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 613,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        className: className,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...line,
                d: "M4 4h12v8.7H8.2L4 16V4Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 623,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...line,
                d: "M7.1 7.5h5.8M7.1 10h3.7"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 624,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 622,
        columnNumber: 5
    }, this);
}
function StarRating({ rating }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-0.5",
        "aria-label": `별점 ${rating}점`,
        children: Array.from({
            length: 5
        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 16 16",
                className: [
                    "h-4 w-4",
                    index < rating ? "text-[#e2bd63]" : "text-[#363636]"
                ].join(" "),
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "currentColor",
                    d: "m8 1.4 1.9 4 4.4.6-3.2 3.1.8 4.4L8 11.4l-3.9 2.1.8-4.4L1.7 6l4.4-.6L8 1.4Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 645,
                    columnNumber: 11
                }, this)
            }, index, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 636,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 631,
        columnNumber: 5
    }, this);
}
function AchievementIcon({ type, className }) {
    const solid = {
        fill: "currentColor"
    };
    if (type === "ghost") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M12 3.4c-4 0-7 3-7 7.2v8.9c0 .6.7.9 1.1.5l1.7-1.4 1.7 1.3c.3.3.8.3 1.1 0l1.4-1.2 1.4 1.2c.3.3.8.3 1.1 0l1.7-1.3 1.7 1.4c.4.4 1.1.1 1.1-.5v-8.9c0-4.2-3-7.2-7-7.2Zm-2.6 8.7a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7Zm5.2 0a1.35 1.35 0 1 1 0-2.7 1.35 1.35 0 0 1 0 2.7Zm-2.6 3.5c-1.2 0-2.1-.5-2.7-1.2a.8.8 0 0 1 1.2-1c.4.4.8.6 1.5.6s1.1-.2 1.5-.6a.8.8 0 0 1 1.2 1c-.6.7-1.5 1.2-2.7 1.2Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 667,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 666,
            columnNumber: 7
        }, this);
    }
    if (type === "user") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M12 11.5a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Zm-7.2 8.2c.7-4.4 3.4-6.6 7.2-6.6s6.5 2.2 7.2 6.6c.1.7-.4 1.2-1.1 1.2H5.9c-.7 0-1.2-.5-1.1-1.2Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 677,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 676,
            columnNumber: 7
        }, this);
    }
    if (type === "flame") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M13.3 2.6c1 3.4-.6 5-2.2 6.8-1.1 1.2-2.1 2.5-1.5 4.4.6-1.1 1.5-2.2 3.1-3.3 3.1 1.9 5 4.1 5 6.8 0 3.2-2.4 5.1-5.6 5.1s-5.8-2-5.8-5.7c0-2.5 1.1-4.4 2.7-6.3 1.8-2.3 3.5-4.3 4.3-7.8Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 687,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 686,
            columnNumber: 7
        }, this);
    }
    if (type === "group") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M8.8 11.1a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Zm7.6.5a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2ZM2.9 20.2c.6-4.7 2.7-7.1 5.9-7.1s5.3 2.4 5.9 7.1H2.9Zm11.5 0c-.2-2-.8-3.7-1.8-5 .8-.8 1.8-1.2 3-1.2 3 0 4.9 2.1 5.5 6.2h-6.7Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 697,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 696,
            columnNumber: 7
        }, this);
    }
    if (type === "lock") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M7.1 9.5V7.6a4.9 4.9 0 0 1 9.8 0v1.9h.8c1.2 0 2.1.9 2.1 2.1v7.1c0 1.2-.9 2.1-2.1 2.1H6.3c-1.2 0-2.1-.9-2.1-2.1v-7.1c0-1.2.9-2.1 2.1-2.1h.8Zm2.4 0h5V7.6a2.5 2.5 0 0 0-5 0v1.9Zm2.5 4.1c-.8 0-1.4.6-1.4 1.3 0 .5.3.9.7 1.2v1.5h1.4v-1.5c.4-.3.7-.7.7-1.2 0-.7-.6-1.3-1.4-1.3Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 707,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 706,
            columnNumber: 7
        }, this);
    }
    if (type === "foot") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M7.5 4.2c1.7.1 2.7 1.7 2.5 3.9-.2 2.6-1.6 5.2-3.5 5.1-1.6-.1-2.5-1.7-2.2-4 .2-2.8 1.4-5.1 3.2-5Zm8.7 3.3c1.6.1 2.5 1.5 2.3 3.5-.2 2.4-1.5 4.7-3.3 4.5-1.4-.1-2.3-1.5-2.1-3.6.3-2.5 1.4-4.5 3.1-4.4ZM6.8 15.6c1.8 0 3.1 1.2 3.1 2.8s-1.3 2.9-3.1 2.9-3-1.2-3-2.9 1.3-2.8 3-2.8Zm8.8 1.6c1.5 0 2.8 1 2.8 2.3s-1.3 2.3-2.8 2.3-2.8-1-2.8-2.3 1.3-2.3 2.8-2.3Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 717,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 716,
            columnNumber: 7
        }, this);
    }
    if (type === "timer") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M9 2.6h6v2H9v-2Zm2 4V4.3h2v2.3a7.6 7.6 0 1 1-2 0Zm1 13.4a5.4 5.4 0 1 0 0-10.8 5.4 5.4 0 0 0 0 10.8Zm-1-8.6h2v3.3l2.5 1.5-1 1.7-3.5-2.1v-4.4Zm5.5-3.9 1.7-1.7 1.4 1.4-1.7 1.7-1.4-1.4Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 727,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 726,
            columnNumber: 7
        }, this);
    }
    if (type === "heart") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M12 21s-8.3-4.8-8.3-11.1c0-3 2-5.1 4.7-5.1 1.6 0 2.8.8 3.6 2 .8-1.2 2-2 3.6-2 2.7 0 4.7 2.1 4.7 5.1C20.3 16.2 12 21 12 21Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 737,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 736,
            columnNumber: 7
        }, this);
    }
    if (type === "skull") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M12 3.2c-4.6 0-7.4 2.9-7.4 7.1 0 2.5 1.1 4.5 3 5.8v2.6c0 1.3 1 2.3 2.3 2.3h4.2c1.3 0 2.3-1 2.3-2.3v-2.6c1.9-1.3 3-3.3 3-5.8 0-4.2-2.8-7.1-7.4-7.1Zm-2.8 9.9a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm5.6 0a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM12 14.2c.5.8.9 1.5.9 1.9 0 .5-.4.9-.9.9s-.9-.4-.9-.9c0-.4.4-1.1.9-1.9Zm-2.5 4h1.2v1.5H9.5v-1.5Zm2 0h1.2v1.5h-1.2v-1.5Zm2 0h1.2v1.5h-1.2v-1.5Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 747,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 746,
            columnNumber: 7
        }, this);
    }
    if (type === "chick") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#f6c34a",
                    d: "M10.3 4.6 8.8 2.8l1.5-1 1.3 2.3-1.3.5Zm3.4-.5L15 1.9l1.5 1-1.6 1.8-1.2-.6ZM12 4.4c-4 0-6.8 3-6.8 7.1v2.6c0 4 2.8 6.9 6.8 6.9s6.8-2.9 6.8-6.9v-2.6c0-4.1-2.8-7.1-6.8-7.1Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 757,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    fill: "#2b1b10",
                    cx: "9.6",
                    cy: "11.4",
                    r: "0.9"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 761,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    fill: "#2b1b10",
                    cx: "14.4",
                    cy: "11.4",
                    r: "0.9"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 762,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#f28f2c",
                    d: "M10.7 13.1h2.6L12 15l-1.3-1.9Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 763,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#d99a2e",
                    fillOpacity: "0.55",
                    d: "M8.4 15.8c.8 1.2 2 1.8 3.6 1.8s2.8-.6 3.6-1.8c-.6 2.1-1.9 3.2-3.6 3.2s-3-1.1-3.6-3.2Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 764,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#8a5a18",
                    d: "M9.2 20.4h1.5v1.5H9.2v-1.5Zm4.1 0h1.5v1.5h-1.5v-1.5Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 769,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 756,
            columnNumber: 7
        }, this);
    }
    if (type === "key") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M15.6 3.7a5.4 5.4 0 0 0-5.1 7.1l-7.7 7.7v2.7h3.1v-2h2v-2h2v-2h1.3l1.3-1.3a5.4 5.4 0 1 0 3.1-10.2Zm0 3a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 779,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 778,
            columnNumber: 7
        }, this);
    }
    if (type === "search") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M10.4 3.8a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2Zm0 2.4a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4Zm5.1 9 5 5-1.8 1.8-5-5 1.8-1.8Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 789,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 788,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        className: className,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            ...solid,
            d: "m3.6 8.2 4.8 3.2 3.6-7.2 3.6 7.2 4.8-3.2-1.5 10.3H5.1L3.6 8.2Zm2.8 11.6h11.2v1.7H6.4v-1.7Z"
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 798,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 797,
        columnNumber: 5
    }, this);
}
function TitleSymbol({ type, className }) {
    const solid = {
        fill: "currentColor"
    };
    const line = {
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 1.85
    };
    if (type === "ghost") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 32 32",
            className: className,
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    ...solid,
                    d: "M16 4.5c-5.4 0-9.2 4-9.2 9.6v10.7c0 .7.8 1.1 1.4.7l2.2-1.7 2.1 1.6c.4.3.9.3 1.3 0l2.2-1.7 2.2 1.7c.4.3.9.3 1.3 0l2.1-1.6 2.2 1.7c.6.4 1.4 0 1.4-.7V14.1c0-5.6-3.8-9.6-9.2-9.6Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 825,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#0f0f0f",
                    d: "M11.8 15.4c.9 0 1.6-.8 1.6-1.8s-.7-1.8-1.6-1.8-1.6.8-1.6 1.8.7 1.8 1.6 1.8Zm8.4 0c.9 0 1.6-.8 1.6-1.8s-.7-1.8-1.6-1.8-1.6.8-1.6 1.8.7 1.8 1.6 1.8Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 829,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    ...line,
                    d: "M12.7 20.5c1.7-1.5 4.9-1.5 6.6 0"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 833,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 824,
            columnNumber: 7
        }, this);
    }
    if (type === "user") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 32 32",
            className: className,
            "aria-hidden": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M16 15.3a5.7 5.7 0 1 0 0-11.4 5.7 5.7 0 0 0 0 11.4Zm-9.7 11.1c1-6 4.5-9 9.7-9s8.7 3 9.7 9c.1.8-.5 1.4-1.3 1.4H7.6c-.8 0-1.4-.6-1.3-1.4Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 840,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 839,
            columnNumber: 7
        }, this);
    }
    if (type === "flame") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 32 32",
            className: className,
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    ...solid,
                    d: "M17.3 2.8c1.4 4.8-.5 7.2-2.7 9.9-1.3 1.6-2.5 3.2-2.3 5.5.9-1.8 2.2-3.1 4.3-4.6 4.5 2.8 7.2 5.9 7.2 9.3 0 4.1-3.1 6.8-7.8 6.8s-7.9-2.8-7.9-7.5c0-3.5 1.8-6.2 4.1-8.8 2.4-2.9 4.8-5.7 5.1-10.6Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 850,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#0f0f0f",
                    fillOpacity: "0.36",
                    d: "M16.1 18.1c2.2 1.7 3.3 3.4 3.3 5.1 0 2.2-1.4 3.4-3.4 3.4-2.2 0-3.6-1.4-3.6-3.6 0-1.7 1.1-3.3 3.7-4.9Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 854,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 849,
            columnNumber: 7
        }, this);
    }
    if (type === "group") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 32 32",
            className: className,
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    ...solid,
                    d: "M11.7 14.2a4.7 4.7 0 1 0 0-9.4 4.7 4.7 0 0 0 0 9.4Zm9.5.7a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6ZM4.5 27c.8-6 3.3-9.1 7.2-9.1s6.4 3.1 7.2 9.1H4.5Zm14.2 0c-.2-2.5-.9-4.6-2.2-6.2 1-.9 2.2-1.4 3.7-1.4 3.7 0 6 2.6 6.8 7.6h-8.3Z"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 865,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    ...line,
                    d: "m23.8 4.9 1.2-2 1.2 2 2.2.5-1.6 1.6.2 2.3-2-.9-2 .9.2-2.3-1.6-1.6 2.2-.5ZM15.9 5.3l1.1-2 1.1 2"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 869,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 864,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 32 32",
        className: className,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...line,
                d: "M16 3.7v24.6M7.5 10.2h17M9.8 17.1h12.4"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 878,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                ...solid,
                d: "M16 6.9 20 12l-4 5.1-4-5.1 4-5.1Zm-7.2 11 3 3.8-3 3.8-3-3.8 3-3.8Zm14.4 0 3 3.8-3 3.8-3-3.8 3-3.8Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 879,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 877,
        columnNumber: 5
    }, this);
}
function PageTitleIcon({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 52 52",
        "aria-hidden": "true",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "mypage-flame-gradient",
                    x1: "13",
                    y1: "6",
                    x2: "38",
                    y2: "45",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            stopColor: "#ff6b6b"
                        }, void 0, false, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 899,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "0.52",
                            stopColor: "#e53939"
                        }, void 0, false, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 900,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "1",
                            stopColor: "#9f1717"
                        }, void 0, false, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 901,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 891,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 890,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "url(#mypage-flame-gradient)",
                d: "M28.2 5.8c2.1 7.5-1 11.2-4.4 15.3-2 2.4-3.7 4.7-3.4 8 1.4-2.8 3.5-4.9 6.8-7.2 6.9 4.3 11 9 11 14.2 0 6.5-4.9 10.7-12.2 10.7-7.5 0-12.5-4.4-12.5-11.7 0-5.5 2.8-9.8 6.4-13.9 3.7-4.4 7.5-8.8 8.3-15.4Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 904,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#0b0b0b",
                fillOpacity: "0.42",
                d: "M26.3 28c3.4 2.7 5.1 5.3 5.1 8 0 3.3-2.1 5.3-5.4 5.3-3.4 0-5.6-2.2-5.6-5.7 0-2.7 1.7-5.1 5.9-7.6Z"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 908,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 889,
        columnNumber: 5
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
                lineNumber: 932,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 930,
        columnNumber: 5
    }, this);
}
function formatGender(gender) {
    const normalized = gender?.toLowerCase();
    if (!normalized) return K.gender;
    if (normalized === "male" || normalized === "m" || gender === "남자") return "남자";
    if (normalized === "female" || normalized === "f" || gender === "여자") return "여자";
    return gender;
}
function formatAge(age) {
    if (age === undefined || age === null || age === "") return K.age;
    return `${age}세`;
}
function ProfileSummaryCard() {
    const { user, setUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const [profileRequested, setProfileRequested] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [avatarSrc, setAvatarSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(user?.profileImageUrl || "/images/%EB%A0%B9%EB%83%A5/ghost-cat-avatar.png");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user || profileRequested || user.gender && user.age !== undefined) return;
        setProfileRequested(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMe"])().then((profile)=>setUser({
                ...user,
                ...profile
            })).catch(()=>undefined);
    }, [
        profileRequested,
        setUser,
        user
    ]);
    const displayName = user?.nickname || K.name;
    const genderLabel = formatGender(user?.gender);
    const ageLabel = formatAge(user?.age);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "overflow-hidden rounded-2xl border border-white/[0.075] bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.05),transparent_36%),linear-gradient(112deg,rgba(23,23,23,0.96),rgba(17,17,17,0.92)_48%,rgba(20,12,12,0.94)),rgba(18,18,18,0.9)] shadow-[0_28px_95px_rgba(0,0,0,0.48),0_0_34px_rgba(204,34,34,0.035)] backdrop-blur-md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid min-h-[156px] items-stretch lg:grid-cols-[350px_1fr_286px]",
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
                                lineNumber: 983,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 982,
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
                                            children: displayName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mypage/page.tsx",
                                            lineNumber: 998,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/mypage/settings",
                                            "aria-label": K.settings,
                                            title: K.settings,
                                            className: "inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#9a9a9a] transition-all hover:bg-white/[0.045] hover:text-[#ef5353]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                viewBox: "-2 -2 28 28",
                                                className: "h-[22px] w-[22px]",
                                                "aria-hidden": "true",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2.6",
                                                        d: "M9.6 2.8h4.8l.7 3.1c.5.2 1 .5 1.4.8l3-.9 2.4 4.2-2.3 2.1a7 7 0 0 1 0 1.8l2.3 2.1-2.4 4.2-3-.9c-.4.3-.9.6-1.4.8l-.7 3.1H9.6l-.7-3.1c-.5-.2-1-.5-1.4-.8l-3 .9L2.1 16l2.3-2.1a7 7 0 0 1 0-1.8L2.1 10l2.4-4.2 3 .9c.4-.3.9-.6 1.4-.8l.7-3.1Z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mypage/page.tsx",
                                                        lineNumber: 1012,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2.6",
                                                        d: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mypage/page.tsx",
                                                        lineNumber: 1020,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mypage/page.tsx",
                                                lineNumber: 1007,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mypage/page.tsx",
                                            lineNumber: 1001,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mypage/page.tsx",
                                    lineNumber: 997,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[13px] font-bold text-[#aaa]",
                                    children: [
                                        genderLabel,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mx-1.5 text-[#4d4d4d]",
                                            children: "·"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mypage/page.tsx",
                                            lineNumber: 1032,
                                            columnNumber: 29
                                        }, this),
                                        " ",
                                        ageLabel
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mypage/page.tsx",
                                    lineNumber: 1031,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 996,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 981,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 divide-x divide-y divide-white/[0.032] sm:grid-cols-4 sm:divide-y-0",
                    children: STATS.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-h-[132px] flex-col items-center justify-center px-4 text-center sm:min-h-[156px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-2.5 text-[11px] font-black text-[#6f6f6f]",
                                    children: stat.label
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mypage/page.tsx",
                                    lineNumber: 1043,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: [
                                        "text-[28px] font-black leading-none tracking-[0.01em] opacity-90",
                                        stat.accent
                                    ].join(" "),
                                    children: stat.value
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mypage/page.tsx",
                                    lineNumber: 1046,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, stat.label, true, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 1039,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 1037,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RankBadgeCard, {}, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 1058,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mypage/page.tsx",
            lineNumber: 980,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 979,
        columnNumber: 5
    }, this);
}
function RankBadgeCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "m-4 flex min-h-[132px] flex-col items-center justify-center rounded-xl border border-[#cc2222]/68 bg-[radial-gradient(circle_at_50%_0%,rgba(229,57,57,0.24),transparent_66%),linear-gradient(180deg,rgba(204,34,34,0.065),rgba(0,0,0,0.16)),#171010] px-5 text-center shadow-[0_0_34px_rgba(204,34,34,0.16),inset_0_0_24px_rgba(204,34,34,0.04)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-3 text-[11px] font-black tracking-[0.16em] text-[#c09a9a]",
                children: K.rankLabel
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1067,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex items-center justify-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TitleSymbol, {
                        type: "group",
                        className: "h-9 w-9 shrink-0 text-[#ef5353] drop-shadow-[0_0_16px_rgba(239,83,83,0.2)]"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1071,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "whitespace-nowrap text-[21px] font-black text-[#f5f5f5]",
                        children: K.rank
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1075,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1070,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-black text-[#ef5353]",
                children: K.topRank
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1079,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-xs font-black text-[#d58a80]",
                children: K.rankRule
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1080,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1066,
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
                        lineNumber: 1108,
                        columnNumber: 13
                    }, this)
                ]
            }, tab.key, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1095,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1093,
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
                                lineNumber: 1131,
                                columnNumber: 11
                            }, this),
                            title
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1130,
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
                        lineNumber: 1141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-xl border border-white/[0.075] bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] shadow-[0_20px_58px_rgba(0,0,0,0.38),0_0_28px_rgba(204,34,34,0.025)]",
                children: reservations.map((reservation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationRowCard, {
                        reservation: reservation,
                        isLast: index === reservations.length - 1
                    }, reservation.id, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1148,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1128,
        columnNumber: 5
    }, this);
}
function ReservationRowCard({ reservation, isLast }) {
    const status = getStatusStyle(reservation);
    const action = getActionText(reservation);
    const showStatusBadge = reservation.status !== "upcoming";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "grid min-h-[108px] items-center gap-4 px-4 py-4 transition-all hover:bg-white/[0.026] hover:shadow-[inset_0_0_28px_rgba(204,34,34,0.025)] sm:grid-cols-[150px_1fr] md:grid-cols-[150px_1fr_150px_150px_174px] xl:grid-cols-[160px_1fr_178px_178px_188px]",
            !isLast ? "border-b border-white/[0.042]" : ""
        ].join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeThumbnail, {
                src: reservation.imageUrl,
                alt: reservation.themeTitle,
                width: 150,
                className: "w-full sm:w-[150px] xl:w-[160px]"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1176,
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
                                lineNumber: 1185,
                                columnNumber: 11
                            }, this),
                            reservation.dday && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-md border border-[#d7b46a]/35 bg-[#d7b46a]/10 px-2 py-0.5 text-xs font-black text-[#d7b46a]",
                                children: reservation.dday
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1189,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1184,
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
                                        lineNumber: 1196,
                                        columnNumber: 13
                                    }, this),
                                    reservation.date,
                                    " (",
                                    reservation.day,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1195,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaIcon, {
                                        type: "time"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1200,
                                        columnNumber: 13
                                    }, this),
                                    reservation.time
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaIcon, {
                                        type: "location"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1204,
                                        columnNumber: 13
                                    }, this),
                                    reservation.location
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1203,
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
                                lineNumber: 1208,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1194,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-white/[0.055] bg-black/[0.14] px-3 py-2 md:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 text-xs font-black text-[#898989]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#777]",
                                        children: K.horror
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1215,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RatingIcons, {
                                        level: reservation.horrorLevel,
                                        type: "horror"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1216,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 text-xs font-black text-[#898989]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#777]",
                                        children: K.difficulty
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1219,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RatingIcons, {
                                        level: reservation.difficulty,
                                        type: "difficulty"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1220,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1218,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1213,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricBlock, {
                label: K.horror,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RatingIcons, {
                    level: reservation.horrorLevel,
                    type: "horror"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 1226,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricBlock, {
                label: K.difficulty,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RatingIcons, {
                    level: reservation.difficulty,
                    type: "difficulty"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 1229,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-end gap-2.5 sm:col-span-2 md:col-span-1",
                children: [
                    showStatusBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: [
                            "inline-flex h-7 min-w-[46px] items-center justify-center rounded-md border px-2.5 text-[11px] font-black",
                            status
                        ].join(" "),
                        children: getStatusText(reservation.status)
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1234,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "h-9 min-w-[104px] rounded-lg border border-[#cc2222]/58 bg-[#101010]/55 px-4 text-[13px] font-black text-[#ef5353] transition-all hover:border-[#cc2222]/90 hover:bg-[#cc2222]/10 hover:text-white max-sm:flex-1",
                        children: action
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1243,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1232,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1170,
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
                lineNumber: 1263,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1262,
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
                lineNumber: 1293,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationSection, {
                title: K.past,
                count: PAST_RESERVATIONS.length,
                tone: "past",
                reservations: PAST_RESERVATIONS
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1299,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1292,
        columnNumber: 5
    }, this);
}
function AchievementTabContent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5 space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AchievementSectionTitle, {
                title: "칭호",
                tone: "red"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
                children: TITLES.map((title)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TitleCard, {
                        title: title
                    }, title.id, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1315,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AchievementSectionTitle, {
                title: "업적",
                tone: "red",
                className: "pt-1"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1319,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
                children: ACHIEVEMENTS.map((achievement)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AchievementCard, {
                        achievement: achievement
                    }, achievement.id, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1322,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1320,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1311,
        columnNumber: 5
    }, this);
}
function AchievementSectionTitle({ title, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "flex items-center gap-2.5",
            className
        ].join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-2 w-2 rounded-full bg-[#e53939] shadow-[0_0_12px_rgba(229,57,57,0.54)]"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1339,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-[18px] font-black text-[#f5f5f5]",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1340,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1338,
        columnNumber: 5
    }, this);
}
function TitleCard({ title }) {
    const isCurrent = title.status === "current";
    const isLocked = title.status === "locked";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: [
            "relative flex min-h-[104px] items-center rounded-xl border bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] px-5 py-4 shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-all",
            isCurrent ? "border-[#cc2222]/58 shadow-[0_0_30px_rgba(204,34,34,0.12),0_18px_42px_rgba(0,0,0,0.34)]" : "border-white/[0.075]",
            isLocked ? "opacity-48" : "hover:border-white/[0.13] hover:bg-white/[0.018]"
        ].join(" "),
        children: [
            isCurrent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-md border border-[#cc2222]/60 bg-[#171111] px-2.5 py-1 text-[11px] font-black text-[#ef5353] shadow-[0_0_18px_rgba(204,34,34,0.18)]",
                children: "\ud604\uc7ac"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1361,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 items-center gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TitleSymbol, {
                        type: title.icon,
                        className: [
                            "h-10 w-10 shrink-0",
                            getTitleSymbolStyle(title)
                        ].join(" ")
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "truncate whitespace-nowrap text-[15px] font-black text-[#f5f5f5]",
                                children: title.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1373,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-0.5 line-clamp-2 text-[11px] font-bold leading-relaxed text-[#858585]",
                                children: title.condition
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1376,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1372,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1365,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1349,
        columnNumber: 5
    }, this);
}
function getTitleSymbolStyle(title) {
    if (title.status === "current") return "text-[#ef5353] drop-shadow-[0_0_16px_rgba(239,83,83,0.2)]";
    if (title.status === "locked") return "text-[#5f5f5f] opacity-70 drop-shadow-[0_0_10px_rgba(255,255,255,0.02)]";
    if (title.icon === "ghost") return "text-[#a8a8a8] drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]";
    if (title.icon === "user") return "text-[#a8a8a8] drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]";
    if (title.icon === "flame") return "text-[#a8a8a8] drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]";
    if (title.icon === "group") return "text-[#a8a8a8] drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]";
    return "text-[#8a7d67] drop-shadow-[0_0_12px_rgba(255,255,255,0.04)]";
}
function AchievementCard({ achievement }) {
    const locked = achievement.status === "locked";
    const complete = achievement.status === "complete";
    const inProgress = achievement.status === "progress";
    const percent = achievement.progress && achievement.total ? Math.min(100, Math.round(achievement.progress / achievement.total * 100)) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: [
            "relative min-h-[132px] rounded-xl border border-white/[0.075] bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-all",
            locked ? "opacity-48" : "hover:border-white/[0.13] hover:bg-white/[0.018] hover:shadow-[inset_0_0_28px_rgba(204,34,34,0.025),0_18px_42px_rgba(0,0,0,0.32)]"
        ].join(" "),
        children: [
            locked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LockIcon, {
                className: "absolute right-4 top-4 h-4 w-4 text-[#777]"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1422,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: [
                            "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border",
                            getAchievementIconStyle(achievement)
                        ].join(" "),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AchievementIcon, {
                            type: achievement.icon,
                            className: "h-8 w-8"
                        }, void 0, false, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 1431,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1425,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-1.5 flex items-start justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-[16px] font-black text-[#f5f5f5]",
                                        children: achievement.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1435,
                                        columnNumber: 13
                                    }, this),
                                    complete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "shrink-0 text-sm font-black text-[#2ecc71]",
                                        children: "\u2713"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1439,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1434,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-bold leading-relaxed text-[#898989]",
                                children: achievement.condition
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1444,
                                columnNumber: 11
                            }, this),
                            complete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 inline-flex items-center gap-1.5 text-xs font-black text-[#b9c7bd]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#2ecc71]",
                                        children: "\u2713"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1450,
                                        columnNumber: 15
                                    }, this),
                                    "\ud68d\ub4dd \uc644\ub8cc"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1449,
                                columnNumber: 13
                            }, this),
                            inProgress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-1.5 flex items-center justify-between text-xs font-black",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-md border border-[#cc2222]/35 bg-[#cc2222]/8 px-2 py-0.5 text-[#ef5353]",
                                                children: "진행 중"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mypage/page.tsx",
                                                lineNumber: 1457,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#aaa]",
                                                children: [
                                                    achievement.progress,
                                                    "/",
                                                    achievement.total
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mypage/page.tsx",
                                                lineNumber: 1460,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1456,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1.5 overflow-hidden rounded-full bg-white/[0.075]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: getProgressBarStyle(),
                                            style: {
                                                width: `${percent}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mypage/page.tsx",
                                            lineNumber: 1465,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1464,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1455,
                                columnNumber: 13
                            }, this),
                            locked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 inline-flex items-center gap-1.5 text-xs font-black text-[#777]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LockIcon, {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1474,
                                        columnNumber: 15
                                    }, this),
                                    "\uc7a0\uae08 \ud574\uc81c \ud544\uc694"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1473,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1433,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1424,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1413,
        columnNumber: 5
    }, this);
}
function getAchievementIconStyle(achievement) {
    if (achievement.accent === "lime") return "border-[#7ee063]/22 bg-[#1d341d] text-[#80df66] shadow-[inset_0_0_18px_rgba(126,224,99,0.14),0_8px_22px_rgba(0,0,0,0.24)]";
    if (achievement.accent === "teal") return "border-[#42d0a4]/22 bg-[#17342d] text-[#56d6ad] shadow-[inset_0_0_18px_rgba(66,208,164,0.14),0_8px_22px_rgba(0,0,0,0.24)]";
    if (achievement.accent === "rose") return "border-[#ff5d86]/24 bg-[#3b1724] text-[#ff6f96] shadow-[inset_0_0_18px_rgba(255,93,134,0.15),0_8px_22px_rgba(0,0,0,0.24)]";
    if (achievement.accent === "deepRed") return "border-[#b7192a]/26 bg-[#2f1014] text-[#e03543] shadow-[inset_0_0_18px_rgba(183,25,42,0.16),0_8px_22px_rgba(0,0,0,0.24)]";
    if (achievement.accent === "amber") return "border-[#f1bd44]/24 bg-[#352915] text-[#f1bf45] shadow-[inset_0_0_18px_rgba(241,189,68,0.13),0_8px_22px_rgba(0,0,0,0.24)]";
    if (achievement.accent === "orange") return "border-[#ff7043]/24 bg-[#371914] text-[#ff7043] shadow-[inset_0_0_18px_rgba(255,112,67,0.14),0_8px_22px_rgba(0,0,0,0.24)]";
    if (achievement.accent === "gold") return "border-[#c89b3c]/26 bg-[#302614] text-[#d6aa45] shadow-[inset_0_0_18px_rgba(200,155,60,0.15),0_8px_22px_rgba(0,0,0,0.24)]";
    return "border-[#ff4757]/24 bg-[#3a171a] text-[#ff4757] shadow-[inset_0_0_18px_rgba(255,71,87,0.14),0_8px_22px_rgba(0,0,0,0.24)]";
}
function getProgressBarStyle() {
    return "h-full rounded-full bg-[#ef3f4b] shadow-[0_0_12px_rgba(239,63,75,0.28)]";
}
function ActivityTabContent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5 space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActivitySection, {
                title: "내 후기",
                icon: "review",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3.5",
                    children: ACTIVITY_REVIEWS.map((review)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewActivityCard, {
                            review: review
                        }, review.id, false, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 1512,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 1510,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1509,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActivitySection, {
                title: "내가 쓴 글",
                icon: "post",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-hidden rounded-xl border border-white/[0.075] bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] shadow-[0_20px_58px_rgba(0,0,0,0.34)]",
                    children: ACTIVITY_POSTS.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PostActivityRow, {
                            post: post,
                            isLast: index === ACTIVITY_POSTS.length - 1
                        }, post.id, false, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 1520,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 1518,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1517,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActivitySection, {
                title: "내가 참여한 메이트 모집",
                icon: "mate",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4 lg:grid-cols-3",
                    children: ACTIVITY_MATES.map((mate)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MateActivityCard, {
                            mate: mate
                        }, mate.id, false, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 1532,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 1530,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1529,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1508,
        columnNumber: 5
    }, this);
}
function ActivitySection({ title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3.5 flex items-center gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "h-2 w-2 rounded-full bg-[#e53939] shadow-[0_0_12px_rgba(229,57,57,0.54)]"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1551,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-[18px] font-black text-[#f5f5f5]",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1552,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1550,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1549,
        columnNumber: 5
    }, this);
}
function ReviewActivityCard({ review }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "flex flex-col gap-4 rounded-xl border border-white/[0.075] bg-[radial-gradient(circle_at_9%_0%,rgba(255,255,255,0.045),transparent_34%),linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] p-3 shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-all hover:border-white/[0.13] hover:bg-white/[0.018] md:flex-row md:items-center md:p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeThumbnail, {
                src: review.imageUrl,
                alt: review.themeTitle,
                width: 216,
                className: "w-full shrink-0 md:w-[216px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.36))]"
                }, void 0, false, {
                    fileName: "[project]/src/app/mypage/page.tsx",
                    lineNumber: 1568,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1562,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2.5 flex flex-wrap items-start justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "truncate text-[18px] font-black text-[#f5f5f5]",
                                    children: review.themeTitle
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mypage/page.tsx",
                                    lineNumber: 1573,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1572,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-auto flex shrink-0 items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-[#747474]",
                                        children: review.date
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1578,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "h-8 rounded-md border border-white/[0.11] bg-[#101010]/55 px-3 text-xs font-black text-[#aaa] transition-all hover:border-white/[0.2] hover:text-white",
                                                children: "수정"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mypage/page.tsx",
                                                lineNumber: 1582,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "h-8 rounded-md border border-[#cc2222]/45 bg-[#101010]/55 px-3 text-xs font-black text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/10 hover:text-white",
                                                children: "삭제"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mypage/page.tsx",
                                                lineNumber: 1588,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1581,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1577,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1571,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-white/[0.055] bg-black/[0.16] px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StarRating, {
                                rating: review.rating
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1599,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 text-xs font-black text-[#898989]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#777]",
                                        children: "공포도"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1601,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RatingIcons, {
                                        level: review.horrorLevel,
                                        type: "horror"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1602,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1600,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 text-xs font-black text-[#898989]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#777]",
                                        children: "난이도"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1605,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RatingIcons, {
                                        level: review.difficulty,
                                        type: "difficulty"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1606,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1604,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1598,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "line-clamp-2 text-[13px] font-bold leading-relaxed text-[#b7b7b7]",
                        children: review.content
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1610,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap gap-2",
                        children: review.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-white/[0.09] bg-white/[0.035] px-2.5 py-1 text-[11px] font-bold text-[#8f8f8f]",
                                children: tag
                            }, tag, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1615,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1613,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1570,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1561,
        columnNumber: 5
    }, this);
}
function PostActivityRow({ post, isLast }) {
    const categoryStyle = post.category === "모집" ? "border-[#d7b46a]/35 bg-[#d7b46a]/8 text-[#d7b46a]" : "border-[#5d8fd8]/35 bg-[#5d8fd8]/8 text-[#7fa8df]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: [
            "grid min-h-[74px] items-center gap-3 px-4 py-3.5 transition-all hover:bg-white/[0.026] sm:grid-cols-[64px_92px_1fr_72px]",
            !isLast ? "border-b border-white/[0.042]" : ""
        ].join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: [
                    "inline-flex h-8 w-fit items-center justify-center rounded-md border px-3 text-xs font-black",
                    categoryStyle
                ].join(" "),
                children: post.category
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1646,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-bold text-[#777]",
                children: post.date
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1654,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "min-w-0 truncate text-[15px] font-black text-[#e7e7e7]",
                children: post.title
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1655,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-1.5 justify-self-start text-sm font-bold text-[#898989] sm:justify-self-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActivityLineIcon, {
                        type: "comment",
                        className: "h-4 w-4 text-[#b5b5b5]"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1659,
                        columnNumber: 9
                    }, this),
                    post.comments
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1658,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1640,
        columnNumber: 5
    }, this);
}
function MateActivityCard({ mate }) {
    const isClosed = mate.status === "closed";
    const progress = Math.min(100, Math.round(mate.currentMembers / Math.max(mate.totalMembers, 1) * 100));
    const isAuthor = !!mate.isAuthor;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: [
            "group overflow-hidden rounded-xl border border-white/[0.075] bg-[linear-gradient(180deg,rgba(24,24,24,0.94),rgba(18,18,18,0.91)),rgba(18,18,18,0.9)] shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-all",
            isClosed ? "opacity-[0.62]" : "hover:border-[#cc2222]/48 hover:shadow-[0_18px_48px_rgba(204,34,34,0.09)]"
        ].join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeThumbnail, {
                src: mate.imageUrl,
                alt: mate.themeTitle,
                className: "group-hover:scale-[1.035]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.18)_44%,rgba(18,18,18,0.96))]"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1687,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-4 top-4 flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-md border border-[#cc2222]/45 bg-[#cc2222]/18 px-2.5 py-1 text-[11px] font-black text-[#ef5353]",
                                children: mate.themeTitle
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1689,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-md border border-white/[0.14] bg-black/35 px-2.5 py-1 text-[11px] font-bold text-[#c7c7c7]",
                                children: mate.location
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1692,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1688,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1682,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "line-clamp-2 min-h-[44px] text-[17px] font-black leading-snug text-[#f5f5f5]",
                        children: mate.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1699,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-[#858585]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaIcon, {
                                        type: "date"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1704,
                                        columnNumber: 13
                                    }, this),
                                    mate.date
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1703,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaIcon, {
                                        type: "time"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1708,
                                        columnNumber: 13
                                    }, this),
                                    mate.time
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1707,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1702,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1698,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/[0.06] px-4 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex items-center justify-between gap-3 text-xs font-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 text-[#8d8d8d]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActivityLineIcon, {
                                        type: "users",
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1717,
                                        columnNumber: 13
                                    }, this),
                                    "현재 인원"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1716,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#bdbdbd]",
                                children: [
                                    mate.currentMembers,
                                    "/",
                                    mate.totalMembers,
                                    "명"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1720,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1715,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 h-1.5 overflow-hidden rounded-full bg-white/[0.075]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "block h-full rounded-full bg-[#b93a3a] shadow-[0_0_12px_rgba(204,34,34,0.28)]",
                            style: {
                                width: `${progress}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/mypage/page.tsx",
                            lineNumber: 1725,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1724,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MateStatusBadge, {
                                status: mate.status
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1731,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "h-9 rounded-md border px-4 text-xs font-black transition-all border-[#cc2222]/58 bg-[#101010]/55 text-[#ef5353] hover:border-[#cc2222]/90 hover:bg-[#cc2222]/10 hover:text-white",
                                children: isAuthor ? "관리하기" : "상세보기"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1732,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1730,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1714,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1674,
        columnNumber: 5
    }, this);
}
function MateStatusBadge({ status }) {
    if (status === "closed") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "rounded-md border border-white/[0.1] bg-white/[0.035] px-2.5 py-1 text-[11px] font-black text-[#777]",
        children: "마감"
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1749,
        columnNumber: 7
    }, this);
    if (status === "joined") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "rounded-md border border-[#2ecc71]/34 bg-[#2ecc71]/9 px-2.5 py-1 text-[11px] font-black text-[#2ecc71]",
        children: "참여중"
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1755,
        columnNumber: 7
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "rounded-md border border-[#cc2222]/45 bg-[#cc2222]/8 px-2.5 py-1 text-[11px] font-black text-[#ef5353]",
        children: "모집중"
    }, void 0, false, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1760,
        columnNumber: 5
    }, this);
}
function MyPage() {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("reservation");
    const currentTabLabel = TABS.find((item)=>item.key === tab)?.label ?? K.reservation;
    const currentSubtitle = tab === "achievement" ? "\ub098\uc758 \uc5c5\uc801\uacfc \uce6d\ud638\ub97c \ud655\uc778\ud574\ubcf4\uc138\uc694." : tab === "activity" ? "내 후기와 글, 참여 중인 메이트 모집을 확인해보세요." : K.subtitle;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen overflow-hidden bg-[#0b0b0b] text-[#f5f5f5]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_86%_9%,rgba(150,20,20,0.42),transparent_30%),radial-gradient(circle_at_2%_82%,rgba(150,24,24,0.34),transparent_28%),radial-gradient(circle_at_24%_14%,rgba(204,34,34,0.105),transparent_32%),linear-gradient(180deg,#0b0b0b_0%,#101010_46%,#090909_100%)]"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1778,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_82%_13%,rgba(255,70,70,0.55)_0_1px,transparent_1px),radial-gradient(circle_at_9%_78%,rgba(255,60,60,0.5)_0_1px,transparent_1px)] [background-size:34px_34px,46px_46px] blur-[0.5px]"
            }, void 0, false, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1779,
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
                                lineNumber: 1782,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: ">"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1785,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: K.mypage
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1786,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: ">"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1787,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#f5f5f5]",
                                children: currentTabLabel
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1788,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1781,
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
                                lineNumber: 1792,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "flex items-center gap-3 text-[38px] font-black leading-tight md:text-[50px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PageTitleIcon, {
                                        className: "h-11 w-11 shrink-0 self-center md:h-[52px] md:w-[52px]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1796,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#e63946]",
                                                children: K.titleLead
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mypage/page.tsx",
                                                lineNumber: 1798,
                                                columnNumber: 15
                                            }, this),
                                            K.titleRest
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mypage/page.tsx",
                                        lineNumber: 1797,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1795,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm font-bold text-[#aaa]",
                                children: currentSubtitle
                            }, void 0, false, {
                                fileName: "[project]/src/app/mypage/page.tsx",
                                lineNumber: 1802,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1791,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileSummaryCard, {}, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1807,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationTabs, {
                        active: tab,
                        onChange: setTab
                    }, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1808,
                        columnNumber: 9
                    }, this),
                    tab === "reservation" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationTabContent, {}, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1810,
                        columnNumber: 35
                    }, this),
                    tab === "achievement" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AchievementTabContent, {}, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1811,
                        columnNumber: 35
                    }, this),
                    tab === "activity" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActivityTabContent, {}, void 0, false, {
                        fileName: "[project]/src/app/mypage/page.tsx",
                        lineNumber: 1812,
                        columnNumber: 32
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mypage/page.tsx",
                lineNumber: 1780,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mypage/page.tsx",
        lineNumber: 1777,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b1bfb828._.js.map