'use client';

import Link from 'next/link';

export default function CompliancePage() {
    // Current date: January 13, 2026
    const currentDate = new Date('2026-01-13');

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
            description: 'Final transitional quarterly report due.',
            status: 'completed',
            isPast: true,
        },
        {
            date: 'January 1, 2026',
            title: 'Definitive CBAM Phase',
            description: 'Certificate purchase requirements begin. 10% markup on default values.',
            status: 'completed',
            isPast: true,
        },
        {
            date: 'January 13, 2026',
            title: 'Current Date',
            description: 'Track all imports for 2026 certificate requirements.',
            status: 'current',
            isPast: false,
        },
        {
            date: 'February 1, 2027',
            title: 'Certificate Sales Begin',
            description: 'CBAM certificates available for purchase from national authorities.',
            status: 'upcoming',
            isPast: false,
            daysUntil: Math.ceil((new Date('2027-02-01').getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
        },
        {
            date: 'May 31, 2027',
            title: 'First Annual CBAM Declaration',
            description: 'Submit 2026 import declaration via EU CBAM registry.',
            status: 'upcoming',
            isPast: false,
            daysUntil: Math.ceil((new Date('2027-05-31').getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
        },
        {
            date: 'September 30, 2027',
            title: 'First Certificate Surrender',
            description: 'Surrender CBAM certificates for 2026 embedded emissions.',
            status: 'critical',
            isPast: false,
            daysUntil: Math.ceil((new Date('2027-09-30').getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
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
                { task: 'Apply for Authorized CBAM Declarant status', priority: 'high' },
                { task: 'Register in the EU CBAM registry', priority: 'high' },
                { task: 'Map all imports to CBAM-covered HS codes', priority: 'high' },
                { task: 'Request emission data from suppliers', priority: 'medium' },
                { task: 'Set up internal tracking systems', priority: 'medium' },
            ],
        },
        {
            category: 'Ongoing Requirements',
            items: [
                { task: 'Track all imports by quantity and origin', priority: 'high' },
                { task: 'Document embedded emissions per shipment', priority: 'high' },
                { task: 'Record any carbon prices paid at origin', priority: 'medium' },
                { task: 'Maintain supplier emission certifications', priority: 'medium' },
                { task: 'Prepare quarterly internal compliance reports', priority: 'low' },
            ],
        },
        {
            category: 'Before First Declaration (2027)',
            items: [
                { task: 'Verify all 2026 import data is complete', priority: 'high' },
                { task: 'Calculate total embedded emissions', priority: 'high' },
                { task: 'Purchase sufficient CBAM certificates', priority: 'high' },
                { task: 'Submit annual declaration by May 31', priority: 'high' },
                { task: 'Surrender certificates by September 30', priority: 'high' },
            ],
        },
    ];

    // Calculate days until first surrender
    const daysToSurrender = Math.ceil((new Date('2027-09-30').getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="section-padding">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        CBAM <span className="text-gradient-eu">Compliance</span> Timeline
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Key deadlines and requirements for EU Carbon Border Adjustment Mechanism compliance.
                    </p>
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
                                        <div className={`card p-4 ${deadline.status === 'current' ? 'border-eu-blue-500 glow-blue' :
                                                deadline.status === 'critical' ? 'border-red-500/50' :
                                                    deadline.status === 'completed' ? 'opacity-60' : ''
                                            }`}>
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className={`badge ${deadline.status === 'completed' ? 'badge-green' :
                                                        deadline.status === 'current' ? 'badge-blue' :
                                                            deadline.status === 'critical' ? 'badge-red' :
                                                                'badge-amber'
                                                    }`}>
                                                    {deadline.status === 'completed' ? '✓ Completed' :
                                                        deadline.status === 'current' ? '● Now' :
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
                                            deadline.status === 'current' ? 'bg-eu-blue-500 animate-pulse' :
                                                deadline.status === 'critical' ? 'bg-red-500' :
                                                    'bg-amber-500/50'
                                        }`}>
                                        {deadline.status === 'completed' ? (
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : deadline.status === 'current' ? (
                                            <div className="w-3 h-3 rounded-full bg-white" />
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
                        <Link href="/contact" className="btn-outline">
                            Get Expert Help
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
