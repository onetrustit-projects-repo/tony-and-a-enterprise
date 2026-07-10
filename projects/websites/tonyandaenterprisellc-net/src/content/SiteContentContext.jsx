import { createContext, useContext, useEffect, useState } from 'react';
import { siteConfig as defaultSiteContent } from '../config/siteConfig';

const SiteContentContext = createContext(defaultSiteContent);

function deepMerge(base, override) {
  if (!override || typeof override !== 'object' || Array.isArray(override)) {
    return override === undefined ? base : override;
  }

  const result = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = base?.[key];
    if (Array.isArray(value)) {
      result[key] = value;
    } else if (value && typeof value === 'object') {
      result[key] = deepMerge(baseValue || {}, value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultSiteContent);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/public-content')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data === 'object' && Object.keys(data).length > 0) {
          setContent(deepMerge(defaultSiteContent, data));
        }
      })
      .catch(() => {
        // Keep the bundled defaults if the content API is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
