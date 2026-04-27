import React, { useState, useEffect } from 'react';
import { ServerCrash } from 'lucide-react';
import ErrorLayout from './ErrorLayout';
import { Page } from '../../types';
import { useTranslation } from 'react-i18next';

interface ServiceUnavailablePageProps {
  onNavigate: (page: Page) => void;
}

export default function ServiceUnavailablePage({ onNavigate }: ServiceUnavailablePageProps) {
  const [countdown, setCountdown] = useState(3);
  const { t } = useTranslation();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto retry when countdown hits 0
      console.log('Retrying...');
    }
  }, [countdown]);

  const handleRetry = () => {
    setCountdown(3);
    // Logic to re-trigger API
  };

  return (
    <ErrorLayout
      code="502"
      titleKey="error.502.title"
      subtitleKey="error.502.subtitle"
      Icon={ServerCrash}
      primaryAction={{
        labelKey: countdown > 0 
          ? t('error.502.retrying', { seconds: countdown }) 
          : 'error.502.ctaRetry',
        onClick: handleRetry
      }}
      secondaryAction={{
        labelKey: 'error.502.ctaSupport',
        onClick: () => window.location.href = 'mailto:support@dictationmate.com'
      }}
      ghostAction={{
        labelKey: 'error.502.ctaHome',
        onClick: () => onNavigate('home')
      }}
    />
  );
}
