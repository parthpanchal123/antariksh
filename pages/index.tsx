import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, Satellite, Search, Sparkles, Terminal, CalendarDays, MousePointer2, Activity } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// A. NAVBAR
// ==========================================
const Navbar = () => {
    return (
        <nav
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 md:px-8 py-4 rounded-full border border-dark/50 bg-[#05050A]/40 backdrop-blur-md w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1200px] shadow-lg shadow-black/20"
        >
            <div className="font-sans font-bold text-xl tracking-tighter text-primary">Antariksh.</div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-primary">
                <Link href="#features" className="hover:-translate-y-[1px] transition-transform hover:text-accent">Features</Link>
                <Link href="#philosophy" className="hover:-translate-y-[1px] transition-transform hover:text-accent">Philosophy</Link>
                <Link href="#protocol" className="hover:-translate-y-[1px] transition-transform hover:text-accent">Protocol</Link>
            </div>
            <Link href="/search" className="magnet-btn bg-accent text-white px-5 py-2.5 text-sm font-bold rounded-full">
                <span className="relative z-10 flex items-center gap-2">Explore <ArrowRight size={14} /></span>
            </Link>
        </nav>
    );
};

// ==========================================
// B. HERO
// ==========================================
const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".hero-el", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.08,
                ease: "power3.out",
                delay: 0.2
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative h-[100dvh] w-full flex items-center bg-background overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop"
                    alt="Deep Space"
                    className="w-full h-full object-cover origin-center animate-[spaceFloat_60s_ease-in-out_infinite]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>

            <style>{`
            @keyframes spaceFloat {
                0% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
                25% { transform: scale(1.05) translate(10px, -15px) rotate(0.5deg); }
                50% { transform: scale(1.1) translate(-10px, 10px) rotate(-0.2deg); }
                75% { transform: scale(1.05) translate(15px, 15px) rotate(0.5deg); }
                100% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
            }
            `}</style>

            <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 md:px-12 flex justify-between items-center gap-12 pointer-events-none">
                <div className="flex flex-col items-start gap-4 w-full lg:w-[55%] xl:w-[60%] pointer-events-auto">
                    <div className="hero-el flex items-center gap-2 px-3 py-1 rounded-full border border-dark bg-background/50 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-primary/70">
                        <Satellite size={12} className="text-accent" />
                        <span>System Online: Orbit Nominal</span>
                    </div>

                    <h1 className="hero-el flex flex-col pt-4">
                        <span className="font-sans font-bold text-5xl md:text-7xl tracking-tight text-primary">Discovery beyond</span>
                        <span className="font-drama italic text-7xl md:text-[140px] leading-none text-accent pb-2">Atmosphere.</span>
                    </h1>

                    <p className="hero-el text-lg md:text-xl text-primary/60 max-w-xl font-sans font-light mt-6">
                        A futuristic visual journey through NASA's deep space data. Experience the universe with absolute cinematic clarity.
                    </p>

                    <div className="hero-el mt-8 flex flex-col gap-6">
                        <Link href="/search" className="magnet-btn bg-accent text-white px-8 py-4 text-button font-bold rounded-full w-max">
                            <span className="relative z-10 font-sans font-semibold text-lg flex items-center gap-2">
                                Start Exploring <ArrowRight size={18} />
                            </span>
                        </Link>

                        {/* Quick Access Sub-menu */}
                        <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-xs font-mono tracking-widest uppercase mt-4">
                            <Link href="/iotd" className="flex items-center gap-2 text-primary/60 hover:text-accent transition-colors group">
                                <Sparkles size={14} className="group-hover:text-accent transition-colors" /> APOD
                            </Link>
                            <span className="text-primary/20">•</span>
                            <Link href="/iss" className="flex items-center gap-2 text-primary/60 hover:text-accent transition-colors group">
                                <Terminal size={14} className="group-hover:text-accent transition-colors" /> ISS Telemetry
                            </Link>
                            <span className="text-primary/20">•</span>
                            <Link href="/search" className="flex items-center gap-2 text-primary/60 hover:text-accent transition-colors group">
                                <Search size={14} className="group-hover:text-accent transition-colors" /> Image DB
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Orbital HUD / Abstract Aesthetic (Desktop Only) */}
                <div className="hidden lg:flex relative w-[320px] xl:w-[400px] h-[320px] xl:h-[400px] hero-el opacity-70 mix-blend-screen items-center justify-center pointer-events-none shrink-0">
                    {/* Outer Dashed Ring */}
                    <div className="absolute w-full h-full rounded-full border border-primary/20 border-dashed animate-[spin_120s_linear_infinite]" />

                    {/* Broken Inner Ring */}
                    <div className="absolute w-[80%] h-[80%] rounded-full border-t border-b border-accent/40 animate-[spin_40s_linear_infinite]" />

                    {/* Reversing Ring */}
                    <div className="absolute w-[60%] h-[60%] rounded-full border border-primary/30 animate-[spin_20s_linear_infinite_reverse]">
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#7B61FF]" />
                        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full -translate-x-1/2 translate-y-1/2" />
                    </div>

                    {/* Core */}
                    <div className="absolute w-[25%] h-[25%] rounded-full bg-accent/5 blur-2xl animate-pulse" />
                    <div className="absolute w-[20%] h-[20%] rounded-full border border-accent/50 flex items-center justify-center animate-[pulse_4s_linear_infinite]">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_10px_#7B61FF]" />
                    </div>

                    {/* Target Lines */}
                    <div className="absolute w-[140%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <div className="absolute h-[140%] w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

                    {/* Data Markers */}
                    <div className="absolute -right-8 top-1/4 font-mono text-[10px] text-primary/60 tracking-widest text-right leading-relaxed">
                        <span className="text-accent font-bold">SYS_TRCK: <span className="animate-pulse">ACTIVE</span></span><br />
                        RA: 05h 35m 17s<br />
                        DEC: -05° 23′ 28″
                    </div>

                    <div className="absolute -left-12 bottom-1/4 font-mono text-[10px] text-primary/40 tracking-widest leading-relaxed text-left">
                        DIST: 1.3K LY<br />
                        VEL: 29.8 km/s
                    </div>
                </div>
            </div>
        </section>
    );
};

// ==========================================
// C. FEATURES
// ==========================================
const DiagnosticShuffler = () => {
    const [cards, setCards] = useState([
        { id: 1, text: "Latest APOD Retrieved", time: "TODAY" },
        { id: 2, text: "High-Res Image Loaded", time: "4K DCI" },
        { id: 3, text: "NASA Story Synthesized", time: "SYNCED" }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newCards = [...prev];
                const last = newCards.pop();
                if (last) newCards.unshift(last);
                return newCards;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Link href="/iotd" className="flex-1 bg-dark/30 border border-dark rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl block hover:-translate-y-2 hover:border-accent/50 transition-all duration-300">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Sparkles className="text-accent" size={18} />
                    </div>
                    <h3 className="font-sans font-bold text-xl">Image of the Day</h3>
                </div>
                <p className="text-primary/60 font-sans text-sm">Daily handpicked image and story from NASA.</p>
            </div>

            <div className="relative h-48 mt-8 flex flex-col items-center justify-center perspective-[1000px]">
                {cards.map((card, i) => {
                    const isTop = i === 0;
                    return (
                        <div
                            key={card.id}
                            className="absolute w-full max-w-[280px] bg-background border border-dark/50 rounded-2xl p-4 flex items-center justify-between"
                            style={{
                                top: `${i * 12 + 20}px`,
                                transform: `scale(${1 - i * 0.05}) translateZ(${-i * 50}px)`,
                                opacity: 1 - i * 0.3,
                                zIndex: 10 - i,
                                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
                            }}
                        >
                            <span className="font-mono text-xs text-primary/80 truncate pr-2">{card.text}</span>
                            <span className="font-mono text-[10px] text-accent font-bold bg-accent/10 px-2 py-1 rounded">{card.time}</span>
                        </div>
                    );
                })}
            </div>
        </Link>
    );
};

const TelemetryTypewriter = () => {
    const [text, setText] = useState("");
    const fullText = "INITIALIZING ISS TELEMETRY...\n> ORBIT: LEO\n> ALTITUDE: 408 KM\n> VELOCITY: 28,000 KM/H\n> STATUS: OPTIMAL\n> CREW: 7 ACTIVE";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, index));
            index++;
            if (index > fullText.length + 20) index = 0; // loop with pause
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <Link href="/iss" className="flex-1 bg-dark/30 border border-dark rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl block hover:-translate-y-2 hover:border-accent/50 transition-all duration-300">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                            <Terminal className="text-accent" size={18} />
                        </div>
                        <h3 className="font-sans font-bold text-xl">ISS Crew Members</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        <span className="font-mono text-[10px] text-accent tracking-widest uppercase">Live Feed</span>
                    </div>
                </div>
                <p className="text-primary/60 font-sans text-sm">See who is currently orbiting Earth in real time.</p>
            </div>

            <div className="bg-[#05050A] rounded-xl border border-dark p-4 mt-8 h-48 overflow-hidden font-mono text-xs text-primary/80 leading-relaxed whitespace-pre-wrap">
                {text}<span className="inline-block w-2.5 h-3.5 bg-accent ml-1 animate-pulse" />
            </div>
        </Link>
    );
};

const CursorScheduler = () => {
    return (
        <Link href="/search" className="flex-1 bg-dark/30 border border-dark rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl overflow-hidden relative group block hover:-translate-y-2 hover:border-accent/50 transition-all duration-300">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Search className="text-accent" size={18} />
                    </div>
                    <h3 className="font-sans font-bold text-xl">Archive Search</h3>
                </div>
                <p className="text-primary/60 font-sans text-sm">Find planets, missions, nebulae, and historical captures.</p>
            </div>

            <div className="mt-8 grid grid-cols-7 gap-1 h-48 relative">
                {["S", "M", "T", "W", "T", "F", "S"].map(d => (
                    <div key={d} className="font-mono text-[10px] text-center text-primary/40 mb-2">{d}</div>
                ))}
                {Array.from({ length: 28 }).map((_, i) => (
                    <div key={i} className={`rounded-md border border-dark/50 flex flex-col items-center justify-center transition-colors ${i === 17 ? 'bg-accent/20 border-accent/50 text-accent' : 'bg-background hover:bg-dark'}`}>
                        <span className="font-mono text-[8px] opacity-50">{i + 1}</span>
                    </div>
                ))}

                {/* Animated Cursor */}
                <div className="absolute w-4 h-4 text-accent top-[100%] left-[-10%] transition-transform duration-[2000ms] animate-[cursorMove_4s_infinite_ease-in-out]">
                    <MousePointer2 fill="currentColor" size={16} />
                </div>

                <style>{`
          @keyframes cursorMove {
            0% { transform: translate(0, 0); opacity: 0; }
            20% { opacity: 1; transform: translate(120px, -60px); }
            45% { transform: translate(120px, -60px) scale(0.9); }
            55% { transform: translate(180px, 40px); }
            80% { opacity: 1; transform: translate(180px, 40px) scale(0.9); }
            100% { opacity: 0; transform: translate(180px, 40px); }
          }
        `}</style>
            </div>
        </Link>
    );
};

// ==========================================
// D. PHILOSOPHY
// ==========================================
const Philosophy = () => {
    const philRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".phil-text", {
                scrollTrigger: {
                    trigger: philRef.current,
                    start: "top 70%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.2,
                ease: "power3.out",
                duration: 1
            });
        }, philRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={philRef} id="philosophy" className="relative w-full py-40 px-6 flex items-center justify-center bg-background overflow-hidden border-y border-dark">
            <div className="absolute inset-0 z-0 opacity-10 blur-xl">
                <img src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2000&auto=format&fit=crop" alt="Texture" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center gap-8">
                <p className="phil-text font-sans font-medium text-lg text-primary/60">
                    Most space interfaces focus on: <span className="text-primary">scattered technical readouts.</span>
                </p>
                <h2 className="phil-text font-sans text-4xl md:text-6xl font-bold leading-tight">
                    We focus on: <br />
                    <span className="font-drama italic text-accent font-normal text-6xl md:text-8xl">immersive data.</span>
                </h2>
            </div>
        </section>
    );
};

// ==========================================
// E. PROTOCOL
// ==========================================
const Protocol = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Need a tiny delay to ensure DOM is ready for ScrollTrigger pinning sometimes
        let timeout = setTimeout(() => {
            let ctx = gsap.context(() => {
                const cards = gsap.utils.toArray('.protocol-card') as HTMLElement[];

                cards.forEach((card: any, i) => {
                    // GSAP only handles the scale/blur effect now, CSS sticky handles the pinning
                    if (i > 0) {
                        gsap.to(cards[i - 1], {
                            scrollTrigger: {
                                trigger: card,
                                start: "top center",
                                end: "top 15%",
                                scrub: true,
                            },
                            scale: 0.9,
                            opacity: 0.5,
                            filter: "blur(10px)",
                        });
                    }
                });
            }, containerRef);
            return () => ctx.revert();
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

    const steps = [
        { title: "Query The Void", desc: "Access the deepest archives of human space exploration seamlessly.", icon: <Search size={40} className="text-accent" /> },
        { title: "Synthesize Telemetry", desc: "Stream live biometrics and orbital positioning direct from the ISS.", icon: <Activity size={40} className="text-accent" /> },
        { title: "Visualize Cosmos", desc: "Experience the universe in uncompressed cinematic fidelity.", icon: <Sparkles size={40} className="text-accent" /> },
    ];

    return (
        <section id="protocol" ref={containerRef} className="relative w-full pt-20 pb-12 border-b border-dark">
            <div className="max-w-4xl mx-auto px-6 mb-12">
                <h2 className="font-sans font-bold text-3xl">System Protocol</h2>
            </div>

            <div className="relative w-full max-w-4xl mx-auto px-6 flex flex-col gap-[40vh] pb-[40vh]">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="protocol-card sticky w-full h-[60vh] bg-[#0A0A14] border border-dark rounded-[3rem] shadow-2xl p-12 flex flex-col justify-center gap-6 overflow-hidden"
                        style={{ top: `${15 + i * 2}%`, zIndex: i }}
                    >
                        {/* Background glowing orb */}
                        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[100px] opacity-50" />

                        <div className="relative z-10 w-fit p-4 rounded-2xl bg-dark/50 border border-dark">
                            {step.icon}
                        </div>

                        <div className="relative z-10 font-mono text-accent text-sm tracking-widest font-bold">STEP_0{i + 1}</div>
                        <h3 className="relative z-10 font-sans font-bold text-4xl">{step.title}</h3>
                        <p className="relative z-10 font-sans text-xl text-primary/60 max-w-md">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// ==========================================
// F. GET STARTED & G. FOOTER
// ==========================================
const GetStarted = () => (
    <section className="py-40 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="font-drama italic text-6xl md:text-8xl mb-8">Ready to launch?</h2>
        <Link href="/search" className="magnet-btn bg-primary text-background px-12 py-5 text-xl">
            <span className="relative z-10 font-sans font-bold flex items-center gap-2">Initiate Sequence <ArrowRight size={20} /></span>
        </Link>
    </section>
);

const Footer = () => (
    <footer className="w-full bg-[#05050A] rounded-t-[4rem] px-12 py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-t border-dark">
        <div className="flex flex-col gap-4">
            <div className="font-sans font-bold text-3xl tracking-tighter">Antariksh.</div>
            <p className="text-primary/40 font-mono text-xs max-w-xs">An interface for deep space exploration, powered by NASA open data.</p>
        </div>

        <div className="flex items-center gap-3 bg-dark/30 border border-dark px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary/70">System Operational</span>
        </div>
    </footer>
);

export default function Home() {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Antariksh | Deep Space Data</title>
            </Head>

            <Navbar />

            <main className="flex flex-col w-full min-h-screen">
                <Hero />

                <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6">
                    <DiagnosticShuffler />
                    <TelemetryTypewriter />
                    <CursorScheduler />
                </section>

                <Philosophy />
                <Protocol />
                <GetStarted />
            </main>

            <Footer />
        </>
    );
}
