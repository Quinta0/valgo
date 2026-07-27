"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlgorithmKey, LanguageCode, Step } from "@/lib/types";
import { runAlgorithm } from "@/lib/algorithms";
import { algorithmDescriptions } from "@/lib/descriptions";
import { complexityClass } from "@/lib/complexity";
import { t, narrate } from "@/lib/i18n";
import Bars from "@/components/Bars";
import GrowthChart from "@/components/GrowthChart";
import Narration from "@/components/Narration";
import StatsPanel from "@/components/StatsPanel";
import PlaybackControls, { Speed } from "@/components/PlaybackControls";
import { AlgorithmPicker } from "@/components/Pickers";
import SiteFooter from "@/components/SiteFooter";
import Panel from "@/components/Panel";

const SPEED_MS: Record<Speed, number> = { slow: 260, normal: 120, fast: 55, turbo: 18 };

function randomArray(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

// Deterministic so the server-rendered array matches the client's first
// render; the real random array is generated client-side after mount.
function seededArray(size: number): number[] {
    return Array.from({ length: size }, (_, i) => ((i * 37) % 100) + 1);
}

function BrandMark(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
            <rect x="2" y="11" width="4" height="7" rx="1" fill="currentColor" opacity="0.5" />
            <rect x="8" y="6" width="4" height="12" rx="1" fill="currentColor" opacity="0.75" />
            <rect x="14" y="2" width="4" height="16" rx="1" fill="currentColor" />
        </svg>
    );
}

export default function Page() {
    const [algorithm, setAlgorithm] = useState<AlgorithmKey>("bubble");
    const [language, setLanguage] = useState<LanguageCode>("en");
    const [arraySize, setArraySize] = useState(24);
    const [baseArray, setBaseArray] = useState<number[]>(() => seededArray(24));
    const [steps, setSteps] = useState<Step[]>([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState<Speed>("normal");

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setBaseArray(randomArray(arraySize));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // (Re)compute the full step-by-step story whenever the algorithm or the
    // underlying data changes. Everything downstream just plays it back.
    useEffect(() => {
        setSteps(runAlgorithm(algorithm, baseArray));
        setStepIndex(0);
        setIsPlaying(false);
    }, [algorithm, baseArray]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (!isPlaying) return;
        if (stepIndex >= steps.length - 1) {
            setIsPlaying(false);
            return;
        }
        timeoutRef.current = setTimeout(() => {
            setStepIndex((i) => Math.min(i + 1, steps.length - 1));
        }, SPEED_MS[speed]);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isPlaying, stepIndex, steps.length, speed]);

    const handleTogglePlay = useCallback(() => {
        if (stepIndex >= steps.length - 1) {
            setStepIndex(0);
        }
        setIsPlaying((p) => !p);
    }, [stepIndex, steps.length]);

    const handleShuffle = useCallback(() => {
        setBaseArray(randomArray(arraySize));
    }, [arraySize]);

    const handleReset = useCallback(() => {
        setBaseArray(randomArray(arraySize));
    }, [arraySize]);

    const handleArraySizeChange = useCallback((n: number) => {
        setArraySize(n);
        setBaseArray(randomArray(n));
    }, []);

    const handleScrub = useCallback((i: number) => {
        setIsPlaying(false);
        setStepIndex(Math.min(i, steps.length - 1));
    }, [steps.length]);

    const currentStep: Step | undefined = steps[stepIndex];
    const description = algorithmDescriptions[algorithm]?.[language] ?? algorithmDescriptions[algorithm]?.en;
    const cclass = complexityClass[algorithm];

    const pivotIndex = useMemo(() => {
        if (!currentStep) return undefined;
        if (currentStep.action === "select-pivot" || currentStep.action === "pivot-placed") return currentStep.indices[0];
        return undefined;
    }, [currentStep]);

    const narration = useMemo(() => {
        if (!currentStep) return "";
        return narrate(currentStep, algorithm, description?.title ?? algorithm, language);
    }, [currentStep, algorithm, description, language]);

    const growthLabels = {
        "n+k": "O(n + k)",
        nlogn: "O(n log n)",
        "n2-adaptive": "O(n log\u00B2 n)",
        n2: "O(n\u00B2)",
    } as const;

    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
                <div className="container mx-auto max-w-6xl px-4 md:px-6 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <BrandMark className="h-5 w-5 shrink-0 text-foreground" />
                        <h1 className="text-base font-semibold tracking-tight truncate">{t(language, "brand")}</h1>
                        <span className="hidden md:inline text-sm text-muted-foreground ml-2 pl-3 border-l border-border truncate">
                            {t(language, "tagline")}
                        </span>
                    </div>
                    <AlgorithmPicker value={algorithm} onChange={setAlgorithm} triggerLabel={t(language, "pickAlgorithm")} />
                </div>
            </header>

            <main className="flex-1">
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border-b border-border bg-card/30"
                >
                    <div className="container mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-10">
                        <Bars
                            values={currentStep?.array ?? baseArray}
                            indices={currentStep?.indices ?? []}
                            action={currentStep?.action}
                            sorted={currentStep?.sorted ?? []}
                            range={currentStep?.range}
                            pivotIndex={pivotIndex}
                            stepDurationMs={SPEED_MS[speed]}
                        />
                    </div>
                </motion.section>

                <div className="container mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Narration text={narration} stepIndex={stepIndex} title={t(language, "narrationTitle")} />
                            <PlaybackControls
                                isPlaying={isPlaying}
                                onTogglePlay={handleTogglePlay}
                                onShuffle={handleShuffle}
                                onReset={handleReset}
                                arraySize={arraySize}
                                onArraySizeChange={handleArraySizeChange}
                                speed={speed}
                                onSpeedChange={setSpeed}
                                stepIndex={stepIndex}
                                stepCount={Math.max(steps.length - 1, 0)}
                                onScrub={handleScrub}
                                labels={{
                                    play: t(language, "play"), pause: t(language, "pause"),
                                    shuffle: t(language, "shuffle"), reset: t(language, "reset"),
                                    arraySize: t(language, "arraySize"), elements: t(language, "elements"),
                                    speed: t(language, "speed"), speedSlow: t(language, "speedSlow"),
                                    speedNormal: t(language, "speedNormal"), speedFast: t(language, "speedFast"),
                                    speedTurbo: t(language, "speedTurbo"),
                                }}
                            />
                        </div>

                        <div className="space-y-6">
                            <StatsPanel
                                title={t(language, "statsTitle")}
                                comparisons={currentStep?.comparisons ?? 0}
                                writes={currentStep?.writes ?? 0}
                                stepLabel={t(language, "step")}
                                stepIndex={stepIndex}
                                stepCount={Math.max(steps.length - 1, 0)}
                                sortedLabel={t(language, "sorted")}
                                sortedCount={currentStep?.sorted.length ?? 0}
                                total={baseArray.length}
                            />

                            {description && (
                                <Panel>
                                    <h2 className="text-xl font-semibold tracking-tight">{description.title}</h2>
                                    <div className="mt-1 space-y-0.5">
                                        <div className="font-mono text-xs text-muted-foreground">{description.timeComplexity}</div>
                                        <div className="font-mono text-xs text-muted-foreground">{description.spaceComplexity}</div>
                                    </div>
                                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{description.description}</p>
                                </Panel>
                            )}

                            <Panel>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{t(language, "growthTitle")}</p>
                                <p className="text-xs text-muted-foreground mb-4">{t(language, "growthCaption")}</p>
                                <GrowthChart active={cclass} n={arraySize} maxN={100} labels={growthLabels} />
                            </Panel>
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter
                year={2024}
                rightsLabel={t(language, "footerRights")}
                licenseLabel={t(language, "license")}
                viewLicenseLabel={t(language, "viewLicense")}
                lang={language}
                onLangChange={setLanguage}
            />
        </div>
    );
}
