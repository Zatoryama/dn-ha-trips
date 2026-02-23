'use client';

import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = t('contact.nameRequired');
    if (!formData.email.trim()) newErrors.email = t('contact.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t('contact.invalidEmail');
    if (!formData.message.trim()) newErrors.message = t('contact.messageRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero text-white py-16">
        <div className="container-custom">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {t('contact.pageTitle')}
          </h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            {t('contact.pageDescription')}
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact cards */}
              {[
                {
                  id: 'phone',
                  icon: Phone,
                  title: t('contact.callUs'),
                  lines: ['+84 905 123 456', '+84 905 234 567'],
                  action: { href: 'tel:+84905123456', label: t('contact.callNow') },
                },
                {
                  id: 'whatsapp',
                  icon: MessageCircle,
                  title: t('contact.whatsApp'),
                  lines: [
                    t('contact.fastestWay'),
                    t('contact.usuallyReply'),
                  ],
                  action: {
                    href: 'https://wa.me/84905123456',
                    label: t('contact.chatOnWhatsApp'),
                  },
                },
                {
                  id: 'email',
                  icon: Mail,
                  title: t('contact.emailLabel'),
                  lines: ['hello@danangdrivers.com', 'bookings@danangdrivers.com'],
                  action: {
                    href: 'mailto:hello@danangdrivers.com',
                    label: t('contact.sendEmailAction'),
                  },
                },
                {
                  id: 'office',
                  icon: MapPin,
                  title: t('contact.office'),
                  lines: [
                    '123 Tran Phu Street',
                    'Hai Chau District, Da Nang',
                  ],
                  action: null,
                },
                {
                  id: 'hours',
                  icon: Clock,
                  title: t('contact.hours'),
                  lines: [t('contact.booking247'), t('contact.officeMF')],
                  action: null,
                },
              ].map(({ id, icon: Icon, title, lines, action }) => (
                <div
                  key={id}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {title}
                      </h3>
                      {lines.map((line, i) => (
                        <p key={i} className="text-sm text-gray-600">
                          {line}
                        </p>
                      ))}
                      {action && (
                        <a
                          href={action.href}
                          target={action.href.startsWith('http') ? '_blank' : undefined}
                          rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-primary-600 font-medium hover:text-primary-700 mt-2 inline-block"
                        >
                          {action.label} &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                    {t('contact.messageSent')}
                  </h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {t('contact.messageSentDesc')}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="btn-secondary"
                    >
                      {t('contact.sendAnother')}
                    </button>
                    <a
                      href="https://wa.me/84905123456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary bg-green-500 hover:bg-green-600"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t('contact.whatsAppUs')}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
                    {t('contact.sendUsMessage')}
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">
                    {t('contact.fillOutForm')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="label-field">
                          {t('contact.yourName')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t('contact.namePlaceholder')}
                          className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="label-field">
                          {t('contact.emailAddress')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t('contact.emailPlaceholder')}
                          className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="label-field">
                        {t('contact.subject')}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">{t('contact.selectTopic')}</option>
                        <option value="booking">{t('contact.bookingInquiry')}</option>
                        <option value="custom-tour">{t('contact.customTourRequest')}</option>
                        <option value="pricing">{t('contact.pricingQuestion')}</option>
                        <option value="group">{t('contact.groupBooking')}</option>
                        <option value="feedback">{t('contact.feedback')}</option>
                        <option value="other">{t('contact.other')}</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="label-field">
                        {t('contact.message')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder={t('contact.messagePlaceholder')}
                        className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button type="submit" className="btn-primary py-3.5">
                      <Send className="w-4 h-4 mr-2" />
                      {t('contact.sendMessage')}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('contact.faqTitle')}
          </h2>

          <div className="space-y-6">
            {[
              {
                id: 'pay',
                q: t('contact.faqHowPay'),
                a: t('contact.faqHowPayAnswer'),
              },
              {
                id: 'cancel',
                q: t('contact.faqCancel'),
                a: t('contact.faqCancelAnswer'),
              },
              {
                id: 'english',
                q: t('contact.faqEnglish'),
                a: t('contact.faqEnglishAnswer'),
              },
              {
                id: 'childSeats',
                q: t('contact.faqChildSeats'),
                a: t('contact.faqChildSeatsAnswer'),
              },
              {
                id: 'flightDelay',
                q: t('contact.faqFlightDelay'),
                a: t('contact.faqFlightDelayAnswer'),
              },
              {
                id: 'multiDay',
                q: t('contact.faqMultiDay'),
                a: t('contact.faqMultiDayAnswer'),
              },
              {
                id: 'tipping',
                q: t('contact.faqTipping'),
                a: t('contact.faqTippingAnswer'),
              },
            ].map(({ id, q, a }) => (
              <div
                key={id}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
