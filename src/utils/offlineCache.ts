import { PlaceItem } from '../data/placesData';
import { getPlaceImageUrl } from './placeImages';

export const OFFLINE_SNAPSHOT_STORAGE_KEY = 'taipei_wayfinder_offline_snapshot_v1';
export const DATA_CACHE_NAME = 'taipei-places-data-cache';
export const CORE_CACHE_NAME = 'taipei-wayfinder-sw-v1';

export interface OfflineSnapshot {
  version: string;
  syncedAt: string;
  placesCount: number;
  savedIds: string[];
  savedPlacesCount: number;
  remoteMountainSpotsCount: number;
  places: PlaceItem[];
}

const REMOTE_TAIPEI_DISTRICTS = new Set([
  'Ruifang',
  'Beitou / Shilin',
  'Beitou',
  'Wenshan',
  'Tamsui',
  'Xindian',
]);

/**
 * Pure helper that builds a deterministic offline snapshot object for storage & verification.
 */
export function buildOfflineSnapshot(
  places: PlaceItem[],
  savedIds: string[],
  nowIso: string = new Date().toISOString()
): OfflineSnapshot {
  const savedSet = new Set(savedIds);
  const savedPlacesCount = places.filter((p) => savedSet.has(p.id)).length;
  const remoteMountainSpotsCount = places.filter(
    (p) => REMOTE_TAIPEI_DISTRICTS.has(p.district) || p.city === 'New Taipei'
  ).length;

  return {
    version: '1.0.0',
    syncedAt: nowIso,
    placesCount: places.length,
    savedIds: [...savedIds],
    savedPlacesCount,
    remoteMountainSpotsCount,
    places,
  };
}

/**
 * Converts latitude/longitude and zoom level into OpenStreetMap XYZ tile coordinates.
 */
export function latLngToTileXYZ(
  lat: number,
  lng: number,
  zoom: number
): { x: number; y: number; z: number } {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return { x, y, z: zoom };
}

/**
 * Saves the offline snapshot and saved place photographs to localStorage and CacheStorage.
 */
export async function syncOfflineAssetsAndPlaces(
  places: PlaceItem[],
  savedIds: string[]
): Promise<{
  snapshot: OfflineSnapshot;
  cacheStorageAvailable: boolean;
  cachedUrlsCount: number;
}> {
  const snapshot = buildOfflineSnapshot(places, savedIds);

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(
        OFFLINE_SNAPSHOT_STORAGE_KEY,
        JSON.stringify(snapshot)
      );
    } catch {
      // Ignore storage quota errors
    }
  }

  let cacheStorageAvailable = false;
  let cachedUrlsCount = 0;

  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      cacheStorageAvailable = true;
      const dataCache = await window.caches.open(DATA_CACHE_NAME);
      const jsonResponse = new Response(JSON.stringify(snapshot), {
        headers: { 'Content-Type': 'application/json' },
      });
      await dataCache.put('/places-offline-cache.json', jsonResponse);
      cachedUrlsCount += 1;

      const coreCache = await window.caches.open(CORE_CACHE_NAME);
      const savedPhotoUrls = savedIds.map((id) => getPlaceImageUrl(id));
      const coreUrls = [
        '/',
        '/index.html',
        '/icon.svg',
        '/pwa-192x192.png',
        '/pwa-512x512.png',
        '/apple-touch-icon.png',
        ...savedPhotoUrls,
      ];
      await Promise.allSettled(
        coreUrls.map(async (url) => {
          const res = await fetch(url, { cache: 'force-cache' });
          if (res.ok) {
            await coreCache.put(url, res.clone());
            cachedUrlsCount += 1;
          }
        })
      );
    } catch {
      // Ignore cache API errors in restricted contexts
    }
  }

  return { snapshot, cacheStorageAvailable, cachedUrlsCount };
}

/**
 * Loads the cached places dataset from localStorage if available, falling back to bundled places.
 */
export function loadOfflineSnapshot(fallbackPlaces: PlaceItem[]): {
  places: PlaceItem[];
  lastSyncedAt: string | null;
} {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const raw = window.localStorage.getItem(OFFLINE_SNAPSHOT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as OfflineSnapshot;
        if (Array.isArray(parsed.places) && parsed.places.length > 0) {
          return {
            places: parsed.places,
            lastSyncedAt: parsed.syncedAt || null,
          };
        }
      }
    } catch {
      // Ignore parse errors
    }
  }
  return { places: fallbackPlaces, lastSyncedAt: null };
}
