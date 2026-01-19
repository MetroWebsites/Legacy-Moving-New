import React, { useRef, useEffect, useState } from 'react';
import type ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_SITE_KEY } from '../config/recaptcha';

export interface ReCAPTCHAComponentRef {
  executeAsync: () => Promise<string | null>;
  reset: () => void;
  getValue: () => string | null;
}

interface ReCAPTCHAComponentProps {
  onChange?: (token: string | null) => void;
  onExpired?: () => void;
  onErrored?: () => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
  recaptchaRef?: React.RefObject<ReCAPTCHA>;
}

export function ReCAPTCHAComponent({ 
  onChange, 
  onExpired, 
  onErrored, 
  theme = 'light', 
  size = 'normal',
  recaptchaRef: externalRef
}: ReCAPTCHAComponentProps) {
  const internalRef = useRef<ReCAPTCHA>(null);
  const ref = externalRef || internalRef;
  const [ReCAPTCHALib, setReCAPTCHALib] = useState<typeof ReCAPTCHA | null>(null);

  // Dynamically import ReCAPTCHA only on client side
  useEffect(() => {
    import('react-google-recaptcha').then((module) => {
      setReCAPTCHALib(() => module.default);
    });
  }, []);

  // Return placeholder during SSR
  if (typeof window === 'undefined' || !ReCAPTCHALib) {
    return (
      <div className="flex justify-center my-4">
        <div className="w-[304px] h-[78px] bg-gray-100 rounded border border-gray-300 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex justify-center my-4">
      <ReCAPTCHALib
        ref={ref}
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={onChange}
        onExpired={onExpired}
        onErrored={onErrored}
        theme={theme}
        size={size}
      />
    </div>
  );
}

export type { ReCAPTCHAComponentRef };
