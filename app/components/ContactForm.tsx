'use client'

import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('')

    try {
      // EmailJS configuration - set these in your .env.local file
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: process.env.NEXT_PUBLIC_TO_EMAIL || 'stehangu@purdue.edu'
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      setStatus('SUCCESS')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      setStatus('ERROR')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border border-terminal-fg p-4 h-fit">
      <div className="font-bold mb-3 glow">SEND_MESSAGE.EXE</div>
      
      {status === 'SUCCESS' && (
        <div className="mb-3 p-2 border border-terminal-fg bg-terminal-bg text-terminal-fg text-xs">
          &gt; MESSAGE_SENT_SUCCESSFULLY<br/>
          &gt; EMAIL_DELIVERED_TO: stehangu@purdue.edu<br/>
          &gt; RESPONSE_TIME: 2-4 hours
        </div>
      )}
      
      {status === 'ERROR' && (
        <div className="mb-3 p-2 border border-terminal-fg bg-terminal-bg text-red-400 text-xs">
          &gt; ERROR: MESSAGE_TRANSMISSION_FAILED<br/>
          &gt; PLEASE_TRY_AGAIN_OR_EMAIL_DIRECTLY
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs text-terminal-gray mb-1">NAME:</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-terminal-bg border border-terminal-fg p-2 text-terminal-fg text-sm focus:outline-none focus:border-terminal-white"
            placeholder="Your Name"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-xs text-terminal-gray mb-1">EMAIL:</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-terminal-bg border border-terminal-fg p-2 text-terminal-fg text-sm focus:outline-none focus:border-terminal-white"
            placeholder="your.email@domain.com"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-xs text-terminal-gray mb-1">SUBJECT:</label>
          <input 
            type="text" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-terminal-bg border border-terminal-fg p-2 text-terminal-fg text-sm focus:outline-none focus:border-terminal-white"
            placeholder="Opportunity | Collaboration | Question"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-xs text-terminal-gray mb-1">MESSAGE:</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-terminal-bg border border-terminal-fg p-2 text-terminal-fg text-sm focus:outline-none focus:border-terminal-white resize-none"
            placeholder="Your message..."
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full p-2 text-sm font-bold transition-colors ${
            isLoading 
              ? 'bg-terminal-gray text-terminal-bg cursor-not-allowed' 
              : 'bg-terminal-fg text-terminal-bg hover:bg-terminal-white'
          }`}
        >
          {isLoading ? '[TRANSMITTING...]' : '[SEND_MESSAGE]'}
        </button>
      </form>
      
      <div className="text-xs text-terminal-gray mt-3">
        * Messages are sent directly to stehangu@purdue.edu<br/>
        * Response time: 2-4 hours
      </div>
    </div>
  )
}

export default ContactForm 