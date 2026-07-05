"use client";

import { Play, Pause, Shuffle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export type Speed = "slow" | "normal" | "fast" | "turbo";

interface PlaybackControlsProps {
    isPlaying: boolean;
    onTogglePlay: () => void;
    onShuffle: () => void;
    onReset: () => void;
    arraySize: number;
    onArraySizeChange: (n: number) => void;
    speed: Speed;
    onSpeedChange: (s: Speed) => void;
    stepIndex: number;
    stepCount: number;
    onScrub: (i: number) => void;
    labels: {
        play: string; pause: string; shuffle: string; reset: string;
        arraySize: string; elements: string; speed: string;
        speedSlow: string; speedNormal: string; speedFast: string; speedTurbo: string;
    };
    disabled?: boolean;
}

const SPEEDS: Speed[] = ["slow", "normal", "fast", "turbo"];

export default function PlaybackControls({
    isPlaying, onTogglePlay, onShuffle, onReset,
    arraySize, onArraySizeChange, speed, onSpeedChange,
    stepIndex, stepCount, onScrub, labels, disabled,
}: PlaybackControlsProps) {
    const speedLabel: Record<Speed, string> = {
        slow: labels.speedSlow, normal: labels.speedNormal, fast: labels.speedFast, turbo: labels.speedTurbo,
    };

    return (
        <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
                <Button onClick={onTogglePlay} size="lg" className="gap-2 min-w-[112px]">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? labels.pause : labels.play}
                </Button>
                <Button onClick={onShuffle} variant="secondary" className="gap-2">
                    <Shuffle className="h-4 w-4" />
                    {labels.shuffle}
                </Button>
                <Button onClick={onReset} variant="outline" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    {labels.reset}
                </Button>

                <div className="ml-auto flex items-center rounded-lg border border-border overflow-hidden">
                    {SPEEDS.map((s) => (
                        <button
                            key={s}
                            onClick={() => onSpeedChange(s)}
                            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                                speed === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                            }`}
                        >
                            {speedLabel[s]}
                        </button>
                    ))}
                </div>
            </div>

            {stepCount > 0 && (
                <div>
                    <input
                        type="range"
                        min={0}
                        max={stepCount}
                        value={stepIndex}
                        onChange={(e) => onScrub(Number(e.target.value))}
                        className="w-full accent-primary h-1.5 cursor-pointer"
                    />
                </div>
            )}

            <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>{labels.arraySize}</span>
                    <span className="font-mono">{arraySize} {labels.elements}</span>
                </div>
                <Slider
                    value={[arraySize]}
                    onValueChange={(v) => onArraySizeChange(v[0])}
                    min={5}
                    max={100}
                    step={1}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}
