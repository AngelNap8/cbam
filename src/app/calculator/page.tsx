'use client';

import { useState } from 'react';
import Link from 'next/link';

// CBAM Data based on EU regulations
const CBAM_PRODUCTS = {
    cement: {
        name: 'Cement',
        icon: '🧱',
        defaultEmissions: 0.83, // tCO2e per tonne
        unit: 'tonnes',
    },
    steel_crude: {
        name: 'Steel (Crude/Pig Iron)',
        icon: '🔩',
        defaultEmissions: 1.85,
        unit: 'tonnes',
    },
    steel_products: {
        name: 'Steel Products (Finished)',
        icon: '⚙️',
        defaultEmissions: 2.10,
        unit: 'tonnes',
    },
    aluminum_unwrought: {
        name: 'Aluminum (Unwrought)',
        icon: '🪙',
        defaultEmissions: 8.20,
        unit: 'tonnes',
    },
    aluminum_products: {
        name: 'Aluminum Products',
        icon: '📦',
        defaultEmissions: 9.50,
        unit: 'tonnes',
    },
    fertilizers_ammonia: {
        name: 'Fertilizers (Ammonia-based)',
        icon: '🌱',
        defaultEmissions: 2.40,
        unit: 'tonnes',
    },
    fertilizers_nitric: {
        name: 'Fertilizers (Nitric Acid)',
        icon: '🧪',
        defaultEmissions: 2.80,
        unit: 'tonnes',
    },
    hydrogen: {
        name: 'Hydrogen',
        icon: '💨',
        defaultEmissions: 9.00,
        unit: 'tonnes',
    },
    electricity: {
        name: 'Electricity',
        icon: '⚡',
        defaultEmissions: 0.45,
        unit: 'MWh',
    },
};

const ORIGIN_COUNTRIES = [
    { code: 'CN', name: 'China', carbonPrice: 8 },
    { code: 'IN', name: 'India', carbonPrice: 0 },
    { code: 'RU', name: 'Russia', carbonPrice: 0 },
    { code: 'TR', name: 'Turkey', carbonPrice: 5 },
    { code: 'UA', name: 'Ukraine', carbonPrice: 0 },
    { code: 'EG', name: 'Egypt', carbonPrice: 0 },
    { code: 'BR', name: 'Brazil', carbonPrice: 0 },
    { code: 'ZA', name: 'South Africa', carbonPrice: 9 },
    { code: 'KR', name: 'South Korea', carbonPrice: 15 },
    { code: 'JP', name: 'Japan', carbonPrice: 3 },
    { code: 'US', name: 'United States', carbonPrice: 0 },
    { code: 'OTHER', name: 'Other (No carbon price)', carbonPrice: 0 },
];

// Current EU ETS price (as of January 2026)
const EU_ETS_PRICE = 85; // EUR per tonne CO2

// 2026 default value markup
const DEFAULT_MARKUP_2026 = 0.10;

type Step = 1 | 2 | 3 | 4 | 5;

interface CalculationResult {
    grossCost: number;
    originDeduction: number;
    netCost: number;
    emissions: number;
    certificates: number;
    markup: number;
}

export default function CalculatorPage() {
    const [step, setStep] = useState<Step>(1);
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [originCountry, setOriginCountry] = useState<string>('');
    const [emissionSource, setEmissionSource] = useState<'default' | 'actual'>('default');
    const [actualEmissions, setActualEmissions] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [showResult, setShowResult] = useState(false);

    const calculateCBAM = (): CalculationResult => {
        const product = CBAM_PRODUCTS[selectedProduct as keyof typeof CBAM_PRODUCTS];
        const country = ORIGIN_COUNTRIES.find(c => c.code === originCountry);
        const qty = parseFloat(quantity) || 0;

        let emissionsPerUnit = emissionSource === 'default'
            ? product.defaultEmissions
            : parseFloat(actualEmissions) || product.defaultEmissions;

        // Apply 10% markup for default values in 2026
        const markup = emissionSource === 'default' ? emissionsPerUnit * DEFAULT_MARKUP_2026 : 0;
        emissionsPerUnit += markup;

        const totalEmissions = qty * emissionsPerUnit;
        const grossCost = totalEmissions * EU_ETS_PRICE;
        const originDeduction = totalEmissions * (country?.carbonPrice || 0);
        const netCost = Math.max(0, grossCost - originDeduction);

        return {
            grossCost,
            originDeduction,
            netCost,
            emissions: totalEmissions,
            certificates: totalEmissions,
            markup: emissionSource === 'default' ? DEFAULT_MARKUP_2026 * 100 : 0,
        };
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const calculatedResult = calculateCBAM();

        // Show results immediately - leads are captured via contact form
        setTimeout(() => {
            setResult(calculatedResult);
            setShowResult(true);
            setIsSubmitting(false);
        }, 500);
    };

    const nextStep = () => {
        if (step < 5) setStep((step + 1) as Step);
    };

    const prevStep = () => {
        if (step > 1) setStep((step - 1) as Step);
    };

    const resetCalculator = () => {
        setStep(1);
        setSelectedProduct('');
        setQuantity('');
        setOriginCountry('');
        setEmissionSource('default');
        setActualEmissions('');
        setEmail('');
        setCompanyName('');
        setResult(null);
        setShowResult(false);
    };

    const canProceed = () => {
        switch (step) {
            case 1: return !!selectedProduct;
            case 2: return !!quantity && parseFloat(quantity) > 0;
            case 3: return !!originCountry;
            case 4: return emissionSource === 'default' || (!!actualEmissions && parseFloat(actualEmissions) > 0);
            default: return true;
        }
    };

    const product = selectedProduct ? CBAM_PRODUCTS[selectedProduct as keyof typeof CBAM_PRODUCTS] : null;
    const country = originCountry ? ORIGIN_COUNTRIES.find(c => c.code === originCountry) : null;

    if (showResult && result) {
        return (
            <div className="section-padding">
                <div className="container-custom max-w-3xl">
                    <div className="card p-8 md:p-12 glow-green">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 rounded-full gradient-carbon flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your CBAM Estimate</h1>
                            <p className="text-slate-400">Based on current EU ETS price of €{EU_ETS_PRICE}/tonne CO₂</p>
                        </div>

                        {/* Main Result */}
                        <div className="bg-slate-900/50 rounded-2xl p-6 md:p-8 text-center mb-8">
                            <p className="text-sm text-slate-400 mb-2">Estimated CBAM Certificate Cost</p>
                            <p className="text-5xl md:text-6xl font-bold text-gradient-carbon">
                                €{result.netCost.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>

                        {/* Breakdown */}
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-slate-400">Product</span>
                                <span className="font-medium">{product?.icon} {product?.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-slate-400">Quantity</span>
                                <span className="font-medium">{parseFloat(quantity).toLocaleString()} {product?.unit}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-slate-400">Origin Country</span>
                                <span className="font-medium">{country?.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-slate-400">Total Emissions</span>
                                <span className="font-medium">{result.emissions.toFixed(2)} tCO₂e</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-slate-400">Certificates Required</span>
                                <span className="font-medium">{result.certificates.toFixed(2)}</span>
                            </div>
                            {result.markup > 0 && (
                                <div className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span className="text-amber-400">Default Value Markup (2026)</span>
                                    <span className="font-medium text-amber-400">+{result.markup}%</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-slate-400">Gross CBAM Cost</span>
                                <span className="font-medium">€{result.grossCost.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                            </div>
                            {result.originDeduction > 0 && (
                                <div className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span className="text-carbon-400">Origin Carbon Price Deduction</span>
                                    <span className="font-medium text-carbon-400">-€{result.originDeduction.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={resetCalculator} className="btn-outline flex-1">
                                Calculate Another
                            </button>
                            <Link href="/contact" className="btn-primary flex-1 text-center">
                                Get Expert Consultation
                            </Link>
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <p className="text-xs text-amber-200/80 text-center">
                                This estimate is for informational purposes only. Actual CBAM costs may vary based on
                                verified emission data, EU ETS price fluctuations, and regulatory updates.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section-padding">
            <div className="container-custom max-w-3xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        CBAM Cost <span className="text-gradient-eu">Calculator</span>
                    </h1>
                    <p className="text-slate-400">
                        Estimate your Carbon Border Adjustment Mechanism certificate costs in 4 simple steps.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div
                                key={s}
                                className={`step-indicator ${s < step ? 'completed' : s === step ? 'active' : 'pending'
                                    }`}
                            >
                                {s < step ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    s
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${((step - 1) / 4) * 100}%` }} />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>Product</span>
                        <span>Quantity</span>
                        <span>Origin</span>
                        <span>Emissions</span>
                        <span>Report</span>
                    </div>
                </div>

                {/* Step Content */}
                <div className="card p-6 md:p-8">
                    {/* Step 1: Select Product */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Select Product Category</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {Object.entries(CBAM_PRODUCTS).map(([key, prod]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedProduct(key)}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${selectedProduct === key
                                            ? 'border-eu-blue-500 bg-eu-blue-500/10'
                                            : 'border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">{prod.icon}</div>
                                        <div className="text-sm font-medium">{prod.name}</div>
                                        <div className="text-xs text-slate-500 mt-1">
                                            {prod.defaultEmissions} tCO₂e/{prod.unit}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Enter Quantity */}
                    {step === 2 && product && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Enter Import Quantity</h2>
                            <div className="mb-6">
                                <label className="block text-sm text-slate-400 mb-2">
                                    Quantity of {product.name} ({product.unit})
                                </label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder={`Enter quantity in ${product.unit}`}
                                    className="input-field text-lg"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            {quantity && parseFloat(quantity) > 0 && (
                                <div className="p-4 rounded-xl bg-slate-800/50 text-sm">
                                    <p className="text-slate-400">
                                        Estimated emissions using default values:
                                    </p>
                                    <p className="text-lg font-semibold text-carbon-400 mt-1">
                                        {(parseFloat(quantity) * product.defaultEmissions).toFixed(2)} tCO₂e
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Select Origin Country */}
                    {step === 3 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Select Country of Origin</h2>
                            <select
                                value={originCountry}
                                onChange={(e) => setOriginCountry(e.target.value)}
                                className="select-field text-lg mb-6"
                            >
                                <option value="">Choose country...</option>
                                {ORIGIN_COUNTRIES.map((c) => (
                                    <option key={c.code} value={c.code}>
                                        {c.name} {c.carbonPrice > 0 ? `(Carbon price: €${c.carbonPrice}/t)` : ''}
                                    </option>
                                ))}
                            </select>
                            {country && country.carbonPrice > 0 && (
                                <div className="p-4 rounded-xl bg-carbon-500/10 border border-carbon-500/20">
                                    <p className="text-sm text-carbon-300">
                                        <strong>Good news!</strong> {country.name} has a carbon price of €{country.carbonPrice}/tonne.
                                        This will be deducted from your CBAM liability.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 4: Emission Data Source */}
                    {step === 4 && product && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Emission Data Source</h2>
                            <div className="space-y-4 mb-6">
                                <button
                                    onClick={() => setEmissionSource('default')}
                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${emissionSource === 'default'
                                        ? 'border-eu-blue-500 bg-eu-blue-500/10'
                                        : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="font-medium mb-1">Use Default Values</div>
                                    <div className="text-sm text-slate-400">
                                        Standard EU default: {product.defaultEmissions} tCO₂e/{product.unit}
                                    </div>
                                    <div className="text-xs text-amber-400 mt-2">
                                        ⚠️ 10% markup applies for 2026
                                    </div>
                                </button>
                                <button
                                    onClick={() => setEmissionSource('actual')}
                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${emissionSource === 'actual'
                                        ? 'border-carbon-500 bg-carbon-500/10'
                                        : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="font-medium mb-1">Enter Actual Emissions</div>
                                    <div className="text-sm text-slate-400">
                                        Use verified data from your supplier
                                    </div>
                                    <div className="text-xs text-carbon-400 mt-2">
                                        ✓ No markup applies
                                    </div>
                                </button>
                            </div>

                            {emissionSource === 'actual' && (
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">
                                        Actual emissions (tCO₂e per {product.unit})
                                    </label>
                                    <input
                                        type="number"
                                        value={actualEmissions}
                                        onChange={(e) => setActualEmissions(e.target.value)}
                                        placeholder="Enter verified emission factor"
                                        className="input-field"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 5: Email Gate */}
                    {step === 5 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Get Your CBAM Report</h2>
                            <p className="text-slate-400 text-sm mb-6">
                                Enter your details to receive a detailed cost breakdown and PDF report.
                            </p>
                            <form onSubmit={handleEmailSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Business Email *</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@company.com"
                                        className="input-field"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="Your Company Ltd."
                                        className="input-field"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!email || isSubmitting}
                                    className="btn-secondary w-full py-4 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Calculating...
                                        </span>
                                    ) : (
                                        'Generate CBAM Report'
                                    )}
                                </button>
                            </form>
                            <p className="text-xs text-slate-500 text-center mt-4">
                                By submitting, you agree to receive your report and occasional updates.
                                We respect your privacy.
                            </p>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {step < 5 && (
                        <div className="flex gap-4 mt-8">
                            {step > 1 && (
                                <button onClick={prevStep} className="btn-outline flex-1">
                                    ← Back
                                </button>
                            )}
                            <button
                                onClick={nextStep}
                                disabled={!canProceed()}
                                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue →
                            </button>
                        </div>
                    )}
                    {step === 5 && (
                        <button onClick={prevStep} className="btn-outline w-full mt-4">
                            ← Back to Edit
                        </button>
                    )}
                </div>

                {/* Summary Sidebar */}
                {step > 1 && (
                    <div className="mt-6 p-4 rounded-xl bg-slate-800/30 border border-white/5">
                        <h3 className="text-sm font-medium text-slate-400 mb-3">Current Selection</h3>
                        <div className="flex flex-wrap gap-2">
                            {product && (
                                <span className="badge badge-blue">{product.icon} {product.name}</span>
                            )}
                            {quantity && (
                                <span className="badge badge-green">{quantity} {product?.unit}</span>
                            )}
                            {country && (
                                <span className="badge badge-amber">{country.name}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
