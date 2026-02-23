'use client';

import { Suspense } from 'react';
import { Calendar, Shield, Clock, MessageCircle } from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import RouteCard from '@/components/RouteCard';
import { routes } from '@/data/routes';
import { useTranslation } from '@/lib/i18n';

export default function BookingPageContent() {
  const { t } = useTranslation();

  const heroFeatures = [
    { id: 'nopay', icon: Shield, text: t('booking.noUpfrontPayment') },
    { id: 'instant', icon: Clock, text: t('booking.instantConfirmation') },
    { id: 'cancel', icon: Calendar, text: t('booking.freeCancellation24h') },
    { id: 'whatsapp', icon: MessageCircle, text: t('booking.whatsappSupport') },
  ];

  const bookingInfoItems = [
    { id: 'noprepay', title: t('booking.noPrepayment'), desc: t('booking.noPrepaymentDesc') },
    { id: 'freecancel', title: t('booking.freeCancellation'), desc: t('booking.freeCancellationDesc') },
    { id: 'fixed', title: t('booking.fixedPrices'), desc: t('booking.fixedPricesDesc') },
    { id: 'door', title: t('booking.doorToDoor'), desc: t('booking.doorToDoorDesc') },
    { id: 'flight', title: t('booking.flightMonitoring'), desc: t('booking.flightMonitoringDesc') },
  ];

  const priceGuideItems = [
    { id: 'airDanang', label: t('booking.airportToDanang'), price: 'from 200,000d' },
    { id: 'airHoiAn', label: t('booking.airportToHoiAn'), price: 'from 350,000d' },
    { id: 'banaHills', label: t('booking.baNaHillsDayTrip'), price: 'from 500,000d' },
    { id: 'danangHue', label: t('booking.danangToHue'), price: 'from 1,200,000d' },
    { id: 'haiVan', label: t('booking.haiVanPassTour'), price: 'from 700,000d' },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero text-white py-16">
        <div className="container-custom">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {t('booking.pageTitle')}
          </h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            {t('booking.pageDescription')}
          </p>
          <div className="flex flex-wrap gap-6 mt-6 text-sm">
            {heroFeatures.map(({ id, icon: Icon, text }) => (
              <span key={id} className="flex items-center gap-2 text-primary-100">
                <Icon className="w-4 h-4 text-accent-400" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Suspense
                fallback={
                  <div className="bg-white rounded-xl p-8 shadow-sm text-center">
                    <p className="text-gray-500">{t('booking.loadingBookingForm')}</p>
                  </div>
                }
              >
                <BookingForm />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  {t('booking.bookingInfo')}
                </h3>
                <ul className="space-y-4">
                  {bookingInfoItems.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {item.title}
                        </p>
                        <p className="text-gray-500 text-xs">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Need help */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  {t('booking.needHelpBooking')}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t('booking.needHelpBookingDesc')}
                </p>
                <a
                  href="https://wa.me/84905123456?text=Hi! I need help booking a driver."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary bg-green-500 hover:bg-green-600 w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('booking.chatOnWhatsApp')}
                </a>
              </div>

              {/* Price guide */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  {t('booking.priceGuide')}
                </h3>
                <div className="space-y-3">
                  {priceGuideItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  {t('booking.pricesForSedan')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Routes */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
            {t('booking.allAvailableRoutes')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('booking.allAvailableRoutesDesc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
