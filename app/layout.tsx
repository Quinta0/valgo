import { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

const fontSans = Geist({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sans',
});

const fontMono = Geist_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
});

export const metadata = {
    title: 'Valgo - Watch how sorting actually works',
    description: 'An animated, narrated visualizer for nine classic sorting algorithms.',
};

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <html lang="en" className="dark">
        <body
            className={cn(
                'antialiased font-sans',
                fontSans.variable,
                fontMono.variable
            )}
        >
        {children}
        </body>
        </html>
    );
}
