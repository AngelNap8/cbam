import Link from 'next/link';

export default function ContactPage() {
    return (
        <div className="section-padding">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Get in <span className="text-gradient-eu">Touch</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Have questions about CBAM compliance? Need help with your calculations?
                        We&apos;re here to assist.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <div className="w-12 h-12 rounded-xl gradient-eu flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Email Us</h3>
                            <a href="mailto:info@cbam-calculator.eu" className="text-eu-blue-300 hover:text-eu-blue-200 text-sm">
                                info@cbam-calculator.eu
                            </a>
                        </div>

                        <div className="card p-6">
                            <div className="w-12 h-12 rounded-xl gradient-carbon flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Expertise</h3>
                            <p className="text-sm text-slate-400">
                                EU carbon regulations, CBAM compliance, emission calculations.
                            </p>
                        </div>

                        <div className="card p-6">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Response Time</h3>
                            <p className="text-sm text-slate-400">
                                We aim to respond to all inquiries within 1-2 business days.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form - HTML submission */}
                    <div className="md:col-span-2">
                        <form
                            action="https://formspree.io/f/mjggvlew"
                            method="POST"
                            className="card p-6 md:p-8"
                        >
                            <input type="hidden" name="_next" value="https://cbam-calculator.eu/thank-you/" />
                            <input type="hidden" name="_subject" value="CBAM Calculator - Contact Form" />

                            <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>

                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Your Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="input-field"
                                        placeholder="John Smith"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Business Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="input-field"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-slate-400 mb-2">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    className="input-field"
                                    placeholder="Your Company Ltd."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-slate-400 mb-2">Subject *</label>
                                <select
                                    name="subject"
                                    required
                                    className="select-field"
                                >
                                    <option value="">Select a topic...</option>
                                    <option value="Calculator Question">Calculator Question</option>
                                    <option value="Compliance Inquiry">Compliance Inquiry</option>
                                    <option value="Request Consultation">Request Consultation</option>
                                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-slate-400 mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    className="input-field resize-none"
                                    placeholder="Tell us about your CBAM inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full py-4"
                            >
                                Send Message
                            </button>

                            <p className="text-xs text-slate-500 text-center mt-4">
                                By submitting this form, you agree to receive occasional communications from us.
                                We respect your privacy.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
