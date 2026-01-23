import { useState, useRef, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function QuickQuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    moveDate: '',
    access_key: 'f4f80b3a-7125-41ae-b44e-3c23cbbfe6de',
    subject: 'New Quick Quote Request - Legacy Moving Denver',
    from_name: 'Legacy Moving Denver Website',
    botcheck: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [hCaptchaLoaded, setHCaptchaLoaded] = useState(false);
  const captchaRef = useRef<HCaptcha>(null);
  const formStartTime = useRef<number>(Date.now());

  // Check if hCaptcha API is loaded
  useEffect(() => {
    const checkHCaptcha = () => {
      if (typeof window !== 'undefined' && (window as any).hcaptcha) {
        console.log('hCaptcha API loaded successfully');
        setHCaptchaLoaded(true);
      } else {
        console.log('Waiting for hCaptcha API...');
        setTimeout(checkHCaptcha, 100);
      }
    };
    checkHCaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check captcha
    if (!captchaToken) {
      setErrorMessage('Please complete the captcha verification.');
      return;
    }
    
    // Time-based validation - must take at least 3 seconds to fill form
    const timeTaken = Date.now() - formStartTime.current;
    if (timeTaken < 3000) {
      setErrorMessage('Please take your time to fill out the form.');
      return;
    }
    
    // Check honeypot field
    if (formData.botcheck) {
      // Bot detected, fail silently
      setSubmitStatus('success');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          'h-captcha-response': captchaToken,
          botcheck: false
        })
      });

      const result = await response.json();

      if (result.success === true) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          moveDate: '',
          access_key: 'f4f80b3a-7125-41ae-b44e-3c23cbbfe6de',
          subject: 'New Quick Quote Request - Legacy Moving Denver',
          from_name: 'Legacy Moving Denver Website',
          botcheck: ''
        });
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
        formStartTime.current = Date.now();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || "There was an error submitting your request. Please try again.");
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
      setErrorMessage("There was an error submitting your request. Please try again or call us directly.");
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-secondary mb-2">Get a Quick Quote</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Fill out the form below and we'll contact you with a quote, or call us at{' '}
        <a href="tel:7203401849" className="text-primary font-medium">(720) 340-1849</a>.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="hidden" name="form_name" value={formData.form_name} />
        <input type="hidden" name="recipient_email" value={formData.recipient_email} />
        
        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-0.5">
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-0.5">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-0.5">
            Phone Number*
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="moveDate" className="block text-xs font-medium text-gray-700 mb-0.5">
            Preferred Move Date
          </label>
          <input
            type="text"
            id="moveDate"
            name="moveDate"
            value={formData.moveDate}
            onChange={handleChange}
            placeholder="MM/DD/YYYY"
            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
          />
        </div>



        {/* Hidden fields for Web3Forms */}
        <input name="access_key" type="hidden" value={formData.access_key} />
        <input name="subject" type="hidden" value={formData.subject} />
        <input name="from_name" type="hidden" value={formData.from_name} />
        
        {/* Honeypot field - hidden from users, bots will fill it */}
        <input 
          type="text"
          name="botcheck"
          value={formData.botcheck}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
          }}
          aria-hidden="true"
        />

        {/* hCaptcha */}
        <div className="flex justify-center my-2 w-full">
          {hCaptchaLoaded ? (
            <HCaptcha
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              size="compact"
              onVerify={(token) => {
                console.log('hCaptcha verified');
                setCaptchaToken(token);
              }}
              onExpire={() => {
                console.log('hCaptcha expired');
                setCaptchaToken(null);
              }}
              onError={(err) => {
                console.error('hCaptcha error:', err);
                setCaptchaToken(null);
              }}
              ref={captchaRef}
            />
          ) : (
            <div className="text-xs text-gray-500">Loading captcha...</div>
          )}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting || !captchaToken}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 text-sm rounded-md transition-colors disabled:opacity-70"
        >
          {isSubmitting ? 'Submitting...' : 'Get Quote'}
        </button>
        
        {submitStatus === 'success' && (
          <p className="text-green-600 text-center text-sm">
            Quote request received! We'll call you shortly.
          </p>
        )}
        
        {submitStatus === 'error' && (
          <p className="text-red-600 text-center text-sm">
            {errorMessage || "There was an error submitting your request. Please try again or call us directly."}
          </p>
        )}
        
        <p className="text-center text-xs text-muted-foreground">
          We'll contact you shortly with a personalized moving quote.
        </p>
      </form>
    </div>
  );
}