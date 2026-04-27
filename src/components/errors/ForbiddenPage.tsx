import React from 'react';
import { ShieldOff } from 'lucide-react';
import ErrorLayout from './ErrorLayout';
import { Page } from '../../types';

interface ForbiddenPageProps {
  onNavigate: (page: Page) => void;
}

export default function ForbiddenPage({ onNavigate }: ForbiddenPageProps) {
  return (
    <ErrorLayout
      code="403"
      titleKey="error.403.title"
      subtitleKey="error.403.subtitle"
      Icon={ShieldOff}
      primaryAction={{
        labelKey: 'error.403.ctaPricing',
        onClick: () => onNavigate('pricing')
      }}
      secondaryAction={{
        labelKey: 'error.403.ctaLogin',
        onClick: () => onNavigate('login')
      }}
      ghostAction={{
        labelKey: 'error.403.ctaHome',
        onClick: () => onNavigate('home')
      }}
    />
  );
}
