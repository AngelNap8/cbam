'use client';

import { useState } from 'react';
import Link from 'next/link';

type Step = 1 | 2 | 3 | 4 | 5 | 'result';

interface PreCheckResult {
    isSubject: boolean;
    reason: string;
    nextSteps: string[];
}

const CBAM_PRODUCTS = [
    { id: 'cement', name: 'Cement', icon: '🧱' },
    { id: 'iron_steel', name: 'Iron & Steel', icon: '🔩' },
    { id: 'aluminum', name: 'Aluminum', icon: '🪙' },
    { id: 'fertilizers', name: 'Fertilizers', icon: '🌱' },
    { id: 'hydrogen', name: 'Hydrogen', icon: '💨' },
    { id: 'electricity', name: 'Electricity', icon: '⚡' },
    { id: 'other', name: 'Other goods (not listed)', icon: '📦' },
];

const EU_COUNTRIES = [
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
    'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
    'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta',
    'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia',
    'Spain', 'Sweden', 'Liechtenstein', 'Norway', 'Iceland', 'Switzerland'
];

export default function PreCheckPage() {
    const [step, setStep] = useState<Step>(1);
    const [answers, setAnswers] = useState({
        importsToEU: null as boolean | null,
        productCategory: '',
        originCountry: '',
        annualValue: '',
        isImporterOfRecord: null as boolean | null,
    });
    const [result, setResult] = useState<PreCheckResult | null>(null);

    const evaluateObligation = () => {
        // Check each condition
        if (!answers.importsToEU) {
            return {
                isSubject: false,
                reason: 'CBAM only applies to goods imported into the EU.',
                nextSteps: ['If you plan to import to the EU in the future, revisit this check.'],
            };
        }

        if (answers.productCategory === 'other') {
            return {
                isSubject: false,
                reason: 'CBAM currently only covers: Cement, Iron & Steel, Aluminum, Fertilizers, Hydrogen, and Electricity.',
                nextSteps: [
                    'The EU may expand CBAM to other sectors in the future.',
                    'Check the official EU CBAM website for updates.',
                ],
            };
        }

        if (EU_COUNTRIES.includes(answers.originCountry)) {
            return {
                isSubject: false,
                reason: `Goods originating from ${answers.originCountry} are not subject to CBAM as they are within the EU/EFTA carbon pricing system.`,
                nextSteps: ['No CBAM declaration required for EU/EFTA origin goods.'],
            };
        }

        const annualValueNum = parseFloat(answers.annualValue) || 0;
        if (annualValueNum < 150) {
            return {
                isSubject: false,
                reason: 'Imports with a value under €150 per consignment may be exempt under de minimis rules.',
                nextSteps: [
                    'This exemption applies per shipment, not annual total.',
                    'If you have multiple shipments, you may still be subject to CBAM.',
                ],
            };
        }

        if (!answers.isImporterOfRecord) {
            return {
                isSubject: true,
                reason: 'You may still have CBAM obligations if the importer of record acts on your behalf.',
                nextSteps: [
                    'Clarify CBAM responsibilities with your customs broker.',
                    'Ensure emission data is collected regardless of who files declarations.',
                ],
            };
        }

        // Subject to CBAM
        return {
            isSubject: true,
            reason: `Your imports of ${CBAM_PRODUCTS.find(p => p.id === answers.productCategory)?.name || 'CBAM goods'} from ${answers.originCountry} are likely subject to CBAM.`,
            nextSteps: [
                'Register in the CBAM Transitional Registry (if not already done).',
                'Collect verified emission data from your suppliers.',
                'Use our Supplier Kit to request data from manufacturers.',
                'Calculate your CBAM certificate costs with our calculator.',
            ],
        };
    };

    const handleNext = () => {
        if (step === 5) {
            const evaluation = evaluateObligation();
            setResult(evaluation);
            setStep('result');
        } else if (typeof step === 'number') {
            setStep((step + 1) as Step);
        }
    };

    const handleBack = () => {
        if (step === 'result') {
            setStep(5);
            setResult(null);
        } else if (typeof step === 'number' && step > 1) {
            setStep((step - 1) as Step);
        }
    };

    const resetCheck = () => {
        setStep(1);
        setAnswers({
            importsToEU: null,
            productCategory: '',
            originCountry: '',
            annualValue: '',
            isImporterOfRecord: null,
        });
        setResult(null);
    };

    const canProceed = () => {
        switch (step) {
            case 1: return answers.importsToEU !== null;
            case 2: return !!answers.productCategory;
            case 3: return !!answers.originCountry;
            case 4: return !!answers.annualValue;
            case 5: return answers.isImporterOfRecord !== null;
            default: return true;
        }
    };

    if (step === 'result' && result) {
        return (
            <div className="section-padding">
                <div className="container-custom max-w-2xl">
                    <div className={`card p-8 md:p-12 text-center ${result.isSubject ? 'glow-amber' : 'glow-green'}`}>
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${result.isSubject ? 'bg-amber-500/20' : 'gradient-carbon'
                            }`}>
                            {result.isSubject ? (
                                <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            ) : (
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold mb-4">
                            {result.isSubject ? 'Likely Subject to CBAM' : 'Likely Not Subject to CBAM'}
                        </h1>

                        <p className="text-slate-300 mb-8">{result.reason}</p>

                        <div className="text-left card p-6 mb-8">
                            <h3 className="font-semibold mb-4">Recommended Next Steps:</h3>
                            <ul className="space-y-3">
                                {result.nextSteps.map((step, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                        <span className="w-6 h-6 rounded-full bg-eu-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs text-eu-blue-300">
                                            {i + 1}
                                        </span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={resetCheck} className="btn-outline">
                                Check Again
                            </button>
                            {result.isSubject ? (
                                <Link href="/supplier-kit" className="btn-secondary">
                                    Get Supplier Kit
                                </Link>
                            ) : (
                                <Link href="/calculator" className="btn-primary">
                                    Try Calculator Anyway
                                </Link>
                            )}
                        </div>

                        <p className="text-xs text-slate-500 mt-8">
                            This is a preliminary check for informational purposes only.
                            Consult official EU guidance or a professional advisor for binding determinations.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section-padding">
            <div className="container-custom max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <span className="badge badge-blue mb-4">Quick Check</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        CBAM Obligation <span className="text-gradient-eu">Pre-Check</span>
                    </h1>
                    <p className="text-slate-400">
                        Answer 5 quick questions to find out if your imports are likely subject to CBAM.
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div
                                key={s}
                                className={`step-indicator ${typeof step === 'number' && s < step ? 'completed' :
                                        s === step ? 'active' : 'pending'
                                    }`}
                            >
                                {typeof step === 'number' && s < step ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : s}
                            </div>
                        ))}
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((typeof step === 'number' ? step : 5) - 1) / 4 * 100}%` }}
                        />
                    </div>
                </div>

                {/* Questions */}
                <div className="card p-6 md:p-8">
                    {/* Step 1: Import to EU */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Do you import goods into the European Union?</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setAnswers({ ...answers, importsToEU: true })}
                                    className={`p-6 rounded-xl border-2 transition-all ${answers.importsToEU === true
                                            ? 'border-eu-blue-500 bg-eu-blue-500/10'
                                            : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <span className="text-3xl mb-2 block">✅</span>
                                    <span className="font-medium">Yes</span>
                                </button>
                                <button
                                    onClick={() => setAnswers({ ...answers, importsToEU: false })}
                                    className={`p-6 rounded-xl border-2 transition-all ${answers.importsToEU === false
                                            ? 'border-eu-blue-500 bg-eu-blue-500/10'
                                            : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <span className="text-3xl mb-2 block">❌</span>
                                    <span className="font-medium">No</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Product Category */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">What product category do you import?</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {CBAM_PRODUCTS.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => setAnswers({ ...answers, productCategory: product.id })}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${answers.productCategory === product.id
                                                ? 'border-eu-blue-500 bg-eu-blue-500/10'
                                                : 'border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <span className="text-2xl mb-2 block">{product.icon}</span>
                                        <span className="text-sm font-medium">{product.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Origin Country */}
                    {step === 3 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">What is the primary country of origin?</h2>
                            <input
                                type="text"
                                list="countries"
                                value={answers.originCountry}
                                onChange={(e) => setAnswers({ ...answers, originCountry: e.target.value })}
                                placeholder="Type or select country..."
                                className="input-field text-lg"
                            />
                            <datalist id="countries">
                                <option value="China" />
                                <option value="India" />
                                <option value="Turkey" />
                                <option value="Russia" />
                                <option value="United States" />
                                <option value="Brazil" />
                                <option value="South Korea" />
                                <option value="Japan" />
                                <option value="Ukraine" />
                                <option value="Egypt" />
                                <option value="South Africa" />
                                {EU_COUNTRIES.map(c => <option key={c} value={c} />)}
                            </datalist>
                            <p className="text-sm text-slate-500 mt-3">
                                EU/EFTA countries are generally exempt from CBAM.
                            </p>
                        </div>
                    )}

                    {/* Step 4: Annual Value */}
                    {step === 4 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">What is your typical consignment value (EUR)?</h2>
                            <input
                                type="number"
                                value={answers.annualValue}
                                onChange={(e) => setAnswers({ ...answers, annualValue: e.target.value })}
                                placeholder="e.g., 50000"
                                className="input-field text-lg"
                                min="0"
                            />
                            <p className="text-sm text-slate-500 mt-3">
                                Consignments under €150 may qualify for de minimis exemption.
                            </p>
                        </div>
                    )}

                    {/* Step 5: Importer of Record */}
                    {step === 5 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Are you the importer of record (or direct representative)?</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setAnswers({ ...answers, isImporterOfRecord: true })}
                                    className={`p-6 rounded-xl border-2 transition-all ${answers.isImporterOfRecord === true
                                            ? 'border-eu-blue-500 bg-eu-blue-500/10'
                                            : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <span className="text-3xl mb-2 block">✅</span>
                                    <span className="font-medium">Yes</span>
                                </button>
                                <button
                                    onClick={() => setAnswers({ ...answers, isImporterOfRecord: false })}
                                    className={`p-6 rounded-xl border-2 transition-all ${answers.isImporterOfRecord === false
                                            ? 'border-eu-blue-500 bg-eu-blue-500/10'
                                            : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <span className="text-3xl mb-2 block">❌</span>
                                    <span className="font-medium">No / Unsure</span>
                                </button>
                            </div>
                            <p className="text-sm text-slate-500 mt-4">
                                The importer of record is responsible for CBAM declarations.
                            </p>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-4 mt-8">
                        {typeof step === 'number' && step > 1 && (
                            <button onClick={handleBack} className="btn-outline flex-1">
                                ← Back
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="btn-primary flex-1 disabled:opacity-50"
                        >
                            {step === 5 ? 'Get Result' : 'Continue →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
