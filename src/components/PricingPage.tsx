import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Zap, Shield, HelpCircle, ChevronDown } from 'lucide-react';
import { Page } from '../types';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
}

function PricingCard({ name, price, period = '', description, features, cta, popular, highlighted, disabled }: PricingCardProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`
      relative rounded-3xl p-8 transition-all
      ${highlighted 
        ? 'bg-gradient-to-b from-amber-50 to-white border-2 border-amber-400 shadow-xl shadow-amber-100 scale-105 z-10' 
        : 'bg-white border border-gray-200 hover:border-gray-300'
      }
      ${disabled ? 'opacity-75' : ''}
    `}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-md whitespace-nowrap">
          {t('pricing.popular')}
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        
        <div className="mt-6 flex items-baseline justify-center gap-1">
          <span className="text-gray-400">$</span>
          <span className="text-5xl font-black text-gray-900">{price}</span>
          <span className="text-gray-400 text-sm">{period}</span>
        </div>
      </div>
      
      <ul className="mt-8 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
            <Check size={16} className={highlighted ? 'text-amber-500' : 'text-emerald-500'} />
            {feature}
          </li>
        ))}
      </ul>
      
      <button 
        disabled={disabled}
        className={`
          mt-8 w-full py-3.5 rounded-xl font-bold transition-all
          ${disabled 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : highlighted 
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }
        `}
      >
        {cta}
      </button>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
      >
        <span className="font-bold text-gray-900">{question}</span>
        <ChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-5 pt-0 text-gray-600 text-sm border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function PricingPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { t } = useTranslation();
  const [isYearly, setIsYearly] = useState(false);
  
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-black text-gray-900">{t('pricing.title')}</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          {t('pricing.subtitle')}
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className={`text-sm font-bold ${!isYearly ? 'text-gray-900' : 'text-gray-400'}`}>{t('pricing.monthly')}</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className={`w-14 h-7 rounded-full transition-all relative ${isYearly ? 'bg-blue-600' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${isYearly ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-sm font-bold ${isYearly ? 'text-gray-900' : 'text-gray-400'}`}>
            {t('pricing.yearly')} <span className="text-emerald-500">-20%</span>
          </span>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* FREE */}
        <PricingCard 
          name={t('pricing.free')}
          price="0"
          description="Perfect for getting started"
          features={[
            '5 video uploads',
            'Basic practice modes',
            '100 vocabulary words',
            'Community support'
          ]}
          cta={t('pricing.current')}
          disabled
        />
        
        {/* PLUS - Popular */}
        <PricingCard 
          name={t('pricing.plus')}
          price={isYearly ? '3.99' : '4.99'}
          period={isYearly ? t('pricing.billedYearly') : t('pricing.month')}
          description="For dedicated learners"
          features={[
            '20 video uploads',
            'All practice modes',
            'Test Mode with timer',
            '500 vocabulary words',
            'Advanced analytics',
            'Email support'
          ]}
          cta={t('pricing.upgrade')}
          popular
          highlighted
        />
        
        {/* PRO */}
        <PricingCard 
          name={t('pricing.pro')}
          price={isYearly ? '7.99' : '9.99'}
          period={isYearly ? t('pricing.billedYearly') : t('pricing.month')}
          description="Ultimate learning power"
          features={[
            'Unlimited video uploads',
            'All Plus features',
            'Audio download',
            'Unlimited vocabulary',
            'Progress export',
            'Priority support'
          ]}
          cta={t('pricing.upgrade')}
        />
      </section>
      
      {/* Feature Comparison */}
      <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm overflow-x-auto">
        <h2 className="text-xl font-bold text-center mb-8">{t('pricing.compare')}</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Feature</th>
              <th className="py-4 font-bold text-gray-900 text-center">Free</th>
              <th className="py-4 font-bold text-blue-600 text-center">Plus</th>
              <th className="py-4 font-bold text-amber-600 text-center">Pro</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              { name: 'Video Uploads', free: '5', plus: '20', pro: 'Unlimited' },
              { name: 'Practice Modes', free: 'Basic', plus: 'All', pro: 'All' },
              { name: 'Vocabulary Limit', free: '100', plus: '500', pro: 'Unlimited' },
              { name: 'Test Mode', free: '❌', plus: '✅', pro: '✅' },
              { name: 'Audio Export', free: '❌', plus: '❌', pro: '✅' },
              { name: 'Support', free: 'Community', plus: 'Email', pro: 'Priority' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-gray-50">
                <td className="py-4 font-medium text-gray-700">{row.name}</td>
                <td className="py-4 text-center text-gray-500">{row.free}</td>
                <td className="py-4 text-center text-gray-900 font-bold">{row.plus}</td>
                <td className="py-4 text-center text-gray-900 font-bold">{row.pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      
      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-center">{t('pricing.faq')}</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <FAQItem 
            question="Can I cancel anytime?" 
            answer="Yes, you can cancel your subscription at any time. Your access will remain active until the end of your current billing period." 
          />
          <FAQItem 
            question="What's included in Plus?" 
            answer="Plus includes increased video upload limits, access to all practice modes including Test Mode, more vocabulary storage, and advanced learning analytics." 
          />
          <FAQItem 
            question="How do I upgrade?" 
            answer="Simply click the upgrade button for your chosen plan. You will be redirected to our secure payment processor to complete your transaction." 
          />
        </div>
      </section>
    </div>
  );
}
