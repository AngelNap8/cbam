'use client';

import Link from 'next/link';

export default function CompliancePage() {
    // Dynamic current date — always accurate
    const now = new Date();

    const deadlines = [
        {
            date: 'October 1, 2023',
            title: 'Transitional Phase Begins',
            description: 'CBAM reporting requirements started. Quarterly reports required.',
            status: 'completed',
            isPast: true,
        },
        {
            date: 'December 31, 2025',
            title: 'Transitional Phase Ends',
            description: 'Final quarterly report submitted. Transitional phase closed.',
            status: 'completed',
            isPast: true,
        },
        {
            date: 'January 1, 2026',
            title: 'Definitive CBAM Phase + Authorized Declarant Requirement',
            description: 'Certificate purchase obligations begin. Only Authorized CBAM Declarants may now import CBAM goods. 10% markup on default values applies.',
            status: 'completed',
            isPast: true,
        },
        {
            date: 'February 1, 2027',
            title: 'Certificate Sales Begin',
            description: 'CBAM certificates available for purchase from national competent authorities.',
            status: 'upcoming',
            isPast: false,
            daysUntil: Math.ceil((new Date('2027-02-01').getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
        },
        {
            date: 'May 31, 2027',
            title: 'First Annual CBAM Declaration',
            description: 'Submit 2026 full-year import declaration via EU CBAM registry. This is annual reporting — one declaration per year covers all 2026 imports.',
            status: 'upcoming',
            isPast: false,
            daysUntil: Math.ceil((new Date('2027-05-31').getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
        },
        {
            date: 'September 30, 2027',
            title: 'First Certificate Surrender',
            description: 'Surrender CBAM certificates matching total 2026 embedded emissions.',
            status: 'critical',
            isPast: false,
            daysUntil: Math.ceil((new Date('2027-09-30').getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
        },
        {
            date: 'January 1, 2027',
            title: '20% Default Value Markup',
            description: 'Markup on default emission values increases to 20%.',
            status: 'upcoming',
            isPast: false,
        },
        {
            date: 'January 1, 2028',
            title: '30% Default Value Markup',
            description: 'Markup on default emission values increases to 30%.',
            status: 'upcoming',
            isPast: false,
        },
    ];

    const checklist = [
        {
            category: 'Immediate Actions (Q1 2026)',
            items: [
                { task: 'Become an Authorized CBAM Declarant — mandatory to import CBAM goods', priority: 'high' },
                { task: 'Register in the EU CBAM registry via your National Competent Authority', priority: 'high' },
                { task: 'Map all imports to CBAM-covered HS codes', priority: 'high' },
                { task: 'Verify you exceed (or are under) the 50 tonne de minimis threshold annually', priority: 'high' },
                { task: 'Request verified emission data from your suppliers', priority: 'medium' },
                { task: 'Set up internal tracking systems', priority: 'medium' },
            ],
        },
        {
            category: 'Ongoing Requirements',
            items: [
                { task: 'Track all imports by quantity and origin throughout the year', priority: 'high' },
                { task: 'Document embedded emissions per shipment', priority: 'high' },
                { task: 'Record any carbon prices paid at origin country', priority: 'medium' },
                { task: 'Maintain supplier emission certifications and verifier reports', priority: 'medium' },
                { task: 'Prepare one annual internal compliance report (no quarterly reports)', priority: 'low' },
            ],
        },
        {
            category: 'Before First Annual Declaration (2027)',
            items: [
                { task: 'Verify all 2026 import data is complete and verified', priority: 'high' },
                { task: 'Calculate total embedded emissions for all 2026 CBAM imports', priority: 'high' },
                { task: 'Purchase sufficient CBAM certificates from national authority', priority: 'high' },
                { task: 'Submit annual declaration by May 31, 2027', priority: 'high' },
                { task: 'Surrender certificates by September 30, 2027', priority: 'high' },
            ],
        },
    ];

    const daysToSurrender = Math.ceil((new Date('2027-09-30').getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="section-padding">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        CBAM <span className="text-gradient-eu">Compliance</span> Timeline
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Key deadlines and requirements for EU Carbon Border Adjustment Mechanism compliance in the definitive phase (2026 onwards).
                    </p>
                </div>

                {/* 🔴 CRITICAL: Authorized Declarant Warning */}
                <div className="card p-6 md:p-8 mb-10 border-2 border-red-500/60 bg-red-900/10">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-red-300 mb-2">🔴 Mandatory Since January 1, 2026: Authorized CBAM Declarant</h2>
                            <p className="text-slate-300 mb-4">
                                As of January 1, 2026, <strong>only companies registered as Authorized CBAM Declarants</strong> may import CBAM-covered goods into the EU.
                                Importing without this status is non-compliant and may result in penalties or refusal of goods.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-200 mb-2">How to apply:</h3>
                                    <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                                        <li>Contact your country&apos;s National Competent Authority (NCA)</li>
                                        <li>Submit EORI number + company registration</li>
                                        <li>Prove annual import volume exceeds 50 tonnes</li>
                                        <li>Receive Authorized Declarant status in the CBAM registry</li>
                                    </ol>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-200 mb-2">De Minimis Exemption:</h3>
                                    <p className="text-sm text-slate-400">
                                        Importers with <strong className="text-carbon-400">&lt; 50 tonnes/year</strong> total of CBAM goods (excl. electricity &amp; hydrogen) are exempt from the Authorized Declarant requirement and certificate obligations.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link href="/pre-check" className="btn-outline text-sm">
                                    Check Your Obligation →
                                </Link>
                                <Link href="/declarant-checklist" className="btn-primary text-sm">
                                    Declarant Application Guide →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Countdown Banner */}
                <div className="card p-6 md:p-8 mb-12 glow-blue text-center">
                    <p className="text-sm text-slate-400 mb-2">Days Until First Certificate Surrender</p>
                    <div className="text-5xl md:text-7xl font-bold text-gradient-eu mb-4">
                        {daysToSurrender}
                    </div>
                    <p className="text-slate-300">September 30, 2027</p>
                    <Link href="/calculator" className="btn-primary mt-6 inline-block">
                        Calculate Your CBAM Cost Now
                    </Link>
                </div>

                {/* Timeline */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Key Deadlines</h2>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-carbon-500 via-eu-blue-500 to-red-500" />

                        {/* Timeline Items */}
                        <div className="space-y-6">
                            {deadlines.map((deadline, index) => (
                                <div key={index} className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    {/* Content */}
                                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                        <div className={`card p-4 ${deadline.status === 'critical' ? 'border-red-500/50' :
                                            deadline.status === 'completed' ? 'opacity-70' : ''
                                            }`}>
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className={`badge ${deadline.status === 'completed' ? 'badge-green' :
                                                    deadline.status === 'critical' ? 'badge-red' :
                                                        'badge-amber'
                                                    }`}>
                                                    {deadline.status === 'completed' ? '✓ Completed' :
                                                        deadline.status === 'critical' ? '⚠ Critical' :
                                                            'Upcoming'}
                                                </span>
                                                {deadline.daysUntil && (
                                                    <span className="text-xs text-slate-500">{deadline.daysUntil} days</span>
                                                )}
                                            </div>
                                            <h3 className="font-semibold mb-1">{deadline.date}</h3>
                                            <p className="text-sm font-medium text-eu-blue-300">{deadline.title}</p>
                                            <p className="text-sm text-slate-400 mt-1">{deadline.description}</p>
                                        </div>
                                    </div>

                                    {/* Dot */}
                                    <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 ${deadline.status === 'completed' ? 'bg-carbon-500' :
                                        deadline.status === 'critical' ? 'bg-red-500' :
                                            'bg-amber-500/50'
                                        }`}>
                                        {deadline.status === 'completed' ? (
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : deadline.status === 'critical' ? (
                                            <span className="text-white text-xs font-bold">!</span>
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-white/50" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Compliance Checklist */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Compliance Checklist</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {checklist.map((section, sIndex) => (
                            <div key={sIndex} className="card p-6">
                                <h3 className="font-semibold mb-4 text-eu-blue-300">{section.category}</h3>
                                <ul className="space-y-3">
                                    {section.items.map((item, iIndex) => (
                                        <li key={iIndex} className="flex items-start gap-3">
                                            <span className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                                item.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                                                    'bg-slate-500/20 text-slate-400'
                                                }`}>
                                                {item.priority === 'high' ? '!' : item.priority === 'medium' ? '•' : '○'}
                                            </span>
                                            <span className="text-sm text-slate-300">{item.task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reporting: Annual vs Quarterly clarification */}
                <div className="card p-8 mb-12 border border-amber-500/20 bg-amber-500/5">
                    <h2 className="text-xl font-bold mb-4 text-amber-300">📋 Definitive Phase: Annual Reporting Only</h2>
                    <p className="text-slate-300 mb-4">
                        The <strong>transitional phase</strong> (Oct 2023 – Dec 2025) required quarterly reports. That is now over.
                        In the <strong>definitive phase</strong> (2026 onwards), importers submit <strong>one annual CBAM declaration</strong> per year:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg bg-slate-800/50">
                            <p className="text-sm font-semibold text-slate-200 mb-1">❌ Old (Transitional Phase)</p>
                            <p className="text-sm text-slate-500">4 quarterly reports per year, reporting only — no certificate purchase</p>
                        </div>
                        <div className="p-4 rounded-lg bg-carbon-500/10 border border-carbon-500/20">
                            <p className="text-sm font-semibold text-carbon-300 mb-1">✅ Now (Definitive Phase, 2026+)</p>
                            <p className="text-sm text-slate-400">1 annual declaration per year + certificate purchase &amp; surrender</p>
                        </div>
                    </div>
                </div>

                {/* Default Value Markup Info */}
                <div className="card p-8 mb-12">
                    <h2 className="text-xl font-bold mb-6">Default Value Markup Schedule</h2>
                    <p className="text-slate-400 mb-6">
                        If you use EU default emission values instead of verified actual data from your suppliers,
                        a markup penalty is added to encourage transition to actual emissions reporting.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="stat-card border-2 border-eu-blue-500">
                            <div className="stat-value">10%</div>
                            <div className="text-sm text-slate-400">2026</div>
                            <span className="badge badge-blue mt-2">Current</span>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">20%</div>
                            <div className="text-sm text-slate-400">2027</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">30%</div>
                            <div className="text-sm text-slate-400">2028+</div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to Estimate Your CBAM Costs?</h2>
                    <p className="text-slate-400 mb-6">
                        Use our free calculator to understand your potential carbon certificate liability.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/calculator" className="btn-primary">
                            Calculate CBAM Cost
                        </Link>
                        <Link href="/declarant-checklist" className="btn-outline">
                            Authorized Declarant Guide
                        </Link>
                        <Link href="/contact" className="btn-outline">
                            Get Expert Help
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
