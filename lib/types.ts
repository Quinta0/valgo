export type AlgorithmKey =
    | "bubble"
    | "insertion"
    | "heap"
    | "quick"
    | "merge"
    | "radix"
    | "counting"
    | "bucket"
    | "shell";

export type LanguageCode = "en" | "fr" | "it" | "de" | "es" | "ja" | "no" | "sv" | "ua" | "ru";

// The kind of thing happening at a single frame of the algorithm.
// Kept small & generic on purpose: every algorithm's story can be told
// as a sequence of these primitive "moves", which is what lets us
// narrate, color, and scrub through any of the nine algorithms with
// one shared player.
export type ActionType =
    | "init"
    | "compare"
    | "swap"
    | "overwrite"
    | "select-pivot"
    | "partition-range"
    | "pivot-placed"
    | "merge-range"
    | "merge-write"
    | "mark-sorted"
    | "gap-set"
    | "bucket-place"
    | "bucket-sorted"
    | "count"
    | "shift"
    | "done";

export interface Step {
    array: number[];
    action: ActionType;
    // indices the action is centered on (e.g. the two being compared/swapped)
    indices: number[];
    // indices that are permanently in their final sorted position, cumulative
    sorted: number[];
    // an auxiliary highlighted range, e.g. the [low, high] partition window
    range?: [number, number];
    // free-form extra data used for narration (pivot value, gap size, bucket index...)
    meta?: Record<string, number>;
    comparisons: number;
    writes: number;
}

export interface AlgorithmDescription {
    title: string;
    timeComplexity: string;
    spaceComplexity: string;
    description: string;
    // a rough big-O class used to plot the growth-curve visual, shared across languages
}

export type ComplexityClass = "n2" | "nlogn" | "n+k" | "n2-adaptive";
