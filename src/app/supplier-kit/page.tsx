import Link from 'next/link';

export default function SupplierKitPage() {
    return (
        <div className="section-padding">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="badge badge-green mb-4">The Solution</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Get Real <span className="text-gradient-carbon">Supplier Data</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        We make it easy for your Asian suppliers to provide the emission data you need —
                        in their language, without the complexity.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* How It Works */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">How the Supplier Data Kit Works</h2>

                        <div className="space-y-4">
                            <div className="card p-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full gradient-eu flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                                    <div>
                                        <h3 className="font-medium mb-1">You Request a Kit</h3>
                                        <p className="text-sm text-slate-400">Enter your email and we generate a unique supplier link.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full gradient-eu flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                                    <div>
                                        <h3 className="font-medium mb-1">Send Link to Your Supplier</h3>
                                        <p className="text-sm text-slate-400">Forward the link to your factory in China, Turkey, or elsewhere. They see a form in their language.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full gradient-eu flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                                    <div>
                                        <h3 className="font-medium mb-1">Supplier Fills Simple Form</h3>
                                        <p className="text-sm text-slate-400">They answer basic questions about electricity, production, steel source. Takes ~10 minutes.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full gradient-carbon flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                                    <div>
                                        <h3 className="font-medium mb-1">You Get Real Data</h3>
                                        <p className="text-sm text-slate-400">Receive a reference with their emission data, ready for your CBAM declaration.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Supported Languages */}
                        <div className="card p-6">
                            <h3 className="font-medium mb-3">Supported Languages</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="badge badge-blue">🇬🇧 English</span>
                                <span className="badge badge-blue">🇨🇳 中文 (Chinese)</span>
                                <span className="badge badge-blue">🇹🇷 Türkçe (Turkish)</span>
                            </div>
                        </div>
                    </div>

                    {/* Request Form - HTML submission */}
                    <div>
                        <form
                            action="https://formspree.io/f/mjggvlew"
                            method="POST"
                            className="card p-6 md:p-8 glow-blue"
                        >
                            <input type="hidden" name="_next" value="https://cbam-calculator.eu/thank-you/" />
                            <input type="hidden" name="_subject" value="CBAM - Supplier Kit Request" />
                            <input type="hidden" name="requestType" value="Supplier Data Kit Request" />

                            <h2 className="text-xl font-semibold mb-6">Get Your Supplier Data Kit</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Your Business Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@company.com"
                                        className="input-field"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Company Name *</label>
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Your Company Ltd."
                                        className="input-field"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Supplier&apos;s Primary Country *</label>
                                    <select
                                        name="supplierCountry"
                                        className="select-field"
                                        required
                                    >
                                        <option value="">Select country...</option>
                                        <option value="China">🇨🇳 China</option>
                                        <option value="Turkey">🇹🇷 Turkey</option>
                                        <option value="India">🇮🇳 India</option>
                                        <option value="Taiwan">🇹🇼 Taiwan</option>
                                        <option value="Vietnam">🇻🇳 Vietnam</option>
                                        <option value="Other">🌍 Other</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-secondary w-full py-4 text-lg"
                                >
                                    Generate Supplier Link
                                </button>
                            </div>

                            <p className="text-xs text-slate-500 text-center mt-4">
                                Free. No credit card required. We respect your privacy.
                            </p>
                        </form>

                        {/* Already Have Link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-slate-400">
                                Already have a supplier link?{' '}
                                <Link href="/supplier" className="text-eu-blue-300 hover:underline">
                                    View Supplier Form →
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
