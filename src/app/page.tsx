import Link from 'next/link';

export default function HomePage() {
    // Current date context: January 13, 2026
    // CBAM definitive phase started January 1, 2026
    // First certificate surrender: September 30, 2027

    const stats = [
        { value: '€85+', label: 'Avg. EU ETS Price/tonne' },
        { value: '10%', label: '2026 Default Markup' },
        { value: 'Sep 2027', label: 'First Surrender Deadline' },
    ];

    const coveredProducts = [
        { name: 'Iron & Steel', icon: '🔩', description: 'HS codes 7206-7229' },
        { name: 'Aluminum', icon: '🪙', description: 'HS codes 7601-7616' },
        { name: 'Cement', icon: '🧱', description: 'HS code 2523' },
        { name: 'Fertilizers', icon: '🌱', description: 'HS codes 2808, 2814, 3102-3105' },
        { name: 'Electricity', icon: '⚡', description: 'HS code 2716' },
        { name: 'Hydrogen', icon: '💨', description: 'HS code 2804 10 00' },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden section-padding">
                {/* Background Orbs */}
                <div className="orb orb-blue w-96 h-96 -top-48 -left-48" />
                <div className="orb orb-green w-80 h-80 top-1/3 -right-40" />

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 mb-8">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-sm font-medium text-red-200">
                                Using EU Default Values? You&apos;re Overpaying.
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Stop Overpaying on{' '}
                            <span className="text-gradient-eu">EU Carbon</span>{' '}
                            <span className="text-gradient-carbon">Import Tax</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            EU <strong>Default Values are punitive by design</strong>. Get real emission data from your
                            suppliers and save 40-60% on CBAM certificates. We make it easy.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/savings" className="btn-secondary text-lg px-8 py-4">
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    See How Much You&apos;re Overpaying
                                </span>
                            </Link>
                            <Link href="/supplier-kit" className="btn-outline text-lg px-8 py-4">
                                Get Supplier Data Kit
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="stat-card">
                                    <div className="stat-value">{stat.value}</div>
                                    <div className="text-sm text-slate-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What is CBAM Section */}
            <section className="section-padding border-t border-white/5">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What is <span className="text-gradient-eu">CBAM</span>?
                        </h2>
                        <p className="text-lg text-slate-300">
                            The Carbon Border Adjustment Mechanism is the EU&apos;s carbon tax on imports.
                            It requires importers to purchase certificates matching the embedded carbon
                            emissions in their goods.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl gradient-eu flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Price = EU ETS Rate</h3>
                                        <p className="text-slate-400 text-sm">
                                            CBAM certificate prices mirror EU ETS allowance prices, currently averaging €85+ per tonne CO₂.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl gradient-carbon flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Deduct Origin Carbon Prices</h3>
                                        <p className="text-slate-400 text-sm">
                                            If carbon tax was paid in the origin country, you can deduct that amount from your CBAM liability.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Default Value Markup</h3>
                                        <p className="text-slate-400 text-sm">
                                            Using default emission values instead of actual data? Add 10% markup in 2026, 20% in 2027, 30% from 2028.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card p-8 glow-blue">
                            <h3 className="text-xl font-bold mb-4 text-center">The CBAM Formula</h3>
                            <div className="bg-slate-900/50 rounded-xl p-6 text-center mb-6">
                                <code className="text-lg md:text-xl text-eu-blue-200">
                                    CBAM Cost = Quantity × Emissions × ETS Price
                                </code>
                            </div>
                            <div className="space-y-3 text-sm text-slate-400">
                                <p><strong className="text-white">Quantity:</strong> Tonnes of imported goods</p>
                                <p><strong className="text-white">Emissions:</strong> tCO₂e per tonne (actual or default)</p>
                                <p><strong className="text-white">ETS Price:</strong> Current EU ETS allowance price</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Covered Products Section */}
            <section className="section-padding border-t border-white/5">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Products Covered by <span className="text-gradient-carbon">CBAM</span>
                        </h2>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            Six categories of carbon-intensive goods are currently subject to CBAM requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {coveredProducts.map((product) => (
                            <div key={product.name} className="card text-center hover-lift">
                                <div className="text-4xl mb-3">{product.icon}</div>
                                <h3 className="font-semibold mb-1">{product.name}</h3>
                                <p className="text-xs text-slate-500">{product.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/hs-lookup" className="btn-outline">
                            Search Full HS Code Database →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="section-padding border-t border-white/5">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Key <span className="text-gradient-eu">Deadlines</span>
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-eu-blue-500 via-carbon-500 to-eu-blue-500" />

                            {/* Timeline Items */}
                            <div className="space-y-8">
                                {/* Past Event */}
                                <div className="relative flex items-center md:justify-center">
                                    <div className="flex items-center gap-4 md:gap-8 ml-12 md:ml-0">
                                        <div className="hidden md:block text-right w-48">
                                            <span className="badge badge-green">Completed</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-carbon-500 flex items-center justify-center z-10 absolute left-0 md:relative">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="card md:w-64">
                                            <span className="badge badge-green mb-2 md:hidden">Completed</span>
                                            <h4 className="font-semibold">Jan 1, 2026</h4>
                                            <p className="text-sm text-slate-400">Definitive CBAM phase begins</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Current Period */}
                                <div className="relative flex items-center md:justify-center">
                                    <div className="flex items-center gap-4 md:gap-8 ml-12 md:ml-0 md:flex-row-reverse">
                                        <div className="hidden md:block text-left w-48">
                                            <span className="badge badge-blue">Current</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-eu-blue-500 flex items-center justify-center z-10 absolute left-0 md:relative animate-pulse">
                                            <div className="w-3 h-3 rounded-full bg-white" />
                                        </div>
                                        <div className="card md:w-64 border-eu-blue-500/50">
                                            <span className="badge badge-blue mb-2 md:hidden">Current</span>
                                            <h4 className="font-semibold">Jan 13, 2026</h4>
                                            <p className="text-sm text-slate-400">Track imports for 2026 declarations</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Future Event 1 */}
                                <div className="relative flex items-center md:justify-center">
                                    <div className="flex items-center gap-4 md:gap-8 ml-12 md:ml-0">
                                        <div className="hidden md:block text-right w-48">
                                            <span className="badge badge-amber">Upcoming</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-amber-500/50 flex items-center justify-center z-10 absolute left-0 md:relative">
                                            <span className="text-xs font-bold text-amber-200">!</span>
                                        </div>
                                        <div className="card md:w-64">
                                            <span className="badge badge-amber mb-2 md:hidden">Upcoming</span>
                                            <h4 className="font-semibold">Feb 1, 2027</h4>
                                            <p className="text-sm text-slate-400">CBAM certificate sales begin</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Future Event 2 */}
                                <div className="relative flex items-center md:justify-center">
                                    <div className="flex items-center gap-4 md:gap-8 ml-12 md:ml-0 md:flex-row-reverse">
                                        <div className="hidden md:block text-left w-48">
                                            <span className="badge badge-red">Critical</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-red-500/50 flex items-center justify-center z-10 absolute left-0 md:relative">
                                            <span className="text-xs font-bold text-red-200">⚠</span>
                                        </div>
                                        <div className="card md:w-64 border-red-500/30">
                                            <span className="badge badge-red mb-2 md:hidden">Critical</span>
                                            <h4 className="font-semibold">Sep 30, 2027</h4>
                                            <p className="text-sm text-slate-400">First certificate surrender deadline</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/compliance" className="btn-primary">
                            View Full Compliance Timeline →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding border-t border-white/5">
                <div className="container-custom">
                    <div className="card p-8 md:p-12 text-center glow-blue">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Calculate Your CBAM Costs?
                        </h2>
                        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                            Our free calculator uses official EU default values and current ETS prices
                            to estimate your carbon certificate liability.
                        </p>
                        <Link href="/calculator" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Start Free Calculator
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
