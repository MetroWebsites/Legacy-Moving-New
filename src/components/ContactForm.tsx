import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function ContactForm() {
  const defaultFormData = {
    name: "", 
    email: "", 
    phone: "",
    moveDate: "",
    moveFrom: "",
    moveTo: "",
    message: "", 
    access_key: "f4f80b3a-7125-41ae-b44e-3c23cbbfe6de",
    subject: "New Quote Request from Legacy Moving Denver",
    from_name: "Legacy Moving Denver Website",
    botcheck: ""
  };
  
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [hCaptchaLoaded, setHCaptchaLoaded] = useState(false);
  const captchaRef = useRef<HCaptcha>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if captcha is completed
    if (!captchaToken) {
      setSubmitStatus("error");
      setErrorMessage("Please complete the security check.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      // Add honeypot field and hCaptcha token for bot protection
      const formDataWithProtection = {
        ...formData,
        botcheck: formData.botcheck || false,
        "h-captcha-response": captchaToken
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formDataWithProtection)
      });

      const result = await response.json();

      // Debug logging
      console.log("Web3Forms response:", { status: response.status, ok: response.ok, result });

      // Web3Forms returns success: true on successful submission
      if (result.success === true) {
        setSubmitStatus("success");
        setFormData(defaultFormData);
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || "There was an error submitting your request. Please try again.");
        console.error("Web3Forms error:", { status: response.status, result });
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setErrorMessage("There was an error submitting your request. Please try again or call us directly at (720) 340-1849.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-4 bg-primary/10 p-4 rounded-md flex items-center gap-3">
        <div className="rounded-full bg-primary w-10 h-10 flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </div>
        <div>
          <h4 className="font-semibold text-secondary">Need an instant quote?</h4>
          <p className="text-sm text-muted-foreground">Call us now at <a href="tel:7203401849" className="text-primary font-medium">(720) 340-1849</a> for an immediate quote and easy tracking.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
      {/* Personal Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">
            Full Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-1">
          Phone Number*
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Move Details */}
      <div>
        <label htmlFor="moveDate" className="block text-sm font-medium text-secondary mb-1">
          Preferred Move Date
        </label>
        <input
          type="text"
          id="moveDate"
          name="moveDate"
          value={formData.moveDate}
          onChange={handleInputChange}
          placeholder="MM/DD/YYYY"
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="moveFrom" className="block text-sm font-medium text-secondary mb-1">
            Moving From
          </label>
          <input
            type="text"
            id="moveFrom"
            name="moveFrom"
            value={formData.moveFrom}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
            placeholder="Current Address"
          />
        </div>

        <div>
          <label htmlFor="moveTo" className="block text-sm font-medium text-secondary mb-1">
            Moving To
          </label>
          <input
            type="text"
            id="moveTo"
            name="moveTo"
            value={formData.moveTo}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
            placeholder="New Address"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-secondary mb-1">
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
          placeholder="Please share any special requirements or questions..."
        />
      </div>

      {/* Hidden fields for Web3Forms */}
      <input name="form_name" type="hidden" value="Quote Request" />
      <input name="access_key" type="hidden" value={formData.access_key} />
      <input name="subject" type="hidden" value={formData.subject} />
      <input name="from_name" type="hidden" value={formData.from_name} />
      
      {/* Honeypot field for bot protection - hidden from users */}
      <input 
        type="checkbox" 
        name="botcheck" 
        className="hidden" 
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
      
      {/* hCaptcha for spam protection */}
      <div className="flex justify-center w-full">
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
          <div className="text-sm text-gray-500">Loading security check...</div>
        )}
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting || !captchaToken}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Request Free Quote"}
      </Button>

      {submitStatus === "success" && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
          Thank you! Your quote request has been submitted successfully. We'll be in touch shortly.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {errorMessage || "There was an error submitting your request. Please try again or call us directly at (720) 340-1849."}
        </div>
      )}
      
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to be contacted regarding your moving needs.
      </p>
    </form>
    </div>
  );
}