'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CLINIC_INFO, NAV_LINKS } from '@/lib/constants';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div className="container" style={{
                height: '80px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link href="/" style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    letterSpacing: '-0.02em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <Image
                        src="/logo.png"
                        alt={CLINIC_INFO.name}
                        width={80}
                        height={80}
                        style={{ borderRadius: '50%' }}
                    />
                    {CLINIC_INFO.name}
                </Link>

                {/* Desktop Menu */}
                <div className="hidden-mobile" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={link.isPrimary ? 'btn btn-primary' : 'hover:text-primary'}
                            style={!link.isPrimary ? { fontWeight: 500, color: 'var(--text-muted)' } : {}}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="hidden-desktop"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    style={{ background: 'transparent', color: 'var(--text-main)', padding: '8px' }}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="mobile-nav-menu animate-fade-in" style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    width: '100%',
                    background: 'white',
                    borderBottom: '1px solid #eee',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={link.isPrimary ? 'btn btn-primary' : ''}
                            style={link.isPrimary ? { textAlign: 'center' } : { fontSize: '1.1rem', fontWeight: 500 }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
