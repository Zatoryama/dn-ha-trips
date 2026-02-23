'use client';

import Link from 'next/link';
import {
  MapPin,
  ArrowRight,
  Lightbulb,
  Camera,
  Utensils,
  Sun,
} from 'lucide-react';
import { destinations } from '@/data/routes';
import { useTranslation, useLocalizedData } from '@/lib/i18n';

export default function DestinationsPageContent() {
  const { t } = useTranslation();
  const { localizeDestination } = useLocalizedData();

  const quickFacts = [
    { id: 'bestTime', icon: Sun, title: t('destinations.bestTime'), desc: t('destinations.bestTimeValue') },
    { id: 'unesco', icon: Camera, title: t('destinations.unescoSites'), desc: t('destinations.unescoSitesValue') },
    { id: 'food', icon: Utensils, title: t('destinations.foodCapital'), desc: t('destinations.foodCapitalValue') },
    { id: 'access', icon: MapPin, title: t('destinations.easyAccess'), desc: t('destinations.easyAccessValue') },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero text-white py-16">
        <div className="container-custom">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {t('destinations.pageTitle')}
          </h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            {t('destinations.pageDescription')}
          </p>
        </div>
      </section>

      {/* Region overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
              {t('destinations.centralVietnamGlance')}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t('destinations.centralVietnamGlanceDesc')}
            </p>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {quickFacts.map(({ id, icon: Icon, title, desc }) => (
              <div
                key={id}
                className="bg-primary-50 rounded-xl p-5 text-center"
              >
                <Icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="space-y-16">
            {destinations.map((dest, index) => {
              const localized = localizeDestination(dest);
              return (
                <div
                  key={dest.id}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 items-center`}
                >
                  {/* Image placeholder */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-300 to-primary-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <span className="text-lg font-medium opacity-50">
                            {localized.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
                      {localized.name}
                    </h2>
                    <p className="text-sm text-primary-600 font-medium mb-4">
                      {dest.nameVi}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {localized.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {dest.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-sm bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Travel tips */}
                    <div className="bg-amber-50 rounded-xl p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        {t('destinations.travelTips')}
                      </h4>
                      <ul className="space-y-2">
                        {dest.travelTips.map((tip) => (
                          <li
                            key={tip}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/booking"
                      className="btn-primary"
                    >
                      {t('destinations.bookTripTo')} {localized.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {t('destinations.planYourAdventure')}
          </h2>
          <p className="text-primary-200 max-w-2xl mx-auto mb-8">
            {t('destinations.planYourAdventureDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-accent text-lg py-4 px-8">
              {t('destinations.bookCustomTour')}
            </Link>
            <a
              href="https://wa.me/84905123456?text=Hi! I need help planning my Central Vietnam trip."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary bg-transparent border-white/30 text-white hover:bg-white/10 text-lg py-4 px-8"
            >
              {t('destinations.askOnWhatsApp')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
