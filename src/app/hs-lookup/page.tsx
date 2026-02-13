'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Comprehensive CBAM HS Code Database
const HS_CODES_DATABASE = [
    // Cement
    { hsCode: '2523 10', description: 'Cement clinkers', category: 'Cement', covered: true, defaultEmissions: 0.83 },
    { hsCode: '2523 21', description: 'White Portland cement', category: 'Cement', covered: true, defaultEmissions: 0.83 },
    { hsCode: '2523 29', description: 'Other Portland cement', category: 'Cement', covered: true, defaultEmissions: 0.83 },
    { hsCode: '2523 30', description: 'Aluminous cement', category: 'Cement', covered: true, defaultEmissions: 0.83 },
    { hsCode: '2523 90', description: 'Other hydraulic cements', category: 'Cement', covered: true, defaultEmissions: 0.83 },

    // Iron and Steel - Primary
    { hsCode: '7201', description: 'Pig iron and spiegeleisen', category: 'Iron & Steel', covered: true, defaultEmissions: 1.85 },
    { hsCode: '7202', description: 'Ferro-alloys', category: 'Iron & Steel', covered: true, defaultEmissions: 1.85 },
    { hsCode: '7203', description: 'Ferrous products from direct reduction', category: 'Iron & Steel', covered: true, defaultEmissions: 1.85 },
    { hsCode: '7204', description: 'Ferrous waste and scrap', category: 'Iron & Steel', covered: true, defaultEmissions: 0.50 },
    { hsCode: '7205', description: 'Iron and steel granules/powders', category: 'Iron & Steel', covered: true, defaultEmissions: 1.85 },
    { hsCode: '7206', description: 'Iron and non-alloy steel ingots', category: 'Iron & Steel', covered: true, defaultEmissions: 1.85 },
    { hsCode: '7207', description: 'Semi-finished products of iron/steel', category: 'Iron & Steel', covered: true, defaultEmissions: 2.00 },
    { hsCode: '7208', description: 'Flat-rolled products, hot-rolled', category: 'Iron & Steel', covered: true, defaultEmissions: 2.10 },
    { hsCode: '7209', description: 'Flat-rolled products, cold-rolled', category: 'Iron & Steel', covered: true, defaultEmissions: 2.20 },
    { hsCode: '7210', description: 'Flat-rolled products, plated/coated', category: 'Iron & Steel', covered: true, defaultEmissions: 2.30 },
    { hsCode: '7211', description: 'Flat-rolled products, not further worked', category: 'Iron & Steel', covered: true, defaultEmissions: 2.10 },
    { hsCode: '7212', description: 'Flat-rolled products, plated/coated', category: 'Iron & Steel', covered: true, defaultEmissions: 2.30 },
    { hsCode: '7213', description: 'Bars and rods, hot-rolled', category: 'Iron & Steel', covered: true, defaultEmissions: 2.00 },
    { hsCode: '7214', description: 'Bars and rods, forged/cold-formed', category: 'Iron & Steel', covered: true, defaultEmissions: 2.10 },
    { hsCode: '7215', description: 'Other bars and rods', category: 'Iron & Steel', covered: true, defaultEmissions: 2.10 },
    { hsCode: '7216', description: 'Angles, shapes and sections', category: 'Iron & Steel', covered: true, defaultEmissions: 2.00 },
    { hsCode: '7217', description: 'Wire of iron or non-alloy steel', category: 'Iron & Steel', covered: true, defaultEmissions: 2.20 },
    { hsCode: '7218', description: 'Stainless steel ingots/semi-finished', category: 'Iron & Steel', covered: true, defaultEmissions: 2.50 },
    { hsCode: '7219', description: 'Stainless steel flat-rolled, >600mm', category: 'Iron & Steel', covered: true, defaultEmissions: 2.60 },
    { hsCode: '7220', description: 'Stainless steel flat-rolled, <600mm', category: 'Iron & Steel', covered: true, defaultEmissions: 2.60 },
    { hsCode: '7221', description: 'Stainless steel bars, hot-rolled', category: 'Iron & Steel', covered: true, defaultEmissions: 2.50 },
    { hsCode: '7222', description: 'Stainless steel bars and shapes', category: 'Iron & Steel', covered: true, defaultEmissions: 2.50 },
    { hsCode: '7223', description: 'Stainless steel wire', category: 'Iron & Steel', covered: true, defaultEmissions: 2.60 },
    { hsCode: '7224', description: 'Other alloy steel ingots', category: 'Iron & Steel', covered: true, defaultEmissions: 2.40 },
    { hsCode: '7225', description: 'Other alloy steel flat-rolled, >600mm', category: 'Iron & Steel', covered: true, defaultEmissions: 2.50 },
    { hsCode: '7226', description: 'Other alloy steel flat-rolled, <600mm', category: 'Iron & Steel', covered: true, defaultEmissions: 2.50 },
    { hsCode: '7227', description: 'Other alloy steel bars, hot-rolled', category: 'Iron & Steel', covered: true, defaultEmissions: 2.40 },
    { hsCode: '7228', description: 'Other alloy steel bars and shapes', category: 'Iron & Steel', covered: true, defaultEmissions: 2.40 },
    { hsCode: '7229', description: 'Other alloy steel wire', category: 'Iron & Steel', covered: true, defaultEmissions: 2.50 },

    // Steel Products (Downstream)
    { hsCode: '7301', description: 'Sheet piling of iron or steel', category: 'Steel Products', covered: true, defaultEmissions: 2.20 },
    { hsCode: '7302', description: 'Railway track construction material', category: 'Steel Products', covered: true, defaultEmissions: 2.20 },
    { hsCode: '7303', description: 'Tubes and pipes of cast iron', category: 'Steel Products', covered: true, defaultEmissions: 2.00 },
    { hsCode: '7304', description: 'Seamless tubes and pipes of iron/steel', category: 'Steel Products', covered: true, defaultEmissions: 2.40 },
    { hsCode: '7305', description: 'Other tubes and pipes, welded', category: 'Steel Products', covered: true, defaultEmissions: 2.30 },
    { hsCode: '7306', description: 'Other tubes and pipes of iron/steel', category: 'Steel Products', covered: true, defaultEmissions: 2.30 },
    { hsCode: '7307', description: 'Tube or pipe fittings', category: 'Steel Products', covered: true, defaultEmissions: 2.40 },
    { hsCode: '7308', description: 'Structures of iron or steel', category: 'Steel Products', covered: true, defaultEmissions: 2.30 },
    { hsCode: '7309', description: 'Reservoirs, tanks, vats', category: 'Steel Products', covered: true, defaultEmissions: 2.30 },
    { hsCode: '7310', description: 'Tanks, casks, drums', category: 'Steel Products', covered: true, defaultEmissions: 2.30 },
    { hsCode: '7311', description: 'Containers for compressed gas', category: 'Steel Products', covered: true, defaultEmissions: 2.40 },
    { hsCode: '7318', description: 'Screws, bolts, nuts, washers', category: 'Steel Products', covered: true, defaultEmissions: 2.50 },
    { hsCode: '7326', description: 'Other articles of iron or steel', category: 'Steel Products', covered: true, defaultEmissions: 2.40 },

    // Aluminum
    { hsCode: '7601', description: 'Unwrought aluminium', category: 'Aluminum', covered: true, defaultEmissions: 8.20 },
    { hsCode: '7602', description: 'Aluminium waste and scrap', category: 'Aluminum', covered: true, defaultEmissions: 1.50 },
    { hsCode: '7603', description: 'Aluminium powders and flakes', category: 'Aluminum', covered: true, defaultEmissions: 8.50 },
    { hsCode: '7604', description: 'Aluminium bars, rods and profiles', category: 'Aluminum', covered: true, defaultEmissions: 9.00 },
    { hsCode: '7605', description: 'Aluminium wire', category: 'Aluminum', covered: true, defaultEmissions: 9.00 },
    { hsCode: '7606', description: 'Aluminium plates, sheets', category: 'Aluminum', covered: true, defaultEmissions: 9.20 },
    { hsCode: '7607', description: 'Aluminium foil', category: 'Aluminum', covered: true, defaultEmissions: 9.50 },
    { hsCode: '7608', description: 'Aluminium tubes and pipes', category: 'Aluminum', covered: true, defaultEmissions: 9.30 },
    { hsCode: '7609', description: 'Aluminium tube or pipe fittings', category: 'Aluminum', covered: true, defaultEmissions: 9.40 },
    { hsCode: '7610', description: 'Aluminium structures', category: 'Aluminum', covered: true, defaultEmissions: 9.20 },
    { hsCode: '7611', description: 'Aluminium reservoirs, tanks', category: 'Aluminum', covered: true, defaultEmissions: 9.20 },
    { hsCode: '7612', description: 'Aluminium casks, drums, cans', category: 'Aluminum', covered: true, defaultEmissions: 9.30 },
    { hsCode: '7613', description: 'Aluminium containers for compressed gas', category: 'Aluminum', covered: true, defaultEmissions: 9.40 },
    { hsCode: '7614', description: 'Stranded wire, cables of aluminium', category: 'Aluminum', covered: true, defaultEmissions: 9.00 },
    { hsCode: '7616', description: 'Other articles of aluminium', category: 'Aluminum', covered: true, defaultEmissions: 9.50 },

    // Fertilizers
    { hsCode: '2808 00', description: 'Nitric acid; sulphonitric acids', category: 'Fertilizers', covered: true, defaultEmissions: 2.80 },
    { hsCode: '2814', description: 'Ammonia, anhydrous or in solution', category: 'Fertilizers', covered: true, defaultEmissions: 2.40 },
    { hsCode: '2834 21', description: 'Potassium nitrate', category: 'Fertilizers', covered: true, defaultEmissions: 2.60 },
    { hsCode: '3102', description: 'Mineral or chemical nitrogenous fertilizers', category: 'Fertilizers', covered: true, defaultEmissions: 2.50 },
    { hsCode: '3102 10', description: 'Urea', category: 'Fertilizers', covered: true, defaultEmissions: 2.30 },
    { hsCode: '3102 30', description: 'Ammonium nitrate', category: 'Fertilizers', covered: true, defaultEmissions: 2.60 },
    { hsCode: '3102 40', description: 'Mixtures of ammonium nitrate', category: 'Fertilizers', covered: true, defaultEmissions: 2.60 },
    { hsCode: '3105', description: 'Mineral or chemical fertilizers with N+P+K', category: 'Fertilizers', covered: true, defaultEmissions: 2.40 },

    // Electricity
    { hsCode: '2716 00 00', description: 'Electrical energy', category: 'Electricity', covered: true, defaultEmissions: 0.45 },

    // Hydrogen
    { hsCode: '2804 10 00', description: 'Hydrogen', category: 'Hydrogen', covered: true, defaultEmissions: 9.00 },

    // Common non-covered items for reference
    { hsCode: '8703', description: 'Motor cars and vehicles', category: 'Transport', covered: false, defaultEmissions: 0 },
    { hsCode: '8471', description: 'Automatic data processing machines', category: 'Electronics', covered: false, defaultEmissions: 0 },
    { hsCode: '6204', description: 'Women\'s suits and clothing', category: 'Textiles', covered: false, defaultEmissions: 0 },
    { hsCode: '9403', description: 'Other furniture', category: 'Furniture', covered: false, defaultEmissions: 0 },
];

const CATEGORIES = ['All', 'Cement', 'Iron & Steel', 'Steel Products', 'Aluminum', 'Fertilizers', 'Electricity', 'Hydrogen'];

export default function HSLookupPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showOnlyCovered, setShowOnlyCovered] = useState(true);

    const filteredCodes = useMemo(() => {
        return HS_CODES_DATABASE.filter(item => {
            const matchesSearch =
                item.hsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            const matchesCovered = !showOnlyCovered || item.covered;

            return matchesSearch && matchesCategory && matchesCovered;
        });
    }, [searchQuery, selectedCategory, showOnlyCovered]);

    const coveredCount = HS_CODES_DATABASE.filter(item => item.covered).length;

    return (
        <div className="section-padding">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        HS Code <span className="text-gradient-eu">Lookup</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Check if your product is covered by EU CBAM regulations. Search by HS code or description.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="stat-card">
                        <div className="stat-value">{coveredCount}</div>
                        <div className="text-sm text-slate-400">HS Codes Covered</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">6</div>
                        <div className="text-sm text-slate-400">Product Categories</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">2026</div>
                        <div className="text-sm text-slate-400">Effective Year</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">10%</div>
                        <div className="text-sm text-slate-400">Default Markup</div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="card p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1">
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search HS code or product description..."
                                    className="input-field pl-12"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="select-field md:w-48"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        {/* Covered Toggle */}
                        <label className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showOnlyCovered}
                                onChange={(e) => setShowOnlyCovered(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-600"
                            />
                            <span className="text-sm text-slate-300 whitespace-nowrap">Covered only</span>
                        </label>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-3">
                    {filteredCodes.length === 0 ? (
                        <div className="card p-12 text-center">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-lg font-semibold mb-2">No results found</h3>
                            <p className="text-slate-400 text-sm">
                                Try adjusting your search or filter criteria.
                            </p>
                        </div>
                    ) : (
                        filteredCodes.map((item, index) => (
                            <div
                                key={`${item.hsCode}-${index}`}
                                className={`card p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 ${item.covered ? 'border-l-4 border-l-carbon-500' : 'border-l-4 border-l-slate-600'
                                    }`}
                            >
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <code className="text-lg font-mono font-bold text-eu-blue-300">{item.hsCode}</code>
                                        {item.covered ? (
                                            <span className="badge badge-green">CBAM Covered</span>
                                        ) : (
                                            <span className="badge" style={{ background: 'rgba(100,116,139,0.2)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.3)' }}>
                                                Not Covered
                                            </span>
                                        )}
                                        <span className="badge badge-blue">{item.category}</span>
                                    </div>
                                    <p className="text-slate-300">{item.description}</p>
                                </div>

                                {item.covered && (
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500">Default Emissions</p>
                                            <p className="font-semibold text-carbon-400">{item.defaultEmissions} tCO₂e/t</p>
                                        </div>
                                        <Link
                                            href={`/calculator`}
                                            className="btn-primary text-sm whitespace-nowrap"
                                        >
                                            Calculate →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Results Count */}
                <div className="mt-6 text-center text-sm text-slate-500">
                    Showing {filteredCodes.length} of {HS_CODES_DATABASE.length} HS codes
                </div>

                {/* Help Section */}
                <div className="mt-12 card p-8">
                    <h2 className="text-xl font-bold mb-4">Need Help Finding Your HS Code?</h2>
                    <p className="text-slate-400 mb-6">
                        HS (Harmonized System) codes are internationally standardized numbers to classify traded products.
                        If you&apos;re unsure of your product&apos;s HS code, consult your customs broker or check your import documentation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/resources" className="btn-outline text-center">
                            View Resources & FAQ
                        </Link>
                        <Link href="/contact" className="btn-primary text-center">
                            Request Expert Help
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
