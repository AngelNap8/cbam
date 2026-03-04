'use client';

import { useState } from 'react';

type Language = 'en' | 'zh' | 'tr';

const TRANSLATIONS = {
    en: {
        title: 'Supplier Emission Data Form',
        subtitle: 'Help your EU importer comply with CBAM regulations',
        intro: 'Your customer needs emission data for EU Carbon Border Adjustment Mechanism compliance. This form takes approximately 10 minutes to complete.',
        companySection: 'Company Information',
        companyName: 'Company Name',
        contactPerson: 'Contact Person',
        email: 'Email Address',
        productSection: 'Product Information',
        productType: 'Product Type',
        annualProduction: 'Annual Production Volume (tonnes)',
        energySection: 'Energy & Production Data',
        electricitySource: 'Primary Electricity Source',
        electricitySourceOptions: {
            grid: 'National Grid',
            solar: 'Solar/Renewable',
            mixed: 'Mixed (Grid + Renewable)',
            coal: 'On-site Coal Power',
        },
        monthlyElectricity: 'Monthly Electricity Consumption (kWh)',
        steelSection: 'Steel Source (if applicable)',
        steelRecycled: 'Recycled Steel Percentage',
        productionProcess: 'Production Process',
        processOptions: {
            cold: 'Cold Forming',
            hot: 'Hot Forging',
            casting: 'Casting',
            machining: 'Machining',
        },
        additionalNotes: 'Additional Notes (optional)',
        submit: 'Submit Data',
        submitting: 'Submitting...',
        successTitle: 'Data Submitted Successfully!',
        successMessage: 'Your customer will receive the emission data. Reference:',
        requiredField: 'Required',
        disclaimer: 'Your data will be used solely for CBAM compliance calculations and shared only with the requesting EU importer.',
    },
    zh: {
        title: '供应商排放数据表',
        subtitle: '帮助您的欧盟进口商遵守CBAM法规',
        intro: '您的客户需要排放数据以满足欧盟碳边境调节机制(CBAM)的合规要求。填写此表格大约需要10分钟。',
        companySection: '公司信息',
        companyName: '公司名称',
        contactPerson: '联系人',
        email: '电子邮箱',
        productSection: '产品信息',
        productType: '产品类型',
        annualProduction: '年产量（吨）',
        energySection: '能源与生产数据',
        electricitySource: '主要电力来源',
        electricitySourceOptions: {
            grid: '国家电网',
            solar: '太阳能/可再生能源',
            mixed: '混合（电网+可再生能源）',
            coal: '现场燃煤发电',
        },
        monthlyElectricity: '月用电量（千瓦时）',
        steelSection: '钢材来源（如适用）',
        steelRecycled: '再生钢比例',
        productionProcess: '生产工艺',
        processOptions: {
            cold: '冷成型',
            hot: '热锻',
            casting: '铸造',
            machining: '机加工',
        },
        additionalNotes: '补充说明（可选）',
        submit: '提交数据',
        submitting: '提交中...',
        successTitle: '数据提交成功！',
        successMessage: '您的客户将收到排放数据。参考编号：',
        requiredField: '必填',
        disclaimer: '您的数据仅用于CBAM合规计算，仅与提出要求的欧盟进口商共享。',
    },
    tr: {
        title: 'Tedarikçi Emisyon Veri Formu',
        subtitle: 'AB ithalatçınızın CBAM düzenlemelerine uymasına yardımcı olun',
        intro: 'Müşteriniz, AB Karbon Sınır Düzenleme Mekanizması (CBAM) uyumluluğu için emisyon verilerine ihtiyaç duymaktadır. Bu formun doldurulması yaklaşık 10 dakika sürer.',
        companySection: 'Şirket Bilgileri',
        companyName: 'Şirket Adı',
        contactPerson: 'İletişim Kişisi',
        email: 'E-posta Adresi',
        productSection: 'Ürün Bilgileri',
        productType: 'Ürün Tipi',
        annualProduction: 'Yıllık Üretim Hacmi (ton)',
        energySection: 'Enerji ve Üretim Verileri',
        electricitySource: 'Birincil Elektrik Kaynağı',
        electricitySourceOptions: {
            grid: 'Ulusal Şebeke',
            solar: 'Güneş/Yenilenebilir',
            mixed: 'Karma (Şebeke + Yenilenebilir)',
            coal: 'Yerinde Kömür Enerjisi',
        },
        monthlyElectricity: 'Aylık Elektrik Tüketimi (kWh)',
        steelSection: 'Çelik Kaynağı (varsa)',
        steelRecycled: 'Geri Dönüştürülmüş Çelik Yüzdesi',
        productionProcess: 'Üretim Süreci',
        processOptions: {
            cold: 'Soğuk Şekillendirme',
            hot: 'Sıcak Dövme',
            casting: 'Döküm',
            machining: 'İşleme',
        },
        additionalNotes: 'Ek Notlar (isteğe bağlı)',
        submit: 'Verileri Gönder',
        submitting: 'Gönderiliyor...',
        successTitle: 'Veriler Başarıyla Gönderildi!',
        successMessage: 'Müşteriniz emisyon verilerini alacaktır. Referans:',
        requiredField: 'Zorunlu',
        disclaimer: 'Verileriniz yalnızca CBAM uyumluluk hesaplamaları için kullanılacak ve yalnızca talepte bulunan AB ithalatçısı ile paylaşılacaktır.',
    },
};

const PRODUCT_TYPES = {
    en: ['Screws', 'Bolts', 'Nuts', 'Washers', 'Rivets', 'Pins/Clips', 'Other Fasteners'],
    zh: ['螺钉', '螺栓', '螺母', '垫圈', '铆钉', '销钉/夹子', '其他紧固件'],
    tr: ['Vidalar', 'Cıvatalar', 'Somunlar', 'Rondelalar', 'Perçinler', 'Pimler/Klipler', 'Diğer Bağlantı Elemanları'],
};

export default function SupplierFormPage() {
    const [lang, setLang] = useState<Language>('en');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [referenceId, setReferenceId] = useState('');

    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        productType: '',
        annualProduction: '',
        electricitySource: '',
        monthlyElectricity: '',
        steelRecycled: '',
        productionProcess: '',
        additionalNotes: '',
    });

    const t = TRANSLATIONS[lang];
    const products = PRODUCT_TYPES[lang];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const generateRefId = () => {
        const now = new Date();
        return `CBAM-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const refId = generateRefId();

        try {
            await fetch('https://formspree.io/f/mjggvlew', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    referenceId: refId,
                    language: lang,
                    formType: 'Supplier Emission Data',
                    timestamp: new Date().toISOString(),
                    source: 'CBAM Calculator - Supplier Form',
                }),
            });

            setReferenceId(refId);
            setSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
            setReferenceId(refId);
            setSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="section-padding">
                <div className="container-custom max-w-2xl">
                    <div className="card p-8 md:p-12 text-center glow-green">
                        <div className="w-20 h-20 rounded-full gradient-carbon flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold mb-4">{t.successTitle}</h1>
                        <p className="text-slate-400 mb-4">{t.successMessage}</p>
                        <div className="bg-slate-900/50 rounded-xl p-4 mb-8">
                            <code className="text-2xl font-mono text-carbon-400">{referenceId}</code>
                        </div>
                        <p className="text-sm text-slate-500">
                            {lang === 'zh' ? '请保存此参考编号以供将来使用。' :
                                lang === 'tr' ? 'Lütfen bu referans numarasını gelecekte kullanmak üzere kaydedin.' :
                                    'Please save this reference number for future use.'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section-padding">
            <div className="container-custom max-w-3xl">
                {/* Language Selector */}
                <div className="flex justify-end mb-6">
                    <div className="inline-flex rounded-xl overflow-hidden border border-white/10">
                        <button
                            onClick={() => setLang('en')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${lang === 'en' ? 'bg-eu-blue-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                        >
                            🇬🇧 English
                        </button>
                        <button
                            onClick={() => setLang('zh')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${lang === 'zh' ? 'bg-eu-blue-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                        >
                            🇨🇳 中文
                        </button>
                        <button
                            onClick={() => setLang('tr')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${lang === 'tr' ? 'bg-eu-blue-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                        >
                            🇹🇷 Türkçe
                        </button>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
                    <p className="text-lg text-slate-300">{t.subtitle}</p>
                </div>

                <div className="card p-4 mb-8 bg-eu-blue-500/10 border-eu-blue-500/30">
                    <p className="text-sm text-eu-blue-200">{t.intro}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Company Information */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">{t.companySection}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">
                                    {t.companyName} <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">
                                        {t.contactPerson} <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="contactPerson"
                                        value={formData.contactPerson}
                                        onChange={handleChange}
                                        className="input-field"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">
                                        {t.email} <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input-field"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">{t.productSection}</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">
                                    {t.productType} <span className="text-red-400">*</span>
                                </label>
                                <select
                                    name="productType"
                                    value={formData.productType}
                                    onChange={handleChange}
                                    className="select-field"
                                    required
                                >
                                    <option value="">---</option>
                                    {products.map((p, i) => (
                                        <option key={i} value={PRODUCT_TYPES.en[i]}>{p}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">
                                    {t.annualProduction} <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="annualProduction"
                                    value={formData.annualProduction}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                    min="1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Energy & Production */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">{t.energySection}</h2>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">
                                        {t.electricitySource} <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        name="electricitySource"
                                        value={formData.electricitySource}
                                        onChange={handleChange}
                                        className="select-field"
                                        required
                                    >
                                        <option value="">---</option>
                                        <option value="grid">{t.electricitySourceOptions.grid}</option>
                                        <option value="solar">{t.electricitySourceOptions.solar}</option>
                                        <option value="mixed">{t.electricitySourceOptions.mixed}</option>
                                        <option value="coal">{t.electricitySourceOptions.coal}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">
                                        {t.monthlyElectricity} <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="monthlyElectricity"
                                        value={formData.monthlyElectricity}
                                        onChange={handleChange}
                                        className="input-field"
                                        required
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">{t.steelRecycled}</label>
                                    <select
                                        name="steelRecycled"
                                        value={formData.steelRecycled}
                                        onChange={handleChange}
                                        className="select-field"
                                    >
                                        <option value="">---</option>
                                        <option value="0">0%</option>
                                        <option value="25">~25%</option>
                                        <option value="50">~50%</option>
                                        <option value="75">~75%</option>
                                        <option value="100">100%</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">
                                        {t.productionProcess} <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        name="productionProcess"
                                        value={formData.productionProcess}
                                        onChange={handleChange}
                                        className="select-field"
                                        required
                                    >
                                        <option value="">---</option>
                                        <option value="cold">{t.processOptions.cold}</option>
                                        <option value="hot">{t.processOptions.hot}</option>
                                        <option value="casting">{t.processOptions.casting}</option>
                                        <option value="machining">{t.processOptions.machining}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="card p-6">
                        <label className="block text-sm text-slate-400 mb-2">{t.additionalNotes}</label>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            rows={3}
                            className="input-field resize-none"
                        />
                    </div>

                    {/* Disclaimer */}
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                        <p className="text-xs text-slate-500">{t.disclaimer}</p>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-secondary w-full py-4 text-lg disabled:opacity-50"
                    >
                        {isSubmitting ? t.submitting : t.submit}
                    </button>
                </form>
            </div>
        </div>
    );
}
