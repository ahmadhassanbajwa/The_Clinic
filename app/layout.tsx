import './globals.css';
import type { Metadata } from 'next';
import SkinAssistant from '@/components/SkinAssistant';

export const metadata: Metadata = {
    title: 'Dr. Asia Bano | Professional Dermatology Clinic',
    description: 'Expert dermatological care, diagnosis assistance, and treatment.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children}
                <SkinAssistant />
            </body>
        </html>
    );
}
