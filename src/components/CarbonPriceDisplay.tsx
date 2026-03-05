'use client';

import { EU_ETS_CONFIG } from '@/lib/carbonPrice';

interface CarbonPriceDisplayProps {
    compact?: boolean;
}

export default function CarbonPriceDisplay({ compact = false }: CarbonPriceDisplayProps) {
    if (compact) {
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-eu-blue-500/10 border border-eu-blue-500/20 text-sm">
                <span className="w-2 h-2 rounded-full bg-carbon-400 animate-pulse" />
                <span className="text-slate-300">EU ETS:</span>
                <span className="font-bold text-carbon-400">€{EU_ETS_CONFIG.price.toFixed(2)}/t</span>
                <a
                    href={EU_ETS_CONFIG.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                    ↗
                </a>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-eu flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs text-slate-400">EU ETS Carbon Price</p>
                    <p className="font-bold text-white">
                        €{EU_ETS_CONFIG.price.toFixed(2)}
                        <span className="text-sm font-normal text-slate-400">/tonne CO₂</span>
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-xs text-slate-500">Updated {EU_ETS_CONFIG.lastUpdated}</p>
                <a
                    href={EU_ETS_CONFIG.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-eu-blue-400 hover:text-eu-blue-300 transition-colors"
                >
                    {EU_ETS_CONFIG.source} ↗
                </a>
            </div>
        </div>
    );
}
