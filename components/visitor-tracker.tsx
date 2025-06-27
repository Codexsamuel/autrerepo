'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    const startTime = Date.now();
    const page = window.location.pathname;

    async function getIP(): Promise<string> {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        return data.ip;
      } catch {
        return 'unknown';
      }
    }

    async function getGeo(ip: string) {
      try {
        const res = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await res.json();
        return {
          country: data.country_name,
          city: data.city,
          region: data.region,
          lat: data.latitude,
          lon: data.longitude
        };
      } catch {
        return {};
      }
    }

    async function sendVisitor() {
      const ip = await getIP();
      const geo = await getGeo(ip);
      const userAgent = navigator.userAgent;
      const device = /mobile/i.test(userAgent) ? 'mobile' : 'desktop';
      const referrer = document.referrer;
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const payload = {
        ip,
        ...geo,
        userAgent,
        device,
        referrer,
        page,
        timeSpent,
        visitedAt: new Date().toISOString()
      };
      await fetch('/api/track-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    window.addEventListener('beforeunload', sendVisitor);
    return () => {
      window.removeEventListener('beforeunload', sendVisitor);
      sendVisitor();
    };
  }, []);
  return null;
} 