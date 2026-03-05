import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authorised CBAM Declarant — Application Checklist',
    description: 'Step-by-step checklist for applying as an Authorised CBAM Declarant with your National Competent Authority. Requirements, documents, and common questions.',
};

export default function DeclarantChecklistPage() {
    return (
        <div className="section-padding">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="badge badge-red mb-4">Mandatory Since Jan 1, 2026</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Authorised CBAM Declarant <span className="text-gradient-eu">Checklist</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        You must be registered as an Authorised CBAM Declarant before importing
                        CBAM goods into the EU. Here is what you need.
                    </p>
                </div>

                {/* Warning Box */}
                <div className="card p-6 border-red-500/40 bg-red-900/10 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="text-2xl">🚨</div>
                        <div>
                            <h2 className="text-lg font-semibold text-red-300 mb-2">
                                Non-compliance risk
                            </h2>
                            <p className="text-sm text-slate-300">
                                Since January 1, 2026, importing CBAM goods without Authorised Declarant status
                                may result in customs refusal, financial penalties, and inability to clear goods.
                                If you have not yet applied, contact your National Competent Authority immediately.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Checklist Steps */}
                <div className="space-y-6 mb-12">
                    <h2 className="text-xl font-semibold">Application Checklist</h2>

                    {[
                        {
                            step: 1,
                            title: 'Identify Your National Competent Authority (NCA)',
                            description: 'Each EU member state has designated an NCA responsible for CBAM administration. Find yours on the European Commission CBAM page.',
                            tip: 'For Italy: Agenzia delle Dogane e dei Monopoli (ADM). For Germany: DEHSt. For France: DGEC.',
                        },
                        {
                            step: 2,
                            title: 'Prepare Required Documentation',
                            description: 'You will typically need:',
                            list: [
                                'Company registration / VAT number',
                                'EORI number (Economic Operators Registration and Identification)',
                                'Proof of EU establishment (registered office in an EU member state)',
                                'Description of import activities and CBAM-relevant goods',
                                'Tax compliance certificate (no outstanding customs debts)',
                                'Information about your supply chain (origin countries, suppliers)',
                            ],
                        },
                        {
                            step: 3,
                            title: 'Register in the CBAM Transitional Registry',
                            description: 'Access the EU CBAM Registry portal and create an account. This is the platform where you will submit annual declarations and manage certificates.',
                            tip: 'The registry URL is provided by your NCA. It is NOT the transitional reporting portal used in 2023–2025.',
                        },
                        {
                            step: 4,
                            title: 'Submit Your Application',
                            description: 'Complete the Authorised Declarant application form via your NCA. Processing typically takes 15–30 business days. You will receive confirmation and your CBAM Declarant number.',
                        },
                        {
                            step: 5,
                            title: 'Set Up Internal CBAM Processes',
                            description: 'Once authorised, prepare your internal systems for:',
                            list: [
                                'Tracking all CBAM imports by product, quantity, and origin',
                                'Collecting emission data from suppliers (or using default values)',
                                'Purchasing CBAM certificates from your NCA',
                                'Submitting annual CBAM declarations by May 31',
                                'Surrendering certificates by September 30',
                            ],
                        },
                    ].map((item) => (
                        <div key={item.step} className="card p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full gradient-eu flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-300 mb-3">{item.description}</p>
                                    {item.list && (
                                        <ul className="space-y-1 text-sm text-slate-400">
                                            {item.list.map((li, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-carbon-400 mt-0.5">✓</span>
                                                    <span>{li}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {item.tip && (
                                        <div className="mt-3 p-3 rounded-lg bg-eu-blue-500/10 border border-eu-blue-500/20">
                                            <p className="text-xs text-eu-blue-200">
                                                <strong>Tip:</strong> {item.tip}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Key Dates */}
                <div className="card p-6 md:p-8 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Key Dates for Authorised Declarants</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 text-center">
                            <p className="text-2xl font-bold text-gradient-eu">Jan 2026</p>
                            <p className="text-sm text-slate-400 mt-1">Start tracking imports</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 text-center">
                            <p className="text-2xl font-bold text-gradient-eu">May 2027</p>
                            <p className="text-sm text-slate-400 mt-1">First annual declaration</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 text-center">
                            <p className="text-2xl font-bold text-gradient-eu">Sep 2027</p>
                            <p className="text-sm text-slate-400 mt-1">First certificate surrender</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://cbam.ec.europa.eu/authorised-declarant"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-center"
                    >
                        Official EU CBAM Page ↗
                    </a>
                    <Link href="/compliance" className="btn-outline text-center">
                        Full Compliance Timeline
                    </Link>
                    <Link href="/contact" className="btn-outline text-center">
                        Need Help? Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
