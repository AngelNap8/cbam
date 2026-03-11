'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SupplierKitPage() {
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [supplierCountry, setSupplierCountry] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const supplierLink = `https://cbam-calculator.eu/supplier`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch('https://formspree.io/f/mjggvlew', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestType: 'Supplier Data Kit Request',
                    email,
                    company,
                    supplierCountry,
                    supplierLink,
                }),
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error('Form error:', error);
            // Still show the link even if Formspree fails
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(supplierLink);
    };

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

                {!isSubmitted ? (
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
                                            <option value="China">🇨🇳 China</option>
                                            <option value="Turkey">🇹🇷 Turkey</option>
                                            <option value="India">🇮🇳 India</option>
                                            <option value="Taiwan">🇹🇼 Taiwan</option>
                                            <option value="Vietnam">🇻🇳 Vietnam</option>
                                            <option value="Other">🌍 Other</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!email || !company || !supplierCountry || isSubmitting}
                                        className="btn-secondary w-full py-4 text-lg disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                Generating...
                                            </>
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
                ) : (
                    /* Success State — Show the supplier link */
                    <div className="max-w-2xl mx-auto space-y-8">
                        {/* Success Banner */}
                        <div className="card p-8 md:p-12 text-center glow-green">
                            <div className="w-20 h-20 rounded-full gradient-carbon flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Your Supplier Data Kit is Ready!</h2>
                            <p className="text-slate-400 mb-8">
                                Share the link below with your supplier. They will see a simple form in their language (Chinese, Turkish, or English).
                            </p>

                            {/* Supplier Link Box */}
                            <div className="p-4 rounded-xl bg-slate-800/80 border border-white/10 mb-6">
                                <p className="text-xs text-slate-500 mb-2">Your Supplier Link</p>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 text-sm md:text-base text-eu-blue-300 break-all text-left">
                                        {supplierLink}
                                    </code>
                                    <button
                                        onClick={copyLink}
                                        className="btn-primary px-4 py-2 text-sm flex-shrink-0"
                                        title="Copy link"
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                            </div>

                            {/* Email Template */}
                            <div className="text-left p-4 rounded-xl bg-slate-800/50 border border-white/5">
                                <p className="text-xs text-slate-500 mb-3 text-center">Suggested email to your supplier:</p>
                                <div className="text-sm text-slate-300 space-y-2 italic">
                                    <p>Dear Supplier,</p>
                                    <p>
                                        Under the new EU CBAM regulation, we are required to report the carbon emissions
                                        embedded in our imports. To avoid penalty charges, we need your actual emission data.
                                    </p>
                                    <p>
                                        Please complete this short form (10 minutes, available in Chinese/Turkish/English):
                                    </p>
                                    <p className="text-eu-blue-300 not-italic font-medium">{supplierLink}</p>
                                    <p>Thank you for your cooperation.</p>
                                </div>
                            </div>
                        </div>

                        {/* What Happens Next */}
                        <div className="card p-6">
                            <h3 className="font-semibold mb-4">What Happens Next?</h3>
                            <div className="space-y-3 text-sm text-slate-400">
                                <div className="flex items-start gap-3">
                                    <span className="text-carbon-400 font-bold">1.</span>
                                    <p>Your supplier opens the link and sees the form in their preferred language.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-carbon-400 font-bold">2.</span>
                                    <p>They answer basic questions about their energy usage, steel source, and production process (~10 min).</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-carbon-400 font-bold">3.</span>
                                    <p>The data is submitted to <strong className="text-white">{email}</strong> and you can use it for your CBAM declaration.</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/" className="btn-primary">
                                Return to Home
                            </Link>
                            <Link href="/savings" className="btn-secondary">
                                Try Savings Calculator
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
