'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function WhatsAppButton() {
  const { t } = useTranslation();

  return (
    <a
      href={`https://wa.me/84905123456?text=${encodeURIComponent(t('whatsapp.defaultMessage'))}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center
                 shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110
                 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span
        className="absolute right-full mr-3 bg-white text-gray-800 text-sm font-medium px-3 py-2 rounded-lg
                    shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    pointer-events-none"
      >
        {t('whatsapp.chatWithUs')}
      </span>
    </a>
  );
}
