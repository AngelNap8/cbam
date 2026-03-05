'use client';

import { useState } from 'react';
import Link from 'next/link';
import CarbonPriceDisplay from '@/components/CarbonPriceDisplay';
import { EU_ETS_CONFIG } from '@/lib/carbonPrice';

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

// Current EU ETS price — managed in /src/lib/carbonPrice.ts
const EU_ETS_PRICE = EU_ETS_CONFIG.price;

// 2026 default value markup
const DEFAULT_MARKUP_2026 = 0.10;

type Step = 1 | 2 | 3 | 4;

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

    const handleCalculate = () => {
        const calculatedResult = calculateCBAM();
        setResult(calculatedResult);
        setShowResult(true);
    };

    const nextStep = () => {
        if (step < 4) setStep((step + 1) as Step);
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
            case 4: {
                const hasValidEmission = emissionSource === 'default' || (!!actualEmissions && parseFloat(actualEmissions) > 0);
                return hasValidEmission;
            }
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
                            <p className="text-slate-400">
                                Based on EU ETS price of €{EU_ETS_PRICE}/tonne CO₂ ·{' '}
                                <a href="https://www.eex.com/en/markets/environmental-markets/eu-ets-auctions" target="_blank" rel="noopener noreferrer" className="text-eu-blue-400 hover:underline text-sm">EEX source ↗</a>
                            </p>
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

                        {/* Savings Opportunity — Lead Funnel */}
                        {result.markup > 0 && (
                            <div className="p-6 rounded-2xl border-2 border-carbon-500/40 bg-carbon-500/5 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-carbon-500/20 flex items-center justify-center flex-shrink-0 text-xl">
                                        💰
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-carbon-300 mb-1">You Could Be Overpaying</h3>
                                        <p className="text-sm text-slate-400 mb-3">
                                            This estimate uses <strong>EU default values</strong> with a {result.markup}% penalty markup.
                                            Real supplier emissions are typically 40-60% lower. With verified data, your cost could drop to
                                            as low as <strong className="text-carbon-400">€{(result.netCost * 0.45).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong>.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Link href="/supplier-kit" className="btn-secondary text-sm py-2 px-4">
                                                Get Supplier Data Kit →
                                            </Link>
                                            <Link href="/savings" className="text-sm text-eu-blue-400 hover:underline flex items-center gap-1 py-2">
                                                Calculate exact savings →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={resetCalculator} className="btn-outline flex-1">
                                Calculate Another
                            </button>
                            <Link href="/contact" className="btn-primary flex-1 text-center">
                                Request Free Assessment
                            </Link>
                        </div>

                        {/* Trust Footer */}
                        <div className="mt-8 p-4 rounded-xl bg-slate-800/50 border border-white/5">
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
                                <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0956" target="_blank" rel="noopener noreferrer" className="hover:text-eu-blue-400 transition-colors">
                                    📄 Reg. (EU) 2023/956
                                </a>
                                <Link href="/methodology" className="hover:text-eu-blue-400 transition-colors">
                                    📐 Our Methodology
                                </Link>
                                <span>🔒 No Data Stored</span>
                                <span>⚠️ Estimation Only</span>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <p className="text-xs text-amber-200/80 text-center">
                                This estimate is for informational purposes only, per{' '}
                                <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0956" target="_blank" rel="noopener noreferrer" className="underline">Regulation (EU) 2023/956</a>.
                                Actual costs depend on verified emission data, EU ETS price fluctuations, and origin country carbon pricing.
                                Consult a qualified CBAM advisor for compliance.
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
                    <p className="text-slate-400 mb-4">
                        Estimate your Carbon Border Adjustment Mechanism certificate costs in 4 simple steps.
                    </p>
                    <div className="flex justify-center">
                        <CarbonPriceDisplay compact={true} />
                    </div>
                    <p className="text-xs text-amber-400/80 mt-3">
                        ⚠️ This is an estimation tool, not an official EU platform. Actual costs depend on verified data and current ETS prices.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-3">
                        {[1, 2, 3, 4].map((s) => (
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
                        <div className="progress-fill" style={{ width: `${((step - 1) / 3) * 100}%` }} />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>Product</span>
                        <span>Quantity</span>
                        <span>Origin</span>
                        <span>Emissions</span>
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

                    {/* Step 4 auto-calculates when proceeding */}
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
                                <div className="mb-6">
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

                            <button
                                onClick={handleCalculate}
                                disabled={emissionSource === 'actual' && (!actualEmissions || parseFloat(actualEmissions) <= 0)}
                                className="btn-secondary w-full py-4 text-lg disabled:opacity-50"
                            >
                                Calculate CBAM Cost
                            </button>
                        </div>
                    )}

                    {step < 4 && (
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
