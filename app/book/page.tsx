import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { Suspense } from 'react';

export default function BookPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '80px 0', background: 'var(--bg-soft)' }}>
                <div className="container">
                    <Suspense fallback={<div>Loading form...</div>}>
                        <BookingForm />
                    </Suspense>
                </div>
            </main>

            <Footer />
        </div>
    );
}
