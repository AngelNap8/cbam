'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CarbonPriceDisplay from '@/components/CarbonPriceDisplay';
import { EU_ETS_CONFIG } from '@/lib/carbonPrice';

// Fastener products with realistic emission ranges
const FASTENER_PRODUCTS = [
    { id: 'screws', name: 'Screws (Self-tapping, Wood, Machine)', hsCode: '7318.11-15', defaultEmission: 2.50, realEmissionLow: 1.20, realEmissionHigh: 1.80 },
    { id: 'bolts', name: 'Bolts and Bolt Blanks', hsCode: '7318.15', defaultEmission: 2.45, realEmissionLow: 1.15, realEmissionHigh: 1.75 },
    { id: 'nuts', name: 'Nuts (Hex, Lock, Wing)', hsCode: '7318.16', defaultEmission: 2.40, realEmissionLow: 1.10, realEmissionHigh: 1.65 },
    { id: 'washers', name: 'Washers (Flat, Spring, Lock)', hsCode: '7318.21-22', defaultEmission: 2.35, realEmissionLow: 1.05, realEmissionHigh: 1.60 },
    { id: 'rivets', name: 'Rivets', hsCode: '7318.23', defaultEmission: 2.55, realEmissionLow: 1.25, realEmissionHigh: 1.85 },
    { id: 'pins', name: 'Cotters, Cotter-pins, Clips', hsCode: '7318.24', defaultEmission: 2.30, realEmissionLow: 1.00, realEmissionHigh: 1.55 },
    { id: 'other', name: 'Other Threaded Fasteners', hsCode: '7318.29', defaultEmission: 2.50, realEmissionLow: 1.20, realEmissionHigh: 1.80 },
];

const ORIGIN_COUNTRIES = [
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
];

// 2026 values — price managed centrally in /src/lib/carbonPrice.ts
const EU_ETS_PRICE = EU_ETS_CONFIG.price;
const DEFAULT_MARKUP_2026 = 0.10;

export default function SavingsCalculatorPage() {
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [origin, setOrigin] = useState('');
    const [calculated, setCalculated] = useState(false);
    const [emailRequested, setEmailRequested] = useState(false);
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedProduct = FASTENER_PRODUCTS.find(p => p.id === product);
    const selectedOrigin = ORIGIN_COUNTRIES.find(c => c.code === origin);
    const qty = parseFloat(quantity) || 0;

    const calculate = () => {
        if (product && quantity && origin && qty > 0) {
            setEmailRequested(true);
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch('https://formspree.io/f/mjggvlew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Savings Calculator Request',
                    email,
                    companyName,
                    product: selectedProduct?.name,
                    quantity,
                    originCountry: selectedOrigin?.name,
                }),
            });

            setCalculated(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Show result anyway on error to not block user
            setCalculated(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setProduct('');
        setQuantity('');
        setOrigin('');
        setCalculated(false);
        setEmailRequested(false);
        setEmail('');
        setCompanyName('');
    };

    // Calculations
    const defaultEmissionWithMarkup = selectedProduct
        ? selectedProduct.defaultEmission * (1 + DEFAULT_MARKUP_2026)
        : 0;
    const defaultCost = qty * defaultEmissionWithMarkup * EU_ETS_PRICE;

    const avgRealEmission = selectedProduct
        ? (selectedProduct.realEmissionLow + selectedProduct.realEmissionHigh) / 2
        : 0;
    const realCost = qty * avgRealEmission * EU_ETS_PRICE;

    const savings = defaultCost - realCost;
    const savingsPercent = defaultCost > 0 ? (savings / defaultCost) * 100 : 0;

    return (
        <div className="section-padding">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="badge badge-amber mb-4">The Hidden Cost</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Are You <span className="text-gradient-eu">Overpaying</span> on CBAM?
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-6">
                        EU Default Values are <strong>designed to be punitive</strong>. See how much you could save
                        with real supplier emission data.
                    </p>
                    <div className="flex justify-center">
                        <CarbonPriceDisplay compact={true} />
                    </div>
                </div>

                {!calculated && !emailRequested && (
                    /* Input Form */
                    <div className="card p-6 md:p-8">
                        <h2 className="text-xl font-semibold mb-6">Calculate Your Potential Savings</h2>

                        <div className="space-y-6">
                            {/* Product Selection */}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Fastener Type *</label>
                                <select
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                    className="select-field"
                                >
                                    <option value="">Select product...</option>
                                    {FASTENER_PRODUCTS.map(p => (
                                        <option key={p.id} value={p.id}>{p.name} (HS {p.hsCode})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Annual Import Volume (tonnes) *</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="e.g., 100"
                                    className="input-field"
                                    min="1"
                                />
                            </div>

                            {/* Origin Country */}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Primary Origin Country *</label>
                                <select
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    className="select-field"
                                >
                                    <option value="">Select country...</option>
                                    {ORIGIN_COUNTRIES.map(c => (
                                        <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={calculate}
                                disabled={!product || !quantity || !origin || qty <= 0}
                                className="btn-primary w-full py-4 text-lg disabled:opacity-50"
                            >
                                Calculate My Savings
                            </button>
                        </div>
                    </div>
                )}

                {emailRequested && !calculated && (
                    /* Email Gate Form */
                    <div className="card p-6 md:p-8 max-w-lg mx-auto glow-blue text-center">
                        <div className="w-16 h-16 rounded-full bg-eu-blue-500/20 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🔒</span>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Your Results Are Ready</h2>
                        <p className="text-slate-400 mb-6 text-sm">
                            Enter your email to view your detailed savings calculation and receive a summary.
                        </p>

                        <form onSubmit={handleEmailSubmit} className="space-y-4 text-left">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Business Email *</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Company Name (Optional)</label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Your Company Ltd"
                                    className="input-field"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!email || isSubmitting}
                                className="btn-primary w-full py-3 mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Unlock My Savings Results'
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setEmailRequested(false)}
                                disabled={isSubmitting}
                                className="w-full text-sm text-slate-500 hover:text-white mt-2 transition-colors"
                            >
                                ← Back to edit details
                            </button>
                        </form>
                    </div>
                )}

                {calculated && (
                    /* Results */
                    <div className="space-y-6">
                        {/* Savings Banner */}
                        <div className="card p-8 text-center border-2 border-red-500/50 bg-red-500/5">
                            <p className="text-sm text-red-400 mb-2">Using EU Default Values, You Are Overpaying</p>
                            <p className="text-5xl md:text-6xl font-bold text-red-400">
                                €{savings.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </p>
                            <p className="text-lg text-red-300 mt-2">per year</p>
                        </div>

                        {/* Comparison Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Default Value Card */}
                            <div className="card p-6 border-red-500/30">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="badge badge-red">Current: Default Values</span>
                                </div>
                                <p className="text-sm text-slate-400 mb-1">Annual CBAM Cost</p>
                                <p className="text-3xl font-bold text-red-400">
                                    €{defaultCost.toLocaleString('de-DE', { minimumFractionDigits: 0 })}
                                </p>
                                <div className="mt-4 pt-4 border-t border-white/10 text-sm text-slate-500">
                                    <p>Emission Factor: {defaultEmissionWithMarkup.toFixed(2)} tCO₂e/t</p>
                                    <p className="text-amber-400">Includes 10% markup penalty</p>
                                </div>
                            </div>

                            {/* Real Data Card */}
                            <div className="card p-6 border-carbon-500/50 glow-green">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="badge badge-green">With Real Supplier Data</span>
                                </div>
                                <p className="text-sm text-slate-400 mb-1">Estimated CBAM Cost</p>
                                <p className="text-3xl font-bold text-carbon-400">
                                    €{realCost.toLocaleString('de-DE', { minimumFractionDigits: 0 })}
                                </p>
                                <div className="mt-4 pt-4 border-t border-white/10 text-sm text-slate-500">
                                    <p>Estimated Emission: {avgRealEmission.toFixed(2)} tCO₂e/t</p>
                                    <p className="text-carbon-400">No markup applied</p>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="card p-6 bg-slate-800/50">
                            <h3 className="font-semibold mb-4">Your Calculation Summary</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-slate-500">Product</p>
                                    <p className="font-medium">{selectedProduct?.name}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500">Origin</p>
                                    <p className="font-medium">{selectedOrigin?.flag} {selectedOrigin?.name}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500">Annual Volume</p>
                                    <p className="font-medium">{qty.toLocaleString()} tonnes</p>
                                </div>
                                <div>
                                    <p className="text-slate-500">Potential Savings</p>
                                    <p className="font-medium text-carbon-400">{savingsPercent.toFixed(0)}%</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="card p-8 text-center glow-blue">
                            <h3 className="text-2xl font-bold mb-4">
                                Stop Overpaying. Get Real Data.
                            </h3>
                            <p className="text-slate-400 mb-6">
                                We&apos;ll provide you with a Supplier Data Kit — a simple form your
                                {selectedOrigin?.name === 'China' ? ' Chinese' : selectedOrigin?.name === 'Turkey' ? ' Turkish' : ''} supplier
                                can complete in their language.
                            </p>
                            <Link href="/supplier-kit" className="btn-secondary text-lg px-8 py-4 inline-block">
                                Get Supplier Data Kit →
                            </Link>
                            <div className="mt-3">
                                <Link href="/contact" className="text-sm text-eu-blue-400 hover:underline">
                                    Or request a free assessment with a CBAM advisor
                                </Link>
                            </div>
                        </div>

                        {/* Reset */}
                        <div className="text-center">
                            <button onClick={reset} className="btn-outline">
                                Calculate Another Product
                            </button>
                        </div>
                    </div>
                )}

                {/* Why Default Values Are Bad */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Why EU Default Values Cost You More
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="card p-6">
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="font-semibold mb-2">Deliberately High</h3>
                            <p className="text-sm text-slate-400">
                                The EU sets default values based on the <strong>worst-performing producers</strong> to
                                incentivize real data collection.
                            </p>
                        </div>
                        <div className="card p-6">
                            <div className="text-3xl mb-3">📈</div>
                            <h3 className="font-semibold mb-2">10% Markup in 2026</h3>
                            <p className="text-sm text-slate-400">
                                On top of already high defaults, a <strong>10% penalty markup</strong> is added if
                                you don&apos;t provide real data. This rises to 30% by 2028
                                (<a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0956" target="_blank" rel="noopener noreferrer" className="text-eu-blue-400 hover:underline">Art. 36, Reg. 2023/956</a>).
                            </p>
                        </div>
                        <div className="card p-6">
                            <div className="text-3xl mb-3">🏭</div>
                            <h3 className="font-semibold mb-2">Your Supplier Is Better</h3>
                            <p className="text-sm text-slate-400">
                                Most modern Asian factories have <strong>40-60% lower emissions</strong> than the
                                EU defaults assume.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
