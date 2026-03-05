import Link from 'next/link';

export default function ThankYouPage() {
    return (
        <div className="section-padding">
            <div className="container-custom max-w-2xl">
                <div className="card p-8 md:p-12 text-center glow-green">
                    <div className="w-20 h-20 rounded-full gradient-carbon flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                    <p className="text-slate-400 mb-8">
                        Your message has been received. We&apos;ll review your inquiry and get back to you within 24-48 business hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/" className="btn-primary">
                            Return to Home
                        </Link>
                        <Link href="/savings" className="btn-secondary">
                            Try Savings Calculator
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
