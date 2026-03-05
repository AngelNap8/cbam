import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Calculation Methodology',
    description: 'How the CBAM Calculator estimates your Carbon Border Adjustment Mechanism certificate costs. Transparent methodology, formulas, and data sources.',
};

export default function MethodologyPage() {
    return (
        <div className="section-padding">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="badge badge-blue mb-4">Transparency</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Calculation <span className="text-gradient-eu">Methodology</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        We believe in full transparency. Here is exactly how our calculators work,
                        what data sources we use, and what assumptions we make.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Core Formula */}
                    <section className="card p-6 md:p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">1. Core CBAM Cost Formula</h2>
                        <div className="bg-slate-900/50 rounded-xl p-6 text-center mb-6">
                            <code className="text-lg md:text-xl text-eu-blue-200">
                                CBAM Cost = Quantity (t) × Emission Factor (tCO₂e/t) × EU ETS Price (€/tCO₂)
                            </code>
                        </div>
                        <div className="space-y-4 text-slate-300 text-sm">
                            <p>
                                The CBAM certificate cost is a function of three variables:
                            </p>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>
                                    <strong className="text-white">Import Quantity</strong> — the mass of goods imported,
                                    measured in tonnes (or MWh for electricity).
                                </li>
                                <li>
                                    <strong className="text-white">Emission Factor</strong> — the embedded CO₂ emissions
                                    per tonne of product. This can be the EU default value (with markup) or the actual
                                    verified emission data from your supplier.
                                </li>
                                <li>
                                    <strong className="text-white">EU ETS Price</strong> — the weekly average price of
                                    EU Emissions Trading System allowances. Our calculator uses a representative price
                                    that we update periodically.
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* Default Values */}
                    <section className="card p-6 md:p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">2. Default Emission Values</h2>
                        <p className="text-slate-300 text-sm mb-4">
                            When importers do not provide verified supplier-specific emission data, the EU requires use of
                            <strong className="text-white"> default emission values</strong>. These are set deliberately high
                            — typically based on the worst-performing 10% of installations in the exporting country —
                            to incentivize collection of real data.
                        </p>
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4">
                            <p className="text-sm text-amber-200">
                                <strong>Important:</strong> A markup penalty is applied on top of default values.
                                The schedule is:
                            </p>
                            <ul className="text-sm text-amber-200/80 mt-2 space-y-1">
                                <li>• <strong>2026:</strong> +10% markup</li>
                                <li>• <strong>2027:</strong> +20% markup</li>
                                <li>• <strong>2028 onwards:</strong> +30% markup</li>
                            </ul>
                        </div>
                        <p className="text-slate-400 text-xs">
                            Legal basis: Article 7(2) and Annex IV of Regulation (EU) 2023/956.
                            Default values are published by the European Commission in implementing acts.
                        </p>
                    </section>

                    {/* Origin Deduction */}
                    <section className="card p-6 md:p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">3. Origin Country Carbon Price Deduction</h2>
                        <p className="text-slate-300 text-sm mb-4">
                            If the country of origin has an explicit carbon price (carbon tax or ETS), the amount already
                            paid is deducted from the CBAM liability. This avoids double taxation.
                        </p>
                        <div className="bg-slate-900/50 rounded-xl p-6 text-center mb-4">
                            <code className="text-eu-blue-200">
                                Net CBAM = Gross Cost − (Total Emissions × Origin Carbon Price)
                            </code>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left mt-4">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="pb-3 text-slate-400 font-medium">Country</th>
                                        <th className="pb-3 text-slate-400 font-medium text-right">Carbon Price (€/tCO₂)</th>
                                        <th className="pb-3 text-slate-400 font-medium text-right">Deductible</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    <tr className="border-b border-white/5"><td className="py-2">China</td><td className="text-right">~€8</td><td className="text-right text-carbon-400">Yes</td></tr>
                                    <tr className="border-b border-white/5"><td className="py-2">South Korea</td><td className="text-right">~€15</td><td className="text-right text-carbon-400">Yes</td></tr>
                                    <tr className="border-b border-white/5"><td className="py-2">South Africa</td><td className="text-right">~€9</td><td className="text-right text-carbon-400">Yes</td></tr>
                                    <tr className="border-b border-white/5"><td className="py-2">Turkey</td><td className="text-right">~€5</td><td className="text-right text-carbon-400">Yes</td></tr>
                                    <tr className="border-b border-white/5"><td className="py-2">Japan</td><td className="text-right">~€3</td><td className="text-right text-carbon-400">Yes</td></tr>
                                    <tr><td className="py-2">India, Russia, US, Brazil, etc.</td><td className="text-right">€0</td><td className="text-right text-slate-500">No</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-slate-400 text-xs mt-4">
                            Carbon prices are approximate and updated periodically. Actual deductions require documentary proof
                            (Art. 9 Regulation (EU) 2023/956).
                        </p>
                    </section>

                    {/* Data Sources */}
                    <section className="card p-6 md:p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">4. Data Sources & Updates</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <h3 className="font-medium text-white mb-2">EU ETS Price</h3>
                                <p className="text-sm text-slate-400">
                                    Updated manually from Trading Economics / ICE Endex. We use a representative
                                    average rather than real-time quotes. The &quot;last updated&quot; date is shown on every
                                    page that displays prices.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <h3 className="font-medium text-white mb-2">Default Emission Values</h3>
                                <p className="text-sm text-slate-400">
                                    Sourced from EU Commission implementing regulations and the CBAM transitional registry
                                    guidance documents. Values are updated when new implementing acts are published.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <h3 className="font-medium text-white mb-2">HS Codes</h3>
                                <p className="text-sm text-slate-400">
                                    Annex I of Regulation (EU) 2023/956, as amended. Our database covers all
                                    CBAM-relevant Combined Nomenclature (CN) codes.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <h3 className="font-medium text-white mb-2">Country Carbon Prices</h3>
                                <p className="text-sm text-slate-400">
                                    Based on World Bank Carbon Pricing Dashboard and country-specific ETS registry data.
                                    Approximate values; actual deductions require documentation.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Limitations */}
                    <section className="card p-6 md:p-8 border-amber-500/20">
                        <h2 className="text-2xl font-semibold text-white mb-6">5. Limitations & Assumptions</h2>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="text-amber-400 mt-1">⚠️</span>
                                <span>
                                    EU ETS prices fluctuate daily. Our calculator uses a periodically updated representative
                                    price, not a live market feed. Actual certificate purchase prices may differ.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-amber-400 mt-1">⚠️</span>
                                <span>
                                    Default emission values are simplified to product-category level. The EU assigns
                                    more granular values based on specific CN codes and production routes.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-amber-400 mt-1">⚠️</span>
                                <span>
                                    Free allocation adjustments (where applicable) are not factored into our estimates.
                                    As free allocations phase out (2026–2034), this becomes less relevant.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-amber-400 mt-1">⚠️</span>
                                <span>
                                    This tool provides <strong className="text-white">estimates only</strong> and
                                    is <strong className="text-white">not a substitute</strong> for professional
                                    CBAM compliance advice. Always consult qualified advisors.
                                </span>
                            </li>
                        </ul>
                    </section>

                    {/* Regulatory References */}
                    <section className="card p-6 md:p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">6. Regulatory References</h2>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>
                                <a href="https://eur-lex.europa.eu/eli/reg/2023/956/oj" target="_blank" rel="noopener noreferrer" className="text-eu-blue-300 hover:underline">
                                    Regulation (EU) 2023/956 — CBAM Regulation ↗
                                </a>
                            </li>
                            <li>
                                <a href="https://eur-lex.europa.eu/eli/reg_impl/2023/1773/oj" target="_blank" rel="noopener noreferrer" className="text-eu-blue-300 hover:underline">
                                    Commission Implementing Regulation (EU) 2023/1773 — Transitional Rules ↗
                                </a>
                            </li>
                            <li>
                                <a href="https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en" target="_blank" rel="noopener noreferrer" className="text-eu-blue-300 hover:underline">
                                    European Commission — CBAM Official Page ↗
                                </a>
                            </li>
                        </ul>
                    </section>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/calculator" className="btn-primary text-center">
                            Try the Calculator →
                        </Link>
                        <Link href="/resources" className="btn-outline text-center">
                            Resources & FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
