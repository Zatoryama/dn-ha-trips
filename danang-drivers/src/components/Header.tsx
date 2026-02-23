'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, MapPin, Phone } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang, setLang } = useTranslation();

  const navigation = [
    { name: t('header.home'), href: '/' },
    { name: t('header.ourDrivers'), href: '/drivers' },
    { name: t('header.bookARide'), href: '/booking' },
    { name: t('header.destinations'), href: '/destinations' },
    { name: t('header.contact'), href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-900 text-primary-100 text-sm py-2">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {t('header.location')}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+84905123456"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +84 905 123 456
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DN</span>
            </div>
            <div>
              <span className="font-display font-bold text-xl text-primary-900 block leading-tight">
                Da Nang Drivers
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {t('header.centralVietnamTours')}
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative
                           after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-600
                           after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary-600
                         transition-colors px-2.5 py-1.5 rounded-lg hover:bg-gray-100 border border-gray-200"
              aria-label="Switch language"
            >
              <span className={lang === 'en' ? 'font-bold text-primary-600' : 'text-gray-400'}>
                EN
              </span>
              <span className="text-gray-300">|</span>
              <span className={lang === 'vi' ? 'font-bold text-primary-600' : 'text-gray-400'}>
                VI
              </span>
            </button>

            <Link href="/booking" className="btn-primary text-sm py-2.5">
              {t('header.bookNow')}
            </Link>
          </div>

          {/* Mobile: language toggle + menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
              className="flex items-center gap-1 text-xs font-medium text-gray-600
                         px-2 py-1.5 rounded-md border border-gray-200"
              aria-label="Switch language"
            >
              <span className={lang === 'en' ? 'font-bold text-primary-600' : 'text-gray-400'}>
                EN
              </span>
              <span className="text-gray-300">|</span>
              <span className={lang === 'vi' ? 'font-bold text-primary-600' : 'text-gray-400'}>
                VI
              </span>
            </button>

            <button
              type="button"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t('header.toggleMenu')}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-1 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600
                             rounded-lg font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Link
                  href="/booking"
                  className="btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('header.bookNow')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
