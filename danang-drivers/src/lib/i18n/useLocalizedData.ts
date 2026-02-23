'use client';

import { useTranslation } from './LanguageContext';
import type { Driver } from '@/data/drivers';
import type { Route } from '@/data/routes';

export function useLocalizedData() {
  const { lang } = useTranslation();

  function localizeDriver(driver: Driver) {
    return {
      ...driver,
      name: lang === 'vi' ? driver.nameVi : driver.name,
      bio: lang === 'vi' ? driver.bioVi : driver.bio,
    };
  }

  function localizeRoute(route: Route) {
    return {
      ...route,
      name: lang === 'vi' ? route.nameVi : route.name,
      description: lang === 'vi' ? route.descriptionVi : route.description,
    };
  }

  function localizeDestination(dest: {
    name: string;
    nameVi: string;
    description: string;
    descriptionVi: string;
    [key: string]: unknown;
  }) {
    return {
      ...dest,
      name: lang === 'vi' ? dest.nameVi : dest.name,
      description: lang === 'vi' ? dest.descriptionVi : dest.description,
    };
  }

  return { localizeDriver, localizeRoute, localizeDestination, lang };
}
