import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { ReCAPTCHAComponent } from "./ReCAPTCHA";
import type ReCAPTCHA from 'react-google-recaptcha';

export default function LocalMoveForm() {
  const defaultFormData = {
    name: "",
    email: "",
    phone: "",
    moveDate: "",
    moveFrom: "",
    moveTo: "",
    moveSize: "",
    additionalServices: [],
    message: "",
    form_name: "Local Move Quote Request",
    recipient_email: "legacymovingdenver@gmail.com"
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData(prev => ({
        ...prev,
        additionalServices: [...prev.additionalServices, name]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        additionalServices: prev.additionalServices.filter(service => service !== name)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      setSubmitStatus("error");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData object for multipart/form-data submission
      const form = new FormData();
      // Add all form fields except additionalServices array
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'additionalServices') {
          form.append(key, value as string);
        }
      });
      
      // Add additionalServices as a comma-separated string
      form.append('additionalServices', formData.additionalServices.join(', '));
      
      // Add reCAPTCHA token
      form.append('g-recaptcha-response', recaptchaToken);
      
      const response = await fetch("https://formspree.io/f/mzdbndbo", {
        method: "POST",
        body: form,
        headers: {
          'Accept': 'application/json'
        }
      });

      // API returns a 200-299 status code for successful submissions
      if (response.ok) {
        setSubmitStatus("success");
        setFormData(defaultFormData);
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        setSubmitStatus("error");
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      setSubmitStatus("error");
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6">
        <h3 className="font-display font-bold text-2xl mb-2 text-secondary">Get Your Local Moving Quote</h3>
        <p className="text-gray-600 text-sm">Fill out this form for a quick, no-obligation quote for your Denver area move.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contact Information */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

        {/* Move Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="moveDate" className="block text-sm font-medium text-secondary mb-1">
              Preferred Move Date
            </label>
            <input
              type="date"
              id="moveDate"
              name="moveDate"
              value={formData.moveDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
            />
          </div>
          
          <div>
            <label htmlFor="moveSize" className="block text-sm font-medium text-secondary mb-1">
              Home Size
            </label>
            <select
              id="moveSize"
              name="moveSize"
              value={formData.moveSize}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
            >
              <option value="">Select home size</option>
              <option value="Studio">Studio</option>
              <option value="1 Bedroom">1 Bedroom</option>
              <option value="2 Bedrooms">2 Bedrooms</option>
              <option value="3 Bedrooms">3 Bedrooms</option>
              <option value="4+ Bedrooms">4+ Bedrooms</option>
              <option value="Office">Office</option>
              <option value="Storage Unit">Storage Unit</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="moveFrom" className="block text-sm font-medium text-secondary mb-1">
            Moving From (Address or Area)*
          </label>
          <input
            type="text"
            id="moveFrom"
            name="moveFrom"
            value={formData.moveFrom}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
            placeholder="1234 Current St, Denver, CO"
          />
        </div>

        <div>
          <label htmlFor="moveTo" className="block text-sm font-medium text-secondary mb-1">
            Moving To (Address or Area)*
          </label>
          <input
            type="text"
            id="moveTo"
            name="moveTo"
            value={formData.moveTo}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
            placeholder="5678 New St, Denver, CO"
          />
        </div>

        {/* Additional Services */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Additional Services (optional)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="packing"
                name="packing"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="packing" className="text-secondary">Packing Services</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="unpacking"
                name="unpacking"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="unpacking" className="text-secondary">Unpacking Services</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="furniture_assembly"
                name="furniture_assembly"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="furniture_assembly" className="text-secondary">Furniture Assembly</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="storage"
                name="storage"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="storage" className="text-secondary">Storage Solutions</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="specialty_items"
                name="specialty_items"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="specialty_items" className="text-secondary">Specialty Item Moving</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="supplies"
                name="supplies"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="supplies" className="text-secondary">Moving Supplies</label>
            </div>
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
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-gray-900"
            placeholder="Any special requirements or questions..."
          />
        </div>

        <input name="form_name" type="hidden" value={formData.form_name} />
        <input name="recipient_email" type="hidden" value={formData.recipient_email} />
        
        {/* Google reCAPTCHA */}
        <ReCAPTCHAComponent
          recaptchaRef={recaptchaRef}
          onChange={(token) => setRecaptchaToken(token)}
          onExpired={() => setRecaptchaToken(null)}
          onErrored={() => setRecaptchaToken(null)}
        />
        
        <Button
          type="submit"
          disabled={isSubmitting || !recaptchaToken}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
        >
          {isSubmitting ? "Submitting..." : "Get My Free Quote"}
        </Button>

        {submitStatus === "success" && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
            Thank you! Your quote request has been submitted successfully. We'll be in touch shortly.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            There was an error submitting your request. Please try again or call us directly at (720) 340-1849.
          </div>
        )}
        
        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to be contacted regarding your moving needs.
        </p>
      </form>
    </div>
  );
}