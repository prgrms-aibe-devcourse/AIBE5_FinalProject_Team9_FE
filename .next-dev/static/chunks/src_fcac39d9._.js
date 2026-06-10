(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/stores/reservationStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useReservationStore",
    ()=>useReservationStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
'use client';
;
const initialState = {
    themeId: null,
    themeTitle: '',
    themeImageUrl: '',
    locationName: '',
    branchName: '',
    date: '',
    time: '',
    adultCount: 2,
    teenCount: 0
};
const useReservationStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((set)=>({
        ...initialState,
        setTheme: function(themeId, themeTitle) {
            let imageUrl = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : '';
            return set({
                themeId,
                themeTitle,
                themeImageUrl: imageUrl
            });
        },
        setLocation: (locationName, branchName)=>set({
                locationName,
                branchName
            }),
        setDateTime: (date, time)=>set({
                date,
                time
            }),
        setHeadcount: (adultCount, teenCount)=>set({
                adultCount,
                teenCount
            }),
        reset: ()=>set(initialState)
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/reservation/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReservationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$reservationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/reservationStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const MOCK_THEMES = [
    {
        id: 1,
        title: '감옥 탈출',
        description: '탈출 불가능한 감옥에 갇힌 당신. 문은 잠겼고, 감시의 눈은 점점 가까워진다.',
        genre: '공포/미스터리',
        difficulty: 4,
        horrorLevel: 5,
        minPlayers: 2,
        maxPlayers: 4,
        duration: 80,
        price: 28000,
        imageUrl: 'https://picsum.photos/seed/grimgate1/400/300',
        rating: 4.9,
        reviewCount: 342,
        isBest: true,
        locationName: '홍대',
        branchName: '홍대 1호점',
        clearRate: 41
    },
    {
        id: 2,
        title: '13번째 방',
        description: '전설의 13번째 방에 들어간 사람은 아무도 돌아오지 못했다.',
        genre: '공포/스릴러',
        difficulty: 5,
        horrorLevel: 3,
        minPlayers: 3,
        maxPlayers: 6,
        duration: 90,
        price: 30000,
        imageUrl: 'https://picsum.photos/seed/grimgate2/400/300',
        rating: 4.9,
        reviewCount: 312,
        isBest: true,
        locationName: '홍대',
        branchName: '홍대 6호점',
        clearRate: 38
    },
    {
        id: 3,
        title: '블러드문',
        description: '붉은 달이 뜨는 밤, 오래된 저주가 다시 시작된다.',
        genre: '공포/추리',
        difficulty: 5,
        horrorLevel: 5,
        minPlayers: 3,
        maxPlayers: 6,
        duration: 90,
        price: 32000,
        imageUrl: 'https://picsum.photos/seed/grimgate3/400/300',
        rating: 4.8,
        reviewCount: 289,
        isHot: true,
        locationName: '강남',
        branchName: '강남 8호점',
        clearRate: 57
    },
    {
        id: 4,
        title: '좀비 아포칼립스',
        description: '바이러스가 창궐한 도시에서 마지막 탈출 경로를 찾아야 한다.',
        genre: '액션/공포',
        difficulty: 3,
        horrorLevel: 4,
        minPlayers: 2,
        maxPlayers: 6,
        duration: 75,
        price: 26000,
        imageUrl: 'https://picsum.photos/seed/grimgate4/400/300',
        rating: 4.8,
        reviewCount: 275,
        isHot: true,
        locationName: '강남',
        branchName: '강남 3호점',
        clearRate: 62
    },
    {
        id: 5,
        title: '미상의 초상화',
        description: '그림 속 인물이 당신을 따라온다. 액자 뒤에 숨은 진실을 찾아라.',
        genre: '추리/공포',
        difficulty: 4,
        horrorLevel: 4,
        minPlayers: 1,
        maxPlayers: 6,
        duration: 70,
        price: 25000,
        imageUrl: 'https://picsum.photos/seed/grimgate5/400/300',
        rating: 4.5,
        reviewCount: 287,
        locationName: '건대',
        branchName: '건대 2호점',
        clearRate: 44
    },
    {
        id: 6,
        title: '체이서',
        description: '사라진 의뢰인을 추적하다 발견한 단서는 더 큰 함정으로 이어진다.',
        genre: '스릴러',
        difficulty: 5,
        horrorLevel: 5,
        minPlayers: 2,
        maxPlayers: 4,
        duration: 75,
        price: 27000,
        imageUrl: 'https://picsum.photos/seed/grimgate6/400/300',
        rating: 4.8,
        reviewCount: 234,
        isHot: true,
        locationName: '건대',
        branchName: '건대 6호점',
        clearRate: 41
    },
    {
        id: 7,
        title: '감옥 탈출 2',
        description: '탈출은 가능하지만 살아남기는 어렵다. 제한 시간 안에 문을 열어라.',
        genre: '스릴러',
        difficulty: 4,
        horrorLevel: 4,
        minPlayers: 2,
        maxPlayers: 7,
        duration: 60,
        price: 22000,
        imageUrl: 'https://picsum.photos/seed/grimgate7/400/300',
        rating: 4.5,
        reviewCount: 221,
        isHot: true,
        locationName: '건대',
        branchName: '건대 2호점',
        clearRate: 68
    },
    {
        id: 8,
        title: '사일런스',
        description: '소리를 내면 끝난다. 침묵 속에서 탈출구를 찾아라.',
        genre: '공포/스릴러',
        difficulty: 3,
        horrorLevel: 4,
        minPlayers: 2,
        maxPlayers: 6,
        duration: 70,
        price: 24000,
        imageUrl: 'https://picsum.photos/seed/grimgate8/400/300',
        rating: 4.5,
        reviewCount: 203,
        locationName: '신촌',
        branchName: '신촌 4호점',
        clearRate: 72
    },
    {
        id: 9,
        title: '인형의 방',
        description: '움직이지 않아야 할 인형들이 당신의 뒤를 따라온다.',
        genre: '공포',
        difficulty: 4,
        horrorLevel: 4,
        minPlayers: 2,
        maxPlayers: 6,
        duration: 75,
        price: 25000,
        imageUrl: 'https://picsum.photos/seed/grimgate9/400/300',
        rating: 4.7,
        reviewCount: 198,
        locationName: '홍대',
        branchName: '홍대 3호점',
        clearRate: 55
    },
    {
        id: 10,
        title: '낡은 인형',
        description: '오래된 인형이 남긴 단서를 따라 마지막 방으로 향한다.',
        genre: '공포',
        difficulty: 3,
        horrorLevel: 4,
        minPlayers: 2,
        maxPlayers: 4,
        duration: 65,
        price: 23000,
        imageUrl: 'https://picsum.photos/seed/grimgate10/400/300',
        rating: 4.5,
        reviewCount: 188,
        locationName: '강남',
        branchName: '강남 5호점',
        clearRate: 61
    },
    {
        id: 11,
        title: '저주받은 극장',
        description: '닫힌 극장에서 울려 퍼지는 마지막 공연의 비밀을 밝혀라.',
        genre: '미스터리',
        difficulty: 3,
        horrorLevel: 4,
        minPlayers: 2,
        maxPlayers: 6,
        duration: 80,
        price: 25000,
        imageUrl: 'https://picsum.photos/seed/grimgate11/400/300',
        rating: 4.6,
        reviewCount: 180,
        locationName: '강남',
        branchName: '강남 1호점',
        clearRate: 59
    },
    {
        id: 12,
        title: '악마의 계약',
        description: '계약서에 서명하면 다시 돌아갈 수 없다. 선택은 당신의 몫이다.',
        genre: '공포/스릴러',
        difficulty: 4,
        horrorLevel: 5,
        minPlayers: 2,
        maxPlayers: 5,
        duration: 75,
        price: 26000,
        imageUrl: 'https://picsum.photos/seed/grimgate12/400/300',
        rating: 4.4,
        reviewCount: 165,
        locationName: '건대',
        branchName: '건대 1호점',
        clearRate: 48
    }
];
const LOCATIONS = [
    '강남',
    '홍대',
    '건대',
    '신촌'
];
const SORT_OPTIONS = [
    {
        value: 'popular',
        label: '인기순'
    },
    {
        value: 'latest',
        label: '최신순'
    }
];
const BASE_TIMES = [
    '11:00',
    '13:00',
    '15:00',
    '17:00',
    '19:00',
    '21:00'
];
const PER_PAGE = 5;
const TEEN_PRICE = 20000;
function getUpcomingDates() {
    let count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 3;
    const today = new Date();
    const days = [
        '일',
        '월',
        '화',
        '수',
        '목',
        '금',
        '토'
    ];
    return Array.from({
        length: count
    }, (_, index)=>{
        const date = new Date(today);
        date.setDate(date.getDate() + index + 1);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return {
            dateStr: "".concat(date.getFullYear(), "-").concat(String(month).padStart(2, '0'), "-").concat(String(day).padStart(2, '0')),
            label: "".concat(month, ".").concat(day, "(").concat(days[date.getDay()], ")")
        };
    });
}
function getSlots(themeId, dateIndex) {
    const soldOut = new Set([
        (themeId + dateIndex * 2) % 6,
        (themeId * 3 + dateIndex + 4) % 6
    ]);
    return BASE_TIMES.map((time, index)=>({
            time,
            soldOut: soldOut.has(index)
        }));
}
function formatDateLabel(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const days = [
        '일',
        '월',
        '화',
        '수',
        '목',
        '금',
        '토'
    ];
    return "".concat(dateStr, " (").concat(days[date.getDay()], ")");
}
function formatPrice(value) {
    return "".concat(value.toLocaleString('ko-KR'), "원");
}
function StepBar(param) {
    let { step } = param;
    const steps = [
        {
            n: 1,
            label: '지점/테마/시간 선택'
        },
        {
            n: 2,
            label: '결제'
        },
        {
            n: 3,
            label: '예약 완료'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative border-b border-white/[0.08] bg-[#0d0d0d]/92 backdrop-blur",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-[1480px] items-center justify-center px-4 py-4 sm:px-6 lg:px-8",
            children: steps.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: [
                                        'flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold',
                                        step > item.n ? 'border-[#2ecc71] bg-[#2ecc71] text-white' : step === item.n ? 'border-[#e63946] bg-[#e63946] text-white' : 'border-[#444] bg-transparent text-[#444]'
                                    ].join(' '),
                                    children: step > item.n ? '✓' : item.n
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: [
                                        'hidden text-xs sm:inline',
                                        step === item.n ? 'font-medium text-[#f5f5f5]' : 'text-[#444]'
                                    ].join(' '),
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this),
                        index < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: [
                                'mx-3 h-px w-12 sm:w-20',
                                step > item.n ? 'bg-[#2ecc71]' : 'bg-[#2a2a2a]'
                            ].join(' ')
                        }, void 0, false, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 104,
                            columnNumber: 15
                        }, this)
                    ]
                }, item.n, true, {
                    fileName: "[project]/src/app/reservation/page.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/app/reservation/page.tsx",
            lineNumber: 83,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_c = StepBar;
function ReservationSkullIcon(param) {
    let { className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 16 16",
        "aria-hidden": "true",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fill: "currentColor",
            d: "M8 1.7c-3.1 0-5.2 2.1-5.2 5.1 0 1.8.8 3.2 2 4v2.1c0 .8.6 1.4 1.4 1.4h3.6c.8 0 1.4-.6 1.4-1.4v-2.1c1.2-.8 2-2.2 2-4 0-3-2.1-5.1-5.2-5.1Zm-2.1 7.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4Zm2.1 1.5c-.4 0-.8-.3-.8-.7 0-.3.5-1.2.8-1.7.3.5.8 1.4.8 1.7 0 .4-.4.7-.8.7Zm2.1-1.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4ZM6.1 12.1h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Zm1.5 0h.8v1h-.8v-1Z"
        }, void 0, false, {
            fileName: "[project]/src/app/reservation/page.tsx",
            lineNumber: 116,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_c1 = ReservationSkullIcon;
function ReservationLockIcon(param) {
    let { className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 16 16",
        "aria-hidden": "true",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            fill: "currentColor",
            d: "M4.2 6.7V5.2C4.2 3 5.8 1.5 8 1.5s3.8 1.5 3.8 3.7v1.5h.4c.8 0 1.3.6 1.3 1.3v5.1c0 .8-.6 1.4-1.4 1.4H3.9c-.8 0-1.4-.6-1.4-1.4V8c0-.8.6-1.3 1.3-1.3h.4Zm1.7 0h4.2V5.2c0-1.2-.8-2-2.1-2s-2.1.8-2.1 2v1.5Z"
        }, void 0, false, {
            fileName: "[project]/src/app/reservation/page.tsx",
            lineNumber: 127,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_c2 = ReservationLockIcon;
function ReservationRatingIcons(param) {
    let { level, type } = param;
    const Icon = type === 'horror' ? ReservationSkullIcon : ReservationLockIcon;
    const activeColor = type === 'horror' ? 'text-[#c94a4a]' : 'text-[#d7b46a]';
    const activeShadow = type === 'horror' ? 'drop-shadow-[0_0_5px_rgba(204,34,34,0.16)]' : 'drop-shadow-[0_0_5px_rgba(215,180,106,0.2)]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5",
        children: Array.from({
            length: 5
        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: [
                    'h-4 w-4 transition-all',
                    index < level ? "".concat(activeColor, " ").concat(activeShadow, " opacity-100") : 'text-[#303030] opacity-45'
                ].join(' ')
            }, index, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_c3 = ReservationRatingIcons;
function FilterRatingControl(param) {
    let { label, value, type, onChange } = param;
    const Icon = type === 'horror' ? ReservationSkullIcon : ReservationLockIcon;
    const activeColor = type === 'horror' ? 'text-[#c94a4a]' : 'text-[#d7b46a]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onChange(0),
                        className: [
                            'h-8 rounded-full border px-3 text-xs font-black transition-all',
                            value === 0 ? 'border-[#cc2222]/60 bg-[#cc2222]/12 text-[#ef5353]' : 'border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]'
                        ].join(' '),
                        children: "전체"
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-1 items-center gap-1",
                        children: Array.from({
                            length: 5
                        }).map((_, index)=>{
                            const level = index + 1;
                            const isActive = value >= level;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onChange(level),
                                "aria-label": "".concat(label, " ").concat(level, "단계"),
                                className: "flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-white/[0.05]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: [
                                        'h-[17px] w-[17px] transition-all',
                                        isActive ? "".concat(activeColor, " opacity-100") : 'text-[#343434] opacity-55 hover:text-[#5a5a5a] hover:opacity-75'
                                    ].join(' ')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 17
                                }, this)
                            }, level, false, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 200,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
_c4 = FilterRatingControl;
function ThemeListRow(param) {
    let { theme, dates, onQuickBook } = param;
    var _theme_rating;
    _s();
    const [activeDateIdx, setActiveDateIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedTime, setSelectedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showTimeNotice, setShowTimeNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const slots = getSlots(theme.id, activeDateIdx);
    const showcaseDescription = theme.description.length > 80 ? theme.description : "".concat(theme.description, "\n문은 잠겼고, 감시의 눈은 점점 가까워진다.\n남은 단서는 어둠 속에 숨겨진 흔적뿐.\n시간이 흐를수록 탈출의 기회는 사라진다.");
    const handleBook = ()=>{
        if (!selectedTime) {
            setShowTimeNotice(true);
            return;
        }
        onQuickBook(theme, dates[activeDateIdx].dateStr, selectedTime);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto w-full max-w-[1120px] overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#171717] shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-[#cc2222]/70 hover:bg-[#1b1b1b] hover:shadow-[0_18px_48px_rgba(204,34,34,0.16)]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid min-h-[308px] grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_380px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative min-h-[300px] shrink-0 overflow-hidden bg-[#111] lg:min-h-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: theme.imageUrl || 'https://picsum.photos/seed/default/400/300',
                            alt: theme.title,
                            fill: true,
                            className: "object-cover brightness-[0.76] contrast-110 saturate-[0.82]",
                            sizes: "(max-width: 1024px) 100vw, 300px"
                        }, void 0, false, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 256,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0)_58%,rgba(0,0,0,0.36)_88%,#151515_100%)]"
                        }, void 0, false, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 263,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/reservation/page.tsx",
                    lineNumber: 255,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "contents",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 flex-col justify-center border-y border-white/[0.08] px-[28px] py-7 lg:border-x lg:border-y-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "flex min-w-0 items-baseline gap-2 text-[22px] font-black leading-tight text-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "min-w-0 shrink truncate",
                                            children: theme.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 269,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "min-w-0 truncate text-[12px] font-bold text-[#8a8a8a]",
                                            children: [
                                                "· ",
                                                theme.branchName
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 space-y-2.5 text-[12px] leading-none text-[#888]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-[48px_1fr]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "별점"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[15px] tracking-[0.08em] text-[#f39c12]",
                                                            children: "★★★★★"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservation/page.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "text-[14px] font-black text-[#f5f5f5]",
                                                            children: (_theme_rating = theme.rating) === null || _theme_rating === void 0 ? void 0 : _theme_rating.toFixed(1)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservation/page.tsx",
                                                            lineNumber: 278,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[#5f5f5f]",
                                                            children: [
                                                                "(",
                                                                theme.reviewCount,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/reservation/page.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 274,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-x-6 gap-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "난이도"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservation/page.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationRatingIcons, {
                                                            level: theme.difficulty,
                                                            type: "difficulty"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservation/page.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "공포도"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservation/page.tsx",
                                                            lineNumber: 288,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationRatingIcons, {
                                                            level: theme.horrorLevel,
                                                            type: "horror"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/reservation/page.tsx",
                                                            lineNumber: 289,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-x-6 gap-y-2 text-[#7f8791]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "인원 ",
                                                        theme.minPlayers,
                                                        "~",
                                                        theme.maxPlayers,
                                                        "명"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "시간 ",
                                                        theme.duration,
                                                        "분"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-[#c6c6c6]",
                                                    children: [
                                                        "가격 ",
                                                        theme.price.toLocaleString('ko-KR'),
                                                        "원"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 292,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-[22px] max-w-[320px] overflow-hidden whitespace-pre-line text-[13px] font-medium leading-[1.72] text-[#b0b0b0] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]",
                                    children: showcaseDescription
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 267,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-h-[308px] min-w-0 flex-col justify-center px-5 py-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 border-b border-white/[0.08]",
                                    children: dates.map((date, index)=>{
                                        const isActive = activeDateIdx === index;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setActiveDateIdx(index);
                                                setSelectedTime('');
                                                setShowTimeNotice(false);
                                            },
                                            className: [
                                                'relative h-8 text-center text-[12px] font-bold transition-colors',
                                                isActive ? 'text-[#e72a2d]' : 'text-[#d9d9d9] hover:text-white'
                                            ].join(' '),
                                            children: [
                                                date.label,
                                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute bottom-[-1px] left-2 right-2 h-[2px] bg-[#e12225]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 34
                                                }, this)
                                            ]
                                        }, date.dateStr, true, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 310,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 305,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 grid grid-cols-3 gap-1.5",
                                    children: slots.map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: slot.soldOut,
                                            onClick: ()=>{
                                                if (slot.soldOut) return;
                                                setSelectedTime(slot.time);
                                                setShowTimeNotice(false);
                                            },
                                            className: [
                                                'h-[38px] min-w-0 rounded-[7px] border text-[12px] font-bold transition-colors',
                                                slot.soldOut ? 'cursor-not-allowed border-transparent bg-[#222] text-[#686868] line-through opacity-70' : selectedTime === slot.time ? 'border-[#e12225] bg-[#e12225] text-white' : 'border-white/[0.1] bg-[#171717] text-[#d8d8d8] hover:border-[#cc2222]/65'
                                            ].join(' '),
                                            children: slot.time
                                        }, slot.time, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 331,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 329,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleBook,
                                    className: [
                                        'mt-6 h-10 w-full rounded-[8px] text-[13px] font-black transition-colors',
                                        selectedTime ? 'bg-[#cc2222] text-white hover:bg-[#e23b3b] hover:shadow-[0_0_22px_rgba(204,34,34,0.22)]' : 'cursor-not-allowed bg-[#cc2222]/55 text-white/60'
                                    ].join(' '),
                                    children: "빠른 예약하기"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 353,
                                    columnNumber: 13
                                }, this),
                                showTimeNotice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-center text-[12px] font-bold text-[#ef5353]",
                                    children: "예약 시간을 선택해주세요."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 365,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 304,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/reservation/page.tsx",
                    lineNumber: 266,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/reservation/page.tsx",
            lineNumber: 254,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 253,
        columnNumber: 5
    }, this);
}
_s(ThemeListRow, "F/5+w+gRbWGHAVcJvwXG4wwPjrY=");
_c5 = ThemeListRow;
function ThemeFilterSidebar(param) {
    let { selectedLocations, difficulty, horrorLevel, minPlayers, minRating, sort, onResetLocations, onToggleLocation, onDifficulty, onHorrorLevel, onMinPlayers, onMinRating, onSort, onResetFilters } = param;
    var _SORT_OPTIONS_find;
    _s1();
    const [isSortOpen, setIsSortOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sortDropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeFilterSidebar.useEffect": ()=>{
            const handlePointerDown = {
                "ThemeFilterSidebar.useEffect.handlePointerDown": (event)=>{
                    if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                        setIsSortOpen(false);
                    }
                }
            }["ThemeFilterSidebar.useEffect.handlePointerDown"];
            document.addEventListener('mousedown', handlePointerDown);
            return ({
                "ThemeFilterSidebar.useEffect": ()=>document.removeEventListener('mousedown', handlePointerDown)
            })["ThemeFilterSidebar.useEffect"];
        }
    }["ThemeFilterSidebar.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "hidden rounded-[18px] border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur md:block lg:sticky lg:top-24 lg:self-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: "테마 검색",
                className: "mb-3 h-11 w-full rounded-[10px] border border-white/[0.1] bg-[#101010] px-3 text-sm font-semibold text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#cc2222]/80"
            }, void 0, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 423,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/ai-recommend",
                className: "mb-7 block h-11 w-full rounded-[10px] border border-[#cc2222]/45 bg-[#cc2222]/10 text-center text-sm font-black leading-[44px] text-[#ef5353] transition-all hover:border-[#cc2222]/80 hover:bg-[#cc2222]/16 hover:text-white hover:shadow-[0_0_20px_rgba(204,34,34,0.14)]",
                children: "AI 테마 추천받기"
            }, void 0, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 429,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]",
                        children: "지역"
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 437,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-1.5",
                        children: [
                            '전체',
                            ...LOCATIONS
                        ].map((location)=>{
                            const isAll = location === '전체';
                            const isActive = isAll ? selectedLocations.length === 0 : selectedLocations.includes(location);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: isAll ? onResetLocations : ()=>onToggleLocation(location),
                                className: [
                                    'flex h-9 items-center justify-center rounded-full border px-3 text-sm font-bold transition-all',
                                    isActive ? 'border-[#cc2222]/60 bg-[#cc2222]/12 text-[#ef5353]' : 'border-white/[0.1] bg-[#101010] text-[#cfcfcf] hover:border-white/20 hover:bg-[#202020]'
                                ].join(' '),
                                children: location
                            }, location, false, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 444,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 438,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 436,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterRatingControl, {
                label: "난이도",
                value: difficulty,
                type: "difficulty",
                onChange: onDifficulty
            }, void 0, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterRatingControl, {
                label: "공포도",
                value: horrorLevel,
                type: "horror",
                onChange: onHorrorLevel
            }, void 0, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 463,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]",
                        children: "인원 수"
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 466,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5",
                        children: [
                            0,
                            2,
                            3,
                            4
                        ].map((value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onMinPlayers(value),
                                className: [
                                    'rounded-full border px-2.5 py-1.5 text-xs font-bold transition-all',
                                    minPlayers === value ? 'border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]' : 'border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]'
                                ].join(' '),
                                children: value === 0 ? '전체' : "".concat(value, "명+")
                            }, value, false, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 469,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 467,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 465,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]",
                        children: "평점 범위"
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 487,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5",
                        children: [
                            0,
                            4.0,
                            4.5,
                            4.8
                        ].map((value)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onMinRating(value),
                                className: [
                                    'rounded-full border px-2.5 py-1.5 text-xs font-bold transition-all',
                                    minRating === value ? 'border-[#cc2222]/70 bg-[#cc2222]/12 text-[#ef5353]' : 'border-white/[0.1] text-[#8a8a8a] hover:border-white/20 hover:text-[#d8d8d8]'
                                ].join(' '),
                                children: value === 0 ? '전체' : "".concat(value, "+")
                            }, value, false, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 490,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 488,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 486,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#9a9a9a]",
                        children: "정렬"
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 508,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: sortDropdownRef,
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-haspopup": "listbox",
                                "aria-expanded": isSortOpen,
                                onClick: ()=>setIsSortOpen((open)=>!open),
                                onKeyDown: (event)=>{
                                    if (event.key === 'Escape') setIsSortOpen(false);
                                },
                                className: [
                                    'flex h-10 w-full items-center justify-between rounded-[10px] border bg-[#101010] pl-3 pr-3 text-left text-sm font-bold text-[#f5f5f5] outline-none transition-all',
                                    isSortOpen ? 'border-[#cc2222]/70 shadow-[0_0_18px_rgba(204,34,34,0.14)]' : 'border-white/[0.1] hover:border-white/20'
                                ].join(' '),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: (_SORT_OPTIONS_find = SORT_OPTIONS.find((option)=>option.value === sort)) === null || _SORT_OPTIONS_find === void 0 ? void 0 : _SORT_OPTIONS_find.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 523,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": "true",
                                        className: [
                                            'ml-3 text-[10px] text-[#8a8a8a] transition-transform',
                                            isSortOpen ? 'rotate-180 text-[#ef5353]' : ''
                                        ].join(' '),
                                        children: "▼"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 524,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 510,
                                columnNumber: 11
                            }, this),
                            isSortOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-[10px] border border-white/[0.1] bg-[#101010] shadow-[0_18px_36px_rgba(0,0,0,0.42)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    role: "listbox",
                                    "aria-label": "정렬 방식",
                                    className: "p-1",
                                    children: SORT_OPTIONS.map((option)=>{
                                        const isSelected = sort === option.value;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            role: "option",
                                            "aria-selected": isSelected,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    onSort(option.value);
                                                    setIsSortOpen(false);
                                                },
                                                className: [
                                                    'flex h-9 w-full items-center justify-between rounded-[8px] px-3 text-left text-sm font-bold transition-colors',
                                                    isSelected ? 'bg-[#cc2222]/12 text-[#ef5353]' : 'text-[#b8b8b8] hover:bg-white/[0.06] hover:text-[#f2f2f2]'
                                                ].join(' '),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: option.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/reservation/page.tsx",
                                                        lineNumber: 551,
                                                        columnNumber: 25
                                                    }, this),
                                                    isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-[#ef5353]",
                                                        children: "●"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/reservation/page.tsx",
                                                        lineNumber: 552,
                                                        columnNumber: 40
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/reservation/page.tsx",
                                                lineNumber: 540,
                                                columnNumber: 23
                                            }, this)
                                        }, option.value, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 539,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 534,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 509,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 507,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onResetFilters,
                className: "h-11 w-full rounded-[10px] border border-white/[0.12] bg-transparent text-sm font-black text-[#b8b8b8] transition-all hover:border-[#cc2222]/55 hover:bg-[#cc2222]/8 hover:text-[#f2f2f2]",
                children: "필터 초기화"
            }, void 0, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 563,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 422,
        columnNumber: 5
    }, this);
}
_s1(ThemeFilterSidebar, "oVFxzBwiZINXxQqyy3qQ6CVJOY4=");
_c6 = ThemeFilterSidebar;
function BrowseStep(param) {
    let { onBook } = param;
    _s2();
    const [selectedLocations, setSelectedLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [horrorLevel, setHorrorLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [minPlayers, setMinPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [minRating, setMinRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [sort, setSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('popular');
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const dates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BrowseStep.useMemo[dates]": ()=>getUpcomingDates()
    }["BrowseStep.useMemo[dates]"], []);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BrowseStep.useMemo[filtered]": ()=>{
            let list = [
                ...MOCK_THEMES
            ];
            if (selectedLocations.length > 0) list = list.filter({
                "BrowseStep.useMemo[filtered]": (theme)=>{
                    var _theme_locationName;
                    return selectedLocations.includes((_theme_locationName = theme.locationName) !== null && _theme_locationName !== void 0 ? _theme_locationName : '');
                }
            }["BrowseStep.useMemo[filtered]"]);
            if (difficulty > 0) list = list.filter({
                "BrowseStep.useMemo[filtered]": (theme)=>theme.difficulty === difficulty
            }["BrowseStep.useMemo[filtered]"]);
            if (horrorLevel > 0) list = list.filter({
                "BrowseStep.useMemo[filtered]": (theme)=>theme.horrorLevel === horrorLevel
            }["BrowseStep.useMemo[filtered]"]);
            if (minPlayers > 0) list = list.filter({
                "BrowseStep.useMemo[filtered]": (theme)=>{
                    var _theme_maxPlayers;
                    return ((_theme_maxPlayers = theme.maxPlayers) !== null && _theme_maxPlayers !== void 0 ? _theme_maxPlayers : 0) >= minPlayers;
                }
            }["BrowseStep.useMemo[filtered]"]);
            if (minRating > 0) list = list.filter({
                "BrowseStep.useMemo[filtered]": (theme)=>{
                    var _theme_rating;
                    return ((_theme_rating = theme.rating) !== null && _theme_rating !== void 0 ? _theme_rating : 0) >= minRating;
                }
            }["BrowseStep.useMemo[filtered]"]);
            if (sort === 'popular') list.sort({
                "BrowseStep.useMemo[filtered]": (a, b)=>{
                    var _b_reviewCount, _a_reviewCount;
                    return ((_b_reviewCount = b.reviewCount) !== null && _b_reviewCount !== void 0 ? _b_reviewCount : 0) - ((_a_reviewCount = a.reviewCount) !== null && _a_reviewCount !== void 0 ? _a_reviewCount : 0);
                }
            }["BrowseStep.useMemo[filtered]"]);
            else list.sort({
                "BrowseStep.useMemo[filtered]": (a, b)=>b.id - a.id
            }["BrowseStep.useMemo[filtered]"]);
            return list;
        }
    }["BrowseStep.useMemo[filtered]"], [
        selectedLocations,
        difficulty,
        horrorLevel,
        minPlayers,
        minRating,
        sort
    ]);
    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const setFilter = (setter, value)=>{
        setter(value);
        setPage(1);
    };
    const toggleLocation = (location)=>{
        setSelectedLocations((current)=>current.includes(location) ? current.filter((item)=>item !== location) : [
                ...current,
                location
            ]);
        setPage(1);
    };
    const resetFilters = ()=>{
        setSelectedLocations([]);
        setDifficulty(0);
        setHorrorLevel(0);
        setMinPlayers(0);
        setMinRating(0);
        setSort('popular');
        setPage(1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative mx-auto max-w-[1480px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "mb-8 flex items-center gap-1.5 text-xs font-bold text-[#777]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "transition-colors hover:text-[#f5f5f5]",
                        children: "홈"
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 625,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "›"
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 626,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[#f5f5f5]",
                        children: "빠른 예약"
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 627,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 624,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-10 border-b border-white/[0.08] pb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-[10px] font-black tracking-[0.32em] text-[#cc2222]",
                        children: '// QUICK RESERVATION'
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 631,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-[34px] font-black leading-tight text-[#f5f5f5] md:text-[44px]",
                        children: [
                            "🔥 빠른 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#e63946]",
                                children: "예약"
                            }, void 0, false, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 635,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 634,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 max-w-[620px] text-[15px] leading-7 text-[#a0a0a0]",
                        children: "GrimGate의 테마를 지점과 시간대별로 빠르게 찾아보세요."
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 637,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 630,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-7 lg:grid-cols-[240px_1fr] lg:gap-7 xl:grid-cols-[248px_1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeFilterSidebar, {
                        selectedLocations: selectedLocations,
                        difficulty: difficulty,
                        horrorLevel: horrorLevel,
                        minPlayers: minPlayers,
                        minRating: minRating,
                        sort: sort,
                        onResetLocations: ()=>{
                            setSelectedLocations([]);
                            setPage(1);
                        },
                        onToggleLocation: toggleLocation,
                        onDifficulty: (value)=>setFilter(setDifficulty, value),
                        onHorrorLevel: (value)=>setFilter(setHorrorLevel, value),
                        onMinPlayers: (value)=>setFilter(setMinPlayers, value),
                        onMinRating: (value)=>setFilter(setMinRating, value),
                        onSort: (value)=>setFilter(setSort, value),
                        onResetFilters: resetFilters
                    }, void 0, false, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 643,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 flex h-11 items-center justify-between rounded-[14px] border border-white/[0.08] bg-[#171717]/72 px-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-[#888]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-[#f5f5f5]",
                                            children: filtered.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 666,
                                            columnNumber: 15
                                        }, this),
                                        "개의 테마"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 665,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 664,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-8",
                                children: [
                                    paged.map((theme)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeListRow, {
                                            theme: theme,
                                            dates: dates,
                                            onQuickBook: onBook
                                        }, theme.id, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 672,
                                            columnNumber: 15
                                        }, this)),
                                    paged.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-20 text-center text-[#888]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "조건에 맞는 테마가 없습니다."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 676,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 675,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 670,
                                columnNumber: 11
                            }, this),
                            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 flex items-center justify-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((current)=>Math.max(1, current - 1)),
                                        disabled: page === 1,
                                        className: "flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946] disabled:opacity-30",
                                        children: "‹"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 683,
                                        columnNumber: 15
                                    }, this),
                                    Array.from({
                                        length: totalPages
                                    }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setPage(index + 1),
                                            className: [
                                                'flex h-8 w-8 items-center justify-center rounded border text-sm transition-colors',
                                                page === index + 1 ? 'border-[#e63946] bg-[#e63946]/10 text-[#e63946]' : 'border-[#2a2a2a] text-[#888] hover:border-[#555]'
                                            ].join(' '),
                                            children: index + 1
                                        }, index, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 691,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((current)=>Math.min(totalPages, current + 1)),
                                        disabled: page === totalPages,
                                        className: "flex h-8 w-8 items-center justify-center rounded border border-[#2a2a2a] text-[#888] transition-colors hover:border-[#e63946] hover:text-[#e63946] disabled:opacity-30",
                                        children: "›"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 704,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 682,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/reservation/page.tsx",
                        lineNumber: 663,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 642,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 623,
        columnNumber: 5
    }, this);
}
_s2(BrowseStep, "ZlR3fvskKKH4isEPNZWsMlOAesw=");
_c7 = BrowseStep;
function PaymentStep(param) {
    let { theme, date, time, onBack } = param;
    _s3();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { setTheme, setLocation, setDateTime, setHeadcount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$reservationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReservationStore"])();
    const [adultCount, setAdultCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2);
    const [teenCount, setTeenCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [agreeTerms, setAgreeTerms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agreePrivacy, setAgreePrivacy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agreeCancellation, setAgreeCancellation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agreeMarketing, setAgreeMarketing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const requiredAgreed = agreeTerms && agreePrivacy && agreeCancellation;
    const agreeAll = requiredAgreed && agreeMarketing;
    const totalPlayers = adultCount + teenCount;
    var _theme_price;
    const totalAmount = adultCount * ((_theme_price = theme.price) !== null && _theme_price !== void 0 ? _theme_price : 25000) + teenCount * TEEN_PRICE;
    const handleAgreeAll = (checked)=>{
        setAgreeTerms(checked);
        setAgreePrivacy(checked);
        setAgreeCancellation(checked);
        setAgreeMarketing(checked);
    };
    const handlePay = ()=>{
        if (!requiredAgreed) return;
        setTheme(theme.id, theme.title, theme.imageUrl);
        var _theme_locationName, _theme_branchName;
        setLocation((_theme_locationName = theme.locationName) !== null && _theme_locationName !== void 0 ? _theme_locationName : '', (_theme_branchName = theme.branchName) !== null && _theme_branchName !== void 0 ? _theme_branchName : '');
        setDateTime(date, time);
        setHeadcount(adultCount, teenCount);
        router.push('/reservation/complete');
    };
    var _theme_price1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative mx-auto max-w-2xl px-4 py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mb-4 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-4 w-1 rounded-full bg-[#e63946]"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 766,
                                    columnNumber: 13
                                }, this),
                                "예약 정보 확인"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 765,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative h-20 w-24 shrink-0 overflow-hidden rounded bg-[#111]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: theme.imageUrl || 'https://picsum.photos/seed/default/400/300',
                                        alt: theme.title,
                                        fill: true,
                                        className: "object-cover",
                                        sizes: "96px"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 771,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 770,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "rounded border border-[#2a2a2a] bg-[#222] px-1.5 py-0.5 text-xs text-[#888]",
                                            children: theme.locationName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 774,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mb-2 mt-2 text-base font-bold text-[#f5f5f5]",
                                            children: theme.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 775,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded border border-[#2a2a2a] bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#f5f5f5]",
                                                    children: formatDateLabel(date)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 777,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded border border-[#e63946]/40 bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#e63946]",
                                                    children: time
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 778,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded border border-[#2a2a2a] bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#888]",
                                                    children: theme.branchName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 779,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded border border-[#2a2a2a] bg-[#0d0d0d] px-2 py-0.5 text-xs text-[#888]",
                                                    children: [
                                                        theme.duration,
                                                        "분"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 780,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 776,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onBack,
                                            className: "mt-2 text-xs text-[#888] transition-colors hover:text-[#e63946]",
                                            children: "시간 변경"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 782,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 773,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 769,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/reservation/page.tsx",
                    lineNumber: 764,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mb-4 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-4 w-1 rounded-full bg-[#e63946]"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 791,
                                    columnNumber: 13
                                }, this),
                                "인원 선택"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 790,
                            columnNumber: 11
                        }, this),
                        [
                            {
                                label: '성인',
                                sub: "1인 ".concat(formatPrice((_theme_price1 = theme.price) !== null && _theme_price1 !== void 0 ? _theme_price1 : 25000)),
                                count: adultCount,
                                set: setAdultCount,
                                min: 0
                            },
                            {
                                label: '청소년',
                                sub: "1인 ".concat(formatPrice(TEEN_PRICE), " · 만 14~18세"),
                                count: teenCount,
                                set: setTeenCount,
                                min: 0
                            }
                        ].map((row)=>{
                            var _theme_maxPlayers;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between border-b border-[#2a2a2a] py-3 last:border-b-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-[#f5f5f5]",
                                                children: row.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/reservation/page.tsx",
                                                lineNumber: 800,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-[#888]",
                                                children: row.sub
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/reservation/page.tsx",
                                                lineNumber: 801,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 799,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>row.set(Math.max(row.min, row.count - 1)),
                                                className: "flex h-7 w-7 items-center justify-center rounded border border-[#2a2a2a] text-lg leading-none text-[#f5f5f5] transition-colors hover:border-[#e63946]",
                                                children: "-"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/reservation/page.tsx",
                                                lineNumber: 804,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-5 text-center text-sm font-medium text-[#f5f5f5]",
                                                children: row.count
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/reservation/page.tsx",
                                                lineNumber: 805,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>row.set(row.count + 1),
                                                disabled: totalPlayers >= ((_theme_maxPlayers = theme.maxPlayers) !== null && _theme_maxPlayers !== void 0 ? _theme_maxPlayers : 6),
                                                className: "flex h-7 w-7 items-center justify-center rounded border border-[#2a2a2a] text-lg leading-none text-[#f5f5f5] transition-colors hover:border-[#e63946] disabled:opacity-30",
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/reservation/page.tsx",
                                                lineNumber: 806,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 803,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, row.label, true, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 798,
                                columnNumber: 13
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 flex items-center justify-between text-xs text-[#888]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "최소 ",
                                        theme.minPlayers,
                                        "명 · 최대 ",
                                        theme.maxPlayers,
                                        "명"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 811,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "총 ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-[#f5f5f5]",
                                            children: totalPlayers
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 812,
                                            columnNumber: 21
                                        }, this),
                                        "명"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 812,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 810,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/reservation/page.tsx",
                    lineNumber: 789,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mb-4 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-4 w-1 rounded-full bg-[#e63946]"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 818,
                                    columnNumber: 13
                                }, this),
                                "이용 약관 동의"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 817,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "mb-2 flex cursor-pointer items-center gap-2 border-b border-[#2a2a2a] py-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: agreeAll,
                                    onChange: (event)=>handleAgreeAll(event.target.checked),
                                    className: "accent-[#e63946]"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 822,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium text-[#f5f5f5]",
                                    children: "전체 동의"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 823,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 821,
                            columnNumber: 11
                        }, this),
                        [
                            {
                                label: '[필수] 이용약관에 동의합니다.',
                                checked: agreeTerms,
                                set: setAgreeTerms
                            },
                            {
                                label: '[필수] 개인정보 수집 및 이용에 동의합니다.',
                                checked: agreePrivacy,
                                set: setAgreePrivacy
                            },
                            {
                                label: '[필수] 취소 및 환불 규정을 확인했습니다.',
                                checked: agreeCancellation,
                                set: setAgreeCancellation
                            },
                            {
                                label: '[선택] 마케팅 정보 수신에 동의합니다.',
                                checked: agreeMarketing,
                                set: setAgreeMarketing
                            }
                        ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex cursor-pointer items-center gap-2 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: item.checked,
                                        onChange: (event)=>item.set(event.target.checked),
                                        className: "accent-[#e63946]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 832,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-[#888]",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 833,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item.label, true, {
                                fileName: "[project]/src/app/reservation/page.tsx",
                                lineNumber: 831,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/reservation/page.tsx",
                    lineNumber: 816,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mb-4 flex items-center gap-2 text-sm font-bold text-[#f5f5f5]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-4 w-1 rounded-full bg-[#e63946]"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 840,
                                    columnNumber: 13
                                }, this),
                                "취소 및 환불 규정"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 839,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "mb-3 w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-[#2a2a2a]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 text-left text-xs font-medium text-[#888]",
                                                children: "취소 시점"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/reservation/page.tsx",
                                                lineNumber: 846,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 text-right text-xs font-medium text-[#888]",
                                                children: "환불 금액"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/reservation/page.tsx",
                                                lineNumber: 847,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/reservation/page.tsx",
                                        lineNumber: 845,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 844,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-[#1a1a1a]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2.5 text-xs text-[#f5f5f5]",
                                                    children: "예약일 7일 전까지"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 852,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2.5 text-right text-xs font-medium text-[#2ecc71]",
                                                    children: "100% 환불"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 853,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 851,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-[#1a1a1a]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2.5 text-xs text-[#f5f5f5]",
                                                    children: "예약일 3일 전까지"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 856,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2.5 text-right text-xs font-medium text-[#f39c12]",
                                                    children: "50% 환불"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 857,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 855,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2.5 text-xs text-[#f5f5f5]",
                                                    children: "예약 당일 또는 노쇼"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2.5 text-right text-xs font-medium text-[#e63946]",
                                                    children: "환불 불가"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/reservation/page.tsx",
                                                    lineNumber: 861,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/reservation/page.tsx",
                                            lineNumber: 859,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/reservation/page.tsx",
                                    lineNumber: 850,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 843,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-[#555]",
                            children: "환불 내역은 마이페이지의 캐시 내역에서 확인할 수 있습니다."
                        }, void 0, false, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 865,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/reservation/page.tsx",
                    lineNumber: 838,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-[#888]",
                            children: "최종 결제 금액"
                        }, void 0, false, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 869,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl font-black text-[#e63946]",
                            children: formatPrice(totalAmount)
                        }, void 0, false, {
                            fileName: "[project]/src/app/reservation/page.tsx",
                            lineNumber: 870,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/reservation/page.tsx",
                    lineNumber: 868,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handlePay,
                    disabled: !requiredAgreed || totalPlayers === 0,
                    className: [
                        'w-full rounded-lg py-4 text-base font-bold transition-colors',
                        requiredAgreed && totalPlayers > 0 ? 'bg-[#e63946] text-white hover:bg-[#c1121f]' : 'cursor-not-allowed bg-[#2a2a2a] text-[#555]'
                    ].join(' '),
                    children: "결제하기"
                }, void 0, false, {
                    fileName: "[project]/src/app/reservation/page.tsx",
                    lineNumber: 873,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/reservation/page.tsx",
            lineNumber: 763,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 762,
        columnNumber: 5
    }, this);
}
_s3(PaymentStep, "xEwJOMawFnhauEhQNH/UTmH3qhs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$reservationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReservationStore"]
    ];
});
_c8 = PaymentStep;
function ReservationContent() {
    _s4();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const urlThemeId = searchParams.get('themeId');
    const urlDate = searchParams.get('date');
    const urlTime = searchParams.get('time');
    const initialTheme = urlThemeId ? MOCK_THEMES.find((theme)=>theme.id === Number(urlThemeId)) : null;
    const hasUrlParams = Boolean(initialTheme && urlDate && urlTime);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(hasUrlParams ? 'payment' : 'select');
    const [selectedTheme, setSelectedTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTheme !== null && initialTheme !== void 0 ? initialTheme : null);
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(urlDate !== null && urlDate !== void 0 ? urlDate : '');
    const [selectedTime, setSelectedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(urlTime !== null && urlTime !== void 0 ? urlTime : '');
    const handleBook = (theme, date, time)=>{
        setSelectedTheme(theme);
        setSelectedDate(date);
        setSelectedTime(time);
        setStep('payment');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0d0d0d] text-[#f5f5f5]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,34,34,0.14),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(204,34,34,0.08),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#101010_48%,#0d0d0d_100%)]"
            }, void 0, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 914,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepBar, {
                step: step === 'select' ? 1 : 2
            }, void 0, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 915,
                columnNumber: 7
            }, this),
            step === 'select' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrowseStep, {
                onBook: handleBook
            }, void 0, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 916,
                columnNumber: 29
            }, this),
            step === 'payment' && selectedTheme && selectedDate && selectedTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentStep, {
                theme: selectedTheme,
                date: selectedDate,
                time: selectedTime,
                onBack: ()=>setStep('select')
            }, void 0, false, {
                fileName: "[project]/src/app/reservation/page.tsx",
                lineNumber: 918,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 913,
        columnNumber: 5
    }, this);
}
_s4(ReservationContent, "447a4+5E2SxJ4LcuwC34cER9bKg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c9 = ReservationContent;
function ReservationPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#0d0d0d]"
        }, void 0, false, {
            fileName: "[project]/src/app/reservation/page.tsx",
            lineNumber: 931,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReservationContent, {}, void 0, false, {
            fileName: "[project]/src/app/reservation/page.tsx",
            lineNumber: 932,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/reservation/page.tsx",
        lineNumber: 931,
        columnNumber: 5
    }, this);
}
_c10 = ReservationPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "StepBar");
__turbopack_context__.k.register(_c1, "ReservationSkullIcon");
__turbopack_context__.k.register(_c2, "ReservationLockIcon");
__turbopack_context__.k.register(_c3, "ReservationRatingIcons");
__turbopack_context__.k.register(_c4, "FilterRatingControl");
__turbopack_context__.k.register(_c5, "ThemeListRow");
__turbopack_context__.k.register(_c6, "ThemeFilterSidebar");
__turbopack_context__.k.register(_c7, "BrowseStep");
__turbopack_context__.k.register(_c8, "PaymentStep");
__turbopack_context__.k.register(_c9, "ReservationContent");
__turbopack_context__.k.register(_c10, "ReservationPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_fcac39d9._.js.map