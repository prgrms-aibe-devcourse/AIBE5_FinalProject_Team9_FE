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
"[project]/src/app/mate/[mateId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MateDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/formatDate.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// ── Mock Data (mirrors mate/page.tsx) ─────────────────────────────
const MOCK_POSTS = [
    {
        id: 1,
        title: '이번 주말 강남점 체벌린 같이 가실 분?',
        content: '공포 방탈출을 경험 10회 이상입니다! 진지하게 공략하기보다 분위기를 즐기며 플레이하고 싶습니다. 같이 무서워해줄 분 구해요 :) 카톡으로 연락주세요',
        authorId: 1,
        authorNickname: '김공포',
        locationName: '강남점',
        themeTitle: '체벌린',
        playDate: '2026-05-31',
        reservationTime: '18:30',
        deadlineDate: '2026-05-29',
        currentMembers: 2,
        totalMembers: 3,
        experienceLevel: 'ANY',
        atmosphereTags: [
            '진지하게',
            '즐겁게'
        ],
        contactMethod: 'KAKAO',
        status: 'OPEN',
        isPinned: true,
        commentCount: 5,
        createdAt: '2026-05-25T18:30:00'
    },
    {
        id: 2,
        title: '건대점 악마의 제단 고수 2명 구합니다',
        content: '이번이 세 번째 도전입니다. 이번엔 반드시 클리어! 방탈출 20회 이상, 공포 위주로 진행해 분 분 모집합니다.\n\n입문자분들은 다른 곳 이용해 주세요. 고수만 모십니다. 클리어 필수 목표로 전략적으로 접근할 분 환영합니다.\n\n카카오톡 오픈채팅으로 연락주시면 코드 드리겠습니다. 빠른 응답 부탁드립니다.',
        authorId: 3,
        authorNickname: '정배관',
        locationName: '건대점',
        themeTitle: '악마의 제단',
        playDate: '2026-05-31',
        reservationTime: '19:00',
        deadlineDate: '2026-05-30',
        currentMembers: 1,
        totalMembers: 3,
        experienceLevel: 'EXPERT',
        atmosphereTags: [
            '공략 위주',
            '진지하게'
        ],
        contactMethod: 'KAKAO',
        contactLink: 'https://open.kakao.com/o/mock',
        status: 'OPEN',
        commentCount: 18,
        createdAt: '2026-05-24T12:00:00'
    },
    {
        id: 3,
        title: '강남점 체벌린 일요일 저녁 4인 모집',
        content: '일요일 저녁 강남에서 체벌린 같이 보실 분 2명 모집합니다. 공포 보다는 재미 위주로 편하게 즐기고 싶어요. 부담 없이 강남에서 식사도 괜찮아요.',
        authorId: 4,
        authorNickname: '한울서울',
        locationName: '강남점',
        themeTitle: '체벌린',
        playDate: '2026-05-30',
        reservationTime: '20:00',
        deadlineDate: '2026-05-29',
        currentMembers: 2,
        totalMembers: 4,
        experienceLevel: 'INTERMEDIATE',
        atmosphereTags: [
            '즐겁게',
            '분위기 위주'
        ],
        contactMethod: 'KAKAO',
        status: 'OPEN',
        commentCount: 3,
        createdAt: '2026-05-24T09:00:00'
    },
    {
        id: 4,
        title: '홍대점 저주받은 술 주말 오전 첫 모집',
        content: '주말 오전 여유롭게 즐길 분 1자리 모집합니다. 사진 찍고 가볍게 넘기는 거 즐아하는 분환영해요! 끝나고 홍대에서 브런치 같이 하실 분도 찾아요 ☆',
        authorId: 5,
        authorNickname: '그로토',
        locationName: '홍대점',
        themeTitle: '저주받은 술',
        playDate: '2026-05-30',
        reservationTime: '10:30',
        deadlineDate: '2026-05-29',
        currentMembers: 3,
        totalMembers: 4,
        experienceLevel: 'BEGINNER',
        atmosphereTags: [
            '즐겁게',
            '분위기 위주',
            '사진 촬영'
        ],
        contactMethod: 'KAKAO',
        status: 'OPEN',
        commentCount: 7,
        createdAt: '2026-05-23T16:00:00'
    },
    {
        id: 5,
        title: '건대점 악마의 병원 첫 방탈을 도전해요',
        content: '방탈출을 처음 도전해보고 싶습니다! 저처럼 공포 방탈출 경험이 초보 환경해 주시는 분들 찾아요. 무서운 거 좀 있어도 괜찮습니다. 즐겁게 해봐요!',
        authorId: 6,
        authorNickname: '나도전서',
        locationName: '건대점',
        themeTitle: '악마의 병원',
        playDate: '2026-05-31',
        reservationTime: '14:00',
        deadlineDate: '2026-05-29',
        currentMembers: 4,
        totalMembers: 5,
        experienceLevel: 'BEGINNER',
        atmosphereTags: [
            '즐겁게',
            '처음 만난 팬텀'
        ],
        contactMethod: 'COMMENT',
        status: 'OPEN',
        commentCount: 2,
        createdAt: '2026-05-23T11:00:00'
    },
    {
        id: 6,
        title: '강남점 살인마의 방 3인 딱 1자리 남았어요',
        content: '내일 강남점 살인마의 방 3인 1자리 있습니다. 난이도 최고 등급이라 공포 방탈출 어느 정도 하신분 오시면 좋겠습니다. 빠르게 결정 부탁해요!',
        authorId: 7,
        authorNickname: '최긍박',
        locationName: '강남점',
        themeTitle: '살인마의 방',
        playDate: '2026-05-27',
        reservationTime: '21:00',
        deadlineDate: '2026-05-26',
        currentMembers: 3,
        totalMembers: 3,
        experienceLevel: 'EXPERT',
        atmosphereTags: [
            '진지하게',
            '공략 위주'
        ],
        contactMethod: 'KAKAO',
        status: 'FULL',
        commentCount: 12,
        createdAt: '2026-05-22T21:00:00'
    },
    {
        id: 7,
        title: '좀비 아포칼립스 같이 갈 사람',
        content: '좀비 아포칼립스 이달 2회 플레이하고 싶어 기회를 달리고있습니다. 공략 공유하며 진지하게 도전할 인원을 모십니다. 경험 10회 이상 우대해요',
        authorId: 8,
        authorNickname: '이할동',
        locationName: '강남점',
        themeTitle: '좀비 아포칼립스',
        playDate: '2026-06-01',
        reservationTime: '20:00',
        deadlineDate: '2026-05-31',
        currentMembers: 2,
        totalMembers: 4,
        experienceLevel: 'EXPERT',
        atmosphereTags: [
            '공략 위주',
            '진지하게'
        ],
        contactMethod: 'KAKAO',
        status: 'OPEN',
        commentCount: 4,
        createdAt: '2026-05-22T09:00:00'
    },
    {
        id: 8,
        title: '홍대점 13번째 방 주말 편하게 즐겨요',
        content: '주말 저녁 홍대 13번째 방 같이 도전할 분 모집합니다! 공포 좋아하고 분위기 있는 방탈출 좋아하는 분들이면 환영해요. 초보도 괜찮습니다.',
        authorId: 9,
        authorNickname: '박공포',
        locationName: '홍대점',
        themeTitle: '13번째 방',
        playDate: '2026-06-01',
        reservationTime: '19:00',
        deadlineDate: '2026-05-30',
        currentMembers: 1,
        totalMembers: 4,
        experienceLevel: 'ANY',
        atmosphereTags: [
            '즐겁게',
            '분위기 위주'
        ],
        contactMethod: 'COMMENT',
        status: 'OPEN',
        commentCount: 1,
        createdAt: '2026-05-21T15:00:00'
    }
];
const MOCK_COMMENTS = [
    {
        id: 1,
        postId: 2,
        userId: 10,
        userNickname: '이달돌',
        content: '저 방탈출 30회 이상이에요! 경험자입니다. 카톡 링크 알려주세요!',
        createdAt: '2026-05-24T13:00:00'
    },
    {
        id: 2,
        postId: 2,
        userId: 11,
        userNickname: '나도잘해',
        content: '악마의 제단 두 번 도전했는데 아직 클리어 못 했습니다. 이번엔 같이 클리어 해봐요!',
        createdAt: '2026-05-24T14:30:00'
    },
    {
        id: 3,
        postId: 2,
        userId: 12,
        userNickname: '김방탈',
        content: '혹시 19:00 말고 다른 시간대도 가능하신가요? 20:00이면 딱인데..',
        createdAt: '2026-05-24T16:00:00'
    },
    {
        id: 4,
        postId: 2,
        userId: 3,
        userNickname: '정배관',
        content: '@김방탈 죄송합니다, 이미 예약이 19시로 되어있어서요. 다음에 기회가 있으면 같이해요!',
        createdAt: '2026-05-24T16:30:00'
    },
    {
        id: 5,
        postId: 2,
        userId: 13,
        userNickname: '박탈쩡',
        content: '방탈출 25회 클리어율 80%입니다. 참가 희망해요!',
        createdAt: '2026-05-24T18:00:00'
    },
    {
        id: 6,
        postId: 2,
        userId: 14,
        userNickname: '최클리어',
        content: '오픈채팅 링크 클릭해봤는데 접속 안 되네요. 다시 올려주실 수 있나요?',
        createdAt: '2026-05-25T09:00:00'
    },
    {
        id: 7,
        postId: 2,
        userId: 3,
        userNickname: '정배관',
        content: '@최클리어 수정했습니다! 다시 시도해보세요.',
        createdAt: '2026-05-25T09:20:00'
    },
    {
        id: 8,
        postId: 2,
        userId: 15,
        userNickname: '공포왕',
        content: '저도 참가하고 싶은데 정원이 다 찼나요? 대기도 가능한가요?',
        createdAt: '2026-05-25T10:00:00'
    }
];
// ── Constants ─────────────────────────────────────────────────────
const AVATAR_COLORS = [
    'bg-[#e63946]',
    'bg-[#f39c12]',
    'bg-[#2ecc71]',
    'bg-[#3498db]',
    'bg-[#9b59b6]',
    'bg-[#e67e22]'
];
const EXPERIENCE_MAP = {
    ANY: {
        label: '무관',
        cls: 'border-[#2a2a2a] text-[#888]'
    },
    BEGINNER: {
        label: '입문자 환영',
        cls: 'border-[#2ecc71] text-[#2ecc71]'
    },
    INTERMEDIATE: {
        label: '중급자 우대',
        cls: 'border-[#f39c12] text-[#f39c12]'
    },
    EXPERT: {
        label: '경험자 우대',
        cls: 'border-[#e63946] text-[#e63946]'
    }
};
const LOCATION_CLS = {
    '강남점': 'bg-[#e63946]/10 text-[#e63946] border-[#e63946]/40',
    '홍대점': 'bg-[#9b59b6]/10 text-[#9b59b6] border-[#9b59b6]/40',
    '건대점': 'bg-[#3498db]/10 text-[#3498db] border-[#3498db]/40',
    '신촌점': 'bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/40'
};
// ── Helpers ───────────────────────────────────────────────────────
function getDDayLabel(dateStr) {
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDDay"])(dateStr);
    if (d < 0) return {
        text: '마감',
        cls: 'text-[#888]'
    };
    if (d === 0) return {
        text: 'D-Day',
        cls: 'text-[#e63946] font-bold'
    };
    return {
        text: "D-".concat(d),
        cls: 'text-[#f39c12] font-bold'
    };
}
function avatarColor(id) {
    return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
}
function formatDateWithDay(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const DAYS = [
        '일',
        '월',
        '화',
        '수',
        '목',
        '금',
        '토'
    ];
    return "".concat(dateStr, " (").concat(DAYS[d.getDay()], ")");
}
// ── Sub-components ────────────────────────────────────────────────
function MemberDots(param) {
    let { current, total } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-1.5",
        children: Array.from({
            length: total
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: [
                    'w-4 h-4 rounded-full border',
                    i < current ? 'bg-[#e63946] border-[#e63946]' : 'bg-transparent border-[#444]'
                ].join(' ')
            }, i, false, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_c = MemberDots;
function CommentItem(param) {
    let { comment } = param;
    const isAuthorReply = comment.userId === 3; // post 2's author
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            'py-3 border-b border-[#1a1a1a]',
            isAuthorReply ? 'bg-[#e63946]/5' : ''
        ].join(' '),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: [
                        'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0',
                        avatarColor(comment.userId)
                    ].join(' '),
                    children: comment.userNickname[0]
                }, void 0, false, {
                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-1 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-medium text-[#f5f5f5]",
                                    children: comment.userNickname
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                isAuthorReply && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs bg-[#e63946]/20 text-[#e63946] px-1.5 py-0.5 rounded",
                                    children: "작성자"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-[#555]",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(comment.createdAt)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-[#ccc] leading-relaxed",
                            children: comment.content
                        }, void 0, false, {
                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c1 = CommentItem;
function MateDetailPage(param) {
    let { params } = param;
    _s();
    const { mateId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var _MOCK_POSTS_find;
    const post = (_MOCK_POSTS_find = MOCK_POSTS.find((p)=>p.id === Number(mateId))) !== null && _MOCK_POSTS_find !== void 0 ? _MOCK_POSTS_find : MOCK_POSTS[1];
    const comments = MOCK_COMMENTS.filter((c)=>c.postId === post.id);
    const [commentText, setCommentText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [visibleComments, setVisibleComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [applied, setApplied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAllComments, setShowAllComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const exp = EXPERIENCE_MAP[post.experienceLevel];
    var _LOCATION_CLS_post_locationName;
    const locCls = (_LOCATION_CLS_post_locationName = LOCATION_CLS[post.locationName]) !== null && _LOCATION_CLS_post_locationName !== void 0 ? _LOCATION_CLS_post_locationName : 'bg-[#1a1a1a] text-[#888] border-[#2a2a2a]';
    const isFull = post.status === 'FULL' || post.status === 'CLOSED';
    const { text: ddayText, cls: ddayCls } = getDDayLabel(post.deadlineDate);
    const displayedComments = showAllComments ? comments : comments.slice(0, visibleComments);
    const isMyPost = post.authorId === 1;
    const handleApply = ()=>{
        if (applied) return;
        setApplied(true);
    };
    const handleSubmitComment = ()=>{
        if (!commentText.trim()) return;
        setCommentText('');
    };
    var _post_commentCount, _post_commentCount1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0d0d0d] pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-[#1a1a1a]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 py-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex items-center gap-2 text-xs text-[#555]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "hover:text-[#888] transition-colors",
                                children: "홈"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "›"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/mate",
                                className: "hover:text-[#888] transition-colors",
                                children: "메이트 모집"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "›"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#888] line-clamp-1 max-w-xs",
                                children: post.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                        lineNumber: 140,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-6 items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 flex-wrap mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: [
                                                    'text-sm px-2.5 py-1 rounded font-medium',
                                                    isFull ? 'bg-[#2a2a2a] text-[#888]' : 'bg-[#e63946] text-white'
                                                ].join(' '),
                                                children: isFull ? '● 모집 마감' : '● 모집 중'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 156,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: [
                                                    'text-xs border rounded px-2 py-1',
                                                    locCls
                                                ].join(' '),
                                                children: post.locationName
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 159,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: [
                                                    'text-xs border rounded px-2 py-1',
                                                    exp.cls
                                                ].join(' '),
                                                children: exp.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 15
                                            }, this),
                                            post.isPinned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs bg-[#f39c12]/20 text-[#f39c12] border border-[#f39c12]/40 rounded px-2 py-1",
                                                children: "📌 고정"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 166,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-black text-[#f5f5f5] leading-snug mb-3",
                                        children: post.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-4 pb-4 border-b border-[#1a1a1a]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: [
                                                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0',
                                                    avatarColor(post.authorId)
                                                ].join(' '),
                                                children: post.authorNickname[0]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 175,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-[#f5f5f5]",
                                                        children: post.authorNickname
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 17
                                                    }, this),
                                                    isMyPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs bg-[#e63946]/20 text-[#e63946] px-1.5 py-0.5 rounded",
                                                        children: "내 글"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 30
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-[#555]",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(post.createdAt)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 178,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ml-auto flex gap-2",
                                                children: isMyPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "text-xs border border-[#2a2a2a] text-[#888] hover:text-[#f5f5f5] hover:border-[#444] px-2.5 py-1 rounded transition-colors",
                                                            children: "수정"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "text-xs border border-[#e63946]/40 text-[#e63946] hover:bg-[#e63946]/10 px-2.5 py-1 rounded transition-colors",
                                                            children: "삭제"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-1.5 mb-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-2.5 py-1 text-[#888]",
                                                children: [
                                                    "🎭 ",
                                                    post.themeTitle
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 195,
                                                columnNumber: 15
                                            }, this),
                                            post.atmosphereTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-2.5 py-1 text-[#888]",
                                                    children: tag
                                                }, tag, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 mb-5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-[#ccc] leading-relaxed whitespace-pre-line",
                                            children: post.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 mb-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xs font-bold text-[#888] uppercase tracking-wider mb-4",
                                                children: "📋 모집 정보"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 212,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-y-3 gap-x-4 text-sm",
                                                children: [
                                                    {
                                                        label: '지점',
                                                        value: post.locationName
                                                    },
                                                    {
                                                        label: '테마',
                                                        value: post.themeTitle
                                                    },
                                                    {
                                                        label: '플레이 날짜',
                                                        value: formatDateWithDay(post.playDate)
                                                    },
                                                    {
                                                        label: '예약 시간',
                                                        value: post.reservationTime
                                                    },
                                                    {
                                                        label: '모집 마감일',
                                                        value: "".concat(post.deadlineDate, " (").concat(ddayText, ")")
                                                    },
                                                    {
                                                        label: '모집 인원',
                                                        value: "".concat(post.currentMembers, "명 / ").concat(post.totalMembers, "명")
                                                    }
                                                ].map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-[#555] mb-0.5",
                                                                children: row.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                                lineNumber: 223,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: [
                                                                    'text-sm',
                                                                    row.label === '모집 마감일' ? ddayCls : 'text-[#f5f5f5]'
                                                                ].join(' '),
                                                                children: row.value
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                                lineNumber: 224,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, row.label, true, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 pt-4 border-t border-[#2a2a2a]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-[#555] mb-2",
                                                        children: "참여 현황"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemberDots, {
                                                                current: post.currentMembers,
                                                                total: post.totalMembers
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                                lineNumber: 233,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-[#888]",
                                                                children: [
                                                                    post.currentMembers,
                                                                    "명 참여 중 · ",
                                                                    post.totalMembers - post.currentMembers,
                                                                    "자리 남음"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                                lineNumber: 234,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 230,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xs font-bold text-[#888] uppercase tracking-wider mb-3",
                                                children: "📞 연락 방법"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 15
                                            }, this),
                                            post.contactMethod === 'KAKAO' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-[#f5f5f5]",
                                                        children: "카카오톡 오픈채팅"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 19
                                                    }, this),
                                                    post.contactLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs bg-[#f39c12]/20 text-[#f39c12] border border-[#f39c12]/40 px-2.5 py-1 rounded",
                                                        children: "링크 있음 (참가 신청 후 공개)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 245,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-[#f5f5f5]",
                                                children: "이 글에 댓글로 신청해주세요"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-80 shrink-0 hidden lg:block",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg sticky top-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-[#f5f5f5]",
                                                    children: [
                                                        "댓글 ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[#e63946]",
                                                            children: (_post_commentCount = post.commentCount) !== null && _post_commentCount !== void 0 ? _post_commentCount : comments.length
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 22
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.back(),
                                                    className: "text-[#555] hover:text-[#888] transition-colors text-lg leading-none",
                                                    children: "×"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-4 max-h-105 overflow-y-auto",
                                            children: [
                                                comments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "py-8 text-center text-[#555] text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mb-1",
                                                            children: "💬"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: "첫 댓글을 달아보세요!"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                            lineNumber: 280,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 19
                                                }, this),
                                                displayedComments.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentItem, {
                                                        comment: c
                                                    }, c.id, false, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 45
                                                    }, this)),
                                                !showAllComments && comments.length > visibleComments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowAllComments(true),
                                                    className: "w-full py-2.5 text-xs text-[#888] hover:text-[#f5f5f5] transition-colors border-b border-[#1a1a1a]",
                                                    children: [
                                                        "댓글 더보기 (",
                                                        comments.length - visibleComments,
                                                        "개 남음)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 276,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-4 py-3 border-t border-[#2a2a2a]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    value: commentText,
                                                    onChange: (e)=>setCommentText(e.target.value),
                                                    placeholder: "댓글을 입력하세요...",
                                                    rows: 3,
                                                    className: "w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-xs rounded p-2.5 placeholder-[#555] focus:border-[#e63946] outline-none resize-none mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleSubmitComment,
                                                    disabled: !commentText.trim(),
                                                    className: "w-full py-2 rounded bg-[#e63946] hover:bg-[#c1121f] disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-medium transition-colors",
                                                    children: "등록"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 261,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:hidden mt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-3 border-b border-[#2a2a2a]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-[#f5f5f5]",
                                        children: [
                                            "댓글 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#e63946]",
                                                children: (_post_commentCount1 = post.commentCount) !== null && _post_commentCount1 !== void 0 ? _post_commentCount1 : comments.length
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 320,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 319,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4",
                                    children: [
                                        comments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "py-8 text-center text-[#555] text-xs",
                                            children: "첫 댓글을 달아보세요!"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 325,
                                            columnNumber: 17
                                        }, this),
                                        displayedComments.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentItem, {
                                                comment: c
                                            }, c.id, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 327,
                                                columnNumber: 43
                                            }, this)),
                                        !showAllComments && comments.length > visibleComments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowAllComments(true),
                                            className: "w-full py-3 text-xs text-[#888] hover:text-[#f5f5f5] transition-colors",
                                            children: "댓글 더보기"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-3 border-t border-[#2a2a2a]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: commentText,
                                            onChange: (e)=>setCommentText(e.target.value),
                                            placeholder: "댓글을 입력하세요...",
                                            rows: 3,
                                            className: "w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f5f5] text-xs rounded p-2.5 placeholder-[#555] focus:border-[#e63946] outline-none resize-none mb-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 338,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSubmitComment,
                                            disabled: !commentText.trim(),
                                            className: "w-full py-2 rounded bg-[#e63946] hover:bg-[#c1121f] disabled:opacity-30 text-white text-xs font-medium transition-colors",
                                            children: "등록"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 345,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-7xl pointer-events-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-[#1a1a1a] bg-[#0d0d0d]/95 backdrop-blur px-4 py-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemberDots, {
                                            current: post.currentMembers,
                                            total: post.totalMembers
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 363,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-[#888]",
                                            children: [
                                                post.currentMembers,
                                                "/",
                                                post.totalMembers,
                                                "명"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 364,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 366,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/mate",
                                    className: "px-4 py-2.5 rounded border border-[#2a2a2a] text-[#888] hover:border-[#444] text-sm transition-colors",
                                    children: "목록으로"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 367,
                                    columnNumber: 15
                                }, this),
                                !isMyPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleApply,
                                    disabled: isFull || applied,
                                    className: [
                                        'px-6 py-2.5 rounded text-sm font-bold transition-colors',
                                        applied ? 'bg-[#2ecc71] text-white cursor-default' : isFull ? 'bg-[#2a2a2a] text-[#555] cursor-not-allowed' : 'bg-[#e63946] hover:bg-[#c1121f] text-white'
                                    ].join(' '),
                                    children: applied ? '✓ 신청 완료' : isFull ? '모집 마감' : '참가 신청'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 374,
                                    columnNumber: 17
                                }, this),
                                isMyPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-6 py-2.5 rounded bg-[#2a2a2a] text-[#555] text-sm",
                                    children: "내 모집 글"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 390,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                            lineNumber: 361,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                        lineNumber: 360,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                    lineNumber: 359,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 358,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(MateDetailPage, "phgzKp8no6ISvtRwc7eZ93vwopI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = MateDetailPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MemberDots");
__turbopack_context__.k.register(_c1, "CommentItem");
__turbopack_context__.k.register(_c2, "MateDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_f1ababae._.js.map