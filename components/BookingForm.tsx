'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { TREATMENTS, CLINIC_INFO } from '@/lib/constants';
import { Send, Calendar, User, FileText, Clock } from 'lucide-react';

export default function BookingForm() {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        treatment: '',
        concern: '',
        date: '',
        time: ''
    });

    useEffect(() => {
        const treatmentId = searchParams.get('treatment');
        if (treatmentId) {
            setFormData(prev => ({ ...prev, treatment: treatmentId }));
        }
    }, [searchParams]);

    // Logic to generate time slots based on season
    const { slots, seasonMessage } = useMemo(() => {
        if (!formData.date) return { slots: [], seasonMessage: '' };

        const dateObj = new Date(formData.date);
        const month = dateObj.getMonth(); // 0-11

        // Winter: Oct(9) - Mar(2)
        // Summer: Apr(3) - Sep(8)
        const isSummer = month >= 3 && month <= 8;

        // Winter: 4pm - 8pm (16:00 - 20:00)
        // Summer: 5pm - 9pm (17:00 - 21:00)
        const startHour = isSummer ? 17 : 16;
        const endHour = isSummer ? 21 : 20;

        const generatedSlots = [];
        for (let hour = startHour; hour < endHour; hour++) {
            // :00 slot
            generatedSlots.push(`${hour > 12 ? hour - 12 : hour}:00 PM`);
            // :30 slot
            generatedSlots.push(`${hour > 12 ? hour - 12 : hour}:30 PM`);
        }

        return {
            slots: generatedSlots,
            seasonMessage: isSummer
                ? 'Summer View: Clinic Open 5 PM - 9 PM'
                : 'Winter View: Clinic Open 4 PM - 8 PM'
        };
    }, [formData.date]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct WhatsApp Message
        const treatmentName = TREATMENTS.find(t => t.id === formData.treatment)?.title || formData.treatment || 'Consultation';

        const message = `Hello Doctor,
I would like to book an appointment.

*Name:* ${formData.name}
*Treatment:* ${treatmentName}
*Concern:* ${formData.concern}
*Date:* ${formData.date}
*Time:* ${formData.time}

Thank you.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Book Your Appointment</h2>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        required
                        type="text"
                        placeholder="John Doe"
                        style={{
                            width: '100%', padding: '12px 12px 12px 48px',
                            borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0',
                            fontSize: '1rem', outline: 'none'
                        }}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Treatment Type</label>
                <select
                    style={{
                        width: '100%', padding: '12px',
                        borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0',
                        fontSize: '1rem', outline: 'none', background: 'white'
                    }}
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                >
                    <option value="">General Consultation</option>
                    {TREATMENTS.map(t => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Brief Summary of Concern</label>
                <div style={{ position: 'relative' }}>
                    <FileText size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} />
                    <textarea
                        required
                        placeholder="E.g., Itchy red patch on arm..."
                        rows={3}
                        style={{
                            width: '100%', padding: '12px 12px 12px 48px',
                            borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0',
                            fontSize: '1rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical'
                        }}
                        value={formData.concern}
                        onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    />
                </div>
            </div>

            <div className="booking-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Date</label>
                    <div style={{ position: 'relative' }}>
                        <Calendar size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            required
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            style={{
                                width: '100%', padding: '12px 12px 12px 48px',
                                borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0',
                                fontSize: '1rem', outline: 'none', color: 'var(--text-main)'
                            }}
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value, time: '' })}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Time Slot</label>
                    <div style={{ position: 'relative' }}>
                        <Clock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <select
                            required
                            disabled={!formData.date}
                            style={{
                                width: '100%', padding: '12px 12px 12px 48px',
                                borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0',
                                fontSize: '1rem', outline: 'none', background: formData.date ? 'white' : '#f8fafc',
                                color: formData.date ? 'var(--text-main)' : '#94a3b8'
                            }}
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        >
                            <option value="">Select Time</option>
                            {slots.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {seasonMessage && (
                    <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', color: 'var(--primary)', textAlign: 'center', background: 'var(--primary-light)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                        {seasonMessage}
                    </div>
                )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Request Appointment via WhatsApp <Send size={18} />
            </button>

            <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                You will be redirected to WhatsApp to send the pre-filled message directly to Dr. Asia Bano.
            </p>
        </form>
    );
}
