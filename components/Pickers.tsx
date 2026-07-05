"use client";

import { ChevronDown, Globe } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlgorithmKey, LanguageCode } from "@/lib/types";

const ALGORITHMS: { key: AlgorithmKey; label: string }[] = [
    { key: "bubble", label: "Bubble Sort" },
    { key: "insertion", label: "Insertion Sort" },
    { key: "merge", label: "Merge Sort" },
    { key: "heap", label: "Heap Sort" },
    { key: "quick", label: "Quick Sort" },
    { key: "radix", label: "Radix Sort" },
    { key: "counting", label: "Counting Sort" },
    { key: "bucket", label: "Bucket Sort" },
    { key: "shell", label: "Shell Sort" },
];

const LANGUAGES: LanguageCode[] = ["en", "fr", "it", "de", "es", "ja", "no", "sv", "ua", "ru"];

interface AlgorithmPickerProps {
    value: AlgorithmKey;
    onChange: (key: AlgorithmKey) => void;
    triggerLabel: string;
}

export function AlgorithmPicker({ value, onChange, triggerLabel }: AlgorithmPickerProps) {
    const current = ALGORITHMS.find((a) => a.key === value)?.label ?? triggerLabel;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="gap-2 justify-between min-w-[180px]">
                    {current}
                    <ChevronDown className="h-4 w-4 opacity-60" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup value={value} onValueChange={(v) => onChange(v as AlgorithmKey)}>
                    {ALGORITHMS.map((a) => (
                        <DropdownMenuRadioItem key={a.key} value={a.key}>
                            {a.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface LanguagePickerProps {
    value: LanguageCode;
    onChange: (lang: LanguageCode) => void;
}

export function LanguagePicker({ value, onChange }: LanguagePickerProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    {value.toUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={value} onValueChange={(v) => onChange(v as LanguageCode)}>
                    {LANGUAGES.map((lang) => (
                        <DropdownMenuRadioItem key={lang} value={lang}>
                            {lang.toUpperCase()}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
