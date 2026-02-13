export default function TermsPage() {
    return (
        <div className="section-padding">
            <div className="container-custom max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Use</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
                    <p className="text-lg">
                        Last updated: January 13, 2026
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using CBAM Calculator (cbam-calculator.eu), you agree to be bound
                            by these Terms of Use. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
                        <p>
                            CBAM Calculator provides free online tools for estimating Carbon Border Adjustment
                            Mechanism costs, looking up HS codes, and accessing CBAM regulatory information.
                            Our services are provided &quot;as is&quot; for informational purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
                        <p className="font-semibold text-amber-300">
                            IMPORTANT: The calculations, estimates, and information provided by this website are
                            for informational purposes only and do not constitute legal, tax, or professional advice.
                        </p>
                        <p className="mt-4">
                            While we strive for accuracy, CBAM regulations are complex and subject to change.
                            Actual CBAM costs may differ based on:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Verified emission data vs. default values</li>
                            <li>Fluctuating EU ETS prices</li>
                            <li>Regulatory updates and interpretations</li>
                            <li>Specific circumstances of your imports</li>
                        </ul>
                        <p className="mt-4">
                            Always consult with qualified customs brokers, tax advisors, or legal professionals
                            for compliance decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, CBAM Calculator and its operators shall not
                            be liable for any direct, indirect, incidental, consequential, or punitive damages
                            arising from your use of our services, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Financial losses based on calculator estimates</li>
                            <li>Compliance failures or penalties</li>
                            <li>Business decisions made using our information</li>
                            <li>Service interruptions or errors</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Accuracy of Information</h2>
                        <p>
                            We make reasonable efforts to ensure information accuracy based on publicly available
                            EU CBAM regulations. However, we do not guarantee that all information is current,
                            complete, or error-free. Default emission values and other data may be updated
                            periodically by EU authorities.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
                        <p>
                            All content, design, and functionality of this website are protected by copyright
                            and other intellectual property rights. You may not reproduce, distribute, or
                            create derivative works without our express permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. User Conduct</h2>
                        <p>You agree not to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Use our services for any unlawful purpose</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Interfere with the proper functioning of the website</li>
                            <li>Submit false or misleading information</li>
                            <li>Use automated systems to scrape or access our data without permission</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Modifications</h2>
                        <p>
                            We reserve the right to modify these Terms of Use at any time. Changes will be
                            effective immediately upon posting. Your continued use of the service constitutes
                            acceptance of modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the
                            European Union and applicable member state law.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
