(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/ai-recommend/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AIRecommendPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const mascotSrc = "/images/\uB839\uB0E5/\uB839\uB0E52_\uD22C\uBA85.png";
const avatarSrc = "/images/\uB839\uB0E5/ghost-cat-avatar.png";
const promptSuggestions = [
    "무서운 거 잘 못해도 가능해?",
    "3명이서 갈 만한 테마",
    "스토리 좋은 미스터리",
    "진짜 무서운 테마",
    "초보자 가능 테마"
];
const initialMessages = [
    {
        id: 1,
        speaker: "ai",
        text: "안녕하세요. 저는 GRIMGATE AI 챗봇 령냥이에요. 원하는 지역, 인원, 공포도, 분위기를 알려주시면 어울리는 방탈출 테마를 추천해드릴게요."
    }
];
function AIRecommendPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatBotPage, {}, void 0, false, {
        fileName: "[project]/src/app/ai-recommend/page.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, this);
}
_c = AIRecommendPage;
function ChatBotPage() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMessages);
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [hasRecommendation, setHasRecommendation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sendMessage = (message)=>{
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return;
        const nextId = Date.now();
        setMessages((currentMessages)=>[
                ...currentMessages,
                {
                    id: nextId,
                    speaker: "user",
                    text: trimmedMessage
                },
                {
                    id: nextId + 1,
                    speaker: "ai",
                    text: "좋아요. 말씀해주신 조건을 기준으로 령냥이가 어울리는 공포 테마를 찾아봤어요."
                }
            ]);
        setHasRecommendation(true);
        setInputValue("");
    };
    const handleSubmit = (event)=>{
        event.preventDefault();
        sendMessage(inputValue);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen overflow-hidden bg-[#0d0d0d] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(204,34,34,0.16),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(180,240,255,0.055),transparent_24%),linear-gradient(180deg,#0d0d0d_0%,#111_48%,#0b0b0b_100%)]"
            }, void 0, false, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#cc2222]/60 to-transparent"
            }, void 0, false, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "grid items-stretch gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex flex-col justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pointer-events-none absolute -left-20 top-12 h-80 w-80 rounded-full bg-[#cc2222]/10 blur-[96px]"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 max-w-[500px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-5 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.28em] text-[#cc2222]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "h-px w-8 bg-[#cc2222]/80"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 17
                                                }, this),
                                                "GRIMGATE AI ASSISTANT"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "break-keep text-[36px] font-black leading-[1.14] text-[#f5f5f5] sm:text-[46px] lg:text-[51px]",
                                            children: [
                                                "령냥이에게",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#cc2222] drop-shadow-[0_0_20px_rgba(204,34,34,0.22)]",
                                                    children: "공포의 조건"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 17
                                                }, this),
                                                "을",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 17
                                                }, this),
                                                "말해주세요."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-5 max-w-[440px] break-keep text-[15px] leading-8 text-[#a8a8a8]",
                                            children: "지역, 인원, 분위기만 알려주면 령냥이가 오늘 들어갈 만한 문을 조용히 찾아드릴게요."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative mt-3 max-w-[470px] lg:mx-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pointer-events-none absolute left-1/2 top-[43%] h-[330px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,240,255,0.13)_0%,rgba(204,34,34,0.075)_40%,transparent_72%)] blur-2xl"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pointer-events-none absolute inset-x-6 bottom-8 h-px bg-gradient-to-r from-transparent via-[#cc2222]/45 to-transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative mx-auto h-[318px] w-[318px] sm:h-[352px] sm:w-[352px] lg:h-[370px] lg:w-[370px] lg:-translate-y-5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: mascotSrc,
                                                alt: "GrimGate AI 캐릭터 령냥이",
                                                fill: true,
                                                sizes: "(min-width: 1024px) 370px, 352px",
                                                className: "select-none object-contain brightness-110 contrast-105 drop-shadow-[0_0_42px_rgba(180,240,255,0.42)]",
                                                priority: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                                lineNumber: 101,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative -mt-10 grid max-w-[430px] grid-cols-3 gap-2 rounded-[16px] border border-white/[0.08] bg-[#111]/74 p-2.5 shadow-[0_18px_46px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-sm",
                                            children: [
                                                "위치",
                                                "인원",
                                                "취향"
                                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-[11px] border border-white/[0.06] bg-white/[0.035] px-3 py-2 text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-black tracking-[0.18em] text-[#cc2222]",
                                                            children: "INPUT"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-[13px] font-black text-[#ededed]",
                                                            children: item
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, item, true, {
                                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatWindow, {
                            messages: messages,
                            inputValue: inputValue,
                            hasRecommendation: hasRecommendation,
                            suggestions: promptSuggestions,
                            onInputChange: setInputValue,
                            onSubmit: handleSubmit,
                            onSuggestionSelect: sendMessage
                        }, void 0, false, {
                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ai-recommend/page.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(ChatBotPage, "QacXN+mT3U3poCcZMvGYZXhCg0I=");
_c1 = ChatBotPage;
function PromptSuggestionButtons(param) {
    let { suggestions, onSelect } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-[14px] border border-white/[0.08] bg-[#151515]/72 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 text-[11px] font-black text-[#cc2222]",
                children: "무엇을 물어볼까요?"
            }, void 0, false, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: suggestions.map((suggestion)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onSelect(suggestion),
                        className: "min-h-8 rounded-full border border-white/[0.1] bg-[#1a1a1a]/78 px-3 text-left text-[11px] font-semibold text-[#d8d8d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-[#cc2222]/70 hover:bg-[#cc2222]/13 hover:text-white hover:shadow-[0_0_18px_rgba(204,34,34,0.14),inset_0_1px_0_rgba(255,255,255,0.06)]",
                        children: suggestion
                    }, suggestion, false, {
                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ai-recommend/page.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
_c2 = PromptSuggestionButtons;
function ChatWindow(param) {
    let { messages, inputValue, hasRecommendation, suggestions, onInputChange, onSubmit, onSuggestionSelect } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative flex min-h-[680px] lg:min-h-[760px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute -inset-6 rounded-[32px] bg-[#cc2222]/10 blur-[48px]"
            }, void 0, false, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex w-full flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#151515]/96 shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_38px_rgba(204,34,34,0.1)] backdrop-blur-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#111]/94 px-5 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative h-11 w-11 shrink-0 overflow-visible rounded-full border border-white/[0.1]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: avatarSrc,
                                            alt: "령냥이 아이콘",
                                            fill: true,
                                            sizes: "44px",
                                            className: "select-none object-contain drop-shadow-[0_0_14px_rgba(180,240,255,0.36)]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[15px] font-black text-[#f4f4f4]",
                                                children: "령냥이"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-0.5 truncate text-[12px] text-[#8d8d8d]",
                                                children: "GrimGate AI 령냥이가 당신만의 공포를 찾아드려요."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                                lineNumber: 206,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex shrink-0 items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-bold text-[#d7d7d7]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-1.5 w-1.5 rounded-full bg-[#cc2222] shadow-[0_0_10px_rgba(204,34,34,0.8)]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this),
                                    "온라인"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-3.5 overflow-y-auto bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.035),transparent_26%),linear-gradient(180deg,#141414,#111)] px-5 py-5 sm:px-6",
                        children: [
                            messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatMessage, {
                                    speaker: message.speaker,
                                    children: message.text
                                }, message.id, false, {
                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this)),
                            !hasRecommendation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PromptSuggestionButtons, {
                                        suggestions: suggestions,
                                        onSelect: onSuggestionSelect
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-h-[190px] items-center justify-center px-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "max-w-[360px] text-center text-[12px] leading-6 text-[#777] opacity-70",
                                            children: "아직 문이 열리지 않았어요. 원하는 공포의 조건을 알려주면 령냥이가 어울리는 테마를 찾아드려요."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this),
                            hasRecommendation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecommendedThemeCard, {}, void 0, false, {
                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                lineNumber: 239,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: onSubmit,
                        className: "border-t border-white/[0.08] bg-[#111] p-3.5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 rounded-[14px] border border-white/[0.1] bg-[#181818] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-colors focus-within:border-[#cc2222]/55",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: inputValue,
                                    onChange: (event)=>onInputChange(event.target.value),
                                    placeholder: "메시지를 입력하세요...",
                                    className: "min-w-0 flex-1 bg-transparent text-[14px] font-semibold text-[#f0f0f0] outline-none placeholder:text-[#777]"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    "aria-label": "메시지 보내기",
                                    className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#cc2222] text-[18px] font-black text-white transition-all hover:bg-[#e12a2a] hover:shadow-[0_0_18px_rgba(204,34,34,0.32)]",
                                    children: "\u2192"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                                    lineNumber: 253,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/ai-recommend/page.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ai-recommend/page.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
}
_c3 = ChatWindow;
function ChatMessage(param) {
    let { speaker, children } = param;
    const isUser = speaker === "user";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex ".concat(isUser ? "justify-end" : "justify-start gap-3"),
        children: [
            !isUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mt-1 h-9 w-9 shrink-0 overflow-visible rounded-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: avatarSrc,
                    alt: "",
                    fill: true,
                    sizes: "36px",
                    className: "select-none object-contain drop-shadow-[0_0_10px_rgba(180,240,255,0.35)]"
                }, void 0, false, {
                    fileName: "[project]/src/app/ai-recommend/page.tsx",
                    lineNumber: 280,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 279,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: [
                    "max-w-[84%] rounded-[15px] px-4 py-3 text-[13px] leading-[1.7] shadow-[0_10px_26px_rgba(0,0,0,0.2)]",
                    isUser ? "rounded-br-[6px] bg-[#cc2222] text-white shadow-[0_12px_30px_rgba(204,34,34,0.16)]" : "rounded-bl-[6px] border border-white/[0.08] bg-[#1b1b1b] text-[#d8d8d8]"
                ].join(" "),
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ai-recommend/page.tsx",
        lineNumber: 277,
        columnNumber: 5
    }, this);
}
_c4 = ChatMessage;
function RecommendedThemeCard() {
    const tags = [
        "난이도 ★★★☆☆",
        "3인 추천",
        "미스터리",
        "스토리 중심"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "mt-5 rounded-[16px] border border-[#cc2222]/28 bg-[linear-gradient(135deg,rgba(204,34,34,0.1),rgba(27,27,27,0.97)_34%,rgba(18,18,18,0.98))] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.3),0_0_24px_rgba(204,34,34,0.1)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-3 text-[12px] font-black text-[#cc2222]",
                children: "추천 테마"
            }, void 0, false, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 sm:grid-cols-[160px_1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-[134px] overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#1b1b1b] sm:h-full sm:min-h-[150px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/images/horror/theme-smoke.png",
                                alt: "잊혀진 기록관 테마 이미지",
                                fill: true,
                                sizes: "160px",
                                className: "object-cover brightness-110 contrast-110 saturate-[0.7]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-t from-black/32 via-black/8 to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-[21px] font-black leading-tight text-[#f4f4f4]",
                                        children: "잊혀진 기록관"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                                        lineNumber: 326,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "shrink-0 rounded-full border border-[#cc2222]/45 bg-[#cc2222]/18 px-2.5 py-1 text-[10px] font-black text-[#ffb0b0]",
                                        children: "추천"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                                        lineNumber: 329,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex flex-wrap gap-1.5",
                                children: tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border border-white/[0.08] bg-white/[0.055] px-2.5 py-1 text-[11px] font-semibold text-[#bdbdbd]",
                                        children: tag
                                    }, tag, false, {
                                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                lineNumber: 334,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-[13px] leading-6 text-[#a0a0a0]",
                                children: "폐쇄된 기록관에 남겨진 비밀을 파헤치는 미스터리 테마. 단서 수집과 협력으로 진실에 다가가세요."
                            }, void 0, false, {
                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/themes",
                                className: "mt-4 inline-flex text-[13px] font-black text-[#ff4a4a] transition-colors hover:text-[#ff6a6a]",
                                children: [
                                    "자세히 보기 ",
                                    "\u2192"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/ai-recommend/page.tsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/ai-recommend/page.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/ai-recommend/page.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ai-recommend/page.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_c5 = RecommendedThemeCard;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "AIRecommendPage");
__turbopack_context__.k.register(_c1, "ChatBotPage");
__turbopack_context__.k.register(_c2, "PromptSuggestionButtons");
__turbopack_context__.k.register(_c3, "ChatWindow");
__turbopack_context__.k.register(_c4, "ChatMessage");
__turbopack_context__.k.register(_c5, "RecommendedThemeCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_ai-recommend_page_tsx_1085c0b2._.js.map