export type Urgency = 'Low' | 'Medium' | 'High';

export interface AIResponse {
    type: 'chat' | 'analysis';
    message?: string;
    analysis?: {
        causes: string[];
        urgency: Urgency;
        checkupType: string;
        immediateAction?: string;
    }
}

interface KnowledgeBaseEntry {
    keywords: string[];
    response: {
        causes: string[];
        urgency: Urgency;
        checkupType: string;
        immediateAction?: string;
    };
    minMatch?: number;
}

// ... (Keep SYMPTOM_DB same as before, just abbreviated here for brevity, assume full DB is maintained or re-pasted)
const SYMPTOM_DB: KnowledgeBaseEntry[] = [
    // --- EMERGENCY / HIGH URGENCY ---
    {
        keywords: ['bleeding', 'rapid', 'fever', 'pus', 'oozing', 'pain', 'swollen', 'hot', 'spreading', 'red line'],
        minMatch: 1,
        response: {
            causes: ['Severe Infection (Cellulitis)', 'Acute Allergic Reaction', 'Abscess'],
            urgency: 'High',
            checkupType: 'Emergency Care / Urgent Visit',
            immediateAction: 'Please visit a doctor or emergency room immediately, especially if you have a fever or the redness is spreading rapidly.'
        }
    },
    {
        keywords: ['mole', 'changing', 'color', 'irregular', 'border', 'asymmetry', 'bleeding mole'],
        minMatch: 2,
        response: {
            causes: ['Atypical Mole', 'Melanoma (Skin Cancer Risk)', 'Seborrheic Keratosis'],
            urgency: 'High',
            checkupType: 'Full Body Skin Check (Dermatoscopy)',
            immediateAction: 'Do not wait. Schedule a skin check immediately to rule out malignancy.'
        }
    },
    // --- ACNE / FACE ---
    {
        keywords: ['pimple', 'acne', 'whitehead', 'blackhead', 'oil', 'breakout', 'face', 'cyst', 'chin', 'forehead'],
        response: {
            causes: ['Acne Vulgaris', 'Hormonal Acne', 'Clogged Pores'],
            urgency: 'Low',
            checkupType: 'Acne Consultation',
        }
    },
    {
        keywords: ['red', 'flush', 'nose', 'cheek', 'heat', 'spicy', 'alcohol', 'spider vein'],
        response: {
            causes: ['Rosacea', 'Couperose Skin', 'Sensitive Skin'],
            urgency: 'Low',
            checkupType: 'Rosacea Management Consultation',
        }
    },
    // --- ECZEMA / ITCH / DRYNESS ---
    {
        keywords: ['itch', 'scratch', 'dry', 'flake', 'scale', 'crust', 'elbow', 'knee', 'winter'],
        response: {
            causes: ['Eczema (Atopic Dermatitis)', 'Psoriasis', 'Xerosis (Dry Skin)'],
            urgency: 'Medium',
            checkupType: 'Medical Dermatology Appointment',
        }
    },
    {
        keywords: ['ring', 'circle', 'red border', 'itchy patch', 'clear center'],
        response: {
            causes: ['Tinea (Ringworm - Fungal)', 'Nummular Eczema', 'Granuloma Annulare'],
            urgency: 'Medium',
            checkupType: 'Fungal Scraping & Exam',
        }
    },
    // --- HAIR ---
    {
        keywords: ['hair', 'falling', 'bald', 'thinning', 'clump', 'shower', 'scalp'],
        response: {
            causes: ['Telogen Effluvium', 'Androgenetic Alopecia', 'Alopecia Areata'],
            urgency: 'Medium',
            checkupType: 'Hair Loss Consultation',
        }
    },
    // --- PIGMENTATION ---
    {
        keywords: ['dark spot', 'brown', 'sun', 'patch', 'melasma', 'pregnancy', 'uneven'],
        response: {
            causes: ['Melasma', 'Post-Inflammatory Hyperpigmentation', 'Solar Lentigines'],
            urgency: 'Low',
            checkupType: 'Aesthetic Consultation (Peels/Lasers)',
        }
    },
    // --- MISC ---
    {
        keywords: ['wart', 'bump', 'cauliflower', 'finger', 'foot', 'rough'],
        response: {
            causes: ['Viral Wart (Verruca)', 'Corn/Callus', 'Skin Tag'],
            urgency: 'Low',
            checkupType: 'Cryotherapy / Removal Consult',
        }
    }
];

const DEFAULT_ANALYSIS = {
    causes: ['Contact Dermatitis', 'Viral Exanthem', 'General Irritation'],
    urgency: 'Medium' as Urgency,
    checkupType: 'General Consultation',
    immediateAction: 'If symptoms persist or worsen, please book an appointment for a proper diagnosis.'
};

export function processUserMessage(text: string): AIResponse {
    const lower = text.toLowerCase().trim();

    // 1. Intent Recognition: Greetings / Small Talk
    if (lower.match(/^(hi|hello|hey|greetings|good morning|good evening)/)) {
        return { type: 'chat', message: "Hello! I'm your Skin Assistant. You can describe any skin concern (e.g., 'itchy red patch' or 'acne'), and I'll help you assess it." };
    }
    if (lower.match(/^(thanks|thank you|cool|ok|okay|great)/)) {
        return { type: 'chat', message: "You're welcome! Let me know if you have any other questions." };
    }
    if (lower.match(/(who are you|what are you|help)/)) {
        return { type: 'chat', message: "I am a smart triaging assistant for The Clinic. I can help analyze skin symptoms and suggest the right appointment type. I am not a real doctor, though!" };
    }

    // 2. Symptom Analysis (Keyword Scoring)
    const input = lower.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const tokens = input.split(/\s+/);

    let bestMatch: KnowledgeBaseEntry | null = null;
    let highestScore = 0;

    for (const entry of SYMPTOM_DB) {
        let score = 0;
        let matchCount = 0;
        for (const word of tokens) {
            if (entry.keywords.includes(word)) { score += 2; matchCount++; }
            else if (entry.keywords.some(k => word.includes(k) || k.includes(word))) { score += 1; matchCount++; }
        }
        if (matchCount >= (entry.minMatch || 1) && score > highestScore) {
            highestScore = score;
            bestMatch = entry;
        }
    }

    // Threshold
    if (highestScore >= 1 && bestMatch) {
        return {
            type: 'analysis',
            analysis: bestMatch.response
        };
    }

    // 3. Fallback (If no symptom detected)
    return {
        type: 'chat',
        message: "I didn't quite catch that as a specific symptom. Could you describe the redness, texture, or sensation? (e.g., 'dry itchy skin')"
    };
}
