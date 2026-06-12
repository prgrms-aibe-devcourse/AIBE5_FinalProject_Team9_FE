(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/common/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const variantStyles = {
    primary: 'bg-[#e63946] hover:bg-[#c1121f] text-white',
    secondary: 'bg-transparent border border-[#e63946] text-[#e63946] hover:bg-[#e63946] hover:text-white',
    ghost: 'bg-transparent text-[#f5f5f5] hover:bg-[#2a2a2a]'
};
const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
};
function Button(param) {
    let { variant = 'primary', size = 'md', children, fullWidth = false, loading = false, className = '', disabled, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        disabled: disabled || loading,
        className: [
            'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
            variantStyles[variant],
            sizeStyles[size],
            fullWidth ? 'w-full' : '',
            className
        ].join(' '),
        ...props,
        children: [
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/src/components/common/Button.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this) : null,
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/Button.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/axios.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/token.ts [app-client] (ecmascript)");
;
;
const baseURL = ("TURBOPACK compile-time value", "http://localhost:8080") || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
const extractTokens = (body)=>{
    var _body_data, _body_data1;
    var _body_accessToken;
    const accessToken = (_body_accessToken = body.accessToken) !== null && _body_accessToken !== void 0 ? _body_accessToken : (_body_data = body.data) === null || _body_data === void 0 ? void 0 : _body_data.accessToken;
    var _body_refreshToken;
    const refreshToken = (_body_refreshToken = body.refreshToken) !== null && _body_refreshToken !== void 0 ? _body_refreshToken : (_body_data1 = body.data) === null || _body_data1 === void 0 ? void 0 : _body_data1.refreshToken;
    return {
        accessToken,
        refreshToken
    };
};
const redirectToLogin = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        window.location.href = '/login';
    }
};
axiosInstance.interceptors.request.use((config)=>{
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
    if (token) {
        config.headers.Authorization = "Bearer ".concat(token);
    }
    return config;
}, (error)=>Promise.reject(error));
axiosInstance.interceptors.response.use((response)=>response, async (error)=>{
    var _error_response, _originalRequest_url;
    const originalRequest = error.config;
    if (((_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status) !== 401 || !originalRequest || originalRequest._retry || ((_originalRequest_url = originalRequest.url) === null || _originalRequest_url === void 0 ? void 0 : _originalRequest_url.includes('/api/auth/refresh'))) {
        return Promise.reject(error);
    }
    const refreshToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRefreshToken"])();
    if (!refreshToken) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeToken"])();
        redirectToLogin();
        return Promise.reject(error);
    }
    originalRequest._retry = true;
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(baseURL, "/api/auth/refresh"), {
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthTokens"])({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
        originalRequest.headers.Authorization = "Bearer ".concat(tokens.accessToken);
        return axiosInstance(originalRequest);
    } catch (refreshError) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeToken"])();
        redirectToLogin();
        return Promise.reject(refreshError);
    }
});
const __TURBOPACK__default__export__ = axiosInstance;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/authService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/token.ts [app-client] (ecmascript)");
;
;
;
const getAuthErrorMessage = (error, fallbackMessage)=>{
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isAxiosError(error)) {
        var _error_response, _responseData_data, _responseData_data1;
        const responseData = (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.data;
        var _responseData_message, _ref, _ref1, _ref2;
        return (_ref2 = (_ref1 = (_ref = (_responseData_message = responseData === null || responseData === void 0 ? void 0 : responseData.message) !== null && _responseData_message !== void 0 ? _responseData_message : responseData === null || responseData === void 0 ? void 0 : responseData.error) !== null && _ref !== void 0 ? _ref : responseData === null || responseData === void 0 ? void 0 : (_responseData_data = responseData.data) === null || _responseData_data === void 0 ? void 0 : _responseData_data.message) !== null && _ref1 !== void 0 ? _ref1 : responseData === null || responseData === void 0 ? void 0 : (_responseData_data1 = responseData.data) === null || _responseData_data1 === void 0 ? void 0 : _responseData_data1.error) !== null && _ref2 !== void 0 ? _ref2 : fallbackMessage;
    }
    return fallbackMessage;
};
const normalizeRole = (role)=>{
    if (role === 'MANAGER' || role === 'OWNER') return 'OWNER';
    if (role === 'ADMIN') return 'ADMIN';
    return 'USER';
};
const createUserFromPayload = (payload)=>{
    if (!(payload === null || payload === void 0 ? void 0 : payload.id) || !payload.email || !payload.nickname) return undefined;
    var _payload_isEmailPublic, _payload_isAgePublic, _payload_isGenderPublic;
    return {
        id: payload.id,
        email: payload.email,
        nickname: payload.nickname,
        role: normalizeRole(payload.role),
        profileImageUrl: payload.profileImageUrl,
        gender: payload.gender,
        age: payload.age,
        phone: payload.phone,
        isEmailPublic: (_payload_isEmailPublic = payload.isEmailPublic) !== null && _payload_isEmailPublic !== void 0 ? _payload_isEmailPublic : payload.emailVisible,
        isAgePublic: (_payload_isAgePublic = payload.isAgePublic) !== null && _payload_isAgePublic !== void 0 ? _payload_isAgePublic : payload.ageVisible,
        isGenderPublic: (_payload_isGenderPublic = payload.isGenderPublic) !== null && _payload_isGenderPublic !== void 0 ? _payload_isGenderPublic : payload.genderVisible
    };
};
const createPartialUserFromPayload = (payload)=>{
    if (!payload) return {};
    var _payload_isEmailPublic, _payload_isAgePublic, _payload_isGenderPublic;
    return {
        id: payload.id,
        email: payload.email,
        nickname: payload.nickname,
        role: payload.role ? normalizeRole(payload.role) : undefined,
        profileImageUrl: payload.profileImageUrl,
        gender: payload.gender,
        age: payload.age,
        phone: payload.phone,
        isEmailPublic: (_payload_isEmailPublic = payload.isEmailPublic) !== null && _payload_isEmailPublic !== void 0 ? _payload_isEmailPublic : payload.emailVisible,
        isAgePublic: (_payload_isAgePublic = payload.isAgePublic) !== null && _payload_isAgePublic !== void 0 ? _payload_isAgePublic : payload.ageVisible,
        isGenderPublic: (_payload_isGenderPublic = payload.isGenderPublic) !== null && _payload_isGenderPublic !== void 0 ? _payload_isGenderPublic : payload.genderVisible
    };
};
const extractAuthPayload = (response)=>{
    var _response_data, _response_data1, _response_data2;
    var _response_accessToken;
    const accessToken = (_response_accessToken = response.accessToken) !== null && _response_accessToken !== void 0 ? _response_accessToken : (_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.accessToken;
    var _response_refreshToken;
    const refreshToken = (_response_refreshToken = response.refreshToken) !== null && _response_refreshToken !== void 0 ? _response_refreshToken : (_response_data1 = response.data) === null || _response_data1 === void 0 ? void 0 : _response_data1.refreshToken;
    var _response_user, _ref, _ref1;
    const user = (_ref1 = (_ref = (_response_user = response.user) !== null && _response_user !== void 0 ? _response_user : (_response_data2 = response.data) === null || _response_data2 === void 0 ? void 0 : _response_data2.user) !== null && _ref !== void 0 ? _ref : createUserFromPayload(response.data)) !== null && _ref1 !== void 0 ? _ref1 : createUserFromPayload(response);
    return {
        accessToken,
        refreshToken,
        user
    };
};
const loginUser = async function(credentials) {
    let role = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'member';
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/auth/login/".concat(role), credentials);
    console.log(data);
    return data;
};
const signupUser = async function(payload) {
    let role = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'member';
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/auth/register/".concat(role), payload);
    return data;
};
const logoutUser = async ()=>{
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/auth/logout', {
        refreshToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRefreshToken"])()
    });
};
const getMe = async ()=>{
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/auth/me');
    var _data_data;
    const payload = (_data_data = data.data) !== null && _data_data !== void 0 ? _data_data : data;
    return createPartialUserFromPayload(payload);
};
const loginWithGoogle = async (code)=>{
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/auth/google', {
        code
    });
    return data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const useAuth = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, isLoggedIn, login, logout, setUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const handleLogin = async function(credentials) {
        let role = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'member';
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginUser"])(credentials, role);
        const { accessToken, refreshToken, user: userData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractAuthPayload"])(response);
        if (!accessToken || !refreshToken) {
            throw new Error('로그인 응답에 토큰이 없습니다.');
        }
        const fallbackUser = {
            id: 0,
            email: credentials.email,
            nickname: credentials.email.split('@')[0],
            role: role === 'manager' ? 'OWNER' : 'USER'
        };
        const initialUser = userData !== null && userData !== void 0 ? userData : fallbackUser;
        login(initialUser, accessToken, refreshToken);
        let currentUser = initialUser;
        try {
            const profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMe"])();
            currentUser = {
                ...initialUser,
                ...profile
            };
            setUser(currentUser);
        } catch (e) {
            currentUser = initialUser;
        }
        router.push('/');
        return currentUser;
    };
    const handleLogout = async ()=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])();
        } finally{
            logout();
            router.push('/login');
        }
    };
    return {
        user,
        isLoggedIn,
        handleLogin,
        handleLogout,
        setUser
    };
};
_s(useAuth, "eGR+wApQiE+BEkIYHA7UzyqJuXg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/LoginForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function LoginForm() {
    _s();
    const { handleLogin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('member');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [rememberMe, setRememberMe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await handleLogin({
                email,
                password,
                rememberMe
            }, role);
        } catch (loginError) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthErrorMessage"])(loginError, '이메일 또는 비밀번호를 확인해주세요.'));
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex border-b border-[#2a2a2a]",
                children: [
                    'member',
                    'manager'
                ].map((authRole)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setRole(authRole),
                        className: [
                            'flex-1 py-2.5 text-sm font-medium transition-colors',
                            role === authRole ? 'border-b-2 border-[#e63946] text-[#e63946]' : 'text-[#888] hover:text-[#f5f5f5]'
                        ].join(' '),
                        children: authRole === 'member' ? '일반 회원' : '매니저'
                    }, authRole, false, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm text-[#888] mb-1",
                        children: "이메일"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "email",
                        value: email,
                        onChange: (e)=>setEmail(e.target.value),
                        required: true,
                        placeholder: "grimgater@example.com",
                        className: "w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm text-[#888] mb-1",
                        children: "비밀번호"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "password",
                        value: password,
                        onChange: (e)=>setPassword(e.target.value),
                        required: true,
                        placeholder: "비밀번호 입력",
                        className: "w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-sm text-[#f5f5f5] placeholder-[#555] focus:outline-none focus:border-[#e63946]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "flex items-center gap-2 text-sm text-[#888] cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        checked: rememberMe,
                        onChange: (e)=>setRememberMe(e.target.checked),
                        className: "accent-[#e63946]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    "로그인 상태 유지"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-[#e63946]",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 91,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                type: "submit",
                fullWidth: true,
                loading: loading,
                children: "로그인"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative text-center text-xs text-[#555]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative z-10 bg-[#0d0d0d] px-2",
                        children: "또는"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full border-t border-[#2a2a2a]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/LoginForm.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "w-full flex items-center justify-center gap-2 bg-white text-gray-700 text-sm py-2.5 rounded hover:bg-gray-100 transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-4 h-4",
                        children: "G"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    "구글로 로그인"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-xs text-[#888]",
                children: [
                    "계정이 없으신가요?",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/signup",
                        className: "text-[#e63946] hover:underline",
                        children: "회원가입"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/auth/LoginForm.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(LoginForm, "hvQht1KhguWMfaTSKLVJJN/udBE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = LoginForm;
var _c;
__turbopack_context__.k.register(_c, "LoginForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_346a18c1._.js.map