'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Calendar,
  MapPin,
  Users,
  Car,
  Phone,
  Mail,
  User,
  MessageCircle,
  Check,
  AlertCircle,
} from 'lucide-react';
import { routes, formatVND, formatUSD } from '@/data/routes';
import { drivers, vehicleTypes } from '@/data/drivers';
import { useTranslation, useLocalizedData } from '@/lib/i18n';

type VehicleType = 'sedan' | 'suv' | 'van' | 'motorbike';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  route: string;
  vehicleType: VehicleType;
  date: string;
  time: string;
  passengers: number;
  pickupLocation: string;
  dropoffLocation: string;
  notes: string;
  driverId: string;
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { localizeRoute, localizeDriver } = useLocalizedData();

  const [formData, setFormData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    route: searchParams.get('route') || '',
    vehicleType: 'sedan',
    date: '',
    time: '08:00',
    passengers: 1,
    pickupLocation: '',
    dropoffLocation: '',
    notes: '',
    driverId: searchParams.get('driver') || '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});

  const selectedRoute = routes.find((r) => r.id === formData.route);
  const selectedDriver = drivers.find((d) => d.id === formData.driverId);
  const price = selectedRoute ? selectedRoute.pricing[formData.vehicleType] : null;

  useEffect(() => {
    if (selectedRoute) {
      setFormData((prev) => ({
        ...prev,
        pickupLocation: selectedRoute.from,
        dropoffLocation: selectedRoute.to,
      }));
    }
  }, [selectedRoute]);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof BookingData, string>> = {};
    if (!formData.name.trim()) newErrors.name = t('booking.nameRequired');
    if (!formData.email.trim()) newErrors.email = t('booking.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t('booking.invalidEmail');
    if (!formData.phone.trim()) newErrors.phone = t('booking.phoneRequired');
    if (!formData.date) newErrors.date = t('booking.dateRequired');
    if (!formData.pickupLocation.trim())
      newErrors.pickupLocation = t('booking.pickupRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // In production, this would send to an API
    console.log('Booking submitted:', formData);
    setSubmitted(true);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof BookingData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
          {t('booking.bookingRequestSent')}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          {t('booking.thankYouMessage').replace('{name}', formData.name)}
          {selectedDriver
            ? ` ${t('booking.driverWillContact').replace('{driver}', selectedDriver.name)}`
            : ` ${t('booking.teamWillMatch')}`}
        </p>
        {price && (
          <div className="bg-primary-50 rounded-xl p-6 max-w-sm mx-auto mb-6">
            <p className="text-sm text-gray-600 mb-1">{t('booking.estimatedPrice')}</p>
            <p className="font-display text-2xl font-bold text-primary-700">
              {formatVND(price)}{' '}
              <span className="text-base font-normal text-gray-500">
                (~{formatUSD(price)})
              </span>
            </p>
          </div>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setSubmitted(false)}
            className="btn-secondary"
          >
            {t('booking.bookAnotherRide')}
          </button>
          <a
            href={`https://wa.me/84905123456?text=Hi! I just submitted a booking for ${formData.date}. My name is ${formData.name}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-green-500 hover:bg-green-600"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('booking.confirmViaWhatsApp')}
          </a>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Route Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          {t('booking.tripDetails')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Route selector */}
          <div className="md:col-span-2">
            <label htmlFor="route" className="label-field">
              {t('booking.selectRoute')}
            </label>
            <select
              id="route"
              name="route"
              value={formData.route}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">{t('booking.customRoute')}</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {localizeRoute(route).name} ({route.distance}km, {route.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Pickup */}
          <div>
            <label htmlFor="pickupLocation" className="label-field">
              {t('booking.pickupLocation')}
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder={t('booking.pickupPlaceholder')}
              className={`input-field ${errors.pickupLocation ? 'border-red-500' : ''}`}
            />
            {errors.pickupLocation && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.pickupLocation}
              </p>
            )}
          </div>

          {/* Dropoff */}
          <div>
            <label htmlFor="dropoffLocation" className="label-field">
              {t('booking.dropoffLocation')}
            </label>
            <input
              type="text"
              id="dropoffLocation"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleChange}
              placeholder={t('booking.dropoffPlaceholder')}
              className="input-field"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="label-field">
              {t('booking.date')}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                className={`input-field pl-10 ${errors.date ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.date && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.date}
              </p>
            )}
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="label-field">
              {t('booking.pickupTime')}
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Vehicle Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <Car className="w-5 h-5 text-primary-600" />
          {t('booking.vehicleAndPassengers')}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {(Object.entries(vehicleTypes) as [VehicleType, typeof vehicleTypes.sedan][]).map(
            ([type, info]) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, vehicleType: type }))}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  formData.vehicleType === type
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl block mb-1">{info.icon}</span>
                <span className="font-semibold text-sm block">{info.label}</span>
                <span className="text-xs text-gray-500">{info.capacity}</span>
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="passengers" className="label-field mb-0">
            <Users className="w-4 h-4 inline mr-1" />
            {t('booking.passengers')}
          </label>
          <select
            id="passengers"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            className="input-field w-24"
          >
            {Array.from(
              { length: vehicleTypes[formData.vehicleType].capacity === '1 passenger' ? 1 : 12 },
              (_, i) => i + 1
            ).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Price display */}
        {price && (
          <div className="mt-4 p-4 bg-primary-50 rounded-xl flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600 block">
                {t('booking.estimatedPriceFor')} {selectedRoute ? localizeRoute(selectedRoute).name : ''}
              </span>
              <span className="text-xs text-gray-500">
                {vehicleTypes[formData.vehicleType].label} {t('booking.vehicle')}
              </span>
            </div>
            <div className="text-right">
              <span className="font-display font-bold text-2xl text-primary-700 block">
                {formatVND(price)}
              </span>
              <span className="text-sm text-gray-500">~{formatUSD(price)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Preferred Driver */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
          {t('booking.preferredDriver')}
        </h3>
        <select
          id="driverId"
          name="driverId"
          value={formData.driverId}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">{t('booking.anyAvailableDriver')}</option>
          {drivers
            .filter((d) => d.available)
            .map((driver) => {
              const localized = localizeDriver(driver);
              return (
                <option key={driver.id} value={driver.id}>
                  {localized.name} - {vehicleTypes[driver.vehicleType].label} ({driver.rating}{' '}
                  stars, {driver.languages.join('/')})
                </option>
              );
            })}
        </select>
        {selectedDriver && (
          <p className="text-sm text-gray-500 mt-2">
            {selectedDriver.vehicleName} | {selectedDriver.languages.join(', ')} |{' '}
            {selectedDriver.experience} years experience
          </p>
        )}
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary-600" />
          {t('booking.yourInformation')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="label-field">
              {t('booking.fullName')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('booking.namePlaceholder')}
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
              <Mail className="w-3.5 h-3.5 inline mr-1" />
              {t('booking.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('booking.emailPlaceholder')}
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="label-field">
              <Phone className="w-3.5 h-3.5 inline mr-1" />
              {t('booking.phoneWhatsApp')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('booking.phonePlaceholder')}
              className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="notes" className="label-field">
              {t('booking.specialRequests')}
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder={t('booking.specialRequestsPlaceholder')}
              className="input-field resize-none"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button type="submit" className="btn-primary flex-1 py-4 text-lg">
          <Calendar className="w-5 h-5 mr-2" />
          {t('booking.sendBookingRequest')}
        </button>
        <a
          href={`https://wa.me/84905123456?text=Hi! I'd like to book a ${
            vehicleTypes[formData.vehicleType].label
          }${selectedRoute ? ` for ${selectedRoute.name}` : ''} on ${formData.date || 'a date TBD'}. My name is ${formData.name || 'not specified yet'}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary bg-green-500 hover:bg-green-600 py-4 text-lg sm:w-auto"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          {t('booking.bookViaWhatsApp')}
        </a>
      </div>
    </form>
  );
}
