import React, { useState, createContext, useContext } from 'react';
import { Client, Databases, ID } from './appwriteShim';

// --- Appwrite Configuratie ---
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '6874f0b40015fc341b14';
const APPWRITE_DATABASE_ID = '68873afd0015cc5075e5';
const APPWRITE_COLLECTION_VEILIGHEID_ID = '6899f3390009b108e10f';

// Initialiseer de Appwrite client
const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);
const databases = new Databases(client);

// --- i18n (Internationalization) Configuratie ---

// Context voor de taal
const LanguageContext = createContext();

// Vertalingen object
const translations = {
    nl: {
        safety: "Veiligheid",
        landingIntro: "Veiligheid is een belangrijk issue op het CTF. We willen dat iedereen zich veilig voelt en kan genieten van het festival op zijn/haar/hun eigen manier. Heb je toch iets meegemaakt wat jij als onveilig hebt ervaren? Dan kun je dat te allen tijde bij ons melden. We nemen je melding altijd serieus en proberen op een gepaste manier en in gesprek met jou te reageren op wat jij hebt meegemaakt. Je kunt ook altijd anoniem een melding doen, door geen naam op het formulier in te vullen.",
        goToForm: "Ga naar het formulier",
        formTitle: "Meld een onveilige situatie",
        nameLabel: "Naam (optioneel)",
        namePlaceholder: "Je naam",
        phoneLabel: "Telefoonnummer (optioneel)",
        emailLabel: "E-mailadres (optioneel)",
        emailPlaceholder: "voorbeeld@email.com",
        eventLabel: "Wat heb je meegemaakt?",
        eventPlaceholder: "Beschrijf hier zo gedetailleerd mogelijk wat er is gebeurd...",
        contactQuestion: "Wil je dat we contact met je opnemen?",
        submitButton: "Verstuur melding",
        submittingButton: "Bezig met versturen...",
        successTitle: "Dank je wel!",
        successMessage: "Je melding is succesvol en veilig ontvangen. We nemen deze zeer serieus.",
        errorTitle: "Oeps, er ging iets mis.",
        errorMessage: "Het is niet gelukt om je melding te versturen. Probeer het later opnieuw of neem direct contact met ons op.",
        backToHome: "Terug naar de startpagina",
        imageAlt: "Sfeerbeeld van het Café Theater Festival"
    },
    en: {
        safety: "Safety",
        landingIntro: "Safety is an important issue at the CTF. We want everyone to feel safe and enjoy the festival in their own way. Have you experienced something that you perceived as unsafe? You can report it to us at any time. We always take your report seriously and try to respond appropriately and in conversation with you to what you have experienced. You can also always make a report anonymously by not entering a name on the form.",
        goToForm: "Go to the form",
        formTitle: "Report an unsafe situation",
        nameLabel: "Name (optional)",
        namePlaceholder: "Your name",
        phoneLabel: "Phone number (optional)",
        emailLabel: "Email address (optional)",
        emailPlaceholder: "example@email.com",
        eventLabel: "What did you experience?",
        eventPlaceholder: "Describe what happened in as much detail as possible here...",
        contactQuestion: "Do you want us to contact you?",
        submitButton: "Submit report",
        submittingButton: "Submitting...",
        successTitle: "Thank you!",
        successMessage: "Your report has been received successfully and safely. We take it very seriously.",
        errorTitle: "Oops, something went wrong.",
        errorMessage: "We were unable to submit your report. Please try again later or contact us directly.",
        backToHome: "Back to the homepage",
        imageAlt: "Atmosphere picture of the Café Theater Festival"
    }
};

// Hook om vertalingen te gebruiken
const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    const { language, setLanguage } = context;
    const t = (key) => translations[language][key] || key;
    return { t, language, setLanguage };
};

// Provider component voor de taal
const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('nl'); // Standaardtaal is Nederlands
    const value = { language, setLanguage };
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// --- Componenten ---

const LanguageSwitcher = () => {
    const { language, setLanguage } = useTranslation();
    
    const switchLang = (lang) => {
        setLanguage(lang);
    };

    return (
        <div className="absolute top-4 right-4 flex space-x-2">
            <button onClick={() => switchLang('nl')} className={`px-3 py-1 text-sm rounded-md transition-colors ${language === 'nl' ? 'bg-cyan-400 text-[#20747F] font-bold' : 'bg-white/20 text-white'}`}>NL</button>
            <button onClick={() => switchLang('en')} className={`px-3 py-1 text-sm rounded-md transition-colors ${language === 'en' ? 'bg-cyan-400 text-[#20747F] font-bold' : 'bg-white/20 text-white'}`}>EN</button>
        </div>
    );
};

const LandingPage = ({ onGoToForm }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-cyan-200">{t('safety')}</h1>
            <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-200">{t('landingIntro')}</p>
            <div className="mb-8 overflow-hidden rounded-xl shadow-lg">
                <img 
                    src="https://media.cafetheaterfestival.nl/wp-content/uploads/2025/08/53562360999_e4668b6c7f_o-scaled-kopie.jpg" 
                    alt={t('imageAlt')}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/20747F/FFFFFF?text=CTF+Festival'; }}
                />
            </div>
            <button
                onClick={onGoToForm}
                className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-[#20747F] font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-200"
            >
                {t('goToForm')}
            </button>
        </div>
    );
};

const SafetyForm = ({ onGoToLanding }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        Naam: '',
        Telefoonnummer: '',
        Email: '',
        Event: '',
        Contact: false,
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleContact = () => {
        setFormData(prev => ({ ...prev, Contact: !prev.Contact }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await databases.createDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_COLLECTION_VEILIGHEID_ID,
                ID.unique(),
                formData
            );
            setStatus('success');
        } catch (error) {
            console.error("Fout bij het versturen van de melding:", error);
            setStatus('error');
        }
    };

    if (status === 'success' || status === 'error') {
        return (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
                <h2 className="text-3xl font-bold mb-4">{t(status === 'success' ? 'successTitle' : 'errorTitle')}</h2>
                <p className="text-lg mb-6">{t(status === 'success' ? 'successMessage' : 'errorMessage')}</p>
                <button
                    onClick={onGoToLanding}
                    className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-[#20747F] font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
                >
                    {t('backToHome')}
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-cyan-200">{t('formTitle')}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="Naam" className="block text-sm font-medium text-gray-200 mb-1">{t('nameLabel')}</label>
                    <input type="text" name="Naam" id="Naam" value={formData.Naam} onChange={handleChange} className="w-full bg-white/10 border-2 border-transparent focus:border-cyan-400 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300" placeholder={t('namePlaceholder')} />
                </div>
                <div>
                    <label htmlFor="Telefoonnummer" className="block text-sm font-medium text-gray-200 mb-1">{t('phoneLabel')}</label>
                    <input type="tel" name="Telefoonnummer" id="Telefoonnummer" value={formData.Telefoonnummer} onChange={handleChange} className="w-full bg-white/10 border-2 border-transparent focus:border-cyan-400 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300" placeholder="0612345678" />
                </div>
                <div>
                    <label htmlFor="Email" className="block text-sm font-medium text-gray-200 mb-1">{t('emailLabel')}</label>
                    <input type="email" name="Email" id="Email" value={formData.Email} onChange={handleChange} className="w-full bg-white/10 border-2 border-transparent focus:border-cyan-400 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300" placeholder={t('emailPlaceholder')} />
                </div>
                <div>
                    <label htmlFor="Event" className="block text-sm font-medium text-gray-200 mb-1">{t('eventLabel')}</label>
                    <textarea name="Event" id="Event" rows="6" value={formData.Event} onChange={handleChange} required className="w-full bg-white/10 border-2 border-transparent focus:border-cyan-400 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300" placeholder={t('eventPlaceholder')}></textarea>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-gray-200">{t('contactQuestion')}</span>
                    <button type="button" onClick={toggleContact} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2a8e9a] focus:ring-cyan-400 ${formData.Contact ? 'bg-cyan-400' : 'bg-gray-500'}`}>
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${formData.Contact ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
                <div className="pt-4">
                    <button type="submit" disabled={status === 'loading'} className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#20747F] font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100">
                        {status === 'loading' ? t('submittingButton') : t('submitButton')}
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- Hoofd Applicatie Component ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('landing');
    const goToForm = () => setCurrentPage('form');
    const goToLanding = () => setCurrentPage('landing');

    return (
        <LanguageProvider>
            <div className="bg-[#20747F] min-h-screen font-sans text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
                <LanguageSwitcher />
                <div className="w-full max-w-2xl mx-auto">
                    {currentPage === 'landing' && <LandingPage onGoToForm={goToForm} />}
                    {currentPage === 'form' && <SafetyForm onGoToLanding={goToLanding} />}
                </div>
            </div>
        </LanguageProvider>
    );
}

// --- Stijlen (voor animatie) ---
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.5s ease-out forwards;
    }
`;
document.head.appendChild(style);
