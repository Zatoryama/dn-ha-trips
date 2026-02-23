'use client';

import Link from 'next/link';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import type { Route } from '@/data/routes';
import { formatVND, formatUSD } from '@/data/routes';
import { useTranslation, useLocalizedData } from '@/lib/i18n';

interface RouteCardProps {
  route: Route;
}

export default function RouteCard({ route }: RouteCardProps) {
  const { t } = useTranslation();
  const { localizeRoute } = useLocalizedData();
  const localRoute = localizeRoute(route);

  const categoryColors = {
    transfer: 'bg-blue-100 text-blue-700',
    'day-trip': 'bg-green-100 text-green-700',
    tour: 'bg-purple-100 text-purple-700',
  };

  const categoryLabels = {
    transfer: t('routeCard.transfer'),
    'day-trip': t('routeCard.dayTrip'),
    tour: t('routeCard.tour'),
  };

  return (
    <div className="card group">
      {/* Image placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-primary-300 to-primary-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[route.category]}`}
          >
            {categoryLabels[route.category]}
          </span>
          <span className="text-white text-sm font-medium bg-black/40 px-2 py-1 rounded">
            {route.distance} km
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
          {localRoute.name}
        </h3>

        {/* Route info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
          <span>{route.from}</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          <span>{route.to}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Clock className="w-4 h-4 text-primary-500" />
          <span>{route.duration}</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{localRoute.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {route.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Pricing */}
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-500 block">{t('routeCard.from')}</span>
              <span className="font-display font-bold text-xl text-primary-700">
                {formatVND(route.pricing.sedan)}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                (~{formatUSD(route.pricing.sedan)})
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/booking?route=${route.id}`}
          className="btn-primary w-full text-sm py-2.5"
        >
          {t('routeCard.bookThisRoute')}
        </Link>
      </div>
    </div>
  );
}
