import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
    metadataBase: new URL('https://cbam-calculator.eu'),
    title: {
        default: "CBAM Calculator | EU Carbon Border Adjustment Mechanism Cost Estimator",
        template: "%s | CBAM Calculator"
    },
    description: "Free CBAM cost calculator for EU importers. Estimate your Carbon Border Adjustment Mechanism certificate costs for steel, aluminum, cement, fertilizers, and hydrogen imports.",
    keywords: [
        "CBAM calculator",
        "carbon border adjustment mechanism",
        "EU carbon tax",
        "CBAM compliance",
        "carbon certificate cost",
        "EU ETS",
        "embedded emissions calculator",
        "CBAM 2026",
        "import carbon tax EU"
    ],
    authors: [{ name: "CBAM Calculator" }],
    openGraph: {
        type: "website",
        locale: "en_EU",
        url: "https://cbam-calculator.eu",
        siteName: "CBAM Calculator",
        title: "CBAM Calculator | EU Carbon Border Adjustment Mechanism",
        description: "Free calculator to estimate your CBAM certificate costs for imports into the EU.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "CBAM Calculator - EU Carbon Border Tax Estimator"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "CBAM Calculator | EU Carbon Tax Estimator",
        description: "Calculate your Carbon Border Adjustment Mechanism costs for EU imports."
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://cbam-calculator.eu"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            "name": "CBAM Calculator",
                            "description": "Free calculator to estimate Carbon Border Adjustment Mechanism (CBAM) certificate costs for EU imports",
                            "url": "https://cbam-calculator.eu",
                            "applicationCategory": "BusinessApplication",
                            "operatingSystem": "Any",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "EUR"
                            },
                            "featureList": [
                                "CBAM cost estimation",
                                "HS code lookup",
                                "Default emission values",
                                "PDF report generation"
                            ]
                        })
                    }}
                />
            </head>
            <body className="antialiased min-h-screen flex flex-col">
                <Header />
                <Breadcrumbs />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
