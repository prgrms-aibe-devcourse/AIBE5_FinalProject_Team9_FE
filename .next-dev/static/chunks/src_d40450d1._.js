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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/formatDate.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const K = {
    home: "홈",
    board: "메이트 모집",
    recruiting: "모집 중",
    closed: "마감",
    pinned: "고정",
    myPost: "내 모집 글",
    summary: "모집 요약",
    detail: "모집 정보",
    cafe: "방탈출 카페명",
    branch: "지점명",
    theme: "테마명",
    playDate: "플레이 날짜",
    time: "예약 시간",
    members: "모집 인원",
    remaining: "남은 자리",
    deadline: "모집 마감",
    contact: "연락 방법",
    comments: "댓글",
    commentPlaceholder: "댓글을 입력하세요.",
    submit: "등록",
    list: "목록으로",
    apply: "참여하기",
    applied: "참여 신청 완료",
    noComment: "아직 댓글이 없습니다.",
    firstComment: "첫 댓글을 남겨보세요.",
    people: "명",
    left: "자리 남음"
};
const MOCK_POSTS = [
    {
        id: 1,
        title: "이번 주말 강남점 체벌린 같이 가실 분?",
        content: "공포 방탈출을 좋아하지만 너무 빡빡하게 공략하기보다는 분위기를 즐기면서 플레이하고 싶어요.\n\n초보도 괜찮고, 끝나고 근처에서 간단히 후기 나눌 분이면 더 좋습니다. 신청 후 댓글로 가능한 연락 방법 남겨주세요.",
        authorId: 1,
        authorNickname: "김공포",
        cafeName: "그림게이트",
        branchName: "강남점",
        locationName: "강남점",
        themeName: "체벌린",
        themeTitle: "체벌린",
        playDate: "2026-05-31",
        reservationTime: "18:30",
        deadlineDate: "2026-05-29",
        currentMembers: 2,
        totalMembers: 3,
        experienceLevel: "ANY",
        atmosphereTags: [
            "진지하게",
            "즐겁게"
        ],
        contactMethod: "KAKAO",
        status: "OPEN",
        isPinned: true,
        commentCount: 5,
        createdAt: "2026-05-25T18:30:00"
    },
    {
        id: 2,
        title: "건대점 악마의 제단 고수 2명 구합니다",
        content: "이번이 두 번째 도전입니다. 이번에는 반드시 클리어를 목표로 공략 중심으로 진행할 분을 모집합니다.\n\n방탈출 20회 이상, 공포 테마 경험이 있는 분이면 좋아요. 카카오 오픈채팅으로 연락 주시면 코드 공유드리겠습니다.",
        authorId: 3,
        authorNickname: "정배관",
        storeName: "그림게이트",
        branchName: "건대점",
        locationName: "건대점",
        themeName: "악마의 제단",
        themeTitle: "악마의 제단",
        playDate: "2026-05-31",
        reservationTime: "19:00",
        deadlineDate: "2026-05-30",
        currentMembers: 1,
        totalMembers: 3,
        experienceLevel: "EXPERT",
        atmosphereTags: [
            "공략 위주",
            "진지하게"
        ],
        contactMethod: "KAKAO",
        contactLink: "https://open.kakao.com/o/mock",
        status: "OPEN",
        commentCount: 8,
        createdAt: "2026-05-24T12:00:00"
    }
];
const MOCK_COMMENTS = [
    {
        id: 1,
        postId: 2,
        userId: 10,
        userNickname: "이달빛",
        content: "방탈출 30회 정도 경험 있습니다. 오픈채팅 링크 부탁드려요.",
        createdAt: "2026-05-24T13:00:00"
    },
    {
        id: 2,
        postId: 2,
        userId: 11,
        userNickname: "나도탈출",
        content: "악마의 제단 아직 클리어 못 했는데 이번에 같이 도전해보고 싶어요.",
        createdAt: "2026-05-24T14:30:00"
    },
    {
        id: 3,
        postId: 2,
        userId: 3,
        userNickname: "정배관",
        content: "관심 감사합니다. 신청 주시면 순서대로 연락드릴게요.",
        createdAt: "2026-05-24T16:30:00"
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
const EXPERIENCE_MAP = {
    ANY: {
        label: "무관",
        cls: "border-white/[0.08] bg-[#101010]/70 text-[#777]"
    },
    BEGINNER: {
        label: "입문자 환영",
        cls: "border-[#2ecc71]/22 bg-[#101010]/80 text-[#79c99a]"
    },
    INTERMEDIATE: {
        label: "중급자 우대",
        cls: "border-[#f39c12]/24 bg-[#101010]/80 text-[#d0a35c]"
    },
    EXPERT: {
        label: "경험자 우대",
        cls: "border-[#7a3f35]/35 bg-[#151111]/80 text-[#b77a6b]"
    }
};
function avatarColor(id) {
    return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
}
function getDDayLabel(dateStr) {
    if (!dateStr) return {
        text: "-",
        cls: "text-[#777]"
    };
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDDay"])(dateStr);
    if (d < 0) return {
        text: K.closed,
        cls: "text-[#888]"
    };
    if (d === 0) return {
        text: "D-Day",
        cls: "font-bold text-[#e63946]"
    };
    return {
        text: "D-".concat(d),
        cls: "font-bold text-[#f39c12]"
    };
}
function formatDateValue(value) {
    if (!value) return "-";
    if (Array.isArray(value)) {
        const [year, month, day, hour, minute] = value;
        if (hour !== undefined) return "".concat(year, "-").concat(String(month).padStart(2, "0"), "-").concat(String(day).padStart(2, "0"), " ").concat(String(hour).padStart(2, "0"), ":").concat(String(minute !== null && minute !== void 0 ? minute : 0).padStart(2, "0"));
        return "".concat(year, "-").concat(String(month).padStart(2, "0"), "-").concat(String(day).padStart(2, "0"));
    }
    return value;
}
function MemberDots(param) {
    let { current, total } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-1",
        children: Array.from({
            length: Math.max(total, 1)
        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: [
                    "h-2.5 w-2.5 rounded-full border",
                    index < current ? "border-[#e63946] bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.28)]" : "border-white/[0.14] bg-[#101010]"
                ].join(" ")
            }, index, false, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_c = MemberDots;
function Badge(param) {
    let { children, className = "" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: [
            "inline-flex h-[22px] items-center rounded-md border px-2 text-[11px] font-bold",
            className
        ].join(" "),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
        lineNumber: 161,
        columnNumber: 10
    }, this);
}
_c1 = Badge;
function SummaryItem(param) {
    let { label, value } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-w-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-1 text-[11px] font-black text-[#626262]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "truncate text-sm font-bold text-[#e7e7e7]",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_c2 = SummaryItem;
function CommentItem(param) {
    let { comment, authorId } = param;
    const isAuthorReply = comment.userId === authorId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "border-b border-white/[0.045] py-3",
            isAuthorReply ? "bg-[#cc2222]/[0.035]" : ""
        ].join(" "),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: [
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                        avatarColor(comment.userId)
                    ].join(" "),
                    children: comment.userNickname[0]
                }, void 0, false, {
                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-1 flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold text-[#f5f5f5]",
                                    children: comment.userNickname
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this),
                                isAuthorReply && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded border border-[#cc2222]/35 bg-[#cc2222]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#ef5353]",
                                    children: "작성자"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 31
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-[#555]",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(comment.createdAt)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs leading-relaxed text-[#bdbdbd]",
                            children: comment.content
                        }, void 0, false, {
                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                    lineNumber: 181,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
            lineNumber: 177,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_c3 = CommentItem;
function MateDetailPage(param) {
    let { params } = param;
    var _post_branch, _post_branch1, _post_theme;
    _s();
    const { mateId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    var _MOCK_POSTS_find;
    const post = (_MOCK_POSTS_find = MOCK_POSTS.find((item)=>item.id === Number(mateId))) !== null && _MOCK_POSTS_find !== void 0 ? _MOCK_POSTS_find : MOCK_POSTS[1];
    const comments = MOCK_COMMENTS.filter((comment)=>comment.postId === post.id);
    const [commentText, setCommentText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [applied, setApplied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAllComments, setShowAllComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    var _post_cafeName, _ref, _ref1;
    const cafeName = (_ref1 = (_ref = (_post_cafeName = post.cafeName) !== null && _post_cafeName !== void 0 ? _post_cafeName : post.storeName) !== null && _ref !== void 0 ? _ref : (_post_branch = post.branch) === null || _post_branch === void 0 ? void 0 : _post_branch.storeName) !== null && _ref1 !== void 0 ? _ref1 : null;
    var _post_branchName, _ref2, _ref3;
    const branchName = (_ref3 = (_ref2 = (_post_branchName = post.branchName) !== null && _post_branchName !== void 0 ? _post_branchName : (_post_branch1 = post.branch) === null || _post_branch1 === void 0 ? void 0 : _post_branch1.name) !== null && _ref2 !== void 0 ? _ref2 : post.locationName) !== null && _ref3 !== void 0 ? _ref3 : "-";
    var _post_themeName, _ref4, _ref5;
    const themeName = (_ref5 = (_ref4 = (_post_themeName = post.themeName) !== null && _post_themeName !== void 0 ? _post_themeName : (_post_theme = post.theme) === null || _post_theme === void 0 ? void 0 : _post_theme.title) !== null && _ref4 !== void 0 ? _ref4 : post.themeTitle) !== null && _ref5 !== void 0 ? _ref5 : "-";
    var _post_currentParticipants, _ref6;
    const currentParticipants = (_ref6 = (_post_currentParticipants = post.currentParticipants) !== null && _post_currentParticipants !== void 0 ? _post_currentParticipants : post.currentMembers) !== null && _ref6 !== void 0 ? _ref6 : 0;
    var _post_maxParticipants, _ref7;
    const maxParticipants = (_ref7 = (_post_maxParticipants = post.maxParticipants) !== null && _post_maxParticipants !== void 0 ? _post_maxParticipants : post.totalMembers) !== null && _ref7 !== void 0 ? _ref7 : 0;
    const remaining = Math.max(maxParticipants - currentParticipants, 0);
    var _EXPERIENCE_MAP_post_experienceLevel;
    const exp = (_EXPERIENCE_MAP_post_experienceLevel = EXPERIENCE_MAP[post.experienceLevel]) !== null && _EXPERIENCE_MAP_post_experienceLevel !== void 0 ? _EXPERIENCE_MAP_post_experienceLevel : EXPERIENCE_MAP.ANY;
    const isFull = post.status === "FULL" || post.status === "CLOSED" || currentParticipants >= maxParticipants;
    const isMyPost = post.authorId === 1;
    const dday = getDDayLabel(post.deadlineDate);
    const visibleComments = showAllComments ? comments : comments.slice(0, 4);
    const handleApply = ()=>{
        if (!isFull && !applied) setApplied(true);
    };
    const handleSubmitComment = ()=>{
        if (!commentText.trim()) return;
        setCommentText("");
    };
    var _post_commentCount;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0d0d0d] pb-24 text-[#f5f5f5]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(204,34,34,0.13),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(204,34,34,0.08),transparent_30%),linear-gradient(180deg,#0d0d0d_0%,#101010_48%,#0d0d0d_100%)]"
            }, void 0, false, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative border-b border-white/[0.06]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 py-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex items-center gap-1.5 text-xs font-bold text-[#777]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "transition-colors hover:text-[#f5f5f5]",
                                children: K.home
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/mate",
                                className: "transition-colors hover:text-[#f5f5f5]",
                                children: K.board
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "line-clamp-1 max-w-xs text-[#aaa]",
                                children: post.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "relative mx-auto max-w-7xl px-4 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-6 lg:grid-cols-[1fr_360px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                            className: isFull ? "border-white/[0.08] bg-[#252525] text-[#777]" : "border-[#9f2b2b]/35 bg-[#a72a2a]/80 text-white",
                                            children: isFull ? K.closed : K.recruiting
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 243,
                                            columnNumber: 15
                                        }, this),
                                        cafeName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                            className: "border-white/[0.09] bg-[#101010]/80 text-[#9a9a9a]",
                                            children: cafeName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 244,
                                            columnNumber: 28
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                            className: "border-white/[0.09] bg-[#101010]/80 text-[#858585]",
                                            children: branchName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                            className: "border-white/[0.09] bg-[#101010]/80 text-[#d0d0d0]",
                                            children: themeName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                            className: exp.cls,
                                            children: exp.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 247,
                                            columnNumber: 15
                                        }, this),
                                        post.isPinned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                            className: "border-[#d7b46a]/22 bg-[#101010]/70 text-[#b99a5e]",
                                            children: K.pinned
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-5 rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.25)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 flex flex-wrap items-start gap-3 border-b border-white/[0.055] pb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: [
                                                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
                                                        avatarColor(post.authorId)
                                                    ].join(" "),
                                                    children: post.authorNickname[0]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                            className: "text-[22px] font-black leading-snug text-[#f5f5f5] md:text-[28px]",
                                                            children: post.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 flex flex-wrap items-center gap-2 text-xs text-[#707070]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-bold text-[#bdbdbd]",
                                                                    children: post.authorNickname
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                                    lineNumber: 259,
                                                                    columnNumber: 21
                                                                }, this),
                                                                isMyPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "rounded border border-[#cc2222]/35 bg-[#cc2222]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#ef5353]",
                                                                    children: K.myPost
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                                    lineNumber: 260,
                                                                    columnNumber: 34
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "·"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                                    lineNumber: 261,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(post.createdAt)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                                    lineNumber: 262,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 flex flex-wrap gap-1.5",
                                            children: post.atmosphereTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full border border-white/[0.07] bg-[#101010] px-2.5 py-1 text-xs font-bold text-[#777]",
                                                    children: tag
                                                }, tag, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "whitespace-pre-line text-sm leading-7 text-[#c9c9c9]",
                                            children: post.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 273,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 251,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-5 rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.22)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 flex items-center justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-sm font-black text-[#f5f5f5]",
                                                    children: K.summary
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: [
                                                        "text-xs",
                                                        dday.cls
                                                    ].join(" "),
                                                    children: dday.text
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 277,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.cafe,
                                                    value: cafeName !== null && cafeName !== void 0 ? cafeName : "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.branch,
                                                    value: branchName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.theme,
                                                    value: themeName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.playDate,
                                                    value: formatDateValue(post.playDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.time,
                                                    value: formatDateValue(post.reservationTime)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.members,
                                                    value: "".concat(currentParticipants, "/").concat(maxParticipants).concat(K.people)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.remaining,
                                                    value: isFull ? K.closed : "".concat(remaining).concat(K.left)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.deadline,
                                                    value: formatDateValue(post.deadlineDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.055] bg-[#101010]/70 px-4 py-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemberDots, {
                                                    current: currentParticipants,
                                                    total: maxParticipants
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-[#d8d8d8]",
                                                    children: [
                                                        currentParticipants,
                                                        K.people,
                                                        " 참여 중 ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "mx-1 text-[#555]",
                                                            children: "·"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 56
                                                        }, this),
                                                        " ",
                                                        isFull ? K.closed : "".concat(remaining).concat(K.left)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 293,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 276,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-white/[0.08] bg-[#171717]/92 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.22)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mb-4 text-sm font-black text-[#f5f5f5]",
                                            children: K.detail
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 302,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.cafe,
                                                    value: cafeName !== null && cafeName !== void 0 ? cafeName : "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.branch,
                                                    value: branchName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.theme,
                                                    value: themeName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.contact,
                                                    value: post.contactMethod === "KAKAO" ? "카카오 오픈채팅" : "댓글 문의"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.playDate,
                                                    value: formatDateValue(post.playDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryItem, {
                                                    label: K.time,
                                                    value: formatDateValue(post.reservationTime)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 303,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 301,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "lg:sticky lg:top-5 lg:self-start",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-white/[0.08] bg-[#171717]/92 shadow-[0_16px_42px_rgba(0,0,0,0.25)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-b border-white/[0.06] px-4 py-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-sm font-black text-[#f5f5f5]",
                                            children: [
                                                K.comments,
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#ef5353]",
                                                    children: (_post_commentCount = post.commentCount) !== null && _post_commentCount !== void 0 ? _post_commentCount : comments.length
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                            lineNumber: 317,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 316,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-[430px] overflow-y-auto px-4",
                                        children: [
                                            comments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "py-7 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-bold text-[#777]",
                                                        children: K.noComment
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-[11px] text-[#555]",
                                                        children: K.firstComment
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 324,
                                                columnNumber: 19
                                            }, this),
                                            visibleComments.map((comment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentItem, {
                                                    comment: comment,
                                                    authorId: post.authorId
                                                }, comment.id, false, {
                                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 51
                                                }, this)),
                                            !showAllComments && comments.length > visibleComments.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowAllComments(true),
                                                className: "w-full border-b border-white/[0.045] py-3 text-xs font-bold text-[#888] transition-colors hover:text-[#f5f5f5]",
                                                children: [
                                                    "댓글 더보기 (",
                                                    comments.length - visibleComments.length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 331,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 322,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-white/[0.06] px-4 py-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: commentText,
                                                onChange: (event)=>setCommentText(event.target.value),
                                                placeholder: K.commentPlaceholder,
                                                rows: 3,
                                                className: "mb-2 w-full resize-none rounded-lg border border-white/[0.08] bg-[#0d0d0d] p-3 text-xs text-[#f5f5f5] outline-none transition-colors placeholder:text-[#555] focus:border-[#cc2222]/70"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 338,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleSubmitComment,
                                                disabled: !commentText.trim(),
                                                className: "h-9 w-full rounded-lg bg-[#e63946] text-xs font-black text-white transition-colors hover:bg-[#c1121f] disabled:cursor-not-allowed disabled:opacity-30",
                                                children: K.submit
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                        lineNumber: 337,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                lineNumber: 315,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                            lineNumber: 314,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                    lineNumber: 240,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-0 left-0 right-0 z-10 flex justify-center pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-7xl pointer-events-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-white/[0.06] bg-[#0d0d0d]/95 px-4 py-3 backdrop-blur",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/mate",
                                    className: "rounded-lg border border-white/[0.1] px-4 py-2.5 text-sm font-bold text-[#888] transition-colors hover:border-white/[0.2] hover:text-[#f5f5f5]",
                                    children: K.list
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 363,
                                    columnNumber: 15
                                }, this),
                                isMyPost ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: true,
                                    className: "rounded-lg bg-[#2a2a2a] px-6 py-2.5 text-sm font-bold text-[#666]",
                                    children: K.myPost
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 367,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleApply,
                                    disabled: isFull || applied,
                                    className: [
                                        "rounded-lg px-6 py-2.5 text-sm font-black transition-colors",
                                        applied ? "cursor-default bg-[#2ecc71] text-white" : isFull ? "cursor-not-allowed bg-[#2a2a2a] text-[#555]" : "bg-[#e63946] text-white hover:bg-[#c1121f]"
                                    ].join(" "),
                                    children: applied ? K.applied : isFull ? K.closed : K.apply
                                }, void 0, false, {
                                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                                    lineNumber: 371,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                            lineNumber: 362,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                        lineNumber: 361,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                    lineNumber: 360,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/mate/[mateId]/page.tsx",
                lineNumber: 359,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mate/[mateId]/page.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, this);
}
_s(MateDetailPage, "vE14K/ylSwoHbyZVF4kT0H2Fd5c=");
_c4 = MateDetailPage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "MemberDots");
__turbopack_context__.k.register(_c1, "Badge");
__turbopack_context__.k.register(_c2, "SummaryItem");
__turbopack_context__.k.register(_c3, "CommentItem");
__turbopack_context__.k.register(_c4, "MateDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_d40450d1._.js.map