import React from 'react';
import { Compass } from 'lucide-react';
import ErrorLayout from './ErrorLayout';
import { Page } from '../../types';

interface NotFoundPageProps {
  onNavigate: (page: Page) => void;
}

export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <ErrorLayout
      code="404"
      titleKey="error.404.title"
      subtitleKey="error.404.subtitle"
      Icon={Compass}
      primaryAction={{
        labelKey: 'error.404.ctaHome',
        onClick: () => onNavigate('home')
      }}
      secondaryAction={{
        labelKey: 'error.404.ctaExplore',
        onClick: () => onNavigate('explore')
      }}
      ghostAction={{
        labelKey: 'error.404.ctaRetry',
        onClick: () => window.location.reload()
      }}
    />
  );
}
