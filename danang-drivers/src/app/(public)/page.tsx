'use client';

import Link from 'next/link';
import {
  Shield,
  Clock,
  Star,
  MapPin,
  Users,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Car,
  Globe,
  Plane,
} from 'lucide-react';
import DriverCard from '@/components/DriverCard';
import RouteCard from '@/components/RouteCard';
import { drivers } from '@/data/drivers';
import { routes } from '@/data/routes';
import { useTranslation } from '@/lib/i18n';

const featuredDrivers = drivers.filter((d) => d.featured);
const popularRoutes = routes.filter((r) => r.popular).slice(0, 4);

const testimonials = [
  {
    name: 'Sarah M.',
    country: 'Australia',
    text: 'Minh was an incredible driver and guide. He took us to hidden spots in Hoi An that we never would have found on our own. His English is excellent and he was so patient with our kids.',
    rating: 5,
    route: 'Da Nang to Hoi An Day Trip',
  },
  {
    name: 'James K.',
    country: 'United Kingdom',
    text: 'The Hai Van Pass ride was the highlight of our Vietnam trip. Our driver knew exactly where to stop for the best photos. Very safe driver even on the winding mountain roads.',
    rating: 5,
    route: 'Hai Van Pass Adventure',
  },
  {
    name: 'Yuki T.',
    country: 'Japan',
    text: 'Having a Japanese-speaking driver made our trip so much more comfortable. Thanh recommended amazing local restaurants and arranged everything perfectly for our 3-day Central Vietnam tour.',
    rating: 5,
    route: 'Multi-day Central Vietnam Tour',
  },
];

export default function HomePage() {
  const { t } = useTranslation();

  const stats = [
    { id: 'travelers', label: t('home.happyTravelers'), value: '5,000+' },
    { id: 'trips', label: t('home.completedTrips'), value: '12,000+' },
    { id: 'rating', label: t('home.averageRating'), value: '4.8/5' },
    { id: 'years', label: t('home.yearsOperating'), value: '8+' },
  ];

  const features = [
    {
      id: 'safe',
      icon: Shield,
      title: t('home.safeLicensed'),
      description: t('home.safeLicensedDesc'),
    },
    {
      id: 'multilingual',
      icon: Globe,
      title: t('home.multilingualDrivers'),
      description: t('home.multilingualDriversDesc'),
    },
    {
      id: 'rated',
      icon: Star,
      title: t('home.highlyRated'),
      description: t('home.highlyRatedDesc'),
    },
    {
      id: '247',
      icon: Clock,
      title: t('home.availability247'),
      description: t('home.availability247Desc'),
    },
    {
      id: 'group',
      icon: Users,
      title: t('home.anyGroupSize'),
      description: t('home.anyGroupSizeDesc'),
    },
    {
      id: 'support',
      icon: Headphones,
      title: t('home.instantSupport'),
      description: t('home.instantSupportDesc'),
    },
  ];

  const heroFeatures = [
    { id: 'licensed', icon: Shield, text: t('home.licensedInsured') },
    { id: 'english', icon: Globe, text: t('home.englishSpeaking') },
    { id: 'avail', icon: Clock, text: t('home.available247') },
    { id: 'airport', icon: Plane, text: t('home.airportPickup') },
  ];

  const steps = [
    {
      step: '1',
      title: t('home.step1Title'),
      description: t('home.step1Desc'),
    },
    {
      step: '2',
      title: t('home.step2Title'),
      description: t('home.step2Desc'),
    },
    {
      step: '3',
      title: t('home.step3Title'),
      description: t('home.step3Desc'),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-custom relative z-10 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <MapPin className="w-4 h-4 text-accent-400" />
              <span>{t('home.heroTagline')}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('home.heroTitleStart')}
              <span className="text-accent-400">{t('home.heroTitleHighlight')}</span>
              {t('home.heroTitleEnd')}
            </h1>

            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl leading-relaxed">
              {t('home.heroDescription')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/booking" className="btn-accent text-lg py-4 px-8">
                <Car className="w-5 h-5 mr-2" />
                {t('home.bookYourRide')}
              </Link>
              <Link
                href="/drivers"
                className="btn-secondary bg-transparent border-white/30 text-white
                           hover:bg-white/10 text-lg py-4 px-8"
              >
                {t('home.meetOurDrivers')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Quick features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {heroFeatures.map(({ id, icon: Icon, text }) => (
                <div key={id} className="flex items-center gap-2 text-primary-100">
                  <Icon className="w-5 h-5 text-accent-400 flex-shrink-0" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="font-display text-3xl font-bold text-primary-700">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.whyChooseTitle')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.whyChooseSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ id, icon: Icon, title, description }) => (
              <div
                key={id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Drivers */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {t('home.meetTopDrivers')}
              </h2>
              <p className="text-gray-600">
                {t('home.meetTopDriversDesc')}
              </p>
            </div>
            <Link
              href="/drivers"
              className="hidden sm:flex items-center gap-1 text-primary-600 font-semibold hover:text-primary-700"
            >
              {t('home.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDrivers.map((driver) => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>

          <div className="sm:hidden text-center mt-8">
            <Link href="/drivers" className="btn-secondary">
              {t('home.viewAllDrivers')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {t('home.popularRoutesTitle')}
              </h2>
              <p className="text-gray-600">
                {t('home.popularRoutesDesc')}
              </p>
            </div>
            <Link
              href="/booking"
              className="hidden sm:flex items-center gap-1 text-primary-600 font-semibold hover:text-primary-700"
            >
              {t('home.seeAllRoutes')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.whatTravelersSay')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.whatTravelersSayDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-gray-50 rounded-xl p-6 relative"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.country}</p>
                  </div>
                  <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                    {testimonial.route}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              {t('home.howItWorks')}
            </h2>
            <p className="text-primary-200 max-w-2xl mx-auto">
              {t('home.howItWorksDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-xl font-bold">{step}</span>
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">
                  {title}
                </h3>
                <p className="text-primary-200 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/booking" className="btn-accent text-lg py-4 px-8">
              {t('home.bookYourDriverNow')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-accent-50">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('home.readyToExplore')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {t('home.readyToExploreDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-primary text-lg py-4 px-8">
              {t('home.bookOnline')}
            </Link>
            <a
              href="https://wa.me/84905123456"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-green-500 hover:bg-green-600 text-lg py-4 px-8"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              {t('home.whatsappUs')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
