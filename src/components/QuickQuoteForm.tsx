import { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function QuickQuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    moveDate: '',
    fromZip: '',
    toZip: '',
    access_key: 'f4f80b3a-7125-41ae-b44e-3c23cbbfe6de',
    subject: 'New Quick Quote Request - Legacy Moving Denver',
    from_name: 'Legacy Moving Denver Website',
    botcheck: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setErrorMessage('Please complete the captcha verification.');
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
          botcheck: formData.botcheck || false
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
          fromZip: '',
          toZip: '',
          access_key: 'f4f80b3a-7125-41ae-b44e-3c23cbbfe6de',
          subject: 'New Quick Quote Request - Legacy Moving Denver',
          from_name: 'Legacy Moving Denver Website',
          botcheck: ''
        });
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-secondary mb-4">Get a Quick Quote</h3>
      <p className="text-muted-foreground mb-4">
        Enter your zip codes below for a quick moving estimate, or call us at{' '}
        <a href="tel:7203401849" className="text-primary font-medium">(720) 340-1849</a>.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="form_name" value={formData.form_name} />
        <input type="hidden" name="recipient_email" value={formData.recipient_email} />
        
        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number*
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="moveDate" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Move Date
          </label>
          <input
            type="text"
            id="moveDate"
            name="moveDate"
            value={formData.moveDate}
            onChange={handleChange}
            placeholder="MM/DD/YYYY"
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
          />
        </div>

        {/* Location Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fromZip" className="block text-sm font-medium text-gray-700 mb-1">
              Moving From (ZIP)*
            </label>
            <input 
              type="text"
              id="fromZip"
              name="fromZip"
              value={formData.fromZip}
              onChange={handleChange}
              required
              pattern="[0-9]{5}"
              placeholder="Enter ZIP code"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
            />
          </div>
          
          <div>
            <label htmlFor="toZip" className="block text-sm font-medium text-gray-700 mb-1">
              Moving To (ZIP)*
            </label>
            <input 
              type="text"
              id="toZip"
              name="toZip"
              value={formData.toZip}
              onChange={handleChange}
              required
              pattern="[0-9]{5}"
              placeholder="Enter ZIP code"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        {/* Hidden fields for Web3Forms */}
        <input name="access_key" type="hidden" value={formData.access_key} />
        <input name="subject" type="hidden" value={formData.subject} />
        <input name="from_name" type="hidden" value={formData.from_name} />
        <input 
          type="checkbox" 
          name="botcheck" 
          className="hidden" 
          style={{ display: 'none' }}
        />

        {/* hCaptcha */}
        <div className="flex justify-center my-4 w-full overflow-x-auto">
          <div className="scale-[0.77] sm:scale-100 origin-center">
            <HCaptcha
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              onVerify={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
              onError={() => setCaptchaToken(null)}
              ref={captchaRef}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting || !captchaToken}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md transition-colors disabled:opacity-70"
        >
          {isSubmitting ? 'Submitting...' : 'Get Quote'}
        </button>
        
        {submitStatus === 'success' && (
          <p className="text-green-600 text-center">
            Quote request received! We'll call you shortly.
          </p>
        )}
        
        {submitStatus === 'error' && (
          <p className="text-red-600 text-center">
            {errorMessage || "There was an error submitting your request. Please try again or call us directly."}
          </p>
        )}
        
        <p className="text-center text-sm text-muted-foreground">
          We'll call you with a quote based on these zip codes.
        </p>
      </form>
    </div>
  );
}