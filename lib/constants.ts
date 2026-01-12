import { Stethoscope, Sparkles, Activity, Shield, Frown, Users, Zap } from 'lucide-react';

export const CLINIC_INFO = {
    name: "The Clinic",
    doctor: "Dr. Asia Bano",
    credentials: "MBBS, M.D (DERMA) - Skin Specialist, Dermatologist & Cosmetologist",
    whatsapp: "923255223306", // Format for API
    whatsapp_display: "+92 325 5223306",
    address: "48/C Satellite town, Sargodha, Pakistan",
    hours: "Mon - Sat: 4:00 PM - 8:00 PM (Winter), Mon - Sat: 5:00 PM - 9:00 PM (Summer)",
    email: "contact@clinicbydrasiabano.com",
    socials: {
        instagram: "https://instagram.com/dr_asia_bano",
        facebook: "https://facebook.com/drasiabano",
        linkedin: "https://linkedin.com/in/drasiabano"
    }
};

export const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Treatments', href: '/treatments' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book Appointment', href: '/book', isPrimary: true }
];

export type Treatment = {
    id: string;
    title: string;
    description: string;
    icon: any;
};

export const TREATMENTS: Treatment[] = [
    {
        id: 'acne',
        title: 'Acne & Scarring',
        description: 'Comprehensive care for active acne and scar reduction using advanced therapies.',
        icon: Zap
    },
    {
        id: 'eczema',
        title: 'Eczema & Dermatitis',
        description: 'Soothing management plans to control flare-ups and restore skin barrier health.',
        icon: Shield
    },
    {
        id: 'psoriasis',
        title: 'Psoriasis',
        description: 'Targeted treatments including light therapy and biologics for long-term control.',
        icon: Activity
    },
    {
        id: 'hair-loss',
        title: 'Hair Loss (Alopecia)',
        description: 'Diagnostic evaluation and regrowth stimulation protocols.',
        icon: Frown
    },
    {
        id: 'pigmentation',
        title: 'Pigmentation',
        description: 'Brightening treatments for melasma, sun spots, and uneven skin tone.',
        icon: Sparkles
    },
    {
        id: 'infection',
        title: 'Skin Infections',
        description: 'Rapid diagnosis and treatment for bacterial, fungal, and viral skin issues.',
        icon: Stethoscope
    }
];
