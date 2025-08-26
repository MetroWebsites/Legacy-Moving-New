import React, { useState } from "react";
import { Button } from "./ui/button";

export default function ContactForm() {
  const defaultFormData = {
    name: "", 
    email: "", 
    phone: "",
    moveDate: "",
    moveFrom: "",
    moveTo: "",
    message: "", 
    form_name: "Quote Request"
  };
  
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.new.website/api/submit-form/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData(defaultFormData);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
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
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
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
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Move Details */}
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
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
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
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
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
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
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
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          placeholder="Please share any special requirements or questions..."
        />
      </div>

      <input name="form_name" type="hidden" value={formData.form_name} />
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
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
          There was an error submitting your request. Please try again or call us directly at (970) 473-7080.
        </div>
      )}
      
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to be contacted regarding your moving needs.
      </p>
    </form>
  );
}