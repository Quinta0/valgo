"use client";

import { motion } from "framer-motion";
import { complexityCurves, curvePoints } from "@/lib/complexity";
import { ComplexityClass } from "@/lib/types";

interface GrowthChartProps {
    active: ComplexityClass;
    n: number;
    maxN: number;
    labels: Record<ComplexityClass, string>;
}

const CURVES: { key: ComplexityClass; color: string }[] = [
    { key: "n+k", color: "hsl(var(--state-sorted))" },
    { key: "nlogn", color: "hsl(var(--primary))" },
    { key: "n2-adaptive", color: "hsl(var(--state-pivot))" },
    { key: "n2", color: "hsl(var(--state-swap))" },
];

const W = 320;
const H = 160;
const PAD = 10;

function toPath(points: { n: number; v: number }[], maxN: number) {
    return points
        .map((p, i) => {
            const x = PAD + (p.n / maxN) * (W - 2 * PAD);
            const y = H - PAD - p.v * (H - 2 * PAD);
            return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(" ");
}

export default function GrowthChart({ active, n, maxN, labels }: GrowthChartProps) {
    return (
        <div className="w-full">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible">
                {/* axes */}
                <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="hsl(var(--border))" strokeWidth={1} />
                <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="hsl(var(--border))" strokeWidth={1} />

                {CURVES.map(({ key, color }) => {
                    const pts = curvePoints(complexityCurves[key], maxN);
                    const isActive = key === active;
                    return (
                        <motion.path
                            key={key}
                            d={toPath(pts, maxN)}
                            fill="none"
                            stroke={color}
                            strokeWidth={isActive ? 2.75 : 1.25}
                            strokeOpacity={isActive ? 1 : 0.28}
                            strokeLinecap="round"
                            initial={false}
                            animate={{ strokeOpacity: isActive ? 1 : 0.28, strokeWidth: isActive ? 2.75 : 1.25 }}
                            transition={{ duration: 0.4 }}
                        />
                    );
                })}

                {/* marker at current n on the active curve */}
                {(() => {
                    const pts = curvePoints(complexityCurves[active], maxN, 200);
                    const closest = pts.reduce((a, b) => (Math.abs(b.n - n) < Math.abs(a.n - n) ? b : a));
                    const x = PAD + (closest.n / maxN) * (W - 2 * PAD);
                    const y = H - PAD - closest.v * (H - 2 * PAD);
                    const color = CURVES.find((c) => c.key === active)?.color ?? "hsl(var(--primary))";
                    return (
                        <motion.circle
                            cx={x}
                            cy={y}
                            r={4}
                            fill={color}
                            animate={{ cx: x, cy: y }}
                            transition={{ duration: 0.4 }}
                        />
                    );
                })()}
            </svg>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-mono">
                {CURVES.map(({ key, color }) => (
                    <div key={key} className="flex items-center gap-1.5" style={{ opacity: key === active ? 1 : 0.45 }}>
                        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                        <span style={{ color: key === active ? color : "hsl(var(--muted-foreground))" }}>{labels[key]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
