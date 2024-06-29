import { ReactNode } from 'react';
import { DM_Sans, Space_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

const fontHeading = DM_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-heading',
});

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <html lang="en">
        <body
            className={cn(
                'antialiased',
                fontHeading.variable
            )}
        >
        {children}
        </body>
        </html>
    );
}
