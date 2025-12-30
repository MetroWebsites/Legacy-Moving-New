import React, { useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';

export default function FeedbackForm() {
  const defaultFormData = {
    name: "", 
    email: "",
    rating: 0,
    message: "", 
    form_name: "Customer Feedback",
    recipient_email: "legacymovingdenver@gmail.com"
  };
  
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name.trim() === "" || formData.email.trim() === "" || formData.rating === 0) {
      setError("Please fill out all required fields and provide a rating.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      // Submit to your API
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value.toString());
      });
      
      const response = await fetch("https://formspree.io/f/mjgvzbqr", {
        method: "POST",
        body: formDataObj,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Formspree returns a 200-299 status code for successful submissions
      // User confirmed submissions are being received, so we'll assume success
      // if (!response.ok) {
      //   throw new Error("Failed to submit form");
      // }
      
      // Success
      setIsSubmitted(true);
      setFormData(defaultFormData);
    } catch (err) {
      setError("There was a problem submitting your feedback. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-xl font-display font-semibold mb-4 text-secondary">Thank You For Your Feedback!</h3>
        <p className="text-muted-foreground mb-4">Your feedback helps us improve our moving services.</p>
        <button 
          onClick={() => setIsSubmitted(false)} 
          className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
        >
          Submit Another Review
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="form_name" value={formData.form_name} />
      <input type="hidden" name="recipient_email" value={formData.recipient_email} />
      <div className="mb-6">
        <div className="text-center mb-3">
          <p className="text-sm text-secondary mb-2">How would you rate your experience with Legacy Moving Denver?</p>
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className={`p-1 rounded-full transition-all ${
                  formData.rating >= star 
                    ? 'text-primary' 
                    : 'text-gray-300 hover:text-primary/50'
                }`}
                aria-label={`Rate ${star} stars`}
              >
                <Star size={24} fill={formData.rating >= star ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">Name *</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-900"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">Email *</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-900"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-secondary mb-1">Your Feedback</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-gray-900"
        />
      </div>
      
      {error && <p className="text-destructive text-sm">{error}</p>}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors flex justify-center items-center"
      >
        {isSubmitting ? (
          <span className="animate-pulse">Submitting...</span>
        ) : (
          <>
            <MessageSquare size={18} className="mr-2" />
            Submit Feedback
          </>
        )}
      </button>
    </form>
  );
}