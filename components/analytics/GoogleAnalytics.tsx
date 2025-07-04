'use client';

import { GA_TRACKING_ID, trackPageView } from '@/lib/analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
      const url = pathname + searchParams.toString();
      trackPageView(url, document.title);
    }
  }, [pathname, searchParams]);

  if (GA_TRACKING_ID === 'G-XXXXXXXXXX') {
    return null; // Ne pas charger GA en développement ou sans ID
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
            });
          `,
        }}
      />
    </>
  );
} 