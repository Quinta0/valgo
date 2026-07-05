import { AlgorithmKey, ComplexityClass } from "./types";

export const complexityClass: Record<AlgorithmKey, ComplexityClass> = {
    bubble: "n2",
    insertion: "n2",
    heap: "nlogn",
    quick: "nlogn",
    merge: "nlogn",
    radix: "n+k",
    counting: "n+k",
    bucket: "n+k",
    shell: "n2-adaptive",
};

// A tiny sample of points used to draw each growth curve on a shared
// 0..100 axis, normalized to the same visual scale so n^2 vs n log n vs
// n is instantly, viscerally comparable — the whole point of drawing it.
export function curvePoints(fn: (n: number) => number, maxN = 100, steps = 40) {
    const raw = Array.from({ length: steps + 1 }, (_, i) => {
        const n = (i / steps) * maxN;
        return { n, v: fn(Math.max(n, 1)) };
    });
    const maxV = Math.max(...raw.map((p) => p.v));
    return raw.map((p) => ({ n: p.n, v: p.v / maxV }));
}

export const complexityCurves: Record<ComplexityClass, (n: number) => number> = {
    n2: (n) => n * n,
    nlogn: (n) => n * Math.log2(Math.max(n, 2)),
    "n+k": (n) => n,
    "n2-adaptive": (n) => n * Math.log2(Math.max(n, 2)) * 1.3,
};
