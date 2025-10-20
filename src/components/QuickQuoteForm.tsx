import { useState } from 'react';

export default function QuickQuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    moveDate: '',
    fromZip: '',
    toZip: '',
    form_name: 'Quick Quote Form'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData object for multipart/form-data submission
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });
      
      const response = await fetch("https://api.new.website/api/submit-form/", {
        method: "POST",
        // Don't set Content-Type header - browser will set it with boundary
        body: form,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          moveDate: '',
          fromZip: '',
          toZip: '',
          form_name: 'Quick Quote Form'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-secondary mb-4">Get a Quick Quote</h3>
      <p className="text-muted-foreground mb-4">
        Enter your zip codes below for a quick moving estimate, or call us at{' '}
        <a href="tel:9706164481" className="text-primary font-medium">(970) 616-4481</a>.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="form_name" value={formData.form_name} />
        
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="moveDate" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Move Date
          </label>
          <input
            type="date"
            id="moveDate"
            name="moveDate"
            value={formData.moveDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
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
            There was an error submitting your request. Please try again or call us directly.
          </p>
        )}
        
        <p className="text-center text-sm text-muted-foreground">
          We'll call you with a quote based on these zip codes.
        </p>
      </form>
    </div>
  );
}