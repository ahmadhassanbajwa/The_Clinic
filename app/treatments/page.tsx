import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TREATMENTS } from '@/lib/constants';
import Link from 'next/link';

export default function TreatmentsPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '80px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ marginBottom: '16px', fontSize: '2.5rem' }}>Our Treatments</h1>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            We offer comprehensive dermatological care for a wide variety of skin conditions.
                            Each treatment is tailored to your specific needs.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '32px'
                    }}>
                        {TREATMENTS.map((t) => (
                            <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{
                                    width: '56px', height: '56px',
                                    background: 'var(--bg-soft)',
                                    borderRadius: '16px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '24px',
                                    color: 'var(--primary)'
                                }}>
                                    <t.icon size={28} />
                                </div>
                                <h3 style={{ marginBottom: '12px', fontSize: '1.4rem' }}>{t.title}</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', flex: 1 }}>{t.description}</p>

                                <Link href={`/book?treatment=${t.id}`} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                                    Book Consultation
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
