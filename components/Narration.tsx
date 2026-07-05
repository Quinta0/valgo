"use client";

import { AnimatePresence, motion } from "framer-motion";

interface NarrationProps {
    text: string;
    stepIndex: number;
    title: string;
}

export default function Narration({ text, stepIndex, title }: NarrationProps) {
    return (
        <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{title}</p>
            <div className="min-h-[3.5rem]">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={stepIndex}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22 }}
                        className="text-lg leading-relaxed text-balance"
                    >
                        {text}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
}
