"use client";

import { motion } from "framer-motion";

interface StatItemProps {
    label: string;
    value: number | string;
}

function StatItem({ label, value }: StatItemProps) {
    return (
        <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
            <motion.span
                key={String(value)}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-2xl font-mono tabular-nums text-primary"
            >
                {value}
            </motion.span>
        </div>
    );
}

interface StatsPanelProps {
    title: string;
    comparisons: number;
    writes: number;
    stepLabel: string;
    stepIndex: number;
    stepCount: number;
    sortedLabel: string;
    sortedCount: number;
    total: number;
}

export default function StatsPanel({
    title, comparisons, writes, stepLabel, stepIndex, stepCount, sortedLabel, sortedCount, total,
}: StatsPanelProps) {
    return (
        <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{title}</p>
            <div className="grid grid-cols-2 gap-4">
                <StatItem label="Comparisons" value={comparisons} />
                <StatItem label="Writes" value={writes} />
                <StatItem label={stepLabel} value={`${stepIndex} / ${stepCount}`} />
                <StatItem label={sortedLabel} value={`${sortedCount} / ${total}`} />
            </div>
        </div>
    );
}
