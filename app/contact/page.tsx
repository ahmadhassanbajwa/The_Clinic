import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CLINIC_INFO } from '@/lib/constants';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export default function ContactPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '80px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ marginBottom: '16px', fontSize: '2.5rem' }}>Contact Us</h1>
                        <p style={{ color: 'var(--text-muted)' }}>We are here to help with your skin concerns.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        {/* Info Cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <MapPin color="var(--primary)" size={24} style={{ marginTop: '4px' }} />
                                <div>
                                    <h3 style={{ marginBottom: '8px' }}>Visit Us</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>{CLINIC_INFO.address}</p>
                                </div>
                            </div>

                            <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <Phone color="var(--primary)" size={24} style={{ marginTop: '4px' }} />
                                <div>
                                    <h3 style={{ marginBottom: '8px' }}>Call or WhatsApp</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Phone: {CLINIC_PHONE_DUMMY_VAR_FIX}</p>
                                    <p style={{ color: 'var(--text-muted)' }}>WhatsApp: {CLINIC_INFO.whatsapp_display}</p>
                                </div>
                            </div>

                            <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <Clock color="var(--primary)" size={24} style={{ marginTop: '4px' }} />
                                <div>
                                    <h3 style={{ marginBottom: '8px' }}>Working Hours</h3>
                                    <p style={{ color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>{CLINIC_INFO.hours}</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="card" style={{
                            minHeight: '400px',
                            padding: 0,
                            overflow: 'hidden',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <iframe
                                title="Clinic Location"
                                width="100%"
                                height="100%"
                                style={{ border: 0, flex: 1, minHeight: '300px' }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC_INFO.address)}&output=embed`}>
                            </iframe>
                            <div style={{ padding: '16px', background: 'white', borderTop: '1px solid #eee', textAlign: 'center' }}>
                                <a
                                    href="https://maps.app.goo.gl/ADT2HQ9QqaYWB2wq6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    <MapPin size={18} /> Open Exact Location
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

// Helper to fix the missing phone variable
const CLINIC_PHONE_DUMMY_VAR_FIX = "+92 325 5223306"; 
