import { Driver, drivers as staticDrivers } from './drivers';

// Use globalThis to persist across HMR in development
const STORE_KEY = '__driverStore';
const TOKEN_KEY = '__adminTokens';

function getStore(): Driver[] {
  if (!(globalThis as Record<string, unknown>)[STORE_KEY]) {
    (globalThis as Record<string, unknown>)[STORE_KEY] = structuredClone(staticDrivers);
  }
  return (globalThis as Record<string, unknown>)[STORE_KEY] as Driver[];
}

function getTokenSet(): Set<string> {
  if (!(globalThis as Record<string, unknown>)[TOKEN_KEY]) {
    (globalThis as Record<string, unknown>)[TOKEN_KEY] = new Set<string>();
  }
  return (globalThis as Record<string, unknown>)[TOKEN_KEY] as Set<string>;
}

export function getDrivers(): Driver[] {
  return getStore();
}

export function getDriverById(id: string): Driver | undefined {
  return getStore().find((d) => d.id === id);
}

export function updateDriver(id: string, updates: Partial<Driver>): Driver | null {
  const store = getStore();
  const index = store.findIndex((d) => d.id === id);
  if (index === -1) return null;
  store[index] = { ...store[index], ...updates, id: store[index].id };
  return store[index];
}

// Admin token management
export function createAdminToken(): string {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  getTokenSet().add(token);
  return token;
}

export function validateAdminToken(token: string): boolean {
  return getTokenSet().has(token);
}
