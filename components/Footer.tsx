import Link from 'next/link';
import { CLINIC_INFO } from '@/lib/constants';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{ background: 'var(--bg-soft)', padding: '60px 0', marginTop: '60px' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '40px'
                }}>
                    <div>
                        <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>{CLINIC_INFO.name}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                            {CLINIC_INFO.credentials}
                        </p>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Providing expert dermatological care with a focus on patient education and safety.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '16px', fontWeight: 600 }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li><Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
                            <li><Link href="/treatments" style={{ color: 'var(--text-muted)' }}>Treatments</Link></li>
                            <li><Link href="/contact" style={{ color: 'var(--text-muted)' }}>Contact Us</Link></li>
                            <li><Link href="/admin" style={{ color: 'var(--text-muted)' }}>Doctor Login</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '16px', fontWeight: 600 }}>Contact & Connect</h4>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>{CLINIC_INFO.address}</p>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>WhatsApp: {CLINIC_INFO.whatsapp_display}</p>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}><small>{CLINIC_INFO.hours}</small></p>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <a href={CLINIC_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                                <Instagram size={24} />
                            </a>
                            <a href={CLINIC_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                                <Facebook size={24} />
                            </a>
                            <a href={CLINIC_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.
                    <br />
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Medical Disclaimer: This website provides information only and does not substitute professional medical advice.</span>
                </div>
            </div>
        </footer>
    );
}
