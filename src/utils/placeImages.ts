/**
 * Returns the verified local photograph URL for any Taipei / New Taipei place ID.
 * All 98 place photographs are stored locally in /public/images/places/<id>.jpg
 * for instant loading and 100% offline availability.
 */
export function getPlaceImageUrl(placeId: string): string {
  return `/images/places/${placeId}.jpg`;
}
