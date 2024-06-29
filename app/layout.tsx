import {DM_Sans, Space_Mono} from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

const fontHeading = DM_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-heading',
})


export default function Layout({ children }) {
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
    )
}