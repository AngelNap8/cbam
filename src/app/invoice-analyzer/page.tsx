'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

interface ExtractedData {
    productDescription: string;
    quantity: string;
    unit: string;
    originCountry: string;
    supplierName: string;
    value: string;
    hsCode: string;
}

// Common product keywords for CBAM goods
const PRODUCT_KEYWORDS = {
    steel: ['steel', 'iron', 'coil', 'sheet', 'bar', 'pipe', 'tube', 'beam', 'wire', 'rod'],
    aluminum: ['aluminum', 'aluminium', 'foil', 'alloy'],
    cement: ['cement', 'clinker', 'concrete'],
    fertilizer: ['fertilizer', 'ammonia', 'nitrate', 'urea', 'phosphate'],
    hydrogen: ['hydrogen', 'h2'],
    electricity: ['electricity', 'power', 'energy', 'kwh', 'mwh'],
};

// Country detection patterns
const COUNTRY_PATTERNS = [
    { pattern: /china|chinese|prc|cn\b/i, country: 'China' },
    { pattern: /india|indian|in\b/i, country: 'India' },
    { pattern: /turkey|turkish|türkiye|tr\b/i, country: 'Turkey' },
    { pattern: /russia|russian|ru\b/i, country: 'Russia' },
    { pattern: /vietnam|vietnamese|vn\b/i, country: 'Vietnam' },
    { pattern: /korea|korean|kr\b/i, country: 'South Korea' },
    { pattern: /japan|japanese|jp\b/i, country: 'Japan' },
    { pattern: /brazil|brazilian|br\b/i, country: 'Brazil' },
    { pattern: /ukraine|ukrainian|ua\b/i, country: 'Ukraine' },
    { pattern: /egypt|egyptian|eg\b/i, country: 'Egypt' },
];

// HS Code patterns for CBAM goods
const HS_PATTERNS = [
    { pattern: /\b(72[0-9]{2})\b/, category: 'Iron & Steel' },
    { pattern: /\b(73[0-9]{2})\b/, category: 'Steel Products' },
    { pattern: /\b(76[0-9]{2})\b/, category: 'Aluminum' },
    { pattern: /\b(25[0-9]{2})\b/, category: 'Cement' },
    { pattern: /\b(31[0-9]{2})\b/, category: 'Fertilizers' },
    { pattern: /\b(28[0-4][0-9])\b/, category: 'Chemicals/Hydrogen' },
];

export default function InvoiceAnalyzerPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
    const [rawText, setRawText] = useState('');
    const [inputMethod, setInputMethod] = useState<'paste' | 'file'>('paste');
    const [pastedText, setPastedText] = useState('');

    const extractDataFromText = useCallback((text: string): ExtractedData => {
        const data: ExtractedData = {
            productDescription: '',
            quantity: '',
            unit: '',
            originCountry: '',
            supplierName: '',
            value: '',
            hsCode: '',
        };

        // Extract quantity (look for numbers followed by units)
        const quantityMatch = text.match(/(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*(kg|ton(?:ne)?s?|mt|pcs|pieces|units|m³|cubic)/i);
        if (quantityMatch) {
            data.quantity = quantityMatch[1].replace(/,/g, '');
            data.unit = quantityMatch[2].toLowerCase();
            if (data.unit === 'mt' || data.unit.includes('ton')) {
                data.unit = 'tonnes';
            }
        }

        // Extract value (currency patterns)
        const valueMatch = text.match(/(?:USD|EUR|€|\$)\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i) ||
            text.match(/(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:USD|EUR)/i);
        if (valueMatch) {
            data.value = valueMatch[1].replace(/,/g, '');
        }

        // Detect country of origin
        for (const { pattern, country } of COUNTRY_PATTERNS) {
            if (pattern.test(text)) {
                data.originCountry = country;
                break;
            }
        }

        // Detect HS code
        for (const { pattern, category } of HS_PATTERNS) {
            const match = text.match(pattern);
            if (match) {
                data.hsCode = match[1];
                data.productDescription = category;
                break;
            }
        }

        // Detect product from keywords if not found via HS code
        if (!data.productDescription) {
            for (const [category, keywords] of Object.entries(PRODUCT_KEYWORDS)) {
                for (const keyword of keywords) {
                    if (text.toLowerCase().includes(keyword)) {
                        data.productDescription = category.charAt(0).toUpperCase() + category.slice(1);
                        break;
                    }
                }
                if (data.productDescription) break;
            }
        }

        // Try to extract supplier name (look for company patterns)
        const companyMatch = text.match(/(?:from|supplier|vendor|manufacturer|exporter)[:\s]+([A-Z][A-Za-z\s&.]+(?:Co\.?|Ltd\.?|Inc\.?|Corp\.?|LLC|GmbH|S\.?A\.?))/i);
        if (companyMatch) {
            data.supplierName = companyMatch[1].trim();
        }

        return data;
    }, []);

    const handleTextPaste = () => {
        if (!pastedText.trim()) return;

        setIsProcessing(true);
        setRawText(pastedText);

        // Simulate processing delay for UX
        setTimeout(() => {
            const data = extractDataFromText(pastedText);
            setExtractedData(data);
            setIsProcessing(false);
        }, 800);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsProcessing(true);

        try {
            // For text files, read directly
            if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                const text = await file.text();
                setRawText(text);
                const data = extractDataFromText(text);
                setExtractedData(data);
            }
            // For PDFs, inform user we need text
            else if (file.type === 'application/pdf') {
                setRawText('[PDF files require OCR processing. For best results, please copy and paste the invoice text.]');
                setExtractedData(null);
            }
            // For images, inform about OCR
            else if (file.type.startsWith('image/')) {
                setRawText('[Image files require OCR processing. For best results, please copy and paste the invoice text.]');
                setExtractedData(null);
            }
        } catch (error) {
            console.error('File processing error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const resetAnalyzer = () => {
        setExtractedData(null);
        setRawText('');
        setPastedText('');
    };

    return (
        <div className="section-padding">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <span className="badge badge-amber mb-4">AI-Powered</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Invoice <span className="text-gradient-eu">Analyzer</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Paste your supplier invoice text and we&apos;ll automatically extract product details,
                        quantities, and origin country to speed up your CBAM calculations.
                    </p>
                </div>

                {!extractedData ? (
                    <div className="card p-6 md:p-8">
                        {/* Input Method Toggle */}
                        <div className="flex gap-2 mb-6">
                            <button
                                onClick={() => setInputMethod('paste')}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${inputMethod === 'paste'
                                        ? 'bg-eu-blue-500 text-white'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                                    }`}
                            >
                                📋 Paste Text
                            </button>
                            <button
                                onClick={() => setInputMethod('file')}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${inputMethod === 'file'
                                        ? 'bg-eu-blue-500 text-white'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                                    }`}
                            >
                                📄 Upload File
                            </button>
                        </div>

                        {inputMethod === 'paste' ? (
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">
                                    Paste invoice text or product description
                                </label>
                                <textarea
                                    value={pastedText}
                                    onChange={(e) => setPastedText(e.target.value)}
                                    placeholder="Copy and paste the invoice content here...

Example:
Commercial Invoice #INV-2026-001
Supplier: Shandong Steel Manufacturing Co., Ltd
Origin: China
Product: Cold-rolled Steel Coils (HS Code: 7209)
Quantity: 500 MT
Unit Price: USD 850/MT
Total: USD 425,000"
                                    rows={10}
                                    className="input-field font-mono text-sm resize-none"
                                />
                                <button
                                    onClick={handleTextPaste}
                                    disabled={!pastedText.trim() || isProcessing}
                                    className="btn-primary w-full mt-4 py-4 disabled:opacity-50"
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Analyzing...
                                        </span>
                                    ) : (
                                        'Analyze Invoice'
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div>
                                <label className="block">
                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:border-eu-blue-500/50 transition-colors cursor-pointer">
                                        <svg className="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="text-slate-400 mb-2">Drop a file here or click to upload</p>
                                        <p className="text-sm text-slate-500">Supports: TXT files (PDF/Image OCR coming soon)</p>
                                        <input
                                            type="file"
                                            accept=".txt,.pdf,image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                    </div>
                                </label>
                            </div>
                        )}

                        {rawText && !extractedData && (
                            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <p className="text-sm text-amber-200">{rawText}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Extracted Data Card */}
                        <div className="card p-6 md:p-8 glow-green">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full gradient-carbon flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold">Data Extracted Successfully</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-500 mb-1">Product Category</label>
                                        <input
                                            type="text"
                                            value={extractedData.productDescription || 'Not detected'}
                                            readOnly
                                            className="input-field bg-slate-800/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-500 mb-1">Quantity</label>
                                        <input
                                            type="text"
                                            value={extractedData.quantity ? `${extractedData.quantity} ${extractedData.unit}` : 'Not detected'}
                                            readOnly
                                            className="input-field bg-slate-800/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-500 mb-1">HS Code</label>
                                        <input
                                            type="text"
                                            value={extractedData.hsCode || 'Not detected'}
                                            readOnly
                                            className="input-field bg-slate-800/50"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-500 mb-1">Country of Origin</label>
                                        <input
                                            type="text"
                                            value={extractedData.originCountry || 'Not detected'}
                                            readOnly
                                            className="input-field bg-slate-800/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-500 mb-1">Supplier Name</label>
                                        <input
                                            type="text"
                                            value={extractedData.supplierName || 'Not detected'}
                                            readOnly
                                            className="input-field bg-slate-800/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-500 mb-1">Value</label>
                                        <input
                                            type="text"
                                            value={extractedData.value ? `€${parseFloat(extractedData.value).toLocaleString()}` : 'Not detected'}
                                            readOnly
                                            className="input-field bg-slate-800/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={resetAnalyzer} className="btn-outline flex-1">
                                Analyze Another
                            </button>
                            <Link
                                href={`/calculator?product=${encodeURIComponent(extractedData.productDescription)}&quantity=${extractedData.quantity}&origin=${encodeURIComponent(extractedData.originCountry)}`}
                                className="btn-primary flex-1 text-center"
                            >
                                Continue to Calculator →
                            </Link>
                        </div>

                        {/* Raw Text Preview */}
                        <details className="card p-4">
                            <summary className="cursor-pointer text-sm text-slate-400 hover:text-slate-300">
                                View extracted text
                            </summary>
                            <pre className="mt-4 text-xs text-slate-500 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                                {rawText}
                            </pre>
                        </details>
                    </div>
                )}

                {/* Info Card */}
                <div className="mt-8 card p-6 bg-slate-800/30">
                    <h3 className="font-semibold mb-3">How it works</h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                            <span className="text-eu-blue-400">1.</span>
                            Copy text from your supplier invoice or commercial document
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-eu-blue-400">2.</span>
                            Our AI extracts product type, quantity, origin, and HS codes
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-eu-blue-400">3.</span>
                            Review the extracted data and continue to the calculator
                        </li>
                    </ul>
                    <p className="text-xs text-slate-500 mt-4">
                        💡 Tip: For best results, include the full invoice text including supplier details and product descriptions.
                    </p>
                </div>
            </div>
        </div>
    );
}
