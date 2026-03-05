import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        tools: [
            { name: 'CBAM Calculator', href: '/calculator' },
            { name: 'Savings Calculator', href: '/savings' },
            { name: 'Obligation Pre-Check', href: '/pre-check' },
            { name: 'HS Code Lookup', href: '/hs-lookup' },
            { name: 'Invoice Analyzer', href: '/invoice-analyzer' },
            { name: 'Email Generator', href: '/email-generator' },
        ],
        learn: [
            { name: 'Compliance Timeline', href: '/compliance' },
            { name: 'Methodology', href: '/methodology' },
            { name: 'Resources & FAQ', href: '/resources' },
            { name: 'Declarant Checklist', href: '/declarant-checklist' },
            { name: 'Supplier Data Kit', href: '/supplier-kit' },
        ],
        legal: [
            { name: 'Disclaimer', href: '/disclaimer' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Use', href: '/terms' },
            { name: 'Contact', href: '/contact' },
        ],
    };

    return (
        <footer className="border-t border-white/10 bg-slate-950/50">
            <div className="container-custom py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl gradient-eu flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-lg font-bold text-white">CBAM Calculator</span>
                                <span className="block text-xs text-slate-400">.eu</span>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-md">
                            Free compliance tools for EU importers. Estimate your Carbon Border Adjustment Mechanism
                            certificate costs, check CBAM obligations, and collect supplier emission data.
                        </p>
                        <p className="text-xs text-slate-500">
                            Built on EU Regulation (EU) 2023/956.
                            Not affiliated with the European Commission.
                        </p>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Tools</h3>
                        <ul className="space-y-2.5">
                            {footerLinks.tools.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Learn */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Learn</h3>
                        <ul className="space-y-2.5">
                            {footerLinks.learn.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                        <ul className="space-y-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500">
                            © {currentYear} CBAM Calculator. All rights reserved.
                        </p>
                        <div className="flex items-center gap-3 flex-wrap justify-center">
                            <span className="badge badge-blue">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Reg. (EU) 2023/956
                            </span>
                            <span className="badge badge-green">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                No Data Stored
                            </span>
                            <span className="badge badge-amber">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                Estimation Tool Only
                            </span>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <p className="text-xs text-amber-200/80 text-center">
                        <strong>Disclaimer:</strong> This calculator provides estimates based on EU CBAM regulations
                        (Regulation (EU) 2023/956). Results are for informational purposes only and do not constitute
                        legal, tax, or customs advice. EU ETS prices are periodically updated and may not reflect
                        current market rates. Always consult qualified professionals for compliance decisions.
                    </p>
                </div>
            </div>
        </footer>
    );
}
