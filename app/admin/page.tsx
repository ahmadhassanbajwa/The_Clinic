'use client';

import { useState } from 'react';
import { Shield, Calendar, Clock, AlertTriangle } from 'lucide-react';

// Mock Data
const MOCK_APPOINTMENTS = [
    { id: 1, name: "Sarah Jenkins", treatment: "Acne & Scarring", urgency: "Low", time: "Mon 12th, 10:00 AM", summary: "Persistent acne on chin, trying OTC creams without success." },
    { id: 2, name: "Mike Ross", treatment: "Skin Infections", urgency: "High", time: "Tue 13th, 2:00 PM", summary: "Red swollen patch on leg, warm to touch, spreading rapidly." },
    { id: 3, name: "Emily Blunt", treatment: "Pigmentation", urgency: "Medium", time: "Wed 14th, 11:30 AM", summary: "Dark spots appearing on forehead after summer vacation." },
];

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'doctor123') { // Simple hardcoded check for demo
            setIsAuthenticated(true);
        } else {
            alert('Invalid Password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
                <form onSubmit={handleLogin} className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                    <div style={{ margin: '0 auto 20px', width: '60px', height: '60px', borderRadius: '30px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield size={32} />
                    </div>
                    <h2 style={{ marginBottom: '24px' }}>Doctor Login</h2>
                    <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Access Dashboard</button>
                    <p style={{ marginTop: '16px', color: '#999', fontSize: '0.8rem' }}>(Try 'doctor123')</p>
                </form>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
            {/* Admin Nav */}
            <nav style={{ background: 'white', padding: '16px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield color="var(--primary)" /> Doctor Dashboard
                </h1>
                <button onClick={() => setIsAuthenticated(false)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Logout</button>
            </nav>

            <main className="container" style={{ padding: '40px 20px' }}>
                <h2 style={{ marginBottom: '24px' }}>Appointment Requests</h2>

                <div style={{ display: 'grid', gap: '20px' }}>
                    {MOCK_APPOINTMENTS.map(apt => (
                        <div key={apt.id} className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '250px' }}>
                                <h3 style={{ marginBottom: '8px' }}>{apt.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-muted)' }}>
                                    <Calendar size={16} /> {apt.treatment}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                    <Clock size={16} /> {apt.time}
                                </div>
                            </div>

                            <div style={{ flex: 2, minWidth: '300px' }}>
                                <p style={{ fontWeight: 500, marginBottom: '4px' }}>AI Summary:</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', background: '#f9f9f9', padding: '12px', borderRadius: '8px' }}>
                                    {apt.summary}
                                </p>
                            </div>

                            <div style={{ textAlign: 'right', minWidth: '150px' }}>
                                <span className="badge" style={{
                                    background: apt.urgency === 'High' ? 'var(--urgency-high)' : apt.urgency === 'Medium' ? 'var(--urgency-medium)' : 'var(--urgency-low)',
                                    color: 'white', marginBottom: '12px'
                                }}>
                                    {apt.urgency} Urgency
                                </span>
                                <div>
                                    <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
