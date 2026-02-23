'use client';

import Link from 'next/link';
import { Star, Globe, Car, MapPin } from 'lucide-react';
import type { Driver } from '@/data/drivers';
import { vehicleTypes } from '@/data/drivers';
import { useTranslation, useLocalizedData } from '@/lib/i18n';

interface DriverCardProps {
  driver: Driver;
  compact?: boolean;
}

export default function DriverCard({ driver, compact = false }: DriverCardProps) {
  const { t } = useTranslation();
  const { localizeDriver } = useLocalizedData();
  const vehicle = vehicleTypes[driver.vehicleType];
  const localDriver = localizeDriver(driver);

  return (
    <div className="card group">
      {/* Photo placeholder with gradient overlay */}
      <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {driver.name.split(' ').pop()?.charAt(0)}
            </span>
          </div>
        </div>
        {driver.featured && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {t('driverCard.featured')}
          </span>
        )}
        {driver.available && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {t('driverCard.available')}
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Name & Rating */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900">
              {localDriver.name}
            </h3>
            <p className="text-sm text-gray-500">{driver.experience} {t('driverCard.yearsExperience')}</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-sm text-gray-900">{driver.rating}</span>
            <span className="text-xs text-gray-500">({driver.reviewCount})</span>
          </div>
        </div>

        {/* Vehicle */}
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <Car className="w-4 h-4 text-primary-500" />
          <span>
            {vehicle.icon} {driver.vehicleName}
          </span>
          <span className="text-gray-400">|</span>
          <span>{vehicle.capacity}</span>
        </div>

        {/* Languages */}
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <Globe className="w-4 h-4 text-primary-500" />
          <span>{driver.languages.join(', ')}</span>
        </div>

        {/* Areas */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-primary-500" />
          <span className="truncate">{driver.areas.join(', ')}</span>
        </div>

        {!compact && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{localDriver.bio}</p>
        )}

        {/* Services tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {driver.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
          {driver.services.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
              +{driver.services.length - 3} {t('driverCard.more')}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/booking?driver=${driver.id}`}
            className="btn-primary flex-1 text-sm py-2.5"
          >
            {t('driverCard.bookNow')}
          </Link>
          <a
            href={`https://wa.me/${driver.whatsapp.replace(/\+|\s/g, '')}?text=Hi ${driver.name}! I'd like to book a trip.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm py-2.5 px-3"
            title={t('driverCard.chatOnWhatsApp')}
          >
            <MessageCircleIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function MessageCircleIcon() {
  return (
    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
