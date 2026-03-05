/**
 * Centralized CBAM Regulatory Configuration
 * ──────────────────────────────────────────
 * Single source of truth for ALL regulatory parameters used across the portal.
 * When regulations change, update THIS file — the rest of the portal updates automatically.
 *
 * Last reviewed: March 2026
 * Source: Regulation (EU) 2023/956 + Commission Implementing Regulations
 */

// ── EU ETS Price (re-exported from carbonPrice.ts for convenience) ──
export { EU_ETS_CONFIG } from './carbonPrice';

// ── De Minimis Threshold ──
export const DE_MINIMIS = {
    annualTonnes: 50,
    description: 'Imports below 50 tonnes per year per CN code are exempt from CBAM obligations',
    legalBasis: 'Art. 2(3) Regulation (EU) 2023/956',
};

// ── Default Value Markup Schedule ──
export const DEFAULT_MARKUP_SCHEDULE: Record<number, number> = {
    2026: 0.10,   // 10%
    2027: 0.20,   // 20%
    2028: 0.30,   // 30% — and thereafter
};

/** Get the default value markup for a given year (falls back to latest known). */
export function getDefaultMarkup(year: number): number {
    if (year <= 2025) return 0;
    if (year >= 2028) return DEFAULT_MARKUP_SCHEDULE[2028];
    return DEFAULT_MARKUP_SCHEDULE[year] ?? DEFAULT_MARKUP_SCHEDULE[2028];
}

// ── Key Deadlines ──
export const CBAM_DEADLINES = {
    transitionalStart: '2023-10-01',
    transitionalEnd: '2025-12-31',
    definitiveStart: '2026-01-01',
    certificateSalesStart: '2027-02-01',
    firstAnnualDeclaration: '2027-05-31',
    firstCertificateSurrender: '2027-09-30',
};

// ── Covered Product Categories ──
export const CBAM_PRODUCT_CATEGORIES = [
    { name: 'Iron & Steel', hsCodes: '7206–7229, 7301–7326', icon: '🔩' },
    { name: 'Aluminum', hsCodes: '7601–7616', icon: '🪙' },
    { name: 'Cement', hsCodes: '2523', icon: '🧱' },
    { name: 'Fertilizers', hsCodes: '2808, 2814, 3102–3105', icon: '🌱' },
    { name: 'Electricity', hsCodes: '2716', icon: '⚡' },
    { name: 'Hydrogen', hsCodes: '2804 10 00', icon: '💨' },
];

// ── Authorised Declarant ──
export const AUTHORISED_DECLARANT = {
    mandatorySince: '2026-01-01',
    registryUrl: 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en',
    description: 'Only authorised CBAM declarants may import CBAM goods into the EU.',
    legalBasis: 'Art. 4 Regulation (EU) 2023/956',
};

// ── Portal Metadata Defaults ──
export const PORTAL_META = {
    siteName: 'CBAM Calculator',
    domain: 'https://cbam-calculator.eu',
    lastContentUpdate: '2026-03-04',
    regulationRef: 'Regulation (EU) 2023/956',
};
