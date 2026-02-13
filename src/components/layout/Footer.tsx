import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="section-padding">
            <div className="container-custom max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
                    <p className="text-lg">
                        Last updated: January 13, 2026
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                        <p>
                            CBAM Calculator (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, and safeguard your information when
                            you use our website at cbam-calculator.eu.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Contact Information:</strong> Name, email address, and company name when you use our calculator or contact forms.</li>
                            <li><strong>Calculator Inputs:</strong> Product type, quantity, country of origin, and emission data you enter into our tools.</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage patterns through standard analytics.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                        <p>We use collected information to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide CBAM cost estimates and reports</li>
                            <li>Respond to your inquiries and support requests</li>
                            <li>Send relevant updates about CBAM regulations (with your consent)</li>
                            <li>Improve our tools and user experience</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Data Sharing</h2>
                        <p>
                            We do not sell your personal information. We may share data with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Service providers (e.g., Formspree for form processing)</li>
                            <li>Legal authorities when required by law</li>
                            <li>Business partners with your explicit consent</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
                        <p>
                            We retain your information for as long as necessary to provide our services and comply
                            with legal obligations. Calculator usage data is retained for up to 24 months.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights (GDPR)</h2>
                        <p>Under EU GDPR, you have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to processing</li>
                            <li>Data portability</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                        <p className="mt-4">
                            To exercise these rights, contact us using the information below.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies</h2>
                        <p>
                            We use essential cookies to ensure our website functions properly. We may use
                            analytics cookies to understand how visitors interact with our site. You can
                            control cookie preferences through your browser settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
                        <p>
                            For privacy-related inquiries, please email us at{' '}
                            <a href="mailto:info@cbam-calculator.eu" className="text-eu-blue-300 hover:underline">
                                info@cbam-calculator.eu
                            </a>{' '}
                            or use our <Link href="/contact" className="text-eu-blue-300 hover:underline">contact form</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
