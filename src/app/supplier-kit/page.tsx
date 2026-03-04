'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SupplierKitPage() {
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [supplierCountry, setSupplierCountry] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch('https://formspree.io/f/mjggvlew', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    company,
                    supplierCountry,
                    requestType: 'Supplier Data Kit Request',
                    timestamp: new Date().toISOString(),
                    source: 'CBAM Calculator - Supplier Kit',
                }),
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="section-padding">
                <div className="container-custom max-w-2xl">
                    <div className="card p-8 md:p-12 text-center glow-green">
                        <div className="w-20 h-20 rounded-full gradient-carbon flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Supplier Link Generated!</h1>
                        <p className="text-slate-400 mb-6">
                            We&apos;ve sent the Supplier Data Kit to <strong className="text-white">{email}</strong>.
                        </p>

                        <div className="card p-6 mb-8 text-left">
                            <h3 className="font-semibold mb-3">What&apos;s Included:</h3>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-carbon-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Unique supplier form link
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-carbon-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Form available in {supplierCountry === 'CN' ? 'Chinese (中文)' : supplierCountry === 'TR' ? 'Turkish (Türkçe)' : 'English'}
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-carbon-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Email template to send to your supplier
                                </li>
                            </ul>
                        </div>

                        <p className="text-sm text-slate-500 mb-6">
                            Check your inbox (and spam folder) for the kit.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/supplier" className="btn-secondary">
                                Preview Supplier Form
                            </Link>
                            <Link href="/" className="btn-outline">
                                Return Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section-padding">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="badge badge-green mb-4">The Solution</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Get Real <span className="text-gradient-carbon">Supplier Data</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        We make it easy for your Asian suppliers to provide the emission data you need —
                        in their language, without the complexity.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* How It Works */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">How the Supplier Data Kit Works</h2>

                        <div className="space-y-4">
                            <div className="card p-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full gradient-eu flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                                    <div>
                                        <h3 className="font-medium mb-1">You Request a Kit</h3>
                                        <p className="text-sm text-slate-400">Enter your email and we generate a unique supplier link.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full gradient-eu flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                                    <div>
                                        <h3 className="font-medium mb-1">Send Link to Your Supplier</h3>
                                        <p className="text-sm text-slate-400">Forward the link to your factory in China, Turkey, or elsewhere. They see a form in their language.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full gradient-eu flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                                    <div>
                                        <h3 className="font-medium mb-1">Supplier Fills Simple Form</h3>
                                        <p className="text-sm text-slate-400">They answer basic questions about electricity, production, steel source. Takes ~10 minutes.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full gradient-carbon flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                                    <div>
                                        <h3 className="font-medium mb-1">You Get Real Data</h3>
                                        <p className="text-sm text-slate-400">Receive a reference with their emission data, ready for your CBAM declaration.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Supported Languages */}
                        <div className="card p-6">
                            <h3 className="font-medium mb-3">Supported Languages</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="badge badge-blue">🇬🇧 English</span>
                                <span className="badge badge-blue">🇨🇳 中文 (Chinese)</span>
                                <span className="badge badge-blue">🇹🇷 Türkçe (Turkish)</span>
                            </div>
                        </div>
                    </div>

                    {/* Request Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="card p-6 md:p-8 glow-blue">
                            <h2 className="text-xl font-semibold mb-6">Get Your Supplier Data Kit</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Your Business Email *</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        className="input-field"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Company Name *</label>
                                    <input
                                        type="text"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        placeholder="Your Company Ltd."
                                        className="input-field"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Supplier&apos;s Primary Country *</label>
                                    <select
                                        value={supplierCountry}
                                        onChange={(e) => setSupplierCountry(e.target.value)}
                                        className="select-field"
                                        required
                                    >
                                        <option value="">Select country...</option>
                                        <option value="CN">🇨🇳 China</option>
                                        <option value="TR">🇹🇷 Turkey</option>
                                        <option value="IN">🇮🇳 India</option>
                                        <option value="TW">🇹🇼 Taiwan</option>
                                        <option value="VN">🇻🇳 Vietnam</option>
                                        <option value="OTHER">🌍 Other</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !email || !company || !supplierCountry}
                                    className="btn-secondary w-full py-4 text-lg disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Generating...
                                        </span>
                                    ) : (
                                        'Generate Supplier Link'
                                    )}
                                </button>
                            </div>

                            <p className="text-xs text-slate-500 text-center mt-4">
                                Free. No credit card required. We respect your privacy.
                            </p>
                        </form>

                        {/* Already Have Link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-slate-400">
                                Already have a supplier link?{' '}
                                <Link href="/supplier" className="text-eu-blue-300 hover:underline">
                                    View Supplier Form →
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
