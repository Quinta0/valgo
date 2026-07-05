"use client";

import { motion } from "framer-motion";
import { ActionType } from "@/lib/types";

interface BarsProps {
    values: number[];
    indices: number[];
    action: ActionType | undefined;
    sorted: number[];
    range?: [number, number];
    pivotIndex?: number;
    stepDurationMs: number;
    height?: number;
}

const stateColor = {
    idle: "hsl(var(--state-idle))",
    compare: "hsl(var(--state-compare))",
    swap: "hsl(var(--state-swap))",
    sorted: "hsl(var(--state-sorted))",
    pivot: "hsl(var(--state-pivot))",
} as const;

function colorFor(
    i: number,
    indices: number[],
    action: ActionType | undefined,
    sorted: Set<number>,
    range: [number, number] | undefined,
    pivotIndex: number | undefined
): string {
    if (sorted.has(i)) return stateColor.sorted;
    if (pivotIndex === i) return stateColor.pivot;
    if (indices.includes(i)) {
        if (action === "swap" || action === "shift" || action === "merge-write" || action === "overwrite") return stateColor.swap;
        return stateColor.compare;
    }
    if (range && i >= range[0] && i <= range[1]) return "hsl(var(--state-range) / 0.55)";
    return stateColor.idle;
}

export default function Bars({ values, indices, action, sorted, range, pivotIndex, stepDurationMs, height = 320 }: BarsProps) {
    const max = Math.max(...values, 1);
    const sortedSet = new Set(sorted);
    const n = values.length;
    const showLabels = n <= 36;
    const barGapPct = n > 0 ? Math.min(1.2, 40 / n) : 0.6;

    const primary = indices[0];
    const secondary = indices[1];
    const pointerDuration = Math.max(0.08, Math.min(0.35, stepDurationMs / 1000));

    return (
        <div className="relative w-full select-none" style={{ height: height + 40 }}>
            <div
                className="absolute bottom-10 left-0 right-0 flex items-end justify-center gap-[var(--gap)] px-2"
                style={{ height, ["--gap" as any]: `${barGapPct}%` }}
            >
                {values.map((value, i) => {
                    const color = colorFor(i, indices, action, sortedSet, range, pivotIndex);
                    const isFocused = indices.includes(i) || pivotIndex === i;
                    return (
                        <motion.div
                            key={i}
                            className="relative flex-1 rounded-t-[3px] min-w-[2px]"
                            style={{ backgroundColor: color }}
                            animate={{
                                height: `${(value / max) * 100}%`,
                                backgroundColor: color,
                                boxShadow: isFocused ? `0 0 16px ${color}` : "0 0 0 rgba(0,0,0,0)",
                            }}
                            transition={{ duration: Math.max(0.08, Math.min(0.4, stepDurationMs / 1000)), ease: "easeInOut" }}
                        >
                            {showLabels && (
                                <span
                                    className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono tabular-nums"
                                    style={{ color }}
                                >
                                    {value}
                                </span>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* sliding pointers: show where the algorithm's "attention" is right now */}
            <div className="absolute bottom-0 left-0 right-0 h-8 px-2">
                {n > 0 && primary !== undefined && (
                    <motion.div
                        className="absolute bottom-0 flex flex-col items-center"
                        style={{ width: `${100 / n}%` }}
                        animate={{ left: `${(primary / n) * 100}%` }}
                        transition={{ duration: pointerDuration, ease: "easeInOut" }}
                    >
                        <div
                            className="h-0 w-0 border-x-[6px] border-x-transparent border-b-[8px]"
                            style={{ borderBottomColor: action === "swap" ? stateColor.swap : stateColor.compare }}
                        />
                    </motion.div>
                )}
                {n > 0 && secondary !== undefined && secondary !== primary && (
                    <motion.div
                        className="absolute bottom-0 flex flex-col items-center"
                        style={{ width: `${100 / n}%` }}
                        animate={{ left: `${(secondary / n) * 100}%` }}
                        transition={{ duration: pointerDuration, ease: "easeInOut" }}
                    >
                        <div
                            className="h-0 w-0 border-x-[6px] border-x-transparent border-b-[8px]"
                            style={{ borderBottomColor: action === "swap" ? stateColor.swap : stateColor.compare }}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
