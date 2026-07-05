import { ActionType, AlgorithmKey, Step } from "./types";

// Every algorithm below is a *recorder*: it runs the real algorithm once,
// synchronously, and pushes a Step for every meaningful move. The UI then
// plays that list back at whatever speed the person chooses, and can
// scrub, pause, or step through it frame by frame. This is what lets a
// 100-element quicksort be paused mid-partition without re-running anything.

class Recorder {
    private steps: Step[] = [];
    private sortedSet = new Set<number>();
    comparisons = 0;
    writes = 0;

    push(array: number[], action: ActionType, indices: number[], opts?: { range?: [number, number]; meta?: Record<string, number> }) {
        this.steps.push({
            array: [...array],
            action,
            indices,
            sorted: Array.from(this.sortedSet).sort((a, b) => a - b),
            range: opts?.range,
            meta: opts?.meta,
            comparisons: this.comparisons,
            writes: this.writes,
        });
    }

    compare(array: number[], i: number, j: number) {
        this.comparisons++;
        this.push(array, "compare", [i, j]);
    }

    swap(array: number[], i: number, j: number) {
        [array[i], array[j]] = [array[j], array[i]];
        this.writes += 2;
        this.push(array, "swap", [i, j]);
    }

    overwrite(array: number[], i: number, value: number) {
        array[i] = value;
        this.writes++;
        this.push(array, "overwrite", [i]);
    }

    markSorted(array: number[], indices: number[]) {
        indices.forEach((i) => this.sortedSet.add(i));
        this.push(array, "mark-sorted", indices);
    }

    isSorted(i: number) {
        return this.sortedSet.has(i);
    }

    finish(array: number[]) {
        for (let i = 0; i < array.length; i++) this.sortedSet.add(i);
        this.push(array, "done", []);
    }

    result() {
        return this.steps;
    }
}

function bubbleSort(input: number[]): Step[] {
    const rec = new Recorder();
    const a = [...input];
    rec.push(a, "init", []);
    const n = a.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            rec.compare(a, j, j + 1);
            if (a[j] > a[j + 1]) {
                rec.swap(a, j, j + 1);
                swapped = true;
            }
        }
        rec.markSorted(a, [n - i - 1]);
        if (!swapped) break;
    }
    rec.finish(a);
    return rec.result();
}

function insertionSort(input: number[]): Step[] {
    const rec = new Recorder();
    const a = [...input];
    rec.push(a, "init", []);
    rec.markSorted(a, [0]);
    for (let i = 1; i < a.length; i++) {
        const key = a[i];
        let j = i - 1;
        while (j >= 0) {
            rec.compare(a, j, j + 1);
            if (a[j] <= key) break;
            a[j + 1] = a[j];
            rec.writes++;
            rec.push(a, "shift", [j, j + 1]);
            j--;
        }
        a[j + 1] = key;
        rec.writes++;
        rec.push(a, "overwrite", [j + 1]);
        rec.markSorted(a, [i]);
    }
    rec.finish(a);
    return rec.result();
}

function heapSort(input: number[]): Step[] {
    const rec = new Recorder();
    const a = [...input];
    rec.push(a, "init", []);
    const n = a.length;

    function heapify(size: number, root: number) {
        let largest = root;
        const left = 2 * root + 1;
        const right = 2 * root + 2;
        if (left < size) {
            rec.compare(a, left, largest);
            if (a[left] > a[largest]) largest = left;
        }
        if (right < size) {
            rec.compare(a, right, largest);
            if (a[right] > a[largest]) largest = right;
        }
        if (largest !== root) {
            rec.swap(a, root, largest);
            heapify(size, largest);
        }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
    for (let i = n - 1; i > 0; i--) {
        rec.swap(a, 0, i);
        rec.markSorted(a, [i]);
        heapify(i, 0);
    }
    rec.markSorted(a, [0]);
    rec.finish(a);
    return rec.result();
}

function quickSort(input: number[]): Step[] {
    const rec = new Recorder();
    const a = [...input];
    rec.push(a, "init", []);

    function partition(low: number, high: number) {
        const pivot = a[high];
        rec.push(a, "select-pivot", [high], { range: [low, high], meta: { pivot } });
        let i = low - 1;
        for (let j = low; j < high; j++) {
            rec.compare(a, j, high);
            if (a[j] < pivot) {
                i++;
                if (i !== j) rec.swap(a, i, j);
            }
        }
        rec.swap(a, i + 1, high);
        rec.markSorted(a, [i + 1]);
        rec.push(a, "pivot-placed", [i + 1]);
        return i + 1;
    }

    function sort(low: number, high: number) {
        if (low < high) {
            rec.push(a, "partition-range", [], { range: [low, high] });
            const pi = partition(low, high);
            sort(low, pi - 1);
            sort(pi + 1, high);
        } else if (low === high) {
            rec.markSorted(a, [low]);
        }
    }

    sort(0, a.length - 1);
    rec.finish(a);
    return rec.result();
}

function mergeSort(input: number[]): Step[] {
    const rec = new Recorder();
    const a = [...input];
    rec.push(a, "init", []);

    function merge(left: number, mid: number, right: number) {
        rec.push(a, "merge-range", [], { range: [left, right], meta: { mid } });
        const L = a.slice(left, mid + 1);
        const R = a.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;
        while (i < L.length && j < R.length) {
            rec.comparisons++;
            if (L[i] <= R[j]) {
                a[k] = L[i++];
            } else {
                a[k] = R[j++];
            }
            rec.writes++;
            rec.push(a, "merge-write", [k], { range: [left, right] });
            k++;
        }
        while (i < L.length) {
            a[k] = L[i++];
            rec.writes++;
            rec.push(a, "merge-write", [k], { range: [left, right] });
            k++;
        }
        while (j < R.length) {
            a[k] = R[j++];
            rec.writes++;
            rec.push(a, "merge-write", [k], { range: [left, right] });
            k++;
        }
        if (left === 0 && right === a.length - 1) {
            rec.markSorted(a, Array.from({ length: a.length }, (_, idx) => idx));
        }
    }

    function sort(left: number, right: number) {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);
        sort(left, mid);
        sort(mid + 1, right);
        merge(left, mid, right);
    }

    sort(0, a.length - 1);
    rec.finish(a);
    return rec.result();
}

function radixSort(input: number[]): Step[] {
    const rec = new Recorder();
    const a = [...input];
    rec.push(a, "init", []);
    if (a.length === 0) {
        rec.finish(a);
        return rec.result();
    }
    const max = Math.max(...a);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        const output = new Array(a.length).fill(0);
        const count = new Array(10).fill(0);
        rec.push(a, "gap-set", [], { meta: { digit: exp } });

        for (let i = 0; i < a.length; i++) {
            const d = Math.floor(a[i] / exp) % 10;
            count[d]++;
            rec.push(a, "count", [i], { meta: { digit: d } });
        }
        for (let i = 1; i < 10; i++) count[i] += count[i - 1];
        for (let i = a.length - 1; i >= 0; i--) {
            const d = Math.floor(a[i] / exp) % 10;
            output[count[d] - 1] = a[i];
            count[d]--;
        }
        for (let i = 0; i < a.length; i++) {
            a[i] = output[i];
            rec.writes++;
            rec.push(a, "overwrite", [i], { meta: { digit: exp } });
        }
    }
    rec.finish(a);
    return rec.result();
}

function countingSort(input: number[]): Step[] {
    const rec = new Recorder();
    const a = [...input];
    rec.push(a, "init", []);
    if (a.length === 0) {
        rec.finish(a);
        return rec.result();
    }
    const min = Math.min(...a);
    const max = Math.max(...a);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(a.length).fill(0);

    for (let i = 0; i < a.length; i++) {
        count[a[i] - min]++;
        rec.push(a, "count", [i], { meta: { bucket: a[i] - min } });
    }
    for (let i = 1; i < count.length; i++) count[i] += count[i - 1];
    for (let i = a.length - 1; i >= 0; i--) {
        output[count[a[i] - min] - 1] = a[i];
        count[a[i] - min]--;
    }
    for (let i = 0; i < a.length; i++) {
        a[i] = output[i];
        rec.writes++;
        rec.markSorted(a, [i]);
    }
    rec.finish(a);
    return rec.result();
}

function bucketSort(input: number[]): Step[] {
    const rec = new Recorder();
    const a = [...input];
    rec.push(a, "init", []);
    if (a.length === 0) {
        rec.finish(a);
        return rec.result();
    }
    const bucketSize = 5;
    const min = Math.min(...a);
    const max = Math.max(...a);
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

    for (let i = 0; i < a.length; i++) {
        const idx = Math.floor((a[i] - min) / bucketSize);
        buckets[idx].push(a[i]);
        rec.push(a, "bucket-place", [i], { meta: { bucket: idx } });
    }
    for (let i = 0; i < buckets.length; i++) {
        buckets[i].sort((x, y) => x - y);
        rec.push(a, "bucket-sorted", [], { meta: { bucket: i } });
    }
    let idx = 0;
    for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            a[idx] = buckets[i][j];
            rec.writes++;
            rec.markSorted(a, [idx]);
            idx++;
        }
    }
    rec.finish(a);
    return rec.result();
}

function shellSort(input: number[]): Step[] {
    const rec = new Recorder();
    const a = [...input];
    rec.push(a, "init", []);
    const n = a.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        rec.push(a, "gap-set", [], { meta: { gap } });
        for (let i = gap; i < n; i++) {
            const temp = a[i];
            let j = i;
            while (j >= gap) {
                rec.compare(a, j - gap, j);
                if (a[j - gap] <= temp) break;
                a[j] = a[j - gap];
                rec.writes++;
                rec.push(a, "shift", [j - gap, j], { meta: { gap } });
                j -= gap;
            }
            a[j] = temp;
            rec.writes++;
            rec.push(a, "overwrite", [j], { meta: { gap } });
        }
    }
    rec.finish(a);
    return rec.result();
}

export const algorithmRunners: Record<AlgorithmKey, (input: number[]) => Step[]> = {
    bubble: bubbleSort,
    insertion: insertionSort,
    heap: heapSort,
    quick: quickSort,
    merge: mergeSort,
    radix: radixSort,
    counting: countingSort,
    bucket: bucketSort,
    shell: shellSort,
};

export function runAlgorithm(key: AlgorithmKey, input: number[]): Step[] {
    return algorithmRunners[key](input);
}
