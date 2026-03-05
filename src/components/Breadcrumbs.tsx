'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PAGE_LABELS: Record<string, string> = {
    calculator: 'CBAM Calculator',
    savings: 'Savings Calculator',
    'pre-check': 'Obligation Pre-Check',
    compliance: 'Compliance Timeline',
    resources: 'Resources & FAQ',
    'hs-lookup': 'HS Code Lookup',
    'invoice-analyzer': 'Invoice Analyzer',
    'email-generator': 'Email Generator',
    'supplier-kit': 'Supplier Data Kit',
    supplier: 'Supplier Form',
    contact: 'Contact',
    methodology: 'Methodology',
    disclaimer: 'Disclaimer',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    'thank-you': 'Thank You',
};

export default function Breadcrumbs() {
    const pathname = usePathname();
    if (pathname === '/') return null;

    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav aria-label="Breadcrumb" className="container-custom pt-4 pb-2">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
                <li>
                    <Link href="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                </li>
                {segments.map((segment, index) => {
                    const href = '/' + segments.slice(0, index + 1).join('/');
                    const isLast = index === segments.length - 1;
                    const label = PAGE_LABELS[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                    return (
                        <li key={href} className="flex items-center gap-2">
                            <svg className="w-3 h-3 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            {isLast ? (
                                <span className="text-slate-300 font-medium">{label}</span>
                            ) : (
                                <Link href={href} className="hover:text-white transition-colors">
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
