'use client';

import { useState } from 'react';
import Link from 'next/link';

type Language = 'en' | 'zh' | 'tr';

interface EmailTemplate {
    subject: string;
    greeting: string;
    intro: string;
    dataRequest: string;
    fields: string[];
    closing: string;
    signature: string;
}

const EMAIL_TEMPLATES: Record<Language, EmailTemplate> = {
    en: {
        subject: 'CBAM Emission Data Request - {PRODUCT}',
        greeting: 'Dear {SUPPLIER_NAME},',
        intro: 'As your EU-based customer, we are writing to request specific emission data for the products we import from your facility. Under the EU Carbon Border Adjustment Mechanism (CBAM), we are required to report the carbon emissions embedded in imported goods.',
        dataRequest: 'We kindly request the following information for: {PRODUCT}',
        fields: [
            'Total annual production volume (tonnes)',
            'Direct emissions (Scope 1) per tonne of product (tCO₂e/t)',
            'Indirect emissions from electricity (Scope 2) per tonne (tCO₂e/t)',
            'Primary electricity source (grid, renewable, on-site generation)',
            'Monthly electricity consumption (kWh)',
            'Percentage of recycled material used (if applicable)',
        ],
        closing: 'To make this process easier, we have prepared a simple online form that you can complete in approximately 10 minutes. You can find it here:\n\n{FORM_LINK}\n\nThe form is available in multiple languages including Chinese and Turkish.\n\nIf you have any questions or need clarification, please don\'t hesitate to contact us.\n\nThank you for your cooperation in helping us meet our EU compliance requirements.',
        signature: 'Best regards,\n{YOUR_NAME}\n{YOUR_COMPANY}',
    },
    zh: {
        subject: 'CBAM碳排放数据请求 - {PRODUCT}',
        greeting: '尊敬的 {SUPPLIER_NAME}：',
        intro: '作为您的欧盟客户，我们特此致函，请求您提供贵公司生产的、我司进口商品的碳排放数据。根据欧盟碳边境调节机制（CBAM）的要求，我们需要申报进口商品中的碳排放量。',
        dataRequest: '我们恳请您提供以下产品的相关信息：{PRODUCT}',
        fields: [
            '年生产总量（吨）',
            '每吨产品的直接排放（范围1）（tCO₂e/吨）',
            '每吨产品的电力间接排放（范围2）（tCO₂e/吨）',
            '主要电力来源（电网、可再生能源、现场发电）',
            '月用电量（千瓦时）',
            '使用的再生材料比例（如适用）',
        ],
        closing: '为了简化此流程，我们准备了一份简单的在线表格，您只需约10分钟即可完成填写。请访问以下链接：\n\n{FORM_LINK}\n\n该表格支持中文、英文和土耳其文。\n\n如有任何疑问，请随时与我们联系。\n\n感谢您的配合，帮助我们满足欧盟合规要求。',
        signature: '此致敬礼，\n{YOUR_NAME}\n{YOUR_COMPANY}',
    },
    tr: {
        subject: 'CBAM Emisyon Veri Talebi - {PRODUCT}',
        greeting: 'Sayın {SUPPLIER_NAME},',
        intro: 'AB merkezli müşteriniz olarak, tesisinizden ithal ettiğimiz ürünler için belirli emisyon verilerini talep etmek üzere yazıyoruz. AB Karbon Sınır Düzenleme Mekanizması (CBAM) kapsamında, ithal edilen mallardaki gömülü karbon emisyonlarını raporlamamız gerekmektedir.',
        dataRequest: 'Aşağıdaki ürün için bilgi talep ediyoruz: {PRODUCT}',
        fields: [
            'Toplam yıllık üretim hacmi (ton)',
            'Ton ürün başına doğrudan emisyonlar (Kapsam 1) (tCO₂e/t)',
            'Ton başına elektrikten kaynaklanan dolaylı emisyonlar (Kapsam 2) (tCO₂e/t)',
            'Birincil elektrik kaynağı (şebeke, yenilenebilir, yerinde üretim)',
            'Aylık elektrik tüketimi (kWh)',
            'Kullanılan geri dönüştürülmüş malzeme yüzdesi (varsa)',
        ],
        closing: 'Bu süreci kolaylaştırmak için yaklaşık 10 dakikada doldurulabilecek basit bir çevrimiçi form hazırladık. Buradan erişebilirsiniz:\n\n{FORM_LINK}\n\nForm Türkçe, İngilizce ve Çince dahil olmak üzere birden fazla dilde mevcuttur.\n\nHerhangi bir sorunuz olursa lütfen bizimle iletişime geçmekten çekinmeyin.\n\nAB uyumluluk gereksinimlerimizi karşılamamıza yardımcı olan işbirliğiniz için teşekkür ederiz.',
        signature: 'Saygılarımla,\n{YOUR_NAME}\n{YOUR_COMPANY}',
    },
};

const LANGUAGE_LABELS: Record<Language, { name: string; flag: string }> = {
    en: { name: 'English', flag: '🇬🇧' },
    zh: { name: '中文 (Chinese)', flag: '🇨🇳' },
    tr: { name: 'Türkçe (Turkish)', flag: '🇹🇷' },
};

export default function EmailGeneratorPage() {
    const [language, setLanguage] = useState<Language>('en');
    const [formData, setFormData] = useState({
        supplierName: '',
        product: '',
        yourName: '',
        yourCompany: '',
    });
    const [copied, setCopied] = useState(false);

    const template = EMAIL_TEMPLATES[language];
    const formLink = 'https://cbam-calculator.eu/supplier/';

    const generateEmail = () => {
        const fieldsFormatted = template.fields.map((f, i) => `${i + 1}. ${f}`).join('\n');

        let email = `Subject: ${template.subject}\n\n`;
        email += `${template.greeting}\n\n`;
        email += `${template.intro}\n\n`;
        email += `${template.dataRequest}\n\n`;
        email += `${fieldsFormatted}\n\n`;
        email += `${template.closing}\n\n`;
        email += template.signature;

        // Replace placeholders
        email = email
            .replace(/{SUPPLIER_NAME}/g, formData.supplierName || '[Supplier Name]')
            .replace(/{PRODUCT}/g, formData.product || '[Product Name]')
            .replace(/{YOUR_NAME}/g, formData.yourName || '[Your Name]')
            .replace(/{YOUR_COMPANY}/g, formData.yourCompany || '[Your Company]')
            .replace(/{FORM_LINK}/g, formLink);

        return email;
    };

    const handleCopy = async () => {
        const email = generateEmail();
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="section-padding">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <span className="badge badge-green mb-4">Time Saver</span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Supplier <span className="text-gradient-carbon">Email Generator</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Generate a professional, multi-language email to request emission data from your suppliers.
                        Ready to copy and send in seconds.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Form Side */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-6">Customize Your Email</h2>

                        {/* Language Selector */}
                        <div className="mb-6">
                            <label className="block text-sm text-slate-400 mb-2">Email Language</label>
                            <div className="grid grid-cols-3 gap-2">
                                {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setLanguage(lang)}
                                        className={`p-3 rounded-xl border-2 transition-all text-center ${language === lang
                                                ? 'border-eu-blue-500 bg-eu-blue-500/10'
                                                : 'border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <span className="text-xl block mb-1">{LANGUAGE_LABELS[lang].flag}</span>
                                        <span className="text-xs">{LANGUAGE_LABELS[lang].name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Supplier Name</label>
                                <input
                                    type="text"
                                    name="supplierName"
                                    value={formData.supplierName}
                                    onChange={handleChange}
                                    placeholder="e.g., Shandong Steel Co."
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    name="product"
                                    value={formData.product}
                                    onChange={handleChange}
                                    placeholder="e.g., Cold-rolled Steel Coils"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    name="yourName"
                                    value={formData.yourName}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Your Company</label>
                                <input
                                    type="text"
                                    name="yourCompany"
                                    value={formData.yourCompany}
                                    onChange={handleChange}
                                    placeholder="Your company name"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleCopy}
                            className={`w-full mt-6 py-4 rounded-xl font-medium transition-all ${copied
                                    ? 'bg-carbon-500 text-white'
                                    : 'btn-secondary'
                                }`}
                        >
                            {copied ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied to Clipboard!
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy Email to Clipboard
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Preview Side */}
                    <div className="card p-6 bg-slate-900/50">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Email Preview</h2>
                            <span className="badge badge-blue">
                                {LANGUAGE_LABELS[language].flag} {LANGUAGE_LABELS[language].name}
                            </span>
                        </div>
                        <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono bg-slate-950/50 rounded-xl p-4 max-h-[500px] overflow-y-auto">
                            {generateEmail()}
                        </pre>
                    </div>
                </div>

                {/* Related Links */}
                <div className="mt-8 text-center">
                    <p className="text-slate-400 mb-4">Need more help with supplier data collection?</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/supplier-kit" className="btn-outline">
                            Get Supplier Kit
                        </Link>
                        <Link href="/supplier" className="btn-outline">
                            Preview Supplier Form
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
