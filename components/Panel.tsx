import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5 md:p-6", className)}
            {...props}
        />
    );
}
