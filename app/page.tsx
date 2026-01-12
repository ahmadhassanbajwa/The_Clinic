import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CLINIC_INFO, TREATMENTS } from '@/lib/constants';
import { ArrowRight, CheckCircle, Star, Shield, Activity, Clock } from 'lucide-react';

export default function Home() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1 }}>
                {/* Hero Section */}
                <section style={{
                    background: 'linear-gradient(135deg, #E0F2F1 0%, #F0F4F8 100%)',
                    padding: '100px 0',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Decorative Background Element */}
                    <div style={{
                        position: 'absolute', top: -50, right: -50, width: '400px', height: '400px',
                        borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,108,102,0.05) 0%, transparent 70%)'
                    }}></div>

                    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px', alignItems: 'center' }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }} className="animate-fade-in">
                            <span className="badge" style={{ background: 'rgba(14, 108, 102, 0.1)', color: 'var(--primary)', marginBottom: '24px' }}>
                                <Star size={14} style={{ marginRight: '6px' }} />
                                Accepting New Patients for {new Date().getFullYear()}
                            </span>

                            <h1 style={{
                                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                                marginBottom: '24px',
                                color: 'var(--text-main)',
                                lineHeight: 1.1,
                                fontWeight: 700
                            }}>
                                World-Class Dematology<br />
                                <span style={{ color: 'var(--primary)' }}>Personalized For You</span>
                            </h1>

                            <p style={{
                                fontSize: '1.25rem',
                                color: 'var(--text-muted)',
                                maxWidth: '600px',
                                margin: '0 auto 40px',
                                lineHeight: 1.6
                            }}>
                                Experience the perfect blend of medical expertise and compassionate care.
                                Trusted by thousands for skin health and aesthetic excellence.
                            </p>

                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href="/book" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                                    Book Consultation <ArrowRight size={20} />
                                </Link>
                                <Link href="/treatments" className="btn btn-outline" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                                    Explore Services
                                </Link>
                            </div>

                            <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <div style={{ display: 'flex' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}
                                </div>
                                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>5.0/5</span> from 500+ Patients
                            </div>
                        </div>
                    </div>
                </section>

                {/* Credentials / Trust - Redesigned as Cards */}
                <section style={{ padding: '80px 0', background: 'white' }}>
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '32px'
                        }}>
                            {[
                                { icon: Shield, title: 'Board Certified', desc: 'Verified medical excellence' },
                                { icon: Activity, title: 'Modern Technology', desc: 'Latest diagnostic equipment' },
                                { icon: Clock, title: 'Zero Wait Time', desc: 'Respecting your schedule' },
                                { icon: CheckCircle, title: 'Proven Results', desc: 'Data-driven treatments' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px' }}>
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '50%',
                                        background: 'var(--bg-soft)', color: 'var(--primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '20px'
                                    }}>
                                        <item.icon size={32} />
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: 600 }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Common Treatments Preview - Grid Layout */}
                <section style={{ padding: '100px 0', background: 'var(--bg-body)' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.05em', display: 'block', marginBottom: '16px' }}>
                                Our Expertise
                            </span>
                            <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Specialized Treatments</h2>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                                From medical dermatology to aesthetic enhancements, we provide comprehensive care for all skin types.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                            gap: '32px'
                        }}>
                            {TREATMENTS.slice(0, 3).map((t) => (
                                <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{
                                        width: '56px', height: '56px',
                                        background: 'var(--primary-light)',
                                        borderRadius: '16px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '24px',
                                        color: 'var(--primary)'
                                    }}>
                                        <t.icon size={28} />
                                    </div>
                                    <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>{t.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px', flex: 1, lineHeight: 1.6 }}>{t.description}</p>
                                    <Link href="/treatments" style={{
                                        color: 'var(--primary)',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginTop: 'auto'
                                    }}>
                                        Learn more <ArrowRight size={18} />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '60px' }}>
                            <Link href="/treatments" className="btn btn-outline" style={{ padding: '14px 32px' }}>View All Services</Link>
                        </div>
                    </div>
                </section>

                {/* Call to Action Banner */}
                <section style={{ padding: '100px 0', background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
                    <div className="container">
                        <h2 style={{ fontSize: '3rem', marginBottom: '24px', color: 'white' }}>Ready for Radiant Skin?</h2>
                        <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 40px', opacity: 0.9 }}>
                            Schedule your consultation today and take the first step towards healthier, more confident skin.
                        </p>
                        <Link href="/book" className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '18px 48px', fontSize: '1.1rem' }}>
                            Book Your Appointment Now
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
