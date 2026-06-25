'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { getToken } from '@/lib/token';
import {
    clearMinigame,
    isMinigameAchievementAcquired,
} from '@/services/minigameService';

// ─── SOUND ───
let _audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!_audioCtx) {
        _audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (_audioCtx.state === 'suspended') {
        _audioCtx.resume();
    }
    return _audioCtx;
}

function playSound(type: 'opening' | 'lock' | 'wrong' | 'correct' | 'ending' | 'clank') {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'opening') {
        // 긴장감 있는 저음 드론 (2개 오실레이터로 불협화음)
        [55, 58].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.linearRampToValueAtTime(freq - 5, now + 3);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.35, now + 0.3);
            gain.gain.linearRampToValueAtTime(0.25, now + 2.5);
            gain.gain.linearRampToValueAtTime(0, now + 3);
            osc.start(now); osc.stop(now + 3);
        });
        // 고음 긴장 트레몰로
        const tremOsc = ctx.createOscillator();
        const tremLfo = ctx.createOscillator();
        const tremGain = ctx.createGain();
        const masterGain = ctx.createGain();
        tremLfo.frequency.value = 8;
        tremLfo.connect(tremGain);
        tremGain.gain.value = 0.15;
        tremOsc.type = 'sine';
        tremOsc.frequency.value = 440;
        tremOsc.connect(masterGain);
        tremGain.connect(masterGain.gain);
        masterGain.connect(ctx.destination);
        masterGain.gain.setValueAtTime(0, now + 0.5);
        masterGain.gain.linearRampToValueAtTime(0.2, now + 1);
        masterGain.gain.linearRampToValueAtTime(0, now + 3);
        tremLfo.start(now); tremOsc.start(now + 0.5);
        tremLfo.stop(now + 3); tremOsc.stop(now + 3);
        // 문 잠기는 쿵
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
        const src = ctx.createBufferSource();
        const filt = ctx.createBiquadFilter();
        filt.type = 'lowpass'; filt.frequency.value = 100;
        const thudGain = ctx.createGain();
        thudGain.gain.setValueAtTime(1.0, now);
        src.buffer = buf; src.connect(filt); filt.connect(thudGain); thudGain.connect(ctx.destination);
        src.start(now + 0.3);
    }

    if (type === 'wrong') {
        // 삐빅 두 번
        [0, 0.22].forEach(offset => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.value = 320;
            gain.gain.setValueAtTime(0.3, now + offset);
            gain.gain.setValueAtTime(0, now + offset + 0.15);
            osc.start(now + offset); osc.stop(now + offset + 0.15);
        });
    }

    if (type === 'correct') {
        // 낮고 불길한 금속음 — 잠금 해제됐지만 뭔가 잘못된 느낌
        [110, 138, 82].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = i === 2 ? 'sawtooth' : 'square';
            osc.frequency.setValueAtTime(freq, now + i * 0.15);
            osc.frequency.linearRampToValueAtTime(freq * 0.85, now + i * 0.15 + 0.5);
            gain.gain.setValueAtTime(0.22, now + i * 0.15);
            gain.gain.linearRampToValueAtTime(0, now + i * 0.15 + 0.5);
            osc.start(now + i * 0.15); osc.stop(now + i * 0.15 + 0.6);
        });
        // 뒤에 낮은 드론 여운
        const drone = ctx.createOscillator();
        const dGain = ctx.createGain();
        drone.connect(dGain); dGain.connect(ctx.destination);
        drone.type = 'sine';
        drone.frequency.value = 55;
        dGain.gain.setValueAtTime(0.15, now + 0.4);
        dGain.gain.linearRampToValueAtTime(0, now + 1.2);
        drone.start(now + 0.4); drone.stop(now + 1.2);
    }

    if (type === 'lock') {
        // 삐빅 → 잠금 해제음
        [0, 0.18].forEach((offset, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.value = i === 0 ? 440 : 660;
            gain.gain.setValueAtTime(0.25, now + offset);
            gain.gain.setValueAtTime(0, now + offset + 0.13);
            osc.start(now + offset); osc.stop(now + offset + 0.14);
        });
    }

    if (type === 'clank') {
        // 철컥 — 고주파 노이즈 + 금속 클릭
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
        }
        const src = ctx.createBufferSource();
        const filt = ctx.createBiquadFilter();
        filt.type = 'bandpass'; filt.frequency.value = 2000; filt.Q.value = 0.8;
        const clankGain = ctx.createGain();
        clankGain.gain.value = 1.2;
        src.buffer = buf; src.connect(filt); filt.connect(clankGain); clankGain.connect(ctx.destination);
        src.start(now);
        // 짧은 금속 링
        const ring = ctx.createOscillator();
        const rGain = ctx.createGain();
        ring.connect(rGain); rGain.connect(ctx.destination);
        ring.type = 'sine'; ring.frequency.value = 1800;
        rGain.gain.setValueAtTime(0.3, now + 0.05);
        rGain.gain.linearRampToValueAtTime(0, now + 0.2);
        ring.start(now + 0.05); ring.stop(now + 0.2);
    }

    if (type === 'ending') {
        // 낮고 긴 금속 공명음 — 탈출했지만 찝찝한 느낌
        const freqs = [82, 104, 62];
        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + i * 0.25);
            osc.frequency.linearRampToValueAtTime(freq * 0.9, now + i * 0.25 + 1.5);
            gain.gain.setValueAtTime(0, now + i * 0.25);
            gain.gain.linearRampToValueAtTime(0.3, now + i * 0.25 + 0.1);
            gain.gain.linearRampToValueAtTime(0, now + i * 0.25 + 1.8);
            osc.start(now + i * 0.25); osc.stop(now + i * 0.25 + 2);
        });
        // 높은 삐 소리 (비상구 느낌)
        const beep = ctx.createOscillator();
        const bGain = ctx.createGain();
        beep.connect(bGain); bGain.connect(ctx.destination);
        beep.type = 'sine';
        beep.frequency.value = 880;
        bGain.gain.setValueAtTime(0.18, now + 0.8);
        bGain.gain.linearRampToValueAtTime(0, now + 1.8);
        beep.start(now + 0.8); beep.stop(now + 1.8);
    }
}

// ─── OPENING BGM ───
let _bgmNodes: { osc: OscillatorNode; gain: GainNode }[] = [];

function startOpeningBgm() {
    const ctx = getAudioContext();
    if (!ctx) return;
    stopOpeningBgm();
    const now = ctx.currentTime;

    // ── 착신아리 스타일 멜로디 ──
    // 단순하고 반복적인 고음 피아노풍 멜로디
    const melody = [
        { freq: 1174.7, t: 0 },    // D6
        { freq: 1046.5, t: 0.4 },  // C6
        { freq: 880.0,  t: 0.8 },  // A5
        { freq: 987.8,  t: 1.2 },  // B5
        { freq: 1174.7, t: 1.8 },  // D6
        { freq: 1318.5, t: 2.2 },  // E6
        { freq: 1174.7, t: 2.6 },  // D6
        { freq: 880.0,  t: 3.2 },  // A5
        { freq: 987.8,  t: 3.8 },  // B5
        { freq: 880.0,  t: 4.4 },  // A5
        { freq: 783.9,  t: 4.9 },  // G5
        { freq: 880.0,  t: 5.5 },  // A5
        { freq: 1174.7, t: 6.2 },  // D6
        { freq: 1046.5, t: 6.6 },  // C6
        { freq: 880.0,  t: 7.0 },  // A5
        { freq: 987.8,  t: 7.6 },  // B5
    ];

    melody.forEach(({ freq, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, now + t);
        gain.gain.linearRampToValueAtTime(0.18, now + t + 0.02);
        gain.gain.linearRampToValueAtTime(0, now + t + 0.35);
        osc.start(now + t); osc.stop(now + t + 0.4);
        _bgmNodes.push({ osc, gain });
    });

    // ── 낮은 드론 반주 ──
    [110, 146.8].forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.07, now + 1);
        gain.gain.linearRampToValueAtTime(0.07, now + 7.5);
        gain.gain.linearRampToValueAtTime(0, now + 8.5);
        osc.start(now); osc.stop(now + 8.5);
        _bgmNodes.push({ osc, gain });
    });
}

function stopOpeningBgm() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    _bgmNodes.forEach(({ osc, gain }) => {
        try {
            gain.gain.linearRampToValueAtTime(0, now + 0.5);
            osc.stop(now + 0.5);
        } catch {}
    });
    _bgmNodes = [];
}

// ─── TYPES ───
type Screen =
    | 'opening'
    | 'calendar'
    | 'door'
    | 'stage1'
    | 'stage2'
    | 'stage3'
    | 'ending';

// ─── CONSTANTS ───
const TOTAL_SECONDS = 300; // 5:00

export default function MinigamePage() {
    const [screen, setScreen] = useState<Screen>('calendar');
    const [transitioning, setTransitioning] = useState(false);
    const router = useRouter();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const clearReportStartedRef = useRef(false);

    // Timer
    const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
    const [gameStarted, setGameStarted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const penaltyRef = useRef(false);

    // Stage 1
    const [input1, setInput1] = useState('');
    const [msg1, setMsg1] = useState('');
    const [msg1Type, setMsg1Type] = useState<'success' | 'error' | ''>('');
    const [input1Visible, setInput1Visible] = useState(false);
    const [lock1, setLock1] = useState(false);

    // Stage 2
    const [missingRevealed, setMissingRevealed] = useState(false);
    const [msg2, setMsg2] = useState('');
    const [msg2Type, setMsg2Type] = useState<'success' | 'error' | ''>('');
    const [lock2, setLock2] = useState(false);
    const [choicesDisabled, setChoicesDisabled] = useState(false);

    // Stage 3
    const [cal3State, setCal3State] = useState(0);
    const [docStamped, setDocStamped] = useState(false);
    const [input3, setInput3] = useState('');
    const [msg3, setMsg3] = useState('');
    const [msg3Type, setMsg3Type] = useState<'success' | 'error' | ''>('');
    const [lock3, setLock3] = useState(false);

    // Choco hints
    const [choco1Open, setChoco1Open] = useState(false);
    const [choco2Open, setChoco2Open] = useState(false);
    const [choco3Open, setChoco3Open] = useState(false);

    // Ending
    const [clearTime, setClearTime] = useState(0);
    const [achievementNotice, setAchievementNotice] = useState('');
    const [achievementNoticeTone, setAchievementNoticeTone] =
        useState<'success' | 'warning' | 'error' | ''>('');

    const reportMinigameClear = useCallback(async () => {
        if (clearReportStartedRef.current) return;
        clearReportStartedRef.current = true;

        if (!hasHydrated || !isLoggedIn || !getToken()) {
            setAchievementNotice('업적을 계정에 저장하려면 로그인이 필요합니다.');
            setAchievementNoticeTone('warning');
            return;
        }

        try {
            const result = await clearMinigame();

            if (result.newAcquired) {
                setAchievementNotice(`업적 획득: ${result.achievement.name}`);
                setAchievementNoticeTone('success');
            }

            try {
                const acquired = await isMinigameAchievementAcquired();
                if (!acquired) {
                    setAchievementNotice('클리어 기록은 전송됐지만 업적 반영을 확인하지 못했습니다.');
                    setAchievementNoticeTone('error');
                }
            } catch {
                setAchievementNotice('클리어 기록은 저장됐지만 업적 상태를 다시 확인하지 못했습니다.');
                setAchievementNoticeTone('warning');
            }
        } catch {
            setAchievementNotice('클리어 기록을 계정에 저장하지 못했습니다.');
            setAchievementNoticeTone('error');
        }
    }, [hasHydrated, isLoggedIn]);

    // ─── SCREEN TRANSITION ───
    const goToScreen = useCallback((next: Screen) => {
        setTransitioning(true);
        setTimeout(() => {
            setScreen(next);
            setTimeout(() => setTransitioning(false), 100);
        }, 500);
    }, []);

    // ─── TIMER ───
    const startGame = useCallback(() => {
        if (gameStarted) return;
        setGameStarted(true);
    }, [gameStarted]);

    const goToDoor = useCallback(() => {
        stopOpeningBgm();
        goToScreen('door');
        setTimeout(() => {
            const bar = document.querySelector('.door-progress-bar') as HTMLElement;
            if (bar) { bar.style.width = '100%'; }
            setTimeout(() => {
                startGame();
                goToScreen('stage1');
            }, 3200);
        }, 600);
    }, [goToScreen, startGame]);

    // ─── OPENING AUTO-ADVANCE ───
    useEffect(() => {
        const t = setTimeout(() => {
            if (screen === 'opening') goToDoor();
        }, 14000);
        return () => clearTimeout(t);
    }, [screen, goToDoor]);

    useEffect(() => {
        if (!gameStarted) return;
        timerRef.current = setInterval(() => {
            setSecondsLeft(prev => {
                const next = Math.max(0, prev - 1);
                if (next <= 0) {
                    clearInterval(timerRef.current!);
                    setTimeout(() => {
                        alert('시간이 초과되었습니다. 처음부터 다시 시작합니다.');
                        resetGame();
                    }, 500);
                }
                return next;
            });
        }, 1000);
        return () => clearInterval(timerRef.current!);
    }, [gameStarted]);

    const applyPenalty = useCallback((seconds: number) => {
        if (penaltyRef.current) return;
        penaltyRef.current = true;
        setSecondsLeft(prev => Math.max(0, prev - seconds));
        setTimeout(() => { penaltyRef.current = false; }, 1000);
    }, []);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const isUrgent = secondsLeft <= 60;

    // ─── RESET ───
    const resetGame = () => {
        stopOpeningBgm();
        clearInterval(timerRef.current!);
        timerRef.current = null;
        setSecondsLeft(TOTAL_SECONDS);
        setGameStarted(false);
        penaltyRef.current = false;
        setInput1(''); setMsg1(''); setMsg1Type(''); setInput1Visible(false); setLock1(false);
        setMissingRevealed(false); setMsg2(''); setMsg2Type(''); setLock2(false); setChoicesDisabled(false);
        setCal3State(0); setDocStamped(false); setInput3(''); setMsg3(''); setMsg3Type(''); setLock3(false);
        setChoco1Open(false); setChoco2Open(false); setChoco3Open(false);
        clearReportStartedRef.current = false;
        setAchievementNotice('');
        setAchievementNoticeTone('');
        goToScreen('opening');
    };

    // ─── CALENDAR (intro screen) ───
    const selectDate = () => {
        playSound('opening');
        startOpeningBgm();
        setTimeout(() => {
            goToScreen('opening');
        }, 800);
    };

    // ─── STAGE 1 ───
    const checkAnswer1 = () => {
        if (input1.trim() === '08501751') {
            setMsg1('첫 번째 잠금이 풀렸습니다.');
            setMsg1Type('success');
            setLock1(true);
            playSound('correct');
            setTimeout(() => { playSound('lock'); goToScreen('stage2'); }, 1500);
        } else {
            setMsg1('기록이 맞지 않습니다. (−10초)');
            setMsg1Type('error');
            playSound('wrong');
            applyPenalty(10);
            setTimeout(() => { setMsg1(''); setMsg1Type(''); }, 1200);
        }
    };

    // ─── STAGE 2 ───
    const checkChoice2 = (choice: string) => {
        setChoicesDisabled(true);
        if (choice === '점심시간') {
            setMsg2('두 번째 잠금이 풀렸습니다.');
            setMsg2Type('success');
            setLock2(true);
            playSound('correct');
            setTimeout(() => { playSound('lock'); goToScreen('stage3'); }, 1500);
        } else {
            setMsg2('아직 누군가 돌아오지 않았습니다. (−10초)');
            setMsg2Type('error');
            playSound('wrong');
            applyPenalty(10);
            setTimeout(() => {
                setMsg2(''); setMsg2Type('');
                setChoicesDisabled(false);
            }, 1200);
        }
    };

    // ─── STAGE 3 ───
    const checkAnswer3 = () => {
        if (input3.trim() === '0702') {
            setMsg3('문이 열리는 소리가 들립니다.');
            setMsg3Type('success');
            setLock3(true);
            playSound('correct');
            clearInterval(timerRef.current!);
            setClearTime(secondsLeft);
            void reportMinigameClear();
            setTimeout(() => { playSound('ending'); goToScreen('ending'); }, 2000);
        } else {
            setMsg3('아직 그날이 아닙니다. (−10초)');
            setMsg3Type('error');
            playSound('wrong');
            applyPenalty(10);
            setTimeout(() => { setMsg3(''); setMsg3Type(''); }, 1200);
        }
    };
    // ─── KEYBOARD SHORTCUTS ───
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                if (screen === 'stage1' && input1Visible) checkAnswer1();
                if (screen === 'stage3') checkAnswer3();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [screen, input1Visible, input1, input3]);

    // ─── JULY CALENDAR (stage 3) ───
    const julyCalendar = () => {
        const days = ['일','월','화','수','목','금','토'];
        const blanks = 2; // July 1 = Tuesday
        const cells = [];
        days.forEach(d => cells.push({ type: 'header', label: d }));
        for (let i = 0; i < blanks; i++) cells.push({ type: 'blank' });
        for (let d = 1; d <= 31; d++) {
            cells.push({
                type: d === 2 ? 'highlight' : 'crossed',
                label: String(d),
            });
        }
        return cells;
    };

    // ─── HUD ───
    const HUD = ({ stage, locks }: { stage: string; locks: boolean[] }) => (
        <div style={styles.hud}>
            <div style={styles.hudTitle}>{stage}</div>
            <div style={{ ...styles.hudTimer, ...(isUrgent ? styles.urgent : {}) }}>
                {formatTime(secondsLeft)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={styles.hudLocks}>
                {locks.map((unlocked, i) => (
                    <div key={i} style={{ ...styles.lockPip, ...(unlocked ? styles.lockUnlocked : {}) }}>
                        {i + 1}
                    </div>
                ))}
            </div>
            <button
                onClick={() => router.push('/')}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#d8d8d8', cursor: 'pointer', border: '1px solid #d8d8d8', padding: '4px 10px', borderRadius: 2, background: 'transparent' }}
            >
                나가기
            </button>
        </div>
        </div>
    );

    // ─── RENDER ───
    return (
        <>
            <style>{css}</style>

            {/* Transition overlay */}
            <div style={{ ...styles.overlay, opacity: transitioning ? 1 : 0, pointerEvents: transitioning ? 'all' : 'none' }} />

            {/* OPENING */}
            {screen === 'opening' && (
                <div style={styles.screen}>
                    <div className="opening-text">
                        <span className="line" style={{ animationDelay: '0.5s' }}>…</span>
                        <span className="line red" style={{ animationDelay: '2s' }}>"드디어 눈을 떴네."</span>
                        <span className="line" style={{ animationDelay: '3.5s' }}>"네가 여기서 얼마나 버틸지 내기에 꽤 큰돈을 걸었거든."</span>
                        <span className="line dim" style={{ animationDelay: '5s' }}>— 전화 연결음 —</span>
                        <span className="line" style={{ animationDelay: '6.5s' }}>"어, 상품은 준비됐어. 지금 나가는 중이야."</span>
                        <span className="line" style={{ animationDelay: '8s' }}>"거기까지 5분이면 충분해. 딱 맞춰 갈 테니까 기다리고 있어."</span>
                        <span className="line italic" style={{ animationDelay: '9.5s' }} onAnimationStart={() => setTimeout(() => playSound('clank'), 100)}>철컥 — 문이 잠긴다.</span>
                        <span className="line red" style={{ animationDelay: '11s' }}>놈이 자리를 비운 이 5분이 내 인생의 마지막 기회다.</span>
                    </div>
                    <button className="skip-btn" onClick={goToDoor}>건너뛰기 →</button>
                </div>
            )}


            {/* CALENDAR */}
            {screen === 'calendar' && (
                <div style={{ ...styles.screen, gap: 24, padding: '40px 20px', background: 'var(--bg-deep)' }}>
                    <div className="cal-title">예약 날짜 선택</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>2026년 7월</div>
                    <div style={styles.calSubtitle}>
                        대부분의 날짜는 접근이 불가합니다.<br />
                        <span style={{ color: 'var(--red-bright)', fontWeight: 700 }}>이 날짜를 선택하면 되돌아갈 수 없습니다.</span>
                    </div>
                    <div className="calendar-grid">
                        {['일','월','화','수','목','금','토'].map(d => (
                            <div key={d} className="cal-day-header">{d}</div>
                        ))}
                        {/* 2026년 7월: 1일 = 수요일, 공백 3칸 */}
                        <div className="cal-day empty" /><div className="cal-day empty" /><div className="cal-day empty" />
                        <div className="cal-day blocked" title="예약 마감">1</div>
                        <div className="cal-day available" onClick={selectDate}>2</div>
                        {[
                            { d: 3, s: '예약 마감' }, { d: 4, s: '예약 마감' },
                            { d: 5, s: '접근 불가' }, { d: 6, s: '접근 불가' }, { d: 7, s: '예약 마감' }, { d: 8, s: '예약 마감' },
                            { d: 9, s: '예약 마감' }, { d: 10, s: '기록 없음' }, { d: 11, s: '예약 마감' }, { d: 12, s: '예약 마감' },
                            { d: 13, s: '예약 마감' }, { d: 14, s: '삭제된 예약' }, { d: 15, s: '접근 불가' }, { d: 16, s: '예약 마감' },
                            { d: 17, s: '예약 마감' }, { d: 18, s: '기록 없음' }, { d: 19, s: '예약 마감' }, { d: 20, s: '삭제된 예약' },
                            { d: 21, s: '예약 마감' }, { d: 22, s: '접근 불가' }, { d: 23, s: '예약 마감' }, { d: 24, s: '예약 마감' },
                            { d: 25, s: '기록 없음' }, { d: 26, s: '예약 마감' }, { d: 27, s: '삭제된 예약' }, { d: 28, s: '접근 불가' },
                            { d: 29, s: '예약 마감' }, { d: 30, s: '예약 마감' }, { d: 31, s: '예약 마감' },
                        ].map(({ d, s }) => (
                            <div key={d} className="cal-day blocked" title={s}>{d}</div>
                        ))}
                        {[0,1,2].map(i => <div key={`e${i}`} className="cal-day empty" />)}
                    </div>
                    <div className="cal-warning">
                        누구도 예약하지 않은 첫 번째 날짜입니다.<br />
                        7월 2일만 선택 가능합니다.
                    </div>
                </div>
            )}

            {/* DOOR TRANSITION */}
            {screen === 'door' && (
                <div style={{ ...styles.screen, background: '#000', gap: 16 }}>
                    <div className="door-text">
                        달력의 날짜들이 흔들린다…<br />
                        <span style={{ color: 'var(--red-bright)' }}>7월 2일</span>만이 붉게 남는다.
                    </div>
                    <div style={styles.doorProgress}>
                        <div className="door-progress-bar" />
                    </div>
                    <div className="door-text" style={{ fontSize: 12, color: '#333' }}>숨겨진 방으로 이동 중…</div>
                </div>
            )}

            {/* STAGE 1 */}
            {screen === 'stage1' && (
                <div style={{ ...styles.screen, ...styles.roomScreen }}>
                    <HUD stage="예약되지 않은 첫 번째 방 — 1단계" locks={[lock1, false, false]} />
                    <div className="room-content" style={styles.roomContent}>
                        <div className="room-left" style={styles.roomLeft}>
                            <div className="stage-label">STAGE 01 / 03 — 출입 기록</div>
                            <div className="stage-question">
                                방 안에 낡은 <span className="kw">출입 기록기</span>가 있다.<br />
                                하루의 시작과 끝을 기억한다.
                            </div>
                            <div style={styles.objectGrid}>
                                <div className="obj-card" onClick={(e) => (e.currentTarget.classList.add('stamped'), setTimeout(() => e.currentTarget.classList.remove('stamped'), 600))}>
                                    <span className="obj-icon">📋</span>
                                    <span className="obj-name">입실 기록지</span>
                                    <div className="obj-hint">흐릿하게 08:50이 보인다…</div>
                                </div>
                                <div className="obj-card" onClick={(e) => (e.currentTarget.classList.add('flip-text'), setTimeout(() => e.currentTarget.classList.remove('flip-text'), 700))}>
                                    <span className="obj-icon">📄</span>
                                    <span className="obj-name">마지막 기록지</span>
                                    <div></div>
                                    <div className="obj-hint" style={{ color: 'var(--red-bright)' }}>붉은 글씨로 17:51이 나타난다…</div>
                                </div>
                                <div className="obj-card" onClick={(e) => { setInput1Visible(true); e.currentTarget.classList.add('interacted'); }}>
                                    <span className="obj-icon">🖥️</span>
                                    <span className="obj-name">출입 기록기</span>
                                    <div className="obj-hint">입력창이 깜빡인다…</div>
                                </div>
                                <div className="obj-card">
                                    <span className="obj-icon">🔒</span>
                                    <span className="obj-name">잠긴 문</span>
                                    <div className="obj-hint">굳게 잠겨 있다.</div>
                                </div>
                            </div>
                            {input1Visible && (
                                <div style={styles.inputPanel}>
                                    <div className="input-label">출입 기록 코드 입력 (숫자만)</div>
                                    <input
                                        className={`input-field${msg1Type === 'error' ? ' error' : msg1Type === 'success' ? ' success' : ''}`}
                                        value={input1}
                                        onChange={e => setInput1(e.target.value)}
                                        maxLength={8}
                                        placeholder="_ _ _ _ _ _ _ _"
                                        inputMode="numeric"
                                        autoFocus
                                    />
                                    <button className="input-btn" onClick={checkAnswer1}>확인</button>
                                    <div className={`input-msg${msg1Type ? ` ${msg1Type}` : ''}`}>{msg1}</div>
                                </div>
                            )}
                        </div>
                        <div className="room-right" style={styles.roomRight}>
                            <div className="choco-card flex flex-col items-center" onClick={() => setChoco1Open(p => !p)}>
                                <div className="choco-role">동행 안내견 · 힌트 도우미</div>
                                <div className="choco-portrait">
                                    <img src="/images/game/choco.png" alt="힌트 도우미 초코" />
                                </div>
                                <div className="choco-name">초코</div>
                                <div className="choco-necklace">목걸이의 붉은 빛이 단서를 가리킨다</div>
                                <div className="choco-prompt">초코를 눌러 힌트 확인</div>
                                {choco1Open && <div className="choco-bubble">처음 찍힌 시간과 마지막으로 남은 시간을 이어봐.</div>}
                            </div>
                            <div className="clue-panel" style={styles.inputPanel}>
                                <div className="input-label">현재 단서</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)' }}>
                                    입실 기록지 → <span style={{ color: 'var(--red-bright)' }}>08:50</span><br />
                                    마지막 기록지 → <span style={{ color: 'var(--red-bright)' }}>17:51</span><br />
                                    <span style={{ color: 'var(--text-dim)' }}>두 시간을 이어보면?</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STAGE 2 */}
            {screen === 'stage2' && (
                <div style={{ ...styles.screen, ...styles.roomScreen }}>
                    <HUD stage="예약되지 않은 첫 번째 방 — 2단계" locks={[true, lock2, false]} />
                    <div className="room-content" style={styles.roomContent}>
                        <div className="room-left" style={styles.roomLeft}>
                            <div className="stage-label">STAGE 02 / 03 — 비어 있는 시간</div>
                            <div className="stage-question">
                                낡은 <span className="kw">시간표</span>가 붙어 있다.<br />
                                모두가 사라지는 시간이 있다.
                            </div>
                            <div className="timetable">
                                <div className="timetable-header">일일 시간표</div>
                                {[
                                    { time: '08:50', note: '입장', missing: false },
                                    { time: '10:00', note: '기록 있음', missing: false },
                                    { time: '11:00', note: '기록 있음', missing: false },
                                    { time: '12:00', note: '기록 있음', missing: false },
                                ].map(r => (
                                    <div key={r.time} className="timetable-row">
                                        <span className="timetable-time">{r.time}</span>
                                        <span className="timetable-note">{r.note}</span>
                                    </div>
                                ))}
                                <div className={`timetable-row missing${missingRevealed ? ' revealed' : ''}`} onClick={() => {
                                    if (!missingRevealed) setMissingRevealed(true);
                                }} style={{ cursor: 'pointer' }}>
                                    <span className="timetable-time">{missingRevealed ? '13:00' : '□□:□□'}</span>
                                    <span className="timetable-note" style={{ color: missingRevealed ? 'var(--red-bright)' : '' }}>
                    {missingRevealed ? '13:00 ~ 14:00 흔적 (찢겨 있음)' : '기록 없음'}
                  </span>
                                </div>
                                {[
                                    { time: '14:00', note: '기록 재개' },
                                    { time: '17:51', note: '마지막 기록' },
                                ].map(r => (
                                    <div key={r.time} className="timetable-row">
                                        <span className="timetable-time">{r.time}</span>
                                        <span className="timetable-note">{r.note}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={styles.objectGrid}>
                                <div className="obj-card" onClick={(e) => e.currentTarget.classList.add('interacted')}>
                                    <span className="obj-icon">🍱</span>
                                    <span className="obj-name">빈 도시락</span>
                                    <div className="obj-hint">아무도 남아 있지 않다…</div>
                                </div>
                                <div className="obj-card" onClick={(e) => { e.currentTarget.style.transform = 'translateX(8px)'; setTimeout(() => { (e.currentTarget as HTMLElement).style.transform = ''; }, 500); }}>
                                    <span className="obj-icon">🪑</span>
                                    <span className="obj-name">비어 있는 의자</span>
                                    <div className="obj-hint">자리 비움</div>
                                </div>
                            </div>
                            <div style={styles.inputPanel}>
                                <div className="input-label">빈 시간대는?</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {['오전 회의', '점심시간', '퇴실시간', '예약 마감시간'].map(c => (
                                        <button
                                            key={c}
                                            className="choice-btn"
                                            disabled={choicesDisabled}
                                            onClick={() => checkChoice2(c)}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                                <div className={`input-msg${msg2Type ? ` ${msg2Type}` : ''}`}>{msg2}</div>
                            </div>
                        </div>
                        <div className="room-right" style={styles.roomRight}>
                            <div className="choco-card flex flex-col items-center" onClick={() => setChoco2Open(p => !p)}>
                                <div className="choco-role">동행 안내견 · 힌트 도우미</div>
                                <div className="choco-portrait">
                                    <img src="/images/game/choco.png" alt="힌트 도우미 초코" />
                                </div>
                                <div className="choco-name">초코</div>
                                <div className="choco-necklace">목걸이의 붉은 빛이 단서를 가리킨다</div>
                                <div className="choco-prompt">초코를 눌러 힌트 확인</div>
                                {choco2Open && <div className="choco-bubble">다들 사라지는 시간. 배고픈 시간.</div>}
                            </div>
                            <div className="clue-panel" style={styles.inputPanel}>
                                <div className="input-label">힌트</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)' }}>
                                    12:00 이후 기록이 끊기고<br />
                                    14:00에 재개된다.<br />
                                    <span style={{ color: 'var(--text-dim)' }}>그 사이 한 시간은?</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STAGE 3 */}
            {screen === 'stage3' && (
                <div style={{ ...styles.screen, ...styles.roomScreen }}>
                    <HUD stage="예약되지 않은 첫 번째 방 — 3단계" locks={[true, true, lock3]} />
                    <div className="room-content" style={styles.roomContent}>
                        <div className="room-left" style={styles.roomLeft}>
                            <div className="stage-label">STAGE 03 / 03 — 마지막 달력</div>
                            <div className="stage-question">
                                낡은 <span className="kw">달력</span>이 걸려 있다.<br />
                                끝의 날에 열린다.
                            </div>
                            <div className="old-calendar" onClick={() => { if (cal3State === 0) setCal3State(1); }}>
                                {cal3State === 0 ? (
                                    <div style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                                        클릭하면 날짜가 드러납니다…
                                    </div>
                                ) : (
                                    <>
                                        <div className="old-cal-month">7월</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
                                            {julyCalendar().map((cell, i) => {
                                                if (cell.type === 'header') return <div key={i} style={{ fontSize: 10, color: 'var(--text-dim)', textAlign: 'center', padding: '4px 0' }}>{cell.label}</div>;
                                                if (cell.type === 'blank') return <div key={i} />;
                                                return (
                                                    <div key={i} className={`old-cal-day ${cell.type}`}>
                                                        {cell.label}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div
                                className={`confirm-doc${docStamped ? ' stamped' : ''}`}
                                onClick={() => setDocStamped(true)}
                            >
                                <div className="doc-title">예약 확인서</div>
                                <div>예약자: ██████</div>
                                <div>테마: 예약되지 않은 첫 번째 방</div>
                                <div>마지막 예약일: <span className="doc-hidden" style={{ color: docStamped ? '#8b0000' : undefined }}>07.02</span></div>
                                <div>상태: <span style={{ color: '#8b0000' }}>삭제됨</span></div>
                                {docStamped && <div className="red-stamp">🔴</div>}
                            </div>
                            <div style={styles.inputPanel}>
                                <div className="input-label">마지막 문 — 날짜 코드 입력 (MMDD)</div>
                                <input
                                    className={`input-field${msg3Type === 'error' ? ' error' : msg3Type === 'success' ? ' success' : ''}`}
                                    value={input3}
                                    onChange={e => setInput3(e.target.value)}
                                    maxLength={4}
                                    placeholder="_ _ _ _"
                                    inputMode="numeric"
                                />
                                <button className="input-btn" onClick={checkAnswer3}>확인</button>
                                <div className={`input-msg${msg3Type ? ` ${msg3Type}` : ''}`}>{msg3}</div>
                            </div>
                        </div>
                        <div className="room-right" style={styles.roomRight}>
                            <div className="choco-card flex flex-col items-center" onClick={() => setChoco3Open(p => !p)}>
                                <div className="choco-role">동행 안내견 · 힌트 도우미</div>
                                <div className="choco-portrait">
                                    <img src="/images/game/choco.png" alt="힌트 도우미 초코" />
                                </div>
                                <div className="choco-name">초코</div>
                                <div className="choco-necklace">목걸이의 붉은 빛이 단서를 가리킨다</div>
                                <div className="choco-prompt">초코를 눌러 힌트 확인</div>
                                {choco3Open && <div className="choco-bubble">처음이 있으면 끝도 있어.</div>}
                            </div>
                            <div className="clue-panel" style={styles.inputPanel}>
                                <div className="input-label">힌트</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)' }}>
                                    달력을 클릭하면<br />날짜가 하나씩 지워진다.<br />
                                    <span style={{ color: 'var(--text-dim)' }}>마지막에 남는 날짜는?</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ENDING */}
            {screen === 'ending' && (
                <div className="ending-screen" style={{ ...styles.screen, gap: 24, padding: '40px 20px', textAlign: 'center' }}>
                    <div className="ending-kicker">CASE CLOSED · 03 / 03</div>
                    <div className="ending-title">탈출 성공</div>
                    <div style={styles.endingSub}>
                        당신은 <span style={{ color: 'var(--red-bright)' }}>예약되지 않은 첫 번째 방</span>에서 살아남았습니다.<br />
                        남은 시간: <span className="ending-time">{formatTime(clearTime)}</span><br />
                        하지만 문 밖에는 또 다른 공포 테마들이 기다리고 있습니다.
                    </div>
                    {achievementNotice && (
                        <div
                            style={{
                                maxWidth: 460,
                                border: `1px solid ${
                                    achievementNoticeTone === 'success'
                                        ? '#cc3b45'
                                        : achievementNoticeTone === 'warning'
                                          ? '#d7b46a'
                                          : '#e63946'
                                }`,
                                borderRadius: 6,
                                padding: '10px 14px',
                                color:
                                    achievementNoticeTone === 'success'
                                        ? '#ff9ca2'
                                        : achievementNoticeTone === 'warning'
                                          ? '#f0c674'
                                          : '#ff7777',
                                background:
                                    achievementNoticeTone === 'success'
                                        ? 'rgba(49,15,18,0.88)'
                                        : 'rgba(12,12,12,0.88)',
                                fontSize: 13,
                                fontWeight: 700,
                            }}
                        >
                            {achievementNotice}
                            {achievementNoticeTone === 'warning' && (
                                <button
                                    type="button"
                                    onClick={() => router.push('/login?redirect=%2Fminigame')}
                                    style={{
                                        marginLeft: 10,
                                        border: 0,
                                        background: 'transparent',
                                        color: '#fff',
                                        fontWeight: 800,
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                >
                                    로그인
                                </button>
                            )}
                        </div>
                    )}
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button className="ending-btn primary" onClick={() => router.push('/themes')}>추천 테마 보러가기</button>
                        <button className="ending-btn secondary" onClick={() => router.push('/')}>메인 페이지로 이동하기</button>
                    </div>
                </div>

            )}
        </>
    );
}

// ─── INLINE STYLES ───
const styles: Record<string, React.CSSProperties> = {
    screen: {
        position: 'fixed', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-deep)',
        overflowY: 'auto',
    },
    overlay: {
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#000',
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
    },
    bannerScreen: { gap: 32, padding: '40px 20px' },
    bannerSub: { fontSize: 13, color: 'var(--text-muted)', marginTop: 8, letterSpacing: '0.1em' },
    bannerThemes: { display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900 },
    themeCardImg: { width: '100%', height: 160, background: 'linear-gradient(135deg,#1a1c22,#0d0e11)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 },
    themeCardName: { fontSize: 13, fontWeight: 700, color: '#e0e0e0' },
    themeCardInfo: { fontSize: 11, color: 'var(--text-muted)', marginTop: 4 },
    calSubtitle: { fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 400, lineHeight: 1.7 },
    doorProgress: { width: 200, height: 2, background: 'var(--border)', borderRadius: 1, overflow: 'hidden' },
    roomScreen: { padding: 0, justifyContent: 'flex-start' },
    hud: { width: '100%', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border)', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 },
    hudTitle: { fontFamily: 'var(--font-mono)', fontSize: 13, color: '#9a9a9a', letterSpacing: '0.1em' },
    hudTimer: { fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--red-bright)' },
    urgent: { animation: 'timer-urgent 0.5s infinite' },
    hudLocks: { display: 'flex', gap: 8 },
    lockPip: { width: 28, height: 28, borderRadius: '50%', border: '2px solid #9a9a9a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#9a9a9a', background: 'var(--bg-card)', transition: 'all 0.4s' },
    lockUnlocked: { borderColor: 'var(--red-bright)', color: 'var(--red-bright)', boxShadow: '0 0 10px var(--red-glow)' },
    roomContent: { flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '34px 28px 48px', gap: 28, overflowY: 'auto', width: '100%' },
    roomLeft: { flex: 1, maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 20 },
    roomRight: { width: 310, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 },
    objectGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 },
    inputPanel: { background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 },
    endingSub: { fontSize: 16, color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.9 },
};

// ─── CSS ───
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-deep: #080808; --bg-dark: #0d0d0d; --bg-card: #121212; --bg-panel: #171414;
    --red-main: #cc2222; --red-bright: #ef414d; --red-glow: rgba(204,34,34,0.34);
    --success-muted: #75b98e;
    --text-main: #e4e4e4; --text-muted: #8d8888; --text-dim: #575252;
    --border: rgba(255,255,255,0.09); --border-red: rgba(204,34,34,0.5);
    --font-mono: 'Share Tech Mono', monospace; --font-sans: 'Noto Sans KR', sans-serif;
  }

  html, body { width:100%; height:100%; background:var(--bg-deep); color:var(--text-main); font-family:var(--font-sans); overflow:hidden; }

  body::before {
    content:''; position:fixed; inset:0; z-index:9998;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events:none; opacity:0.35;
  }
  body::after {
    content:''; position:fixed; inset:0; z-index:9997;
    background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.75)100%);
    pointer-events:none;
  }

  @keyframes flicker { 0%,100%{opacity:1} 93%{opacity:0.4} 94%{opacity:1} 97%{opacity:0.7} }
  @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse-red { 0%,100%{box-shadow:0 0 8px var(--red-glow)} 50%{box-shadow:0 0 20px var(--red-glow),0 0 40px rgba(204,17,17,0.2)} }
  @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-4px)} 40%{transform:translateX(4px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }
  @keyframes success-glow { 0%,100%{text-shadow:0 0 12px rgba(204,34,34,0.22)} 50%{text-shadow:0 0 24px rgba(204,34,34,0.42)} }
  @keyframes timer-urgent { 0%,100%{color:var(--red-bright);text-shadow:0 0 8px var(--red-glow)} 50%{color:#FF6B6B;text-shadow:0 0 16px rgba(255,107,107,0.6)} }
  @keyframes stamp { 0%{transform:scale(1.5)rotate(-5deg);opacity:0} 60%{transform:scale(0.95)rotate(2deg);opacity:1} 100%{transform:scale(1)rotate(0);opacity:1} }
  @keyframes door-anim { from{transform:perspective(600px)rotateY(0)} to{transform:perspective(600px)rotateY(-80deg)} }
  @keyframes door-bar { from{width:0%} to{width:100%} }

  .opening-text { font-family:var(--font-mono); font-size:clamp(14px,2vw,18px); color:#aaa; line-height:2; max-width:640px; animation:flicker 6s infinite; text-align:center; }
  .line { display:block; opacity:0; animation:fadeInUp 0.6s ease forwards; }
  .line.red { color:var(--red-bright); font-weight:700; }
  .line.dim { color:#555; }
  .line.italic { color:#888; font-style:italic; }
  .skip-btn { position:fixed; bottom:32px; right:32px; font-family:var(--font-mono); font-size:12px; color:var(--text-dim); cursor:pointer; border:1px solid var(--text-dim); padding:6px 14px; border-radius:2px; background:transparent; transition:all 0.2s; opacity:0; animation:fadeInUp 0.5s 1s ease forwards; }
  .skip-btn:hover { color:var(--text-main); border-color:var(--text-muted); }

  .logo { font-family:var(--font-mono); font-size:clamp(28px,5vw,48px); font-weight:900; letter-spacing:0.15em; color:#fff; text-shadow:0 0 30px rgba(204,17,17,0.3); }
  .logo span { color:var(--red-main); }

  .theme-card { width:200px; height:280px; background:var(--bg-card); border:1px solid var(--border); border-radius:4px; overflow:hidden; cursor:pointer; transition:transform 0.3s,border-color 0.3s; }
  .theme-card:hover { transform:translateY(-4px); border-color:var(--text-dim); }
  .theme-btn { display:block; margin-top:10px; background:var(--red-main); color:#fff; border:none; border-radius:2px; padding:7px 0; width:100%; font-size:12px; cursor:pointer; transition:background 0.2s; }
  .theme-btn:hover { background:var(--red-bright); }

  .door-wrapper { position:relative; width:200px; height:280px; perspective:600px; }
  .door-closed { width:200px; height:280px; background:var(--bg-card); border:1px solid var(--border); border-radius:4px; display:flex; align-items:center; justify-content:center; cursor:pointer; position:absolute; top:0; left:0; transform-origin:left center; transition:transform 0.8s ease; z-index:2; filter:grayscale(1)brightness(0.4); transition:filter 0.3s; }
  .door-wrapper:hover .door-closed { animation:door-anim 0.8s ease forwards; filter:grayscale(0)brightness(1); }
  .door-wrapper:hover .hidden-card { opacity:1; }
  .hidden-card { width:200px; height:280px; background:#0a0204; border:1px solid var(--border-red); border-radius:4px; position:absolute; top:0; left:0; opacity:0; transition:opacity 0.4s 0.3s; overflow:hidden; cursor:pointer; }
  .hidden-name { font-size:13px; font-weight:700; color:var(--red-bright); animation:flicker 4s infinite; }
  .hidden-btn { display:block; margin-top:10px; background:transparent; color:var(--red-bright); border:1px solid var(--border-red); border-radius:2px; padding:7px 0; width:100%; font-size:12px; cursor:pointer; transition:all 0.2s; }
  .hidden-btn:hover { background:rgba(204,17,17,0.15); }

  .calendar-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; max-width:420px; width:100%; }
  .cal-day-header { text-align:center; font-size:11px; color:var(--text-dim); padding:4px 0; font-family:var(--font-mono); }
  .cal-day { aspect-ratio:1; display:flex; align-items:center; justify-content:center; border-radius:3px; font-size:13px; cursor:default; transition:all 0.2s; }
  .cal-day.blocked { background:var(--bg-card); color:var(--text-dim); border:1px solid var(--border); }
  .cal-day.available { background:rgba(204,17,17,0.1); color:var(--red-bright); border:1px solid var(--border-red); cursor:pointer; animation:pulse-red 2s infinite; font-weight:700; }
  .cal-day.available:hover { background:rgba(204,17,17,0.25); transform:scale(1.08); }
  .cal-day.empty { background:transparent; border:none; }
  .cal-day.selected { background:var(--red-main); color:#fff; animation:shake 0.4s ease; }
  .cal-warning { font-size:12px; color:var(--text-muted); text-align:center; max-width:360px; font-family:var(--font-mono); border:1px solid var(--border); padding:12px 20px; border-radius:3px; background:var(--bg-card); }
  .cal-title { font-family:var(--font-mono); font-size:clamp(18px,3vw,26px); color:var(--red-bright); text-align:center; letter-spacing:0.08em; }

  .door-progress-bar { height:100%; background:var(--red-main); width:0%; animation:door-bar 3s linear forwards; animation-delay:0.1s; }
  .door-text { font-family:var(--font-mono); font-size:14px; color:#555; text-align:center; animation:flicker 3s infinite; }

  .room-content { max-width:1180px; margin:0 auto; }
  .room-left { border:1px solid var(--border); border-radius:18px; padding:26px; background:radial-gradient(circle at 8% 0%,rgba(204,34,34,0.1),transparent 31%),linear-gradient(145deg,rgba(22,22,22,0.97),rgba(11,11,11,0.96)); box-shadow:0 26px 70px rgba(0,0,0,0.38); }
  .stage-label { font-family:var(--font-mono); font-size:12px; color:#b76b70; letter-spacing:0.17em; text-transform:uppercase; }
  .stage-question { font-size:clamp(20px,2.6vw,28px); color:#f0eded; line-height:1.55; font-weight:800; letter-spacing:-0.025em; }
  .kw { color:var(--red-bright); font-weight:700; }

  .obj-card { background:linear-gradient(150deg,rgba(25,25,25,0.96),rgba(13,13,13,0.96)); border:1px solid var(--border); border-radius:12px; padding:18px; cursor:pointer; position:relative; transition:all 0.22s; min-height:124px; display:flex; flex-direction:column; gap:8px; box-shadow:inset 0 1px 0 rgba(255,255,255,0.025); }
  .obj-card:hover { border-color:rgba(204,34,34,0.46); background:linear-gradient(150deg,rgba(36,19,20,0.95),rgba(15,15,15,0.98)); transform:translateY(-2px); }
  .obj-icon { font-size:32px; }
  .obj-name { font-size:13px; color:#d0caca; font-family:var(--font-mono); font-weight:700; }
  .obj-hint { font-size:12px; color:#8b8585; opacity:0; transition:opacity 0.2s; line-height:1.55; }
  .obj-card:hover .obj-hint { opacity:1; }
  .obj-card.stamped { animation:stamp 0.5s ease; }
  .obj-card.flip-text { animation:flicker 0.5s ease; }
  .obj-card.interacted { border-color:var(--border-red); }

  .input-label { font-size:13px; color:#b4aaaa; font-family:var(--font-mono); font-weight:700; letter-spacing:0.04em; }
  .input-field { background:#090909; border:1px solid var(--border); border-radius:9px; padding:13px 15px; color:var(--text-main); font-family:var(--font-mono); font-size:17px; letter-spacing:0.15em; width:100%; outline:none; transition:border-color 0.2s; caret-color:var(--red-main); }
  .input-field:focus { border-color:var(--red-main); box-shadow:0 0 0 2px var(--red-glow); }
  .input-field.error { border-color:var(--red-bright); animation:shake 0.4s ease; }
  .input-field.success { border-color:#6eaa83; color:#91c7a4; }
  .input-btn { background:var(--red-main); color:#fff; border:1px solid rgba(255,255,255,0.04); border-radius:9px; padding:12px; font-family:var(--font-sans); font-size:14px; font-weight:800; cursor:pointer; transition:all 0.2s; width:100%; box-shadow:0 12px 28px rgba(204,34,34,0.14); }
  .input-btn:hover { background:var(--red-bright); }
  .input-msg { font-size:12px; font-family:var(--font-mono); text-align:center; min-height:18px; }
  .input-msg.error { color:var(--red-bright); }
  .input-msg.success { color:#91c7a4; }

  .choice-btn { background:linear-gradient(145deg,#171717,#101010); border:1px solid var(--border); border-radius:10px; padding:14px 16px; color:var(--text-main); font-family:var(--font-sans); font-size:14px; font-weight:700; cursor:pointer; text-align:left; transition:all 0.2s; }
  .choice-btn:hover:not(:disabled) { border-color:rgba(204,34,34,0.55); background:#211314; color:#fff; transform:translateX(3px); }
  .choice-btn:disabled { opacity:0.5; cursor:default; }

  .timetable { background:#101010; border:1px solid var(--border); border-radius:12px; overflow:hidden; box-shadow:0 18px 40px rgba(0,0,0,0.24); }
  .timetable-header { background:#1d1515; padding:13px 17px; font-size:13px; color:#c6baba; font-family:var(--font-mono); border-bottom:1px solid var(--border); }
  .timetable-row { display:flex; align-items:center; padding:11px 17px; gap:14px; border-bottom:1px solid var(--border); font-size:14px; transition:background 0.2s; }
  .timetable-row:last-child { border-bottom:none; }
  .timetable-row:hover { background:var(--bg-panel); }
  .timetable-time { font-family:var(--font-mono); color:var(--text-muted); width:60px; flex-shrink:0; }
  .timetable-note { color:var(--text-main); }
  .timetable-row.missing .timetable-time { color:var(--red-bright); }
  .timetable-row.missing.revealed .timetable-note { animation:fadeInUp 0.3s ease; }

  .choco-card { width:100%; background:radial-gradient(circle at 50% 20%,rgba(204,34,34,0.17),transparent 42%),linear-gradient(155deg,#191313,#0d0d0d 68%); border:1px solid rgba(204,34,34,0.34); border-radius:16px; padding:16px; text-align:center; cursor:pointer; position:relative; transition:all 0.24s; box-shadow:0 22px 54px rgba(0,0,0,0.34),inset 0 1px 0 rgba(255,255,255,0.035); overflow:hidden; }
  .choco-card:hover { border-color:rgba(239,65,77,0.7); transform:translateY(-2px); box-shadow:0 24px 58px rgba(0,0,0,0.4),0 0 26px rgba(204,34,34,0.09); }
  .choco-role { align-self:flex-start; border:1px solid rgba(204,34,34,0.35); border-radius:999px; background:rgba(204,34,34,0.09); padding:4px 8px; color:#d88d92; font-size:10px; font-weight:900; letter-spacing:0.06em; }
  .choco-portrait { width:112px; height:112px; margin-top:14px; border-radius:50%; overflow:hidden; border:1px solid rgba(255,255,255,0.12); background:#090909; box-shadow:0 0 0 7px rgba(204,34,34,0.07),0 14px 28px rgba(0,0,0,0.4); }
  .choco-portrait img { width:100%; height:100%; object-fit:cover; }
  .choco-name { font-size:20px; font-weight:900; color:#f4eeee; margin-top:12px; }
  .choco-necklace { font-size:11px; color:#bd777d; margin-top:3px; line-height:1.5; }
  .choco-prompt { margin-top:11px; color:#777; font-family:var(--font-mono); font-size:10px; }
  .choco-bubble { width:100%; background:#1d1213; border:1px solid rgba(204,34,34,0.36); border-radius:10px; padding:12px 13px; font-size:13px; color:#dfb2b5; margin-top:12px; line-height:1.65; animation:fadeInUp 0.3s ease; box-shadow:inset 0 0 18px rgba(204,34,34,0.05); }
  .clue-panel { background:linear-gradient(145deg,#151313,#0c0c0c)!important; }

  .old-calendar { background:linear-gradient(145deg,#171717,#0e0e0e); border:1px solid var(--border); border-radius:12px; padding:18px; text-align:center; cursor:pointer; box-shadow:0 18px 38px rgba(0,0,0,0.25); }
  .old-cal-month { font-family:var(--font-mono); font-size:14px; color:var(--text-muted); margin-bottom:12px; }
  .old-cal-day { aspect-ratio:1; display:flex; align-items:center; justify-content:center; font-size:12px; border-radius:2px; color:var(--text-dim); background:var(--bg-panel); }
  .old-cal-day.crossed { text-decoration:line-through; opacity:0.3; }
  .old-cal-day.highlight { color:var(--red-bright); background:rgba(204,17,17,0.15); border:1px solid var(--border-red); font-weight:700; }

  .confirm-doc { background-color:#e9dfc9; background-image:linear-gradient(rgba(95,63,25,0.035) 1px,transparent 1px),radial-gradient(circle at 12% 18%,rgba(102,62,21,0.1),transparent 28%),radial-gradient(circle at 88% 80%,rgba(85,45,14,0.08),transparent 24%); background-size:100% 23px,100% 100%,100% 100%; border:1px solid #aa9470; border-radius:5px; padding:21px 22px; color:#342716; font-size:13px; line-height:1.85; position:relative; cursor:pointer; box-shadow:0 18px 38px rgba(0,0,0,0.38),inset 0 0 30px rgba(80,45,15,0.08); transform:rotate(-0.35deg); }
  .confirm-doc::before { content:''; position:absolute; inset:5px; border:1px solid rgba(91,62,30,0.2); pointer-events:none; }
  .doc-title { font-weight:900; font-size:15px; letter-spacing:0.1em; margin-bottom:10px; border-bottom:1px dashed #9f8865; padding-bottom:8px; }
  .doc-hidden { color:#f5f0e8; transition:color 0.3s; }
  .confirm-doc:hover .doc-hidden { color:#8b0000; }
  .red-stamp { position:absolute; bottom:12px; right:12px; font-size:32px; animation:stamp 0.5s ease forwards; }

  .ending-screen { background:radial-gradient(circle at 50% 22%,rgba(204,34,34,0.22),transparent 34%),linear-gradient(180deg,#080808,#0d0909 62%,#080808)!important; }
  .ending-kicker { font-family:var(--font-mono); color:#9a686c; font-size:11px; font-weight:900; letter-spacing:0.24em; }
  .ending-title { font-family:var(--font-sans); font-size:clamp(38px,6vw,68px); font-weight:900; letter-spacing:-0.04em; color:#f4eeee; animation:success-glow 2.4s infinite; }
  .ending-time { color:#e0656d; font-family:var(--font-mono); font-size:1.1em; font-weight:900; }
  .ending-btn { padding:13px 28px; border-radius:10px; font-family:var(--font-sans); font-size:14px; font-weight:800; cursor:pointer; transition:all 0.2s; }
  .ending-btn.primary { background:var(--red-main); color:#fff; border:none; }
  .ending-btn.primary:hover { background:var(--red-bright); }
  .ending-btn.secondary { background:transparent; color:var(--text-muted); border:1px solid var(--border); }
  .ending-btn.secondary:hover { border-color:var(--text-main); color:var(--text-main); }

  @media (max-width:640px) {
    .room-content { flex-direction:column; padding:20px 14px 36px!important; }
    .room-left { width:100%; padding:20px; }
    .room-right { width:100%!important; }
    .choco-card { max-width:none; }
    .stage-question { font-size:20px; }
  }
`;
