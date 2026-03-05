'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NavItem {
    name: string;
    href?: string;
    children?: { name: string; href: string; description: string; icon: string }[];
}

const navigation: NavItem[] = [
    {
        name: 'Tools',
        children: [
            { name: 'CBAM Calculator', href: '/calculator', description: 'Estimate your certificate costs', icon: '🧮' },
            { name: 'Savings Calculator', href: '/savings', description: 'Compare default vs real data costs', icon: '💰' },
            { name: 'Obligation Pre-Check', href: '/pre-check', description: 'Check if CBAM applies to you', icon: '✅' },
            { name: 'HS Code Lookup', href: '/hs-lookup', description: 'Search the CBAM product database', icon: '🔍' },
            { name: 'Invoice Analyzer', href: '/invoice-analyzer', description: 'Extract data from invoices', icon: '📄' },
            { name: 'Email Generator', href: '/email-generator', description: 'Request supplier data in their language', icon: '📧' },
        ],
    },
    {
        name: 'Learn',
        children: [
            { name: 'Compliance Timeline', href: '/compliance', description: 'Key deadlines & requirements', icon: '📅' },
            { name: 'Methodology', href: '/methodology', description: 'How our calculations work', icon: '📐' },
            { name: 'Resources & FAQ', href: '/resources', description: 'Guides, glossary & official links', icon: '📚' },
            { name: 'Declarant Checklist', href: '/declarant-checklist', description: 'Authorised Declarant application guide', icon: '🪪' },
        ],
    },
    {
        name: 'Supplier Kit',
        href: '/supplier-kit',
    },
    {
        name: 'Contact',
        href: '/contact',
    },
];

function DropdownMenu({ items, isOpen, onClose }: {
    items: NonNullable<NavItem['children']>;
    isOpen: boolean;
    onClose: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        }
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={ref}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 z-50"
        >
            <div className="p-2">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                    >
                        <span className="text-xl mt-0.5">{item.icon}</span>
                        <div>
                            <span className="block text-sm font-medium text-white group-hover:text-eu-blue-300 transition-colors">
                                {item.name}
                            </span>
                            <span className="block text-xs text-slate-400 mt-0.5">
                                {item.description}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    return (
        <header className="sticky top-0 z-50 glass-strong">
            <nav className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl gradient-eu flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xl font-bold text-white group-hover:text-eu-blue-300 transition-colors">
                                CBAM Calculator
                            </span>
                            <span className="block text-xs text-slate-400">.eu</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navigation.map((item) =>
                            item.children ? (
                                <div key={item.name} className="relative">
                                    <button
                                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${openDropdown === item.name
                                                ? 'text-white bg-white/10'
                                                : 'text-slate-300 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {item.name}
                                        <svg className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <DropdownMenu
                                        items={item.children}
                                        isOpen={openDropdown === item.name}
                                        onClose={() => setOpenDropdown(null)}
                                    />
                                </div>
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href!}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname === item.href
                                            ? 'text-white bg-white/10'
                                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            )
                        )}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Link href="/calculator" className="btn-primary text-sm">
                            Calculate Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-white/10 max-h-[70vh] overflow-y-auto">
                        <div className="flex flex-col gap-1">
                            {navigation.map((item) =>
                                item.children ? (
                                    <div key={item.name}>
                                        <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            {item.name}
                                        </p>
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <span className="text-lg">{child.icon}</span>
                                                <span>{child.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        key={item.name}
                                        href={item.href!}
                                        className="px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}
                            <Link
                                href="/calculator"
                                className="btn-primary text-sm text-center mt-3"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Calculate Now
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
