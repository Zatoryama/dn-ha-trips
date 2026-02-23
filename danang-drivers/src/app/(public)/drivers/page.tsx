'use client';

import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import DriverCard from '@/components/DriverCard';
import { drivers, vehicleTypes } from '@/data/drivers';
import { useTranslation } from '@/lib/i18n';

type VehicleFilter = 'all' | 'sedan' | 'suv' | 'van' | 'motorbike';
type LanguageFilter = 'all' | string;

export default function DriversPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilter>('all');
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'price'>('rating');

  const allLanguages = Array.from(
    new Set(drivers.flatMap((d) => d.languages))
  ).sort();

  const filteredDrivers = drivers
    .filter((driver) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = driver.name.toLowerCase().includes(query);
        const matchesArea = driver.areas.some((a) =>
          a.toLowerCase().includes(query)
        );
        const matchesService = driver.services.some((s) =>
          s.toLowerCase().includes(query)
        );
        const matchesVehicle = driver.vehicleName.toLowerCase().includes(query);
        if (!matchesName && !matchesArea && !matchesService && !matchesVehicle)
          return false;
      }
      // Vehicle type
      if (vehicleFilter !== 'all' && driver.vehicleType !== vehicleFilter)
        return false;
      // Language
      if (languageFilter !== 'all' && !driver.languages.includes(languageFilter))
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience - a.experience;
      if (sortBy === 'price') return a.pricePerKm - b.pricePerKm;
      return 0;
    });

  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero text-white py-16">
        <div className="container-custom">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {t('drivers.pageTitle')}
          </h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            {t('drivers.pageDescription')}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky top-[64px] lg:top-[80px] z-40">
        <div className="container-custom py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('drivers.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 py-2.5"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Vehicle filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={vehicleFilter}
                  onChange={(e) =>
                    setVehicleFilter(e.target.value as VehicleFilter)
                  }
                  className="input-field py-2.5 w-auto text-sm"
                >
                  <option value="all">{t('drivers.allVehicles')}</option>
                  {(
                    Object.entries(vehicleTypes) as [
                      string,
                      (typeof vehicleTypes)['sedan'],
                    ][]
                  ).map(([type, info]) => (
                    <option key={type} value={type}>
                      {info.icon} {info.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language filter */}
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="input-field py-2.5 w-auto text-sm"
              >
                <option value="all">{t('drivers.allLanguages')}</option>
                {allLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'rating' | 'experience' | 'price')
                  }
                  className="input-field py-2.5 w-auto text-sm"
                >
                  <option value="rating">{t('drivers.highestRated')}</option>
                  <option value="experience">{t('drivers.mostExperienced')}</option>
                  <option value="price">{t('drivers.lowestPrice')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">
            {t('drivers.showing')} {filteredDrivers.length} {t('drivers.of')} {drivers.length} {t('drivers.driversLabel')}
          </p>

          {filteredDrivers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map((driver) => (
                <DriverCard key={driver.id} driver={driver} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                {t('drivers.noDriversFound')}
              </h3>
              <p className="text-gray-500 mb-4">
                {t('drivers.noDriversDesc')}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setVehicleFilter('all');
                  setLanguageFilter('all');
                }}
                className="btn-secondary text-sm"
              >
                {t('drivers.clearAllFilters')}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
