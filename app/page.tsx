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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SPEED_MS: Record<Speed, number> = { slow: 260, normal: 120, fast: 55, turbo: 18 };

function randomArray(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

export default function Page() {
    const [algorithm, setAlgorithm] = useState<AlgorithmKey>("bubble");
    const [language, setLanguage] = useState<LanguageCode>("en");
    const [arraySize, setArraySize] = useState(24);
    const [baseArray, setBaseArray] = useState<number[]>(() => randomArray(24));
    const [steps, setSteps] = useState<Step[]>([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState<Speed>("normal");

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
            <header className="border-b border-border bg-card/30 backdrop-blur-sm">
                <div className="container mx-auto px-4 md:px-6 py-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            <span className="text-primary">{t(language, "brand")}</span>
                        </h1>
                        <p className="text-sm text-muted-foreground">{t(language, "tagline")}</p>
                    </div>
                    <AlgorithmPicker value={algorithm} onChange={setAlgorithm} triggerLabel={t(language, "pickAlgorithm")} />
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 md:px-6 py-10 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6"
                >
                    <Bars
                        values={currentStep?.array ?? baseArray}
                        indices={currentStep?.indices ?? []}
                        action={currentStep?.action}
                        sorted={currentStep?.sorted ?? []}
                        range={currentStep?.range}
                        pivotIndex={pivotIndex}
                        stepDurationMs={SPEED_MS[speed]}
                    />
                </motion.div>

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
                            <Card className="bg-card/60 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl">{description.title}</CardTitle>
                                    <CardDescription className="space-y-0.5">
                                        <div className="font-mono text-xs">{description.timeComplexity}</div>
                                        <div className="font-mono text-xs">{description.spaceComplexity}</div>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{description.description}</p>
                                </CardContent>
                            </Card>
                        )}

                        <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{t(language, "growthTitle")}</p>
                            <p className="text-xs text-muted-foreground mb-4">{t(language, "growthCaption")}</p>
                            <GrowthChart active={cclass} n={arraySize} maxN={100} labels={growthLabels} />
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
